import maybe, { Maybe } from "maybe-for-sure";
import React, { FC } from "react";
import { ReleasePageItem } from "../../../domain";
import { DispatchAction } from "../../../redux/store";
import {
  base,
  BrightCard,
  Column,
  ContentBody,
  Row,
  Submit,
} from "../../styled";
import ListReleasePageItem from "./ReleasePageItem";
import ListFields, { Props as ListFieldsProps } from "./ListFields";
import ListFolders, { Props as ListFoldersProps } from "./ListFolders";

export interface Props extends ListFoldersProps, ListFieldsProps {
  releasePageItem: ReleasePageItem;
  addToFolder: DispatchAction<number>;
  disableSubmitBtn: boolean;
}

const AddToFolderComponent: FC<Props> = ({
  folders,
  fields,
  releasePageItem,
  disableSubmitBtn,
  addToFolder,
  ...props
}: Props) => (
  <ContentBody filled>
    <BrightCard>
      {maybe(releasePageItem)
        .mapTo("master")
        .map((releasePageItem) => (
          <ListReleasePageItem {...{ releasePageItem }} />
        ))
        .valueOr(<></>)}
    </BrightCard>
    <BrightCard style={{ marginTop: base }}>
      <Row padding={[1, 0]} width={42}>
        <Column width={21}>
          <ListFolders {...{ folders, ...props }} />
        </Column>

        {maybe(releasePageItem)
          .map((it) => (
            <Column padding={[1, 0, 0, 0]}>
              <Submit
                disabled={disableSubmitBtn}
                onClick={() =>
                  maybe(it)
                    .mapTo("releaseId")
                    .map((id) => addToFolder(id))
                }
              >
                ADD (+)
              </Submit>
            </Column>
          ))
          .valueOr(<Column padding={[1, 0, 0, 0]}>:Master:</Column>)}
      </Row>
      <ListFields {...{ fields, ...props }} />
    </BrightCard>
  </ContentBody>
);

export default AddToFolderComponent;
