import React, { useState, useEffect, ChangeEvent } from "react";
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
import ModalClose from "@mui/joy/ModalClose";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleEditModal } from "@/store/common";
import api from "@/api/api";

const EditUsersModal = () => {
  const dispatch = useAppDispatch();
  const editModalState = useAppSelector((state) => state.common.editModalState);
  const user = useAppSelector((state) => state.common.userId);

  const [values, setValues] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    status: "",
    gender: "",
    shift: "",
    image: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editModalState && user) {
      if (user) {
        setValues((prevValues) => ({
          ...prevValues,
          full_name: user.full_name || "",
          phone_number: user.phone_number || "",
          email: user.email || "",
          status: user.status || "",
          gender: user.gender || "",
          shift: user.shift || "",
        }));

        if (user.image instanceof File) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setValues((prevValues) => ({
              ...prevValues,
              image: reader.result,
            }));
          };
          reader.readAsDataURL(user.image);
        }
      }
    }
  }, [editModalState, user]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleImageChange = ({
    target: { files },
  }: ChangeEvent<HTMLInputElement>) => {
    const file = files ? files[0] : null;
    if (file) {
      setValues((prevValues) => ({
        ...prevValues,
        image: null,
      }));
    }
  };

  const handleClose = () => {
    dispatch(toggleEditModal(false));
  };

  const handleEditUser = async () => {
    try {
      const formData = new FormData();
      for (const key in values) {
        if (values[key]) {
          formData.append(key, values[key]);
        }
      }

      if (values.image) {
        formData.append("image", values.image);
      }

      const response = await api.put(`users/${user?.id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(toggleEditModal(false));
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors({
          ...errors,
          email: ["Please include an '@' in the email address"],
        });
      }
      console.error(error);
    }
  };

  return (
    <div>
      <Modal
        open={editModalState}
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
            Карточка сотрудника
          </Typography>
          <ModalClose onClick={handleClose} variant="plain" sx={{ m: 1 }} />

          <Image
            src={
              values?.image
                ? URL.createObjectURL(values?.image)
                : user && user.image
            }
            alt="Selected"
            width={40}
            height={40}
            style={{
              width: "100px",
              height: "100px",
              marginTop: "10px",
              objectFit: "cover",
            }}
          />
          <Box sx={{ marginTop: "20px" }}>
            <TextField
              id="outlined-size-small"
              sx={{ width: "100%", marginBottom: "20px" }}
              size="small"
              name="full_name"
              label="Фамилия и имя"
              variant="outlined"
              onChange={handleChange}
              value={values.full_name}
            />

            <PhoneInput
              placeholder="Номер телефона"
              value={values.phone_number}
              country="uz"
              inputClass="form-control"
              containerClass="react-tel-input"
              inputStyle={{
                width: "100%",
                height: "40px",
              }}
            />

            <TextField
              id="outlined-size-small"
              sx={{ width: "100%", margin: "20px 0" }}
              size="small"
              name="email"
              label="Электронная почта"
              variant="outlined"
              onChange={handleChange}
              value={values.email}
              error={errors.email && true}
              helperText={
                errors.email ? "Please include an '@' in the email address" : ""
              }
            />
            <TextField
              id="outlined-size-small"
              sx={{ width: "100%", marginBottom: "20px" }}
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
                    setValues((prevValues) => ({
                      ...prevValues,
                      shift: event.target.value,
                    }));
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
                  value={values.gender}
                  onChange={handleChange}
                  sx={{ flexDirection: "row" }}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="М"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="Ж"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Button
              sx={{ width: "100%", margin: "10px 0" }}
              variant="contained"
              component="label"
            >
              ИЗМЕНИТЬ ИЗОБРАЖЕНИЕ
              <input type="file" hidden onChange={handleImageChange} />
            </Button>

            <Button
              sx={{ width: "100%" }}
              onClick={handleEditUser}
              variant="contained"
              color="success"
            >
              СОХРАНИТЬ
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default EditUsersModal;
