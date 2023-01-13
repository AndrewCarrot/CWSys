import { useNavigate } from "react-router-dom"
import { Input } from 'antd';
import "../styles/ReadPage.css"
const { Search } = Input;

const ReadPage = () => {
    const navigate = useNavigate();

    const onSearch = (value) => {
        navigate("/Climber", {
            state:{
                cardNumber: value
            }
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