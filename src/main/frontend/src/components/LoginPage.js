import { useEffect } from "react"
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import '../styles/LoginPage.css'

const LoginPage = () => {


    const onFinish = (values) => {
        fetch("http://localhost:8080/auth/authenticate",{
            method:'POST',
            body:JSON.stringify({
                username: values.username,
                password: values.password
            }),
            headers: {
                'Content-type': 'application/json'
        }})
        .then(respone => respone.json())
        .then(data => {
            window.localStorage.setItem('token',data.token)
            console.log(data.token)
        })
    }

    return (
        <div className="LoginPage">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default LoginPage