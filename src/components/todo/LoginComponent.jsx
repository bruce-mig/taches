import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './security/AuthContext'


function LoginComponent() {

    const [username, setUsername] = useState('name')
    const [password, setPassword] = useState('')
    const [showErrorMsg, setShowErrorMsg] = useState(false)
    const navigate = useNavigate()
    const authContext = useAuth()

    return (
        <div className="Login">
            <div className="LoginForm">
                <h1>Please Login</h1>
                {showErrorMsg && <div className="errorMessage">Authentication failed. Please check your credentials.</div>}

                <div className='LoginForm'>
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
                            async () => {
                                if (await authContext.login(username, password)) {
                                    navigate(`/welcome/${username}`)
                                } else {
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