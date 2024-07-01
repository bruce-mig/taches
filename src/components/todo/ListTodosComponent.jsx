import { useEffect, useState } from "react"
import { retrieveAllUserTodos } from "./api/TodoApiService"

function ListTodosComponent() {
    const [todos, setTodos] = useState([])

    useEffect(() => refreshTodos, [])

    function refreshTodos() {
        retrieveAllUserTodos('name')
            .then((response) => {
                setTodos(response.data)
            })
            .catch((error) => console.log(error))
            .finally(() => console.log('cleanup'))
    }
    return (
        <div className='container'>
            <h1>Liste de Taches!</h1>
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Description</td>
                            <td>Done</td>
                            <td>Target Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        {/* <td>{todo.targetDate.toDateString()}</td> */}
                                        <td>{todo.targetDate.toString()}</td>
                                    </tr>
                                )
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListTodosComponent