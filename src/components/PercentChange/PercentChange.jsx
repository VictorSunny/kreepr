import './PercentChange.css';

export default function PercentChange({ percentage, textDetails }) {
  ////    STYLES PERCENTAGE CHANGE VALUE

  // if value is positive, returns span text element stlyed green with upwards arrow
  // if value is negative, returns span text element stlyed red with downwards arrow
  // adds "%" sign

  return (
    <p className="coin-percent-change">
      <span className={`${percentage > 0 ? 'positive-percent' : 'negative-percent'}`}>
        {percentage > 0 ? String.fromCharCode(9650) : String.fromCharCode(9660)} {percentage}%
      </span>
      {textDetails && ` ${String.fromCharCode(46)}${textDetails}`}
    </p>
  );
}
