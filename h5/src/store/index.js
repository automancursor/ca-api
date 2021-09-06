import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import rootReducer from "./reducers/index";
// write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.
const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["auth", "user", "common", "home", "search", "category"],
  debug: true,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export let store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export let persistor = persistStore(store);
