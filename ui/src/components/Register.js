import * as React from "react";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import MaleAvatar from "../static/images/male.png";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { Form } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import SendIcon from "@mui/icons-material/Send";
import { Menu } from "@mui/material";

const StandardInputItem = props => <TextField {...props} variant="standard" />;

const schools = [
  { code: 1, name: "立石大学" },
  { code: 2, name: "浅草大学" },
];

const SchoolList = () => {
  return schools.map(s => (
    <MenuItem key={s.name} value={s.code}>
      {s.code + " " + s.name}
    </MenuItem>
  ));
};

const useInput = initialValue => {
  const [value, setValue] = React.useState(initialValue);
  return [
    {
      value,
      onChange: e => setValue(e.target.value),
    },
    () => setValue(initialValue),
  ];
};

const Register = () => {
  const [schoolProps, resetSchool] = useInput(0);
  const [firstnameProps, resetFirstname] = useInput("");
  const [lastnameProps, resetLastname] = useInput("");
  const [telProps, resetTel] = useInput("");
  const [passwordProps, resetPassword] = useInput("");
  const [emailProps, resetEmail] = useInput("");

  const validateInput = () => {
    alert(firstnameProps.value);
  };
  const onSubmit = () => {
    validateInput();
  };

  var firstNameValid = true;

  return (
    <Container
      maxWidth={false}
      sx={{
        height: "75vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* avatar box*/}
      <Box
        sx={{
          flex: 1,
          mt: "2%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Avatar alt="male" src={MaleAvatar} sx={{ flex: 4, width: "100%" }} />
        <Button
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          sx={{ flex: 1, mt: "5%" }}
        >
          上传头像
        </Button>
      </Box>
      <Box
        sx={{
          flex: 4,
          width: "50%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignContent: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <StandardInputItem
          required
          type="text"
          id="reg-last-name"
          label="姓"
          autoComplete="name"
          {...lastnameProps}
          sx={{
            flex: "0 0 40%",
          }}
        />
        <StandardInputItem
          required
          type="text"
          id="reg-first-name"
          label="名"
          autoComplete="name"
          {...firstnameProps}
          sx={{
            flex: "0 0 40%",
          }}
        />
        <FormControl required sx={{ flex: "0 0 60%", mt: "10%" }}>
          <InputLabel id="school-code">学校代码</InputLabel>
          <Select labelId="school-code" label="学校代码" {...schoolProps}>
            {SchoolList()}
          </Select>
        </FormControl>

        <StandardInputItem
          required
          type="tel"
          id="reg-tel"
          label="手机"
          autoComplete="tel"
          {...telProps}
          sx={{
            flex: "0 0 100%",
          }}
        />
        <StandardInputItem
          type="email"
          id="email"
          label="邮箱"
          autoComplete="email"
          {...emailProps}
          sx={{
            flex: "0 0 100%",
          }}
        />
        <StandardInputItem
          required
          type="password"
          id="password"
          label="密码"
          autoComplete="new-password"
          {...passwordProps}
          sx={{
            flex: "0 0 100%",
          }}
        />
        <FormControlLabel
          required
          control={<Checkbox />}
          sx={{ mt: "2%", marginRight: "auto" }}
          label="同意条款"
        />
      </Box>
      <Box>
        <Button variant="contained" onClick={onSubmit} endIcon={<SendIcon />}>
          提交
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
