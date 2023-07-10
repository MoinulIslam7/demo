/* eslint-disable no-return-assign */
import React from 'react';
/**
 * Renders an image component based on the provided path.
 *
 * This component displays an image using the given path. It constructs the image URL
 * using a base URL and the provided path. The image is displayed with full width and height.
 *
 * @param {Object} props - The component props.
 * @param {string} props.path - The path of the image.
 * @returns {JSX.Element} The rendered image component.
 */
const baseUrl = process.env.REACT_APP_API_URL;

export default function ImageShow({ path }) {
  return (
    <img src={`${baseUrl}/${path}`} className="w-full h-full" alt="" onError={(e) => e.target.src = 'https://www.gme.net.au/app/plugins/wp-media-folder/assets/images/default.png'} />
  );
}
