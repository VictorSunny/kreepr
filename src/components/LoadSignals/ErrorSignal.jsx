import { useNavigate, useLocation } from 'react-router-dom';
import './LoadSignals.css';
import ErrorIcon from '../../assets/icons/browser-error-icon.svg?react';
import SiteLogo from '../SiteLogo/SiteLogo';

function ErrorSignal() {
  const navigator = useNavigate();
  const location = useLocation();
  // direct user to coin page on click of coin row
  const goHome = () => {
    navigator('');
  };
  const refreshPage = () => {
    navigator(location.pathname, { replace: true });
  };

  return (
    <div className="reload-signal signal-modal">
      <SiteLogo />
      <div>
        <ErrorIcon
          className="signal-icon signal-action-response-icon"
          loading="eager"
          fetchPriority="high"
          alt="error image"
        />
        <p>Sorry. An unexpected error occured.</p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '3.2rem',
            placeSelf: 'center',
          }}
        >
          <button
            className="btn signal-btn"
            type="button"
            aria-label="go to homepage"
            onClick={goHome}
          >
            Go Home
          </button>
          <button
            className="btn signal-btn"
            type="button"
            aria-label="try reload"
            onClick={refreshPage}
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorSignal;
