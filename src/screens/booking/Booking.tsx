import React from "react";
import PageHeader from "../../layout/PageHeader";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  SelectChangeEvent,
  Button,
} from "@mui/material";

import { RemoveCircle } from "@mui/icons-material";

type Props = {};

const Booking = (props: Props) => {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ backgroundColor: "red", height: "100vh" }}>
      <PageHeader title="Booking" />
      <Box
        sx={{
          px: 2,
          py: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "white",
          height: "100%",

          "& .seats-container": {
            height: "120px",
            minHeight: "220px",
            borderColor: "#f3f3f3",
          },
        }}
      >
        <FormControl fullWidth>
          <Typography>Select Date</Typography>
          <TextField type="date" size="medium" />
        </FormControl>

        <FormControl fullWidth>
          <Typography>Select Schedule</Typography>
          <Select size="medium" value={age} onChange={handleChange}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Abuja - Kaduna 2:30</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <Typography>Select Seat(s)</Typography>
          <Select size="medium" value={age} onChange={handleChange}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>A5 - Business</MenuItem>
            <MenuItem value={20}>B6 - First class</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <Typography>
          <strong>Note*:</strong> You can only select maximum of two tickets at
          a time
        </Typography>
        <fieldset className="seats-container">
          <legend>Selected Seats</legend>
          <Box
            boxShadow={2}
            sx={{
              backgroundColor: "green",
              color: "white",
              display: "flex",
              p: 2,
              my: 2,
            }}
          >
            <Typography width="50%">A1 - Business </Typography>
            <Typography width="50%"> ₦2,500 </Typography>
            <RemoveCircle />
          </Box>
          <Box
            boxShadow={2}
            sx={{
              backgroundColor: "green",
              color: "white",
              display: "flex",
              p: 2,
            }}
          >
            <Typography width="50%">A1 - Business </Typography>
            <Typography width="50%"> ₦2,500 </Typography>
            <RemoveCircle />
          </Box>
          <Typography mt={2}>
            TOTAL: <strong>$22,000</strong>
          </Typography>
        </fieldset>
        <Button
          sx={{ justifySelf: "flex-end" }}
          variant="contained"
          color="success"
          fullWidth
          size="large"
        >
          Proceed To Payment
        </Button>
      </Box>
    </Box>
  );
};

export default Booking;
