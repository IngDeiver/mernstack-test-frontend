import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/auth.slice'
import productsReducer from './slices/products.slice'
import updateProductReducer from './slices/updateProduct.slice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { encryptTransform } from 'redux-persist-transform-encrypt';


const persistSesionConfig = {
  key: 'localSesion',
  storage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_AES_SECRET_KEY || "==D",
      onError: function (error: any) {
        console.error("Encrypt user data error: ", error);
      },
    }),
  ],
}

const persistedSesionReducer = persistReducer(persistSesionConfig, userReducer)

export const store = configureStore({
  reducer: {
    sesion: persistedSesionReducer,
    products: productsReducer,
    updateProductId: updateProductReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})


export const persistor = persistStore(store)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch