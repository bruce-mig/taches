import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


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

export default LoginComponent