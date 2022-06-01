import React, { useState } from 'react';
import './form-input.styles.scss';

const FormInput = ({ label, errorMessage = '',...otherProps }) => {
  const [focused, setFocused] = useState(false);
  const handleFocus = () => setFocused(true);

  return (
    <div className="group">

      <input className="form-input" { ...otherProps }
             onBlur={ handleFocus } focused={otherProps.value.length && focused.toString() }
             onFocus={() => otherProps.name === 'confirmPassword' && setFocused(true)}
      />

      { label && <label className={ `${ otherProps.value.length ? 'shrink' : '' } form-input-label` }>
        { label }
      </label>
      }

      <span className='span'>{ errorMessage }</span>

    </div>
  );
};

export default FormInput;