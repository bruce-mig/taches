import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useParams, Link } from 'react-router-dom'
import './TodoApp.css'

export default function TodoApp() {
    return (
        <div className="TodoApp">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LoginComponent />} />
                    <Route path='/login' element={<LoginComponent />} />
                    <Route path='/welcome/:username' element={<WelcomeComponent />} />
                    <Route path='/todos' element={<ListTodosComponent />} />

                    <Route path='*' element={<ErrorComponent />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

function LoginComponent() {

    const [username, setUsername] = useState('name')
    const [password, setPassword] = useState('')
    const [showSuccessMsg, setShowSuccessMsg] = useState(false)
    const [showErrorMsg, setShowErrorMsg] = useState(false)
    const navigate = useNavigate()

    return (
        <div className="Login">
            {showSuccessMsg && <div className="successMessage">Authenticated Successfully</div>}
            {showErrorMsg && <div className="errorMessage">Authentication failed. Please check your credentials.</div>}
            <div className="LoginForm">
                <h1>Please Login</h1>
                <div>
                    <label>User Name</label>
                    <input type="text" name="username" value={username}
                        onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password}
                        onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div>
                    <button type="button" name="login"
                        onClick={
                            () => {
                                if (username === 'name' && password === 'secret') {
                                    console.log('Success')
                                    setShowSuccessMsg(true)
                                    setShowErrorMsg(false)
                                    navigate(`/welcome/${username}`)
                                } else {
                                    console.log('Authentication failed')
                                    setShowSuccessMsg(false)
                                    setShowErrorMsg(true)
                                }
                            }
                        }
                    >Login</button>
                </div>

            </div>
        </div>
    )
}


function WelcomeComponent() {

    const { username } = useParams()

    console.log(username)

    return (
        <div className="WelcomeComponent">
            <h1>Welcome {username}!</h1>
            <div>
                Manage your todos - <Link to="/todos">Go here</Link>.
            </div>
        </div>
    )
}

function ErrorComponent() {
    return (
        <div className="ErrorComponent">
            <h1>We are working really hard!</h1>
            <div>
                Apologies for the 404. Reach out to our team at ABCD-EFG-HIJ.
            </div>
        </div>
    )
}

function ListTodosComponent() {
    const today = new Date()
    const targetDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDay())
    const todos = [
        { id: 1, description: 'Learn AWS Solutions Architect', done: false, targetDate: targetDate },
        { id: 2, description: 'Learn AWS Developer Associate', done: false, targetDate: targetDate },
        { id: 3, description: 'Learn Ansible', done: false, targetDate: targetDate },
    ]
    return (
        <div className="ListTodosComponent">
            <h1>Liste de Taches!</h1>
            <div>
                <table>
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
                                        <td>{todo.targetDate.toDateString()}</td>
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