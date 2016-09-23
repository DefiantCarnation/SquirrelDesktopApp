var express = require('express');
var dummy = express();
dummy.listen(3000, function() {
  console.log('I\'m listening');
});

dummy.get('/links/:userid', function(req, res) {

  if (!req.params.userid) {
    console.log('where\'s the userid?');
  }

  linkObject = {
    ownlinks: {
      '1': ['http://www.nytimes.com/2016/09/23/us/charlotte-image-police-shooting.html?hp&action=click&pgtype=Homepage&clickSource=story-heading&module=b-lede-package-region&region=top-news&WT.nav=top-news&_r=0',
        'http://www.vox.com/policy-and-politics/2016/9/23/13001830/donald-trump-jr-tweets-controversy-alt-right-white-nationalism',
        'http://www.slate.com/articles/double_x/doublex/2016/09/trump_induced_anxiety_is_a_real_thing.html'
      ],
      '2': [
        'https://www.theguardian.com/us-news/2016/sep/23/ahmad-khan-rahami-pakistan-taliban-new-york-bombing-terrorism',
        'http://www.theatlantic.com/entertainment/archive/2016/09/national-museum-of-african-american-history-and-culture-smithsonian/501356/',
        'https://bostonreview.net/us/colin-dayan-on-ice'
      ],
      '3': [
        'http://www.economist.com/news/finance-economics/21707719-government-claims-publishing-report-would-undermine-efforts-retrieve',
        'http://www.motherjones.com/politics/2016/09/donald-trumps-appeal-ohios-rust-belt-isnt-just-about-economy',
        'https://www.wired.com/2016/09/whats-inside-blue-ballpoint-pen-ink/'
      ]
    }
    recommendedLinks: {
      '2': [
        'http://qz.com/787633/farc-gathers-for-its-last-conference-as-a-guerrilla-after-50-years-of-war-to-vote-on-peace/',
        'http://www.npr.org/sections/thetwo-way/2016/09/23/495200112/witness-video-emerges-from-scene-of-charlotte-police-shooting-of-keith-scott',
        'http://consc.net/papers/spatial.pdf',
      ],
      '3': [
        'http://www.abc.net.au/news/2016-09-23/federal-labor-hints-at-possible-plebiscite-compromise/7872550',
        'http://www.nytimes.com/2016/08/05/opinion/campaign-stops/i-ran-the-cia-now-im-endorsing-hillary-clinton.html?mwrsm=Facebook&_r=0',
        'http://thehill.com/blogs/in-the-know/in-the-know/297430-omarosa-trumps-haters-will-be-forced-to-bow-down-to-him'
      ]
    }
  }
  res.send(linkObject);
});

dummy.put('/links/:userid', function(req, res) {
  if (!req.params.userid) {
    console.log('where\'s the userid?');
    res.status(422).end();
  }

  var url = req.body.link;
  if (!url) {
    console.log('Where\'s the link?')
    res.status(422).end();
  }

  res.status(200).end();

}

dummy.delete('/links/:userid', function(req, res) {
   if (!req.params.userid) {
    console.log('where\'s the userid?');
    res.status(422).end();
  }

  var url = req.body.link;
  if (!url) {
    console.log('Where\'s the link?')
    res.status(422).end();
  }

  linkObject = {
    links: [
      'http://www.nytimes.com/2016/09/23/us/charlotte-image-police-shooting.html?hp&action=click&pgtype=Homepage&clickSource=story-heading&module=b-lede-package-region&region=top-news&WT.nav=top-news&_r=0',
      'http://www.vox.com/policy-and-politics/2016/9/23/13001830/donald-trump-jr-tweets-controversy-alt-right-white-nationalism'
    ]
  }

  res.send(linkObject);

});

dummy.put('/friends/:userid', function(req, res) {
  if (!req.params.userid) {
    console.log('where\'s the userid?');
    res.status(422).end();
  }

  var friend = req.body.friend;
  if (!url) {
    console.log('Where\'s the friend?')
    res.status(422).end();
  }

  res.status(200).end();

});

dummy.get('/friends/:userid', function(req, res) {
  if (!req.params.userid) {
    console.log('where\'s the userid?');
    res.status(422).end();
  }
 
  var friendObject = {
    friends: [
      '2',
      '3'
    ]
  };

  res.send(friendObject);

});

dummy.put('/links/:friend/:userid', function(req, res) {


  if (!req.params.userid) {
    console.log('where\'s the userid?');
    res.status(422).end();
  }

  if (!req.params.friendid) {
    console.log('Where\'s the friendid?');
    res.status(422).end();
  }

  if (!res.body.link) {
    console.log('Where\'s the link?');
    res.status(422).end();
  }

  res.status(200).end();

});