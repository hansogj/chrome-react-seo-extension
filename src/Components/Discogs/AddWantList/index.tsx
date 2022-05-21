import { FC } from "react";
import { DispatchAction as DiscogsDispatch } from "../../../redux/store";
import { Button, Column, DreadButton, Row } from "../../styled";

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
        <DreadButton
          {...{
            onClick: () => filterSellers(),
          }}
        >
          Filter seller
        </DreadButton>
      </Column>
      <Column>
        <Button {...{ onClick: () => filterReleases() }}>
          Filter Releases
        </Button>
      </Column>
    </Row>
  </>
);

export default AddWantListComponent;
