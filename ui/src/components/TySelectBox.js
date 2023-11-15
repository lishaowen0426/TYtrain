import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export const TyFormSelectBox = ({ id, label, options, layout, ...props }) => {
    const isHorizontal = layout === 'horizontal';

    return (
      <div className={`form-group ${isHorizontal ? 'd-flex align-items-center' : ''}`}>
        {label && (
          <label htmlFor={id} className={`form-check-label font-ty text-1xl ${isHorizontal ? 'me-2' : 'mb-1'}`}>
            {label}
          </label>
        )}
        <select id={id} className={`form-control font-ty bg-sky-100 ${isHorizontal ? 'flex-grow-1' : ''}`} {...props}>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
};
