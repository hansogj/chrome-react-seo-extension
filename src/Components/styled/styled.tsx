import styled, { css } from "styled-components";
import turntable from "../../assets/tt-close.3.jpg";
import { h, link } from "./fonts";
import {
  base,
  borderRadius,
  colors,
  fontSizes,
  micro,
  Padded,
  Size,
} from "./variables";

export const shade = css`
  box-shadow: ${borderRadius.medium} ${borderRadius.small} ${borderRadius.small}
    ${colors.darkShade};
`;

export const size = css<Size>`
  width: ${(props) =>
    props.width ? `calc(${base} * ${props.width})` : "auto"};
  height: ${(props) =>
    props.height ? `calc(${base} * ${props.height})` : "auto"};
`;

export const padded = css<Padded>`
  padding: ${({ padding = [] }: Padded) =>
    padding.map((p) => `${p}px`).join(" ")}};
`;

export const contentKidStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: ${fontSizes.medium};
  color: ${colors.dark};
`;

export const Container = styled.div`
  ${h};
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
  width: auto;
  ${contentKidStyle};
  ${(props) =>
    props.filled &&
    `
    border-radius: ${borderRadius.medium};
    background-color: ${colors.kindOfBlue};
    color: ${colors.bright};
    `};
`;
export const Column = styled.div<Size & Padded>`
  ${size};
  ${padded};
  display: flex;
  flex-direction: column;
  margin: 0;
  justify-content: space-between;
`;

export const Row = styled.div<Size & Padded>`
  ${size};
  ${padded};
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  margin: ${micro} 0;
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
