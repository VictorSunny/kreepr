import { createContext, useContext, useState } from 'react';

export const siteNavigationContext = createContext(null);

export const useSiteNavigationContext = () => useContext(siteNavigationContext);

export const SiteNavigationProvider = ({ children }) => {
  //// CONTEXT PROVIDER FOR SITE NAVIGATIONS

  const urlObj = { value: '', text: 'Home' };

  // all websites pages that can be visited independently
  const allUrls = [
    { value: '', text: 'Home' },
    { value: 'all-coins', text: 'All Coins' },
    { value: 'about', text: 'About' },
  ];

  // set default values for site navigations
  const [currentUrlPath, setCurrentUrlPath] = useState({});
  const [breadcrumbUrlPaths, setBreadCrumbUrlPaths] = useState([urlObj]);

  // functions for changing site navigation values
  const changeCurrentUrlPath = (urlPathObject) => {
    setCurrentUrlPath(urlPathObject);
  };
  const changeBreadcrumbUrlPaths = (breadcrumbUrlPathsList) => {
    setBreadCrumbUrlPaths(breadcrumbUrlPathsList);
  };

  // package all values and functions for export
  const values = {
    allUrls,
    currentUrlPath,
    breadcrumbUrlPaths,
    changeCurrentUrlPath,
    changeBreadcrumbUrlPaths,
  };

  return <siteNavigationContext.Provider value={values}>{children}</siteNavigationContext.Provider>;
};
