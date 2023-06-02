import { useState, useEffect } from "react";
import RideDialogModal from "./rideDialogModal";

function RidePopupStart() {
  const [buttonPopUp, setButtonPopUp] = useState(false);
  const [timedPopUp, setTimedPopUp] = useState(false);


  useEffect(() => {
    setTimeout(() => {
      setTimedPopUp(true);
    }, 3000);
  }, []);

  return (
    <div>
      <main>
        <h1>Popup button is below</h1>
        <br></br>
        <button onClick={() => setButtonPopUp(true)}>Open PopUp</button>
      </main>

      <RideDialogModal trigger={buttonPopUp} setTrigger={setButtonPopUp}>
        <h3>My Button PopUp</h3>
        <p>This is my button triggered popup</p>
      </RideDialogModal>

      <RideDialogModal trigger={timedPopUp} setTrigger={setTimedPopUp}>
        <h3>My Timed PopUp</h3>
        <p>This is my timed triggered popup</p>
      </RideDialogModal>
    </div>
  );
}

export default RidePopupStart;
