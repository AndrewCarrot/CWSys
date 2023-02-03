
import '../styles/AllClimbersComponent.css'
import {useEffect, useState} from "react";
import {Button, Form, Input, Popconfirm, Table} from "antd";
import {CloseCircleFilled, QuestionCircleOutlined, SearchOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const AllClimbersComponent = () => {

    const [climbers, setClimbers] = useState([{
        firstName:"",
        lastName:"",
        cardNumber:"",
        phoneNumber:""
    }])
    const [reload, setReload] = useState(false)

    const [form] = Form.useForm();
    const navigate = useNavigate()

    const climbersRequest = 'http://localhost:8080/climbers/get/'

    //TODO should also return customPasses
    useEffect(()=>{
        fetch(climbersRequest + 'all')
            .then(res => res.json())
            .then(data => setClimbers(data.content))
        }
        ,[reload])

    function handleReload(){
        setReload(prevState => !prevState)
    }

    // TODO wyszukiwanie po kilku polach jednocześnie

    const onFinish = async (values) => {
        if(values.firstName)
            fetch(climbersRequest + `by-first-name?firstName=${values.firstName}`)
                .then(res => res.json())
                .then(data => setClimbers(data.content))
        else if(values.lastName)
            fetch(climbersRequest + `by-last-name?lastName=${values.lastName}`)
                .then(res => res.json())
                .then(data => setClimbers(data.content))
        else if(values.cardNumber)
            fetch(climbersRequest + `by-card-number?cardNumber=${values.cardNumber}`)
                .then(res => res.json())
                .then(data => setClimbers(data))
        else if(values.phoneNumber) {
            //TODO
        }
        else
            fetch(climbersRequest + 'all')
                .then(res => res.json())
                .then(data => setClimbers(data.content))

        form.resetFields()
    }

    // key contains cardNumber
    const handleProfileRedirect = async (key) => {

        const response = await fetch(`http://localhost:8080/card-associated/get?cardNumber=${key}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        const data = await response.json();
        if(data.climber !== null)
            navigate('/Profil',{state:{cardNumber:data.climber.cardNumber}});

    }

    const handleProfileDelete = async (id) => {
        const res = await fetch(`http://localhost:8080/climbers/delete?climberId=${id}`,{
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
            },
        })

        handleReload()

    }


    let dataSource
    if(Array.isArray(climbers)) {
        dataSource = climbers.map(climber => ({
            key: climber.cardNumber,
            firstName: climber.firstName,
            lastName: climber.lastName,
            cardNumber: climber.cardNumber,
            phoneNumber: climber.phoneNumber,
            id: climber.id

        }))
    } else {
        dataSource = [{
            key: climbers.cardNumber,
            firstName: climbers.firstName,
            lastName: climbers.lastName,
            cardNumber: climbers.cardNumber,
            phoneNumber: climbers.phoneNumber,
            id: climbers.id
        }]
    }

    const columns = [
        {
            title: 'Imię',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Nazwisko',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Numer karty',
            dataIndex: 'cardNumber',
            key: 'cardNumber',
        },
        {
            title: 'Numer telefonu',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Profil',
            dataIndex: 'profile',
            render: (_, record) => <a onClick={()=>handleProfileRedirect(record.key)}> Przejdź </a>
        },
        {
            title:"Usuń",
            dataIndex: "delete",
            render: (_, record) =>
                <Popconfirm
                    title="Are you sure？"
                    onConfirm={()=>handleProfileDelete(record.id)}
                    icon={
                        <QuestionCircleOutlined
                            style={{
                                color: 'red',
                            }}
                        />
                    }
                >
                    <a> <CloseCircleFilled style={{color:"red", fontSize:"20px"}} /> </a>
                </Popconfirm>
        }
    ];


    return(
        <div className="AllClimbersComponent">

            <Form
                className='form'
                layout="inline"
                form={form}
                onFinish={onFinish}
            >

                <Form.Item name="firstName"  style={{width:"150px"}}>
                    <Input placeholder="Imię" prefix={<SearchOutlined />} />
                </Form.Item>
                <Form.Item name="lastName" style={{width:"150px"}}>
                    <Input placeholder="Nazwisko" prefix={<SearchOutlined />} />
                </Form.Item>
                <Form.Item name="cardNumber" style={{width:"150px"}}>
                    <Input placeholder="Numer karty" prefix={<SearchOutlined />} />
                </Form.Item>
                <Form.Item name="phoneNumber" style={{width:"150px"}}>
                    <Input placeholder="Numer telefonu" prefix={<SearchOutlined />} />
                </Form.Item>

                <Form.Item >
                    <Button
                        className='button'
                        type="primary"
                        htmlType="submit"
                        style={{borderRadius:'2px'}}
                    >
                        Szukaj
                    </Button>
                </Form.Item>
            </Form>

            <Table
                className='table'
                dataSource={dataSource}
                columns={columns} 
                pagination={{ pageSize: 10 }} 
                scroll={{ y: 600, x: 600 }}
            />
        </div>
    )
}
export default AllClimbersComponent