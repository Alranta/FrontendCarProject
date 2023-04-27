import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCar(props) {
const [car, setCar] = React.useState({
    brand: '',
    model: '',
    color: '',
    fuel: '',
    year: '',
    price: ''
})
const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    console.log(props.car)
    setCar({brand: props.car.brand, model: props.car.model, 
      color: props.car.color, fuel: props.car.fuel, year: props.car.year, price: props.car.price});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.updateCar(car, props.car._links.car.href);
    setOpen(false);
  }

  return (
    <div>
      <Button onClick={handleClickOpen}>
        Edit car
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit car</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Brand"
            value={car.brand}
            onChange={e => setCar({...car, brand: e.target.value})}
            fullWidth
            variant="standard"
          />
            <TextField
            margin="dense"
            label="Model"
            value={car.model}
            onChange={e => setCar({...car, model: e.target.value})}
            fullWidth
            variant="standard"
          />
            <TextField
            margin="dense"
            label="Color"
            value={car.color}
            onChange={e => setCar({...car, color: e.target.value})}
            fullWidth
            variant="standard"
          />
            <TextField
            margin="dense"
            label="Fuel"
            value={car.fuel}
            onChange={e => setCar({...car, fuel: e.target.value})}
            fullWidth
            variant="standard"
          />
            <TextField
            margin="dense"
            label="Year"
            value={car.year}
            onChange={e => setCar({...car, year: e.target.value})}
            fullWidth
            variant="standard"
          />
            <TextField
            margin="dense"
            label="Price"
            value={car.price}
            onChange={e => setCar({...car, price: e.target.value})}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}