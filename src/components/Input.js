import { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Col, Row, DropdownButton, Dropdown, Button } from "react-bootstrap"

const InputTodo = ( props ) => {

    const [todo, setTodo] = useState("")

    const HandleChange = (event) => {
        setTodo(event.target.value)
    }

    const PostTodo = () => {
        let newTodo = {
            content: todo,
            important: props.importance
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

        const newTodos = [...props.todos, newTodo]
        props.setTodos(newTodos)
    }

    return (
        <>
            <Row className="justify-content-md-center">
                <Col xs="10">
                    <Form.Control placeholder="Task" onChange={HandleChange} />
                </Col>
                <Col>
                    <DropdownButton id="dropdown-basic-button" title="Importance" className="px-1">
                        <Dropdown.Item onClick={props.SetImportantTrue}>True</Dropdown.Item>
                        <Dropdown.Item onClick={props.SetImportantFalse}>False</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col>
                    <Button variant="primary" onClick={PostTodo} className="px-1">Save</Button>
                </Col>
            </Row>
        </>
    )
}

export default InputTodo