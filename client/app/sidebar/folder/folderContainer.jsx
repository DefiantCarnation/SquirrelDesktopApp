import React from 'react';
import FolderPresentation from './folderPresentation.jsx';

var FolderContainer = (props) => (

  <div className="easyui-draggable" style={{width: '100px', height: '100px'}} data-options="onDrag:onDrag" onClick={() => (props.loadFolder(props.folder))}>
    <div>
      
    </div>
    <img width="30%" src="client/assets/acorn-7-xxl.png" onDrop={function(event) { drop(event); }} onDragOver={function(event) { allowDrop(event); }}/>
    <p width="30%">{props.folder.replace('Stash/', "")}</p> 
  </div>
);

export default FolderContainer;