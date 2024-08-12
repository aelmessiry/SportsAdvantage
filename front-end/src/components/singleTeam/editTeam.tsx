import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Spinner } from 'flowbite-react';
import AddTeam from './addTeam';
import { AdminTabs } from '../../Enum/adminTabs';
import BackToHistory from '../shared/BackToHistory';
function EditTeam() {
  const search = useLocation().search;
  const queryParams = new URLSearchParams(search);
  const id = queryParams.get('id');
  const [team, setTeam]: any = useState();
  const getTeam = React.useCallback(async () => {
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_API}/get_team`,
      data: { id: id },
    })
      .then((response) => {
        setTeam(response.data.result);
      })
      .catch(() => {
        toast.error('Something went wrong please try again later!');
      });
  }, []);
  React.useEffect(() => {
    try {
      getTeam();
    } catch (err) {}
  }, [getTeam]);
  return (
    <div className="md:px-16 lg:flex-row px-4 mb-10">
      <div className="">
        <div className="mt-5">
          <BackToHistory text="Back to Browse" redirectTab={AdminTabs.Teams} />
          <p className=" font-spAdvSemiBold text-darkGunmetal-200 text-h2 font-semibold">
            Edit Team
          </p>
          {team ? (
            <AddTeam itemInfo={team} isAdmin={true} />
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

export default EditTeam;
