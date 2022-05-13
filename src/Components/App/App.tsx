import maybe from "maybe-for-sure";
import React, { FC, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import record from "../../assets/round-record.png";
import { User } from "../../domain";
import { RootState } from "../../redux";
import { actions as appActions } from "../../redux/app/";
import {
  actions as foldersActions,
  FoldersActionTypes,
} from "../../redux/folders";
import {
  getNotification,
  getUser,
  isLoading,
} from "../../redux/selectors/app.selectors";
import { DispatchProps, StateProps } from "../../redux/selectors/utils";
import DiscogsContainer from "../Discogs";
import { Container, Content } from "../styled";
import AppHeader from "./App.header";
import { Notification } from "./Notification";
import Profile from "./Profile";
import { AppLogo, ContentHeader } from "./style";
import TokenInput, { TokenInputProps } from "./TokenInput";

interface AppProps extends TokenInputProps {
  user: Optional<User>;
  isLoading: boolean;
  notification: string;
  getFolders: Fn<[], FoldersActionTypes>;
}

const App: FC<AppProps> = ({
  user,
  notification,
  setUserToken,
  getFolders,
  isLoading,
}: AppProps) => {
  useEffect(() => {
    maybe(user as unknown).valueOrExecute(() => getFolders());
  }, [user, getFolders]);

  return (
    <Container id="container">
      <Content id="content">
        {maybe(isLoading)
          .nothingIf((it) => it === false)
          .map(() => (
            <ContentHeader>
              <AppLogo src={record} alt="logo" />
            </ContentHeader>
          ))
          .valueOr(
            maybe(user)
              .map((it) => (
                <>
                  <AppHeader user={it} />

                  <Notification {...{ notification }} />
                  <Profile {...{ user }} />
                  <DiscogsContainer />
                </>
              ))
              .valueOr(<TokenInput setUserToken={setUserToken} />)
          )}
      </Content>
    </Container>
  );
};

export const mapStateToProps = (
  state: RootState
): StateProps<Partial<AppProps>> => ({
  user: getUser(state),
  isLoading: isLoading(state),
  notification: getNotification(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps<AppProps> =>
  ({
    setUserToken: bindActionCreators(appActions.setUserToken, dispatch),
    getFolders: bindActionCreators(foldersActions.getFolders, dispatch),
  } as AppProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App as FC<Partial<AppProps>>);
