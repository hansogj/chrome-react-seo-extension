import maybe from "maybe-for-sure";
import React, { FC, useEffect } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { User } from "../../domain";
import { RootState } from "../../redux";
import { getUser } from "../../redux/selectors/app.selectors";
import { DispatchProps, StateProps } from "../../redux/selectors/utils";
import { Container, Content } from "../styled";
import AppHeader from "./App.header";
import TokenInput, { TokenInputProps } from "./TokenInput";
import * as discogsActions from "../../redux/discogs/discogs.actions";
import * as appActions from "../../redux/app/app.actions";
import { DiscogsActionTypes } from "../../redux/discogs";
import DiscogsContainer from "../Discogs";

interface AppProps extends TokenInputProps {
  user: Optional<User>;
  isAuthorized: boolean;
  getFolders: Fn<[], DiscogsActionTypes>;
}

const App: FC<AppProps> = ({
  user,
  setUserToken,
  getFolders,
  isAuthorized,
}: AppProps) => {
  useEffect(() => {
    maybe(user as unknown).valueOrExecute(() => getFolders());
  }, [user, getFolders]);
  return (
    <Container>
      <Content>
        <>
          <AppHeader user={user} />
          {maybe(user)
            .map(() => <DiscogsContainer />)
            .nothingIf(() => !isAuthorized)
            .valueOr(<TokenInput setUserToken={setUserToken} />)}
        </>
      </Content>
    </Container>
  );
};

export const mapStateToProps = (
  state: RootState
): StateProps<Partial<AppProps>> => ({
  user: getUser(state),
  isAuthorized: true,
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
