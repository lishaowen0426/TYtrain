import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
//import '../../styles/checkbox.css';

export const TyFormCheckBox = ({ id, label, ...props }) => {
    return (
      <div className="form-check">
        <input type="checkbox" id={id} className="form-check-input  bg-sky-500" {...props} />
        <label className="form-check-label font-ty text-1xl" htmlFor={id}>
          {label}
        </label>
      </div>
    );
  };
  