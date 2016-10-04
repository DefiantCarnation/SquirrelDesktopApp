import React from 'react';
import FileCard from './fileCard/fileCardContainer.jsx';


var ArticleLibraryPresentation = ({filePaths}) => {

  var fileCards = filePaths.map((filePath, i) => {
    console.log(filePath);
    return (<FileCard path={filePath}/>);
  });

  return (
    <div className = "easyui-panel" style={{width: '500px', height: '600px', position: 'relative'}}>
      {fileCards}
    </div>
  );
};

export default ArticleLibraryPresentation;
    // <div className='article_from_friend_card shadowDepth1'>
    //     <div className='friend_article_image_block'>
    //       <div style={divStyle} className='friend_article_image'/>
    //     </div>
    //     <div className='friend_article_image_content'>
    //       <div className='friend_article_title'>
    //         <a href={props.url}>{props.title}</a>
    //       </div>
    //       <div className='friend_article_friend_image'>
    //         <p>Recommended by {dummyphotoJordan[1]}</p>
    //         <img src={dummyphotoJordan[0]} alt="" className="friend_article_friend_img circle responsive-img"/>
    //       </div>
    //     </div>
    //   </div>