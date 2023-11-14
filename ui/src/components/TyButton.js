import * as React from "react";
import Button from "react-bootstrap/Button";

export const TySubmitButton = props => {
  return (
    <Button
      className="ty-button disabled:opacity-50 focus:outline-0 hover:bg-sky-800 active:bg-sky-900"
      {...props}
    ></Button>
  );
};
