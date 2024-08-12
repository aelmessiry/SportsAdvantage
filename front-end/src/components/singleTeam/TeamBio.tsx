import React from 'react';
function TeamBio(props) {
  return (
    <>
      <div className=" border-l-lava-100 text-darkGunmetal-200 font-spAdvSemiBold flex justify-between pl-3 text-sm font-semibold leading-5 tracking-wider border-l-4">
        <span>BIO</span>{' '}
        {/* <FontAwesomeIcon
          icon={faPen}
          className=" cursor-pointer"
          onClick={() => {
            setEditBio(!editBio);
          }}
        /> */}
      </div>
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
    </>
  );
}

export default TeamBio;
