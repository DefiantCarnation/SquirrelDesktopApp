var axios = require('axios');
var fs = require('fs');
var cheerio = require('cheerio');

var crawl = (url) => {
  console.log(url);
  axios({
  method: 'get',
  url: url
  // params: {
  //   userid: id
  // }
  })
  .then((res) => {
    console.log('URL',url);
    var $ = cheerio.load(res.data);
    var links = $('a') 
    var linksToArticles = [];
    links.each(function(index,link){
      if(link.attribs.href && link.attribs.href.indexOf(url) !== -1){
        linksToArticles.push(link);
      }
    })
    links = linksToArticles;
    //console.log('LINKStoarticles',linksToArticles);
    //console.log('LINKStoarticles',links);
    var title = $('title').text(); //.replace(/[\s|]/g, '');
    var path = `Stash/Me/Mine/${title}`
    fs.mkdir(path,function(err){
    	if(err){console.log(err)}
    })
   var path = `Stash/Me/Mine/${title}/main.html`;
	 fs.writeFile(path, res.data, (err) => {
	    if (err) {
	      console.log('Err, yo', err);
	    }
	  })
	 var path = `Stash/Me/Mine/${title}/`;
   links = links.map(function(link){
    return link.attribs.href
   })
   console.log('LINKS',links);
	 links.forEach(function(link,ind){
    //console.log(link.attribs.href)
    console.log(link);

	 	axios({
		  method: 'get',
		  url: link
		  // params: {
		  //   userid: id
		  // }
		}).then(function(data){
      console.log(JSON.stringify(data));
      fs.writeFile(path + ind.toString(),JSON.stringify(data),(err)=>{
        console.log(err);
      })
    })


	 })
  })
  .then((data)=>{
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
};


crawl('http://www.slate.com');


// function get(link, username) {

//    var user = username;

//   return axios ({
//     method: 'get',
//     url: link
//   });
// };
