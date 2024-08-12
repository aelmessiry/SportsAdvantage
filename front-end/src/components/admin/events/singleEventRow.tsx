import React from 'react';
import SpAdvButton from '../../ui/SpAdvButton';
import moment from 'moment';
import { Spinner } from 'flowbite-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SingleEventRow(props: any) {
  const [isButtonClicked, setIsButtonClicked] = React.useState(false);
  let navigate = useNavigate();
  const handleDisable = async () => {
    try {
      setIsButtonClicked(true);
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BACKEND_API}/toggle_disable_event`,
        data: { id: props.item.id },
        headers: {
          'Content-Type': `application/json`,
        },
      })
        .then(() => {
          toast.success(
            props.item.is_disabled
              ? 'Event enabled saved Successfully'
              : 'Event disabled saved Successfully'
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
          <div className="sm:mr-3 flex-shrink-0 w-10 h-10 mr-2">
            <img
              className="object-cover w-10 h-10 rounded-full"
              src={props.item.image}
              alt="Spot Image"
            />
          </div>
          <div className=" font-spAdvSemiBold text-darkGunmetal-200 text-base font-semibold leading-5">
            {props.item.name}
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-6">
        <div className="font-spAdvBold text-darkGunmetal-200 text-base font-bold leading-5 text-left">
          {props.item.season}
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-6">
        <div className="font-spAdvBold text-darkGunmetal-200 text-base font-bold leading-5 text-left">
          {moment(props.item.eventDate).format('YYYY-MM-DD')}
          <br />
          <span className=" text-gray-500">
            {' '}
            {moment(props.item.eventDate).format('hh:mm:ss A')}
          </span>
        </div>
      </td>
      <td
        onClick={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }}
      >
        <SpAdvButton
          onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            handleDisable();
          }}
          className={`${
            props.item.is_disabled ? ' !bg-green-600' : 'bg-lava-100'
          } z-20 mr-2`}
        >
          {isButtonClicked ? (
            <Spinner />
          ) : props.item.is_disabled ? (
            'Enable'
          ) : (
            'Disable'
          )}
        </SpAdvButton>
        <SpAdvButton
          className={` z-20 !bg-darkGunmetal-300`}
          onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            navigate(`/edit-event?id=${props.item.id}`);
          }}
        >
          Edit
        </SpAdvButton>
      </td>
    </tr>
  );
}

export default SingleEventRow;
