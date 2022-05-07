import maybe from "maybe-for-sure";
import { FC } from "react";
import { Folder } from "../../domain";
import { InventoryFields } from "../../domain/InventoryFields";
import { Column, Row } from "../styled";
import { Select } from "./Inputs";

export type Props = { fields: InventoryFields };

const ListFields: FC<Props> = ({ fields }: Props) => (
  <Row>
    {fields.map((field) => (
      <Column>{JSON.stringify(field)}</Column>
    ))}
  </Row>
);

export default ListFields;
