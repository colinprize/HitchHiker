import React from "react";

function RideDialogModal(props) {
  return (props.trigger) ? (
    <div>
      <div>
        <button onClick={() => props.setTrigger(false)}>Close</button>
        {props.children}
      </div>
    </div>
  ) : "";
};

export default RideDialogModal;
