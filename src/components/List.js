import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { ListGroup, Row, Col, Button, Container } from "react-bootstrap"
import { MdDeleteOutline, MdModeEdit } from 'react-icons/md' 


const ListComponent = () => {
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

  return (
    <Container fluid="xa">
      <ListGroup>
        <ListGroup.Item>
          {todos.map((todo, index) => (
            <ListGroup.Item key={todo.id} data-value={todo}>
              <Row className="justify-content-md-center">
                <Col xs={8}>
                    {todo.content}
                </Col>
                <Col xs={2}>
                    {JSON.stringify(todo.important)}
                </Col>
                <Col xs={1}>
                    <Button variant="primary">
                      <MdModeEdit />
                    </Button>
                </Col>
                <Col xs={1}>
                    <Button variant="primary">
                      <MdDeleteOutline />
                    </Button>
                </Col>
            </Row>
            </ListGroup.Item>
          ))}
        </ListGroup.Item>
      </ListGroup>
    </Container>
  )
}

export default ListComponent