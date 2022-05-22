import maybe from "maybe-for-sure";
import React, { FC, useState } from "react";
import { Eye } from "../../../assets/icons";
import { WantList } from "../../../domain";
import { DispatchAction } from "../../../redux/store";
import { colors, Column, ContentBody, Row, Submit } from "../../styled";
import ControlPanel from "./ControlPanel";
import List from "./List";
import { entriesFrom, filteredAndSorted, SortMethod } from "./utils";

export interface Props {
  wantList: WantList;
  syncWantList: DispatchAction<void>;
  isSyncing: boolean;
}

const WantListComponent: FC<Props> = ({
  wantList,
  syncWantList,
  isSyncing,
}: Props) => {
  const [sortMethod, selectSortMethod] = useState<SortMethod>("Added (rev)");
  const [pageSize, setPageSize] = useState<number>(25);
  const [pageNr, setPage] = useState<number>(0);
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
            Want list filtered on {pageSize} of{" "}
            {Object.entries(wantList).length} unique entities
          </h3>
        </Column>
        <Column width={6}>
          <Submit disabled={isSyncing} onClick={() => syncWantList()}>
            <Eye {...{ fill: colors.bright }} />
            Sync
          </Submit>
        </Column>
      </Row>
      <ControlPanel
        {...{
          syncWantList,
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
            syncWantList,
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
