import React from 'react';
import AddTeam from '../components/singleTeam/addTeam';
import { useAuth } from '../Horus-social-login/web3/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useUserRole } from '../contexts/LoggedUserRoleContext';
import { UserRole } from '../Enum/userRole';

function RegisterAsTeam() {
  const { userRoleInfo } = useUserRole();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  React.useEffect(() => {
    try {
      userRoleInfo?.role === UserRole.teamAdmin &&
        isLoggedIn &&
        navigate('/team-admin');
    } catch (err) {}
  }, [isLoggedIn, userRoleInfo]);
  return (
    <>
      <div className="sp-adv-inner-page ">
        <AddTeam isAdmin={false} />
      </div>
    </>
  );
}

export default RegisterAsTeam;
