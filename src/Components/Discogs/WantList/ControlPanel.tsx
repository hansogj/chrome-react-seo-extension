import React, { FC } from "react";
import { DispatchAction } from "../../../redux/store";
import { Button, Column, Row, Select } from "../../styled";
import { SortMethod, sortMethods, SortMethods } from "./utils";

export type Props = {
  syncWantList: DispatchAction<void>;
  sortMethod: keyof SortMethods;
  selectSortMethod: (sortMethod: SortMethod) => void;
};
const ControlPanel: FC<Props> = ({
  syncWantList,
  selectSortMethod,
  sortMethod,
}: Props) => (
  <Row>
    <Column width={4}>
      <Button>&lt;</Button>
    </Column>
    <Column width={6} center></Column>
    <Column width={4}>
      <Button>&gt;</Button>
    </Column>
    <Column width={15} center>
      <Select
        value={sortMethod}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          selectSortMethod(e.target.value as SortMethod);
        }}
        width={12}
      >
        {Object.keys(sortMethods).map((sm) => (
          <option key={`sort-method-${sm}`} value={sm}>
            {sm === sortMethod && "Sort by "}
            {sm}
          </option>
        ))}
      </Select>
    </Column>
    <Column width={9}></Column>
    <Column width={5}>
      <Button onClick={() => syncWantList()}>SYNC</Button>
    </Column>
  </Row>
);

export default ControlPanel;
