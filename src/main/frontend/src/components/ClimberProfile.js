import { Modal, Button, Input, Alert, message } from "antd"
import {
    ContactsTwoTone,
    PhoneTwoTone,
    CreditCardTwoTone,
    PropertySafetyFilled,
    UserOutlined,
    PhoneOutlined,
    CreditCardOutlined
} from '@ant-design/icons';
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import '../styles/ClimberProfile.css'
import PunchPass from "./PunchPass.js";
import TimePass from "./TimePass.js"
import AddPunchPass from "./AddPunchPass";
import AddClassPass from "./AddClassPass";
import AddTimePass from './AddTimePass'
import ClassPass from "./ClassPass";

const ClimberProfile = () => {

    const accesToken = window.localStorage.getItem('token')

    const [climber, setClimber] = useState({
        cardNumber: '',
        classPass:{},
        firstName: '',
        id: '',
        lastName: '',
        note: '',
        phoneNumber: '',
        punchPass: {},
        timePass: {}
    })

    const [dataEditValues, setDataEditValues] = useState({
        firstName:"",
        lastName:"",
        phoneNumber:"",
        cardNumber:""
    })
    const [error, setError] = useState({
        err:false,
        msg:""
    })
    const navigate = useNavigate()
    const [isDataEditOpen, setIsDataEditOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditModal, setIsEditModal] = useState(false)
    const [reload, setReload] = useState(false)
    const [textAreaValue, setTextAreaValue] = useState('')

    
    const location = useLocation()

    useEffect(() => {
        fetch(`http://localhost:8080/climbers/get/by-card-number?cardNumber=${location.state.cardNumber}`,{
            method:'GET',
            headers:{
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin':'*',
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `Bearer ` + accesToken
            }
        })
        .then(async response =>{
            const data = await response.json();
            setClimber(data)
            setTextAreaValue(data.note)
    })
            
    }, [reload])

    const handleReload = () => {
        setReload(prev => !prev)
    }

    const showModal = () => {
        setIsModalOpen(true);
      };
     
    const editModal = () => {
        setIsEditModal(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditModal(false);
        setTextAreaValue(climber.note)
    }

    const editNote = () => {
        fetch(`http://localhost:8080/climbers/update-note?climberId=${climber.id}`, {
            method: 'PATCH',
            body: textAreaValue.length === 0 ? ' ' : textAreaValue,
            headers: {
                'Content-type': 'application/json'
  },
})
    closeModal()
    handleReload()
    
    }

    function handleDataEditChange(e){
        setDataEditValues(prevState => ({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    function openDataEditModal(){
        setDataEditValues({
            firstName: climber.firstName,
            lastName: climber.lastName,
            phoneNumber: climber.phoneNumber,
            cardNumber: climber.cardNumber
        })
        setIsDataEditOpen(true)
    }

    function closeDataEditModal(){
        setIsDataEditOpen(false)
        
    }

    const handleDataEdit = async () => {

        if(dataEditValues.firstName === "" || dataEditValues.lastName === "" || dataEditValues.phoneNumber === "" || dataEditValues.cardNumber === ""){
            setError({
                err:true,
                msg:"Wszystkie pola musza być wypelnione"
            })
        }else if(dataEditValues.cardNumber.length !== 10){
            setError({
                err: true,
                msg:"Nieprawidłowa długość numeru karty"
            })
        }else if(isNaN(dataEditValues.cardNumber)){
            setError({
                err: true,
                msg:"Numer karty zawiera niedozwolone znaki"
            })
        }else {
            const res = await fetch(`http://localhost:8080/climbers/update?climberId=${climber.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cardNumber: dataEditValues.cardNumber,
                    firstName: dataEditValues.firstName,
                    lastName: dataEditValues.lastName,
                    phoneNumber: dataEditValues.phoneNumber
                })
            })

            if (res.ok) {
                message.success("Pomyślnie zmieniono dane!")
                setIsDataEditOpen(false)
                setError({
                    err: false,
                    msg: ""
                })
                navigate('/Profil', {state:{cardNumber: dataEditValues.cardNumber}});
                handleReload()
            } else {
                setError({
                    err: true,
                    msg: "Coś poszło nie tak"
                })
                console.log(res)
            }
        }
    }

    return (
        <div className="ClimberProfile">
            <div className="top-badge">
                <p><ContactsTwoTone /> {climber.firstName} {climber.lastName}</p>
                <p><CreditCardTwoTone /> {climber.cardNumber}</p>
                <p><PhoneTwoTone /> {climber.phoneNumber}</p>
                <Button type="primary" onClick={showModal}>
                    Notatka
                </Button>
            </div>

            <div className="alert">
                {climber.note && climber.note.trim().length > 0 && <Alert message={climber.note} type="info" showIcon />}
            </div>

            <div className="passes">
                <p className="pass-badge">Karnety:</p>
                <div className="buttons">
                    
                    <AddPunchPass climberId={climber.id} handleReload={handleReload}/>
                    <AddTimePass climberId={climber.id} handleReload={handleReload}/>
                    <AddClassPass climberId={climber.id} handleReload={handleReload}/>
                   
                </div>
                <div className="pass-tables">
                    { climber.punchPass && <PunchPass pass={climber.punchPass} climberId={climber.id} handleReload={handleReload}/>}
                    { climber.timePass && <TimePass pass={climber.timePass} climberId={climber.id} handleReload={handleReload} /> }
                    { climber.classPass && <ClassPass pass={climber.classPass} climberId={climber.id} handleReload={handleReload} /> }
                </div>
            </div>

            <Modal
                title="Notatka"
                open={isModalOpen}
                onCancel={closeModal}
                footer={[
                    <Button
                        key={'edit'}
                        type="primary"
                        onClick={editModal}
                    >
                        Edytuj
                    </Button>,
                    <Button
                        key={'saveChanges'}
                        type='primary'
                        onClick={editNote}
                    >
                        Zapisz zmiany
                    </Button>,
                    <Button
                        key={'submit'}
                        type='primary'
                        onClick={closeModal}
                    >
                        Ok
                    </Button>
                ]}
            >
                {isEditModal ? <Input.TextArea onChange={(event) => setTextAreaValue(event.target.value)} rows={4} value={textAreaValue} /> : climber.note}
            </Modal>

            {/* Modal edycji danych */}
            <div className="edit--button--div">
                <Button
                    type="primary"
                    danger={true}
                    style={{width:"100px", marginTop:"100px"}}
                    onClick={openDataEditModal}
                >
                    Edytuj dane
                </Button>
            </div>
            <Modal
                bodyStyle={{display:"flex", flexDirection:"horizontal", height:"120px"}}
                title="Edycja danych"
                open={isDataEditOpen}
                onCancel={closeDataEditModal}
                footer={[
                    <Button
                        key="cancel"
                        type="primary"
                        onClick={closeDataEditModal}
                    >
                        Anuluj
                    </Button>,
                    <Button
                        key="confirm"
                        type="primary"
                        onClick={handleDataEdit}
                    >
                        Zapisz zmiany
                    </Button>,
                     error.err && <Alert key="error" type="error" showIcon message={error.msg} description="spróbuj ponownie" style={{fontWeight:"bold"}}/>
                ]}
            >
                <div
                    style={{
                        marginRight: "10px"
                    }}
                >
                    <Input
                        style={{
                            marginBottom:"10px"
                        }}
                        placeholder="Imię"
                        name="firstName"
                        value={dataEditValues.firstName}
                        onChange={handleDataEditChange}
                        prefix={<UserOutlined />}
                    />
                    <Input
                        placeholder="Nazwisko"
                        name="lastName"
                        value={dataEditValues.lastName}
                        onChange={handleDataEditChange}
                        prefix={<UserOutlined />}
                    />
                </div>
                <div>
                    <Input
                        style={{
                            marginBottom:"10px"
                        }}
                        placeholder="Telefon"
                        name="phoneNumber"
                        value={dataEditValues.phoneNumber}
                        onChange={handleDataEditChange}
                        prefix={<PhoneOutlined />}
                    />

                    <Input
                        placeholder="Karta"
                        name="cardNumber"
                        value={dataEditValues.cardNumber}
                        onChange={handleDataEditChange}
                        prefix={<CreditCardOutlined />}
                    />
                </div>

            </Modal>
        </div>
    )
}
export default ClimberProfile
