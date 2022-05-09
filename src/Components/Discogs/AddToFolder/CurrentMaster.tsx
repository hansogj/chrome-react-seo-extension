import maybe from "maybe-for-sure";
import { FC } from "react";
import { MasterRelease } from "../../../domain";
import { Image, Artist } from "../../../domain/div";
import { Column, Row } from "../../styled";
import { Thumb } from "../WantList/style";

export type Props = {
  currentMaster: MasterRelease;
};

const CurrentMaster: FC<Props> = ({ currentMaster }: Props) =>
  maybe(currentMaster)
    .map((it) => (
      <>
        {maybe(it.images)
          .nothingIf((it) => !it.length)
          .map((it) => it[0] as Image)
          .map(({ uri }: Image) => (
            <Row height={6} padding={[12, 0]}>
              <Column width={14} center>
                <Thumb src={uri} alt="Thumb" />
              </Column>
              <Column width={24}>
                {maybe(it.artists)
                  .map((it) => it[0] as Artist)
                  .map(({ name }) => name)
                  .valueOr("")}
                <br />
                <i>{it.title}</i>
                <br />( {it.year})
              </Column>
            </Row>
          ))
          .valueOr(<></>)}
      </>
    ))
    .valueOr(<></>);

export default CurrentMaster;
