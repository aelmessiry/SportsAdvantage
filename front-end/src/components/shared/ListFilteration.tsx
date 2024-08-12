import React from 'react';
import DatePicker from 'react-datepicker';
import SpAdvSelect from '../ui/SpAdvSelect';
export default function ListFilteration() {
  const [state, setState] = React.useState({
    inputs: {
      team: '',
      decalLocation: '',
      eventData: '',
      priceRange: '',
    },
  });
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const handleChange = (selected: any, name: any) => {
    const { inputs }: any = state;
    inputs[name] = selected;
    setState({
      ...state,
      inputs,
    });
  };
  const handleRanges = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <div className="flex flex-wrap items-center w-full py-6 mx-auto">
      <div className="w-auto text-xs font-bold text-black">Sort By</div>
      <div className="grow flex flex-wrap">
        <div className="lg:w-1/5 h-full p-4">
          <SpAdvSelect
            name="team"
            value={state.inputs.team}
            onChange={(selected: any) => handleChange(selected, 'team')}
            placeholder={'Team'}
            isSearchable={true}
            options={[
              { value: 'Team1', label: 'Team1' },
              { value: 'Team2', label: 'Team2' },
              { value: 'Team3', label: 'Team3' },
            ]}
          />
        </div>
        <div className="lg:w-1/5 h-full p-4">
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
        <div className="lg:w-1/5 h-full p-4">
          <DatePicker
            showIcon
            isClearable
            wrapperClassName="sp-adv-datePicker"
            selected={startDate}
            onChange={(date: any) => handleRanges(date)}
            selectsRange
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        <div className="lg:w-1/5 h-full p-4">
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
