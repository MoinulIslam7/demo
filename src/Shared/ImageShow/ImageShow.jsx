import React from 'react';

export default function ImageShow({ path }) {
  return (
    <img src={`https://localhost:9998/api/${path}`} alt="" />
  );
}
