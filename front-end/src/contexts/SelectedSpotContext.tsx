import React, { createContext, useState } from 'react';

interface ISpotInfo {
  id: Number | null;
  description: string | null;
  location: string | null;
  price: string | null;
  name: string | null;
  size: string | null;
  pricePerCM: string | null;
  deadline: string | null;
  classify: Number | null;
  features: Array<String> | null;
  order: Number | null;
  circuit: string | null;
  positionNumber: string | null;
}

//interface of the context object
interface ISelectedSpotContextValue {
  selectedSpots: [ISpotInfo];
  selectedSpotsToPurchase: [ISpotInfo];
  setSpotData: (spotData) => void;
  setSpotsToPurchaseData: (spotData) => void;
}

//inital values for the context object
const SelectedSpotContext = createContext<ISelectedSpotContextValue>({
  selectedSpots: [
    {
      id: null,
      description: null,
      location: null,
      price: null,
      name: null,
      size: null,
      pricePerCM: null,
      deadline: null,
      classify: null,
      features: null,
      order: null,
      circuit: null,
      positionNumber: null,
    },
  ],
  selectedSpotsToPurchase: [
    {
      id: null,
      description: null,
      location: null,
      price: null,
      name: null,
      size: null,
      pricePerCM: null,
      deadline: null,
      classify: null,
      features: null,
      order: null,
      circuit: null,
      positionNumber: null,
    },
  ],
  setSpotData: () => {},
  setSpotsToPurchaseData: () => {},
});

const SelectedSpotProvider = (props: any) => {
  const [selectedSpots, setSelectedSpots] = useState<[ISpotInfo]>();
  const [selectedSpotsToPurchase, setSelectedSpotsToPurchase] =
    useState<[ISpotInfo]>();

  const setSpotData = async (spotData: any) => {
    try {
      setSelectedSpots(spotData);
      return spotData;
    } catch (e: any) {
      return e;
    }
  };

  const setSpotsToPurchaseData = async (spotData: any) => {
    try {
      setSelectedSpotsToPurchase(spotData);
      return spotData;
    } catch (e: any) {
      return e;
    }
  };

  const contextValue: ISelectedSpotContextValue = {
    selectedSpots,
    selectedSpotsToPurchase,
    setSpotData,
    setSpotsToPurchaseData,
  };

  return <SelectedSpotContext.Provider value={contextValue} {...props} />;
};

const useSelectedSpot = () => React.useContext(SelectedSpotContext);

export { SelectedSpotProvider, useSelectedSpot };
