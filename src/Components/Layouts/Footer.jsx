import React from "react";

const Footer = () => {
  return <div className="foot">Footer</div>;
};

export default Footer;

// import * as React from "react";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import Link from "@mui/material/Link";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary">
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// // TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

// export default function Footer() {
//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           minHeight: "100vh",
//           position: "absolute",
//           top: "0",
//           left: "0",
//           right: "0",
//           zIndex: "-10",
//         }}
//       >
//         <Box
//           component="footer"
//           sx={{
//             py: 1,
//             px: 2,
//             mt: "auto",
//             position: "fixed",
//             zIndex: "100",
//             bottom: "0",
//             left: "0",
//             right: "0",
//             backgroundColor: (theme) =>
//               theme.palette.mode === "light"
//                 ? theme.palette.grey[200]
//                 : theme.palette.grey[800],
//           }}
//         >
//           <Container sx={{ display: "flex" }} maxWidth="sm">
//             <Typography variant="body1">
//               My sticky footer can be found here.
//             </Typography>
//             <Copyright />
//           </Container>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// }
