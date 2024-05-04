import React from "react";
import empty_logo from "../asserts/images/empty.jpg";

function Empty() {
  return (
    <div>
      <img className="w-[400px] " src={empty_logo} alt="logo" />
      <p className="text-[gray] text-center relative bottom-7 ">
        You Have No Transaction Currently
      </p>
    </div>
  );
}

export default Empty;
