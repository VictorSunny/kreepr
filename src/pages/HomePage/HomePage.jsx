import { useEffect, lazy } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useSiteNavigationContext } from '../../contexts/SiteNavigationContext';
import HeroSlider from '../../components/HeroSlider/HeroSlider';
import PopularCoinCard from './PopularCoinCard';
import GoToPageButton from '../../components/GoToPageButton/GoToPageButton';
import './Homepage.css';

import fetchTrendingCoins from '../../services/fetchTrendingCoins';

const LineLoadingSignal = lazy(() => import('../../components/LoadSignals/LineLoadingSignal'));
const ReloadSignal = lazy(() => import('../../components/LoadSignals/ReloadSignal'));

// const trendingData = lazy(() => import('../../services/trendingData'))

function HomePage() {
  ////    SITE HOMEPAGE

  // import necessary context data
  const { changeCurrentUrlPath, changeBreadcrumbUrlPaths } = useSiteNavigationContext();

  // current breadcrumbs page path
  const breadcrumbUrlPaths = [{ value: '', text: 'Home' }];

  //
  useEffect(() => {
    // set breadcrumbs path trail to match current page path
    changeBreadcrumbUrlPaths(breadcrumbUrlPaths);

    // set current url path to highlight nav button on header
    changeCurrentUrlPath({ value: '', text: 'Home' });

    // scroll to top on each mount
    window.scrollTo(0, 0, 'smooth');
  }, []);

  // api call
  const {
    data: popularCoins,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryFn: fetchTrendingCoins,
    queryKey: ['trendingCoins'],
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
        <ReloadSignal refreshActionName={'loading coins'} refreshClickFn={refetch} />
      </div>
    );
  }

  // const popularCoins = JSON.parse(trendingData).coins

  return (
    <div className="page-container home-page-container">
      {/* hero section - sliding carousel of coin images with names */}
      <HeroSlider popularCoins={popularCoins} />

      {/* main page content containing arrangement of popular coin cards */}
      <div id="popular-coins-container">
        {popularCoins?.map((coin, index) => {
          return (
            <PopularCoinCard
              key={index}
              id={`coin-card-${index + 1}`}
              coin={coin.item}
              index={index}
            />
          );
        })}
      </div>

      {/* show see more button if popularcoins data has been fetched */}
      {popularCoins && <GoToPageButton toUrlPath={'/all-coins'}>All Coins</GoToPageButton>}
    </div>
  );
}

export default HomePage;
