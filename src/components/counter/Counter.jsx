import { useState } from 'react'
import CounterButton from './CounterButton';
import ResetButton from './ResetButton';
import './Counter.css'

export default function Counter() {
    // [0,f]
    const [count, setCount] = useState(0);

    function incrementCounterParentFunction(by) {
        setCount(count + by)
    }

    function decrementCounterParentFunction(by) {
        setCount(count - by)
    }

    function resetCounterParentFunction() {
        setCount(0)
    }

    return (
        <>
            <span className="totalCount">{count}</span>
            <CounterButton by={1} incrementMethod={incrementCounterParentFunction} decrementMethod={decrementCounterParentFunction} />
            <CounterButton by={2} incrementMethod={incrementCounterParentFunction} decrementMethod={decrementCounterParentFunction} />
            <CounterButton by={5} incrementMethod={incrementCounterParentFunction} decrementMethod={decrementCounterParentFunction} />
            <ResetButton resetMethod={resetCounterParentFunction} />
        </>
    )
}

