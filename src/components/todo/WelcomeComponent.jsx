import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { retrieveHelloWorldPathVariable } from './api/HelloWorldApiService'
import { useAuth } from './security/AuthContext'

function WelcomeComponent() {

    const { username } = useParams()

    const authContext = useAuth()

    const [message, setMessage] = useState(null)

    function callHelloWorldRESTAPI() {
        console.log('called')
        retrieveHelloWorldPathVariable(username, authContext.token)
            .then((response) => {
                console.log(response)
                setMessage(response.data.message)
            })
            .catch((error) => console.log(error))
            .finally(() => console.log('cleanup'))
    }

    return (
        <div className="WelcomeComponent">
            <h1>Welcome {username}!</h1>
            <div>
                Manage your todos - <Link to="/todos">Go here</Link>.
            </div>
            <div>
                <button className='btn btn-success m-5' onClick={callHelloWorldRESTAPI}
                >Call Hello World</button>
            </div>
            <div className='text-info'>{message}</div>
        </div>
    )
}

export default WelcomeComponent