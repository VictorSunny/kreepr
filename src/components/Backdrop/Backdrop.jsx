import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Backdrop.css';

function Backdrop({ setPopoverDisplayState }) {
  //// ADD BACKROP UPON DISPLAY OF POPOVER ELEMENT

  useEffect(() => {
    // make the page unscrollable
    document.documentElement.classList.toggle('no-scroll');
    // UNMOUNTING - make page scrollable
    return () => {
      document.documentElement.classList.remove('no-scroll');
    };
  }, []);

  const closePopover = () => {
    // close popover and backdrop when user clicks on backdrop outside popover e.g dropdown, popup...
    return setPopoverDisplayState(false);
  };

  return <div onClick={closePopover} className="backdrop"></div>;
}

export default Backdrop;
