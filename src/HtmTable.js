import React, { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';


const properties = require('./properties.json');

const PropertyCard = ({ property }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} variant="body1">
          {property.description}
        </Typography>
        <Typography variant="body2">
          Bathrooms: {property.bathrooms}
        </Typography>
        <Typography variant="body2">
          Floor Size: {property.floorArea} sqm
        </Typography>
      </CardContent>
    </Card>
  );
}

const HtmTable = () => {
  const [filter, setFilter] = useState("");
  const [tableData, setTableData] = useState(properties);

  useEffect(() => {
    if (filter === "") {
      setTableData(properties);
    } else {
      setTableData(
        properties.filter((property) => {
          return property.name.toLowerCase().includes(filter.toLowerCase()) ||
            property.description.toLowerCase().includes(filter.toLowerCase());
        })
      )
    }
  }, [filter])

  return (
    <Container component="main" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }}}>
        <TextField 
          variant="outlined" 
          fullWidth 
          sx={{mb: 2}} 
          label="Filter Properties" 
          value={filter} 
          onChange={(e) => {setFilter(e.target.value)}}
        />
        {tableData.length > 0 ? <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              {tableData.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>{property.name}</TableCell>
                  <TableCell><PropertyCard property={property}/></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>:<Alert variant="outlined" severity="error">No Properties Found.</Alert>}
      </Paper>
    </Container>
  );

}

export default HtmTable;