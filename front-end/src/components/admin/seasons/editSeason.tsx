import React, { useState } from 'react';
import BackToHistory from '../../shared/BackToHistory';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Spinner } from 'flowbite-react';
import { AdminTabs } from '../../../Enum/adminTabs';
import AddSeason from './addSeason';
function EditSeason() {
  const search = useLocation().search;
  const queryParams = new URLSearchParams(search);
  const id = queryParams.get('id');
  const [season, setSeason]: any = useState();
  const getSeason = React.useCallback(async () => {
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_API}/get_season`,
      data: { id: id },
    })
      .then((response) => {
        setSeason(response.data.result);
      })
      .catch(() => {
        toast.error('Something went wrong please try again later!');
      });
  }, []);
  React.useEffect(() => {
    try {
      getSeason();
    } catch (err) {}
  }, [getSeason]);
  return (
    <div className="md:px-16 lg:flex-row px-4 mb-10">
      <div className="">
        <div className="mt-5">
          <BackToHistory
            text="Back to Browse"
            redirectTab={AdminTabs.Seasons}
          />
          <p className=" font-spAdvSemiBold text-darkGunmetal-200 text-h2 font-semibold">
            Edit Season
          </p>
          {season ? (
            <AddSeason itemInfo={season} />
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

export default EditSeason;
