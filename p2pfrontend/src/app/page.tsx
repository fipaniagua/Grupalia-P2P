'use client'

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BidsTable from "./components/bidsTable";
import BidModal from './components/bidModal';
import Button from '@mui/material/Button';


import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentIcon from '@mui/icons-material/Assignment';

import AssessmentIcon from '@mui/icons-material/Assessment';
import Paper from '@mui/material/Paper';

import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Bid from './interfaces/bid';

const BASE_URL = "http://localhost:3000";
const FILTER_MAP: { [key: number]: string }  = {0: "own", 1: "all", 2: "bidded"}


export default function Demo() {
  const [error, setError] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [bids, setBids] = React.useState<Bid[]>([]);
  const [page, setPage] = React.useState(0);
  const [user, setUSer] = React.useState("Julio");
  const [bidSelected, setBidSelected] = React.useState(0);
  const [open, setOpen] = React.useState(false)

  const abortControllerRef = React.useRef<AbortController | null>(null);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  React.useEffect(()=> {
    const fetchTakeResponse = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
      setIsLoading(true);

      try {
        const body = JSON.stringify({bidder: user})
        const response = await fetch(`${BASE_URL}/bids/take/${bidSelected}`, {
          headers: {
            "Content-Type": "application/json"
          },
          body: body,
          method: "POST",
          signal: abortControllerRef.current?.signal,
        });
        setPage(2);
      } catch (e: any) {
        if (e.name === "AbortError") {
          console.log("Aborted");
          return;
        }

        setError(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTakeResponse()
  }, [bidSelected]);

  React.useEffect(() => {
    const fetchBids = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setIsLoading(true);

      try {
        const body = JSON.stringify({filter: FILTER_MAP[page]})
        const response = await fetch(`${BASE_URL}/bids/filter/${user}`, {
          headers: {
            "Content-Type": "application/json"
          },
          body: body,
          method: "POST",
          signal: abortControllerRef.current?.signal,
        });
        const bids = (await response.json()) as Bid[];
        setBids(bids);
      } catch (e: any) {
        if (e.name === "AbortError") {
          console.log("Aborted");
          return;
        }

        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBids();
  }, [page]);

  if (error) {
    return <div>Something went wrong! Please try again.</div>;
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

  return (
    <Box sx={{backgroundColor: 'white', minHeight: "667px" }}>
      <BidModal open={open} handleClose={handleClose} user={user}></BidModal>
      <Stack>
        <Item>
          <AppBar position="static">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, paddingLeft: "10px" }}>
                  P2P Mexico
            </Typography>
          </AppBar>
        </Item>
        <Item>
          <BidsTable bids={bids} pageType={FILTER_MAP[page]} setBidSelected={setBidSelected}>
          </BidsTable>
        </Item>
        <Item>
          <Button onClick={handleOpen}>Realizar Oferta</Button>
        </Item>
        <Item>
          <BottomNavigation
          showLabels
          value={page}
          onChange={(event, newValue) => {
            setPage(newValue);
          }}
          >
            <BottomNavigationAction label="Mis Ofertas" icon={<AssessmentIcon />} />
            <BottomNavigationAction label="Todas Las Ofertas" icon={<AssignmentIcon />} />
            <BottomNavigationAction label="Aceptadas" icon={<AssignmentTurnedInIcon />} />
          </BottomNavigation>
        </Item>
      </Stack>
      
    </Box> 
  )
}