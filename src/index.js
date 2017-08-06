import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/SearchBar';
//API-key for youtube
import API_KEY from '../ApiKey';

const App = () => {
  return (
    <div>
      <SearchBar />
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('.container'));
