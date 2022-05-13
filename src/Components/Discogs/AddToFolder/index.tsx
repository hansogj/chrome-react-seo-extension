import maybe from "maybe-for-sure";
import React, { FC } from "react";
import { ReleaseInView } from "../../../domain";
import { DispatchAction } from "../../../redux/folders";
import { Column, ContentBody, Line, Row } from "../../styled";
import ActionButton from "../ActionButton";
import CurrentMaster from "./CurrentMaster";
import ListFields, { Props as ListFieldsProps } from "./ListFields";
import ListFolders, { Props as ListFoldersProps } from "./ListFolders";

export interface Props extends ListFoldersProps, ListFieldsProps {
  releaseInView: ReleaseInView;
  addToFolder: DispatchAction<number>;
}

const AddToFolderComponent: FC<Props> = ({
  folders,
  fields,
  releaseInView,
  addToFolder,
  ...props
}: Props) => (
  <ContentBody filled>
    <>
      {maybe(releaseInView)
        .mapTo("master")
        .map((currentMaster) => (
          <>
            <CurrentMaster {...{ currentMaster }} />
            <Line />
          </>
        ))
        .valueOr(<></>)}
      <Row padding={[12, 0]}>
        <Column width={21}>
          <ListFolders {...{ folders, ...props }} />
        </Column>
        <Column width={18} />
        {maybe(releaseInView)
          .mapTo("releaseId")
          .map((it) => (
            <Column>
              <ActionButton onClick={() => addToFolder(it)}>(+)</ActionButton>
            </Column>
          ))
          .valueOr(<></>)}
      </Row>
      <ListFields {...{ fields, ...props }} />
      <Row width={44}></Row>
    </>
  </ContentBody>
);

export default AddToFolderComponent;
