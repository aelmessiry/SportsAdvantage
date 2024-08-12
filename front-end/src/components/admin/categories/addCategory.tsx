import React from 'react';
import axios from 'axios';
import SpAdvButton from '../../ui/SpAdvButton';
import SpAdvInput from '../../ui/SpAdvInput';
import SpAdvTextArea from '../../ui/SpAdvTextArea';
import { categoryPlaceHolder } from '../../../assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from 'flowbite-react';
import toast from 'react-hot-toast';
import { APIERRORHandling } from '../../../Enum/apiErrorHandling';
function AddCategory(props) {
  const fileImgProfileInput = React.useRef();
  const [uploadedProfileImage, setUploadedProfileImage] = React.useState();
  const [profileImage, setProfileImage] = React.useState(
    props.itemInfo ? props.itemInfo?.image : categoryPlaceHolder
  );
  const [isButtonClicked, setIsButtonClicked] = React.useState(false);

  const uploadProfile = async (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
    setUploadedProfileImage(e.target.files[0]);
    console.log(uploadedProfileImage);
  };
  const InitialInputs = () => ({
    inputs: {
      categoryName: props.itemInfo ? props.itemInfo.name : '',
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

  const handleAddCategory = async () => {
    try {
      if (!uploadedProfileImage) {
        toast.error('Please upload category image first!');
        return;
      }
      setIsButtonClicked(true);
      var formdata: any = new FormData();
      formdata.append('file', uploadedProfileImage);
      formdata.append(
        'category',
        JSON.stringify({
          name: state.inputs.categoryName.trim(),
          description: state.inputs.description,
          is_disabled: true,
        })
      );
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BACKEND_API}/add_category`,
        data: formdata,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
        },
      })
        .then(() => {
          toast.success('Data saved Successfully');
          setState(InitialInputs());
          setProfileImage(categoryPlaceHolder);
          setUploadedProfileImage(undefined);
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
  const handleEditCategory = async () => {
    try {
      setIsButtonClicked(true);
      var formdata: any = new FormData();
      const sharedAttr = {
        id: props.itemInfo.id,
        name: state.inputs.categoryName.trim(),
        description: state.inputs.description,
      };
      uploadedProfileImage && formdata.append('file', uploadedProfileImage);
      uploadedProfileImage
        ? formdata.append(
            'category',
            JSON.stringify({
              ...sharedAttr,
            })
          )
        : formdata.append(
            'category',
            JSON.stringify({
              ...sharedAttr,
              image: props.itemInfo.image,
            })
          );
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BACKEND_API}/edit_category`,
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
            placeholder="Category Name"
            name="categoryName"
            value={state.inputs.categoryName}
            onChange={(e: any) => handleChange(e)}
            label="Category Name"
            required={true}
            type="text"
            className="w-full"
          />
        </div>
        <div className="flex flex-wrap justify-start w-full mt-5">
          <SpAdvTextArea
            placeholder="About Category"
            name="description"
            value={state.inputs.description}
            onChange={(e: any) => handleChange(e)}
            label="About Category"
            required={true}
            className=" w-full"
          />
        </div>
        <SpAdvButton
          className="grow flex-1 mt-5"
          onClick={() =>
            props.itemInfo ? handleEditCategory() : handleAddCategory()
          }
          disabled={
            isButtonClicked ||
            state.inputs.categoryName.trim() === '' ||
            state.inputs.description.trim() === ''
          }
        >
          {isButtonClicked ? (
            <Spinner />
          ) : props.itemInfo ? (
            'Edit Category'
          ) : (
            'Add New Category'
          )}
        </SpAdvButton>
      </div>
    </div>
  );
}

export default AddCategory;
