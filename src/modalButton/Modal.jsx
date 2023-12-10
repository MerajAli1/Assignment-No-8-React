import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
const style = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "warp",
  flexDirection: "column",
  bgcolor: "white",
};

export default function BasicModal(cart) {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(cart.label);
  return (
    <div>
      <Button sx={{ mb: 5, width: "100%" }} variant='contained' onClick={handleOpen}>Cart Items:{cart?.label?.length}</Button>
      <Modal
        style={{ overflowY: "scroll", width: "50%" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button sx={{ bgcolor: "red", width: "10%", marginTop: "10px" }} onClick={handleClose}>X</Button>
          {cart.label.map((data, index) => (
            <div style={{ textAlign: "center", border: "5px solid black", width: "50%" }} key={index}>
              <img src={data?.image} width={200} />
              <h1>Title: {data.title}</h1>
              <h5>Description: {data.description}</h5>
              <h3>{data.price}</h3>
            </div>
          ))}
        </Box>
      </Modal>
    </div>
  );
}