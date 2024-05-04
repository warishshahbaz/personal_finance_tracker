import { Button, Input, Modal, Select } from "antd";
import React, { useState } from "react";

function ExpenseModal({ setState, open, setExpenseData }) {
  const [inputChange, setInputChange] = useState({
    name: "",
    value: "",
    date: "",
    tag: "",
    type: "expense",
  });

  const handleOk = () => {
    setExpenseData((pre) => [...pre, inputChange]);
    setInputChange({
      name: "",
      amount: "",
      date: "",
      tag: "",
      type: "income",
    });
    setState(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputChange({ ...inputChange, [name]: value });
  };
  const selectChange = (val) => {
    setInputChange({ ...inputChange, tag: val ?? "" });
  };
  return (
    <Modal
      title="Add Expense"
      open={open}
      footer={[]}
      onCancel={() => setState(false)}
    >
      <div>
        <p>Name</p>
        <Input
          name="name"
          placeholder="Name"
          value={inputChange.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <p>Amount</p>
        <Input
          placeholder="Amount"
          type="number"
          name="value"
          value={inputChange.value}
          onChange={handleChange}
        />
      </div>
      <div>
        <p>Date</p>
        <Input
          type="date"
          placeholder="Date"
          value={inputChange.date}
          name="date"
          onChange={handleChange}
        />
      </div>
      <div>
        <p>Tag</p>
        <Select
          defaultValue="salary"
          style={{
            width: "100%",
          }}
          name="select"
          onChange={selectChange}
        >
          <Select.Option value="salary">Salary</Select.Option>
          <Select.Option value="shopping">Shopping</Select.Option>
          <Select.Option value="study">Study</Select.Option>
          <Select.Option value="other">Other</Select.Option>
        </Select>

        <Button
          disabled={
            inputChange.name === "" ||
            inputChange.amount === "" ||
            inputChange.tag === "" ||
            inputChange.date === ""
          }
          className="mt-5 w-full border-blue-300  "
          onClick={handleOk}
        >
          ADD Expense
        </Button>
      </div>
    </Modal>
  );
}

export default ExpenseModal;
