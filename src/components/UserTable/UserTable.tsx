import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "@/store/common";
import { RootState } from "@reduxjs/toolkit/query";

interface Column {
  id: 'number' | 'image' | 'name' | 'phone' | 'gmail' | 'position' | 'editIcon' | 'deleteIcon';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'number', label: '#', minWidth: 50 },
  { id: 'image', label: 'Фото', minWidth: 100 },
  { id: 'name', label: 'Фамилия и имя', minWidth: 170 },
  { id: 'phone', label: 'Номер телефона', minWidth: 170 },
  { id: 'gmail', label: 'Электронная почта', minWidth: 170 },
  { id: 'position', label: 'Должность', minWidth: 170 },
  { id: 'editIcon', label: '', minWidth: 10 },
  { id: 'deleteIcon', label: '', minWidth: 10 },
];

interface Data {
  number: number;
  image: string;
  name: string;
  phone: string;
  gmail: string;
  position: string;
  editIcon: string,
  deleteIcon: string
}

function createData(
  number: number,
  image: string,
  name: string,
  phone: string,
  gmail: string,
  position: string,
  editIcon: string,
  deleteIcon: string
): Data {
  return { number, image, name, phone, gmail, position, editIcon, deleteIcon };
}

const rows = [
  createData(
    1,
    'image',
    'Shohruh Azimov',
    '+998942720705',
    'shohruhazimob0705@gmail.com',
    'web developer',
    <EditIcon sx={{ zIndex: 2, cursor: 'pointer' }} />,
    <DeleteIcon sx={{ zIndex: 2, cursor: 'pointer' }} />),
    createData(
      1,
      'image',
      'Shohruh Azimov',
      '+998942720705',
      'shohruhazimob0705@gmail.com',
      'web developer',
      <EditIcon sx={{ zIndex: 2, cursor: 'pointer' }} />,
      <DeleteIcon sx={{ zIndex: 2, cursor: 'pointer' }} />),
      createData(
        1,
        'image',
        'Shohruh Azimov',
        '+998942720705',
        'shohruhazimob0705@gmail.com',
        'web developer',
        <EditIcon sx={{ zIndex: 2, cursor: 'pointer' }} />,
        <DeleteIcon sx={{ zIndex: 2, cursor: 'pointer' }} />),
        createData(
          1,
          'image',
          'Shohruh Azimov',
          '+998942720705',
          'shohruhazimob0705@gmail.com',
          'web developer',
          <EditIcon sx={{ zIndex: 2, cursor: 'pointer' }} />,
          <DeleteIcon sx={{ zIndex: 2, cursor: 'pointer' }} />),
          createData(
            1,
            'image',
            'Shohruh Azimov',
            '+998942720705',
            'shohruhazimob0705@gmail.com',
            'web developer',
            <EditIcon sx={{ zIndex: 2, cursor: 'pointer' }} />,
            <DeleteIcon sx={{ zIndex: 2, cursor: 'pointer' }} />),
            createData(
              1,
              'image',
              'Shohruh Azimov',
              '+998942720705',
              'shohruhazimob0705@gmail.com',
              'web developer',
              <EditIcon sx={{ zIndex: 2, cursor: 'pointer' }} />,
              <DeleteIcon sx={{ zIndex: 2, cursor: 'pointer' }} />),
              createData(
                1,
                'image',
                'Shohruh Azimov',
                '+998942720705',
                'shohruhazimob0705@gmail.com',
                'web developer',
                <EditIcon sx={{ zIndex: 2, cursor: 'pointer' }} />,
                <DeleteIcon sx={{ zIndex: 2, cursor: 'pointer' }} />),
                createData(
                  1,
                  'image',
                  'Shohruh Azimov',
                  '+998942720705',
                  'shohruhazimob0705@gmail.com',
                  'web developer',
                  <EditIcon sx={{ zIndex: 2, cursor: 'pointer' }} />,
                  <DeleteIcon sx={{ zIndex: 2, cursor: 'pointer' }} />),
];

const UserTable: React.FC = () => {

    return(
        <Paper sx={{ width: '100%', overflow: 'hidden', maxHeight: '100vh', height: '100vh' }}>
        <TableContainer  sx={{ maxHeight: 'calc(100vh - 180px)', height: 'calc(100vh - 180px)' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          // rowsPerPage={rowsPerPage}
          // page={page}
          // onPageChange={handleChangePage}
          // onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    )
}

export default UserTable;