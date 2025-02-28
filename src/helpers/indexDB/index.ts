import { openDB } from "idb";
import useDbStore from "@/stores/DbStore";

const InitializeDB = async () => {
  const setIsInitialized = useDbStore.getState().setIsInitialized;

  const db = await openDB("docify-DB", 1, {
    upgrade(database, oldVersion, newVersion, transaction, event) {
      const store = database.createObjectStore("Docs", { keyPath: "id" });

      store.createIndex("title", "title");
      store.createIndex("content", "content");
      store.createIndex("createdAt", "createdAt");
      store.createIndex("updatedAt", "updatedAt");
      store.createIndex("shareUrl", "shareUrl");
    },
  });

  setIsInitialized(true);
};

export default InitializeDB;
