import React from 'react';
import FolderContainer from './folder/folderContainer.jsx';

var SidebarPresentation = (props) => {

  var folders = props.folders.map((folder, index) => {
    if (index < 2) {
      return (
        <div className="folderContainer">
          <img className="acornLogo" src="client/assets/acorn-7-xxl.png"/>
          <FolderContainer folder={folder} loadFolder={props.loadFolder} index={index}/>
        </div>
        );
    }
  });

  return (
    <div className = "easyui-panel side-nav full" style={{width: '500px', height: '600px', position: 'relative'}}>
      <h4>Your collection:</h4>
      {folders}	
    </div>
  );
};

export default SidebarPresentation;