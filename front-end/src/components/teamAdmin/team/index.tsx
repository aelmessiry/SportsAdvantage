import React from 'react';
import AddTeam from '../../singleTeam/addTeam';
function Team(props) {
  return (
    <div className="md:px-16 lg:flex-row px-4 mb-10">
      <div className="">
        <div className="">
          <p className=" font-spAdvSemiBold text-darkGunmetal-200 text-h2 mb-5 font-semibold">
            Team Info
          </p>
          <AddTeam itemInfo={props.team} />
        </div>
      </div>
    </div>
  );
}

export default Team;
