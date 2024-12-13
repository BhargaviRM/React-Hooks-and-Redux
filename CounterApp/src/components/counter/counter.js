import { useDispatch } from "react-redux";
import { increment, decrement } from "../redux/actions";
import { useSelector } from "react-redux";

const Counter = () => {
  const count = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <>
      <h1>Counter with Redux</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <h1>Count : {count}</h1>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </>
  );
};

export default Counter;
