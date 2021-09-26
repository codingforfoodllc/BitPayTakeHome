import styled from "styled-components";
import { RowData } from "../domain/RowData";
import useAppContext from "../hooks/useAppContext";

type TableRowProps = {
  row: RowData;
};

const TableRow = ({ row }: TableRowProps) => {
  const { editRow } = useAppContext();

  return (
    <tr onClick={(e) => editRow(row)}>
      <TD selected={row.Selected}>{row.MerchantName}</TD>
      <TD selected={row.Selected}>{row.Item}</TD>
      <TD selected={row.Selected}>{row.CryptoAmount}</TD>
      <TD selected={row.Selected}>{row.Currency}</TD>
      <TD selected={row.Selected}>{row.PriceUSD}</TD>
      <TD selected={row.Selected}>{row.USDAmount}</TD>
    </tr>
  );
};

interface TRProps {
  selected?: boolean;
}

const TD = styled.td<TRProps>`
  color: ${(props) => (props.selected ? "black" : "gray")};
  font-weight: ${(props) => (props.selected ? "700" : "normal")};
`;

export default TableRow;
