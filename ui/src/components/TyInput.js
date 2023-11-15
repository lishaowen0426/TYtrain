import * as React from "react";

/*
props {
name:
id:
(key = id)
placeholder:
}
*/

export const TyInputTextBorderNone = props => {
  const defaultClassName = "";
  return (
    <input
      type="text"
      className="appearance-none relative block box-border
       border-solid outline-none border-b-[1px] border-jumbo-200
       pb-[2px]
       "
      {...props}
    />
  );
};
