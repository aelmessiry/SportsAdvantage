import React from 'react';

const SpAdvInput = ({
  icon,
  type,
  value,
  onChange,
  placeholder,
  name,
  maxLength,
  disabled = false,
  required,
  label,
  className,
  labelClassName,
  inputClassName,
  isAllowPositive = false,
}: any) => {
  const validateInput = (event) => {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    const key = event.key;

    // Allow backspace, delete, arrow keys, numeric keys, and dot
    if (
      event.key === 'Backspace' ||
      event.key === 'Delete' ||
      event.key.startsWith('Arrow') ||
      allowedKeys.includes(key)
    ) {
      return;
    } else {
      event.preventDefault();
    }
  };
  return (
    <div className={className ? className : ''}>
      <p
        className={`${
          labelClassName ? labelClassName : ''
        } text-darkGunmetal-300 mr-2 text-sm font-normal mb-2`}
      >
        {label}
        {required && <span className=" text-lava-100">*</span>}
      </p>
      <label
        htmlFor={name}
        className="focus-within:text-gray-600 relative block text-gray-400"
      >
        <div className=" top-7 left-3 absolute w-8 h-8 transform -translate-y-1/2 pointer-events-none">
          {icon}
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e)}
          placeholder={placeholder}
          name={name}
          maxLength={maxLength ? maxLength : ''}
          disabled={disabled}
          className={`${
            inputClassName ? inputClassName : ''
          } bg-antiFlashWhite-400 rounded-2xl text-darkGunmetal-300 w-full py-3 pl-10 border-none`}
          onKeyDown={(e) => isAllowPositive && validateInput(e)}
        />
      </label>
      {maxLength && (
        <span className="text-muted fz-12">
          {value?.length} / {maxLength} characters
        </span>
      )}
    </div>
  );
};

export default SpAdvInput;
