import React, { useState, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  margin-bottom: 10px;
`;

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <StyledButton onClick={toggleVisibility}>
          {props.buttonLabel}
        </StyledButton>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <StyledButton onClick={toggleVisibility}>cancel</StyledButton>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = 'Togglable';
export default Togglable;
