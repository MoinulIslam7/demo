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

export default function ImageShow({ path }) {
  return (
    <img src={`https://localhost:9998/api/${path}`} className="w-full h-full" alt="" />
  );
}
