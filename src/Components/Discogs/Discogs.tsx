import React, { FC } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RootState } from "../../redux";
import { actions as appActions } from "../../redux/app";
import { actions as discogsActions } from "../../redux/discogs";
import { actions as foldersActions } from "../../redux/folders";
import {
  DispatchProps,
  getActiveView,
  getCollectableFolders,
  isSyncing,
  getFields,
  getReleasePageItem,
  getSelectedFields,
  getWantList,
  StateProps,
} from "../../redux/selectors";
import { actions as wantListActions } from "../../redux/wantlist";
import { ContentBody } from "../styled";
import AddToFolder, { Props as AddToFolderProps } from "./AddToFolder";
import AddWantList, { Props as AddWantListProps } from "./AddWantList";
import { disableSubmitBtn } from "./selectors";
import ViewSelector, { Props as ViewSelectorProps } from "./ViewSelector";
import WantListComponent, { Props as WantListProps } from "./WantList";

import ReleasePageItem, {
  Props as ReleasePageItemProps,
} from "./ReleasePageItem";
import Settings, { Props as SettingsProps } from "./Settings";

interface DiscProps
  extends AddToFolderProps,
    ReleasePageItemProps,
    WantListProps,
    SettingsProps,
    AddWantListProps,
    ViewSelectorProps {}

const DiscogsContainer: FC<DiscProps> = ({
  folders,
  disableSubmitBtn,
  fields,
  wantList,
  addToWantList,
  selectedFields,
  releasePageItem,
  activeView,
  setView,
  isSyncing,
  setSelectedFields,
  syncWantList,
  addToFolder,
  clearStorage,
  logOut,
}: DiscProps) => {
  console.log(JSON.stringify({ disableSubmitBtn }));
  return (
    <ContentBody>
      <ViewSelector
        {...{ activeView, setView, hasReleasePageItem: !!releasePageItem }}
      />
      {activeView === "Watch" && (
        <ReleasePageItem releasePageItem={releasePageItem}>
          <AddWantList {...{ addToWantList }} />
        </ReleasePageItem>
      )}
      {activeView === "Want List" && wantList && (
        <WantListComponent {...{ wantList }} />
      )}
      {activeView === "Add Item" && (
        <ReleasePageItem releasePageItem={releasePageItem}>
          <AddToFolder
            {...{
              folders,
              fields,
              disableSubmitBtn,
              selectedFields,
              setSelectedFields,
              releasePageItem,
              addToFolder,
            }}
          />
        </ReleasePageItem>
      )}
      {activeView === "Settings" && (
        <Settings {...{ syncWantList, logOut, clearStorage, isSyncing }} />
      )}
    </ContentBody>
  );
};

export const mapStateToProps = (
  state: RootState
): StateProps<Partial<DiscProps>> => ({
  folders: getCollectableFolders(state),
  wantList: getWantList(state),
  isSyncing: isSyncing(state),
  disableSubmitBtn: disableSubmitBtn(state),
  fields: getFields(state),
  selectedFields: getSelectedFields(state),
  releasePageItem: getReleasePageItem(state),
  activeView: getActiveView(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps<DiscProps> =>
  ({
    addToWantList: bindActionCreators(wantListActions.addToWantList, dispatch),
    addToFolder: bindActionCreators(foldersActions.addToFolder, dispatch),
    syncWantList: bindActionCreators(wantListActions.syncWantList, dispatch),
    clearStorage: bindActionCreators(
      foldersActions.clearSelectedFields,
      dispatch
    ),
    logOut: bindActionCreators(appActions.logOut, dispatch),
    setView: bindActionCreators(appActions.setView, dispatch),
    setSelectedFields: bindActionCreators(
      foldersActions.setSelectedFields,
      dispatch
    ),
  } as DiscProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscogsContainer as FC<Partial<DiscProps>>);
