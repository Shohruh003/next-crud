import React, { useState } from 'react';
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
} from '@mui/material';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ModalClose from '@mui/joy/ModalClose';
import Image from 'next/image';
import { useSelector } from 'react-redux';


const AddUsersModal = () => {
  const language = localStorage.getItem('language');
  const modalState = useSelector(state => state.common.modalState)
  const [values, setValues] = useState({
    full_name: '',
    phone_number: '',
    email: '',
    status: '',
    gender: 'true',
    shift: '',
    their_reason: '',
    image: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    setValues({
      ...values,
      image: event.target.files[0],
    });
  };

//   const handleClose = () => {
//     setAddUsersModal(false);
//   };

  return (
    <Modal
      open={modalState}
      onClose={modalState}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          textAlign: 'center',
          bgcolor: 'background.paper',
          border: '1px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">Добавить сотрудника</Typography>
        <ModalClose onClick={handleClose} variant="plain" sx={{ m: 1 }} />
        {values.image && (
          <Image
            src={
              values.image instanceof File
                ? URL.createObjectURL(values.image)
                : values.image
            }
            alt="Selected"
            style={{ width: '100px', marginTop: '10px', objectFit: 'cover' }}
          />
        )}
        <Box sx={{ marginTop: '20px' }} direction="row" spacing={2}>
          <TextField
            sx={{ width: '100%', marginBottom: '20px' }}
            id="full_name"
            size="small"
            name="full_name"
            label='Фамилия и имя'
            variant="outlined"
            onChange={handleChange}
          />

          <PhoneInput
            id="phone_number"
            placeholder='Номер телефона'
            name="phone_number"
            onChange={(phone, data, event) => handleChange({
              target: { name: "phone_number", value: phone }
            })}
            country="uz"
            style={{ marginBottom: '20px', height: '40px' }}
            inputClass="form-control"
            containerClass="react-tel-input"
            inputStyle={{ width: '100%', height: "100%" }}
          />

          <TextField
            sx={{ width: '100%', marginBottom: '20px' }}
            id="email"
            size="small"
            name="email"
            label='Электронная почта'
            variant="outlined"
            onChange={handleChange}
            value={values.email}
          />

          <TextField
            sx={{ width: '100%', marginBottom: '20px' }}
            id="status"
            size="small"
            name="status"
            label='Должность'
            variant="outlined"
            onChange={handleChange}
          />
          <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'space-between', "& .MuiFormControl-root": { margin: 0 } }}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Смена</InputLabel>
              <Select
                autoWidth
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Смена"
                value={values.shift}
                onChange={(event) => {
                  handleChange(event);
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
                value={values.gender}
                onChange={handleChange}
                sx={{ flexDirection: 'row' }}
              >
                <FormControlLabel value="true" control={<Radio />} label='M' />
                <FormControlLabel value="false" control={<Radio />} label='W' />
              </RadioGroup>
            </FormControl>
          </Box>
          <Button
            sx={{ width: '100%', margin: '10px 0' }}
            variant="contained"
            component="label"
          >
            ВЫБРАТЬ ФОТО
            <input
              type="file"
              hidden
              onChange={handleImageChange}
            />
          </Button>
          <Button
            sx={{ width: '100%' }}
            variant="contained"
            color="success"
          >
            СОХРАНИТЬ
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddUsersModal;
