import * as React from "react";

export const TySubmitButton = ({ children, ...props }) => {
  const defaultClassName =
    "ty-button-reset bg-sky-400 hover:brightness-75 rounded-1 text-white font-normal text-center leading-[1.1] shadow-[0_6px_#998] active:duration-[0.4s] active:shadow-[0_4px_#998] active:translate-y-[2px]";

  return (
    <button type="button" {...props} className={defaultClassName}>
      {children}
    </button>
  );
};

export const TyIconButton = () => {
  return (
    <div className="box-border flex flex-nowrap flex-row">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        fill="none"
      >
        <g clip-path="url(#clip0_15_3)">
          <rect width="24" height="24" fill="white" />
          <path
            d="M9 21H4C3.44772 21 3 20.5523 3 20V12.4142C3 12.149 3.10536 11.8946 3.29289 11.7071L11.2929 3.70711C11.6834 3.31658 12.3166 3.31658 12.7071 3.70711L20.7071 11.7071C20.8946 11.8946 21 12.149 21 12.4142V20C21 20.5523 20.5523 21 20 21H15M9 21H15M9 21V15C9 14.4477 9.44772 14 10 14H14C14.5523 14 15 14.4477 15 15V21"
            stroke="#000000"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_15_3">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <button
        type="button"
        class="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2"
      >
        我的
      </button>
    </div>
  );
};
