import { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Form, Col, Row, DropdownButton, Dropdown, Button } from "react-bootstrap"

const InputTodo = () => {

    const [todo, setTodo] = useState("")
    const [importance, setImportance] = useState(false)

    const SetImportantTrue = () => {
        console.log('set importance true')
        setImportance(true)
    }

    const SetImportantFalse = () => {
        console.log('set importance false')
        setImportance(false)
    }

    const HandleChange = (event) => {
        setTodo(event.target.value)
    }

    const PostTodo = () => {
        let newTodo = {
            content: todo,
            important: importance
        }

        fetch("https://rocky-harbor-47876.herokuapp.com/api/todos", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(newTodo),
        })
        .then(response => response.json())
        .then(newTodo => {
            console.log('Success:', newTodo)
        })
        .catch((error) => {
            console.log('Error: ', error)
        })
    }

    return (
        <>
            <Container fluid="md">
                <Row className="justify-content-md-center">
                    <Col xs="8">
                        <Form.Control placeholder="Task" onChange={HandleChange} />
                    </Col>
                    <Col xs="2">
                        <DropdownButton id="dropdown-basic-button" title="Importance">
                            <Dropdown.Item onClick={SetImportantTrue}>True</Dropdown.Item>
                            <Dropdown.Item onClick={SetImportantFalse}>False</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                    <Col xs="2">
                        <Button variant="primary" onClick={PostTodo}>Save</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default InputTodo