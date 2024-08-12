import React from 'react';
import axios from 'axios';
import { Spinner } from 'flowbite-react';
import toast from 'react-hot-toast';
import SingleAdminRow from './singleAdminRow';
import { UserRole } from '../../../Enum/userRole';

function ManageAdmins() {
  const [admins, setAdmins]: any = React.useState();
  const [isApprovedChanged, setIsApprovedChanged]: any = React.useState(false);

  const getAdmins = React.useCallback(async () => {
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_API}/get_users_of_role`,
      data: { role_name: UserRole.superAdmin },
    })
      .then((response) => {
        setAdmins(response.data.result);
      })
      .catch(() => {
        toast.error('Something went wrong please try again later!');
      });
  }, []);

  React.useEffect(() => {
    try {
      setAdmins();
      getAdmins();
    } catch (err) {}
  }, [getAdmins, isApprovedChanged]);
  return (
    <div className=" overflow-x-auto">
      {admins ? (
        admins.length > 0 ? (
          <table className="w-full table-auto">
            <thead className=" bg-transparent">
              <tr className="px-4">
                <th className="whitespace-nowrap px-4 py-2">
                  <div className="font-spAdvSemiBold text-neutral-400 text-base font-semibold tracking-wide text-left">
                    Address
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {admins?.map((item: Object, index: Number) => (
                <SingleAdminRow
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

export default ManageAdmins;
