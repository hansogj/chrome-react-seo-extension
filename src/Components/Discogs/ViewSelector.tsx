import React, { FC } from "react";
import { Collection, Eye, List } from "../../assets/icons";
import { Button, colors, Column, Row } from "../styled";

export const Views = ["Actions", "Add item", "Want list"] as const;
export type View = typeof Views[number];

const IconMap: Record<View, (fill: string) => JSX.Element> = {
  Actions: (fill: string) => <Eye {...{ fill }} />,
  "Add item": (fill: string) => <Collection {...{ fill }} />,
  "Want list": (fill: string) => <List {...{ fill }} />,
};

interface Props {
  activeView: View;
  setView: (view: View) => void;
}

const ViewSelector: FC<Props> = ({ setView, activeView }: Props) => (
  <Row>
    {Views.map((view) => (
      <Column key={view}>
        <Button
          active={view === activeView}
          onClick={() => {
            setView(view);
          }}
        >
          {IconMap[view](
            view !== activeView ? colors.kindOfBlue : colors.bright
          )}
          {view}
        </Button>
      </Column>
    ))}
  </Row>
);

export default ViewSelector;
