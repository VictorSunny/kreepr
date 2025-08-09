import { useQuery } from '@tanstack/react-query';
import { useState, useRef, useEffect, lazy } from 'react';
import { Link } from 'react-router-dom';

import Backdrop from '../../../components/Backdrop/Backdrop';
import NoDataSignal from '../../../components/LoadSignals/NoDataSignal';
import useResetStates from '../../../hooks/useResetStates';
import fetchSearchedCoins from '../../../services/fetchSearchedCoins';
import sleep from '../../../utilities/sleep';

import './SearchBar.css';
import './SearchPopup.css';

const LineLoadingSignal = lazy(() => import('../../../components/LoadSignals/LineLoadingSignal'));
const ReloadSignal = lazy(() => import('../../../components/LoadSignals/ReloadSignal'));

// const searchData = lazy(() => import('../../../api/searchData'));

export default function SearchBar({ mobileTriggered }) {
  const [searchQuery, setSearchQuery] = useState('');

  // lets search popup list know when to display
  const [userIsTyping, setUserIsTyping] = useState(false);
  //immediately triggers backdrop when search bar is focused

  const [searchEngaged, setSearchEngaged] = useState(false);
  const [userHasTyped, setUserHasTyped] = useState(true);
  const [searchClicked, setSearchClicked] = useState(false);

  const _stateResetLog = useResetStates([setSearchEngaged, setUserIsTyping, setSearchClicked]);

  const searchBarInput = useRef();

  const hideSearchPopup = () => {
    searchBarInput.current.value = '';
    setSearchEngaged(false);
    return setUserIsTyping(false);
  };
  const clickedSearch = () => {
    return setSearchClicked(true);
  };

  // function triggered each time search input changes
  const searchAction = async () => {
    // wait 3 seconds after user stops typing. blocks too many api queries
    await sleep(3000);

    // check if search input is empty. if empty, display search prompt in search popup
    (searchBarInput.current.value == '' && setUserHasTyped(false)) || setUserHasTyped(true);

    // assert that user is typing to display search popup and backdrop
    setUserIsTyping(true);

    // send search input to search popup to handle api querying
    searchBarInput.current.value != '' && setSearchQuery(searchBarInput.current.value);
  };

  // if searchbar component mount is mobile triggered, auto focus on searchbar
  useEffect(() => {
    mobileTriggered && searchBarInput.current?.focus();
  }, [mobileTriggered]);

  return (
    <div id="search-bar-container" onClick={clickedSearch}>
      <input
        ref={searchBarInput}
        onBlur={hideSearchPopup}
        onFocus={() => {
          setSearchEngaged(true);
        }}
        onChange={searchAction}
        type="text"
        placeholder="search for coins..."
        id="search-bar"
      ></input>
      {(userIsTyping || searchClicked) && (
        <SearchPopup
          searchQuery={searchQuery}
          userIsTyping={userIsTyping}
          userHasTyped={userHasTyped}
        />
      )}
      {searchEngaged && <Backdrop setPopoverDisplayState={setUserIsTyping} />}
    </div>
  );
}

function SearchPopup({ searchQuery, userIsTyping, userHasTyped }) {
  ////    POPUP DISPLAYING LIST OF COINS BASED ON USER'S SEARCH

  // const searchResults = searchData

  // object containing context values for api querying
  const apiQuery = {
    searchQuery: searchQuery,
  };

  // api call
  const {
    data: searchResults,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryFn: fetchSearchedCoins,
    queryKey: ['search', apiQuery],
    cacheTime: Infinity,
  });

  // if search input is blank, user has not typed, return search prompt
  if (!userHasTyped) {
    return (
      <div className="search-popup" style={{ display: 'block' }}>
        <p className="search-popup-hint">type something to search</p>
      </div>
    );
  }

  // set handlers for api fetch states
  if (isFetching) {
    return (
      <div className="search-popup">
        <LineLoadingSignal />
      </div>
    );
  }
  if (isError && !isFetching) {
    return (
      <div className="search-popup">
        <ReloadSignal refreshActionName={'loading coins'} refreshClickFn={refetch} />
      </div>
    );
  }

  return (
    <div className={`search-popup ${userIsTyping && 'show-search-popup'}`}>
      {(searchResults &&
        searchResults.map((result, index) => {
          return <SearchedCoin key={index} coinInfo={result} />;
        })) || <NoDataSignal expectedData={'matching coins'} />}
    </div>
  );
}

function SearchedCoin({ coinInfo }) {
  ////    SEARCHED COIN DISPLAY WITH LINK

  return (
    <Link to={`coin/${coinInfo.api_symbol}`} className="searched-coin">
      <div className="searched-thumb-container">
        <img src={coinInfo.thumb} className="searched-thumb" loading="lazy" alt="coin logo"></img>
        {/* <img src="/css-icon.svg" className="searched-thumb"></img> */}
      </div>
      <div className="searched-coin-meta">
        <span className="searched-symbol">{coinInfo.symbol}</span>{' '}
        <span className="searched-name">{coinInfo.name}</span>
      </div>
    </Link>
  );
}
