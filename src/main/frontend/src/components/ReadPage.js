import { useNavigate } from "react-router-dom"
import { Input, message } from 'antd';
import "../styles/ReadPage.css"
const { Search } = Input;

const ReadPage = () => {
    const navigate = useNavigate();

    const accesToken = window.localStorage.getItem('token')
    console.log(accesToken)

    const onSearch = (value) => {
        fetch(`http://localhost:8080/climbers/get/by-card-number?cardNumber=${value}`,{
            method:'GET',
            headers: {
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accesToken}`
            }
        })
        .then(async response =>{
            const data = await response.json();
            
            if (!response.ok) {
                message.error("Podana karta nie istnieje w systemie")
            }else
            navigate("/Profil", {
                state:{
                    cardNumber: value
                }
            })

    })


        
    }

    return (
        <div className="ReadPage">
            <Search
                className="search"
                placeholder="numer karty"
                allowClear
                enterButton="Szukaj"
                size="large"
                onSearch={onSearch}
            />
        </div>
    )
}


export default ReadPage