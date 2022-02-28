import { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Col, Row, DropdownButton, Dropdown, Button, OverlayTrigger ,Popover } from "react-bootstrap"

const InputTodo = ( props ) => {

    const [todo, setTodo] = useState("")

    const HandleChange = (event) => {
        setTodo(event.target.value)
    }

    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Login</Popover.Header>
          <Popover.Body>
            You'll have to register to post new to-dos!
          </Popover.Body>
        </Popover>
      )

    const PostTodo = () => {
        let newTodo = {
            content: todo,
            important: props.importance
        }

        if(props.user.token) {

            let userToken = `bearer ${props.user.token}`
            console.log(userToken)

            fetch(`${process.env.DEV_URI}/api/todos`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `${userToken}`
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
        

        const newTodos = [...props.todos, newTodo]
        props.setTodos(newTodos)
        setTodo("")
    }

    const PostButton = (props) => {
        if (props.logged) {
            return <Button variant="primary" onClick={PostTodo} className="px-1" >Save</Button>
        } else {
            return (
                <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                    <Button variant="primary" className="px-1">Save</Button>
                </OverlayTrigger>
            )        
        }
    }

    return (
        <>
            <Row className="justify-content-md-center">
                <Col xs="10">
                    <Form.Control value={todo} placeholder="Task" onChange={HandleChange} />
                </Col>
                <Col>
                    <DropdownButton id="dropdown-basic-button" title="Importance" className="px-1">
                        <Dropdown.Item onClick={props.SetImportantTrue}>True</Dropdown.Item>
                        <Dropdown.Item onClick={props.SetImportantFalse}>False</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col>
                    <PostButton logged={props.logged}/>
                </Col>
            </Row>
        </>
    )
}

export default InputTodo