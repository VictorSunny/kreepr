import { useEffect, useState, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import Hamburgericon from '../../../assets/icons/hamburger-menu-icon.svg?react';
import './HamburgerMenu.css';
import Backdrop from '../../../components/Backdrop/Backdrop';

const Sidebar = lazy(() => import('./Sidebar'));

export default function HamburgerMenu() {
  ////    SIDEBAR MENU

  // set state to monitor when sidebar is opened
  const [sidebarActive, setSidebarActive] = useState(false);

  // function to handle sidebar button toggle
  const toggleSideBar = () => {
    setSidebarActive((prev) => !prev);
  };

  // close sidebar if page is switched; when user clicks on any link in sidebar
  const locator = useLocation();
  useEffect(() => {
    setSidebarActive(false);
  }, [locator.pathname]);

  // make webpage unscrollable while sidebar is open to avoid scroll behaviour leaking
  // user can scroll within sidebar without unwantedly scrolling page behind sidebar popup

  return (
    <>
      <button
        onClick={toggleSideBar}
        className="header-hamburger-btn"
        type="button"
        aria-label="open hamburger menu"
      >
        <Hamburgericon
          className="icon header-hamburger-icon"
          alt="hamburger menu icon"
          loading="lazy"
        />
      </button>
      {sidebarActive && (
        <>
          <Sidebar closeButtonCallback={toggleSideBar} />
          <Backdrop />
        </>
      )}
    </>
  );
}
