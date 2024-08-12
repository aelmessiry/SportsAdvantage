import React, { createContext, useState } from 'react';

interface IUserRoleInfo {
  pk: string | null;
  role: string | null;
  isDisabled: Boolean | false;
}

//interface of the context object
interface IUserRoleContextValue {
  userRoleInfo: IUserRoleInfo;
  setUserRoleData: (userRoleData) => void;
}

//inital values for the context object
const UserRoleContext = createContext<IUserRoleContextValue>({
  userRoleInfo: {
    pk: null,
    role: null,
    isDisabled: false,
  },
  setUserRoleData: () => {},
});

const UserRoleProvider = (props: any) => {
  const [userRoleInfo, setuserRoleInfo] = useState<IUserRoleInfo>({
    pk: null,
    role: null,
    isDisabled: false,
  });

  const setUserRoleData = async (userRoleData: any) => {
    try {
      setuserRoleInfo(userRoleData);
      return { userRoleData };
    } catch (e: any) {
      return { e };
    }
  };

  const contextValue: IUserRoleContextValue = {
    userRoleInfo,
    setUserRoleData,
  };

  return <UserRoleContext.Provider value={contextValue} {...props} />;
};

const useUserRole = () => React.useContext(UserRoleContext);

export { UserRoleProvider, useUserRole };
