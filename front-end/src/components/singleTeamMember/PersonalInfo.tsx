import React from 'react';
import DatePicker from 'react-datepicker';

import {
  faCar,
  faCarOn,
  faGlobe,
  faLanguage,
  faRuler,
  faUserGroup,
  faUserTie,
  faWeightScale,
  // faPen,
} from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SpAdvButton from '../ui/SpAdvButton';
import SpAdvInput from '../ui/SpAdvInput';
import SpAdvSelect from '../ui/SpAdvSelect';
import moment from 'moment';
function PersonalInfo(props) {
  const InitialInputs = () => ({
    inputs: {
      name: props.teamMember.name,
      team: props.teamMember.team,
      points: props.teamMember.points,
      country: props.teamMember.country,
      raceEntered: props.teamMember.raceEntered,
      highestRaceFinish: props.teamMember.highestRaceFinish,
      highestGridPosition: props.teamMember.highestGridPosition,
      placeOfBirth: props.teamMember.placeOfBirth,
      weight: props.teamMember.weight,
      height: props.teamMember.height,
      languages: props.teamMember.languages,
      podiums: props.teamMember.podiums,
    },
  });
  const [state, setState] = React.useState(InitialInputs());
  //const [editData, setEditData] = React.useState(false);
  const [birthDate, setBirthDate] = React.useState(
    new Date(props.teamMember?.birthDate)
  );
  const editData = false;
  const handleChange = (e: any) => {
    const { value, name } = e.target;
    const { inputs }: any = state;

    inputs[name] = value;
    setState({
      ...state,
      inputs,
    });
  };
  return (
    <>
      {/* <FontAwesomeIcon
        icon={faPen}
        className=" cursor-pointer"
        onClick={() => {
          setEditData(!editData);
        }}
      /> */}
      {editData ? (
        <div className="mt-5">
          <div className="flex flex-wrap justify-start">
            <SpAdvInput
              placeholder="Driver Name"
              name="name"
              value={state.inputs.name}
              onChange={(e: any) => handleChange(e)}
              label="Driver Name"
              required={true}
              type="text"
              className="lg:w-1/2 h-full p-4"
            />
            <SpAdvSelect
              name="team"
              value={state.inputs.team}
              onChange={(e) => handleChange(e)}
              placeholder={'Team'}
              isSearchable={true}
              label="Team"
              className="sp-adv-basic-select lg:w-1/2 h-full p-4"
              options={[
                { value: 'Team1', label: 'Team 1' },
                { value: 'Team2', label: 'Team 2' },
                { value: 'Team3', label: 'Team 3' },
              ]}
            />
          </div>
          <div className="flex flex-wrap justify-start">
            <div className="lg:w-1/2 h-full p-4">
              <p
                className={` text-darkGunmetal-300 mr-2 text-sm font-normal mb-2`}
              >
                Date of Birth
              </p>
              <DatePicker
                showIcon
                isClearable
                wrapperClassName="sp-adv-form-datepicker bg-antiFlashWhite-400 rounded-2xl text-darkGunmetal-300 w-full pt-2 pl-10 border-none"
                selected={birthDate}
                onChange={(date: any) => setBirthDate(date)}
              />
            </div>
            <SpAdvInput
              placeholder="Points"
              name="points"
              value={state.inputs.points}
              onChange={(e: any) => handleChange(e)}
              label="Points"
              required={true}
              type="number"
              className="lg:w-1/2 h-full p-4"
            />
          </div>
          <div className="flex flex-wrap justify-start">
            <SpAdvInput
              placeholder="Country"
              name="country"
              value={state.inputs.country}
              onChange={(e: any) => handleChange(e)}
              label="Country"
              required={true}
              type="text"
              className="lg:w-1/2 h-full p-4"
            />
            <SpAdvInput
              placeholder="Race Entered"
              name="raceEntered"
              value={state.inputs.raceEntered}
              onChange={(e: any) => handleChange(e)}
              label="Race Entered"
              required={true}
              type="text"
              className="lg:w-1/2 h-full p-4"
            />
          </div>
          <div className="flex flex-wrap justify-start">
            <SpAdvInput
              placeholder="Highest Race Finish"
              name="highestRaceFinish"
              value={state.inputs.highestRaceFinish}
              onChange={(e: any) => handleChange(e)}
              label="Highest Race Finish"
              required={true}
              type="text"
              className="lg:w-1/2 h-full p-4"
            />
            <SpAdvInput
              placeholder="Highest Grid Position"
              name="highestGridPosition"
              value={state.inputs.highestGridPosition}
              onChange={(e: any) => handleChange(e)}
              label="Highest Grid Position"
              required={true}
              type="text"
              className="lg:w-1/2 h-full p-4"
            />
          </div>
          <div className="flex flex-wrap justify-start">
            <SpAdvInput
              placeholder="Place Of Birth"
              name="placeOfBirth"
              value={state.inputs.placeOfBirth}
              onChange={(e: any) => handleChange(e)}
              label="Place Of Birth"
              required={true}
              type="text"
              className="lg:w-1/2 h-full p-4"
            />
            <SpAdvInput
              placeholder="Podiums"
              name="podiums"
              value={state.inputs.podiums}
              onChange={(e: any) => handleChange(e)}
              label="Podiums"
              required={true}
              type="text"
              className="lg:w-1/2 h-full p-4"
            />
          </div>
          <div className="flex flex-wrap justify-start">
            <SpAdvInput
              placeholder="Weight"
              name="weight"
              value={state.inputs.weight}
              onChange={(e: any) => handleChange(e)}
              label="Weight"
              required={true}
              type="text"
              className="lg:w-1/2 h-full p-4"
            />
            <SpAdvInput
              placeholder="Height"
              name="height"
              value={state.inputs.height}
              onChange={(e: any) => handleChange(e)}
              label="Height"
              required={true}
              type="text"
              className="lg:w-1/2 h-full p-4"
            />
          </div>
          <div className="flex flex-wrap justify-start">
            <SpAdvInput
              placeholder="Languages"
              name="languages"
              value={state.inputs.languages}
              onChange={(e: any) => handleChange(e)}
              label="Languages"
              required={true}
              type="text"
              className="w-full h-full p-4"
            />
          </div>
          <SpAdvButton onClick={() => console.log('save')}>Save</SpAdvButton>
        </div>
      ) : (
        <>
          <div className=" font-spAdvSemiBold text-h2 font-semibold leading-relaxed text-black">
            {props.teamMember.name}
            <span className=" ml-1 text-lg text-gray-600">
              - {props.teamMember.type}
            </span>
          </div>
          <div className=" text-neutral-400 font-spAdvRegular text-base font-normal leading-6">
            {props.teamMember.type === 'Driver' ? (
              <div className="flex gap-5">
                <div>
                  <FontAwesomeIcon icon={faUserGroup} />{' '}
                  {props.teamMember.team_name}
                  <br />
                  <FontAwesomeIcon icon={faGlobe} /> {props.teamMember.country}
                  <br />
                  <FontAwesomeIcon icon={faUserTie} />{' '}
                  {props.teamMember.podiums}
                  <br />
                  <FontAwesomeIcon icon={faStar} /> {props.teamMember.points}
                  <br />
                  <FontAwesomeIcon icon={faCar} />
                  {props.teamMember.raceEntered}
                  <br />
                  <FontAwesomeIcon icon={faCarOn} />
                  {props.teamMember.highestRaceFinish}
                </div>
                <div>
                  <FontAwesomeIcon icon={faCarOn} />
                  {props.teamMember.highestGridPosition}
                  <br />
                  <FontAwesomeIcon icon={faCalendar} />
                  {moment(props.teamMember?.birthDate).format('YYYY-MM-DD')}
                  <br />
                  <FontAwesomeIcon icon={faGlobe} />
                  {props.teamMember.placeOfBirth}
                  <br />
                  <FontAwesomeIcon icon={faWeightScale} />{' '}
                  {props.teamMember.weight}
                  <br />
                  <FontAwesomeIcon icon={faRuler} /> {props.teamMember.height}
                  <br />
                  <FontAwesomeIcon icon={faLanguage} />{' '}
                  {props.teamMember.languages}
                </div>
              </div>
            ) : (
              <div className="flex gap-5">
                <div>
                  <FontAwesomeIcon icon={faUserGroup} />{' '}
                  {props.teamMember.team_name}
                  <br />
                  <FontAwesomeIcon icon={faGlobe} /> {props.teamMember.country}
                  <br />
                  <FontAwesomeIcon icon={faCalendar} />
                  {moment(props.teamMember?.birthDate).format('YYYY-MM-DD')}
                </div>
                <div>
                  <FontAwesomeIcon icon={faGlobe} />
                  {props.teamMember.placeOfBirth}
                  <br />
                  <FontAwesomeIcon icon={faLanguage} />{' '}
                  {props.teamMember.languages}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default PersonalInfo;
