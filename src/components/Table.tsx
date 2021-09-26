import styled from "styled-components";
import { RowData } from "../domain/RowData";
import TableRow from "./TableRow";

type TableProps = {
  headings: string[];
  data: RowData[];
};

const Table = ({ headings, data }: TableProps) => {
  return (
    <TableContent>
      <StyledTable>
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            {headings && headings.map((head) => <th key={head}>{head}</th>)}
          </tr>
        </thead>
        <tbody>
          {data && data.map((row, index) => <TableRow key={index} row={row} />)}
        </tbody>
      </StyledTable>
    </TableContent>
  );
};

export default Table;

const StyledTable = styled.table`
  width: 100%;
  caption-side: top;
  border: none;
  border-collapse: collapse;
  caption-side: bottom;

  td,
  th {
    border: none;
    /* margin-left: 3rem;
    margin-right: 3rem; */
    text-align: left;
  }
  /* td,
  th {
    border: 1px solid;
  } */

  td {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  col colgroup {
    width: 15%;
  }
  tbody tr {
    /* :nth-of-type(odd) {
      background-color: #efefef;
    } */
    color: #6c6c6c;
    border-bottom: 1px solid #6c6c6c;
    :hover {
      background-color: lightpink;
      cursor: pointer;
    }
    td {
      text-align: left;
    }
  }
  thead > tr {
    /* background-color: #c2c2c2; */
    border-bottom: 1px solid #6c6c6c;
    color: #6c6c6c;
  }
`;

const TableContent = styled.div`
  background: white;
  width: 70%;
  display: flex;
  /* margin-left: 2.5rem;
  margin-right: 2.5rem; */
  padding: 2rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;
