import React from 'react';
import DatePicker from 'react-date-picker';
import { driver, hero5 } from '../../../assets/images';
import SpAdvButton from '../../ui/SpAdvButton';
import SpAdvInput from '../../ui/SpAdvInput';
import SpAdvTextArea from '../../ui/SpAdvTextArea';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SpAdvSelect from '../../ui/SpAdvSelect';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Spinner } from 'flowbite-react';
import { TeamMembersTypesData } from '../../../data/teamMembersTypes';
import { ChangingProfileImage } from '../../../Enum/changingProfileImage';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import SpAdvEditor from '../../ui/SpAdvEditor';
import {
  isContainsLetters,
  isValidEmail,
  isValidFacebookUrl,
  isValidInstagramUrl,
  isValidTwitterUrl,
  isValidYouTubeUrl,
} from '../../../utils/formValidation';

function AddTeamMember(props) {
  const fileImgCoverInput = React.useRef();
  const fileImgProfileInput = React.useRef();
  const [uploadedCoverImage, setUploadedCoverImage] = React.useState();
  const [coverImage, setCoverImage] = React.useState(
    props.itemInfo ? props.itemInfo.cover_image : hero5
  );
  const [uploadedProfileImage, setUploadedProfileImage] = React.useState();
  const [profileImage, setProfileImage] = React.useState(
    props.itemInfo ? props.itemInfo.profile_image : driver
  );
  const [birthDate, setBirthDate] = React.useState(
    props.itemInfo ? new Date(props.itemInfo.birthDate.toString()) : new Date()
  );

  const [teams, setTeams]: any = React.useState();
  const [teamId, setTeamId]: any = React.useState();
  const [typeId, setTypeId]: any = React.useState(
    props.itemInfo
      ? { value: props.itemInfo.type, label: props.itemInfo.type }
      : TeamMembersTypesData[0]
  );
  const [isButtonClicked, setIsButtonClicked] = React.useState(false);
  const [isShowErrors, setIsShowErrors] = React.useState(false);

  const [bio, setBio] = React.useState(
    props.itemInfo ? props.itemInfo.bio : ''
  );
  const getTeams = React.useCallback(async () => {
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_API}/get_all_teams`,
    })
      .then((response) => {
        const result = response.data.result.filter(
          ({ is_approved }) => is_approved
        );
        const selectedTeam = props.teamId
          ? response.data.result.find(({ id }) => props.teamId == id)
          : props.itemInfo
          ? response.data.result.find(({ id }) => props.itemInfo.team_id == id)
          : undefined;
        setTeams(result);
        setTeamId(
          selectedTeam
            ? { value: selectedTeam.id, label: selectedTeam.name }
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
      getTeams();
    } catch (err) {}
  }, [getTeams]);
  const uploadCover = async (e) => {
    setCoverImage(URL.createObjectURL(e.target.files[0]));
    setUploadedCoverImage(e.target.files[0]);
    console.log(uploadedCoverImage);
  };
  const uploadProfile = async (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
    setUploadedProfileImage(e.target.files[0]);
    console.log(uploadedProfileImage);
  };
  const InitialInputs = () => ({
    inputs: {
      name: props.itemInfo ? props.itemInfo.name : '',
      points: props.itemInfo ? props.itemInfo.points : '',
      country: props.itemInfo ? props.itemInfo.country : '',
      raceEntered: props.itemInfo ? props.itemInfo.raceEntered : '',
      highestRaceFinish: props.itemInfo ? props.itemInfo.highestRaceFinish : '',
      highestGridPosition: props.itemInfo
        ? props.itemInfo.highestGridPosition
        : '',
      placeOfBirth: props.itemInfo ? props.itemInfo.placeOfBirth : '',
      weight: props.itemInfo ? props.itemInfo.weight : '',
      height: props.itemInfo ? props.itemInfo.height : '',
      languages: props.itemInfo ? props.itemInfo.languages : '',
      podiums: props.itemInfo ? props.itemInfo.podiums : '',
      passion: props.itemInfo ? props.itemInfo.passion : '',
      vision: props.itemInfo ? props.itemInfo.vision : '',
      interests: props.itemInfo ? props.itemInfo.interests : '',
      email: props.itemInfo ? props.itemInfo.email : '',
      facebookLink: props.itemInfo ? props.itemInfo.facebookLink : '',
      twitterLink: props.itemInfo ? props.itemInfo.twitterLink : '',
      instagramLink: props.itemInfo ? props.itemInfo.instagramLink : '',
      youtubeLink: props.itemInfo ? props.itemInfo.youtubeLink : '',
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

  const handleAddTeamMember = async () => {
    try {
      if (!uploadedProfileImage || !uploadedCoverImage) {
        toast.error('Please upload team member images first!');
        return;
      }
      if (
        (state.inputs.email !== '' && !isValidEmail(state.inputs.email)) ||
        (state.inputs.facebookLink !== '' &&
          !isValidFacebookUrl(state.inputs.facebookLink)) ||
        (state.inputs.instagramLink !== '' &&
          !isValidInstagramUrl(state.inputs.instagramLink)) ||
        (state.inputs.twitterLink !== '' &&
          !isValidTwitterUrl(state.inputs.twitterLink)) ||
        (state.inputs.youtubeLink !== '' &&
          !isValidYouTubeUrl(state.inputs.youtubeLink)) ||
        !isContainsLetters(state.inputs.name) ||
        (state.inputs.country !== '' &&
          !isContainsLetters(state.inputs.country)) ||
        (state.inputs.languages !== '' &&
          !isContainsLetters(state.inputs.languages)) ||
        (state.inputs.placeOfBirth !== '' &&
          !isContainsLetters(state.inputs.placeOfBirth))
      ) {
        setIsShowErrors(true);
        return;
      } else {
        setIsShowErrors(false);
      }
      setIsButtonClicked(true);
      var formdata: any = new FormData();
      formdata.append('cover_image', uploadedCoverImage);
      formdata.append('profile_image', uploadedProfileImage);
      formdata.append('team_id', teamId.value);

      formdata.append(
        'team_member',
        JSON.stringify({
          name: state.inputs.name,
          country: state.inputs.country,
          type: typeId.value,
          placeOfBirth: state.inputs.placeOfBirth,
          languages: state.inputs.languages,
          bio: bio,
          passion: state.inputs.passion,
          vision: state.inputs.vision,
          interests: state.inputs.interests,
          email: state.inputs.email,
          facebookLink: state.inputs.facebookLink,
          twitterLink: state.inputs.twitterLink,
          instagramLink: state.inputs.instagramLink,
          youtubeLink: state.inputs.youtubeLink,
          podiums: state.inputs.podiums,
          points: state.inputs.points,
          raceEntered: state.inputs.raceEntered,
          highestRaceFinish: state.inputs.highestRaceFinish,
          highestGridPosition: state.inputs.highestGridPosition,
          weight: state.inputs.weight,
          height: state.inputs.height,
          is_approved: false,
          birthDate: birthDate,
        })
      );
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BACKEND_API}/add_team_member`,
        data: formdata,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
        },
      })
        .then(() => {
          toast.success('Data saved Successfully');
          setUploadedCoverImage(undefined);
          setCoverImage(hero5);
          setUploadedProfileImage(undefined);
          setProfileImage(driver);
          setBirthDate(new Date());
          setState(InitialInputs());
        })
        .catch(() => {
          toast.error('Something went wrong please try again later!');
        });
    } catch (err) {
      toast.error(err.message);
    }
    setIsButtonClicked(false);
  };

  const handleEditTeamMember = async () => {
    try {
      if (
        (state.inputs.email !== '' && !isValidEmail(state.inputs.email)) ||
        (state.inputs.facebookLink !== '' &&
          !isValidFacebookUrl(state.inputs.facebookLink)) ||
        (state.inputs.instagramLink !== '' &&
          !isValidInstagramUrl(state.inputs.instagramLink)) ||
        (state.inputs.twitterLink !== '' &&
          !isValidTwitterUrl(state.inputs.twitterLink)) ||
        (state.inputs.youtubeLink !== '' &&
          !isValidYouTubeUrl(state.inputs.youtubeLink)) ||
        !isContainsLetters(state.inputs.name) ||
        (state.inputs.country !== '' &&
          !isContainsLetters(state.inputs.country)) ||
        (state.inputs.languages !== '' &&
          !isContainsLetters(state.inputs.languages)) ||
        (state.inputs.placeOfBirth !== '' &&
          !isContainsLetters(state.inputs.placeOfBirth))
      ) {
        setIsShowErrors(true);
        return;
      } else {
        setIsShowErrors(false);
      }
      setIsButtonClicked(true);
      var formdata: any = new FormData();
      const sharedAttrs = {
        id: props.itemInfo.id,
        team_id: teamId.value,
        name: state.inputs.name,
        country: state.inputs.country,
        type: typeId.value,
        placeOfBirth: state.inputs.placeOfBirth,
        languages: state.inputs.languages,
        bio: bio,
        passion: state.inputs.passion,
        vision: state.inputs.vision,
        interests: state.inputs.interests,
        email: state.inputs.email,
        facebookLink: state.inputs.facebookLink,
        twitterLink: state.inputs.twitterLink,
        instagramLink: state.inputs.instagramLink,
        youtubeLink: state.inputs.youtubeLink,
        podiums: state.inputs.podiums,
        points: state.inputs.points,
        raceEntered: state.inputs.raceEntered,
        highestRaceFinish: state.inputs.highestRaceFinish,
        highestGridPosition: state.inputs.highestGridPosition,
        weight: state.inputs.weight,
        height: state.inputs.height,
        birthDate: birthDate,
        website: '',
      };
      uploadedProfileImage &&
        formdata.append('profile_image', uploadedProfileImage);
      uploadedCoverImage && formdata.append('cover_image', uploadedCoverImage);
      if (uploadedCoverImage && !uploadedProfileImage) {
        formdata.append(
          'team_member',
          JSON.stringify({
            ...sharedAttrs,
            image: props.itemInfo.profile_image,
            files_status: ChangingProfileImage.COVER,
          })
        );
      } else if (!uploadedCoverImage && uploadedProfileImage) {
        formdata.append(
          'team_member',
          JSON.stringify({
            ...sharedAttrs,
            cover_image: props.itemInfo.cover_image,
            files_status: ChangingProfileImage.PROFILE,
          })
        );
      } else if (uploadedCoverImage && uploadedProfileImage) {
        formdata.append(
          'team_member',
          JSON.stringify({
            ...sharedAttrs,
            files_status: ChangingProfileImage.PROFILE_COVER,
          })
        );
      } else {
        formdata.append(
          'team_member',
          JSON.stringify({
            ...sharedAttrs,
            cover_image: props.itemInfo.cover_image,
            image: props.itemInfo.profile_image,
            files_status: ChangingProfileImage.VOID,
          })
        );
      }
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BACKEND_API}/edit_team_member`,
        data: formdata,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
        },
      })
        .then(() => {
          toast.success('Data saved Successfully');
        })
        .catch(() => {
          toast.error('Something went wrong please try again later!');
        });
    } catch (err) {
      toast.error(err.message);
    }
    setIsButtonClicked(false);
  };

  return (
    <div>
      <div className=" relative mb-32">
        <div className=" h-80 relative">
          <img
            alt="hero5"
            className=" h-80 object-cover w-full"
            src={coverImage}
          />
          <label className=" bottom-4 right-3 bg-opacity-70 absolute px-3 py-2 text-base text-white bg-black rounded-md cursor-pointer">
            <FontAwesomeIcon icon={faCameraRetro} className="mr-1" />
            Change Cover Image
            <input
              accept="*/*"
              className=" hidden"
              type="file"
              ref={fileImgCoverInput}
              onChange={(e) => uploadCover(e)}
            />
          </label>
        </div>
        <div className="lg:flex relative">
          <div className="lg:w-72 ">
            <div className=" -top-28 lg:left-7 lg:-translate-x-0 left-1/2 border-antiFlashWhite-100 lg:w-56 absolute inline-block w-24 transform -translate-x-1/2 border-4 rounded-full">
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
          </div>
        </div>
      </div>
      {/* team information */}
      <div className="flex flex-wrap justify-start">
        <div className="lg:w-1/2 h-full p-4">
          <SpAdvInput
            placeholder="Team member Name"
            name="name"
            value={state.inputs.name}
            onChange={(e: any) => handleChange(e)}
            label="Team member Name"
            required={true}
            type="text"
          />
          {isShowErrors && !isContainsLetters(state.inputs.name) && (
            <span className=" text-lava-100 text-sm font-normal">
              Name must contain letters
            </span>
          )}
        </div>
        {props.teamName || props.fromScreen === 'teamAdmin' ? (
          <SpAdvInput
            placeholder="Team"
            name="name"
            value={props.teamName ? props.teamName : teamId?.label}
            disabled={true}
            onChange={(e: any) => handleChange(e)}
            label="Team Name"
            required={true}
            type="text"
            className="lg:w-1/2 h-full p-4"
            inputClassName="!text-gray-600 !cursor-not-allowed  !bg-transparent"
          />
        ) : (
          <SpAdvSelect
            name="team"
            value={teamId}
            onChange={(v) => {
              setTeamId(v);
            }}
            placeholder={'Team'}
            isSearchable={true}
            label="Team"
            className="sp-adv-basic-select lg:w-1/2 h-full p-4"
            options={teams?.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
            required={true}
          />
        )}
      </div>
      <div className="flex flex-wrap justify-start">
        <div className="lg:w-1/2 h-full p-4">
          {' '}
          <SpAdvSelect
            name="type"
            value={typeId}
            onChange={(v) => {
              setTypeId(v);
            }}
            placeholder={'Type'}
            isSearchable={true}
            label="Type"
            className="sp-adv-basic-select"
            options={TeamMembersTypesData}
            required={true}
          />
        </div>
        <div className="lg:w-1/2 h-full p-4">
          <SpAdvInput
            placeholder="Email"
            name="email"
            value={state.inputs.email}
            onChange={(e: any) => handleChange(e)}
            label="Email"
            required={false}
            type="text"
          />
          {isShowErrors &&
            state.inputs.email !== '' &&
            !isValidEmail(state.inputs.email) && (
              <span className=" text-lava-100 text-sm font-normal">
                Please enter valid email
              </span>
            )}
        </div>
      </div>
      <div className="flex flex-wrap justify-start">
        <div className="lg:w-1/2 h-full p-4">
          <p className={` text-darkGunmetal-300 mr-2 text-sm font-normal mb-2`}>
            Date of Birth
          </p>
          <DatePicker
            maxDate={new Date()}
            className=" sp-adv-datetime-picker sp-adv-date-picker w-full"
            value={birthDate}
            onChange={(date: any) => setBirthDate(date)}
          />
        </div>
        {typeId.value === 'Driver' && (
          <SpAdvInput
            placeholder="Points"
            name="points"
            value={state.inputs.points}
            onChange={(e: any) => handleChange(e)}
            label="Points"
            required={false}
            type="number"
            className="lg:w-1/2 h-full p-4"
            isAllowPositive={true}
          />
        )}
      </div>
      <div className="flex flex-wrap justify-start">
        <div className="lg:w-1/2 h-full p-4">
          <SpAdvInput
            placeholder="Country"
            name="country"
            value={state.inputs.country}
            onChange={(e: any) => handleChange(e)}
            label="Country"
            required={false}
            type="text"
          />
          {isShowErrors &&
            state.inputs.country !== '' &&
            !isContainsLetters(state.inputs.country) && (
              <span className=" text-lava-100 text-sm font-normal">
                Name must contain letters
              </span>
            )}
        </div>
        <div className="lg:w-1/2 h-full p-4">
          <SpAdvInput
            placeholder="Place Of Birth"
            name="placeOfBirth"
            value={state.inputs.placeOfBirth}
            onChange={(e: any) => handleChange(e)}
            label="Place Of Birth"
            required={false}
            type="text"
          />
          {isShowErrors &&
            state.inputs.placeOfBirth !== '' &&
            !isContainsLetters(state.inputs.placeOfBirth) && (
              <span className=" text-lava-100 text-sm font-normal">
                Name must contain letters
              </span>
            )}
        </div>
      </div>
      {typeId.value === 'Driver' && (
        <>
          <div className="flex flex-wrap justify-start">
            <SpAdvInput
              placeholder="Highest Race Finish"
              name="highestRaceFinish"
              value={state.inputs.highestRaceFinish}
              onChange={(e: any) => handleChange(e)}
              label="Highest Race Finish"
              required={false}
              type="text"
              className="lg:w-1/2 h-full p-4"
            />
            <SpAdvInput
              placeholder="Highest Grid Position"
              name="highestGridPosition"
              value={state.inputs.highestGridPosition}
              onChange={(e: any) => handleChange(e)}
              label="Highest Grid Position"
              required={false}
              type="text"
              className="lg:w-1/2 h-full p-4"
            />
          </div>
          <div className="flex flex-wrap justify-start">
            <SpAdvInput
              placeholder="Race Entered"
              name="raceEntered"
              value={state.inputs.raceEntered}
              onChange={(e: any) => handleChange(e)}
              label="Race Entered"
              required={false}
              type="number"
              className="lg:w-1/2 h-full p-4"
              isAllowPositive={true}
            />
            <SpAdvInput
              placeholder="Podiums"
              name="podiums"
              value={state.inputs.podiums}
              onChange={(e: any) => handleChange(e)}
              label="Podiums"
              required={false}
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
              required={false}
              type="number"
              className="lg:w-1/2 h-full p-4"
              isAllowPositive
            />
            <SpAdvInput
              placeholder="Height"
              name="height"
              value={state.inputs.height}
              onChange={(e: any) => handleChange(e)}
              label="Height"
              required={false}
              type="number"
              className="lg:w-1/2 h-full p-4"
              isAllowPositive
            />
          </div>
        </>
      )}
      <div className="flex flex-wrap justify-start">
        <div className="w-full h-full p-4">
          <SpAdvInput
            placeholder="Languages"
            name="languages"
            value={state.inputs.languages}
            onChange={(e: any) => handleChange(e)}
            label="Languages"
            required={false}
            type="text"
          />
          {isShowErrors &&
            state.inputs.languages !== '' &&
            !isContainsLetters(state.inputs.languages) && (
              <span className=" text-lava-100 text-sm font-normal">
                Name must contain letters
              </span>
            )}
        </div>
      </div>
      {/* socials links */}
      <div className="flex flex-wrap justify-start">
        <div className="lg:w-1/2 h-full p-4">
          <SpAdvInput
            placeholder="Facebook Link"
            name="facebookLink"
            value={state.inputs.facebookLink}
            onChange={(e: any) => handleChange(e)}
            label="Facebook Link"
            required={false}
            type="text"
          />
          {isShowErrors &&
            state.inputs.facebookLink !== '' &&
            !isValidYouTubeUrl(state.inputs.facebookLink) && (
              <span className=" text-lava-100 text-sm font-normal">
                Please Enter Valid facebook URL
              </span>
            )}
        </div>
        <div className="lg:w-1/2 h-full p-4">
          <SpAdvInput
            placeholder="YouTube Link"
            name="youtubeLink"
            value={state.inputs.youtubeLink}
            onChange={(e: any) => handleChange(e)}
            label="YouTube Link"
            required={false}
            type="text"
          />
          {isShowErrors &&
            state.inputs.youtubeLink !== '' &&
            !isValidYouTubeUrl(state.inputs.youtubeLink) && (
              <span className=" text-lava-100 text-sm font-normal">
                Please Enter Valid youtube URL
              </span>
            )}
        </div>
      </div>
      <div className="flex flex-wrap justify-start">
        <div className="lg:w-1/2 h-full p-4">
          <SpAdvInput
            placeholder="Twitter Link"
            name="twitterLink"
            value={state.inputs.twitterLink}
            onChange={(e: any) => handleChange(e)}
            label="Twitter Link"
            required={false}
            type="text"
          />
          {isShowErrors &&
            state.inputs.twitterLink !== '' &&
            !isValidYouTubeUrl(state.inputs.twitterLink) && (
              <span className=" text-lava-100 text-sm font-normal">
                Please Enter Valid twitter URL
              </span>
            )}
        </div>
        <div className="lg:w-1/2 h-full p-4">
          <SpAdvInput
            placeholder="Instagram Link"
            name="instagramLink"
            value={state.inputs.instagramLink}
            onChange={(e: any) => handleChange(e)}
            label="Instagram Link"
            required={false}
            type="text"
          />
          {isShowErrors &&
            state.inputs.instagramLink !== '' &&
            !isValidYouTubeUrl(state.inputs.instagramLink) && (
              <span className=" text-lava-100 text-sm font-normal">
                Please Enter Valid instagram URL
              </span>
            )}
        </div>
      </div>
      <div className="flex flex-col mt-8">
        <SpAdvEditor
          placeholder="Team member BIO"
          name="bio"
          value={bio}
          onChange={(e: any) => {
            setBio(e);
          }}
          label="Team member Bio"
          required={false}
          className=" lg:px-4 h-full"
        />
      </div>
      <div className="flex flex-col mt-8">
        <SpAdvTextArea
          placeholder="Why the passion for racing"
          name="passion"
          onChange={(e: any) => handleChange(e)}
          value={state.inputs.passion}
          label="Why the passion for racing"
          required={false}
          className=" lg:px-4 h-full"
        />
      </div>
      <div className="flex flex-col mt-8">
        <SpAdvTextArea
          onChange={(e: any) => handleChange(e)}
          placeholder="Vision for the future"
          name="vision"
          value={state.inputs.vision}
          label="Vision for the future"
          required={false}
          className=" lg:px-4 h-full"
        />
      </div>
      <div className="flex flex-col mt-8">
        <SpAdvTextArea
          onChange={(e: any) => handleChange(e)}
          placeholder="Other Interests"
          name="interests"
          value={state.inputs.interests}
          label="Other Interests"
          required={false}
          className=" lg:px-4 h-full"
        />
      </div>
      <div className="bg-red mt-12">
        <SpAdvButton
          className="grow flex-1"
          onClick={() =>
            props.itemInfo ? handleEditTeamMember() : handleAddTeamMember()
          }
          disabled={
            isButtonClicked ||
            teamId === '' ||
            teamId === undefined ||
            state.inputs.name.trim() === '' ||
            typeId === ''
          }
        >
          {isButtonClicked ? (
            <Spinner />
          ) : props.itemInfo ? (
            'Edit Team Memeber'
          ) : (
            'Add New Team Member'
          )}
        </SpAdvButton>
      </div>
    </div>
  );
}

export default AddTeamMember;
