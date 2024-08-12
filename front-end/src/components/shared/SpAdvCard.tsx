import React from 'react';
function SpAdvCard(props: any) {
  return (
    <div
      className={`${
        props.className ? props.className : ''
      } shadow-outline-main-card rounded-2xl border-antiFlashWhite-100 flex-1 h-full border-solid`}
    >
      {props.title && (
        <div className="sp-adv-panel-header text-darkGunmetal-300 font-spAdvSemiBold border-b-antiFlashWhite-300 px-5 py-4 text-2xl font-semibold leading-9 border-b-2">
          {props.title}
        </div>
      )}
      <div className="p-5">{props.children}</div>
    </div>
  );
}

export default SpAdvCard;
