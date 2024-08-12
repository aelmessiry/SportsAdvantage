import React from 'react';
import SpAdvButton from '../../ui/SpAdvButton';
import SpAdvInput from '../../ui/SpAdvInput';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import axios from 'axios';
import { Spinner } from 'flowbite-react';
import toast from 'react-hot-toast';
import { APIERRORHandling } from '../../../Enum/apiErrorHandling';
import { UserRole } from '../../../Enum/userRole';
function AddAdmin() {
  const [isButtonClicked, setIsButtonClicked] = React.useState(false);
  const [address, setAddress] = React.useState('');

  const handleAddAdmin = async () => {
    try {
      setIsButtonClicked(true);
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BACKEND_API}/add_user`,
        data: {
          address: address,
          role: UserRole.superAdmin,
          is_disabled: true,
        },
      })
        .then(() => {
          toast.success('Data saved Successfully');
          setAddress('');
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
        <div className="flex flex-wrap justify-start mt-10">
          <SpAdvInput
            placeholder="Admin Public Wallet Address"
            name="address"
            value={address}
            onChange={(e: any) => setAddress(e.target.value)}
            label="Admin Public Wallet Address"
            required={true}
            type="text"
            className="lg:w-1/2 h-full pr-4"
          />
        </div>
        <SpAdvButton
          className="grow flex-1 mt-5"
          onClick={() => {
            handleAddAdmin();
          }}
          disabled={isButtonClicked || address.trim() === ''}
        >
          {isButtonClicked ? <Spinner /> : 'Add New Admin'}
        </SpAdvButton>
      </div>
    </div>
  );
}

export default AddAdmin;
