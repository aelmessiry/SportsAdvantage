import React from 'react';
import axios from 'axios';
import SpAdvButton from '../../ui/SpAdvButton';
import SpAdvInput from '../../ui/SpAdvInput';
import { categoryPlaceHolder, seasonPlaceHolder } from '../../../assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from 'flowbite-react';
import toast from 'react-hot-toast';
import { APIERRORHandling } from '../../../Enum/apiErrorHandling';
function AddCar(props) {
  const fileImgProfileInput = React.useRef();
  const [uploadedProfileImage, setUploadedProfileImage] = React.useState();
  const [profileImage, setProfileImage] = React.useState(
    props.itemInfo ? props.itemInfo?.image : seasonPlaceHolder
  );
  const [isButtonClicked, setIsButtonClicked] = React.useState(false);

  const uploadProfile = async (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
    setUploadedProfileImage(e.target.files[0]);
    console.log(uploadedProfileImage);
  };
  const InitialInputs = () => ({
    inputs: {
      name: props.itemInfo ? props.itemInfo.name : '',
      model: props.itemInfo ? props.itemInfo.model : '',
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

  const handleAddCar = async () => {
    try {
      if (!uploadedProfileImage) {
        toast.error('Please upload car image first!');
        return;
      }
      setIsButtonClicked(true);
      var formdata: any = new FormData();
      formdata.append('file', uploadedProfileImage);
      formdata.append('team_id', props.teamId);
      formdata.append(
        'car',
        JSON.stringify({
          name: state.inputs.name.trim(),
          model: state.inputs.model,
          is_approved: false,
        })
      );
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BACKEND_API}/add_car`,
        data: formdata,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
        },
      })
        .then(() => {
          toast.success('Data saved Successfully');
          setProfileImage(categoryPlaceHolder);
          setState(InitialInputs());
        })
        .catch((e) => {
          if (e.response.data.code === APIERRORHandling.NAME_DUPLICATED) {
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
  const handleEditCar = async () => {
    try {
      setIsButtonClicked(true);
      var formdata: any = new FormData();
      const sharedAttrs = {
        id: props.itemInfo.id,
        name: state.inputs.name.trim(),
        model: state.inputs.model,
        team_id: props.itemInfo.team_id,
      };
      uploadedProfileImage && formdata.append('file', uploadedProfileImage);
      uploadedProfileImage
        ? formdata.append('car', JSON.stringify({ ...sharedAttrs }))
        : formdata.append(
            'car',
            JSON.stringify({
              ...sharedAttrs,
              image: props.itemInfo.image,
            })
          );
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BACKEND_API}/edit_car`,
        data: formdata,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
        },
      })
        .then(() => {
          toast.success('Data saved Successfully');
        })
        .catch((e) => {
          if (e.response.data.code === APIERRORHandling.NAME_DUPLICATED) {
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
            placeholder="Car Name"
            name="name"
            value={state.inputs.name}
            onChange={(e: any) => handleChange(e)}
            label="Car Name"
            required={true}
            type="text"
            className="lg:w-1/2 h-full p-4"
          />
          <SpAdvInput
            placeholder="Car Model"
            name="model"
            value={state.inputs.model}
            onChange={(e: any) => handleChange(e)}
            label="Car Model"
            required={true}
            type="text"
            className="lg:w-1/2 h-full p-4"
          />
        </div>
        <SpAdvButton
          className="grow flex-1 mt-5"
          onClick={() => (props.itemInfo ? handleEditCar() : handleAddCar())}
          disabled={
            isButtonClicked ||
            state.inputs.model.trim() === '' ||
            state.inputs.name.trim() === ''
          }
        >
          {isButtonClicked ? (
            <Spinner />
          ) : props.itemInfo ? (
            'Edit Car'
          ) : (
            'Add New Car'
          )}
        </SpAdvButton>
      </div>
    </div>
  );
}

export default AddCar;
