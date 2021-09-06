import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "store/index";
import { CartProvider } from "react-use-cart";
import AppRouter from "router/AppRouter";
import "./styles/global.scss";
// APP enter
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CartProvider>
          <AppRouter />
        </CartProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
