import maybe from "maybe-for-sure";
import React, { FC, useEffect } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { User } from "../../domain";
import { RootState } from "../../redux";
import {
  getNotification,
  getUser,
  isLoading,
} from "../../redux/selectors/app.selectors";
import { DispatchProps, StateProps } from "../../redux/selectors/utils";
import { Container, Content } from "../styled";
import AppHeader from "./App.header";
import TokenInput, { TokenInputProps } from "./TokenInput";
import * as discogsActions from "../../redux/discogs/discogs.actions";
import * as appActions from "../../redux/app/app.actions";
import { DiscogsActionTypes } from "../../redux/discogs";
import DiscogsContainer from "../Discogs";
import { Notification } from "./Notification";
import { AppLogo, ContentHeader } from "./style";
import Profile from "./Profile";
import record from "../../assets/round-record.png";

interface AppProps extends TokenInputProps {
  user: Optional<User>;
  isLoading: boolean;
  notification: string;
  getFolders: Fn<[], DiscogsActionTypes>;
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
    getFolders: bindActionCreators(discogsActions.getFolders, dispatch),
  } as AppProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App as FC<Partial<AppProps>>);
