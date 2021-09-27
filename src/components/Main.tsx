import styled from "styled-components";
import { FaPlusCircle } from "react-icons/fa";
import { useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Table from "./Table";
import AddEdit from "./AddEditDelete";
import CountDown from "./CountDownTimer";
import getExchangeRate from "../common/getExchangeRate";
import numberFormatToUSD from "../common/formatToUSCurrency";
import { RowData } from "../domain/RowData";
import Button from "./styled/Button";
import useAppContext from "../hooks/useAppContext";

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

  const { editingRow, tableData, setTableData, setEditingRow } =
    useAppContext();

  const onOpenAddEdit = () => {
    //get the highest id we currently have, and add one for the new row.
    const Ids: number[] = tableData
      .map((row: RowData) => {
        return row.Id;
      })
      .sort();
    const lastId = Ids[Ids.length - 1] + 1;

    setEditingRow({
      Id: lastId,
      CryptoAmount: "",
      Currency: "",
      Item: "",
      MerchantName: "",
      PriceUSD: "",
      USDAmount: "",
      Selected: false,
    });
  };

  const onCountDownCompleted = useCallback(async () => {
    const updateDatedData: RowData[] = [];
    if (tableData) {
      for (let index = 0; index < tableData.length; index++) {
        const rowData = tableData[index];
        const exchangeRateResult = await getExchangeRate(rowData.Currency);
        // console.log(
        //   `${rowData.Currency}:current:${rowData.PriceUSD} next:${exchangeRateResult.rate}`
        // );
        rowData.PriceUSD = numberFormatToUSD(exchangeRateResult.rate);
        updateDatedData.push(rowData);
      }

      setTableData(updateDatedData);
    }
  }, [tableData, setTableData]);

  return (
    <>
      <MainWrapper>
        <MainContent
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 200, opacity: 0 }}
          transition={{ duration: 0.5, type: "easeout" }}
        >
          <CountDownContainer>
            <CountDown
              startTime={120}
              countDownCompleted={onCountDownCompleted}
            ></CountDown>
          </CountDownContainer>
          <Header>Merchant Items</Header>

          <AddButtonContainer>
            {!editingRow && (
              <Button onClick={onOpenAddEdit}>
                Add
                <FaPlusCircle style={{ marginLeft: "0.5rem" }} />
              </Button>
            )}
          </AddButtonContainer>
          <Table headings={headings} data={tableData}></Table>
        </MainContent>

        <AnimatePresence>
          {editingRow && (
            <motion.main
              style={{ overflow: "hidden" }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "30%", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, type: "easeout" }}
            >
              <AddEdit></AddEdit>
            </motion.main>
          )}
        </AnimatePresence>
      </MainWrapper>
    </>
  );
};

const Header = styled(motion.div)`
  color: #6139f8;
  font-size: 1.5rem;
  line-height: 1.75rem;
  text-align: center;
  text-decoration: underline;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const CountDownContainer = styled.div`
  position: relative;
`;
const AddButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  position: relative;
  margin-bottom: 1rem;
`;

const MainContent = styled(motion.div)`
  position: relative;
  width: 70%;
  background-color: white;
  padding: 2rem;
  border-radius: 0.375rem;
  margin-left: 2rem;
  margin-right: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  width: 80%;
  position: relative;
`;

export default Main;
