import { useState } from 'react';
import './DropdownList.css';

export default function DropdownList({ dropdownItems }) {
  ////    DROPDOWN LIST OF ELEMENTS

  const [activeDropdownID, setActiveDropdownID] = useState();

  // on click of dropdown item, expand and display subitems
  // if any other dropdown item is already expanded, close that dropdown
  const handleDropdownClick = (e) => {
    const dropdownItemID = e.target.value;
    activeDropdownID != dropdownItemID
      ? setActiveDropdownID(dropdownItemID)
      : setActiveDropdownID(null);
  };

  return (
    <>
      <div className="dropdown-list-container">
        {dropdownItems.map((dropdownObj, index) => {
          return (
            <div
              key={index}
              className={`drop-list ${(index == activeDropdownID && 'active-drop-list') || null}`}
            >
              <button
                value={index}
                className="drop-list-btn"
                onClick={handleDropdownClick}
                type="button"
                aria-label="dropdown"
              >
                {dropdownObj.heading}
              </button>

              <ul className="drop-list-content">
                {dropdownObj.listItems.map((listItem, listItemIndex) => {
                  return <li key={listItemIndex}>{listItem}</li>;
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}
