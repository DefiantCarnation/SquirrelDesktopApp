import React from 'react';
import FolderPresentation from './folderPresentation.jsx';

const FolderContainer = (props) => {
  const title = props.index === 0 ? 'your saved stash' : 'with love from friends';
  return (
    <div className="easyui-draggable folder" data-options="onDrag:onDrag" onClick={() => (props.loadFolder(props.folder))}>
      <h4 onDrop={function(event) { drop(event); }} onDragOver={function(event) { allowDrop(event); }} >{title}</h4>
    </div>
  );
};

export default FolderContainer;