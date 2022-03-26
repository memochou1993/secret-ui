import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, value) {
  return {
    name,
    value,
  };
}

const rows = [
  createData('A', 1),
  createData('B', 2),
  createData('C', 3),
];

export default function MainTable() {
  return (
    <TableContainer
      component={Paper}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell
              align="right"
            >
              Password
            </TableCell>
            <TableCell
              align="right"
            >
              &nbsp;
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
            >
              <TableCell
                component="th"
                scope="row"
              >
                {row.name}
              </TableCell>
              <TableCell
                align="right"
              >
                {row.password}
              </TableCell>
              <TableCell
                align="right"
              >
                &nbsp;
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
