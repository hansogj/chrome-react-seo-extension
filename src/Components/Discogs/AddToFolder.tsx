import React, { FC } from "react";
import { InventoryFields } from "../../domain/InventoryFields";
import { Column, ContentBody, Row } from "../styled";
import ActionButton from "./ActionButton";
import ListFolders, { Props as ListFoldersProps } from "./ListFolders";
import ListFields, { Props as ListFieldsProps } from "./ListFields";

export interface Props extends ListFoldersProps, ListFieldsProps {}

const AddToFolderComponent: FC<Props> = ({ folders, fields }: Props) => {
  return (
    <ContentBody filled>
      <Row>
        <Column>
          <ListFolders folders={folders} />
        </Column>
      </Row>
      <ListFields fields={fields} />
      <Row>
        <Column>
          <ActionButton>Add</ActionButton>
        </Column>
      </Row>
    </ContentBody>
  );
};

export default AddToFolderComponent;
