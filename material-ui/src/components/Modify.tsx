import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from "react";

import {
  TextField
} from "@mui/material";


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Modify = ({users,setUsers,id,editpro}:any) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);


  const handleShow = () => {
    setUsers(users.map((x:any) => x.id === id ? {...x,isEdit:true}:x ))
};


const [edittodo, setEdittodo] = useState('');

const handleClose = () => {
  setUsers(users.map((x:any) => x.id === id ? {...x,name:edittodo,isEdit:false}:x ))
 
};

  return (
    <div>
    <Button onClick={handleOpen}>Open modal</Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <Box sx={style}>
      <TextField id="outlined-basic" label="Outlined" variant="outlined"
        value={edittodo}
        onChange={(e) => setEdittodo(e.target.value)}
       
       />
      <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Save Changes
          </Button>
     
      </Box>
    </Modal>
  </div>
  )
}

export default Modify
