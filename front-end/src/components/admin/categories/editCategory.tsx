import React, { useState } from 'react';
import BackToHistory from '../../shared/BackToHistory';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Spinner } from 'flowbite-react';
import AddCategory from './addCategory';
import { AdminTabs } from '../../../Enum/adminTabs';
function EditCategory() {
  const search = useLocation().search;
  const queryParams = new URLSearchParams(search);
  const id = queryParams.get('id');
  const [category, setCategory]: any = useState();
  const getCategory = React.useCallback(async () => {
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_API}/get_category`,
      data: { id: id },
    })
      .then((response) => {
        setCategory(response.data.result);
      })
      .catch(() => {
        toast.error('Something went wrong please try again later!');
      });
  }, []);
  React.useEffect(() => {
    try {
      getCategory();
    } catch (err) {}
  }, [getCategory]);
  return (
    <div className="md:px-16 lg:flex-row px-4 mb-10">
      <div className="">
        <div className="mt-5">
          <BackToHistory
            text="Back to Browse"
            redirectTab={AdminTabs.Categories}
          />
          <p className=" font-spAdvSemiBold text-darkGunmetal-200 text-h2 font-semibold">
            Edit Category
          </p>
          {category ? (
            <AddCategory itemInfo={category} />
          ) : (
            <div className="flex items-center justify-center h-screen">
              <Spinner size={'xl'} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditCategory;
