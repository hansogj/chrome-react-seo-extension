import styled, { css } from "styled-components";
import {
  base,
  borderRadius,
  colors,
  fontSizes,
  micro,
  spacings,
} from "../styled";
const inputStyle = css`
  background: ${colors.bright};
  border-radius: ${borderRadius.medium};
  border: ${colors.bright} ${micro} outset;
  box-sizing: border-box;
  color: ${colors.kindOfBlue};
  display: inline-block;
  font-family: inherit;
  font-size: ${fontSizes.medium};
  letter-spacing: 0.01em;
  line-height: normal;
  margin: ${base};
  overflow: visible;
  padding: ${spacings.small} ${spacings.medium};
  text-align: center;
  text-decoration: none;

  text-transform: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  box-shadow: ${borderRadius.medium} ${borderRadius.small} ${borderRadius.small}
    ${colors.darkShade};
  &:hover {
    filter: brightness(125%);
  }
  &:active,
  &:focus-visible {
    border: ${colors.dark} ${micro} inset;
    box-shadow: none;
  }
`;

export const Button = styled.button<{
  color?: string;
  background?: string;
}>`
  ${inputStyle};
  text-shadow: 0 1px 1px ${colors.darkShade};
  cursor: pointer;
`;

export const Select = styled.select`
  ${inputStyle}
  text-align: right;
`;
/* `
  font-size: ${fontSizes.medium};
  line-height: 1.15;
  text-transform: none;
  font-family: Helvetica, Arial, sans-serif;
  letter-spacing: 0.01em;
  padding: calc(${base} / 2);
  box-shadow: inset 0 1px 3px ${colors.darkShade};
  border-radius: calc(${base} / 3);
  vertical-align: middle;
  box-sizing: border-box;
  height: 2.25em;
  border: 1px solid ${colors.black};
  background-color: ${colors.dark};
  color: ${colors.white};
  display: block;
  margin: 0.25em 0;
` */

export const Input = styled.input<{ width?: number }>`
  ${inputStyle}
  max-width: ${(props) =>
    props.width ? `calc(${base} * ${props.width})` : "100%"};
`;
