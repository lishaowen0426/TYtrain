import * as React from "react";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import MaleAvatar from "../static/images/male.png";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
const Register = () => {
  const theme = useTheme();
  const handleSubmit = () => {};

  return (
    <Container maxWidth={false} sx={{ height: "75vh" }}>
      <Box
        sx={{
          height: "15%",
          mt: "2%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          alt="male"
          src={MaleAvatar}
          sx={{
            height: "2/3",
            width: "1/6",
          }}
        />
        <Typography sx={{ height: "1/3" }}>注册</Typography>
      </Box>
      <Box sx={{}}></Box>
    </Container>
  );
};

export default Register;
