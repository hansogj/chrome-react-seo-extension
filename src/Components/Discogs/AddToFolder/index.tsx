import React, { FC } from "react";
import styled from "styled-components";
import { MasterRelease } from "../../../domain";
import { colors, Column, ContentBody, Line, Row, spacings } from "../../styled";
import ActionButton from "../ActionButton";
import CurrentMaster from "./CurrentMaster";
import ListFields, { Props as ListFieldsProps } from "./ListFields";
import ListFolders, { Props as ListFoldersProps } from "./ListFolders";

export interface Props extends ListFoldersProps, ListFieldsProps {
  currentMaster: MasterRelease;
}

const AddToFolderComponent: FC<Props> = ({
  folders,
  fields,
  currentMaster,
  ...props
}: Props) => {
  return (
    <ContentBody filled>
      <>
        <CurrentMaster {...{ currentMaster }} />
        <Line />
        <Row padding={[12, 0]}>
          <Column width={21}>
            <ListFolders {...{ folders, ...props }} />
          </Column>
          <Column width={18} />
          <Column>
            <ActionButton onClick={console.log}>Add</ActionButton>
          </Column>
        </Row>
        <ListFields {...{ fields, ...props }} />
        <Row width={44}></Row>
      </>
    </ContentBody>
  );
};

export default AddToFolderComponent;
