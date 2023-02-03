import '../styles/AddPunchPass.css'

import {Alert, Button, InputNumber, message, Modal, Select} from "antd";
import {useState} from "react";
import {PlusCircleFilled} from "@ant-design/icons";

const inputNumberStyles={
    width: "45%"
}

const selectStyles ={
    width: "50%",
    float: "right"
}

const AddPunchPass = (props) => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [inputNumber, setInputNumber] = useState(8)
    const [selectValue, setSelectValue] = useState("")
    const [err, setErr] = useState(false)

    const handleModalClose = () => {
        setInputNumber(8);
        setSelectValue("");
        setIsModalOpen(false);
        setErr(false)
    }

    const handleModalSubmit = async() => {
        if(inputNumber === null){
            setErr(true)
        } else if(selectValue.length === 0){
            setErr(true)
        }else {
            const response = await fetch(`http://localhost:8080/punchPass/${props.climberId}/new`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    punches: inputNumber,
                    discount: selectValue === 'ulgowy',
                    note: ""
                })
            })

            if (response.ok) {
                props.handleReload()
            }else{
                message.error("Coś poszło nie tak")
            }

            // set the default value for the state
            handleModalClose()
        }
    }

    const handleInputNumber = (value) => {
        setInputNumber(value)
    }

    const handleSelect = (value) => {
        setSelectValue(value)
    }



    return (
        <div className="AddPunchPass">
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
                <PlusCircleFilled /> Ilościowy
            </Button>
            <Modal
                title="Karnet Ilościowy"
                open={isModalOpen}
                onCancel={handleModalClose}
                footer={[
                    <Button key="cancel" type="primary" onClick={handleModalClose}>
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
                <InputNumber
                    style={inputNumberStyles}
                    min={0}
                    max={100}
                    defaultValue={8}
                    onChange={handleInputNumber}
                />
                <Select
                    style={selectStyles}
                    defaultValue="Typ karnetu"
                    onChange={handleSelect}
                >
                    <Select.Option value="ulgowy">ulgowy</Select.Option>
                    <Select.Option value="normalny">normalny</Select.Option>
                </Select>

                {err && <Alert style={{ width: 160 }} message={inputNumber === null ? "Podaj ilość wejść!" : "Wybierz typ karnetu!"} type="error" />}
            </Modal>
        </div>
    )
}
export default AddPunchPass