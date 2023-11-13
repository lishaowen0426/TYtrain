import * as React from "react";
import { useCookies } from "react-cookie";

const Dashboard = props => {
  const [cookie, setCookie] = useCookies(["token"]);
  console.log(cookie);
  return <div>Welcome</div>;
};

export default Dashboard;
