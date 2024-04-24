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
import { toggleModal, toggleUsers } from "@/store/common";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.common.modalState);
  const users = useAppSelector((state) => state.common.users);
  const [maleChecked, setMaleChecked] = useState(false);
  const [femaleChecked, setFemaleChecked] = useState(false);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const handleOpen = () => {
    dispatch(toggleModal(true));
  };

  const handleSearchChange = (inputValue: string) => {
    if (!inputValue) {
      dispatch(toggleUsers(users));
      return;
    }
    const filteredData = users?.filter((user: UserData) =>
      user.full_name.toLowerCase().includes(inputValue.toLowerCase())
    );

    console.log(filteredData);

    dispatch(toggleUsers(filteredData));
  };

  const handleGenderChange = () => {
    let filteredData = users;

    filteredData = users?.filter((user: UserData) => {
      if (maleChecked && user.gender === "male") return true;
      if (femaleChecked && user.gender === "female") return true;
      return false;
    });

    dispatch(toggleUsers(filteredData));
  };

  const handleSmenaChange = (selectedShift: number) => {
    if (selectedShift === 0) {
      dispatch(toggleUsers(users));
      return;
    }

    const filteredData = users?.filter(
      (user: UserData) => user.shift === selectedShift.toString()
    );
    dispatch(toggleUsers(filteredData));
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
          onChange={(e) => handleSearchChange(e.target.value)}
          id="outlined-basic"
          label="Глобальный поиск"
          size="small"
          variant="outlined"
        />
        <FormControl sx={{ minWidth: "120px" }} size="small">
          <InputLabel id="demo-select-small-label">Смена</InputLabel>
          <Select
            onChange={(e) => handleSmenaChange(e.target.value)}
            labelId="demo-select-small-label"
            id="demo-select-small"
            label="Смена"
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
            id="maleCheckbox"
            value="male"
            checked={maleChecked}
            onChange={() => setMaleChecked(!maleChecked)}
          />
          <span style={{ fontWeight: 700 }}>М</span>
          <Checkbox
            {...label}
            sx={{ color: "#F5F5F5" }}
            id="femaleCheckbox"
            value="female"
            checked={femaleChecked}
            onChange={() => setFemaleChecked(!femaleChecked)}
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
