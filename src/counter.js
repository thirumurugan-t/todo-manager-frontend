import { useDispatch, useSelector } from "react-redux"
import { increment,decrement,reset } from "./redux/slices/counterslice"

export const Counter =()=>{
    const count = useSelector(state=>state.counter.count)
    const dispatch = useDispatch()

    return(
        <div>
            <p>Count:{count}</p>
            <button  onClick={()=>dispatch(increment())}>Increment</button>
            <button  onClick={()=>dispatch(decrement())}>Decrement</button>
            <button  onClick={()=>dispatch(reset())}>reset</button>
        </div>
    )
}