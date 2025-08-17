import { useEffect } from 'react';

// hero section icons imports
import ChartjsLogo from '../../assets/logos/chartjs-logo.svg';
import CoingeckoLogo from '../../assets/logos/coingecko-logo.svg';
import CssLogo from '../../assets/logos/css-logo.svg';
import FramerMotionLogo from '../../assets/logos/framer-motion-logo.svg';
import HtmlLogo from '../../assets/logos/html-logo.svg';
import JavascriptLogo from '../../assets/logos/javascript-logo.svg';
import ReactLogo from '../../assets/logos/react-logo.svg';
import TanstackQueryLogo from '../../assets/logos/tanstack-query-logo.png';
import VscLogo from '../../assets/logos/visual-studio-code-logo.svg';
import ViteLogo from '../../assets/logos/vite-logo.svg';
import { useSiteNavigationContext } from '../../contexts/SiteNavigationContext';

import './AboutPage.css';
import '../../components/HeroSlider/HeroSlider.css';

export default function AboutPage() {
  ////    PAGE CONTAINING INFORMATION ABOUT SITE

  const { changeCurrentUrlPath, changeBreadcrumbUrlPaths } = useSiteNavigationContext();

  // current breadcrumbs page path
  const breadcrumbUrlPaths = [
    { value: '', text: 'Home' },
    { value: 'about', text: 'About' },
  ];

  useEffect(() => {
    window.scrollTo(0, 0, 'smooth');

    // set current url path to highlight nav button on header
    changeCurrentUrlPath({ value: 'about/', text: 'About' });

    // set breadcrumbs path trail to match current page path
    changeBreadcrumbUrlPaths(breadcrumbUrlPaths);
  }, []);

  return (
    <div className="page-container about-page-container">
      <div className="about-introduction section">
        <h1 className="about-title">ABOUT</h1>
        <p>
          Kreepr is a website for cryptocurrency enthusiasts to find information on all relevant
          cryptocurrencies in a simplified view.
        </p>
        <p>
          Although built as a personal project by full-stack developer{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="link-btn"
            href="https://www.linkedin.com/in/victor-sunny-6b06ba220"
          >
            Victor Sunny
          </a>
          , It is fully capable of offering useful value to visitors.
        </p>
        <p>
          Keep up with all the latest cryptocurrencies, and get insights in the form of charts with
          historic data going back up to 1 year ago
        </p>
        <p>
          All cryptocurrencies' data are up to date, and powered by the very generous{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="link-btn"
            href="https://www.coingecko.com"
          >
            {' '}
            Coingecko
          </a>{' '}
          API.
        </p>
      </div>

      <div className="about-technical-information section">
        <h2 className="about-title">BEHIND THE SCENES</h2>
        <p>
          The beautiful user interface of Kreepr is made possible with a combination of numerous
          frontend technologies including:
        </p>

        <div className="tech-stack-hero-section">
          <ul id="tech-stack-list">
            <li>
              <span>HTML & CSS</span>
              <em>rendering</em>
            </li>
            <li>
              <span>Javascript</span>
              <em>logic</em>
            </li>
            <li>
              <span>React</span>
              <em>User Interface</em>
            </li>
            <li>
              <span>Framer Motion</span>
              <em>Animations</em>
            </li>
            <li>
              <span>Vite</span>
              <em>Build</em>
            </li>
            <li>
              <span>Tanstack Query</span>
              <em>API data handling</em>
            </li>
            <li>
              <span>ChartJS</span>
              <em>data visualization</em>
            </li>
          </ul>
          <em>Code edited in Visual Studio Code.</em>
          <div className="about-hero-slider hero-carousel">
            <div className="hero-slider-container">
              {/* first slider */}
              <div className="hero-slider">
                <HeroFlyers />
              </div>

              {/* duplicated of first slider for infinite slide illusion */}
              <div className="hero-slider">
                <HeroFlyers />
              </div>
              {/* duplicated of first slider for infinite slide illusion */}
              <div className="hero-slider">
                <HeroFlyers />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="about-title">COMING SOON</h2>
        <p>
          User signup will be added in the nearest future to grant features such as creation of
          watchlists, notifications, and more.
          <br />
          Will be powered by Django.
        </p>
      </div>
    </div>
  );
}

function HeroFlyers() {
  const imageList = [
    {
      imageSource: HtmlLogo,
      altText: 'html logo',
    },
    {
      imageSource: CssLogo,
      altText: 'css logo',
    },
    {
      imageSource: JavascriptLogo,
      altText: 'javascript logo',
    },
    {
      imageSource: ReactLogo,
      altText: 'react logo',
    },
    {
      imageSource: FramerMotionLogo,
      altText: 'framer motion logo',
    },
    {
      imageSource: ViteLogo,
      altText: 'vite logo',
    },
    {
      imageSource: TanstackQueryLogo,
      altText: 'tanstack query logo',
    },
    {
      imageSource: ChartjsLogo,
      altText: 'chart-js logo',
    },
    {
      imageSource: VscLogo,
      altText: 'visual studio code logo',
    },
    {
      imageSource: CoingeckoLogo,
      altText: 'coingecko logo',
    },
  ];

  return (
    <>
      {imageList.map((image, index) => {
        return (
          <div key={index} className="hero-coin-flyer">
            <img
              className="hero-icon"
              src={image.imageSource}
              loading="auto"
              alt={image.altText}
            ></img>
          </div>
        );
      })}
    </>
  );
}
