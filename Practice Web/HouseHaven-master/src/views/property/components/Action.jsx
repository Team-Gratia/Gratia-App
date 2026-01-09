import Button from "../../../components/Button";
import React from "react";

const Action = () => {
  return (
    <div className="flex">
      <div>
        <Button
          sec
          text="Add Units"
          containerStyles={{
            background: "#15B097",
            color: "#FFF",
          }}
        />
      </div>
      <div>
        <Button
          sec
          text="Edit Details"
          containerStyles={{
            background: "#F3F4F6",
            color: " rgb(55 65 81 )",
          }}
        />
      </div>
      <div>
        <Button
          sec
          text="Remove"
          containerStyles={{
            background: "#F45B69 ",
            color: "#fff",
          }}
        />
      </div>
    </div>
  );
};

export default Action;
