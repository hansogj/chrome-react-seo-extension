import maybe from "maybe-for-sure";
import React, { FC } from "react";
import { ReleasePageItem } from "../../../domain";
import { DispatchAction } from "../../../redux/store";
import { getText } from "../../../services/texts";
import { base, BrightCard, Column, Row, Submit } from "../../styled";
import ListFields, { Props as ListFieldsProps } from "./ListFields";
import ListFolders, { Props as ListFoldersProps } from "./ListFolders";

export interface Props extends ListFoldersProps, ListFieldsProps {
  releasePageItem: ReleasePageItem;
  addToFolder: DispatchAction<void>;
  disableSubmitBtn: boolean;
}

const AddToFolderComponent: FC<Props> = ({
  folders,
  fields,
  releasePageItem,
  disableSubmitBtn,
  addToFolder,
  ...props
}: Props) => {
  return (
    <BrightCard style={{ marginTop: base }}>
      <Row padding={[1, 0]} width={42}>
        <Column width={21}>
          <ListFolders {...{ folders, ...props }} />
        </Column>

        {maybe(releasePageItem)
          .map((it) => (
            <Column padding={[1, 0, 0, 0]}>
              <Submit disabled={disableSubmitBtn} onClick={() => addToFolder()}>
                {getText("discogs.add.to.folder.submit")}
              </Submit>
            </Column>
          ))
          .valueOr(<Column padding={[1, 0, 0, 0]}>:Master:</Column>)}
      </Row>
      <ListFields {...{ fields, ...props }} />
    </BrightCard>
  );
};

export default AddToFolderComponent;
