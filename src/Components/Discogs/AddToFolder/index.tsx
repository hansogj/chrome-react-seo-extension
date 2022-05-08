import React, { FC } from "react";
import { Column, ContentBody, Row } from "../../styled";
import ActionButton from "../ActionButton";
import ListFields, { Props as ListFieldsProps } from "./ListFields";
import ListFolders, { Props as ListFoldersProps } from "./ListFolders";

export interface Props extends ListFoldersProps, ListFieldsProps {}

const AddToFolderComponent: FC<Props> = ({
  folders,
  fields,
  ...props
}: Props) => {
  const item = "[DENNE SKIVA]";

  return (
    <ContentBody filled>
      <h3>Add {item} to folder</h3>
      <ListFolders {...{ folders, ...props }} />
      <ListFields {...{ fields, ...props }} />
      <Row width={44}>
        <Column>
          <ActionButton onClick={console.log}>Add</ActionButton>
        </Column>
      </Row>
    </ContentBody>
  );
};

export default AddToFolderComponent;
