import React, { useEffect } from 'react';
import Select from 'react-select';
import {
  casperIcon,
  euroIcon,
  usdIcon,
  etherumGoldIcon,
} from '../../../assets/images';
import { currency } from '../../../Enum/currency';
import { useSelectedCurrency } from '../../../contexts/CurrencyContext';
export default function CurrencyMenu() {
  const [options, setOptions] = React.useState<any>();
  const [selectedOption, setSelectedOption] = React.useState();
  const { setCurrencyData } = useSelectedCurrency();
  const currencyData = [
    { image: casperIcon, label: 'CSPR', value: currency.CSPR },
    { image: etherumGoldIcon, label: 'Eth', value: currency.Ethereum },
    { image: euroIcon, label: 'Euro', value: currency.EURO },
    { image: usdIcon, label: 'USD', value: currency.USD },
  ];
  const customStyles = {
    option: (styles, state) => ({
      ...styles,
      backgroundColor: state.isSelected ? '#D8D8D8' : '#fff',
      color: '#000',
      '&:hover,&:focus,&:active': {
        backgroundColor: '#D8D8D8',
        color: '#000',
      },
    }),
    control: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: 'transparent',
      color: '#000',
      border: 'none',
      boxShadow: 'none',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#000', // Custom colour
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#000',
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
      width: '100px',
    }),
  };

  useEffect(() => {
    let selectOptions = [];
    currencyData?.forEach((col) => {
      let singleoption = {
        value: col.value.toString(),
        label: (
          <div className=" flex items-center">
            <img alt="currency" src={col.image} height="20px" width="20px" />
            <span className="ml-2 select-label">{col.label}</span>{' '}
          </div>
        ),
      };
      selectOptions.push({
        ...singleoption,
      });
    });
    setOptions(selectOptions);
    setSelectedOption(selectOptions[0]);
    setCurrencyData(currencyData[0]);
  }, []);
  return (
    <div className="mr-3">
      <Select
        options={options}
        onChange={(v: any) => {
          setSelectedOption(v);
          setCurrencyData(currencyData.find(({ value }) => value == v.value));
        }}
        value={selectedOption}
        className="sp-adv-select-currency"
        name="buywith"
        styles={customStyles}
        menuPortalTarget={document.body}
        components={{
          IndicatorSeparator: () => null,
        }}
        classNamePrefix="sp-adv-select-currency"
        isSearchable={false}
      />
    </div>
  );
}
