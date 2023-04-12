import React from "react";
import PageHeader from "../../layout/PageHeader";
import {
  Box,
  FormControl,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Tune } from "@mui/icons-material";
import { tickets } from "../../data/data";
import { Ticket } from "../../types/types";
import { Link } from "react-router-dom";

type Props = {};

const History = (props: Props) => {
  return (
    <div>
      <PageHeader title="History" />
      <Box
        sx={{
          p: 2,
        }}
      >
        <Stack
          gap={2}
          direction="row"
          justifyContent="space-around"
          // flexWrap="wrap"
          sx={{
            "& >*": {
              width: "32.33%",
            },
          }}
        >
          <FormControl>
            <Typography>Depature st. </Typography>
            <Select
              displayEmpty
              fullWidth
              value={""}
              // onChange={(e) => setSelectedSector(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <Tune />
                </InputAdornment>
              }
            >
              <MenuItem value="">All</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <Typography>Arrival st. </Typography>
            <Select
              displayEmpty
              fullWidth
              value={""}
              // onChange={(e) => setSelectedSector(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <Tune />
                </InputAdornment>
              }
            >
              <MenuItem value="">All</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <Typography>Depature Date</Typography>
            <TextField
              type="date"
              fullWidth
              value={""}
              // onChange={(e) => setSelectedSector(e.target.value)}
              inputProps={
                <InputAdornment position="start">
                  <Tune />
                </InputAdornment>
              }
            />
          </FormControl>
        </Stack>
        <TableContainer
          sx={{ my: 4 }}
          className="tableContainer"
          component={Paper}
        >
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="left">Seat</TableCell>
                <TableCell align="left">Depature</TableCell>
                <TableCell align="left">Destination</TableCell>
                <TableCell align="left">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.map((ticket: Ticket) => (
                <TableRow
                  key={ticket.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {ticket.id}
                  </TableCell>
                  <TableCell align="left">
                    <Link to="/ticket" state={{ ticket }}>
                      {ticket.seat.name}
                    </Link>
                  </TableCell>
                  <TableCell align="left">
                    {ticket.seat.schedule?.depature_station.name}
                  </TableCell>
                  <TableCell align="left">
                    {ticket.seat.schedule?.arrival_station.name}
                  </TableCell>
                  <TableCell align="left">
                    {ticket.seat.schedule?.departure_date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default History;
