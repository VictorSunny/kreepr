import { useRef, lazy, Suspense } from 'react';
import { Chart, registerables } from 'chart.js/auto';
import 'chartjs-adapter-luxon';
import Zoom from 'chartjs-plugin-zoom';
import { Line } from 'react-chartjs-2';

import numberShortener from '../../../utilities/numberShortener';
import chartTooltipAmountGrouper from '../../../utilities/chartTooltipAmountGrouper';
import checkScreenWidth from '../../../utilities/checkScreenWidth';

import { useApiQueryContext } from '../../../contexts/ApiQueryContext';

const ZoomInIcon = lazy(() => import('../../../assets/icons/zoom-in-icon.svg?react'));
const ZoomOutIcon = lazy(() => import('../../../assets/icons/zoom-out-icon.svg?react'));
const ResetZoomIcon = lazy(
  () => import('../../../assets/icons/four-arrows-inside-line-icon.svg?react')
);
const PanLeftIcon = lazy(
  () => import('../../../assets/icons/chevron-direction-left-round-outline-icon.svg?react')
);
const PanRightIcon = lazy(
  () => import('../../../assets/icons/chevron-direction-right-round-outline-icon.svg?react')
);

Chart.register(...registerables, Zoom);

function LineChart({ infoType, chartData, darkTheme, extraOptions }) {
  const chart = useRef();

  const { preferredCurrency } = useApiQueryContext();

  const currencyShortener = numberShortener(preferredCurrency.value);
  const tooltipCurrencyFormatter = chartTooltipAmountGrouper(preferredCurrency.value);

  const priceData = chartData[infoType.value];

  const chartTruth = {
    EARLIEST_DATE: priceData[0][0],
    LATEST_DATE: priceData[priceData.length - 1][0],
  };

  const { isMobile, isTablet, isDesktop } = checkScreenWidth();

  const data = {
    datasets: [
      {
        label: 'price',
        data: priceData,
        backgroundColor: darkTheme
          ? extraOptions.colors.dark.background
          : extraOptions.colors.light.background,
        borderWidth: isMobile ? 1 : 1.5,
        borderColor: darkTheme
          ? extraOptions.colors.dark.chartLine
          : extraOptions.colors.light.chartLine,
        tension: 0.4,
        font: {
          family: 'monospace',
          size: 20,
        },
      },
    ],
  };
  const options = {
    radius: isMobile ? 0.4 : 0.6,
    hitRadius: 30,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        min: chartTruth.EARLIEST_DATE,
        max: chartTruth.LATEST_DATE,
        time: {
          tooltipFormat: 'MMM d, y - h:mm a',
          displayFormats: {
            millisecond: 'HH:mm:ss.SSS -- dd-M-yyyy',
            second: 'HH:mm:ss -- dd-M-yy',
            minute: 'h:mm a -- dd-M-yy',
            hour: 'h:mm a -- dd-M-yy',
            day: 'dd-M-y',
            week: 'MMM dd',
            month: 'MMM yyyy',
            quarter: 'Qq yyyy',
            year: 'yyyy',
          },
        },
        grid: {
          display: false,
        },
        ticks: {
          color: darkTheme ? extraOptions.colors.dark.text : extraOptions.colors.light.text,
          source: 'data',
          autoSkip: true,
          maxTicksLimit: isMobile ? 3 : 6,
          font: {
            size: isMobile ? 8 : 12,
          },
        },
        border: {
          width: 1,
          color: darkTheme ? extraOptions.colors.dark.border : extraOptions.colors.light.border,
        },
      },
      y: {
        grid: {
          display: true,
        },
        grace: '30%',
        border: {
          width: 1,
          color: darkTheme ? extraOptions.colors.dark.border : extraOptions.colors.light.border,
        },
        ticks: {
          color: darkTheme ? extraOptions.colors.dark.text : extraOptions.colors.light.text,
          source: 'data',
          autoSkip: true,
          maxTicksLimit: isMobile || isTablet ? 4 : 6,
          font: {
            size: isMobile ? 8 : 12,
          },
          callback: (value, index) => {
            if (index === 0) {
              return '';
            }
            return currencyShortener.format(value);
          },
        },
      },
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        },
        limits: {
          x: {
            min: chartTruth.EARLIEST_DATE,
            max: chartTruth.LATEST_DATE,
            minRange: (chartTruth.LATEST_DATE - chartTruth.EARLIEST_DATE) * 0.04,
          },
        },
      },
      tooltip: {
        backgroundColor: darkTheme
          ? extraOptions.colors.dark.background
          : extraOptions.colors.light.background,
        titleColor: 'white',
        titleFont: {
          size: isMobile ? 8 : 11,
        },
        bodyColor: 'white',
        bodyFont: {
          size: isMobile ? 12 : 14,
        },
        padding: isMobile ? 8 : 10,
        displayColors: false,
        callbacks: {
          label: (context) => {
            return `${String(infoType.name)}: ${tooltipCurrencyFormatter.format(context.raw[1])}`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
    layout: {
      padding: {
        left: isMobile ? 8 : 20,
        right: 20,
      },
    },
  };

  const zoomIn = () => {
    if (chart.current) {
      return chart.current?.zoom(1.2);
    }
  };
  const zoomOut = () => {
    if (chart.current) {
      return chart.current?.zoom(0.8);
    }
  };
  const resetZoom = () => {
    if (chart.current) {
      return chart.current?.resetZoom();
    }
  };
  const panLeft = () => {
    if (chart.current) {
      return chart.current?.pan({ x: 32, y: 0 });
    }
  };
  const panRight = () => {
    if (chart.current) {
      return chart.current?.pan({ x: -32, y: 0 });
    }
  };

  return (
    <>
      <Suspense fallback={<div>loading chart icons...</div>}>
        <div className="chart-zoom-btns-container">
          {(isDesktop || isTablet) && (
            <>
              <button
                className="chart-zoom-btn btn"
                onClick={panLeft}
                type="button"
                aria-label="pan chart left"
              >
                <PanLeftIcon className="chart-zoom-icon" loading="auto" alt="arrow left icon" />
              </button>
              <button
                className="chart-zoom-btn btn"
                onClick={panRight}
                type="button"
                aria-label="pan chart right"
              >
                <PanRightIcon className="chart-zoom-icon" loading="auto" alt="arrow right icon" />
              </button>
              <button
                className="chart-zoom-btn btn"
                onClick={zoomIn}
                type="button"
                aria-label="zoom into chart"
              >
                <ZoomInIcon className="chart-zoom-icon" loading="auto" alt="zoom in icon" />
              </button>
              <button
                className="chart-zoom-btn btn"
                onClick={zoomOut}
                type="button"
                aria-label="zoom out chart"
              >
                <ZoomOutIcon className="chart-zoom-icon" loading="auto" alt="zoom out icon" />
              </button>
            </>
          )}
          <button
            className="chart-zoom-btn btn"
            onClick={resetZoom}
            type="button"
            aria-label="reset chart zoom"
          >
            <ResetZoomIcon className="chart-zoom-icon" loading="auto" alt="inward arrows icon" />
          </button>
        </div>
        <div>
          <Line data={data} options={options} ref={chart} />
        </div>
      </Suspense>
    </>
  );
}

export default LineChart;
