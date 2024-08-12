import React from 'react';
import SpAdvSelect from '../ui/SpAdvSelect';
export default function SpotFilteration() {
  const [state, setState] = React.useState({
    inputs: {
      decalLocation: '',
      priceRange: '',
    },
  });
  const handleChange = (selected: any, name: any) => {
    const { inputs }: any = state;
    inputs[name] = selected;
    setState({
      ...state,
      inputs,
    });
  };
  return (
    <div className="flex flex-wrap items-center w-full py-2 mx-auto">
      <div className="w-auto text-xs font-bold text-black">Sort By</div>
      <div className="grow flex flex-wrap">
        <div className="h-full p-4">
          <SpAdvSelect
            name="decalLocation"
            value={state.inputs.decalLocation}
            onChange={(selected: any) =>
              handleChange(selected, 'decalLocation')
            }
            placeholder={'Decal Location'}
            isSearchable={true}
            options={[
              { value: 'decalLocation1', label: 'Decal Location1' },
              { value: 'decalLocation2', label: 'Decal Location2' },
              { value: 'decalLocation3', label: 'Decal Location3' },
            ]}
          />
        </div>
        <div className="h-full p-4">
          <SpAdvSelect
            name="priceRange"
            value={state.inputs.priceRange}
            onChange={(selected: any) => handleChange(selected, 'priceRange')}
            placeholder={'Price Range'}
            isSearchable={true}
            options={[
              { value: 'low', label: '1-2' },
              { value: 'meduim', label: '2-3' },
              { value: 'high', label: '3-4' },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
