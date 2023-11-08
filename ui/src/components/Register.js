import * as React from "react";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
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
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Dashboard from "./dashboard";

const SignUp = () => {
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const [firstname, setFirstname] = React.useState({ value: "", error: false });
  const [lastname, setLastname] = React.useState({ value: "", error: false });
  const [school, setSchool] = React.useState({ value: 0, error: false });
  const [email, setEmail] = React.useState({ value: "", error: false });
  const [phone, setPhone] = React.useState({ value: "", error: false });
  const [password, setPassword] = React.useState({ value: "", error: false });
  const [consent, setConsent] = React.useState({ value: false, error: false });

  const handleFirstnameChange = event => {
    setFirstname({ ...firstname, value: event.target.value });
  };
  const handleLastnameChange = event => {
    setLastname({ ...lastname, value: event.target.value });
  };
  const handleSchoolChange = event => {
    setSchool({ ...school, value: event.target.value });
    console.log(school);
  };
  const handleEmailChange = event => {
    setEmail({ ...email, value: event.target.value });
  };
  const handlePhoneChange = event => {
    setPhone({ ...phone, value: event.target.value });
  };
  const handlePasswordChange = event => {
    setPassword({ ...password, value: event.target.value });
  };
  const handleConsentChange = event => {
    setConsent({ ...consent, value: !consent.value });
  };

  const validateInput = () => true;

  const handleSubmit = event => {
    event.preventDefault();

    if (validateInput) {
      const info = {
        firstname: firstname.value,
        lastname: lastname.value,
        school: school.value,
        email: email.value,
        phone: phone.value,
        password: password.value,
      };
      console.log(info);
      fetch("http://127.0.0.1:8010/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      })
        .then(response => response.json())
        .then(data => {
          if (data.code == 0) {
            //success
            setCookie("token", data.token, { path: "/" });
            navigate("/dashboard");
          } else {
            //registration failed
            alert(data.error);
          }
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <form className="reg-form" id="signup-form" onSubmit={handleSubmit}>
      <div className="reg-name">
        <input
          type="text"
          placeholder="姓*"
          value={firstname.value}
          onChange={handleFirstnameChange}
        />

        <input
          type="text"
          placeholder="名*"
          value={lastname.value}
          onChange={handleLastnameChange}
        ></input>
      </div>
      <div className="reg-phone">
        <input
          type="tel"
          placeholder="手机号码*"
          value={phone.value}
          onChange={handlePhoneChange}
        ></input>
        <button>验证</button>
      </div>
      <input
        type="text"
        placeholder="邮箱"
        value={email.value}
        onChange={handleEmailChange}
      ></input>
      <input
        type="password"
        placeholder="密码*"
        value={password.value}
        onChange={handlePasswordChange}
      ></input>
      <select value={school.value} onChange={handleSchoolChange}>
        <option value={0} selected>
          --请选择你的学校--
        </option>
        <option value={1}>立石大学</option>
        <option value={2}>浅草大学</option>
      </select>
      <div className="consent-checkbox">
        <input
          type="checkbox"
          id="check-term"
          value={consent.value}
          onChange={handleConsentChange}
        ></input>
        <label for="check-term">同意条款</label>
      </div>
      <button className="sign-submit-button signup">注册</button>
    </form>
  );
};

const SignIn = () => {
  return (
    <form className="reg-form">
      <input type="tel" placeholder="手机号码*" required></input>

      <input type="password" placeholder="密码*"></input>

      <button type="submit" className="sign-submit-button signin">
        登陆
      </button>
    </form>
  );
};

const RegisterAndLogin = () => {
  const fileRef = React.useRef();

  React.useEffect(() => {
    //document.body.classList.add("reg-background");
    return () => {
      //document.body.classList.remove("reg-background");
    };
  });

  //const [avatar, setAvatar] = React.useState({ value: "", error: false });

  const [signUp, setSignUp] = React.useState(true);

  const clickSignUp = () => {
    setSignUp(true);
  };
  const clickSignIn = () => {
    setSignUp(false);
  };

  return (
    <div className="reg-container">
      <button type="button" className="signbutton" onClick={clickSignIn}>
        登陆
      </button>
      <button type="button" className="signbutton" onClick={clickSignUp}>
        注册
      </button>
      {signUp ? <SignUp /> : <SignIn />}
    </div>
  );
};

export default RegisterAndLogin;
