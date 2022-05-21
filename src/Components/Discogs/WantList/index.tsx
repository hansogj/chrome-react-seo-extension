import maybe from "maybe-for-sure";
import React, { FC, useState } from "react";
import { WantList } from "../../../domain";
import { empty } from "../../../services/utils/json.utils";
import { Column, ContentBody, Row } from "../../styled";
import ControlPanel, { Props as ControlPanelProps } from "./ControlPanel";
import List from "./List";
import { SortMethod } from "./utils";

export interface Props extends Pick<ControlPanelProps, "syncWantList"> {
  wantList: WantList;
}

const WantListComponent: FC<Props> = ({ wantList, syncWantList }: Props) => {
  const [sortMethod, selectSortMethod] = useState<SortMethod>("Name");

  return (
    <ContentBody filled>
      <Row>
        <Column width={37}>
          <h3>Want list filtered on unique entities</h3>
        </Column>
      </Row>
      <ControlPanel {...{ syncWantList, selectSortMethod, sortMethod }} />
      {maybe(wantList)
        .nothingIf(empty)
        .map(Object.entries)
        .map((entries) => <List {...{ entries, sortMethod }} />)
        .valueOr(<></>)}
    </ContentBody>
  );
};
export default WantListComponent;
