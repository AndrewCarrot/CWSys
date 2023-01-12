import { useNavigate } from "react-router-dom"


const RouterTestComponent = () => {
    const navigate = useNavigate();

    const redirectTest = () => {
        navigate("/")
    }

    return(
        <div className="RouterTestComponent">
            <button onClick={redirectTest}>
                test
            </button>
        </div>
    )
} 

export default RouterTestComponent