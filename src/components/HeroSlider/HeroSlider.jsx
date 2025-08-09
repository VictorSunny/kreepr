import './HeroSlider.css';

function HeroSlider({ popularCoins }) {
  // INFINITE SLIDING CAROUSEL DISPLAYING POPULAR COIN DETAILS

  return (
    <div className="hero-carousel">
      <div className="hero-slider-container">
        {/* first slider */}
        <div className="hero-slider">
          {popularCoins?.map((coin, i) => {
            return <HeroCoinFlyer key={i} coin={coin} />;
          })}
        </div>

        {/* duplicated of first slider for infinite slide illusion */}
        <div className="hero-slider">
          {popularCoins?.map((coin, i) => {
            return <HeroCoinFlyer key={i} coin={coin} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default HeroSlider;

function HeroCoinFlyer({ coin }) {
  // component containing coin logo, name, and ticker symbol.
  // displayed in sliding carousel

  const coinTickerSymbol = coin.item.symbol;
  const coinName = coin.item.name;
  const coinThumb = coin.item.small;

  return (
    <div className="hero-coin-flyer">
      <img className="icon hero-icon" src={coinThumb} loading="eager" alt="coin logo"></img>
      <p className="hero-coin-meta">
        <span className="hero-coin-ticker">{coinTickerSymbol}</span>{' '}
        <span className="hero-coin-name">{coinName}</span>
      </p>
    </div>
  );
}
