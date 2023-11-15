import * as React from "react";

/*
props {
name:
id:
(key = id)
placeholder:
}
*/

export const TyInputText = ({ children, ...props }) => {
  const defaultClassName = "";
  const className = defaultClassName.concat(" ", props.className);
  return (
    <input
      type="text"
      className="relative block w-full rounded-1 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      {...props}
    />
  );
};
