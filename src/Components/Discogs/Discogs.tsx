import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { MasterRelease, User, WantList } from "../../domain";
import { RootState } from "../../redux";
import { DispatchAction } from "../../redux/discogs";
import * as actions from "../../redux/discogs/discogs.actions";
import {
  DispatchProps,
  getCurrentMaster,
  getFields,
  getFolders,
  getSelectedFields,
  getUser,
  getWantList,
  StateProps,
} from "../../redux/selectors";

import { colors, Column, ContentBody, Row, Button } from "../styled";
import ActionButton from "./ActionButton";
import AddToFolder, { Props as AddToFolderProps } from "./AddToFolder";

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
  currentMaster,
  getCurrentMaster,
  setSelectedFields,
}: DiscProps) => {
  const Views = ["Actions", "Add item", "Want list"] as const;

  const [activeView, setView] = useState<typeof Views[number]>("Add item");

  useEffect(() => {
    if (activeView === "Add item") {
      getCurrentMaster();
    }
  }, [activeView, getCurrentMaster]);

  return (
    <ContentBody>
      <Row>
        {Views.map((view) => (
          <Column key={view}>
            <Button
              active={view === activeView}
              onClick={() => {
                setView(view);
              }}
            >
              {view}
            </Button>
          </Column>
        ))}
      </Row>
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
            currentMaster,
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
  currentMaster: getCurrentMaster(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps<DiscProps> =>
  ({
    filterReleases: bindActionCreators(actions.filterReleases, dispatch),
    filterSellers: bindActionCreators(actions.filterSellers, dispatch),
    setSelectedFields: bindActionCreators(actions.setSelectedFields, dispatch),
    getCurrentMaster: bindActionCreators(actions.getCurrentMaster, dispatch),
  } as DiscProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscogsContainer as FC<Partial<DiscProps>>);
