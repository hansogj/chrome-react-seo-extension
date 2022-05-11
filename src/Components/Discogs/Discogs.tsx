import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Collection, Eye, List } from "../../assets/icons";
import { User } from "../../domain";
import { RootState } from "../../redux";
import { DispatchAction } from "../../redux/discogs";
import * as actions from "../../redux/discogs/discogs.actions";
import {
  DispatchProps,
  getFields,
  getFolders,
  getReleaseInView,
  getSelectedFields,
  getUser,
  getWantList,
  StateProps,
} from "../../redux/selectors";
import { colors, Column, ContentBody, Row } from "../styled";
import ActionButton from "./ActionButton";
import AddToFolder, { Props as AddToFolderProps } from "./AddToFolder";
import ViewSelector, { View } from "./ViewSelector";
import WantListComponent, { Props as WantListProps } from "./WantList";

interface DiscProps extends AddToFolderProps, WantListProps {
  user: Optional<User>;
  filterReleases: DispatchAction<void>;
  filterSellers: DispatchAction<void>;
  getCurrentMaster: DispatchAction<void>;
}

const DiscogsContainer: FC<DiscProps> = ({
  user,
  folders,
  fields,
  wantList,
  filterReleases,
  filterSellers,
  selectedFields,
  releaseInView,
  getCurrentMaster,
  setSelectedFields,
  addToFolder,
}: DiscProps) => {
  const [activeView, setView] = useState<View>("Add item");

  useEffect(() => {
    if (activeView === "Add item") {
      getCurrentMaster();
    }
  }, [activeView, getCurrentMaster]);

  return (
    <ContentBody>
      <ViewSelector {...{ activeView, setView }} />
      {activeView === "Actions" && (
        <>
          <Row>
            <Column>
              <ActionButton
                {...{
                  style: { backgroundColor: colors.dread },
                  onClick: () => filterSellers(),
                }}
              >
                Filter seller
              </ActionButton>
            </Column>
            <Column>
              <ActionButton {...{ onClick: () => filterReleases() }}>
                Filter Releases
              </ActionButton>
            </Column>
          </Row>
          <Row>
            <Column>{JSON.stringify(user, null, 4)}</Column>
          </Row>
        </>
      )}

      {activeView === "Want list" && wantList && (
        <WantListComponent {...{ wantList }} />
      )}
      {activeView === "Add item" && (
        <AddToFolder
          {...{
            folders,
            fields,
            selectedFields,
            setSelectedFields,
            releaseInView,
            addToFolder,
          }}
        />
      )}
    </ContentBody>
  );
};

export const mapStateToProps = (
  state: RootState
): StateProps<Partial<DiscProps>> => ({
  user: getUser(state),
  folders: getFolders(state),
  wantList: getWantList(state),
  fields: getFields(state),
  selectedFields: getSelectedFields(state),
  releaseInView: getReleaseInView(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps<DiscProps> =>
  ({
    filterReleases: bindActionCreators(actions.filterReleases, dispatch),
    filterSellers: bindActionCreators(actions.filterSellers, dispatch),
    setSelectedFields: bindActionCreators(actions.setSelectedFields, dispatch),
    getCurrentMaster: bindActionCreators(actions.getCurrentMaster, dispatch),
    addToFolder: bindActionCreators(actions.addToFolder, dispatch),
  } as DiscProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscogsContainer as FC<Partial<DiscProps>>);
