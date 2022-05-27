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

interface DiscProps
  extends AddToFolderProps,
    WantListProps,
    AddWantListProps,
    ViewSelectorProps {}

const DiscogsContainer: FC<DiscProps> = ({
  folders,
  disableSubmitBtn,
  fields,
  wantList,
  filterReleases,
  filterSellers,
  selectedFields,
  releasePageItem,
  activeView,
  setView,
  isSyncing,
  setSelectedFields,
  syncWantList,
  addToFolder,
}: DiscProps) => {
  console.log(JSON.stringify({ disableSubmitBtn }));
  return (
    <ContentBody>
      <ViewSelector
        {...{ activeView, setView, hasReleasePageItem: !!releasePageItem }}
      />
      {activeView === "Watch" && (
        <AddWantList {...{ filterReleases, filterSellers }} />
      )}

      {activeView === "Want List" && wantList && (
        <WantListComponent {...{ wantList, syncWantList, isSyncing }} />
      )}
      {activeView === "Add Item" && (
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
    filterReleases: bindActionCreators(discogsActions.filterReleases, dispatch),
    filterSellers: bindActionCreators(discogsActions.filterSellers, dispatch),
    addToFolder: bindActionCreators(foldersActions.addToFolder, dispatch),
    syncWantList: bindActionCreators(wantListActions.syncWantList, dispatch),
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
