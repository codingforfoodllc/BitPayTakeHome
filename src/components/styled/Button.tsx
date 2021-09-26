import styled from "styled-components";
export interface ButtonProps {
  danger?: boolean;
}

const Button = styled.button<ButtonProps>`
  color: white;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-right: 0.25rem;
  /* background-color: ${(props) => (props.danger ? "red" : "#ff7d69")}; */
  background-color: ${(props) => (props.danger ? "#FF0000" : "#fc5f47")};
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  font-weight: 400;
  border-radius: 0.25rem;
  font-weight: 600;
  cursor: pointer;
  :hover {
    background-color: ${(props) => (props.danger ? "#ff4646" : "#fc7c68")};
  }
`;

export default Button;
