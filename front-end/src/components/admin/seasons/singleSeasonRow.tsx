import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MyAdSpotsStatus } from '../../../Enum/myAdSpotsStatus';
import SpAdvButton from '../../ui/SpAdvButton';
import { Spinner } from 'flowbite-react';
import toast from 'react-hot-toast';
import axios from 'axios';

function SingleSeasonRow(props: any) {
  let navigate = useNavigate();
  // const handleRowClick = () => {
  //   navigate(`/single-driver?id=${props.item.id}`);
  // };
  const [isButtonClicked, setIsButtonClicked] = React.useState(false);
  const handleDisable = async () => {
    try {
      setIsButtonClicked(true);
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BACKEND_API}/toggle_disable_season`,
        data: { id: props.item.id },
        headers: {
          'Content-Type': `application/json`,
        },
      })
        .then(() => {
          toast.success(
            props.item.is_disabled
              ? 'Season enabled saved Successfully'
              : 'Season disabled saved Successfully'
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
    <tr
      className={`hover:bg-cetaceanBlue-400 cursor-pointer
       ${props.item.status === MyAdSpotsStatus.Pending ? ' opacity-60' : ''}
      `}
      // onClick={() => handleRowClick()}
    >
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
          {props.item.category}
        </div>
      </td>
      <td
        onClick={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }}
      >
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
        <SpAdvButton
          className={` z-20 !bg-darkGunmetal-300`}
          onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            navigate(`/edit-season?id=${props.item.id}`);
          }}
        >
          Edit
        </SpAdvButton>
      </td>
    </tr>
  );
}

export default SingleSeasonRow;
