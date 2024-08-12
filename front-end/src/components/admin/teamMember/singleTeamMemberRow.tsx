import React from 'react';
import { useNavigate } from 'react-router-dom';
import SpAdvButton from '../../ui/SpAdvButton';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Spinner } from 'flowbite-react';

function SingleTeamMemberRow(props: any) {
  let navigate = useNavigate();
  const [isButtonClicked, setIsButtonClicked] = React.useState(false);

  const handleRowClick = () => {
    navigate(`/single-driver?id=${props.item.id}`);
  };
  const handleApprove = async () => {
    try {
      setIsButtonClicked(true);
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BACKEND_API}/toggle_approve_team_member`,
        data: { id: props.item.id },
        headers: {
          'Content-Type': `application/json`,
        },
      })
        .then(() => {
          toast.success(
            props.item.is_approved
              ? 'Team unapproved saved Successfully'
              : 'Team approved saved Successfully'
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
      `}
      onClick={() => handleRowClick()}
    >
      <td className="whitespace-nowrap px-4 py-6">
        <div className="flex items-center">
          <div className="sm:mr-3 flex-shrink-0 w-10 h-10 mr-2">
            <img
              className="object-cover w-10 h-10 rounded-full"
              src={props.item.profile_image}
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
          {props.item.team}
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-6">
        <div className="font-spAdvBold text-darkGunmetal-200 text-base font-bold leading-5 text-left">
          {props.item.country}
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-6">
        <div className="font-spAdvBold text-darkGunmetal-200 text-base font-bold leading-5 text-left">
          {props.item.type}
        </div>
      </td>

      <td
        onClick={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }}
      >
        {props.isAdmin && (
          <SpAdvButton
            className={`${
              props.item.is_approved ? ' bg-lava-100' : '!bg-green-600'
            } z-20 mr-2   !w-32`}
            onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              handleApprove();
            }}
          >
            {isButtonClicked ? (
              <Spinner />
            ) : props.item.is_approved ? (
              'Unapprove'
            ) : (
              'Approve'
            )}
          </SpAdvButton>
        )}
        <SpAdvButton
          className={` z-20 !bg-darkGunmetal-300`}
          onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            navigate(
              `/edit-team-member?id=${props.item.id}&from=${
                props.isFromTeamAdmin ? 'teamAdmin' : 'admin'
              }`
            );
          }}
        >
          Edit
        </SpAdvButton>
      </td>
    </tr>
  );
}

export default SingleTeamMemberRow;
