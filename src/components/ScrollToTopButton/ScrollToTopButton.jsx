import React from 'react';

import LargeUpArrow from '../../assets/icons/caret-up-icon.svg?react';
import './ScrollToTopButton.css';

export default function ScrollToTopButton({ progressState }) {
  ////    BUTTON FOR SCROLLING TO TOP OF PAGE. FOR EASE OF NAVIGATION

  const scrollToTop = () => {
    return window.scrollTo(0, 0, 'smooth');
  };

  return (
    <div className="scroll-top-btn-container">
      <button
        className="btn scroll-top-btn"
        onClick={scrollToTop}
        aria-label="scroll up button"
        name="button"
      >
        <LargeUpArrow className="icon btn-icon" />
      </button>
    </div>
  );
}
