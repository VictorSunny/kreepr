import { useEffect, useRef, useState } from 'react';
import './DropdownSelect.css';
import Backdrop from '../Backdrop/Backdrop';
import useResetStates from '../../hooks/useResetStates';

export default function DropdownSelect({
  defaultValues,
  optionsValues,
  setContextValue,
  scrollToTop,
}) {
  ////   DROPDOWN WITH OPTIONS TO CHANGE CONTEXT STATE VALUE FROM SUPPORTED CONTEXT OPTIONS

  // monitors dropdown display state
  const [dropdownIsActive, setDropdownIsActive] = useState(false);

  const resetStates = useResetStates([setDropdownIsActive]);

  // fn - toggle dropdown display/hide
  const openCloseDropDown = () => {
    return setDropdownIsActive((prev) => !prev);
  };

  // fn - change dropdown selected value on click of option
  // close dropdown after selected value has been updated
  const changeDropdownValue = (e) => {
    // get value from clicked option
    const newSelectedValue = { value: e.target.dataset.value, text: e.target.innerText };

    // check if clicked option value matches currently selected option value
    const valueChanged = newSelectedValue.value != defaultValues.value;

    // update context value with clicked option value if clicked option value is different from initial selected value
    valueChanged && setContextValue(newSelectedValue);
    // scroll to top if selected value is updated and scrolltotop is true
    valueChanged && scrollToTop && window.scrollTo(0, 0, 'smooth');
    return setDropdownIsActive(false);
  };

  return (
    <div className="dropdown-container">
      {/* add backdrop if dropdown is triggered */}
      {dropdownIsActive && (
        <Backdrop
          popoverDisplayState={dropdownIsActive}
          setPopoverDisplayState={setDropdownIsActive}
        />
      )}

      <div className="dropdown-content">
        {/* dropdown select button to trigger display of dropdown options */}
        <button
          value={defaultValues.value}
          className="btn dropdown-btn"
          onClick={openCloseDropDown}
          type="button"
          aria-label="dropdown"
        >
          {defaultValues.text}
        </button>

        {/* display dropdown options if display is set true. triggered by dropdown button ^ */}
        <div className={`dropdown-options-container ${dropdownIsActive && 'show-dropdown'}`}>
          {optionsValues.map((option, index) => {
            // dropdown option listed. if option is selected, special style applies in class
            return (
              <div
                key={index}
                id={`option-${option.value}`}
                data-value={option.value}
                onClick={changeDropdownValue}
                className={
                  (option.value === defaultValues.value && 'selected-dropdown-option') || ''
                }
              >
                {option.text}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
