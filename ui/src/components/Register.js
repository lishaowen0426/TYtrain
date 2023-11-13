import * as React from "react";
import { useCookies, Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Dashboard from "./dashboard";
import Knowledge from "./knowledge";

const setErrorFromEvent = (state, event) => {
  let error = true;
  switch (typeof state.value) {
    case "string":
      if (event.target.value.length > 0) {
        error = false;
      }
      break;
    case "number":
      if (event.target.value > 0) {
        error = false;
      }
      break;
    case "boolean":
      if (event.target.value) {
        error = false;
      }
      break;
  }

  return state.error ? error : false;
};

const SignUp = () => {
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const [firstname, setFirstname] = React.useState({ value: "", error: false });
  const [lastname, setLastname] = React.useState({ value: "", error: false });
  const [school, setSchool] = React.useState({ value: 0, error: false });
  const [email, setEmail] = React.useState({ value: "", error: false });
  const [username, setUsername] = React.useState({ value: "", error: false });
  const [phone, setPhone] = React.useState({ value: "", error: false });
  const [password, setPassword] = React.useState({ value: "", error: false });
  const [consent, setConsent] = React.useState({ value: false, error: false });

  const handleFirstnameChange = event => {
    setFirstname({
      ...firstname,
      value: event.target.value,
      error: setErrorFromEvent(firstname, event),
    });
  };
  const handleLastnameChange = event => {
    setLastname({
      ...lastname,
      value: event.target.value,
      error: setErrorFromEvent(lastname, event),
    });
  };
  const handleUsernameChange = event => {
    setUsername({
      ...username,
      value: event.target.value,
      error: setErrorFromEvent(username, event),
    });
  };
  const handleSchoolChange = event => {
    setSchool({
      ...school,
      value: event.target.value,
      error: setErrorFromEvent(school, event),
    });
  };
  const handleEmailChange = event => {
    setEmail({
      ...email,
      value: event.target.value,
      error: setErrorFromEvent(email, event),
    });
  };
  const handlePhoneChange = event => {
    setPhone({
      ...phone,
      value: event.target.value,
      error: setErrorFromEvent(phone, event),
    });
  };
  const handlePasswordChange = event => {
    setPassword({
      ...password,
      value: event.target.value,
      error: setErrorFromEvent(password, event),
    });
  };
  const handleConsentChange = event => {
    setConsent({
      ...consent,
      value: !consent.value,
      error: setErrorFromEvent(consent, event),
    });
  };

  const validateInput = () => {
    let isValid = true;
    if (firstname.value.length == 0) {
      setFirstname({ ...firstname, error: true });
      isValid = false;
    }
    if (phone.value.length == 0) {
      setPhone({ ...phone, error: true });
      isValid = false;
    }
    if (lastname.value.length == 0) {
      setLastname({ ...lastname, error: true });
      isValid = false;
    }
    if (username.value.length == 0) {
      setUsername({ ...username, error: true });
      isValid = false;
    }
    if (school.value == 0) {
      setSchool({ ...school, error: true });
      isValid = false;
    }
    if (email.value.length == 0) {
      setEmail({ ...email, error: true });
      isValid = false;
    }
    if (password.value.length == 0) {
      setPassword({ ...password, error: true });
      isValid = false;
    }

    if (!consent.value) {
      setConsent({ ...consent, error: true });
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (validateInput()) {
      const info = {
        firstname: firstname.value,
        lastname: lastname.value,
        username: username.value,
        school: school.value,
        email: email.value,
        phone: phone.value,
        password: password.value,
      };
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
            console.log(data);
            setCookie("token", data.fields.token, { path: "/" });
            navigate("/knowledge");
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
          className={firstname.error ? "error" : undefined}
          onChange={handleFirstnameChange}
        />

        <input
          type="text"
          placeholder="名*"
          value={lastname.value}
          className={lastname.error ? "error" : undefined}
          onChange={handleLastnameChange}
        ></input>
      </div>
      <div className="reg-phone">
        <input
          type="text"
          placeholder="手机号码*"
          value={phone.value}
          className={phone.error ? "error" : undefined}
          onChange={handlePhoneChange}
        ></input>
        <button>验证</button>
      </div>
      <input
        type="text"
        placeholder="用户名*"
        value={username.value}
        className={username.error ? "error" : undefined}
        onChange={handleUsernameChange}
      ></input>
      <input
        type="text"
        placeholder="邮箱*"
        value={email.value}
        className={email.error ? "error" : undefined}
        onChange={handleEmailChange}
      ></input>
      <input
        type="text"
        placeholder="密码*"
        value={password.value}
        className={password.error ? "error" : undefined}
        onChange={handlePasswordChange}
      ></input>
      <select
        value={school.value}
        className={school.error ? "error" : undefined}
        onChange={handleSchoolChange}
      >
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
          className={"checkbox"}
          onChange={handleConsentChange}
        ></input>
        <label className={consent.error ? "error" : undefined}>同意条款</label>
      </div>
      <button className="sign-submit-button signup">注册</button>
    </form>
  );
};

const SignIn = () => {
  const [phone, setPhone] = React.useState({ value: "", error: false });
  const [password, setPassword] = React.useState({ value: "", error: false });
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handlePhoneChange = event => {
    setPhone({
      ...phone,
      value: event.target.value,
      error: setErrorFromEvent(phone, event),
    });
  };
  const handlePasswordChange = event => {
    setPassword({
      ...password,
      value: event.target.value,
      error: setErrorFromEvent(password, event),
    });
  };

  const validateInput = () => {
    let isValid = true;

    if (phone.value.length == 0) {
      setPhone({ ...phone, error: true });
      isValid = false;
    }

    if (password.value.length == 0) {
      setPassword({ ...password, error: true });
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (validateInput()) {
      const info = {
        phone: phone.value,
        password: password.value,
      };
      fetch("http://127.0.0.1:8010/api/login", {
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
            setCookie("token", data.fields.token, { path: "/" });
            navigate("/knowledge");
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
    <form className="reg-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="手机号码*"
        value={phone.value}
        onChange={handlePhoneChange}
        className={phone.error ? "error" : undefined}
      ></input>
      <input
        type="text"
        placeholder="密码*"
        value={password.value}
        onChange={handlePasswordChange}
        className={password.error ? "error" : undefined}
      ></input>

      <button type="submit" className="sign-submit-button signin">
        登陆
      </button>
    </form>
  );
};

const RegisterAndLogin = () => {
  const fileRef = React.useRef();

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
