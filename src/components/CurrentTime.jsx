import React from "react";
import { useEffect, useState } from "react";

function DateTime() {
  var [date, setDate] = useState(new Date());
  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <div className="px-3 py-2 m-1 rounded-lg bg-black text-white font-bold">
      <div className="flex">
        <p className="text-green-100 w-24">DateTime:</p>{" "}
        {date.toLocaleTimeString()}
      </div>
      <div className="flex">
        <p className="text-green-100 w-24">Date:</p> {date.toLocaleDateString()}
      </div>
    </div>
  );
}

export default DateTime;
