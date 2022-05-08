import maybe from "maybe-for-sure";
import { FC } from "react";
import { DropdownInventoryField, InventoryFields } from "../../../domain";
import { SelectedFields } from "../../../domain/Inventory";
import { DispatchAction } from "../../../redux/discogs";
import { setSelectedFields } from "../../../redux/discogs/discogs.actions";
import { Select, Column, Row } from "../../styled";

export type Props = {
  fields: InventoryFields;
  selectedFields: SelectedFields;
  setSelectedFields: DispatchAction<SelectedFields>;
};

const ListFields: FC<Props> = ({
  fields,
  selectedFields,
  setSelectedFields,
}: Props) => (
  <Row>
    {fields
      .filter((field) => field.type === "dropdown")
      .map(({ type, name, id, ...field }) => (
        <Column
          width={11}
          height={4}
          key={`fieldId-${id}-col`}
          padding={[6, 0]}
        >
          <label>{name}</label>
          {type === "dropdown" && (
            <Select
              value={maybe(selectedFields).mapTo(`${id}`).valueOr(undefined)}
              onChange={(e) => setSelectedFields({ [id]: e.target.value })}
              width={10}
            >
              {maybe((field as DropdownInventoryField).options)
                .map((it) =>
                  it.map((option: string) => (
                    <option key={`fieldId-${id}-${option}`} value={option}>
                      {option}
                    </option>
                  ))
                )
                .valueOr(undefined)}
            </Select>
          )}
        </Column>
      ))}
  </Row>
);

export default ListFields;
