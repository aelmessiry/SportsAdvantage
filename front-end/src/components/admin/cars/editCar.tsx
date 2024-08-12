import React, { useState } from 'react';
import AddCar from './addCar';
import BackToHistory from '../../shared/BackToHistory';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Spinner } from 'flowbite-react';
import { TeamAdminTabs } from '../../../Enum/teamAdminTabs';
function EditCar() {
  const search = useLocation().search;
  const queryParams = new URLSearchParams(search);
  const id = queryParams.get('id');
  const from = queryParams.get('from');
  const [car, setCar]: any = useState();
  const getCar = React.useCallback(async () => {
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_API}/get_car`,
      data: { id: id },
    })
      .then((response) => {
        setCar(response.data.result);
      })
      .catch(() => {
        toast.error('Something went wrong please try again later!');
      });
  }, []);
  React.useEffect(() => {
    try {
      getCar();
    } catch (err) {}
  }, [getCar]);
  return (
    <div className="md:px-16 lg:flex-row min-h-screen px-4 mb-10">
      <div className="">
        <div className="mt-5">
          <BackToHistory
            text="Back to Browse"
            fromScreen={from}
            redirectTab={from === 'teamAdmin' ? TeamAdminTabs.Cars : undefined}
          />
          <p className=" font-spAdvSemiBold text-darkGunmetal-200 text-h2 font-semibold">
            Edit Car
          </p>
          {car ? (
            <AddCar teamId={car?.team_id} itemInfo={car} isAdmin={true} />
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

export default EditCar;
