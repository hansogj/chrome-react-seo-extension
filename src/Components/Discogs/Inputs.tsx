import styled, { css } from "styled-components";
import {
  base,
  borderRadius,
  colors,
  fontSizes,
  micro,
  shade,
  Size,
  size,
  spacings,
} from "../styled";
const inputStyle = css`
  ${shade}
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
  &:hover {
    filter: brightness(125%);
  }
  &:active,
  &:focus-visible {
    border: ${colors.dark} ${micro} inset;
    box-shadow: none;
  }
`;

const activeButton = css`
  background: ${colors.kindOfBlue};
  border-radius: ${borderRadius.medium};
  border: ${colors.bright} ${micro} outset;
  box-sizing: border-box;
  color: ${colors.bright};
`;

export const Button = styled.button<{
  color?: string;
  background?: string;
  active?: boolean;
}>`
  ${inputStyle};
  ${(props) => props.active && activeButton}
  text-shadow: 0 1px 1px ${colors.darkShade};
  cursor: pointer;
`;

export const Select = styled.select`
  ${inputStyle}
  text-align: right;
`;

export const Input = styled.input<Size>`
  ${inputStyle}
  ${size}
`;
