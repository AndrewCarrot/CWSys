import { Modal, Button, Input } from "antd"
import {
    ContactsTwoTone,
    PhoneTwoTone,
    CreditCardTwoTone
} from '@ant-design/icons';
import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import '../styles/ClimberProfileComponent.css'

const ClimberProfileComponent = () => {

    const [climber, setClimber] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditModal, setIsEditModal] = useState(false)
    
    const location = useLocation()

    useEffect(() => {
        setClimber(location.state.climber)
        console.log(location.state.climber)
    }, [])

    const showModal = () => {
        setIsModalOpen(true);
      };
     
    const editModal = () => {
        setIsEditModal(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditModal(false);
    }

    return (
        <div className="ClimberProfileComponent">
            <p><ContactsTwoTone /> {climber.firstName} {climber.lastName}</p>
            <p><CreditCardTwoTone /> {climber.cardNumber}</p>
            <p><PhoneTwoTone /> {climber.phoneNumber}</p>
            <Button type="primary" onClick={showModal}>
                Notatka
            </Button>
            <Modal 
                title="Notatka"
                open={isModalOpen} 
                onCancel={closeModal}
                footer={[
                    <Button
                        type="primary"
                        onClick={editModal}
                    >
                        Edytuj
                    </Button>,
                    <Button
                        type='primary'
                        
                    >
                        Ok
                    </Button>
                ]}
                >
                {isEditModal ? <Input.TextArea rows={4} value={climber.note} maxLength={6} /> : climber.note}
            </Modal>
        </div>
    )
}
export default ClimberProfileComponent

// cardNumber

// classPass

// firstName

// id

// lastName

// note

// phoneNumber

// punchPass

// timePass
