import React from 'react';


class FileCardContainer extends React.Component {

  constructor(props) {
    super(props);

    this.findsecondslash = this.findsecondslash.bind(this);
  }

  expand(url) {
    console.log(url);                    
    //const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;

    var win = new BrowserWindow({ width: 800, height: 600 });
    console.log('NEW howdy')
    var toload = 'file://' + topleveldir + '/' + url + '/article.html';

    win.loadURL(toload);
                        
  }

  findsecondslash(string) {
    var foundone = 0;
    var indextoreturn;
    string.split('').forEach(function(char, index) {
      if (char === '/') {
        if (foundone === 0) {
          foundone = 1;
        } else {
          indextoreturn = index;
        }
      }

    });
    return indextoreturn + 1;  
  }

      // <div className = "teal">
      //   <img draggable="true" onDragStart={function(event){drag(event)}} id="hello" style = {{display:'inline'}} className= "Acorns" width="10%" src="client/assets/acorn.png" onClick={()=>{this.expand.bind(this)(this.props.path)}}></img>
      //   <div style = {{display:'inline'}} className = "vAlign">
      //     <h5 className = "titles"style = {{display:'inline'}} >{this.props.path.slice(findsecondslash(this.props.path)).replace('.html',"")}</h5>
      //   </div>
      // </div>

  render() {
    console.log('path', this.props.path);

    var image = this.props.path + "/images/assetFile10.jpg";
    return (
      <div className="row">
      <div className='article_from_friend_card shadowDepth1' onClick={()=> { this.expand.bind(this)(this.props.path); }}>
        <div className='friend_article_image_block'>
          <img src={image}/>
        </div>
        <div className='friend_article_image_content'>
          <div className='friend_article_title'>
            <h5 className = "titles">{this.props.path.slice(this.findsecondslash(this.props.path)).replace('.html', '')}</h5>
          </div>
          <div className='friend_article_friend_image'>
           
          </div>
        </div>
      </div>
      </div>
    );
  }
};

export default FileCardContainer;
