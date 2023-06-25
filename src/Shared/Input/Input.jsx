/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import './Input.css';

export default function Input({
  Variant = 'input',
  type = 'text',
  label = '',
  Icon = '',
  required = false,
  name = { label }, // eslint-disable-line
  onClick = () => { },
  step = 'any',
  title = '',
  onInvalid = () => { },
  disabled = false,
  register = {},
  className = '',
}) {
  return (
    <div className="w-full inputDiv">
      <div className="flex justify-start items-center border border-primary rounded-[50px] outerInput">
        <span className="absolute z-50 left-5">
          {
            Icon !== '' ? <Icon /> : ''
          }
        </span>
        <Variant
          type={type}
          className={`w-full customInput${className}`}
          name={label}
          onClick={onClick}
          placeholder=" "
          step={step}
          onInput={(e) => e.target.setCustomValidity('')}
          title={title}
          onInvalid={onInvalid}
          onWheel={(e) => type === 'number' && e.target.blur()}
          required={required}
          disabled={disabled}
          {...register} // eslint-disable-line
        />
        <label htmlFor="Input" className="customLabel">
          {label}
          {' '}
          {required && <span className="required">*</span>}
        </label>
      </div>
    </div>

  );
}
