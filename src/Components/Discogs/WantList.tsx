import React, { FC } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { WantList, WantListItem } from "../../domain";
import { RootState } from "../../redux";
import { getWantList, StateProps } from "../../redux/selectors";
import {
  colors,
  base,
  Column,
  ContentBody,
  borderRadius,
  Row,
  shade,
  spacings,
} from "../styled";

export interface Props {
  wantList: WantList;
}

const Thumb = styled.img`
  height: calc(${base} * 6);
  width: calc(${base} * 6);
  ${shade};
`;

const ReleaseCol = styled(Column)`
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
const WantListComponent: FC<Props> = ({ wantList }: Props) => {
  return (
    <ContentBody filled>
      <Row>
        {Object.entries(wantList!)
          .filter((_, i) => i < 100)
          .map(
            (
              [master_id, { title, thumb, master_url, artists, year }]: [
                string,
                WantListItem
              ],
              i: number
            ) => (
              <ReleaseCol key={master_id} width={12} height={8}>
                <a {...{ href: `http://www.discogs.com/master/${master_id}` }}>
                  <Row>
                    <Column width={6} className="thumbContainer">
                      <Thumb src={thumb} alt={title} />
                    </Column>
                    <Column width={5}>
                      <Row>
                        <Column>
                          {artists.map(({ name }) => name).join("/")}
                          <br />
                          <i>{title}</i>
                          <br />
                          {year}
                        </Column>
                      </Row>
                    </Column>
                  </Row>
                </a>
              </ReleaseCol>
            )
          )}
      </Row>
    </ContentBody>
  );
};
export default WantListComponent;
