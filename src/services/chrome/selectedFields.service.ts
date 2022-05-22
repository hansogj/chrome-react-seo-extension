import { SelectedFields } from "../../domain/Inventory";
import {
  get as getStorage,
  set as setStorage,
  uniqueKey,
} from "./local.storage";

const key = "selected-fields";

const fieldsService = () => {
  const get = (userId: number) =>
    Promise.resolve(getStorage(uniqueKey(key, userId), {}));
  return {
    get,
    set: (userId: number, selectedFields: SelectedFields) =>
      get(userId)
        .then((fields: SelectedFields) => ({
          ...fields,
          ...selectedFields,
        }))
        .then((it) => setStorage(uniqueKey(key, userId), it)),
  };
};

export default fieldsService;
