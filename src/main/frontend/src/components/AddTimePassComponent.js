import '../styles/AddTimePassComponent.css'
import {Alert, Button, InputNumber, Modal, Select} from "antd";
import {PlusCircleFilled} from "@ant-design/icons";
import { useState } from 'react'

const timeSelectStyles = {
    width: "45%",
    float:"left"
}

const typeSelectStyles = {
    width: "50%",
    float: "right"
}

const AddTimePassComponent = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [timeSelect, setTimeSelect] = useState("")
    const [typeSelect, setTypeSelect] = useState("")
    const [err, setErr] = useState(false)


    const date = new Date();
    const year = date.getFullYear();
// 👇️ getMonth returns integer from 0(January) to 11(December)
    const month = date.getMonth() + 1;
    const paddedMonth = month.toString().padStart(2,'0')
    const day = date.getDate();
    const paddedDay = day.toString().padStart(2, '0')


    function handleModalClose(){
        setTimeSelect("")
        setTypeSelect("")
        setIsModalOpen(false)
        setErr(false)
    }

    function handleTimeSelect(value){
        setTimeSelect(value)
    }

    function handleTypeSelect(value){
        setTypeSelect(value)
    }

    const handleModalSubmit = async() =>{

        if (timeSelect === "")
            setErr(true)
        else if(typeSelect === "")
            setErr(true)
        else {
            const response = await fetch(`http://localhost:8080/timePass/${props.climberId}/new`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    discount: typeSelect === 'ulgowy',
                    note: "",
                    duration: timeSelect,
                    validFrom: `${year}-${paddedMonth}-${paddedDay}` //yyyy-mm-dd
                })
            });

            if (response.ok) {
                props.handleReload()
            }

            setTimeSelect("")
            setTypeSelect("")
            setIsModalOpen(false)
        }
    }

    return(
        <div className="AddTimePassComponent">
            <Button type="primary" onClick={()=>setIsModalOpen(true)}>
                <PlusCircleFilled /> Czasowy
            </Button>
            <Modal
                title="Karnet Czasowy"
                open={isModalOpen}
                onCancel={handleModalClose}
                className="modal"
                footer={[
                    <Button key="cancel" type="primary"  onClick={handleModalClose}>
                        Anuluj
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleModalSubmit}
                    >
                        Dodaj
                    </Button>,
                ]}
                destroyOnClose={true}
            >
                <Select
                    defaultValue="Czas karnetu"
                    style={timeSelectStyles}
                    onChange={handleTimeSelect}
                >
                    <Select.Option value="ONE_MONTH">30 dniowy</Select.Option>
                    <Select.Option value="THREE_MONTHS">90 dniowy</Select.Option>
                </Select>
                <Select
                    defaultValue="Typ karnetu"
                    style={typeSelectStyles}
                    onChange={handleTypeSelect}
                >
                    <Select.Option value="ulgowy">ulgowy</Select.Option>
                    <Select.Option value="normalny">normalny</Select.Option>
                </Select>
                {err && <Alert style={{width:160}}  message={timeSelect === "" ? "Podaj czas karnetu!" : "Wybierz typ karnetu!"} type="error" />}
            </Modal>
        </div>
    )
}
export default AddTimePassComponent