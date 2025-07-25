/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useState } from "react";

const initialValue = {
  data: [],
  filterStatus: "all",
};

const reducer = (state, action) => {
  switch (action?.type) {
    case "set_data":
      return { ...state, data: action.payload, dataFilter: action.payload };
    case "filter_status":
      return {
        ...state,
        filterStatus: action.payload,
      };
    case "add_data":
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case "edit_data":
      return {
        ...state,
        data: state.data.map((value) => {
          return value.id === action.payload.id ? action.payload : value;
        }),
      };
    case "remove_data":
      return {
        ...state,
        data: state?.data?.filter((value) => {
          return value.id !== action?.payload;
        }),
      };
    default:
      return state;
  }
};

// context
const StoreContext = createContext();
const useStore = () => useContext(StoreContext);

const StoreProvider = ({ children }) => {
  const [dateTask, setDateTask] = useState(0);
  const [data, dispatch] = useReducer(reducer, initialValue);
  return (
    <StoreContext.Provider value={{ data, dispatch, dateTask, setDateTask }}>
      {children}
    </StoreContext.Provider>
  );
};

export { useStore, StoreProvider };
