import React from 'react';

const SpAdvTextArea = (props: any) => {
  return (
    <div className={props.className ? props.className : ''}>
      <p
        className={`${
          props.labelClassName ? props.labelClassName : ''
        } text-darkGunmetal-300 mr-2 text-sm font-normal mb-2`}
      >
        {props.label}
        {props.required && <span className=" text-lava-100">*</span>}
      </p>
      <textarea
        rows={4}
        value={props.value}
        onChange={(e) => props.onChange(e)}
        placeholder={props.placeholder}
        name={props.name}
        maxLength={props.maxLength ? props.maxLength : ''}
        className="bg-antiFlashWhite-400 rounded-2xl text-darkGunmetal-300 w-full py-3 pl-10 border-none"
      />
      {props.maxLength && (
        <span className="text-muted fz-12">
          {props.value?.length} / {props.maxLength} characters
        </span>
      )}
    </div>
  );
};

export default SpAdvTextArea;
