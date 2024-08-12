import React from 'react';
import SpAdvButton from '../../ui/SpAdvButton';
import SpAdvInput from '../../ui/SpAdvInput';
import SpAdvTextArea from '../../ui/SpAdvTextArea';
import { sponsor } from '../../../assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
function AddSponsor() {
  const fileImgProfileInput = React.useRef();
  const [uploadedProfileImage, setUploadedProfileImage] = React.useState();
  const [profileImage, setProfileImage] = React.useState(sponsor);

  const uploadProfile = async (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
    setUploadedProfileImage(e.target.files[0]);
    console.log(uploadedProfileImage);
  };
  const InitialInputs = () => ({
    inputs: {
      sponsorName: '',
      description: '',
      url: '',
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
            placeholder="Sponsor Name"
            name="sponsorName"
            value={state.inputs.sponsorName}
            onChange={(e: any) => handleChange(e)}
            label="Sponsor Name"
            required={true}
            type="text"
            className="lg:w-1/2 lg:pr-4 h-full"
          />
          <SpAdvInput
            placeholder="URL"
            name="url"
            value={state.inputs.url}
            //onChange={(e: any) => handleChange(e)}
            label="URL"
            required={true}
            type="text"
            className="lg:w-1/2 lg:pl-4 h-full"
          />
        </div>
        <div className="flex flex-wrap justify-start w-full mt-5">
          <SpAdvTextArea
            placeholder="About Sponsor"
            name="description"
            value={state.inputs.description}
            onChange={(e: any) => handleChange(e)}
            label="About Sponsor"
            required={true}
            className=" w-full"
          />
        </div>
        <SpAdvButton className="grow flex-1 mt-5">Add New Sponsor</SpAdvButton>
      </div>
    </div>
  );
}

export default AddSponsor;
