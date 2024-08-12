import React, { useState } from 'react';
import BackToHistory from '../../shared/BackToHistory';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Spinner } from 'flowbite-react';
import AddEvent from './addEvent';
import { AdminTabs } from '../../../Enum/adminTabs';
function EditEvent() {
  const search = useLocation().search;
  const queryParams = new URLSearchParams(search);
  const id = queryParams.get('id');
  const [event, setEvent]: any = useState();
  const getEvent = React.useCallback(async () => {
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_API}/get_event`,
      data: { id: id },
    })
      .then((response) => {
        setEvent(response.data.result);
      })
      .catch(() => {
        toast.error('Something went wrong please try again later!');
      });
  }, []);
  React.useEffect(() => {
    try {
      getEvent();
    } catch (err) {}
  }, [getEvent]);
  return (
    <div className="md:px-16 lg:flex-row px-4 mb-10">
      <div className="">
        <div className="mt-5">
          <BackToHistory text="Back to Browse" redirectTab={AdminTabs.Events} />
          <p className=" font-spAdvSemiBold text-darkGunmetal-200 text-h2 font-semibold">
            Edit Event
          </p>
          {event ? (
            <AddEvent itemInfo={event} />
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

export default EditEvent;
