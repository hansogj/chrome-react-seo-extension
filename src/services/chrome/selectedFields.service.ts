import { SelectedFields } from "../../domain/Inventory";
import { get as getStorage, set as setStorage } from "./local.storage";

const key = "selected-fields";

const fieldsService = () => {
  const get = () => Promise.resolve(getStorage(key, {}));
  return {
    get,
    set: (selectedFields: SelectedFields) =>
      get()
        .then((fields: SelectedFields) => ({
          ...fields,
          ...selectedFields,
        }))
        .then((it) => setStorage(key, it)),
  };
};

export default fieldsService;
