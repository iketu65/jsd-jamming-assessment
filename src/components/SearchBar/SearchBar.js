/* eslint-disable jsx-a11y/anchor-is-valid */
import './SearchBar.css';
import { useState } from 'react';

function SearchBar(props) {
  const [searchKeyword, setSearchKeyword] = useState('');

  const search = () => {
    props.onSearch(searchKeyword);
    setSearchKeyword('');
  }

  const handleTermChange = (e) => {
    setSearchKeyword(e.target.value);
  }

  return (
  <div className="SearchBar">
    <input placeholder="Enter A Song, Album, or Artist" onChange={handleTermChange} value={props.searchKeyword}/>
    <button className="SearchButton" onClick={search}>SEARCH</button>
  </div>
  );
}

export default SearchBar;
