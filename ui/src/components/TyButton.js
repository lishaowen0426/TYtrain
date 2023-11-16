import * as React from "react";
import { Button } from "react-bootstrap";

export const TySubmitButton = ({ children, ...props }) => {
  const defaultClassName =
    "ty-button-reset bg-sky-400 hover:brightness-75 rounded-1 text-white font-normal text-center leading-[1.1] shadow-[0_6px_#998] active:duration-[0.4s] active:shadow-[0_4px_#998] active:translate-y-[2px]";

  return (
    <button type="button" {...props} className={defaultClassName}>
      {children}
    </button>
  );
};

const TyDownArrow = () => {
  return (
    <svg
      className="self-center basis-sm h-sm"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
        fill="#cfcfd2"
      />
    </svg>
  );
};

const TyNaviIcon = ({ children, ml, ...props }) => {
  return (
    <svg
      className={"basis-sm h-sm self-center "}
      style={{ marginLeft: ml }}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      {children}
    </svg>
  );
};

export const TyIconButton = ({ children, svg, content, ml = 10, ...props }) => {
  const arrayChildren = React.Children.toArray(children);

  const [expand, setExpand] = React.useState(false);

  const handleClick = event => {
    setExpand(!expand);
  };

  return (
    <div>
      <button
        type="button"
        className="font-ty box-border border-solid border-[0px] flex flex-row flex-nowrap items-center justify-between
      w-full gap-sm text-jumbo-500 h-2
      "
        onClick={handleClick}
      >
        <TyNaviIcon ml={ml}>{svg}</TyNaviIcon>
        <span className="flex-grow flex-shrink-0 text-left  self-center font-normal text-sm">
          {content}
        </span>
        {children ? <TyDownArrow /> : undefined}
      </button>
      {expand
        ? React.Children.map(arrayChildren, (children, index) => {
            return;
          })
        : undefined}
    </div>
  );
};

const calendar = (
  <path
    fill="currentColor"
    d="M6 1a1 1 0 0 0-2 0h2ZM4 4a1 1 0 0 0 2 0H4Zm7-3a1 1 0 1 0-2 0h2ZM9 4a1 1 0 1 0 2 0H9Zm7-3a1 1 0 1 0-2 0h2Zm-2 3a1 1 0 1 0 2 0h-2ZM1 6a1 1 0 0 0 0 2V6Zm18 2a1 1 0 1 0 0-2v2ZM5 11v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 11v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 15v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 15v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 11v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM5 15v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM2 4h16V2H2v2Zm16 0h2a2 2 0 0 0-2-2v2Zm0 0v14h2V4h-2Zm0 14v2a2 2 0 0 0 2-2h-2Zm0 0H2v2h16v-2ZM2 18H0a2 2 0 0 0 2 2v-2Zm0 0V4H0v14h2ZM2 4V2a2 2 0 0 0-2 2h2Zm2-3v3h2V1H4Zm5 0v3h2V1H9Zm5 0v3h2V1h-2ZM1 8h18V6H1v2Zm3 3v.01h2V11H4Zm1 1.01h.01v-2H5v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H5v2h.01v-2ZM9 11v.01h2V11H9Zm1 1.01h.01v-2H10v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM9 15v.01h2V15H9Zm1 1.01h.01v-2H10v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM14 15v.01h2V15h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM14 11v.01h2V11h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM4 15v.01h2V15H4Zm1 1.01h.01v-2H5v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H5v2h.01v-2Z"
  />
);
const home = (
  <path
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9"
  />
);
const course = (
  <path
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M1 17V2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M5 15V1m8 18v-4"
  />
);
const cash = (
  <path
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
  />
);

const indentation = 20;

const renderButton = ({ svg, content, children }, ml) => {
  return (
    <TyIconButton svg={svg} content={content} ml={ml}>
      {children.map(c => {
        renderButton(c, ml + indentation);
      })}
    </TyIconButton>
  );
};

export const TyNavi = props => {
  const [expand, setExpand] = React.useState(false);

  const handleExpand = event => {};

  return (
    <div className="box-border border-solid border-r-[2px] border-r-jumbo-200 flex flex-col w-[13%] bg-jumbo-50 ">
      <TyIconButton svg={calendar} content="日历">
        <TyIconButton svg={course} content="课程" />
        <TyIconButton svg={cash} content="充值" />
      </TyIconButton>
      <TyIconButton svg={home} content="我的" />
    </div>
  );
};
