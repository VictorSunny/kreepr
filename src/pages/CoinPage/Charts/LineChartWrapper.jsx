import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';
import { useState } from 'react';

import { useThemeContext } from '../../../contexts/ThemeContext';
import { fetchCoinChartData } from '../../../services/fetchCoinData';
import HistoryTimeframeDropdown from '../HistoryTimeframeDropdown';
import './lineChartWrapper.css';
import { useApiQueryContext } from '../../../contexts/ApiQueryContext';
import NoDataSignal from '../../../components/LoadSignals/NoDataSignal';

const LineChart = lazy(() => import('./LineChart'));

const LineLoadingSignal = lazy(() => import('../../../components/LoadSignals/LineLoadingSignal'));
const ReloadSignal = lazy(() => import('../../../components/LoadSignals/ReloadSignal'));
// const chartData = lazy(() => import('../../../services/chartData'))

function LineChartWrapper({ titleData, currency, coinID }) {
  const [chartInfoType, setChartInfoType] = useState({
    name: 'Price',
    value: 'prices',
  });

  const { darkTheme } = useThemeContext();

  const { historyTimeframe } = useApiQueryContext();

  const apiQuery = {
    coinID: coinID,
    currency: currency,
    timeFrame: historyTimeframe.value,
  };

  const {
    data: coinChartData,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryFn: fetchCoinChartData,
    queryKey: [`coin:${coinID}/currency:${currency}/chart`, apiQuery],
  });

  if (isFetching) {
    return (
      <div className="page-container">
        <LineLoadingSignal />
      </div>
    );
  }
  if (isError && !isFetching) {
    return (
      <div className="page-container">
        <ReloadSignal refreshActionName={'loading chart'} refreshClickFn={refetch} />
      </div>
    );
  }

  const extraChartOptions = {
    colors: {
      dark: {
        text: '#F1F2F1',
        border: '#F1F2F1',
        background: '#0A0909',
        chartLine: '#f5700a',
      },
      light: {
        text: '#232929',
        border: '#141414',
        background: '#6d7e7e',
        chartLine: '#f5700a',
      },
    },
  };

  const chartDataTypes = [
    {
      name: 'Market Cap',
      value: 'market_caps',
    },
    {
      name: 'Price',
      value: 'prices',
    },
    {
      name: 'Volume',
      value: 'total_volumes',
    },
  ];

  const handleChartButtonClick = (e) => {
    // set dropdown value to button value on click if button if original value is different from clicked value
    const newValue = JSON.parse(e.target.value);
    const buttonIsActive = chartInfoType.value != newValue.value;
    if (buttonIsActive) {
      setChartInfoType(newValue);
    }
  };

  return (
    <>
      <p className="chart-title">
        <span className="title">{titleData[chartInfoType.value].name}:</span>{' '}
        {titleData[chartInfoType.value].data}
      </p>

      <div className="chart-container">
        {(coinChartData && (
          <>
            <HistoryTimeframeDropdown />
            <LineChart
              coinID="Bitcoin"
              infoType={chartInfoType}
              chartData={coinChartData}
              darkTheme={darkTheme}
              extraOptions={extraChartOptions}
            />
            <div className="btns-container">
              {chartDataTypes.map((type) => {
                return (
                  <ChartTypeButton
                    key={type.value}
                    buttonValue={type}
                    onClickCallback={handleChartButtonClick}
                    referencedStateValue={chartInfoType}
                  />
                );
              })}
            </div>
          </>
        )) || <NoDataSignal expectedData={'chart data'} />}
      </div>
    </>
  );
}

export default LineChartWrapper;

function ChartTypeButton({ buttonValue, onClickCallback, referencedStateValue }) {
  return (
    <button
      className={`btn chart-type-btn ${referencedStateValue.value == buttonValue.value && 'active-chart-type-btn'}`}
      value={JSON.stringify(buttonValue)}
      onClick={onClickCallback}
      type="button"
      aria-label={`view ${buttonValue.name} chart`}
    >
      {buttonValue.name}
    </button>
  );
}
