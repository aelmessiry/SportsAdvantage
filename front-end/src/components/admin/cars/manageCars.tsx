import React from 'react';
import axios from 'axios';
import { Spinner } from 'flowbite-react';
import SingleCarRow from './singleCarRow';
import toast from 'react-hot-toast';

function ManageCars(props) {
  const [cars, setCars]: any = React.useState();
  const [isApprovedChanged, setIsApprovedChanged]: any = React.useState(false);

  const getCars = React.useCallback(async () => {
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_API}/get_cars_of_team`,
      data: { id: props.teamId },
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
      setCars();
      getCars();
    } catch (err) {}
  }, [getCars, isApprovedChanged]);

  return (
    <div className=" min-h-screen overflow-x-auto">
      {cars ? (
        cars.length > 0 ? (
          <table className="w-full table-auto">
            <thead className=" bg-transparent">
              <tr className="px-4">
                <th className="whitespace-nowrap px-4 py-2">
                  <div className="font-spAdvSemiBold text-neutral-400 text-base font-semibold tracking-wide text-left">
                    Car Name
                  </div>
                </th>
                <th className="whitespace-nowrap px-4 py-2">
                  <div className="font-spAdvSemiBold text-neutral-400 text-base font-semibold tracking-wide text-left">
                    Car Model
                  </div>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {cars?.map((item: Object, index: Number) => (
                <SingleCarRow
                  item={item}
                  key={index}
                  isAdmin={props.isAdmin}
                  approvedChanged={() =>
                    setIsApprovedChanged(!isApprovedChanged)
                  }
                  isFromTeamAdmin={props.isFromTeamAdmin}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex items-center justify-center h-screen text-lg text-black">
            <span>You Don't have any Data Yet</span>
          </div>
        )
      ) : (
        <div className="flex items-center justify-center h-screen">
          <Spinner size={'xl'} />
        </div>
      )}
    </div>
  );
}

export default ManageCars;
