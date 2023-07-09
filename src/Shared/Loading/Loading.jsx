import React from 'react';
/**
 * Renders a loading indicator component.
 *
 * This component displays a loading spinner or indicator while content is being loaded.
 *
 * @returns {JSX.Element} The rendered loading indicator component.
 */

function Loading() {
  return (
    <div className="h-screen bg-white">
      <div className="flex justify-center items-center h-full">
        <img className="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="" />
      </div>
    </div>
  );
}

export default Loading;
