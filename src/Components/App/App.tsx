import maybe from "maybe-for-sure";
import React, { FC, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import record from "../../assets/round-record.png";
import { User } from "../../domain";
import { RootState } from "../../redux";
import { actions as appActions } from "../../redux/app/";
import {
  getNotification,
  getUser,
  isLoading,
  notAuthenticated,
} from "../../redux/selectors/app.selectors";
import { DispatchProps, StateProps } from "../../redux/selectors/utils";
import DiscogsContainer from "../Discogs";
import { Container, Content } from "../styled";
import { Notification } from "./Notification";
import Profile, { Props as ProfileProps } from "./Profile";
import { AppLogo, ContentHeader } from "./style";
import TokenInput, { TokenInputProps } from "./TokenInput";

interface AppProps extends TokenInputProps, ProfileProps, LoaderProps {
  user: Optional<User>;
  isLoading: boolean;
  notAuthenticated: boolean;
  notification: string;
}

type LoaderProps = { getUser: typeof appActions.getUser };
const Loader: FC<LoaderProps> = ({ getUser }: LoaderProps) => {
  useEffect(() => {
    getUser();
  }, [getUser]);
  return (
    <ContentHeader>
      <AppLogo src={record} alt="logo" />
    </ContentHeader>
  );
};

const App: FC<AppProps> = ({
  user,
  notification,
  setUserToken,
  isLoading,
  notAuthenticated,
  logOut,
  getUser,
}: AppProps) => {
  let ref = useRef(null);

  console.log(
    JSON.stringify({
      isLoading: maybe(isLoading).nothingUnless(Boolean).valueOr("*"),
      notAuthenticated: maybe(notAuthenticated)
        .nothingUnless(Boolean)
        .valueOr("*"),
      user: maybe(user as any)
        .nothingUnless(Boolean)
        .map(() => "user")
        .valueOr("*"),
    })
  );

  return (
    <Container id="container">
      <Content id="content" ref={ref}>
        <>
          {maybe(isLoading)
            .nothingUnless(Boolean)
            .map(() => <Loader {...{ getUser }} />)
            .or(
              maybe(notAuthenticated)
                .nothingUnless(Boolean)
                .map(() => <TokenInput setUserToken={setUserToken} />)
            )
            .or(
              maybe(user as any)
                .nothingUnless(Boolean)
                .map(() => (
                  <>
                    <Profile {...{ user, logOut }} />
                    {notification && (
                      <Notification
                        {...{
                          refObject: ref,
                          notification,
                        }}
                      />
                    )}
                    <DiscogsContainer />
                  </>
                ))
            )

            .valueOr(
              <Notification
                {...{
                  notification: "Something went wrong when loading the app",
                }}
              />
            )}
        </>
      </Content>
    </Container>
  );
};

export const mapStateToProps = (
  state: RootState
): StateProps<Partial<AppProps>> => ({
  user: getUser(state),
  isLoading: isLoading(state),
  notAuthenticated: notAuthenticated(state),
  notification: getNotification(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps<AppProps> =>
  ({
    logOut: bindActionCreators(appActions.logOut, dispatch),
    getUser: bindActionCreators(appActions.getUser, dispatch),

    setUserToken: bindActionCreators(appActions.setUserToken, dispatch),
  } as AppProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App as FC<Partial<AppProps>>);
