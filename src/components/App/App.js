import './App.css';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import React, { useState, useEffect } from 'react';
import Spotify from '../../utils/Spotify';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist')
  const [playlistTracks, setPlaylistTracks] = useState([])

  useEffect(() => {
    Spotify.getAccessToken();
  }, []);

  const addTrack = (track) => {
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    setPlaylistTracks([...playlistTracks, track]);
  };

  const removeTrack = (track) => {
    setPlaylistTracks(
      playlistTracks.filter((remainingTracks) => remainingTracks.id !== track.id)
    );
  };

  const updatePlaylistName = (newPlaylistName) => {
    setPlaylistName(newPlaylistName);
  };

  const savePlaylist = () => {
    const trackURIs = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistTracks([]);
      setPlaylistName('New Playlist');
    });
  };

  const search = (searchKeyword) => {
    Spotify.search(searchKeyword).then((tracks) => {
      setSearchResults(tracks);
    });
  };

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist playlistName={playlistName} playlistTracks={playlistTracks} onRemove={removeTrack} onNameChange={updatePlaylistName} onSave={savePlaylist}/>
        </div>
      </div>
    </div>
  );
}

export default App;
