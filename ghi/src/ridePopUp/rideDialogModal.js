import React from "react";

function RideDialogModal(props) {
  return (props.trigger) ? (
    <div className="flex items-center justify-center">
      <div className="bg-pine-glade shadow-md rounded px-20 pt-6 pb-8 m-4 space-y-12">

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Enjoy Your Trip!</h2>
          <p className="mt-3 text-m leading-8 text-gray-600">Your new hike is all set!  While you're here, would you like to volunteer to drive other hikers?</p>
          <button onClick={() => props.setTrigger(false)}>Close</button>
          {props.children}
          <p>{props.hikeId}</p>
          <p>{props.hikeDate}</p>
        </div>
      </div>
    </div>
  ) : "";
};

export default RideDialogModal;
