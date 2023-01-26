import { useNavigate } from "react-router-dom"
import { Input } from 'antd';
import "../styles/ReadPage.css"
const { Search } = Input;

const ReadPage = () => {
    const navigate = useNavigate();

    const onSearch = (value) => {
        fetch(`http://localhost:8080/climbers/get/by-card-number?cardNumber=${value}`)
        .then(async response =>{
            const data = await response.json();
            
            if (!response.ok) {
                console.log('zły numer karty')
            }else
            navigate("/Profil", {
                state:{
                    climber: data
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