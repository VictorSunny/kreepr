import { Link } from 'react-router-dom';

import Hamburgericon from '../../../assets/icons/hamburger-menu-icon.svg?react';
import DropdownList from '../../../components/DropdownList/DropdownList';
import PreferredCurrencyDropdown from '../../Footer/PreferredCurrencyDropdown';
import SearchBar from '../Searcher/SearchBar';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useSiteNavigationContext } from '../../../contexts/SiteNavigationContext';

export default function Sidebar({ closeButtonCallback }) {
  const { allUrls } = useSiteNavigationContext();

  const dropdownItems = [
    {
      heading: 'go to page',
      listItems: [
        ...allUrls.map((url) => {
          return (
            <Link to={url.value} className="link-btn" aria-label="go to about page">
              {url.text}
            </Link>
          );
        }),
      ],
    },
    {
      heading: 'documentation',
      listItems: [
        <a
          rel="noopener noreferrer"
          target="_blank"
          className="link-btn"
          aria-label="visit website project readme document"
          href="https://github.com/victorsunny/kreepr"
        >
          Github repo
        </a>,
      ],
    },
    {
      heading: 'developer contacts',
      listItems: [
        <a
          rel="noopener noreferrer"
          target="_blank"
          className="link-btn"
          aria-label="enter developer's email"
          href="mailto:victorsunny432@gmail.com"
        >
          Mail
        </a>,
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="link-btn"
          href="https://www.linkedin.com/in/victor-sunny-6b06ba220"
        >
          LinkedIn
        </a>,
        <a
          rel="noopener noreferrer"
          target="_blank"
          className="link-btn"
          aria-label="visit developer's github"
          href="https://www.github.com/victorsunny"
        >
          Github
        </a>,
        <a
          rel="noopener noreferrer"
          target="_blank"
          className="link-btn"
          aria-label="visit developer's portfolio site"
          href="https://victorsunny.github.io"
        >
          Portfolio
        </a>,
        <a
          rel="noopener noreferrer"
          target="_blank"
          className="link-btn"
          aria-label="visit developer's discord"
          href="https://discordapp.com/users/1296969973155102761"
        >
          Discord
        </a>,
      ],
    },
  ];

  return (
    <div className="primary-sidebar">
      <div className="primary-sidebar-utils-container">
        <button
          onClick={closeButtonCallback}
          className="close-sidebar-btn"
          type="button"
          aria-label="close hamburger menu"
        >
          <Hamburgericon
            className="icon vertical-hamburger-icon"
            alt="hamburger menu icon"
            loading="lazy"
          />
        </button>
        <ThemeToggle className="sidebar-theme-toggle-btn" />
      </div>
      <div className="primary-sidebar-content-container">
        <SearchBar />
        <PreferredCurrencyDropdown />
        <DropdownList dropdownItems={dropdownItems} />
      </div>
    </div>
  );
}
