import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MyAdSpotsStatus } from '../../../Enum/myAdSpotsStatus';
import SpAdvButton from '../../ui/SpAdvButton';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Spinner } from 'flowbite-react';
import SpAdvAddNFTMetaDataModal from '../../ui/shared/modals/SpAdvAddNFTMetaDataModal';

function SingleTeamRow(props: any) {
  let navigate = useNavigate();
  const [isButtonClicked, setIsButtonClicked] = React.useState(false);
  const [cars, setCars]: any = React.useState();
  const [showAddNFTMetaDataModal, setShowAddNFTMetaDataModal] =
    React.useState(false);

  const handleRowClick = () => {
    navigate(`/single-team?id=${props.item.id}`);
  };
  const handleManageCarsClick = () => {
    navigate(`/team-owned-cars?id=${props.item.id}`);
  };

  const getCars = React.useCallback(async () => {
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_API}/get_cars_of_team`,
      data: { id: props.item.id },
    })
      .then((response) => {
        setCars(response.data.result);
      })
      .catch(() => {
        toast.error('Something went wrong please try again later!');
      });
  }, []);

  React.useEffect(() => {
    try {
      getCars();
    } catch (err) {}
  }, [getCars]);
  const handleApprove = async () => {
    try {
      setIsButtonClicked(true);

      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BACKEND_API}/toggle_approve_team`,
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
    <React.Fragment>
      <tr
        className={`hover:bg-cetaceanBlue-400 cursor-pointer
       ${props.item.status === MyAdSpotsStatus.Pending ? ' opacity-60' : ''}
      `}
        onClick={() => handleRowClick()}
      >
        <td className="whitespace-nowrap px-4 py-6">
          <span className="flex items-center">
            <span className="sm:mr-3 flex-shrink-0 w-10 h-10 mr-2">
              <img
                className="rounded-full"
                src={props.item.image}
                width="40"
                height="40"
                alt="Spot Image"
              />
            </span>
            <span className=" font-spAdvSemiBold text-darkGunmetal-200 text-base font-semibold leading-5">
              {props.item.name}
            </span>
          </span>
        </td>
        <td className="whitespace-nowrap px-4 py-6">
          <span className="font-spAdvBold text-darkGunmetal-200 text-base font-bold leading-5 text-left">
            {props.item.teamOwner}
          </span>
        </td>
        <td className="whitespace-nowrap px-4 py-6">
          <span className="font-spAdvBold text-darkGunmetal-200 text-base font-bold leading-5 text-left">
            {props.item.foundedIn}
          </span>
        </td>
        <td className="whitespace-nowrap px-4 py-6">
          <span className="font-spAdvBold text-darkGunmetal-200 text-base font-bold leading-5 text-left">
            {props.item.headQuarters}
          </span>
        </td>
        <td
          onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
          }}
        >
          <SpAdvButton
            className={`${
              props.item.is_approved ? ' bg-lava-100' : '!bg-green-600'
            } z-20 mr-2  !w-32`}
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
        </td>
        <td>
          <SpAdvButton
            className={` z-20 mr-2 !bg-darkGunmetal-300`}
            onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              navigate(`/edit-team?id=${props.item.id}`);
            }}
          >
            Edit
          </SpAdvButton>
        </td>
        <td>
          <SpAdvButton
            className=" !bg-darkGunmetal-300 z-20 mr-2"
            onClick={(e: any) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              handleManageCarsClick();
            }}
          >
            Manage Cars ({cars ? cars?.length : <Spinner />})
          </SpAdvButton>
        </td>
        <td>
          <SpAdvButton
            className={`!bg-lava-100 z-20 mr-2 `}
            onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              setShowAddNFTMetaDataModal(true);
            }}
          >
            {props.item?.metadata ? 'Edit' : 'Add'} NFT
          </SpAdvButton>
          <span className=" text-gray-600">
            {props.item?.metadata && 'This team has nft data'}
          </span>
        </td>
      </tr>
      {showAddNFTMetaDataModal && (
        <SpAdvAddNFTMetaDataModal
          show={showAddNFTMetaDataModal}
          handleCloseParent={() => {
            setShowAddNFTMetaDataModal(false);
          }}
          id={props.item.id}
          approvedChanged={props.approvedChanged}
          metaData={
            props.item?.metadata ? JSON.parse(props.item?.metadata) : undefined
          }
        />
      )}
    </React.Fragment>
  );
}

export default SingleTeamRow;
