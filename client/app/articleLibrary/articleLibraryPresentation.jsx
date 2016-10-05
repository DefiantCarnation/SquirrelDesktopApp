import React from 'react';
import FileCard from './fileCard/fileCardContainer.jsx';


var ArticleLibraryPresentation = ({filePaths}) => {

  var fileCards = filePaths.map((filePath, i) => {
    console.log(filePath);
    return (<FileCard path={filePath}/>);
  });

  return (
    <div className="articleContainer">
      {fileCards}
    </div>
  );
};

export default ArticleLibraryPresentation;
