require('../../scss/main.scss');

import React from 'react';
import HomePresentation from './homePresentation.jsx';

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

  }

  

  render() {
    return (
      <div>
        <AppPresentation folders={this.props.folders} loadFolder={this.loadFolder.bind(this)} folderPath={this.state.currentFolder}/>
      </div>
    )
  }
};