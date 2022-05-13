import maybe from "maybe-for-sure";
import React, { FC } from "react";
import styled from "styled-components";
import { ReleaseInView } from "../../../domain";
import { DispatchAction } from "../../../redux/folders";
import {
  BrightCard,
  Column,
  ContentBody,
  Row,
  base,
  colors,
} from "../../styled";
import ActionButton from "../ActionButton";
import CurrentMaster from "./CurrentMaster";
import ListFields, { Props as ListFieldsProps } from "./ListFields";
import ListFolders, { Props as ListFoldersProps } from "./ListFolders";

export interface Props extends ListFoldersProps, ListFieldsProps {
  releaseInView: ReleaseInView;
  addToFolder: DispatchAction<number>;
}

const AddButton = styled(ActionButton)`
  background-color: ${colors.blueInTheGreen};
  color: ${colors.kindOfBlue};
`;

const AddToFolderComponent: FC<Props> = ({
  folders,
  fields,
  releaseInView,
  addToFolder,
  ...props
}: Props) => (
  <ContentBody filled>
    <BrightCard>
      {maybe(releaseInView)
        .mapTo("master")
        .map((currentMaster) => <CurrentMaster {...{ currentMaster }} />)
        .valueOr(<></>)}
    </BrightCard>
    <BrightCard style={{ marginTop: base }}>
      <Row padding={[1, 0]} width={42}>
        <Column width={21}>
          <ListFolders {...{ folders, ...props }} />
        </Column>
        <Column width={18} />
        {maybe(releaseInView)
          .mapTo("releaseId")
          .map((it) => (
            <Column padding={[1, 0, 0, 0]}>
              <AddButton onClick={() => addToFolder(it)}>(+)</AddButton>
            </Column>
          ))
          .valueOr(<></>)}
      </Row>
      <ListFields {...{ fields, ...props }} />
    </BrightCard>
  </ContentBody>
);

export default AddToFolderComponent;
