import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import './TodoApp.css'

export default function TodoApp() {
    return (
        <div className="TodoApp">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LoginComponent />}></Route>
                    <Route path='/login' element={<LoginComponent />}></Route>
                    <Route path='/welcome' element={<WelcomeComponent />}></Route>
                    <Route path='*' element={<ErrorComponent />}></Route>
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
                                    navigate('/welcome')
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
    return (
        <div className="WelcomeComponent">
            <h1>Welcome!</h1>
            <div>
                Welcome Component
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