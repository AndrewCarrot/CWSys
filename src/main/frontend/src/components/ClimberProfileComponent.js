import { useEffect } from "react"
import { useLocation } from "react-router"

const ClimberProfileComponent = (props) => {
    
    const location = useLocation()

    useEffect(()=>{
        fetch('http://localhost:8080/climbers/get/by-card-number?cardNumber=123456789')
        .then((response) => response.json())
        .then(response => console.log(response))
    },[])

    return(
        <div className="ClimberProfileComponent">
            
        </div>
    )
} 
export default ClimberProfileComponent