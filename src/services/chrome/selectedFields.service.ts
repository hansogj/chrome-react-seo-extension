import { SelectedFields } from "../../domain/Inventory";
import {
  get as getStorage,
  set as setStorage,
  remove as removeStorage,
  uniqueKey,
} from "./local.storage";

const _setStorage = (key: any, value: any) =>
  chrome.storage.sync.set({ [key]: value }, function () {
    console.log("Value is set to " + value);
  });

const _getStorage = (_key: any, _?: any) => {
  new Promise((resolve, rejector) => {
    debugger;
    return chrome.storage.sync.get(_key, (value) =>
      resolve(value as SelectedFields)
    );
  });
};

const key = "selected-fields";

const fieldsService = () => {
  const get = (userId: number) =>
    Promise.resolve(getStorage(uniqueKey(key, userId), {}));
  const remove = (userId: number) =>
    Promise.resolve(removeStorage(uniqueKey(key, userId)));

  return {
    get,
    set: (userId: number, selectedFields: SelectedFields) =>
      selectedFields
        ? get(userId)
            .then((fields: any) => ({
              ...fields,
              ...selectedFields,
            }))
            .then((it) => setStorage(uniqueKey(key, userId), it))
        : remove(userId),
  };
};

export default fieldsService;
