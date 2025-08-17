import './Footer.css';

import { Link } from 'react-router-dom';

import BriefcaseIcon from '../../assets/icons/briefcase-icon.svg?react';
import DiscordLogo from '../../assets/icons/discord-logo.svg?react';
import MailIcon from '../../assets/icons/envelope-icon.svg?react';
import GithubLogo from '../../assets/icons/github-icon.svg?react';
import LinkedinLogo from '../../assets/icons/linkedin-square-icon.svg?react';
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton';
import SiteLogo from '../../components/SiteLogo/SiteLogo';

import ContactForm from './ContactForm';
import PreferredCurrencyDropdown from './PreferredCurrencyDropdown';

export default function Footer() {
  ////    SITE FOOTER

  return (
    <footer>
      <SiteLogo />
      <div id="footer-main-content">
        <FooterSiteLinksSection />
        <FooterOuterLinksSection />
        <FooterContactsSection />
        <ContactForm />
      </div>
      <hr />
      <CopyrightLine />
      <ScrollToTopButton />
    </footer>
  );
}

function FooterContactsSection() {
  ////    DEVELOPER CONTACTS SECTION FOR FOOTER

  return (
    <>
      <div className="footer-section">
        <h3 className="footer-section-title">Contacts</h3>
        <ul className="footer-links-container">
          <li className="footer-link-row">
            <button
              className="btn footer-btn"
              type="button"
              aria-label="visit developer's linkedin"
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="btn-a contact-link"
                href="https://www.linkedin.com/in/victor-sunny-6b06ba220"
              >
                Linkedin
                <LinkedinLogo className="icon" loading="lazy" />
              </a>
            </button>
          </li>
          <li className="footer-link-row">
            <button className="btn footer-btn" type="button" aria-label="visit developer's github">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="btn-a contact-link"
                href="https://www.github.com/victorsunny"
              >
                Github
                <GithubLogo className="icon footer-icon" loading="lazy" />
              </a>
            </button>
          </li>
          <li className="footer-link-row">
            <button className="btn footer-btn" type="button" aria-label="send developer an email">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="btn-a contact-link"
                href="mailto:victorsunny432@gmail.com"
              >
                Mail
                <MailIcon className="icon footer-icon" loading="lazy" />
              </a>
            </button>
          </li>
          <li className="footer-link-row">
            <button
              className="btn footer-btn"
              type="button"
              aria-label="visit developer's portfolio site"
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="btn-a contact-link"
                href="https://victorsunny.github.io"
              >
                Portfolio
                <BriefcaseIcon
                  className="icon footer-icon"
                  style={{ fill: 'white' }}
                  loading="lazy"
                />
              </a>
            </button>
          </li>
          <li className="footer-link-row">
            <button className="btn footer-btn" type="button" aria-label="visit developer's discord">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="btn-a contact-link"
                href="https://discordapp.com/users/1296969973155102761"
              >
                Discord
                <DiscordLogo className="icon footer-icon" loading="lazy" />
              </a>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

function FooterOuterLinksSection() {
  ////    OUTER RESOURCES' LINKS SECTION FOR FOOTER

  return (
    <>
      <div className="footer-section">
        <div className="footer-sub-section">
          <h3 className="footer-section-title">Documentation</h3>
          <div className="footer-links-container">
            <a
              href="https://github.com/victorsunny/kreepr"
              aria-label="visit site doc"
              target="_blank"
              rel="noopener noreferrer"
              className="link-btn footer-text-link"
            >
              ReadME
            </a>
          </div>
        </div>

        <div className="footer-sub-section">
          <h3 className="footer-section-title">Source</h3>
          <div className="footer-links-container">
            <a
              href="https://github.com/victorsunny/kreepr"
              target="_blank"
              rel="noopener noreferrer"
              className="link-btn footer-text-link"
            >
              Github Repo
            </a>
            <a
              href="https://victorsunny.github.io"
              aria-label="visit the developer's portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="link-btn footer-text-link"
            >
              Developer's Portfolio
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function FooterSiteLinksSection() {
  ////    SITE NAVIGATION AND CUSTOMIZATION SECTION FOR FOOTER

  return (
    <>
      <div className="footer-section">
        <h3 className="footer-section-title">Site</h3>
        <div className="footer-links-container">
          <Link to={''} className="link-btn footer-text-link" aria-label="go to homepage">
            Popular Coins
          </Link>
          <Link
            to={'/all-coins'}
            className="link-btn footer-text-link"
            aria-label="go to coins page"
          >
            All Coins
          </Link>
          <Link
            to={'/about'}
            className="link-btn footer-text-link"
            type="button"
            aria-label="go to about page"
          >
            About
          </Link>
        </div>
        <div>
          <PreferredCurrencyDropdown />
        </div>
      </div>
    </>
  );
}

function CopyrightLine() {
  ////    COPYRIGHT SECTION FOR FOOTER

  return <div id="footer-copyright">©{new Date().getFullYear()} - Kreepr</div>;
}
