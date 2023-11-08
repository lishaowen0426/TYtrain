import * as React from "react";
import { useCookies } from "react-cookie";

const Dashboard = props => {
  const [cookie, setCookie] = useCookies(["token"]);

  alert("welcome " + cookie);
};

export default Dashboard;
