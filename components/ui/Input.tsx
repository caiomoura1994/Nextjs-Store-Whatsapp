import { forwardRef } from "react";
import styled, { css } from "styled-components";

const StyledInputContainer = styled.div<any>`
  position: relative;
  width: 100%;
  height: 4rem;
  line-height: 4rem;
  label {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    color: ${({ theme }) => theme.colors.gray.DEFAULT};
    transition: 0.2s all;
    cursor: text;
  }
  input {
    width: 100%;
    outline: 0;
    padding: 0.75rem 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.gray.DEFAULT};
    ::placeholder {
      color:${({ theme }) => theme.colors.gray.DEFAULT};
      font-size: 1rem;
      opacity: 1;
    }
    box-shadow: none;
    color: #111;
    border-radius: 0.5rem;
  }

  ${({ errors }) => errors && css`
    input {
      outline: 0;
      color: #ff2300;
      border-color: #ff2300;
    }
  `}
  input:focus~label,
  input:valid~label {
    font-size: 1rem; 
    color: ${({ theme }) => theme.colors.green.light};
    border-color: ${({ theme }) => theme.colors.green.light};   
    top: -24px;
  }
`;

const Error = styled.span`
  color: #ff2300;
`;

function Input({ label, isRequired = false, id, errors, ...props }) {
  const showErrors = errors && errors[id]
  return (
    <>
      <StyledInputContainer errors={showErrors}>
        <input placeholder={label} type="text" id={id} required={isRequired} {...props} />
        {/* <label htmlFor={id}>{label}</label> */}
      </StyledInputContainer>
      <Error>{showErrors && `${label?.split("*")[0]} é obrigatório.`}</Error>
    </>
  )
}

export default forwardRef(Input)