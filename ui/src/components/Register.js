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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Stack from "@mui/material/Stack";

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

const useStateWithError = initialValue => {
  const [state, setState] = React.useState(initialValue);
  const [error, setError] = React.useState(false);
  return {
    setError,
    reset: () => setState(initialValue),
    state,
    error,
    onChange: e => {
      setState(e.target.value);
    },
  };
};

const HiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Register = () => {
  const fileRef = React.useRef();
  const {
    reset: resetFirstname,
    setError: setFirstnameError,
    ...firstnameProps
  } = useStateWithError("");

  const {
    reset: resetLastname,
    setError: setLastnameError,
    ...lastnameProps
  } = useStateWithError("");

  const {
    reset: resetSchool,
    setError: setSchoolError,
    ...schoolProps
  } = useStateWithError(0);

  const {
    reset: resetTel,
    setError: setTelError,
    ...telProps
  } = useStateWithError("");

  const {
    reset: resetPassword,
    setError: setPasswordError,
    ...passwordProps
  } = useStateWithError("");
  const {
    reset: resetEmail,
    setError: setEmailError,
    ...emailProps
  } = useStateWithError("");
  const {
    reset: resetConsent,
    setError: setConsentError,
    ...consentProps
  } = useStateWithError(false);

  const validateInput = () => {
    let valid = true;
    if (firstnameProps.state.length == 0) {
      setFirstnameError(true);
      valid = false;
    } else {
      setFirstnameError(false);
    }
    if (lastnameProps.state.length == 0) {
      setLastnameError(true);
      valid = false;
    } else {
      setLastnameError(false);
    }
    if (telProps.state.length == 0) {
      setTelError(true);
      valid = false;
    } else {
      setTelError(false);
    }
    if (passwordProps.state.length == 0) {
      setPasswordError(true);
      valid = false;
    } else {
      setPasswordError(false);
    }
    if (schoolProps.state == 0) {
      setSchoolError(true);
      valid = false;
    } else {
      setSchoolError(false);
    }

    if (!consentProps.state) {
      setConsentError(true);
      valid = false;
    } else {
      setConsentError(false);
    }

    return valid;
  };

  const onSubmit = () => {
    if (validateInput()) {
      registrationData = {
        lastname: lastnameProps.state,
        firstname: firstnameProps.state,
        tel: telProps.state,
        school: schoolProps.state,
        email: emailProps.state,
        password: passwordProps.state,
      };
    }
  };

  const handleFileUpload = e => {
    console.log(e.target.value);
  };

  const handlePhoneValidation = () => {};

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
        <AccountCircleIcon sx={{ flex: 4, width: "100%" }} />
        <Button
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          sx={{ flex: 1, mt: "5%" }}
          onClick={e => {
            fileRef.current.click();
          }}
        >
          上传头像
        </Button>
        <HiddenInput ref={fileRef} type="file" onChange={handleFileUpload} />
      </Box>
      <Box
        sx={{
          flex: 4,
          width: "30%",
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

        <Box sx={{ flex: "0 0 100%", display: "flex" }}>
          <StandardInputItem
            required
            type="tel"
            id="reg-tel"
            label="手机"
            autoComplete="tel"
            {...telProps}
            sx={{
              flex: "0 0 60%",
            }}
          />

          <Button
            variant="contained"
            onClick={handlePhoneValidation}
            endIcon={<SendIcon />}
            sx={{ flex: "0 0 25%", marginLeft: "5%", height: "80%" }}
          >
            验证
          </Button>
        </Box>

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
          {...consentProps}
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
