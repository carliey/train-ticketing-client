import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#273572",
      background: "#EFF6FC",
    },
    text: {
      primary: "#273572",
      secondary: "#B1B1B1",
    },
  },
  typography: {
    pageHeading: {
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: "34px",
      lineHeight: "51px",
      textTransform: "capitalize",
      display: "block",
    },

    inputLabel: {
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: "22px",
      display: "block",
      paddingLeft: "10px",
      marginBottom: "5px",
    },
  },
});
