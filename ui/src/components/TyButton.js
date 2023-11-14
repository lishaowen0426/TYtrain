import * as React from "react";

export const TySubmitButton = props => {
  return (
    <button
      type="button"
      className="bg-sky-400 hover:bg-sky-600 text-2xl px-4 rounded-2"
    >
      {props.children}
    </button>
  );
};
