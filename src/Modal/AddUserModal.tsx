import React, { ChangeEvent, useState } from "react";
import {
  Box,
  Typography,
  Modal,
  Button,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Image from "next/image";
import { ModalClose } from "@mui/joy";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IFormModal } from "@/types/interfaces";
import { toggleModal } from "@/store/common";
import axios from "axios";

const AddUsersModal = () => {
  const modalState = useAppSelector((state) => state.common.modalState);
  const dispatch = useAppDispatch();
  const [values, setValues] = useState<IFormModal>({
    full_name: "",
    phone_number: "",
    email: "",
    status: "",
    gender: true,
    shift: "",
    image: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleImageChange = ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const file = files ? files[0] : null;
    setValues({
      ...values,
      image: file,
    });
  };

  const handleClose = () => {
    dispatch(toggleModal(false));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }

      const response = await axios.post(
        "https://mycorse.onrender.com/https://66288ac854afcabd07361701.mockapi.io/api/shokh/users",
        formData
      );

      setValues({
        full_name: "",
        phone_number: "",
        email: "",
        status: "",
        gender: true,
        shift: "",
        image: null,
      });
      console.log(response.data);

      dispatch(toggleModal(false));
      window.location.reload();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <Modal
      open={modalState}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          textAlign: "center",
          bgcolor: "background.paper",
          border: "1px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Добавить сотрудника
        </Typography>
        <ModalClose onClick={handleClose} variant="plain" sx={{ m: 1 }} />
        {values.image && (
          <Image
            src={
              values.image instanceof File
                ? URL.createObjectURL(values.image)
                : values.image
            }
            alt="Selected"
            width={100}
            height={100}
            style={{ width: "100px", marginTop: "10px", objectFit: "cover" }}
          />
        )}
        <Box sx={{ marginTop: "20px" }}>
          <TextField
            sx={{ width: "100%", marginBottom: "20px" }}
            id="full_name"
            size="small"
            name="full_name"
            label="Фамилия и имя"
            variant="outlined"
            onChange={handleChange}
            value={values.full_name}
          />

          <PhoneInput
            placeholder="Номер телефона"
            onChange={(_, __, event) => handleChange(event)}
            country="uz"
            inputClass="form-control"
            containerClass="react-tel-input"
            inputStyle={{ width: "100%", height: "40px" }}
          />

          <TextField
            sx={{ width: "100%", margin: "20px 0" }}
            id="email"
            size="small"
            name="email"
            label="Электронная почта"
            variant="outlined"
            onChange={handleChange}
            value={values.email}
          />

          <TextField
            sx={{ width: "100%", marginBottom: "20px" }}
            id="status"
            size="small"
            name="status"
            label="Должность"
            variant="outlined"
            onChange={handleChange}
            value={values.status}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              "& .MuiFormControl-root": { margin: 0 },
            }}
          >
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Смена</InputLabel>
              <Select
                autoWidth
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Смена"
                value={values.shift}
                onChange={(event) => {
                  handleChange(event as ChangeEvent<HTMLInputElement>);
                  setValues({ ...values, shift: event.target.value });
                }}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="gender"
                value={values.gender.toString()}
                onChange={handleChange}
                sx={{ flexDirection: "row" }}
              >
                <FormControlLabel value="true" control={<Radio />} label="M" />
                <FormControlLabel value="false" control={<Radio />} label="W" />
              </RadioGroup>
            </FormControl>
          </Box>
          <Button
            sx={{ width: "100%", margin: "10px 0" }}
            variant="contained"
            component="label"
          >
            ВЫБРАТЬ ФОТО
            <input type="file" hidden onChange={handleImageChange} />
          </Button>
          <Button
            sx={{ width: "100%" }}
            variant="contained"
            color="success"
            onClick={handleSubmit}
          >
            СОХРАНИТЬ
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddUsersModal;
