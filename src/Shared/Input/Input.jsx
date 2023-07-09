/* eslint-disable max-len */
/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import './Input.css';

/**
 * Renders an input component with a label, icon, and other optional properties.
 *
 * This component displays an input field with a label and an optional icon. It supports
 * different input variants, such as 'input' or 'textarea', and allows customization through
 * various props like type, required, disabled, defaultValue, and more.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.Variant='input'] - The input variant ('input' or 'textarea').
 * @param {string} [props.type='text'] - The input type.
 * @param {string} [props.label=''] - The label for the input field.
 * @param {React.Component} [props.Icon=''] - The icon component to display.
 * @param {boolean} [props.required=false] - A boolean indicating whether the input is required or not.
 * @param {string} [props.name={label}] - The name attribute for the input field.
 * @param {function} [props.onClick=()=>{}] - The function to be called on input click.
 * @param {string} [props.step='any'] - The step attribute for number inputs.
 * @param {string} [props.title=''] - The title attribute for the input field.
 * @param {function} [props.onInvalid=()=>{}] - The function to handle invalid input.
 * @param {boolean} [props.disabled=false] - A boolean indicating whether the input is disabled or not.
 * @param {Object} [props.register={}] - The register object for form validation.
 * @param {string} [props.className=''] - Additional CSS class name(s) for styling customization.
 * @param {string} [props.defaultValue=''] - The default value for the input field.
 * @returns {JSX.Element} The rendered input component.
 */

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
  defaultValue = '',
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
          defaultValue={defaultValue}
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
