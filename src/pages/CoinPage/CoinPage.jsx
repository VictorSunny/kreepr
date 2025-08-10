import { useQuery } from '@tanstack/react-query';
import { useEffect, lazy } from 'react';
import { useParams } from 'react-router-dom';

import DislikeIcon from '../../assets/icons/thumbs-down-black-icon.svg?react';
import LikeIcon from '../../assets/icons/thumbs-up-black-icon.svg?react';
import NoDataSignal from '../../components/LoadSignals/NoDataSignal';
import PrevPageButton from '../../components/PrevPageButton/PrevPageButton';
import { useApiQueryContext } from '../../contexts/ApiQueryContext';
import { useSiteNavigationContext } from '../../contexts/SiteNavigationContext';
import { fetchCoinData } from '../../services/fetchCoinData';
import amountGrouper from '../../utilities/amountGrouper';
import dateFormatter from '../../utilities/dateFormatter';
import numberGrouper from '../../utilities/numberGrouper';
import urlParser from '../../utilities/urlParser';

import LineChartWrapper from './Charts/LineChartWrapper';

const LineLoadingSignal = lazy(() => import('../../components/LoadSignals/LineLoadingSignal'));
const ReloadSignal = lazy(() => import('../../components/LoadSignals/ReloadSignal'));

// const historicData = lazy(() => import('../../services/historicData'))

import './CoinPage.css';

function CoinPage() {
  ////    PAGE DISPLAYING EXTRA INFORMATION ON COIN, AS WELL AS CHARTS

  // get url params for ':coinID'
  const { coinID } = useParams();

  // import necessary context data
  const { changeCurrentUrlPath, changeBreadcrumbUrlPaths } = useSiteNavigationContext();
  const { preferredCurrency } = useApiQueryContext();

  // class for formatting raw numbers into readable currency values
  const currencyFormatter = amountGrouper(preferredCurrency.value);

  // current breadcrumbs page path
  const breadcrumbUrlPaths = [
    { value: '', text: 'Home' },
    { value: 'all-coins', text: 'All Coins' },
    { value: 'coin', text: coinID },
  ];

  // object containing context data for api querying
  const apiQuery = {
    coinID: coinID,
  };

  useEffect(() => {
    // set current url path to highlight nav button on header
    changeCurrentUrlPath({ value: 'coin/', text: 'Coin Page' });

    // set breadcrumbs path trail to match current page path
    changeBreadcrumbUrlPaths(breadcrumbUrlPaths);

    // scroll to top of page on every mount
    window.scrollTo(0, 0, 'smooth');
  }, []);

  // api call
  const {
    data: coinData,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryFn: fetchCoinData,
    queryKey: ['coinPage', apiQuery],
  });

  // return value while initial api fetch is loading
  if (isFetching) {
    return (
      <div className="page-container">
        <LineLoadingSignal />
      </div>
    );
  }
  // return value if initial api fetch fails
  if (isError && !isFetching) {
    return (
      <div className="page-container">
        <ReloadSignal refreshActionName={'coin information'} refreshClickFn={refetch} />
      </div>
    );
  }

  const currencyFormatHelper = (currencyNumber) => {
    if (currencyNumber) {
      return (
        currencyFormatter.format(currencyNumber)
      )
    } else {
      return 'unavailable'
    }
  }
  const numberGrouperFormatHelper = (numberValue) => {
    if (numberValue) {
      return (
        numberGrouper.format(numberValue)
      )
    } else {
      return 'unavailable'
    }
  }
  const dateFormatHelper = (dateISO) => {
    if (dateISO) {
      return (
        dateFormatter(dateISO)
      )
    } else {
      return ''
    }
  }

  // declare values to be used in page elements to reduce jsx verbosity
  const coinMarketCapRank = coinData?.market_cap_rank;
  const coinName = coinData?.name;

  const coinPrice = currencyFormatHelper(coinData?.market_data.current_price[preferredCurrency.value])
  const coinMarketCap = currencyFormatHelper(coinData?.market_data.market_cap[preferredCurrency.value])
  const coinVolume = currencyFormatHelper(coinData?.market_data.total_volume[preferredCurrency.value])

  const coinATH = currencyFormatHelper(coinData?.market_data.ath[preferredCurrency.value]);
  const coinATL = currencyFormatHelper(coinData?.market_data.atl[preferredCurrency.value]);

  const coinATHDate = dateFormatHelper(coinData?.market_data.ath_date[preferredCurrency.value]);
  const coinATLDate = dateFormatHelper(coinData?.market_data.atl_date[preferredCurrency.value]);

  const coinTotalSupply = numberGrouperFormatHelper(coinData?.market_data.total_supply);
  const coinCirculatingSupply = numberGrouperFormatHelper(coinData?.market_data.circulating_supply);

  const coinDescription = coinData?.description.en;
  const coinGenesisDate = coinData?.genesis_date;
  const coinUpvotesPercent = coinData?.sentiment_votes_up_percentage;
  const coinDownvotesPercent = coinData?.sentiment_votes_down_percentage;

  const coinHomepageLink = coinData?.links.homepage[0];
  const coinWhitepaperLink = coinData?.links.whitepaper;
  const coinBlockchainSites = coinData?.links.blockchain_site;

  // declare variables to be used by line chart wrapper
  const chartTitleData = {
    prices: {
      name: 'Current Price',
      data: coinPrice,
    },
    market_caps: {
      name: 'Market Cap',
      data: coinMarketCap,
    },
    total_volumes: {
      name: 'Volume',
      data: coinVolume,
    },
  };

  return (
    <div className="page-container coin-page-container">
      <div className="sticky-intro coin-sticky-intro">
        <div className="coin-intro-details-container">
          <div className="intro-logo-name">
            <img
              className="coin-logo"
              src={coinData?.image.large}
              loading="eager"
              alt="coin logo"
            ></img>
            {/* <img className="coin-logo" src="/css-icon.svg" loading="eager" alt="coin logo"></img> */}
            <h3 className="coin-ticker-name">{coinData?.symbol.toUpperCase()}</h3>
          </div>
          <h3>{coinName}</h3>
        </div>
      </div>

      <div id="coin-page-main-content">
        <div className="section line-chart-section section-1">
          {/* wrapper containing coin chart canvas */}
          <LineChartWrapper
            className="line-chart"
            titleData={chartTitleData}
            currency={preferredCurrency.value}
            coinID={coinID}
          />
        </div>

        <div className="section currencies-section section-2">

          <div className="sub-section">
            <p className="coin-rank">Rank: #{coinMarketCapRank}</p>
            <p>
              <span className="title">Price:</span>
              <span>{coinPrice}</span>
            </p>
            <p>
              <span className="title">Market Cap:</span>
              <span>{coinMarketCap}</span>
            </p>
            <p>
              <span className="title">Volume:</span>
              <span>{coinVolume}</span>
            </p>
          </div>
      
          <div className="sub-section">
            <p>
              <span className="title">Total Supply:</span>
              <span>{coinTotalSupply}</span>
            </p>
            <p>
              <span className="title">Circulating Supply:</span>
              <span>{coinCirculatingSupply}</span>
            </p>
          </div>
        </div>

        <div className="section high-low-section section-3">
          <div className="sub-section">
            <p>
              <span className="title">All Time High:</span>
              <span>{coinATH}</span>
            </p>
            <p>{coinATHDate}</p>
          </div>
          <div className="sub-section">
            <p>
              <span className="title">All Time Low:</span>
              <span>{coinATL}</span>
            </p>
            <p>{coinATLDate}</p>
          </div>
        </div>

        <div className="section about-section section-4">
          <span className="title section-title">About</span>

          <div className="about-text">
            {(coinDescription && <p>{coinDescription}</p>) || (
              <NoDataSignal expectedData={'description'} />
            )}
          </div>
          <div className="coin-genesis">
            <span className="title">Created On:</span>
            <span>
              {(coinGenesisDate && coinGenesisDate) || (
                <NoDataSignal expectedData={'origin date information'} />
              )}
            </span>
          </div>

          <div className="coin-votes">
            <div>
              <LikeIcon className="vote-icon positive-vote-icon" loading="lazy" alt="likes icon" />
              <span>
                {coinUpvotesPercent || (coinUpvotesPercent == 0 && `${coinUpvotesPercent}%`) || '?'}
              </span>
            </div>
            <div>
              <DislikeIcon
                className="vote-icon negative-vote-icon"
                loading="lazy"
                alt="dislikes icon"
              />
              <span>
                {coinDownvotesPercent ||
                  (coinDownvotesPercent == 0 && `${coinDownvotesPercent}%`) ||
                  '?'}
              </span>
            </div>
          </div>
        </div>

        <div className="section links-section section-5">
          <div className="coin-links-container">

            <div>
              <span className="title section-title">Links</span>
              <ol className="coin-sub-links-list">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={coinHomepageLink}
                  className="btn coin-link"
                >
                  Homepage
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={coinWhitepaperLink}
                  className="btn coin-link"
                >
                  Whitepaper
                </a>
              </ol>
            </div>

            <div>
              <span className="title section-title">Blockchain Sites</span>
              <ol className="coin-sub-links-list">
                {(coinBlockchainSites &&
                  coinBlockchainSites.map((siteLink, index) => {
                    return (
                      <li key={index}>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn coin-link"
                          href={siteLink}
                        >
                          {urlParser(siteLink)}
                        </a>
                      </li>
                    );
                  }))
                  ||
                  <NoDataSignal expectedData={'blockchain site links'} />
                }
              </ol>
            </div>
          </div>
        </div>
      </div>

      <PrevPageButton>Go Back</PrevPageButton>
    </div>
  );
}

export default CoinPage;
