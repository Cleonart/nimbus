import { ref } from "vue";

const dbInstance = ref(null);
const objectStores = [
  {
    name: "settings",
    options: { keyPath: "id", autoIncrement: true },
  },
];

export const useIndexedDB = () => {
  const connect = (dbName, version, dbList = objectStores) => {
    console.log("[INDEXED DB] Build connection with indexed DB...");
    return new Promise((resolve, reject) => {
      if (dbInstance.value) {
        console.log("[INDEXED DB] Connection estabilished, use cached");
        resolve(dbInstance.value);
        return;
      }

      console.log("[INDEXED DB] Starting new connection");
      const request = indexedDB.open(dbName, version);

      request.onupgradeneeded = function (event) {
        const db = event.target.result;
        dbList.forEach((store) => {
          if (!db.objectStoreNames.contains(store.name)) {
            const objectStore = db.createObjectStore(store.name, store.options);
            if (store.indices) {
              store.indices.forEach((index) => {
                objectStore.createIndex(
                  index.name,
                  index.keyPath,
                  index.options,
                );
              });
            }
          }
        });
      };

      request.onsuccess = function (event) {
        dbInstance.value = event.target.result;
        console.log("[INDEXED DB] Connection estabilished: success");
        resolve(dbInstance.value);
      };

      request.onerror = function (event) {
        console.log("[INDEXED DB] Connection failed");
        reject("Database error: " + event.target.error);
      };
    });
  };

  const create = ({ table_name = undefined, data = {}, key = null }) => {
    return new Promise((resolve, reject) => {
      const db = dbInstance.value;
      if (!db) {
        reject("Database is not connected");
        return;
      }

      const transaction = db.transaction([table_name], "readwrite");
      const objectStore = transaction.objectStore(table_name);

      let request;
      if (key !== null) {
        // Modify the data to include the custom key as the keyPath
        data.id = key;
        request = objectStore.put(data);
      } else {
        request = objectStore.add(data);
      }

      request.onsuccess = () => resolve("Data added successfully");
      request.onerror = (event) =>
        reject("Add data error: " + event.target.error);
    });
  };

  const read = (tableName, key) => {
    return new Promise((resolve, reject) => {
      const db = dbInstance.value;
      if (!db) {
        reject("Database is not connected");
        return;
      }

      const transaction = db.transaction([tableName], "readonly");
      const objectStore = transaction.objectStore(tableName);
      const request = objectStore.get(key);

      request.onsuccess = (event) => resolve(event.target.result);
      request.onerror = (event) =>
        reject("Get data error: " + event.target.error);
    });
  };

  const unlink = (tableName, key) => {
    return new Promise((resolve, reject) => {
      const db = dbInstance.value;
      if (!db) {
        reject("Database is not connected");
        return;
      }

      const transaction = db.transaction([tableName], "readwrite");
      const objectStore = transaction.objectStore(tableName);
      const request = objectStore.delete(key);

      request.onsuccess = () => resolve("Data deleted successfully");
      request.onerror = (event) =>
        reject("Delete data error: " + event.target.error);
    });
  };

  return {
    connect,
    create,
    read,
    unlink,
  };
};
