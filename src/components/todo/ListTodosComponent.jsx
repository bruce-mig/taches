import { useEffect, useState } from "react"
import { deleteTodoApi, retrieveAllUserTodosApi, updateTodoApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useNavigate } from "react-router-dom"

function ListTodosComponent() {
    const authContext = useAuth()
    const username = authContext.username

    const navigate = useNavigate()
    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState(null)

    useEffect(() => refreshTodos, [])

    function refreshTodos() {
        retrieveAllUserTodosApi(username)
            .then((response) => {
                setTodos(response.data)
            })
            .catch((error) => console.log(error))
            .finally(() => console.log('cleanup'))
    }

    function deleteTodo(id) {
        deleteTodoApi(username, id)
            .then(
                () => {
                    //1: Display message
                    setMessage(`Successfully deleted todo with id: ${id}`)

                    //2: Update Todos
                    refreshTodos()
                }
            )
            .catch((error) => console.log(error))
            .finally(() => console.log('cleanup'))
    }

    function updateTodo(id) {
        navigate(`/todos/${id}`)
    }

    function addNewTodo() {
        navigate(`/todos/-1`)
    }

    return (
        <div className='container'>
            <h1>Liste de Taches!</h1>
            {message && <div className="alert alert-warning">{message}</div>}

            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Done</th>
                            <th>Target Date</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td><button className="btn btn-success"
                                            onClick={() => updateTodo(todo.id)}
                                        >Update</button></td>
                                        <td><button className="btn btn-warning"
                                            onClick={() => deleteTodo(todo.id)}
                                        >Delete</button></td>
                                    </tr>
                                )
                            )
                        }

                    </tbody>
                </table>
            </div>
            <div className="btn btn-success m-5"
                onClick={addNewTodo}
            >Add New Todo</div>
        </div>
    )
}

export default ListTodosComponent