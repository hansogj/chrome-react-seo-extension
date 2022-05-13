import { FC } from "react";
import { colors, Column, Row } from "../../styled";
import ActionButton from "../ActionButton";
import {
  actions as discogsActions,
  DispatchAction as DiscogsDispatch,
} from "../../../redux/discogs";

export interface Props {
  filterReleases: DiscogsDispatch<void>;
  filterSellers: DiscogsDispatch<void>;
}
const AddWantListComponent: FC<Props> = ({
  filterReleases,
  filterSellers,
}: Props) => (
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
  </>
);

export default AddWantListComponent;
