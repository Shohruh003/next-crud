import { Box, Button, Checkbox, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styles from './styles'
import React, { useState } from 'react';

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

function Header() {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    // const [page, setPage] = useState(0);
    // const [rowsPerPage, setRowsPerPage] = useState(10);
  
    // const handleChangePage = (event: unknown, newPage: number) => {
    //   setPage(newPage);
    // };
  
    // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   setRowsPerPage(+event.target.value);
    //   setPage(0);
    // };
  
    return (
      <Box>
              <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 10px', borderBottom: '3px solid black', boxShadow: '0px 1px 10px 1px', marginBottom: '20px'}}>
          <TextField
            id="outlined-basic"
            label='Глобальный поиск'
            size="small"
            variant="outlined"
          />

        <FormControl sx={{minWidth: '120px'}} size='small'>
          <InputLabel id="demo-select-small-label">
          Смена
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            autoWidth
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
        </FormControl>

  
        <Box>
          <span style={{fontWeight: 700}}>
          по полу:
          </span>
          <Checkbox
            {...label}
            sx={{color: "#F5F5F5"}}
            className="radio_button"
            id="maleCheckbox"
            type="checkbox"
            value="true"
          />
          <span style={{fontWeight: 700}}>
          М
          </span>
          <Checkbox
            {...label}
            sx={{color: "#F5F5F5"}}
            className="radio_button"
            id="femaleCheckbox"
            type="checkbox"
            value="false"
          />
          <span style={{fontWeight: 700}}>
          Ж
          </span>
        </Box>

        <Button variant="contained" color="success">
          <span style={{marginRight: '5px'}}>
          Добавить
          </span>
          <AddCircleIcon/>
        </Button>
        
      </Box>
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
      </Box>
    );
}
  
export default Header;
