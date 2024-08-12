import React from 'react';
import SpAdvInput from '../../ui/SpAdvInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
const SingleMetaDataAttribute = (props) => {
  const [attrKey, setattrKey] = React.useState('');
  const [attrValue, setAttrValue] = React.useState('');
  React.useEffect(() => {
    setAttrValue(props.attr ? props.attr.value : '');
    setattrKey(props.attr ? props.attr.trait_type : '');
  }, [props.attr]);
  return (
    <>
      <div className="flex items-center justify-center float-left mb-5">
        <SpAdvInput
          placeholder="Key"
          name="key"
          value={attrKey}
          onChange={(e: any) => setattrKey(e.target.value)}
          label="Attribute Key"
          type="text"
          className="w-full h-full mr-2"
          labelClassName=" text-white"
          disabled={!props.isAdd}
        />
        <SpAdvInput
          placeholder="value"
          name="value"
          value={attrValue}
          onChange={(e: any) => setAttrValue(e.target.value)}
          label="Attribute Value"
          type="text"
          className="w-full h-full mr-2"
          labelClassName=" text-white"
          disabled={!props.isAdd}
        />
        {props.isAdd && (
          <FontAwesomeIcon
            icon={faPlusCircle}
            size="2x"
            className={`${
              attrKey === '' || attrValue === ''
                ? ' pointer-events-none text-gray-500'
                : 'text-white'
            }`}
            onClick={() => {
              props.AddedAttrs({ trait_type: attrKey, value: attrValue });
              setAttrValue('');
              setattrKey('');
            }}
          />
        )}
      </div>
    </>
  );
};

export default SingleMetaDataAttribute;
