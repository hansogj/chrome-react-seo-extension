import { FC } from "react";
import { Column, Row, Thumb } from "../../styled";
import { ReleaseCol } from "./style";
import { Item } from "./utils";
type Props = { entries: Item[] };

const List: FC<Props> = ({ entries }: Props) => (
  <Row>
    {entries.map(([wantListId, { title, thumb, artists, year }]: Item) => (
      <ReleaseCol key={wantListId} width={12} height={8}>
        <a {...{ href: `http://www.discogs.com/${wantListId}` }}>
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
                  <br />
                </Column>
              </Row>
            </Column>
          </Row>
        </a>
      </ReleaseCol>
    ))}
  </Row>
);

export default List;
