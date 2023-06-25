import { Info } from '@phosphor-icons/react';
import React, { useState } from 'react';

function Tooltip({ information }) {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  function showTooltip() {
    setTooltipVisible(true);
  }

  function hideTooltip() {
    setTooltipVisible(false);
  }

  return (
    <div className="">
      <a
        href="./"
        tabIndex="0"
        aria-label="tooltip 1"
        className="focus:outline-none focus:ring-gray-300 rounded-full focus:ring-offset-2 focus:ring-2 focus:bg-gray-200 relative mt-20 md:mt-0"
        onMouseOver={showTooltip}
        onFocus={showTooltip}
        onMouseOut={hideTooltip}
        onBlur={hideTooltip}
      >
        <div className="cursor-pointer">
          <Info size={24} />
        </div>
        {isTooltipVisible && (
          <div
            id="tooltip1"
            role="tooltip"
            className="z-20 -mt-10 w-48 absolute transition duration-150 ease-in-out left-0 ml-8 shadow-lg bg-white p-4 rounded-lg"
          >
            <svg className="absolute left-0 -ml-2 bottom-0 top-0 h-full" width="9px" height="16px" viewBox="0 0 9 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Tooltips-" transform="translate(-874.000000, -1029.000000)" fill="#FFFFFF">
                  <g id="Group-3-Copy-16" transform="translate(850.000000, 975.000000)">
                    <g id="Group-2" transform="translate(24.000000, 0.000000)">
                      <polygon id="Triangle" transform="translate(4.500000, 62.000000) rotate(-90.000000) translate(-4.500000, -62.000000) " points="4.5 57.5 12.5 66.5 -3.5 66.5" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <p className="">{information}</p>
          </div>
        )}
      </a>
    </div>
  );
}

export default Tooltip;
