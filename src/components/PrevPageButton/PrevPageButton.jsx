import { useNavigate, useNavigationType } from 'react-router-dom';
import BackArrowIcon from '../../assets/icons/back-arrow-curved.svg?react';
import './PrevPageButton.css';

export default function PrevPageButton({ children }) {
  ////    BUTTON FOR NAVIGATING TO PREVIOUS PAGE

  // if no previous page, navigates to all coins page

  const navigator = useNavigate();
  const navigationType = useNavigationType();

  const goBack = () => {
    // check if any previous page has been visited on current tab
    // if no previous page, navigate to all coins page
    if (Number(window.history.length) > 2 && navigationType == 'POP') {
      navigator(-1);
    } else {
      navigator('/all-coins');
    }
  };

  return (
    <button
      className="btn prev-page-btn page-nav-btn"
      onClick={goBack}
      type="button"
      aria-label="previous page"
    >
      <BackArrowIcon className="icon btn-icon" loading="lazy" alt="back arrow icon" />
      {children}
    </button>
  );
}
