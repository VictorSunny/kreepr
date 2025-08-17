import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

import { useSiteNavigationContext } from '../../../contexts/SiteNavigationContext';
import './Navbar.css';

function Navbar() {
  ////    SITE NAVIGATION LINKS FOR EASE NAVIGATING BETWEEN PAGES

  const { breadcrumbUrlPaths } = useSiteNavigationContext();

  // siteLinks.length > 0 ? siteLinks : siteLinks = ['']

  return (
    <nav className="mobile-navbar">
      <ul>
        <AnimatePresence>
          {breadcrumbUrlPaths.map((link) => {
            return (
              <motion.li
                key={link.value}
                initial={{
                  x: -10,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                exit={{
                  x: 10,
                  opacity: 0,
                }}
                transition={{
                  duration: 1,
                }}
                layout
              >
                <Link to={`${link.value}`} className="breadcrumb-link">{`${link.text}`}</Link>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </nav>
  );
}

export default Navbar;
