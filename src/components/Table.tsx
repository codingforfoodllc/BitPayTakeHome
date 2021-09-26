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
    text-align: left;
  }

  td {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  col colgroup {
    width: 15%;
  }
  tbody tr {
    color: #6c6c6c;
    border-bottom: 1px solid #6c6c6c;
    :hover {
      /* background-color: #ffcfc7; */
      cursor: pointer;
    }
    td {
      text-align: left;
    }
  }
  thead > tr {
    border-bottom: 1px solid #6c6c6c;
    color: #6c6c6c;
  }
`;

const TableContent = styled.div`
  background: white;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
