import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { RowData } from "../domain/RowData";

type TableRowProps = {
  row: RowData;
};

const TableRow = ({ row }: TableRowProps) => {
  const { onEditTableRow } = useContext(AppContext);

  if (!onEditTableRow) {
    return null;
  }

  return (
    <tr onClick={(e) => onEditTableRow(row)}>
      <td>{row.MerchantName}</td>
      <td>{row.Item}</td>
      <td>{row.CryptoAmount}</td>
      <td>{row.Currency}</td>
      <td>{row.PriceUSD}</td>
      <td>{row.USDAmount}</td>
    </tr>
  );
};

export default TableRow;
