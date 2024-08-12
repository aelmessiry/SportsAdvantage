import React from 'react';
import Select, { components } from 'react-select';
import { chevronIcon } from '../../../assets/images';

const DropdownIndicator = (props: any) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <img src={chevronIcon} />
      </components.DropdownIndicator>
    )
  );
};

const SpAdvSelect = (props: any) => {
  return (
    <div className={`${props.className && props.className} sp-adv-select`}>
      <p
        className={`${
          props.labelClassName ? props.labelClassName : ''
        }text-darkGunmetal-300 mr-2 text-sm font-normal mb-2`}
      >
        {props.label}
        {props.required && <span className=" text-lava-100">*</span>}
      </p>
      <Select
        components={{ DropdownIndicator }}
        value={props.value}
        onChange={(e) => {
          props.onChange(e);
        }}
        placeholder={props.placeholder}
        name={props.name}
        isSearchable={props.isSearchable}
        options={props.options}
        classNamePrefix="sp-adv-select"
        isDisabled={props.disabled}
      />
    </div>
  );
};

export default SpAdvSelect;
