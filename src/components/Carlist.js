import React, {useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Snackbar from '@mui/material/Snackbar';
import addCar from './AddCar';
import AddCar from './AddCar';
import { API_URL } from '../constants';

function Carlist() {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
       fetch(API_URL)
       .then(response => response.json())
       .then(data => setCars(data._embedded.cars))
       .catch(err => console.error(err))
    },[]);
    
    const getCars = () => {
        fetch(API_URL)
       .then(response => response.json())
       .then(data => setCars(data._embedded.cars))
       .catch(err => console.error(err))
    }

    const deleteCar = (params) => {
    if (window.confirm("Are you sure")) { // PAINAA OK NIIN PALAUTTAA TRUE
    fetch(params.data._links.car.href, {method: 'DELETE'})
    .then(response => {
      if (response.ok) {
        setOpen(true);
        getCars();
      }
      // fetch cars
      else 
        alert("Something went wrong: " + response.status)  
    })
    .catch(err => console.error(err))
}
}

    const addCar = (car) => {
     fetch(API_URL, {
        method : 'POST',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(car)
        })
        .then(response => {
            if (response.ok)
                getCars();
            else
                alert("Something went wrong")
        })
        .catch(err => console.error(err))
    }

    const [columnDefs] = useState([
        {field: 'brand', sortable: true, filter :true},
        {field: 'model', sortable: true, filter :true},
        {field: 'color', sortable: true, filter :true, width: 150},
        {field: 'fuel', sortable: true, filter :true, width: 150},
        {field: 'year', sortable: true, filter :true, width: 100},
        {field: 'price', sortable: true, filter :true, width: 150},
        {cellRenderer: params => 
            <Button size="small" color="error" onClick={() => deleteCar(params)}>
              Delete
            </Button>,
            width: 120
            }
    ])

    return(
        <>
        <AddCar addCar={addCar}/>
         <div className="ag-theme-material" style={{height: 800, width: '90%', margin: 'auto'}}>
            <AgGridReact 
            pagination={true}
            paginationPageSize={10}
            rowData={cars}
            columnDefs={columnDefs} 
            />
         </div>
         <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            message='Car deleted successfully'
         />
        </>
    );
}

export default Carlist;