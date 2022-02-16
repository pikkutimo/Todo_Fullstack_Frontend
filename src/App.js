import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'
import InputTodo from './components/Input';
import './components/List'
import ListComponent from './components/List';


const App = () => {
  const [modalShow, setModalShow] = useState(false);
  const [id, setId] = useState();
  const [content, setContent] = useState();
  const [importance, setImportance] = useState(false)

  const EditModal = (props) => {

    const [editedContent, setEditedContent] = useState();

    const handleChange = (event) => {
      setEditedContent(event.target.value)
    }

    const putTodo = () => {
      let editedTodo = {
        content: editedContent,
        important: importance
      }

      fetch(`https://rocky-harbor-47876.herokuapp.com/api/todos/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type' : 'application/json',
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
    }

    return (
      <>
        <Modal show={props.modalShow} enforceFocus={true} keyboard={true}>
          <Modal.Header>
            <Modal.Title>Edit Todo {id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Control placeholder={content} onChange={handleChange}></Form.Control>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => props.setModalShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => {
                if (editedContent) {
                  putTodo()
                }
                props.setModalShow(false)}
            }>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
  
  return (
    <div className="App">
      <InputTodo 
        setImportance={setImportance}
      />
      <EditModal
        modalShow={modalShow}
        setModalShow={setModalShow}
        id={id}
        content={content}
        importance={importance}
      />
      <ListComponent 
        setModalShow={setModalShow}
        setId={setId}
        setContent={setContent}
        setImportance={setImportance}
      />
    </div>
  );
}

export default App;
