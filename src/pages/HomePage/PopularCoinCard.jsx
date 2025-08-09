import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { useApiQueryContext } from '../../contexts/ApiQueryContext';
import currencyShortener from '../../utilities/numberShortener';

import './PopularCoinCard.css';
import PercentChange from '../../components/PercentChange/PercentChange';

const MotionLink = motion.create(Link);

export default function PopularCoinCard({ coin, id, index }) {
  ////    CARD COMPONENT DISPLAYING INFORMATION ON POPULAR COIN

  const { preferredCurrency } = useApiQueryContext();

  const currencyFormatter = currencyShortener(preferredCurrency.value);

  const coinMarketCapRank = coin.market_cap_rank;
  const CoinTickerSymbol = coin.symbol;
  const coinName = coin.name;
  const coinSlug = coin.slug;
  const coinThumb = coin.small;
  const coinSparkline = coin.data.sparkline;

  const coinPrice = Number(coin.data.price.toFixed(2));
  const coinMarketCap = coin.data.market_cap.replace(/\D/g, '');
  const coinVolume = coin.data.total_volume.replace(/\D/g, '');

  const coinPastDayPriceChange = Number(
    coin.data.price_change_percentage_24h[preferredCurrency.value].toFixed(1)
  );

  return (
    <MotionLink
      initial={{
        scale: 0.8,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      transition={{
        delay: index * 0.08,
      }}
      to={`coin/${coinSlug}`}
      className="popular-coin-card"
      id={id}
    >
      <div className="popular-coin-meta popular-coin-card-section">
        <div className="coin-logo-container pop-sub">
          <img src={coinThumb} className="coin-logo" loading="lazy" alt="coin logo"></img>
          {/* <img src="/css-icon.svg" className="coin-logo"></img> */}
        </div>
        <div className="coin-details">
          <div className="coin-rank">#{coinMarketCapRank}</div>
          <div className="coin-symbol">{CoinTickerSymbol}</div>
          <div className="coin-name">{coinName}</div>
        </div>
      </div>

      <table className="popular-coin-data popular-coin-card-section">
        <tbody>
          <tr className="coin-price">
            <th scope="row">price:</th>
            <td>{currencyFormatter.format(coinPrice)}</td>
          </tr>
          <tr className="coin-market-cap">
            <th scope="row">m.cap:</th>
            <td>{currencyFormatter.format(coinMarketCap)}</td>
          </tr>
          <tr className="coin-volume">
            <th scope="row">volume:</th>
            <td>{currencyFormatter.format(coinVolume)}</td>
          </tr>
        </tbody>
      </table>

      <div className="coin-history popular-coin-card-section">
        <div className="coin-sparkline-container">
          <img
            src={coinSparkline}
            className="coin-sparkline"
            loading="auto"
            alt="coin sparkline"
          ></img>
          {/* <img src="/redis-icon.svg" className="coin-sparkline"></img> */}
        </div>
        <PercentChange percentage={coinPastDayPriceChange} />
      </div>
    </MotionLink>
  );
}
