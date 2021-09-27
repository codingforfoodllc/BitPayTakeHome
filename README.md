# Getting Started

1.  Run yarn command
2.  Run yarn start
3.  Click the Add button to add an entry.
4.  Click on a row to Edit\Delete an entry.

I used Styled Components for styling, which has many of the advantages of SCSS syntax. For example:

```

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

```
