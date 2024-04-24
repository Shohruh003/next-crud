import React from "react";
import { Box, Typography, Modal, Button, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleDeleteModal } from "@/store/common";

const DeleteUserModal = () => {
  const dispatch = useAppDispatch();
  const deleteModalState = useAppSelector(
    (state) => state.common.deleteModalState
  );

  const handleClose = () => {
    dispatch(toggleDeleteModal(false));
  };
  //   const deletePupils = async () => {
  //     try {
  //       const response = await api.delete(`/Workers/${editUsers?.id}/`);
  //       console.log(response.data);
  //       dispatch(toggleDeleteModal(false));
  //       window.location.reload();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const style = {
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
  };

  return (
    <div>
      <Modal
        open={deleteModalState}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Вы хотите удалить ?
          </Typography>
          <Stack
            sx={{ marginTop: "20px", marginLeft: "30%" }}
            direction="row"
            spacing={2}
          >
            <Button variant="contained" color="success">
              Да
            </Button>
            <Button onClick={handleClose} variant="outlined" color="error">
              Нет
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteUserModal;
