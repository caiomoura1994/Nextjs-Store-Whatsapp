import styled from "styled-components"

const Styles = styled.label`
display: block;
position: relative;
padding-left: 1.5rem;
margin-bottom: 1rem;
cursor: pointer;
font-size: 1rem;
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;

input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 1rem;
  width: 1rem;
  /* background-color: #eee; */
  border-color:#eee;
  border: solid;
  border-width: 1px;
  border-radius: 4px;
}


 input:checked ~ .checkmark {
  border: unset;
  background-color: ${({ theme }) => theme.colors.green.light};
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

input:checked ~ .checkmark:after {
  display: block;
}

.checkmark:after {
  left: 0.3rem;
  top: 0.2rem;
  width: 0.2rem;
  height: 0.4rem;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
`;
export default function CheckboxUi({ text, isChecked = false, onClick, onChange = () => { } }) {
  return (
    <Styles className="container">
      {text}
      <input type="checkbox" checked={isChecked} onClick={onClick} onChange={onChange} />
      <span className="checkmark"></span>
    </Styles>
  )
}

