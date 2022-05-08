import React, { FC } from "react";
import { WantList, WantListItem } from "../../../domain";
import { Column, ContentBody, Row } from "../../styled";
import { ReleaseCol, Thumb } from "./style";

export interface Props {
  wantList: WantList;
}
type Item = [string, WantListItem];

const sortByName = ([_, a]: Item, [__, b]: Item) =>
  a.artists[0].name > b.artists[0].name ? 1 : -1;

const WantListComponent: FC<Props> = ({ wantList }: Props) => {
  return (
    <ContentBody filled>
      <Row>
        {Object.entries(wantList!)
          .filter((_, i) => i < 100)
          .sort(sortByName)
          .map(([master_id, { title, thumb, artists, year }]: Item) => (
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
          ))}
      </Row>
    </ContentBody>
  );
};
export default WantListComponent;
