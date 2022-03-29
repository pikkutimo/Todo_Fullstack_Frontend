import React, { useState } from 'react';
import { Modal, Button, Form, DropdownButton, Dropdown } from 'react-bootstrap'

const EditModal = (props) => {

    const [editedContent, setEditedContent] = useState();

    const handleChange = (event) => {
      setEditedContent(event.target.value)
    }

    const putTodo = () => {
      let editedTodo = {
        content: editedContent,
        important: props.importance,
        done: props.done
      }

      fetch(`${process.env.REACT_APP_PROD_URI}/api/todos/${props.id}`, {
          method: 'PUT',
          headers: {
              'Content-Type' : 'application/json',
              'Authorization': `bearer ${props.user.token}`
          },
          body: JSON.stringify(editedTodo),
      })
      .then(response => response.json())
      .then(editedTodo => {
          console.log('Edit success:', editedTodo)
      })
      .catch((error) => {
          console.log('Error: ', error)
      })

      let todos = [...props.todos]
      todos[props.index] = {...todos[props.index], content: editedContent, important: props.importance, done: props.done}
      props.setTodos(todos)
      props.setEditModalShow(false)
    }

    return (
      <>
        <Modal show={props.modalShow} enforceFocus={true} keyboard={true}>
          <Modal.Header>
            <Modal.Title>Edit Todo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Control placeholder={props.content} onChange={handleChange}></Form.Control>
            </Form>
          </Modal.Body>
          <Modal.Footer>
          <DropdownButton id="dropdown-basic-button" title="Importance">
          <Dropdown.Item onClick={props.SetImportantTrue}>True</Dropdown.Item>
          <Dropdown.Item onClick={props.SetImportantFalse}>False</Dropdown.Item>
          </DropdownButton>
            <Button variant="primary" onClick={putTodo}>
              Save Changes
            </Button>
            <Button variant="secondary" onClick={() => props.setEditModalShow(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

  export default EditModal