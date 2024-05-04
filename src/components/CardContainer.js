import { Button, Card } from "antd";
import React from "react";

function CardContainer({ title, value, func, btn }) {
  return (
    <>
      <Card className="min-w-[350px] shadow-xl ">
        <h2 className="font-[500] text-xl ">{title}</h2>
        <p className="mb-3 px-0 text-[1rem] ">₹ {value}</p>
        <Button type="primary" onClick={func} className="w-full">
          {btn}
        </Button>
      </Card>
    </>
  );
}

export default CardContainer;
