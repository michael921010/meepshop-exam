import { createContext, useContext, useState, useCallback, useMemo, useReducer } from "react";

const Context = createContext();

const initState = {
  editing: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "update_state": {
      return {
        ...state,
        [action?.namespace]: action?.value,
      };
    }
    default:
      throw new Error();
  }
}

const PageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const updateValue = useCallback(
    (namespace, value) => {
      dispatch({ type: "update_state", namespace, value });
    },
    [dispatch]
  );

  const value = useMemo(() => ({ state, dispatch, updateValue }), [state, updateValue]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const usePage = () => useContext(Context);

export { PageProvider, usePage };
