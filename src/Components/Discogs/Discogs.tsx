import maybe from "maybe-for-sure";
import React, { FC, useEffect } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { User } from "../../api/domain";
import { RootState } from "../../redux";
import { getUser } from "../../redux/selectors/resource.selectors";
import { DispatchProps, StateProps } from "../../redux/selectors/utils";
import { Column, Container, Content, ContentBody, Row } from "../styled";

import * as actions from "../../redux/discogs/discogs.actions";
import { DiscogsActionTypes } from "../../redux/discogs";

interface DiscProps {
  user: Optional<User>;
}
const DiscogsContainer: FC<DiscProps> = ({ user }: DiscProps) => {
  return (
    <ContentBody>
      <Row>
        <Column>{JSON.stringify(user, null, 4)}</Column>
        <Column></Column>
      </Row>
    </ContentBody>
  );
};

export const mapStateToProps = (
  state: RootState
): StateProps<Partial<DiscProps>> => ({
  user: getUser(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps<DiscProps> =>
  ({
    setUserToken: bindActionCreators(actions.setUserToken, dispatch),
  } as any);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscogsContainer as FC<Partial<DiscProps>>);

/*
import {
    Action,
    addToWantlistAction,
    filterAndAddToWantlistAction,
    removeFromWantlistAction,
    uniqueReleaseAction,
    uniqueSellerAction,
} from '../../constants'
import { sendChromeMessage } from '../../service/messages'
import { colors, Column, ContentBody, Row } from '../styled'
import AddToFolder from './AddToFolder'
import { ChangeOrigin, ChangePlacement } from './CustomFieldsSelectors'
import { Button } from './inputs'

interface ActionButtonProps extends Action {
    style?: React.CSSProperties
}

const ActionButton = ({ action, title, options, style }: ActionButtonProps) => (
    <Button style={style} onClick={() => sendChromeMessage(action, options)}>
        {title}
    </Button>
)

const DiscogsActions = () => (
    <ContentBody>
        <Row>
            <Column>
                <ActionButton {...uniqueSellerAction} />
            </Column>
            <Column>
                <ActionButton {...uniqueReleaseAction} />
            </Column>
        </Row>

        <Row>
            <Column>
                <ActionButton {...addToWantlistAction} />
            </Column>
            <Column>
                <ActionButton
                    {...{
                        ...removeFromWantlistAction,
                        ...{ style: { backgroundColor: colors.dread } },
                    }}
                />
            </Column>
        </Row>
        <Row>
            <Column>
                <ActionButton
                    {...{
                        ...filterAndAddToWantlistAction,
                        ...{ style: { backgroundColor: colors.kindOfBlue } },
                    }}
                />
            </Column>

            <AddToFolder />
        </Row>
        <Row>
            <Column>
                <h3 style={{ color: '#333' }}>
                    Change Custom Fields for all selection
                </h3>
            </Column>
        </Row>
        <Row>
            <Column>
                <ChangeOrigin />
            </Column>
            <Column>
                <ChangePlacement />
            </Column>
        </Row>
    </ContentBody>
)

export default DiscogsActions
 */
