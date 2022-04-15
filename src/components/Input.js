import { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Col, Row, DropdownButton, Dropdown, Button, OverlayTrigger ,Popover } from "react-bootstrap"

const InputTodo = ( props ) => {

    const [todo, setTodo] = useState("")

    const HandleChange = (event) => {
        setTodo(event.target.value)
    }

    const popover_logged = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Login</Popover.Header>
          <Popover.Body>
            You'll have to register to post new to-dos!
          </Popover.Body>
        </Popover>
      )
    
    const popover_short = (
    <Popover id="popover-basic">
        <Popover.Header as="h3">Too short</Popover.Header>
        <Popover.Body>
            You'll have to write longer todos at least 5 characters long!
        </Popover.Body>
    </Popover>
    )

    const PostTodo = () => {
        let newTodo = {
            content: todo,
            important: props.importance
        }

        if(props.user.token) {

            const requestOptions = {
                method: 'POST',
                  headers: {
                      'Content-Type' : 'application/json',
                      'Authorization': `bearer ${props.user.token}`
                  },
                  body: JSON.stringify(newTodo),
              }
           
            fetch(`${process.env.REACT_APP_PROD_URI}/api/todos`, requestOptions)
            .then(response => response.json())
            .then(function (newTodo) {
                    console.log(newTodo)
                    const newTodos = [...props.todos, newTodo]
                    props.setTodos(newTodos)
                })
            .catch((error) => {
                console.log('Error: ', error)
            })
        }
        

        
        setTodo("")
    }

    const PostButton = (props) => {
        if (!props.logged) {
            return (
                <OverlayTrigger trigger="click" placement="right" overlay={popover_logged}>
                    <Button variant="primary" className="px-1">Save</Button>
                </OverlayTrigger>
            )    
        } else if (props.logged && todo.length < 5) {
            return (
                <OverlayTrigger trigger="click" placement="right" overlay={popover_short}>
                    <Button variant="primary" className="px-1">Save</Button>
                </OverlayTrigger>
            ) 
        }else {
            return <Button variant="primary" onClick={PostTodo} className="px-1" >Save</Button> 
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