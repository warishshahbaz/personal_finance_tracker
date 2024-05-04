import React, { useEffect, useMemo, useState } from "react";
import CardContainer from "../components/CardContainer";
import { LineChart } from "../components/lineChart";
import { Button, Card, Input, Table } from "antd";
import { DoughtnutChart } from "../components/Doughnut";
import IncomeModal from "../components/IncomeMaodal";
import ExpenseModal from "../components/ExpenseModal";
import { SearchOutlined } from "@ant-design/icons";
import Empty from "../components/Empty";

const columns = [
  {
    title: "Serial No",
    dataIndex: "serial_no",
    key: "serial_no",
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    title: "Income",
    dataIndex: "income",
    key: "income",
  },
  {
    title: "Expense",
    dataIndex: "expense",
    key: "expense",
  },
  {
    title: "Tags",
    dataIndex: "tag",
    key: "tag",
  },
];

function Dashboard() {
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const [AllData, setAllData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);

  const Total_value = AllData?.reduce((acc, val) => {
    if (val.type === "income") {
      acc = acc + Number(val.value);
    }
    return acc;
  }, 0);
  const Expense_value = AllData?.reduce((acc, val) => {
    if (val.type === `expense`) {
      acc = acc + Number(val.value);
    }
    return acc;
  }, 0);
  const current_value = Total_value - Expense_value;

  const addIncomeHandler = () => {
    setIsExpenseModalVisible(false);
    setIsIncomeModalVisible(true);
  };

  const addExpenseHandler = () => {
    setIsExpenseModalVisible(false);

    setIsExpenseModalVisible(true);
  };

  // reset Handler
  const resetHandler = () => {
    setAllData([]);
    setIncomeData([]);
    setExpenseData([]);
  };

  // filter the table details
  const filterChange = (e) => {
    let value = e.target.value;
    if (value !== "") {
      let res = updatedData.filter((val) =>
        val?.tag?.toLowerCase().includes(value?.toLowerCase())
      );
      setUpdatedData(res ?? []);
    } else {
      let res = AllData?.map((item, i) => {
        return {
          serial_no: i + 1,
          created_at: new Date(item.date ?? "").toLocaleString("en-GB", {
            timeZone: "UTC",
          }),
          income: item.type === "income" ? item?.value : 0,
          expense: item.type === "expense" ? item.value : 0,
          tag: item.tag,
        };
      });
      setUpdatedData(res ?? []);
    }
  };

  // sort bt max income
  const sortByMaxIncome = () => {
    let res = updatedData.sort((a, b) => b.income - a.income);

    setUpdatedData(res ?? []);
  };

  // sort by max expense
  const sortByMaxExpense = () => {
    let res = updatedData.sort((a, b) => b.expense - a.expense);
    setUpdatedData(res);
  };

  useEffect(() => {
    if (incomeData.length > 0 || expenseData.length > 0) {
      setAllData([...incomeData, ...expenseData]);
    }
  }, [expenseData, incomeData]);

  useEffect(() => {
    let res = AllData?.map((item, i) => {
      return {
        serial_no: i + 1,
        created_at: new Date(item.date ?? "").toLocaleString("en-GB", {
          timeZone: "UTC",
        }),
        income: item.type === "income" ? item?.value : 0,
        expense: item.type === "expense" ? item.value : 0,
        tag: item.tag,
        type: item.type ?? "",
      };
    });
    setUpdatedData(res ?? []);
  }, [AllData]);

  return (
    <>
      <div className="w-full flex justify-center flex-col items-center ">
        <div className="flex justify-between items-center w-[97%] mt-5 ">
          <CardContainer
            title="Current Balance"
            btn="Reset Balance"
            value={current_value ?? 0}
            func={resetHandler}
          />
          <CardContainer
            title="Total Balance"
            btn="Add Balance"
            value={Total_value ?? 0}
            func={addIncomeHandler}
          />

          <CardContainer
            title="Total Expense"
            btn="Add Expense"
            value={Expense_value ?? 0}
            func={addExpenseHandler}
          />
        </div>
        {AllData.length > 0 ? (
          <>
            <div className="w-[96%] h-[55vh] flex justify-center  gap-4 ">
              <Card className="w-[75%]  shadow-xl h-full ">
                <p className="font-[500] text-xl ">Financial Statistics</p>
                <div className="h-[290px] flex justify-center ">
                  <LineChart
                    incomeData={incomeData ?? []}
                    expenseData={expenseData ?? []}
                  />
                </div>
              </Card>
              <Card className="w-[25%] shadow-xl ">
                <p className="font-[500] text-xl ">All Expenses</p>
                <DoughtnutChart
                  Total_value={Total_value}
                  current_value={current_value}
                  Expense_value={Expense_value}
                />
              </Card>
            </div>
            <div className="w-[96%]  flex  items-center  gap-x-4 mt-5  shadow-xl ">
              <Input
                placeholder="Search here..."
                onChange={filterChange}
                prefix={
                  <SearchOutlined
                    style={{
                      color: "rgba(0,0,0,.25)",
                    }}
                  />
                }
              />
              <div className=" gap-x-4 flex ">
                <Button onClick={sortByMaxIncome}>Sort By max income </Button>
                <Button onClick={sortByMaxExpense}>Sort By max expense </Button>
              </div>
            </div>
            <Card className="w-[96%] mt-3 ">
              <Table columns={columns} dataSource={updatedData ?? []} />
            </Card>{" "}
          </>
        ) : (
          <Empty />
        )}
      </div>

      {isIncomeModalVisible && (
        <IncomeModal
          open={isIncomeModalVisible}
          setIncomeData={setIncomeData}
          setState={setIsIncomeModalVisible}
        />
      )}

      {isExpenseModalVisible && (
        <ExpenseModal
          open={isExpenseModalVisible}
          setExpenseData={setExpenseData}
          setState={setIsExpenseModalVisible}
        />
      )}
    </>
  );
}

export default Dashboard;
