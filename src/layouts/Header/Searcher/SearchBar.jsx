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

// import searchData from '../../../api/searchData'

export default function SearchBar({ mobileTriggered }) {
  const [searchQuery, setSearchQuery] = useState('');
  // lets search popup list know when to display
  const [searchEngaged, setSearchEngaged] = useState(false);
  //immediately triggers backdrop when search bar is focused
  const [userHasTyped, setUserHasTyped] = useState(false);
  const _stateResetLog = useResetStates([setSearchEngaged]);

  // set abortcontroller ref for blocking excessive api calls upon each letter typed in search box
  const controllerRef = useRef()
  // set ref for search bar
  const searchBarInput = useRef();

  // function for changing search query
  const changeSearchQuery = async () => {
    // check if search input is empty. if empty, display search prompt in search popup
    const searchText = searchBarInput.current.value

    // check if search value is empty and set state value accordingly. will determine whether to show search helper message
    if (searchText == '') {
      setUserHasTyped(false)
     } else {
      setUserHasTyped(true);
    }

    // wait 3 seconds after user stops typing. blocks unnecessary re-runs
    await sleep(3000);
    // assert that user is typing to display search popup and backdrop
    setSearchEngaged(true);
    // send search input to search popup to handle api querying
    (searchText != '') && setSearchQuery(searchText);
  }

  // function triggered each time search input changes
  const searchAction = () => {
    // set controller to watch for new controllers
    controllerRef.current = new AbortController();
    // if previous searchaction is running, terminate previous
    if (controllerRef.current) {
      controllerRef.current.abort()
    };

    changeSearchQuery()
  };

  const handleFocus = () => {
    setSearchEngaged(true)
  }

  // if searchbar component mount is mobile triggered, auto focus on searchbar
  useEffect(() => {
    mobileTriggered && searchBarInput.current?.focus();
  }, []);
  // clear search text upon close of search dialogue
  useEffect(() => {
    if (!searchEngaged) {
      searchBarInput.current.value = '';
      setSearchQuery('');
    }
  }, [searchEngaged])


  return (
    <div id="search-bar-container">
      <input
        ref={searchBarInput}
        onFocus={handleFocus}
        onChange={searchAction}
        type="text"
        placeholder="search for coins..."
        id="search-bar"
        autoComplete="off"
      ></input>
      {searchEngaged && (
        <>
          <SearchPopup
            searchQuery={searchQuery}
            userHasTyped={userHasTyped}
          />
          <Backdrop setPopoverDisplayState={setSearchEngaged} />
        </>
      )}
    </div>
  );
}

function SearchPopup({ searchQuery, userHasTyped }) {
  ////    POPUP DISPLAYING LIST OF COINS BASED ON USER'S SEARCH

  // // const searchResults = searchData
  
  // object containing context values for api querying
  const apiQuery = {
    searchQuery: searchQuery,
  };
  // api call
  const {
    data: searchResults,
    isFetching,
    isError,
    status,
    refetch,
  } = useQuery({
    queryFn: fetchSearchedCoins,
    queryKey: ['search', apiQuery],
    cacheTime: Infinity,
  });

  if (!userHasTyped) {
    return (
      <div className="search-popup">
        <p className="search-popup-hint">type something to search</p>
      </div>
    )
  }
 
  return (
    <div className="search-popup">
      {
        (isFetching) &&
        <LineLoadingSignal />
        ||
        (isError && !isFetching) &&
        <ReloadSignal refreshActionName={'searching'} refreshClickFn={refetch} />
        ||
        (Array.isArray(searchResults) && (searchResults.length == 0)) &&
        <NoDataSignal expectedData={"matching coins"} />
        ||
        (Array.isArray(searchResults)) &&
        searchResults.map((result, index) => {
          return <SearchedCoin key={index} coinInfo={result} />;
        })
      }
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
        <span className="searched-symbol">{coinInfo.symbol}</span> - <span className="searched-name">{coinInfo.name}</span>
      </div>
    </Link>
  );
}
