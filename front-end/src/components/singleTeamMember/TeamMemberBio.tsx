import React from 'react';
function TeamMemberBio(props) {
  return (
    <>
      <div className=" border-l-lava-100 text-darkGunmetal-200 font-spAdvSemiBold flex justify-between pl-3 text-sm font-semibold leading-5 tracking-wider border-l-4">
        <span>About</span>{' '}
        {/* <FontAwesomeIcon
          icon={faPen}
          className=" cursor-pointer"
          onClick={() => {
            setEditBio(!editBio);
          }}
        /> */}
      </div>

      <div className="text-darkGunmetal-200 font-spAdvRegular my-5 text-base font-normal leading-6">
        <div className="mb-3">
          <div className=" text-lava-100">Bio: </div>{' '}
          <div className="ql-snow">
            <div
              dangerouslySetInnerHTML={{
                __html: props.bio.replace(
                  /href="(?![a-z]+:\/\/)/g,
                  'href="http://'
                ),
              }}
              className="text-darkGunmetal-200 font-spAdvRegular ql-editor my-5 text-base font-normal leading-6"
            ></div>
          </div>
        </div>
        <div className="mb-3">
          <div className=" text-lava-100">Why the passion for racing: </div>
          {props.passion}
        </div>
        <div className="mb-3">
          <div className=" text-lava-100">Vision for the future: </div>
          {props.vision}
        </div>
        <div>
          <div className=" text-lava-100">Other Interests: </div>
          {props.interests}
        </div>
      </div>
    </>
  );
}

export default TeamMemberBio;
