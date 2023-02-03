import { Modal, Button, Input, Alert } from "antd"
import {
    ContactsTwoTone,
    PhoneTwoTone,
    CreditCardTwoTone,
    PropertySafetyFilled
} from '@ant-design/icons';
import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import '../styles/ClimberProfile.css'
import PunchPass from "./PunchPass.js";
import TimePass from "./TimePass.js"
import AddPunchPass from "./AddPunchPass";
import AddClassPass from "./AddClassPass";
import AddTimePass from './AddTimePass'
import ClassPass from "./ClassPass";

const ClimberProfile = () => {

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
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditModal, setIsEditModal] = useState(false)
    const [reload, setReload] = useState(false)
    const [textAreaValue, setTextAreaValue] = useState('')

    
    const location = useLocation()

    useEffect(() => {
        fetch(`http://localhost:8080/climbers/get/by-card-number?cardNumber=${location.state.cardNumber}`)
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
        </div>
    )
}
export default ClimberProfile
