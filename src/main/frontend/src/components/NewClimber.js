import '../styles/NewClimber.css'
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from "react-router-dom"



const onFinishFailed = (errorInfo) => {
  message.error("Sprawdź poprawność danych")
};

const NewClimber = () => {
    const navigate = useNavigate()

    const onFinish = async(values) => {
        const {firstName, lastName, cardNumber, phoneNumber} = values
      

        const response = await fetch(`http://localhost:8080/climbers/create`, {
             method: 'POST',
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                 cardNumber: cardNumber,
                 firstName: firstName,
                 lastName: lastName,
                 phoneNumber: phoneNumber
             })
         });
        if (response.ok){
            navigate("/Profil", {
                state:{
                    cardNumber: cardNumber
                }
            })
        }else{
            /* brakuje metody w api existsByCardNumber */
            message.error("Coś poszło nie tak, sprawdź czy numer karty nie jest już zajęty")
        }
    };

    return (
        <div className="NewClimber">
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Imię"
                    name="firstName"
                    rules={[
                        {
                            required: true,
                            message: 'Wprowadź Imię!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Nazwisko"
                    name="lastName"
                    rules={[
                        {
                            required: true,
                            message: 'Wprowadź nazwisko!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Numer karty"
                    name="cardNumber"
                    rules={[
                        {
                            required: true,
                            message: 'Wprowadź kartę!',
                        },
                        ({getFieldValue})=>({
                            validator(_,value){
                                // console.log(getFieldValue('lastName'))
                                if(value.length !== 10)
                                    return Promise.reject('Nieprawidłowa długość numeru karty')
                                else if(isNaN(value))
                                    return Promise.reject('Numer karty zawiera niedozwolone znaki')
                                return Promise.resolve()
                            }
                        })
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Numer telefonu"
                    name="phoneNumber"
                    rules={[
                        {
                            required: true,
                            message: 'Wprowadź numer telefonu!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Zatwierdź
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default NewClimber