import {Popconfirm, Space, Table, message, Modal, Input, Button} from "antd";
import {
    EditTwoTone,
    MinusCircleFilled,
    MinusSquareTwoTone,
    PlusSquareTwoTone,
    QuestionCircleOutlined
} from "@ant-design/icons";
import {useState} from "react";

const ClassPassComponent = (props) => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [inputValue, setInputValue] = useState(null)

    function getParsedDate(date){

        if (date) {
            let dd = date[2];
            let mm = date[1];

            let yyyy = date[0];
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            let parsedDate = yyyy + "-" + mm + "-" + dd;
            return parsedDate.toString();
        }
    }
    const validFrom = new Date(getParsedDate(props.pass.validFrom))
    const validTill = new Date(getParsedDate(props.pass.validTill))
    const daysLeft = Math.ceil((validTill.getTime()-validFrom.getTime()))/ (1000 * 3600 * 24)


    const handleAddPunch = async() => {
        const response = await fetch(`http://localhost:8080/classPass/${props.climberId}/givePunch`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
            },
        });
            if(response.ok){
                props.handleReload()
                message.success("Pomyślnie dodano wejście na sekcje !")
            }else{
                message.error("Coś poszło nie tak")
            }
    }

    const handleTakePunch = async() => {
        const response = await fetch(`http://localhost:8080/classPass/${props.climberId}/takePunch`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
            },
        });
            if(response.ok){
                props.handleReload()
                message.success("Pomyślnie zdjęto wejście z karnetu !")
            }else{
                message.error("Coś poszło nie tak")
            }
    }

    const handleDelete = async() => {
        const response = await fetch(`http://localhost:8080/classPass/${props.climberId}/delete`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json'
            }
        })
        if(response.ok){
            message.success("Pomyślnie usunięto karnet!")
            props.handleReload()
        }else{
            message.error("błąd serwera")
        }
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
        setInputValue(null)
    }

    /* Wydłużenie ważności karnetu */
    const handleModalConfirm = async() => {
        if(inputValue !== null) {
            const res = await fetch(`http://localhost:8080/classPass/${props.climberId}/addDays?days=${inputValue}`, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json'
                }
            });

            if (res.ok) {
                message.success("Pomyślnie wydłużono czas trwania karnetu!")
                handleModalClose()
                props.handleReload()
            }else{
                message("Coś poszło nie tak")
            }
        }else{
            message.error("Określ ilość dni")
        }
    }

    const handlePassRenew = async() => {
        const res = await fetch(`http://localhost:8080/classPass/${props.climberId}/renew`,{
            method: 'PATCH',
            headers: {
                Accept: 'application/json'
            }
        });

        if(res.ok){
            message.success("Pomyślne odnowiono karnet!")
            handleModalClose()
            props.handleReload()
        }else{
            message.error("Coś poszło nie tak")
        }
    }



    const dataSource = [
        {
            key: '1',
            type: "Sekcja",
            discount: props.pass.discount === true ? "ulgowy" : "normalny",
            validFrom: getParsedDate(props.pass.validFrom),
            validTill: getParsedDate(props.pass.validTill),
            leftDays: daysLeft,
            punches: props.pass.punches
        }
    ];

    const columns = [
        {
            title: 'Karnet',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Typ karnetu',
            dataIndex: 'discount',
            key: 'discount',
        },
        {
            title: 'Ważny od',
            dataIndex: 'validFrom',
            key: 'validFrom',
        },
        {
            title: 'Ważny do',
            dataIndex: 'validTill',
            key: 'validTill',
        },
        {
            title: 'Pozostało dni',
            dataIndex: 'leftDays',
            key: 'leftDays',
        },

        {
            title: 'Pozostało wejść',
            dataIndex: 'punches',
            key: 'punches',
        },
        {
            title: 'Wejście',
            dataIndex: 'entrance',
            render: (_, record) =>(
                <Space size="middle">
                    <a onClick={handleAddPunch} > <PlusSquareTwoTone style={{fontSize: 20}} />  </a>
                    <a onClick={handleTakePunch} > <MinusSquareTwoTone style={{fontSize: 20}} /> </a>
                </Space>
            )
        },
        {
            title:'Edycja',
            dataIndex: 'edit',
            render: (_,record)=>(
                <a onClick={()=>setIsModalOpen(true)}><EditTwoTone style={{fontSize: 20}} /></a>
            )
        },
        {
            title:'Usuń',
            dataIndex: 'delete',
            render: (_,record)=>(
                <Popconfirm
                    title="Are you sure？"
                    onConfirm={handleDelete}
                    icon={
                        <QuestionCircleOutlined
                            style={{
                                color: 'red',
                            }}
                        />
                    }
                >
                    <a> <MinusCircleFilled  style={{fontSize: 20}} /> </a>
                </Popconfirm>
            )
        }


    ];


    return(
        <div className="ClassPassComponent">
            <Table 
                dataSource={dataSource} 
                columns={columns} 
                pagination={false}
                scroll={{
                    x: 500,
                  }}
                />
            <Modal
                title="Edycja"
                open={isModalOpen}
                onCancel={handleModalClose}
                footer={[
                    <Button
                        type={"primary"}
                        style={{backgroundColor:"green", float:"left"}}
                        onClick={handlePassRenew}
                    >
                        Odnów karnet
                    </Button>,
                    <Button
                        type={"primary"}
                        onClick={handleModalConfirm}
                    >
                        Przedłuż
                    </Button>
                ]}
            >
                <Input
                    placeholder="wydłużenie dni"
                    onChange={handleInputChange}
                    value={inputValue}
                >

                </Input>
            </Modal>
        </div>
    )
}
export default ClassPassComponent