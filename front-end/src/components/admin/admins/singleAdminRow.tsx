import React from 'react';
import SpAdvButton from '../../ui/SpAdvButton';
import { Spinner } from 'flowbite-react';
import toast from 'react-hot-toast';
import axios from 'axios';

function SingleAdminRow(props: any) {
  const [isButtonClicked, setIsButtonClicked] = React.useState(false);

  const handleDisable = async () => {
    try {
      setIsButtonClicked(true);
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BACKEND_API}/toggle_disable_user`,
        data: { address: props.item.address },
        headers: {
          'Content-Type': `application/json`,
        },
      })
        .then(() => {
          toast.success(
            props.item.is_disabled
              ? 'Admin enabled saved Successfully'
              : 'Admin disabled saved Successfully'
          );
          props.approvedChanged();
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
    <tr className={`hover:bg-cetaceanBlue-400 cursor-pointer`}>
      <td className="whitespace-nowrap px-4 py-6">
        <div className="flex items-center">
          <div className=" font-spAdvSemiBold text-darkGunmetal-200 text-base font-semibold leading-5">
            {props.item.address}
          </div>
        </div>
      </td>
      <td>
        <SpAdvButton
          className={`${
            props.item.is_disabled ? ' !bg-green-600' : 'bg-lava-100'
          } z-20 mr-2`}
          onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            handleDisable();
          }}
        >
          {isButtonClicked ? (
            <Spinner />
          ) : props.item.is_disabled ? (
            'Enable'
          ) : (
            'Disable'
          )}
        </SpAdvButton>
      </td>
    </tr>
  );
}

export default SingleAdminRow;
