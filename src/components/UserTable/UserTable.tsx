"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditUsersModal from "@/Modal/EditUserModal";
import DeleteUserModal from "@/Modal/DeleteUserModal";
import {
  toggleDeleteModal,
  toggleEditModal,
  toggleUserId,
  toggleUsers,
} from "@/store/common";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
import api from "@/api/api";

interface Column {
  id:
    | "number"
    | "image"
    | "name"
    | "phone"
    | "email"
    | "position"
    | "editIcon"
    | "deleteIcon";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "number", label: "#", minWidth: 50 },
  { id: "image", label: "Фото", minWidth: 100 },
  { id: "name", label: "Фамилия и имя", minWidth: 170 },
  { id: "phone", label: "Номер телефона", minWidth: 170 },
  { id: "email", label: "Электронная почта", minWidth: 170 },
  { id: "position", label: "Должность", minWidth: 170 },
  { id: "editIcon", label: "", minWidth: 10 },
  { id: "deleteIcon", label: "", minWidth: 10 },
];

interface Data {
  number: number;
  image: string;
  name: string;
  phone: string;
  email: string;
  position: string;
  editIcon: React.ReactNode;
  deleteIcon: React.ReactNode;
}

function createData(
  number: number,
  image: string,
  name: string,
  phone: string,
  email: string,
  position: string,
  editIcon: React.ReactNode,
  deleteIcon: React.ReactNode
): Data {
  return { number, image, name, phone, email, position, editIcon, deleteIcon };
}

const UserTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const openEditModal = useAppSelector((state) => state.common.editModalState);
  const users = useAppSelector((state) => state.common.users);
  const openDeleteModal = useAppSelector(
    (state) => state.common.deleteModalState
  );
  const handleDeleteModalOpen = (user: string) => {
    dispatch(toggleDeleteModal(true));
    dispatch(toggleUserId(user));
  };
  const handleEditModalOpen = (user: string) => {
    dispatch(toggleEditModal(true));
    dispatch(toggleUserId(user));
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [users, setUsers] = useState([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    api
      .get("users/")
      .then((response) => {
        dispatch(toggleUsers(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  const rows = Array.isArray(users)
    ? users.map((e, index) =>
        createData(
          index + 1,
          <Image src={e?.image} width={40} height={40} alt="Avatar" />,
          e?.full_name,
          e?.phone_number,
          e?.email,
          e?.status,
          <Box onClick={() => handleEditModalOpen(e)}>
            <EditIcon sx={{ zIndex: 2, cursor: "pointer" }} />
          </Box>,
          <Box onClick={() => handleDeleteModalOpen(e)}>
            <DeleteIcon sx={{ zIndex: 2, cursor: "pointer" }} />
          </Box>
        )
      )
    : [];

  return (
    <>
      {openEditModal && <EditUsersModal />}
      {openDeleteModal && <DeleteUserModal />}
      <Paper
        sx={{
          width: "100%",
        }}
      >
        <TableContainer>
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
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.number}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
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
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default UserTable;
