import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { ListGroup, Row, Col, Button, Form } from "react-bootstrap"
import { MdDeleteOutline, MdModeEdit } from 'react-icons/md'


const ListComponent = ( props ) => {

  const DeleteTodo = (todo) => {

    const requestOptions = {
      method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': `bearer ${props.user.token}`
        },
    }

    fetch(`${process.env.REACT_APP_PROD_URI}/api/todos/${todo.id}`, requestOptions)
        .then(id => {
            console.log(`Deleted: ${todo.id}`)
        })
        .catch((error) => {
            console.log(`Error deleting ${todo.id}: `, error)
        })

        const newTodos = props.todos.filter((item) => todo.id !== item.id)
        props.setTodos(newTodos)
  }

  const toDone = (index, todo) => {
    
    const newTodos = [...props.todos]
    const editedTodo = {
      content: todo.content,
      importance: todo.importance,
      done: !todo.done
    }

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${props.user.token}`
      },
      body: JSON.stringify(editedTodo),
    }

    fetch(`${process.env.REACT_APP_PROD_URI}/api/todos/${todo.id}`, requestOptions)
      .then(response => response.json())
      .then(editedTodo => {
          console.log('Edit success:', editedTodo)
      })
      .catch((error) => {
          console.log('Error: ', error)
      })

    newTodos[index] = editedTodo
    props.setTodos(newTodos) 
  }

  return (
    <>
      <ListGroup>
          {props.todos.map((todo, index) => (
            <ListGroup.Item key={index} data-value={todo}>
              <Row className="justify-content-sm">
                <Col sm={1}>
                  <Form.Check 
                    type={'checkbox'}
                    id={todo.id}
                    checked={todo.done}
                    onChange={() => toDone(index, todo)}
                  />
                </Col>
                <Col sm={7}>
                    <Form.Text className={todo.done ? "done" : "notDone"}>
                      {todo.content}
                    </Form.Text>
                </Col>
                <Col sm={2}>
                    {todo.important ? 'important' : '-'}
                </Col>
                <Col sm={1}>
                    <Button variant="primary" onClick={() => {
                        props.setIndex(index)
                        props.setModalShow(true)
                        props.setId(todo.id)
                        props.setContent(todo.content)
                        props.setImportance(todo.important)}
                      }>
                      <MdModeEdit />
                    </Button>
                </Col>
                <Col sm={1}>
                    <Button variant="primary" onClick={() => DeleteTodo(todo)}>
                      <MdDeleteOutline />
                    </Button>
                </Col>
            </Row>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </>
  )
}

export default ListComponent