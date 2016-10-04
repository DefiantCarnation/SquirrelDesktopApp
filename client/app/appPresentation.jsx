import React from 'react';
import {render} from 'react-dom';
import SidebarContainer from './sidebar/sidebarContainer.jsx';
import ArticleLibraryContainer from './articleLibrary/articleLibraryContainer.jsx';

const AppPresentation = (props) => {

  return (
  <div className = 'grid'>
    <div className = 'row'>
      <SidebarContainer className = 'col s2 sidebar' folders={props.folders} loadFolder={props.loadFolder}/>
      <ArticleLibraryContainer className = 'col s9' folderPath={props.folderPath}/>
    </div>
  </div>
  );
};

export default AppPresentation;