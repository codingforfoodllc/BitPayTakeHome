import styled from "styled-components";
import Table from "./Table";
import { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AddEdit from "./AddEditDelete";
import { AppContext } from "../context/AppContext";
import CountDown from "./CountDownTimer";
import getExchangeRate from "../common/getExchangeRate";
import numberFormatToUSD from "../common/formatToUSCurrency";
import { RowData } from "../domain/RowData";

// const BUTTON = styled.button`
//   border: 1px dotted yellow;
//   background: white;
//   color: black;
//   font-weight: 500;
// `;

const MainContent = styled.div`
  background: green;
  height: 100%;
`;

const TableContent = styled.div`
  background: blue;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
`;

type MainProps = {};

const Main = (props: MainProps) => {
  const headings = [
    "Merchant",
    "Item",
    "Amount (Crypto)",
    "Currency",
    "Price/crypto (USD)",
    "Amount (USD)",
  ];
  const initialData: RowData[] = [
    {
      Id: 0,
      MerchantName: "ShirtTown",
      Item: "T-Shirts",
      CryptoAmount: "1.43219876",
      Currency: "BTC",
      PriceUSD: "$9,285.93",
      USDAmount: "$13,299.30",
    },
    {
      Id: 1,
      MerchantName: "ShirtTown",
      Item: "Pants",
      CryptoAmount: "1.43219876",
      Currency: "BCH",
      PriceUSD: "$9,285.93",
      USDAmount: "$13,299.30",
    },
    {
      Id: 2,
      MerchantName: "ShirtTown",
      Item: "Shoes",
      CryptoAmount: "1.43219876",
      Currency: "ETH",
      PriceUSD: "$9,285.93",
      USDAmount: "$13,299.30",
    },
  ];

  const [openAddEdit, setOpenAddEdit] = useState<boolean>(false);

  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  const [tableData, setTableData] = useState<RowData[]>(initialData);

  const { editingRow } = useContext(AppContext);

  const onOpenAddEdit = () => {
    if (openAddEdit) {
      setOpenAddEdit(false);
    } else {
      setOpenAddEdit(true);
    }
  };

  const onOpenSideBar = () => {
    if (openSideBar) {
      setOpenSideBar(false);
    } else {
      setOpenSideBar(true);
    }
  };

  //Todo:Memo This
  const addToTable = (rowData: RowData) => {
    console.log("called add row data");
    setTableData((prev) => [...prev, rowData]);
  };

  //Todo:Memo This
  const editTableValue = (editRowData: RowData) => {
    const updatedValues = tableData.map((row: RowData) => {
      return row.Id === editRowData.Id ? editRowData : row;
    });

    setTableData(updatedValues);
  };

  //Todo:Memo This
  const deleteTableValue = (editRowData: RowData) => {
    const updatedValues = tableData.filter((row: RowData) => {
      return row.Id !== editRowData.Id;
    });
    console.log("delete" + JSON.stringify(updatedValues));
    setTableData(updatedValues);
  };

  //Todo:Memo This
  const onCountDownCompleted = async () => {
    const updateDatedData: RowData[] = [];

    for (let index = 0; index < tableData.length; index++) {
      const rowData = tableData[index];
      const exchangeRateResult = await getExchangeRate(rowData.Currency);
      console.log(
        `${rowData.Currency}:current:${rowData.PriceUSD} next:${exchangeRateResult.rate}`
      );
      rowData.PriceUSD = numberFormatToUSD(exchangeRateResult.rate);
      updateDatedData.push(rowData);
    }

    setTableData(updateDatedData);
  };

  return (
    <>
      <MainContent>
        <div>
          <button onClick={onOpenAddEdit}>add</button>
        </div>
        <div>
          <button onClick={onOpenSideBar}>sidebar</button>
        </div>
        <CountDown
          startTime={120}
          countDownCompleted={onCountDownCompleted}
        ></CountDown>
        {/* <AnimatePresence>
          {openAddEdit && (
            <motion.main
              style={{ overflow: "hidden" }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, type: "easeout" }}
            >
              <AddEdit addToTable={addToTable}></AddEdit>
            </motion.main>
          )}
        </AnimatePresence> */}

        <TableContent>
          <Table headings={headings} data={tableData}></Table>
          <AnimatePresence>
            {(editingRow || openSideBar) && (
              <motion.main
                style={{ overflow: "hidden" }}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "50%", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, type: "easeout" }}
              >
                <AddEdit
                  addToTable={addToTable}
                  editTableValue={editTableValue}
                  deleteTableValue={deleteTableValue}
                ></AddEdit>
              </motion.main>
            )}
          </AnimatePresence>
        </TableContent>
      </MainContent>
    </>
  );
};

export default Main;
