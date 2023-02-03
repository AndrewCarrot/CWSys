import { useNavigate } from "react-router-dom"


const RouterTest = () => {
    const navigate = useNavigate();

    const redirectTest = () => {
        navigate("/")
    }

    return(
        <div className="RouterTest">
            <button onClick={redirectTest}>
                test
            </button>
        </div>
    )
} 

export default RouterTest