"use client";

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React, { useState } from "react";
import AddUsersModal from "@/Modal/AddUserModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleModal } from "@/store/common";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.common.modalState);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const handleOpen = () => {
    dispatch(toggleModal(true));
  };
  return (
    <>
      {open && <AddUsersModal />}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 10px",
          borderBottom: "3px solid black",
          boxShadow: "0px 1px 10px 1px",
          marginBottom: "20px",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Глобальный поиск"
          size="small"
          variant="outlined"
        />
        <FormControl sx={{ minWidth: "120px" }} size="small">
          <InputLabel id="demo-select-small-label">Смена</InputLabel>
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
          <span style={{ fontWeight: 700 }}>по полу:</span>
          <Checkbox
            {...label}
            sx={{ color: "#F5F5F5" }}
            className="radio_button"
            id="maleCheckbox"
            value="true"
          />
          <span style={{ fontWeight: 700 }}>М</span>
          <Checkbox
            {...label}
            sx={{ color: "#F5F5F5" }}
            className="radio_button"
            id="femaleCheckbox"
            value="false"
          />
          <span style={{ fontWeight: 700 }}>Ж</span>
        </Box>
        <Button variant="contained" color="success" onClick={handleOpen}>
          <span style={{ marginRight: "5px" }}>Добавить</span>
          <AddCircleIcon />
        </Button>
      </Box>
    </>
  );
};

export default Header;
