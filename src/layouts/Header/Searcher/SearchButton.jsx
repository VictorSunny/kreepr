import { useState, useEffect } from 'react';
import useResetStates from '../../../hooks/useResetStates';
import SearchIcon from '../../../assets/icons/search-icon.svg?react';
import CloseIcon from '../../../assets/icons/close-icon.svg?react';
import SearchBar from './SearchBar';
import './SearchButton.css';

function SearchButton() {
  ////    BUTTON FOR OPEN/CLOSE OF SEARCH DISALOGUE

  // set variables to monitor if search dialogue is engaged
  const [searchEngaged, setSearchEngaged] = useState(false);

  const _resetStatesLog = useResetStates([setSearchEngaged]);

  // function that toggles searchengaged state - true/false
  const triggerSearchDialogue = () => {
    setSearchEngaged(!searchEngaged);
  };

  return (
    <div className="search-btn-container">
      <button
        onClick={triggerSearchDialogue}
        className="search-btn"
        type="button"
        aria-label="search"
      >
        <SearchIcon className="icon search-icon" loading="eager" alt="search icon" />
      </button>
      {searchEngaged && (
        <div id="floating-search-dialogue">
          <div id="search-dialogue-container">
            <button
              onClick={triggerSearchDialogue}
              id="floating-search-dialogue-close-btn"
              type="button"
              aria-label="close search"
            >
              <CloseIcon className="icon dialogue-close-icon" loading="lazy" alt="close icon" />
            </button>
            <SearchBar mobileTriggered={searchEngaged} />
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchButton;
