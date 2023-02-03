import '../styles/AddClassPass.css'


import {useState} from "react";
import {Alert, Button, Modal, Select} from "antd";
import {PlusCircleFilled} from "@ant-design/icons";

const frequencySelectStyles = {
    width: "45%",
    float: "left"
}

const typeSelectStyles = {
    width: "50%",
    float: "right"
}

const AddClassPass = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [frequencySelect, setFrequencySelect] = useState("")
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
        setTypeSelect("")
        setFrequencySelect("")
        setIsModalOpen(false)
        setErr(false)
    }

    function handleFrequencySelect(value){
        setFrequencySelect(value)
    }

    function handleTypeSelect(value){
        setTypeSelect(value)
    }


    const handleModalSubmit = async() =>{

        if(frequencySelect === "")
            setErr(true)
        else if(typeSelect === "")
            setErr(true)
        else {
            const response = await fetch(`http://localhost:8080/classPass/${props.climberId}/new`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    discount: typeSelect === 'ulgowa' || typeSelect === "dziecięca",
                    note: "",
                    classFrequency: frequencySelect,
                    validFrom: `${year}-${paddedMonth}-${paddedDay}`, //yyyy-mm-dd
                    multisport: false
                })
            });

            if (response.ok)
                props.handleReload()

            handleModalClose()
        }
    }

    return(
        <div className="AddClassPass">
            <Button type="primary" onClick={()=>setIsModalOpen(true)}>
                <PlusCircleFilled /> Sekcja
            </Button>
            <Modal
                className='modal'
                title="Karnet Sekcja"
                open={isModalOpen}
                onCancel={handleModalClose}
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
                    defaultValue="Ilość sekcji"
                    style={frequencySelectStyles}
                    onChange={handleFrequencySelect}
                >
                    <Select.Option value="ONCE_PER_WEEK">Raz w tygodniu</Select.Option>
                    <Select.Option value="TWICE_PER_WEEK">Dwa razy w tygodniu</Select.Option>
                </Select>
                <Select
                    defaultValue="Typ sekcji"
                    style={typeSelectStyles}
                    onChange={handleTypeSelect}
                >
                    <Select.Option value="ulgowa">ulgowa</Select.Option>
                    <Select.Option value="normalna">normalna</Select.Option>
                    <Select.Option value="dziecięca">dziecięca</Select.Option>
                </Select>
                {err && <Alert style={{width:160}}  message={frequencySelect === "" ? "Podaj ilość zajęć!" : "Wybierz typ sekcji!"} type="error" />}
            </Modal>
        </div>
    )
}
export default AddClassPass