import React, { useCallback } from "react";
import PageHeader from "../../layout/PageHeader";
import { Ticket } from "../../types/types";
import { useLocation } from "react-router-dom";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { ArrowRightAlt } from "@mui/icons-material";
import { QRCodeSVG } from "qrcode.react";
import { Share } from "@capacitor/share";
import { toPng } from "html-to-image";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

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

  const handleSavePng = useCallback(() => {
    if (componentToPrintRef.current === null) {
      return;
    }

    toPng(componentToPrintRef.current, { cacheBust: true })
      .then(async (dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        //  link.click();

        // share
        // await Share.share({
        //   title: "See cool stuff",
        //   text: "Really awesome thing you need to see right meow",
        //   url: dataUrl,
        //   dialogTitle: "Share with buddies",
        // });

        //save to file system

        await Filesystem.writeFile({
          path: "image",
          data: dataUrl,
          directory: Directory.Documents,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [componentToPrintRef]);

  const handleShare = async (file: string) => {
    try {
      let result = await Share.share({
        title: "See cool stuff",
        text: "Really awesome thing you need to see right meow",
        url: file,
        dialogTitle: "Share with buddies",
      });
      console.log(result);
      return result;
    } catch (error) {
      console.log("error");
    }
  };

  const handleSaveAndroid = async () => {
    try {
      let result = await Filesystem.writeFile({
        path: "secrets/text.txt",
        data: "This is a test",
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });

      console.log("result", result);

      return result;
    } catch (error) {
      console.log("saving error");
    }
  };

  const handleClickDownload = () => {
    handleSavePng();
  };

  return (
    <div>
      {/* ticket component to print */}

      <PageHeader title="Ticket Details" />
      <Card
        ref={componentToPrintRef}
        component="div"
        elevation={5}
        sx={{ m: 2, mt: 5, p: 3 }}
      >
        <Stack alignItems="center">
          <Typography>seat</Typography>
          <Typography variant="h4">{ticket.seat.name}</Typography>
          <Typography>{ticket.seat.classification?.name} Class</Typography>
        </Stack>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Typography>{ticket.seat.schedule?.depature_station.name}</Typography>
          <ArrowRightAlt
            fontSize="large"
            sx={{ height: "50px", width: "100px", color: "primary.main" }}
          />
          <Typography>{ticket.seat.schedule?.arrival_station.name}</Typography>
        </Stack>
        <Stack alignItems="center">
          <Typography fontSize="20px" mb={0}>
            {ticket.seat.schedule?.departure_date}
          </Typography>
          <Typography mt={0}>{ticket.seat.schedule?.depature_time}</Typography>
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
            <td>{ticket.user.name}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{ticket.user.email}</td>
          </tr>
          <tr>
            <th>Transaction ID</th>
            <td>{ticket.transaction_id}</td>
          </tr>
          <tr>
            <th>Price</th>
            <td>N{ticket.seat.price}</td>
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
          onClick={handleClickDownload}
        >
          Download
        </Button>
      </Stack>
    </div>
  );
};

export default TicketDetails;
