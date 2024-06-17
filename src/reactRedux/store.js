<<<<<<< HEAD
// import { createStore } from "redux";
// import { rootReducer } from ".";

// const store = createStore(rootReducer);

// export default store;

import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { rootReducer } from "./index"; // Adjust the path as needed

const persistConfig = {
	key: "root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
=======
import { createStore } from "redux";
import { rootReducer } from ".";

const store = createStore(rootReducer);

export default store;
>>>>>>> 4a40780c8889de48ef17dbc976686d1b35c7ba12
