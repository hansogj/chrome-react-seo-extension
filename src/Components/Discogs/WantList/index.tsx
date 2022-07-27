import maybe from "maybe-for-sure";
import { FC, useState } from "react";
import { WantList } from "../../../domain";
import { renderText } from "../../../services/texts";
import { Column, ContentBody, Row } from "../../styled";
import ControlPanel from "./ControlPanel";
import List from "./List";
import { entriesFrom, filteredAndSorted, SortMethod } from "./utils";

export interface Props {
  wantList: WantList;
}

const WantListComponent: FC<Props> = ({ wantList }: Props) => {
  const [sortMethod, selectSortMethod] = useState<SortMethod>("Added (rev)");
  const [pageSize, setPageSize] = useState<number>(25);
  const [pageNr, setPage] = useState<number>(0);
  const length = Object.entries(wantList).length;
  const wantListLength = maybe(entriesFrom(wantList))
    .map((it) => it.length)
    .valueOr(0);

  const turnPage = (dir: number) => {
    console.log(pageNr + dir);
    return setPage(pageNr + dir);
  };
  return (
    <ContentBody filled>
      <Row>
        <Column width={37}>
          <h3>
            {renderText("discogs.wantlist.header", {
              size: Math.min(pageSize, length),
              length: Object.entries(wantList).length,
            })}
          </h3>
        </Column>
      </Row>
      <ControlPanel
        {...{
          selectSortMethod,
          sortMethod,
          turnPage,
          pageSize,
          setPageSize,
          pageNr,
          wantListLength,
        }}
      />
      {maybe(filteredAndSorted(wantList, sortMethod, pageNr, pageSize))
        .map((entries) => <List {...{ entries }} />)
        .valueOr(<></>)}

      {pageSize > 99 && (
        <ControlPanel
          {...{
            selectSortMethod,
            sortMethod,
            turnPage,
            pageSize,
            setPageSize,
            pageNr,
            wantListLength,
          }}
        />
      )}
    </ContentBody>
  );
};
export default WantListComponent;
