import { Link } from 'react-router-dom';
import SiteMainLogo from '../../assets/KreepR.svg?react';
import './SiteLogo.css';

function SiteLogo() {
  /////   SITE LOGO

  // Directs user to homepage on click
  return (
    <Link to={''} className="site-logo-link" aria-label="visit homepage">
      <SiteMainLogo className="site-main-logo" loading="eager" alt="site logo" />
    </Link>
  );
}

export default SiteLogo;
