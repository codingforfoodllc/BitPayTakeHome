import React, { createContext, useState } from "react";
import { initialData } from "../data/InitialData";
import { RowData } from "../domain/RowData";

interface AppContextProps {
  tableData: RowData[];
  setTableData: React.Dispatch<React.SetStateAction<RowData[]>>;
  setEditingRow: React.Dispatch<React.SetStateAction<RowData | null>>;
  editingRow: RowData | null;
  updateTableData: (rowData: RowData) => void;
  deleteTableValue: (rowData: RowData) => void;
  editRow: (rowData: RowData) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

type AppProviderProps = {
  children: React.ReactNode;
};

const AppContextProvider = (props: AppProviderProps) => {
  const [tableData, setTableData] = useState<RowData[]>(initialData);
  const [editingRow, setEditingRow] = useState<RowData | null>(null);

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
    setEditingRow(null);
  };

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
        updateTableData,
        deleteTableValue,
        setEditingRow,
        editingRow,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContextProvider, AppContext };
