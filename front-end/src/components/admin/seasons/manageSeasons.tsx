import React from 'react';
import SingleSeasonRow from './singleSeasonRow';
import axios from 'axios';
import { Spinner } from 'flowbite-react';
import toast from 'react-hot-toast';

function ManageSeasons() {
  const [seasons, setSeasons]: any = React.useState();
  const [isApprovedChanged, setIsApprovedChanged]: any = React.useState(false);

  const getSeasons = React.useCallback(async () => {
    const categories = await getCategories();
    categories.length > 0 &&
      (await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BACKEND_API}/get_all_seasons`,
      })
        .then((response) => {
          const seasons =
            categories &&
            response.data.result.map((item) => ({
              ...item,
              category: categories.find(({ id }) => item.category_id == id)
                .name,
            }));
          setSeasons(seasons);
        })
        .catch(() => {
          toast.error('Something went wrong please try again later!');
        }));
  }, []);

  const getCategories = React.useCallback(async () => {
    let categories = [];
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_API}/get_all_categories`,
    })
      .then((response) => {
        const result = response.data.result;
        categories = result;
      })
      .catch(() => {
        toast.error('Something went wrong please try again later!');
      });
    return categories;
  }, []);
  React.useEffect(() => {
    try {
      setSeasons();
      getSeasons();
    } catch (err) {}
  }, [getSeasons, isApprovedChanged]);

  return (
    <div className=" overflow-x-auto">
      {seasons ? (
        seasons.length > 0 ? (
          <table className="w-full table-auto">
            <thead className=" bg-transparent">
              <tr className="px-4">
                <th className="whitespace-nowrap px-4 py-2">
                  <div className="font-spAdvSemiBold text-neutral-400 text-base font-semibold tracking-wide text-left">
                    Season Name
                  </div>
                </th>
                <th className="whitespace-nowrap px-4 py-2">
                  <div className="font-spAdvSemiBold text-neutral-400 flex items-center text-base font-semibold tracking-wide text-left cursor-pointer">
                    Category
                  </div>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {seasons?.map((item: Object, index: Number) => (
                <SingleSeasonRow
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

export default ManageSeasons;
