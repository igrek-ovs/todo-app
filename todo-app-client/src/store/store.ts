import { combineReducers, configureStore } from '@reduxjs/toolkit';
import taskReducer from './reducers/TaskSlice';
import onlineReducer from './reducers/OnlineSlice';
import authReducer from './reducers/AuthSlice';
import paymentReducer from './reducers/PaymentSlice';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

const rootReducer = combineReducers({
  task: taskReducer,
  auth: authReducer,
  online: onlineReducer,
  payment: paymentReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  blacklist: ['online', 'payment'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const setupStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

export const store = setupStore();
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
