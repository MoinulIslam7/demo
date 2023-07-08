import React from 'react';

export default function ImageShow({ path }) {
  return (
    <img src={`https://localhost:9998/api/${path}`} className="w-full h-full" alt="" />
  );
}
