import React from 'react';
import SingleEventRow from './singleEventRow';
import axios from 'axios';
import { Spinner } from 'flowbite-react';
import toast from 'react-hot-toast';

function ManageEvents() {
  const [events, setEvents]: any = React.useState();
  const [isApprovedChanged, setIsApprovedChanged]: any = React.useState(false);
  const getSeasons = React.useCallback(async () => {
    let seasons = [];
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_API}/get_all_seasons`,
    })
      .then((response) => {
        const result = response.data.result;
        seasons = result;
      })
      .catch(() => {
        toast.error('Something went wrong please try again later!');
      });
    return seasons;
  }, []);
  const getEvents = React.useCallback(async () => {
    const seasons = await getSeasons();
    seasons.length > 0 &&
      (await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BACKEND_API}/get_all_events`,
      })
        .then((response) => {
          const events =
            seasons &&
            response.data.result.map((item) => ({
              ...item,
              season: seasons.find(({ id }) => item.season_id == id).name,
            }));
          setEvents(events);
        })
        .catch(() => {
          toast.error('Something went wrong please try again later!');
        }));
  }, []);

  React.useEffect(() => {
    try {
      setEvents();
      getEvents();
    } catch (err) {}
  }, [getEvents, isApprovedChanged]);
  return (
    <div className=" overflow-x-auto">
      {events ? (
        events.length > 0 ? (
          <table className="w-full table-auto">
            <thead className=" bg-transparent">
              <tr className="px-4">
                <th className="whitespace-nowrap px-4 py-2">
                  <div className="font-spAdvSemiBold text-neutral-400 text-base font-semibold tracking-wide text-left">
                    Event Name
                  </div>
                </th>
                <th className="whitespace-nowrap px-4 py-2">
                  <div className="font-spAdvSemiBold text-neutral-400 flex items-center text-base font-semibold tracking-wide text-left cursor-pointer">
                    Season Name
                  </div>
                </th>
                <th className="whitespace-nowrap px-4 py-2">
                  <div className="font-spAdvSemiBold text-neutral-400 flex items-center text-base font-semibold tracking-wide text-left cursor-pointer">
                    Start Date
                  </div>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {events?.map((item: Object, index: Number) => (
                <SingleEventRow
                  item={item}
                  key={index}
                  approvedChanged={() =>
                    setIsApprovedChanged(!isApprovedChanged)
                  }
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

export default ManageEvents;
