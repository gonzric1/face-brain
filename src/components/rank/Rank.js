import React from "react";

function Rank({ userName, entries }) {
  return (
    <div className="white f3">
      <div>
        {userName}, you have {entries} entries..
      </div>
      {/*<div className="white f1">#5</div>*/}
    </div>
  );
}

export default Rank;
