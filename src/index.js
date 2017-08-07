import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';
import _ from 'lodash';
//API-key for youtube
import { API_KEY } from '../ApiKey';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('Hoch die Hände Wochenende');
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term }, videos => {
      this.setState({
        videos,
        selectedVideo: videos[0]
     });
    });
  }

  render() {
    const videoSearch = _.debounce(term => { this.videoSearch(term) }, 300);

    return (
      <div>
        <VideoDetail video={ this.state.selectedVideo } />
        <VideoList videos={ this.state.videos }
          onVideoSelect={ selectedVideo => this.setState({ selectedVideo }) } />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container-fluid'));
