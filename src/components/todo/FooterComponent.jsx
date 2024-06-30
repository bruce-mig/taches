import { useContext } from "react"
import { AuthContext } from "./security/AuthContext"

function FooterComponent() {
    const authContext = useContext(AuthContext)

    // console.log(`Footer component - ${authContext.number}`)
    return (
        <footer className='footer'>
            <div className='container'>
                Copyright @2024
            </div>
        </footer>

    )
}

export default FooterComponent