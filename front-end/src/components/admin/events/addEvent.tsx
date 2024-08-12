import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import SpAdvButton from '../../ui/SpAdvButton';
import SpAdvInput from '../../ui/SpAdvInput';
import SpAdvTextArea from '../../ui/SpAdvTextArea';
import { eventPlaceHolder } from '../../../assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import SpAdvSelect from '../../ui/SpAdvSelect';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import axios from 'axios';
import { Spinner } from 'flowbite-react';
import toast from 'react-hot-toast';
import { APIERRORHandling } from '../../../Enum/apiErrorHandling';
function AddEvent(props) {
  const fileImgProfileInput = React.useRef();
  const [uploadedProfileImage, setUploadedProfileImage] = React.useState();
  const [profileImage, setProfileImage] = React.useState(
    props.itemInfo ? props.itemInfo.image : eventPlaceHolder
  );
  const [startTime, setStartTime] = React.useState(
    props.itemInfo ? new Date(props.itemInfo.eventDate) : undefined
  );
  const [seasons, setSeasons]: any = React.useState();
  const [seasonId, setSeasonId]: any = React.useState();
  const [isButtonClicked, setIsButtonClicked] = React.useState(false);

  const getSeasons = React.useCallback(async () => {
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_API}/get_all_seasons`,
    })
      .then((response) => {
        const result = response.data.result.filter(
          ({ is_disabled }) => !is_disabled
        );
        const selectedSeason = props.itemInfo
          ? result.find(({ id }) => props.itemInfo.season_id === id)
          : undefined;
        setSeasons(result);
        setSeasonId(
          selectedSeason
            ? { value: selectedSeason.id, label: selectedSeason.name }
            : {
                value: result[0].id,
                label: result[0].name,
              }
        );
      })
      .catch(() => {
        toast.error('Something went wrong please try again later!');
      });
  }, []);

  React.useEffect(() => {
    try {
      getSeasons();
    } catch (err) {}
  }, [getSeasons]);

  const uploadProfile = async (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
    setUploadedProfileImage(e.target.files[0]);
    console.log(uploadedProfileImage);
  };
  const InitialInputs = () => ({
    inputs: {
      name: props.itemInfo ? props.itemInfo.name : '',
      trackCondition: props.itemInfo ? props.itemInfo.trackCondition : '',
      weatherCondition: props.itemInfo ? props.itemInfo.weatherCondition : '',
    },
  });
  const [state, setState] = React.useState(InitialInputs());
  const handleChange = (e: any) => {
    const { value, name } = e.target;
    const { inputs }: any = state;

    inputs[name] = value;
    setState({
      ...state,
      inputs,
    });
  };

  const handleAddEvent = async () => {
    try {
      if (!uploadedProfileImage) {
        toast.error('Please upload event image first!');
        return;
      }

      setIsButtonClicked(true);
      var formdata: any = new FormData();
      formdata.append('file', uploadedProfileImage);
      formdata.append('season_id', seasonId.value);
      formdata.append(
        'event',
        JSON.stringify({
          name: state.inputs.name.trim(),
          eventDate: startTime,
          trackCondition: state.inputs.trackCondition,
          weatherCondition: state.inputs.weatherCondition,
          is_disabled: true,
        })
      );
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BACKEND_API}/add_event`,
        data: formdata,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
        },
      })
        .then(() => {
          toast.success('Data saved Successfully');
          setUploadedProfileImage(undefined);
          setProfileImage(eventPlaceHolder);
          setState(InitialInputs());
          setStartTime(undefined);
          setSeasonId({ value: seasons[0].id, label: seasons[0].name });
        })
        .catch((e) => {
          if (e.response.data.code === APIERRORHandling.ITEM_DUPLICATED) {
            toast.error(
              'This item is already in use, please change the item and try again.'
            );
          } else if (
            e.response.data.code === APIERRORHandling.NAME_DUPLICATED
          ) {
            toast.error(
              'This name is already in use, please change the name and try again.'
            );
          } else {
            toast.error('Something went wrong please try again later!');
          }
        });
    } catch (err) {
      toast.error(err.message);
    }
    setIsButtonClicked(false);
  };
  const handleEditEvent = async () => {
    try {
      setIsButtonClicked(true);
      var formdata: any = new FormData();
      const sharedAttrs = {
        id: props.itemInfo.id,
        season_id: seasonId.value,
        name: state.inputs.name.trim(),
        eventDate: startTime,
        trackCondition: state.inputs.trackCondition,
        weatherCondition: state.inputs.weatherCondition,
        description: '',
      };
      uploadedProfileImage && formdata.append('file', uploadedProfileImage);
      uploadedProfileImage
        ? formdata.append(
            'event',
            JSON.stringify({
              ...sharedAttrs,
            })
          )
        : formdata.append(
            'event',
            JSON.stringify({
              ...sharedAttrs,
              image: props.itemInfo.image,
            })
          );
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BACKEND_API}/edit_event`,
        data: formdata,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
        },
      })
        .then(() => {
          toast.success('Data saved Successfully');
        })
        .catch((e) => {
          if (e.response.data.code === APIERRORHandling.ITEM_DUPLICATED) {
            toast.error(
              'This item is already in use, please change the item and try again.'
            );
          } else if (
            e.response.data.code === APIERRORHandling.NAME_DUPLICATED
          ) {
            toast.error(
              'This name is already in use, please change the name and try again.'
            );
          } else {
            toast.error('Something went wrong please try again later!');
          }
        });
    } catch (err) {
      toast.error(err.message);
    }
    setIsButtonClicked(false);
  };
  return (
    <div>
      <div className=" mt-12">
        <div className=" flex justify-center">
          <div className="relative">
            <img
              className=" border-antiFlashWhite-100 lg:w-56 lg:h-56 w-24 h-24 border-4 rounded-full"
              src={profileImage}
              alt="driver"
            />
            <label className=" bottom-4 bg-neutral-600 absolute right-0 z-20 p-3 text-white rounded-full cursor-pointer">
              <FontAwesomeIcon
                icon={faCameraRetro}
                className="mr-1"
                size="lg"
              />
              <input
                accept="*/*"
                className=" hidden"
                type="file"
                ref={fileImgProfileInput}
                onChange={(e) => uploadProfile(e)}
              />
            </label>
          </div>
        </div>
        <div className="flex flex-wrap justify-start mt-10">
          <SpAdvInput
            placeholder="Event Name"
            name="name"
            value={state.inputs.name}
            onChange={(e: any) => handleChange(e)}
            label="Event Name"
            required={true}
            type="text"
            className="lg:w-1/2 h-full pr-4"
          />
          <SpAdvSelect
            name="team"
            value={seasonId}
            onChange={(v) => {
              setSeasonId(v);
            }}
            placeholder={'Season'}
            isSearchable={true}
            label="Season"
            className="sp-adv-basic-select lg:w-1/2 h-full pl-4"
            options={seasons?.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
            required={true}
          />
        </div>
        <div className="flex flex-wrap justify-start mt-10">
          <p className={` text-darkGunmetal-300 mr-2 text-sm font-normal mb-2`}>
            Event Start Date
            <span className=" text-lava-100">*</span>
          </p>
          <DateTimePicker
            amPmAriaLabel="Select AM/PM"
            calendarAriaLabel="Toggle calendar"
            clearAriaLabel="Clear value"
            dayAriaLabel="Day"
            hourAriaLabel="Hour"
            maxDetail="second"
            minuteAriaLabel="Minute"
            monthAriaLabel="Month"
            nativeInputAriaLabel="Date and time"
            onChange={(e: any) => setStartTime(e)}
            secondAriaLabel="Second"
            value={startTime}
            yearAriaLabel="Year"
            className={'w-full sp-adv-datetime-picker'}
          />
        </div>
        <div className="flex flex-wrap justify-start w-full mt-5">
          <SpAdvTextArea
            placeholder="Track Condition"
            name="trackCondition"
            value={state.inputs.trackCondition}
            onChange={(e: any) => handleChange(e)}
            label="Track Condition"
            required={true}
            className=" w-full"
          />
        </div>
        <div className="flex flex-wrap justify-start w-full mt-5">
          <SpAdvTextArea
            placeholder="Weather Condition"
            name="weatherCondition"
            value={state.inputs.weatherCondition}
            onChange={(e: any) => handleChange(e)}
            label="Weather Condition"
            required={true}
            className=" w-full"
          />
        </div>
        <SpAdvButton
          className="grow flex-1 mt-5"
          onClick={() => {
            props.itemInfo ? handleEditEvent() : handleAddEvent();
          }}
          disabled={
            isButtonClicked ||
            startTime === undefined ||
            state.inputs.name.trim() === '' ||
            seasonId === '' ||
            seasonId === undefined ||
            state.inputs.trackCondition.trim() === '' ||
            state.inputs.weatherCondition.trim() === ''
          }
        >
          {isButtonClicked ? (
            <Spinner />
          ) : props.itemInfo ? (
            'Edit Event'
          ) : (
            'Add New Event'
          )}
        </SpAdvButton>
      </div>
    </div>
  );
}

export default AddEvent;
