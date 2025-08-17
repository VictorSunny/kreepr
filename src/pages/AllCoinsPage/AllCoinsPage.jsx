import { useInfiniteQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useEffect, lazy } from 'react';

import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton';
import { useApiQueryContext } from '../../contexts/ApiQueryContext';
import { useSiteNavigationContext } from '../../contexts/SiteNavigationContext';
import fetchAllCoins from '../../services/fetchAllCoins';

import CoinSorterDropdown from './CoinSorterDropdown';
import RegularCoinTable from './RegularCoinTable';

const LineLoadingSignal = lazy(() => import('../../components/LoadSignals/LineLoadingSignal'));
const ReloadSignal = lazy(() => import('../../components/LoadSignals/ReloadSignal'));

import './AllCoinsPage.css';

export default function AllCoinsPage() {
  ////    PAGE DISPLAYING TABLE FOR COINS

  const { changeCurrentUrlPath, changeBreadcrumbUrlPaths } = useSiteNavigationContext();

  // import necessary context values for api querying
  const { coinSortOrder, preferredCurrency } = useApiQueryContext();

  const breadcrumbUrlPaths = [
    { value: '', text: 'Home' },
    { value: 'all-coins', text: 'All Coins' },
  ];

  useEffect(() => {
    // set current url path to highlight necessary navbar button on header
    changeCurrentUrlPath({ value: 'all-coins', text: 'All Coins' });

    // change the breadcrumbs links trail to match current page hierarchy
    changeBreadcrumbUrlPaths(breadcrumbUrlPaths);

    // scroll up if page mounts for the first time
    // else, scroll to last position
  }, []);

  // create object for api query function
  const apiQuery = {
    currency: preferredCurrency.value,
    sort: coinSortOrder.value,
  };

  // api call usingbapiquery object containing context data
  const {
    data: coinPages,
    isFetching,
    isFetchingNextPage,
    isFetchNextPageError,
    isError,
    refetch,
    error,
    fetchNextPage,
  } = useInfiniteQuery({
    queryFn: fetchAllCoins,
    queryKey: ['allCoins', apiQuery],
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => allPages.length + 1,
  });

  // set return values while initial api fetch is ongoing
  if (isFetching && !isFetchingNextPage) {
    return (
      <div className="page-container">
        <LineLoadingSignal />
      </div>
    );
  }
  // set return value if initial api fetch fails
  if (isError && !isFetching) {
    return (
      <div className="page-container">
        <ReloadSignal refreshActionName={'loading coins'} refreshClickFn={refetch} />
      </div>
    );
  }

  return (
    <div className="page-container all-coins-page-container">
      <div className="sorter-util">
        {/* coin sorter dropdown component */}
        <CoinSorterDropdown scrollToTop={true} />
      </div>
      <div className="coins-table-container">
        {/* coin table with "coinpages" data returned from api fetch and preferredcurrency context */}
        {coinPages && (
          <>
            <RegularCoinTable coinPages={coinPages} preferredCurrency={preferredCurrency} />
            <ScrollToTopButton />
            <motion.button
              className={`btn page-nav-btn ${isFetchingNextPage && 'loading'}`}
              type="button"
              aria-label="load more coins"
              onClick={fetchNextPage}
              layout
            >
              {/* change button value while fetching next page */}
              {(isFetchingNextPage && 'loading') ||
                (isFetchNextPageError && 'retry') ||
                'load more'}
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
}
