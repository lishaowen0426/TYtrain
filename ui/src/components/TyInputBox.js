import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const TyFormInputBox = ({ id, label, layout, validate, ...props }) => {
    const [error, setError] = useState('');
    const [hasText, setHasText] = useState(false);
    const isHorizontal = layout === 'horizontal';

    const handleChange = (event) => {
        const value = event.target.value;
        setHasText(value.length > 0); // Update hasText based on whether the input has text

        if (validate) {
            const validationResult = validate(value);
            setError(validationResult);
        }

        if (props.onChange) {
            props.onChange(event);
        }
    };

    return (
      <div className={`form-group ${isHorizontal ? 'd-flex align-items-center' : ''}`}>
        {label && (
          <label htmlFor={id} className={`font-ty text-1xl ${isHorizontal ? 'me-2' : 'mb-1'}`}>
            {label}
          </label>
        )}
        <input 
          type="text"
          id={id}
          className={`form-control ty-checkbox font-ty ${error ? 'is-invalid' : ''} ${hasText ? 'bg-sky-000' : 'bg-sky-100'} ${isHorizontal ? 'flex-grow-1' : ''}`}
          onChange={handleChange}
          {...props}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    );
};
