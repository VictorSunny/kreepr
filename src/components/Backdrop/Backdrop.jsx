import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Backdrop.css';

function Backdrop({ setPopoverDisplayState }) {
  //// ADD BACKROP UPON DISPLAY OF POPOVER ELEMENT

  // function for closing modal on special keypresses for improved accessibility
  const handleKeyClick = (e) => {
    ((e.key == 'Escape') || (e.key == 'Enter') || (e.key == 'Backspace')) 
    && setPopoverDisplayState(false);
  }
  
  useEffect(() => {
    // add event listener for escape
    document.addEventListener('keydown', handleKeyClick)
    // make the page unscrollable
    document.documentElement.classList.toggle('no-scroll');
    // UNMOUNTING - make page scrollable
    return () => {
      // reset modifications to page
      document.documentElement.classList.remove('no-scroll');
      document.removeEventListener('keydown', handleKeyClick)
    };
  }, []);

  const closePopover = () => {
    // close popover and backdrop when user clicks on backdrop outside popover e.g dropdown, popup...
    return setPopoverDisplayState(false);
  };

  return <div onClick={closePopover} className="backdrop"></div>;
}

export default Backdrop;
