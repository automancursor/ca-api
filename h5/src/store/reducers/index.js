import { combineReducers } from "redux";
import CommonReducer from "./commonReducer";
import HomeReducer from "./homeReducer";
import SearchReducer from "./searchReducer";
import CategoryReducer from "./categoryReducer";
import AuthReducer from "./authReducer";
import CartReducer from "./cartReducer";
import UserReducer from "./userReducer";
// You can use it at all levels of your reducer structure, not just to create the root reducer. It's very common to have multiple combined reducers in various ...
const rootReducer = combineReducers({
  common: CommonReducer,
  home: HomeReducer,
  search: SearchReducer,
  category: CategoryReducer,
  auth: AuthReducer,
  user: UserReducer,
  cart: CartReducer,
});

export default rootReducer;
