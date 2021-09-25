import React, { createContext, useState } from "react";
import { RowData } from "../domain/RowData";

interface AppContextProps {
  editingRow: RowData | null;
  onEditTableRow: (rowData: RowData | null) => void;
}

const AppContext = createContext<Partial<AppContextProps>>({});

type AppProviderProps = {
  children: React.ReactNode;
};

const AppContextProvider = (props: AppProviderProps) => {
  const [editingRow, setEditingRow] = useState<RowData | null>(null);

  const onEditingRow = (row: RowData | null) => {
    setEditingRow(row);
  };

  return (
    <AppContext.Provider
      value={{
        onEditTableRow: onEditingRow,
        editingRow,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContextProvider, AppContext };
