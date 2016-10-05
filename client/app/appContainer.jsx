
require('../../scss/main.scss');

import React from 'react';
import {render} from 'react-dom';
import fs from 'fs';
import path from 'path';
import AppPresentation from './appPresentation.jsx';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentFolder: null};
  }

  loadFolder(folderPath) {
    this.setState({currentFolder: folderPath});
  }

  render() {
    return (
      <div className="app-container">
        <AppPresentation folders={this.props.folders} loadFolder={this.loadFolder.bind(this)} folderPath={this.state.currentFolder}/>
      </div>
    );
  }
}

var getFolders = function() {
  var dirs = fs.readdirSync('Stash').filter((dir) => {
    if (dir === '.DS_Store' || dir === 'Me') {
      return false;
    } else {
      return true;
    }
  });
  console.log('DIRS', dirs);
  dirs = dirs.map((dir) => {
    return 'Stash/' + dir;
  });

  dirs.push('Stash/Me/Mine');
  fs.readdirSync('Stash/Me/Recommended').forEach(function(path) {
    dirs.push('Stash/Me/Recommended/' + path);
  });
  dirs.push('Stash/Me/Recommended');

  return dirs;
};

render(<AppContainer folders={getFolders()}/>, document.getElementById('app'));