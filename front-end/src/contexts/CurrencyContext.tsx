import React, { createContext, useState } from 'react';

interface ICurrencyInfo {
  value: Number | null;
  label: string | null;
  image: string | null;
}

//interface of the context object
interface ICurrencyContextValue {
  currencyInfo: ICurrencyInfo;
  setCurrencyData: (currencyData) => void;
}

//inital values for the context object
const CurrencyContext = createContext<ICurrencyContextValue>({
  currencyInfo: {
    value: null,
    label: null,
    image: null,
  },
  setCurrencyData: () => {},
});

const SelectedCurrencyProvider = (props: any) => {
  const [currencyInfo, setCurrencyInfo] = useState<ICurrencyInfo>({
    value: null,
    label: null,
    image: null,
  });

  const setCurrencyData = async (currencyData: any) => {
    try {
      setCurrencyInfo(currencyData);
      return { currencyData };
    } catch (e: any) {
      return { e };
    }
  };

  const contextValue: ICurrencyContextValue = {
    currencyInfo,
    setCurrencyData,
  };

  return <CurrencyContext.Provider value={contextValue} {...props} />;
};

const useSelectedCurrency = () => React.useContext(CurrencyContext);

export { SelectedCurrencyProvider, useSelectedCurrency };
