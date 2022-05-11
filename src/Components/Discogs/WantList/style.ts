import styled from "styled-components";
import { WantList } from "../../../domain";
import {
  base,
  borderRadius,
  colors,
  Column,
  shade,
  spacings,
} from "../../styled";

export interface Props {
  wantList: WantList;
}

export const Thumb = styled.img`
  height: calc(${base} * 6);
  width: calc(${base} * 6);
  ${shade};
`;

export const ReleaseCol = styled(Column)`
  padding: ${base};
  margin-top: calc(${base} / 2);
  overflow: hidden;
  border-radius: ${borderRadius.small};
  background-color: ${colors.bright};

  &:hover {
    visible: none;
    overflow: visible;
    filter: brightness(85%);
  }
  .thumbContainer {
    margin-right: ${spacings.medium};
  }

  a {
    color: ${colors.dark};
    width: calc(${base} * 12);
    &:hover {
      ${shade}
      border-radius: ${borderRadius.small};
      width: calc(${base} * 14);
      color: ${colors.dark};
      display: inline-block;
      background-color: ${colors.bright};
      filter: brightness(85%);
      padding: ${base};
    }
  }
`;