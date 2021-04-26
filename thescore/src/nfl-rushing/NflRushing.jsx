import React, { useRef } from "react";
import { useMachine } from "@xstate/react";
import { nflRushingMachine } from "../machines/nflRushingMachine";
import NflTable from "./NflTable"

const NflRushing = () => {
  const [current, send] = useMachine(nflRushingMachine);
  let rushingData = current.context.rushingData;

  const downloadData = (rows) => {
    let data = rows.map((row) => row.original)
    send("DOWNLOAD_DATA", { data })
  }
 

  return (
    <div>
      {rushingData.length === 0 && <>Loading Data</>}
      {rushingData.length > 0 && (<NflTable rushingData={rushingData} onClick={downloadData}/>)}
    </div>
  );
};

export default NflRushing
