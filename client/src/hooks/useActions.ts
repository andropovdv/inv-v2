import { useDispatch } from "react-redux";
import { allActionCreators } from "../store/actionCreators";
import { bindActionCreators } from "redux";

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActionCreators, dispatch);
};
