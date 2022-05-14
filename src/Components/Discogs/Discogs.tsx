import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { User } from "../../domain";
import { RootState } from "../../redux";
import {
  actions as discogsActions,
  DispatchAction as DiscogsDispatch,
} from "../../redux/discogs";
import { actions as foldersActions } from "../../redux/folders";
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
import { ContentBody } from "../styled";
import AddToFolder, { Props as AddToFolderProps } from "./AddToFolder";
import AddWantList, { Props as AddWantListProps } from "./AddWantList";
import ViewSelector, { View } from "./ViewSelector";
import WantListComponent, { Props as WantListProps } from "./WantList";

interface DiscProps extends AddToFolderProps, WantListProps, AddWantListProps {
  user: Optional<User>;

  getCurrentMaster: DiscogsDispatch<void>;
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
      {activeView === "Watch" && (
        <AddWantList {...{ filterReleases, filterSellers }} />
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
    filterReleases: bindActionCreators(discogsActions.filterReleases, dispatch),

    filterSellers: bindActionCreators(discogsActions.filterSellers, dispatch),
    setSelectedFields: bindActionCreators(
      foldersActions.setSelectedFields,
      dispatch
    ),
    getCurrentMaster: bindActionCreators(
      discogsActions.getCurrentMaster,
      dispatch
    ),

    addToFolder: bindActionCreators(foldersActions.addToFolder, dispatch),
  } as DiscProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscogsContainer as FC<Partial<DiscProps>>);
