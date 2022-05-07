import styled, { css } from "styled-components";
import turntable from "../assets/tt-close.3.jpg";

export const base = "12px";
export const micro = "2px";

export const colors = {
  bright: "#6793a7",
  dark: "#282c34",
  darkShade: "#030405",
  black: "#111",
  white: "#ddd",
  shade: "#aaa",
  dread: "#880000",
  kindOfBlue: "#123654",
};

export const fontSizes = {
  small: base,
  medium: `calc(${base} + ${micro})`,
  large: `calc(${base} * 1.5)`,
};

export const borderRadius = {
  small: `calc(${base} / 2)`,
  medium: `calc(${base} / 1.5)`,
  large: base,
};

export type Size = { width?: number; height?: number };
export const spacings = {
  ...borderRadius,
};

const link = css`
  a {
    color: ${colors.bright};
    &:active,
    &:hover {
      color: ${colors.darkShade};
    }
    &:active {
      text-decoration: none;
    }
  }
`;

export const shade = css`
  box-shadow: ${borderRadius.medium} ${borderRadius.small} ${borderRadius.small}
    ${colors.darkShade};
`;

export const size = css<Size>`
  max-width: ${(props) =>
    props.width ? `calc(${base} * ${props.width})` : "100%"};
  max-height: ${(props) =>
    props.height ? `calc(${base} * ${props.height})` : "100%"};
`;

export const contentKidStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: ${fontSizes.medium};
  color: ${colors.dark};
`;

export const Container = styled.div`
  font-size: ${fontSizes.medium};
  background-color: ${colors.dark};
  padding: ${base};
  ${link}
`;

export const Content = styled.div`
  border-radius: ${borderRadius.medium};
  border: 1px solid ${colors.black};
  color: ${colors.dark};
  background-image: url(${turntable});
  background-size: auto;
`;

export const ContentBody = styled.div<{ filled?: boolean }>`
  margin-top: ${base};
  padding: 0 ${base};
  align-items: start;
  ${contentKidStyle};
  ${(props) =>
    props.filled &&
    `
    border-radius: ${borderRadius.medium};
    background-color: ${colors.kindOfBlue};
    color: ${colors.bright};
    `};
`;
export const Column = styled.div<Size>`
  ${size};
  display: flex;
  flex-direction: column;
  margin: 0;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  margin: ${micro} 0;
  width: 100%;
`;

export const Card = styled.div`
  background-color: ${(props) =>
    props.color ? props.color : colors.kindOfBlue};
  color: ${(props) => (props.color ? props.color : colors.bright)};
  padding: ${base};
  width: calc(${base} * 20);
  border-radius: ${borderRadius.medium};
  padding: ${base};
  height: 100%;
`;
