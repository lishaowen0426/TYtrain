import * as React from "react";

export const TySubmitButton = ({ children, className, ...props }) => {
  const defaultClassName =
    "ty-button-reset bg-sky-400 hover:brightness-75 rounded-1 text-white font-normal text-center leading-[1.1] shadow-[0_6px_#998] active:duration-[0.4s] active:shadow-[0_4px_#998] active:translate-y-[2px]";

  const constructedClassname = defaultClassName.concat(" ", className);
  return (
    <button type="button" className={constructedClassname} {...props}>
      {children}
    </button>
  );
};
