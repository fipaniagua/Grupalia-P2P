import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';
import BASE_URL from '../constants/base_url';
import BidsModalProps from '../interfaces/bids_modal_props';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
};


function BidModal({open, handleClose, user }: BidsModalProps) {

    const [kind, setKind] = React.useState('sell');
    const [contact, setContact] = React.useState('sell');
    const [amount, setAmount] = React.useState(0);

    const handleChange = (event: SelectChangeEvent) => {
        setKind(event.target.value as string);
    };

    const handleContactChange = (event: any) => {
        setContact(event.target.value as string);
    };

    const handlecAmountChange = (event: any) => {
        setAmount(event.target.value as number);
    };

    const sendBid = () => {
        const fetchTakeResponse = async () => {
      
            try {
              const body = JSON.stringify({bids: {
                owner: user,
                amount: amount,
                contact: contact,
                kind: kind
              }})
              const response = await fetch(`${BASE_URL}/bids`, {
                headers: {
                  "Content-Type": "application/json"
                },
                body: body,
                method: "POST",
              });
            } catch (e: any) {
              if (e.name === "AbortError") {
                console.log("Aborted");
                return;
                }
            }
      
          }
          fetchTakeResponse()
          handleClose()
    }


    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={kind}
          label="Kind"
          onChange={handleChange}
        >
          <MenuItem value={"sell"}>Vender</MenuItem>
          <MenuItem value={"buy"}>Comprar</MenuItem>
        </Select>
        <TextField id="outlined-basic" label="Contacto" variant="outlined" value={contact} onChange={handleContactChange}/>
        <TextField id="outlined-basic" label="Cantidad" variant="outlined" value={amount} onChange={handlecAmountChange}/>
        <Button onClick={()=> {sendBid()}}> Enviar </Button>

      </FormControl>

        </Box>
      </Modal>
    )
} 

export default BidModal;