import React, { useState, useEffect } from "react";
import { Table, Select } from "antd";
import search from "../assets/search.png";
import { parse } from "papaparse";
import { toast } from "react-toastify";
import "./Main.css";

const { Option } = Select;

const TransactionSearch = ({
  transactions,
  exportToCsv,
  addTransaction,
  fetchTransactions,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");

  useEffect(() => {
    console.log("Component rendered");
  }, []);

  function importFromCsv(event) {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          for (const transaction of results.data) {
            const newTransaction = {
              ...transaction,
              amount: parseInt(transaction.amount),
            };
            await addTransaction(newTransaction, true);
          }
        },
      });
      toast.success("All Transactions Added");
      fetchTransactions();
      event.target.files = null;
    } catch (e) {
      toast.error(e.message);
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 400,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 350,
      className: "capitalize",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 350,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 350,
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
      width: 300,
      className: "capitalize",
    },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const searchMatch = searchTerm
      ? transaction.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const typeMatch = typeFilter ? transaction.type === typeFilter : true;
    return searchMatch && typeMatch;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    }
    return 0;
  });

  const dataSource = sortedTransactions.map((transaction, index) => ({
    key: index,
    ...transaction,
  }));

  const handleSortChange = (e) => {
    console.log("Sort key changed to:", e.target.value);
    setSortKey(e.target.value);
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "0rem 2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div className="input-flex">
          <img src={search} width="16" alt="xyz"/>
          <input
            placeholder="Search by Name"
            onChange={(e) => {
              console.log("Search term changed to:", e.target.value);
              setSearchTerm(e.target.value);
            }}
          />
        </div>
        <Select
          className="select-input"
          onChange={(value) => {
            console.log("Type filter changed to:", value);
            setTypeFilter(value);
          }}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>

      <div className="my-table">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "1rem",
          }}
        >
          <h2>My Transactions</h2>

          <div className="sort-buttons">
            <button onClick={() => handleSortChange({ target: { value: "" } })}>
              No Sort
            </button>
            <button onClick={() => handleSortChange({ target: { value: "date" } })}>
              Sort by Date
            </button>
            <button onClick={() => handleSortChange({ target: { value: "amount" } })}>
              Sort by Amount
            </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              width: "400px",
            }}
          >
            <button className="btn btn-blue" onClick={exportToCsv}>
              Export to CSV
            </button>
            <label htmlFor="file-csv" className="btn btn-blue">
              Import from CSV
            </label>
            <input
              onChange={importFromCsv}
              id="file-csv"
              type="file"
              accept=".csv"
              required
              style={{ display: "none" }}
            />
          </div>
        </div>

        <Table columns={columns} dataSource={dataSource} />
      </div>
    </div>
  );
};

export default TransactionSearch;