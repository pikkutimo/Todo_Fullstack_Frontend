import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { ListGroup, Row, Col, Button, Container, Form } from "react-bootstrap"
import { MdDeleteOutline, MdModeEdit } from 'react-icons/md' 


const ListComponent = ( props ) => {
  const [todos, setTodos] = useState([])

  const fetchData = () => {
    // utilizing heroku api
    fetch("https://rocky-harbor-47876.herokuapp.com/api/todos")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setTodos(data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const DeleteTodo = ( id ) => {
    fetch(`https://rocky-harbor-47876.herokuapp.com/api/todos/${id}`, {
            method: 'DELETE'
        })
        .then(id => {
            console.log('Deleted:', id)
        })
        .catch((error) => {
            console.log(`Error deleting ${id}: `, error)
        })
  }

  const toDone = (todo) => {
    console.log(`${todo.content}, Done!`)
    props.setDone(true)
  }

  return (
    <>
      <ListGroup>
        <ListGroup.Item>
          {todos.map((todo, index) => (
            <ListGroup.Item key={todo.id} data-value={todo}>
              <Row onClick={() => toDone(todo)}>
                <Col xs={8}>
                  <Form.Text bg="success">
                    {todo.content}
                  </Form.Text>
                </Col>
                <Col xs={2}>
                    {JSON.stringify(todo.important)}
                </Col>
                <Col xs={1}>
                    <Button variant="primary" onClick={() => {
                        props.setModalShow(true)
                        props.setId(todo.id)
                        props.setContent(todo.content)
                        props.setImportance(todo.important)}
                      }>
                      <MdModeEdit />
                    </Button>
                </Col>
                <Col xs={1}>
                    <Button variant="primary" onClick={() => DeleteTodo(todo.id)}>
                      <MdDeleteOutline />
                    </Button>
                </Col>
            </Row>
            </ListGroup.Item>
          ))}
        </ListGroup.Item>
      </ListGroup>
    </>
  )
}

export default ListComponent