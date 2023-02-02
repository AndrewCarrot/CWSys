

import {message, Popconfirm, Space, Table} from "antd";
import {MinusCircleFilled, MinusSquareTwoTone, PlusSquareTwoTone, QuestionCircleOutlined} from "@ant-design/icons";


const PunchPassComponent = (props) => {


  const handleAddPunch = async() => {

    const response = await fetch(`http://localhost:8080/punchPass/${props.climberId}/givePunch`, {
      method: 'PATCH',
      headers:{
        Accept: 'application/json'
      }
    })
    if (!response.ok) {
      message.error("błąd serwera")
    } else {
      message.success("Pomyślnie dodano wejście na karnet !")
      props.handleReload()
    }

}

  const handleTakePunch = async () => {
    const response = await fetch(`http://localhost:8080/punchPass/${props.climberId}/takePunch`, {
      method: 'PATCH',
      headers:{
        Accept: 'application/json'
      }
    })
    if (!response.ok) {
      message.error("błąd serwera")
    } else {
      message.success("Pomyślnie zdjęto wejście z karnetu !")
      props.handleReload()
    }
    
  }

const handleDelete = async() => {
    const response = await fetch(`http://localhost:8080/punchPass/${props.climberId}/delete`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json'
        }
    })
        if(!response.ok){
          message.error("błąd serwera")
        }else{
          message.success("Pomyślnie usunięto karnet")
          props.handleReload()
        }
}


  const dataSource = [
    {
        key: '1',
        type: "Ilościowy",
        discount: props.pass.discount === true ? "ulgowy" : "normalny",
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
        <div className="PunchPassComponent">
            <Table 
              dataSource={dataSource}
              columns={columns} 
              pagination={false} 
              scroll={{
                x: 500,
              }}
            />
        </div>
    )
}

export default PunchPassComponent