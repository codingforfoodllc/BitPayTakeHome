import React, { createContext, useState } from "react";
import { RowData } from "../domain/RowData";

const initialData: RowData[] = [
  {
    Id: 0,
    MerchantName: "ShirtTown",
    Item: "T-Shirts",
    CryptoAmount: "1.43219876",
    Currency: "BTC",
    PriceUSD: "$9,285.93",
    USDAmount: "$13,299.30",
    Selected: false,
  },
  {
    Id: 1,
    MerchantName: "CrazyCups",
    Item: "Cups",
    CryptoAmount: "2.76236751 ",
    Currency: "BCH",
    PriceUSD: "$6,483.69",
    USDAmount: "$17,910.33",
    Selected: false,
  },
  {
    Id: 2,
    MerchantName: "GimmeGold",
    Item: "Gold bullion",
    CryptoAmount: "10.78654328",
    Currency: "ETH",
    PriceUSD: "$442.08",
    USDAmount: "$4,768.52",
    Selected: false,
  },
];

interface AppContextProps {
  tableData: RowData[];
  setTableData: React.Dispatch<React.SetStateAction<RowData[]>>;
  setEditingRow: React.Dispatch<React.SetStateAction<RowData | null>>;
  //addToTable: (rowData: RowData) => void;
  //editTableValue: (rowData: RowData) => void;
  updateTableData: (rowData: RowData) => void;
  deleteTableValue: (rowData: RowData) => void;
  editRow: (rowData: RowData) => void;
  editingRow: RowData | null;
  //onEditTableRow: (rowData: RowData | null) => void;
}

//const AppContext = createContext<Partial<AppContextProps>>({});
const AppContext = createContext<AppContextProps | undefined>(undefined);

type AppProviderProps = {
  children: React.ReactNode;
};

const AppContextProvider = (props: AppProviderProps) => {
  const [tableData, setTableData] = useState<RowData[]>(initialData);

  const updateTableData = (rowData: RowData) => {
    const Ids: number[] = tableData.map((row: RowData) => {
      return row.Id;
    });

    if (Ids.includes(rowData.Id)) {
      updateTableValue(rowData);
    } else {
      addToTable(rowData);
    }
  };

  const addToTable = (rowData: RowData) => {
    setTableData((prev) => [...prev, rowData]);
  };

  const updateTableValue = (editRowData: RowData) => {
    const updatedValues = tableData.map((row: RowData) => {
      return row.Id === editRowData.Id ? editRowData : row;
    });

    setTableData(updatedValues);
  };

  const deleteTableValue = (editRowData: RowData) => {
    const updatedValues = tableData.filter((row: RowData) => {
      return row.Id !== editRowData.Id;
    });

    setTableData(updatedValues);
  };

  const [editingRow, setEditingRow] = useState<RowData | null>(null);

  const editRow = (editRowData: RowData) => {
    const updatedValues = tableData.map((row: RowData) => {
      return row.Id === editRowData.Id
        ? { ...editRowData, Selected: true }
        : { ...row, Selected: false };
    });

    setTableData(updatedValues);
    setEditingRow(editRowData);
  };

  return (
    <AppContext.Provider
      value={{
        tableData,
        setTableData,
        editRow,
        //addToTable,
        //editTableValue,
        updateTableData,
        deleteTableValue,
        setEditingRow,
        //onEditTableRow: onEditingRow,
        editingRow,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContextProvider, AppContext };
