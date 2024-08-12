import React from 'react';
import SpAdvButton from '../../ui/SpAdvButton';
import SpAdvInput from '../../ui/SpAdvInput';
import SpAdvTextArea from '../../ui/SpAdvTextArea';
import { seasonPlaceHolder } from '../../../assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import SpAdvSelect from '../../ui/SpAdvSelect';
import { Spinner } from 'flowbite-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { APIERRORHandling } from '../../../Enum/apiErrorHandling';
function AddSeason(props) {
  const fileImgProfileInput = React.useRef();
  const [uploadedProfileImage, setUploadedProfileImage] = React.useState();
  const [profileImage, setProfileImage] = React.useState(
    props.itemInfo ? props.itemInfo.image : seasonPlaceHolder
  );
  const [isButtonClicked, setIsButtonClicked] = React.useState(false);
  const [categories, setCategories]: any = React.useState();
  const [categoryId, setCategoryId]: any = React.useState();

  const getCategories = React.useCallback(async () => {
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_API}/get_all_categories`,
    })
      .then((response) => {
        const result = response.data.result.filter(
          ({ is_disabled }) => !is_disabled
        );
        const selectedCat =
          props.itemInfo &&
          response.data.result.find(
            ({ id }) => props.itemInfo.category_id == id
          );
        setCategories(result);
        setCategoryId(
          selectedCat
            ? { value: selectedCat.id, label: selectedCat.name }
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
      getCategories();
    } catch (err) {}
  }, [getCategories]);

  const uploadProfile = async (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
    setUploadedProfileImage(e.target.files[0]);
    console.log(uploadedProfileImage);
  };
  const InitialInputs = () => ({
    inputs: {
      seasonName: props.itemInfo ? props.itemInfo.name : '',
      description: props.itemInfo ? props.itemInfo.description : '',
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

  const handleAddSeason = async () => {
    try {
      if (!uploadedProfileImage) {
        toast.error('Please upload season image first!');
        return;
      }
      setIsButtonClicked(true);
      var formdata: any = new FormData();
      formdata.append('file', uploadedProfileImage);
      formdata.append('category_id', categoryId.value);
      formdata.append(
        'season',
        JSON.stringify({
          name: state.inputs.seasonName.trim(),
          description: state.inputs.description,
          is_disabled: true,
        })
      );
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BACKEND_API}/add_season`,
        data: formdata,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
        },
      })
        .then(() => {
          toast.success('Data saved Successfully');
          setState(InitialInputs());
          setUploadedProfileImage(undefined);
          setProfileImage(seasonPlaceHolder);
          setCategoryId({ value: categories[0].id, label: categories[0].name });
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

  const handleEditSeason = async () => {
    try {
      setIsButtonClicked(true);
      var formdata: any = new FormData();
      const sharedAttrs = {
        id: props.itemInfo.id,
        name: state.inputs.seasonName.trim(),
        description: state.inputs.description,
        category_id: categoryId.value,
      };
      uploadedProfileImage && formdata.append('file', uploadedProfileImage);
      uploadedProfileImage
        ? formdata.append(
            'season',
            JSON.stringify({
              ...sharedAttrs,
            })
          )
        : formdata.append(
            'season',
            JSON.stringify({
              ...sharedAttrs,
              image: props.itemInfo.image,
            })
          );
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BACKEND_API}/edit_season`,
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
            placeholder="Season Name"
            name="seasonName"
            value={state.inputs.seasonName}
            onChange={(e: any) => handleChange(e)}
            label="Season Name"
            required={true}
            type="text"
            className="lg:w-1/2 h-full p-4"
          />
          <SpAdvSelect
            name="categoryId"
            value={categoryId}
            onChange={(v) => {
              setCategoryId(v);
            }}
            placeholder={'Category'}
            isSearchable={true}
            label="Category"
            required={true}
            className="sp-adv-basic-select lg:w-1/2 h-full p-4"
            options={categories?.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
          />
        </div>
        <div className="flex flex-wrap justify-start w-full mt-5">
          <SpAdvTextArea
            placeholder="About Season"
            name="description"
            value={state.inputs.description}
            onChange={(e: any) => handleChange(e)}
            label="About Season"
            required={true}
            className=" w-full"
          />
        </div>
        <SpAdvButton
          className="grow flex-1 mt-5"
          onClick={() =>
            props.itemInfo ? handleEditSeason() : handleAddSeason()
          }
          disabled={
            isButtonClicked ||
            state.inputs.seasonName.trim() === '' ||
            categoryId === '' ||
            categoryId === undefined ||
            state.inputs.description.trim() === ''
          }
        >
          {isButtonClicked ? (
            <Spinner />
          ) : props.itemInfo ? (
            'Edit Season'
          ) : (
            'Add New Season'
          )}
        </SpAdvButton>
      </div>
    </div>
  );
}

export default AddSeason;
