import { useNavigate } from "react-router-dom";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
type Props = {
  title: string;
};

const PageHeader = (props: Props) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundColor: "green",
        color: "white",
        display: "flex",
        alignItems: "center",
        p: 2,
        boxShadow: "1px 0.5px 0.6px 1px green",
        "& .title": {
          textAlign: "center",
          flex: 1,
        },
      }}
    >
      <ArrowBackIosNewIcon onClick={() => navigate(-1)} />
      <Typography className="title">{props.title}</Typography>
    </Box>
  );
};

export default PageHeader;
