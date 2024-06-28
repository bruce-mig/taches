export default function ResetButton({ resetMethod }) {

    function resetCounterFunction() {
        resetMethod()
    }

    return (
        <div className="Counter">
            <div>
                <button className="resetButton"
                    onClick={resetCounterFunction}
                >Reset</button>
            </div>
        </div>
    )
}

