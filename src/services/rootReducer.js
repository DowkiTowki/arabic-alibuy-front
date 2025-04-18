import theme from "./slices/theme";
import user from "./slices/user";
import liveDerham from "./slices/liveDerham";

const rootReducer = {
  theme: theme,
  user: user,
  liveDerham: liveDerham,
};

export default rootReducer;
