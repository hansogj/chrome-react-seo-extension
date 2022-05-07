import maybe from "maybe-for-sure";
import { FC } from "react";
import { Folder } from "../../domain";
import { Select } from "./Inputs";

export type Props = { folders: Folder[] };

const ListFolders: FC<Props> = ({ folders }: Props) => (
  <Select onChange={(e) => console.log(e)}>
    {maybe(folders)
      .map((it) =>
        it.map(({ id, name }: Folder) => (
          <option key={`folderId-${id}`} value={id}>
            {name}
          </option>
        ))
      )
      .valueOr(undefined)}
  </Select>
);

export default ListFolders;
