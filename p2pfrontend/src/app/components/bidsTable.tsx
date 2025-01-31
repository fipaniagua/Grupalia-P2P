
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import BidsListProps from '../interfaces/bids_list_props';



function BidsTable({ bids, pageType, setBidSelected }: BidsListProps) {
    return (
       <TableContainer component={Paper}  sx={{height: "480px"}}>
        <Table sx={{height: "520px"}} aria-label="simple table"> 
          <TableHead>
            <TableRow>
              <TableCell>Tipo</TableCell>
              <TableCell align="right">Cantidad</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Dueño</TableCell>
              <TableCell align="right">Fecha</TableCell>
              { pageType == "all" &&
                <TableCell align="right">Acción</TableCell>
              }
              { pageType == "bidded" &&
                <TableCell align="right">Contacto</TableCell>
              }
              
            </TableRow>
          </TableHead>
          <TableBody>
          {bids.map((bid) => (
            <TableRow
              key={bid.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {bid.kind}
              </TableCell>
              <TableCell align="right">{bid.amount}</TableCell>
              <TableCell align="right">{bid.state}</TableCell>
              <TableCell align="right">{bid.owner}</TableCell>
              <TableCell align="right">{bid.created_at}</TableCell>
              { pageType == "all" &&
                <TableCell align="right">
                    <Button onClick={()=> {setBidSelected(bid.id)}}> Aceptar </Button>
                </TableCell>
              }
              { pageType == "bidded" &&
                <TableCell align="right">
                    {bid.contact}
                </TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer> 
    )
    
}

export default BidsTable