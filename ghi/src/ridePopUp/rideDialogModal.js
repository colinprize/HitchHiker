import React from "react";
import { useNavigate } from "react-router-dom";


function RideDialogModal(props) {

  console.log(`hikeId: ${props.hikeData.hike_id}`);
  console.log(`hikeTrailName: ${props.hikeData.trail_name}`);
  console.log(`hikeDate: ${props.hikeData.date_time}`);
  const navigate = useNavigate();

  const onYesClick = () => {
    props.setTrigger(false);
    navigate("/create_ride", {
      state: {
        hikeData: props.hikeData,
      },
    });
    props.resetHikeData("");
    console.log(`hikeData: ${JSON.stringify(props.hikeData)}`);
  }

  const onNoClick = () => {
    props.setTrigger(false);
    navigate("/");
    props.resetHikeData("");
    console.log(`hikeData: ${JSON.stringify(props.hikeData)}`);
  }
  return (props.trigger) ? (
    <div className="flex items-center justify-center">
      <div className="bg-pine-glade shadow-md rounded px-20 pt-6 pb-8 m-4 space-y-12">

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Enjoy Your Trip!</h2>
          <p className="mt-3 text-xl leading-10 text-gray-900">Your new hike is all set!  While you're here, would you like to volunteer to drive other hikers?</p>
          <div className="mt-6 flex items-center justify-center gap-x-20">
            <button onClick={onYesClick} className="rounded-md bg-emerald-600 px-4 py-3 text-xl font-semibold text-white shadow-md hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">Sure thing!</button>
            <button onClick={onNoClick} className="rounded-md bg-gray-600 px-4 py-3 text-xl font-semibold text-white shadow-md hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">No thanks</button>
          </div>
        </div>
      </div>
    </div>
  ) : "";
};

export default RideDialogModal;
