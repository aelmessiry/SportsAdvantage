import React from 'react';
import SingleCategoryRow from './singleCategoryRow';
import axios from 'axios';
import { Spinner } from 'flowbite-react';
import toast from 'react-hot-toast';

function ManageCategories() {
  const [categories, setCategories]: any = React.useState();
  const [isApprovedChanged, setIsApprovedChanged]: any = React.useState(false);

  const getCategories = React.useCallback(async () => {
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_API}/get_all_categories`,
    })
      .then((response) => {
        setCategories(response.data.result);
      })
      .catch(() => {
        toast.error('Something went wrong please try again later!');
      });
  }, []);

  React.useEffect(() => {
    try {
      setCategories();
      getCategories();
    } catch (err) {}
  }, [getCategories, isApprovedChanged]);
  return (
    <div className=" overflow-x-auto">
      {categories ? (
        categories.length > 0 ? (
          <table className="w-full table-auto">
            <thead className=" bg-transparent">
              <tr className="px-4">
                <th className="whitespace-nowrap px-4 py-2">
                  <div className="font-spAdvSemiBold text-neutral-400 text-base font-semibold tracking-wide text-left">
                    Category Name
                  </div>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {categories?.map((item: Object, index: Number) => (
                <SingleCategoryRow
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

export default ManageCategories;
