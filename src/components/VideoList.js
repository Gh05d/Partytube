import React, { Component } from 'react';
import VideoListItem from './VideoListItem';
import SearchBar from './SearchBar';
import YTSearch from 'youtube-api-search';
import { API_KEY } from '../../ApiKey';

class VideoList extends Component {
  constructor(props) {
    super(props);

    this.state = { videos1: [], videos2: [] }

    this.videoSearch1('SSIO');
    this.videoSearch2('Style und das Geld');
  }

  videoSearch1(term) {
    YTSearch({ key: API_KEY, term }, videos => {
      this.setState({ videos1: videos });
    });
  }

  videoSearch2(term) {
    YTSearch({ key: API_KEY, term }, videos => {
      this.setState({ videos2: videos });
    });
  }

  render() {
    const videoItems1 = this.state.videos1.map(video => {
      return (
        <VideoListItem video={ video } key={ video.etag }
          onVideoSelect={ this.props.onVideoSelect }/>
        );
      });

    const videoItems2 = this.state.videos2.map(video => {
      return (
        <VideoListItem video={ video } key={ video.etag }
          onVideoSelect={ this.props.onVideoSelect }/>
        );
      });

    const videoSearch1 = _.debounce(term => { this.videoSearch1(term) }, 300);
    const videoSearch2 = _.debounce(term => { this.videoSearch2(term) }, 300);

    return(
      <div className="sidebar-offcanvas">
        <div className="col-md-3 well sidebar-nav">
          <SearchBar onSearchTermChange={ videoSearch1 }/>
          <ul className="nav">
            { videoItems1 }
          </ul>
        </div>

        <div className="col-md-3 well sidebar-nav">
          <SearchBar onSearchTermChange={ videoSearch2 }/>
          <ul className="nav">
            { videoItems2 }
          </ul>
        </div>
      </div>
    );
  }
}

export default VideoList;
