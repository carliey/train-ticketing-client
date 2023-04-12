import React from "react";
import PageHeader from "../../layout/PageHeader";
import { Ticket } from "../../types/types";
import { useLocation } from "react-router-dom";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { ArrowRightAlt } from "@mui/icons-material";
import { QRCodeSVG } from "qrcode.react";
import { useReactToPrint } from "react-to-print";

type Props = {};

type CustomizedState = {
  ticket: Ticket;
};

const TicketDetails = (props: Props) => {
  const location = useLocation();
  const state = location.state as CustomizedState;
  const { ticket } = state;
  console.log("state", state);
  const qrCodeValue = `seat=${ticket.seat.name} | purchased by = ${ticket.user.email} | trip=${ticket.seat.schedule?.depature_station.name} to ${ticket.seat.schedule?.arrival_station.name}`;

  const componentToPrintRef = React.useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentToPrintRef?.current,
  });

  return (
    <div>
      {/* ticket component to print */}
      <div style={{ display: "none" }}>
        <Card
          ref={componentToPrintRef}
          elevation={5}
          sx={{ m: 2, mt: 5, p: 3 }}
        >
          <Stack alignItems="center">
            <Typography>seat</Typography>
            <Typography variant="h4">A5</Typography>
            <Typography>Business Class</Typography>
          </Stack>
          <Stack direction="row" justifyContent="center" alignItems="center">
            <Typography>Rigasa</Typography>
            <ArrowRightAlt
              fontSize="large"
              sx={{ height: "50px", width: "100px", color: "green" }}
            />
            <Typography>Idu</Typography>
          </Stack>
          <Stack alignItems="center">
            <Typography fontSize="20px" mb={0}>
              12/32/12
            </Typography>
            <Typography mt={0}>2:30pm</Typography>
          </Stack>
          <Box
            component="table"
            sx={{
              width: "100%",
              p: 1,
              "& th": {
                textAlign: "left",
                fontWeight: "normal",
              },
              "& tr": {
                textAlign: "right",
                fontWeight: "normal",
              },
            }}
          >
            <tr>
              <th>Fullname</th>
              <td>Muhammed Ladan</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>mcarliey@gmail.com</td>
            </tr>
            <tr>
              <th>Transaction ID</th>
              <td>93434728472</td>
            </tr>
            <tr>
              <th>Price</th>
              <td>N23,212</td>
            </tr>
          </Box>
          <Box display="flex" justifyContent="center">
            <QRCodeSVG
              value={qrCodeValue}
              size={96}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"L"}
              includeMargin={false}
            />
          </Box>
        </Card>
      </div>
      <PageHeader title="Ticket Details" />
      <Card elevation={5} sx={{ m: 2, mt: 5, p: 3 }}>
        <Stack alignItems="center">
          <Typography>seat</Typography>
          <Typography variant="h4">A5</Typography>
          <Typography>Business Class</Typography>
        </Stack>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Typography>Rigasa</Typography>
          <ArrowRightAlt
            fontSize="large"
            sx={{ height: "50px", width: "100px", color: "green" }}
          />
          <Typography>Idu</Typography>
        </Stack>
        <Stack alignItems="center">
          <Typography fontSize="20px" mb={0}>
            12/32/12
          </Typography>
          <Typography mt={0}>2:30pm</Typography>
        </Stack>
        <Box
          component="table"
          sx={{
            width: "100%",
            p: 1,
            "& th": {
              textAlign: "left",
              fontWeight: "normal",
            },
            "& tr": {
              textAlign: "right",
              fontWeight: "normal",
            },
          }}
        >
          <tr>
            <th>Fullname</th>
            <td>Muhammed Ladan</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>mcarliey@gmail.com</td>
          </tr>
          <tr>
            <th>Transaction ID</th>
            <td>93434728472</td>
          </tr>
          <tr>
            <th>Price</th>
            <td>N23,212</td>
          </tr>
        </Box>
        <Box display="flex" justifyContent="center">
          <QRCodeSVG
            value={qrCodeValue}
            size={96}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"L"}
            includeMargin={false}
          />
        </Box>
      </Card>
      <Stack
        sx={{
          // position: "absolute",
          // bottom: 0,
          width: "100%",
          p: 2,
        }}
      >
        <Button
          className="btn"
          variant="contained"
          color="success"
          fullWidth
          size="large"
          onClick={handlePrint}
        >
          Download
        </Button>
      </Stack>
    </div>
  );
};

export default TicketDetails;
