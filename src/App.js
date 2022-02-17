import React, { useState } from 'react';
import InputTodo from './components/Input';
import './components/List'
import EditModal from './components/EditModal';
import ListComponent from './components/List';
import { Container, Row } from 'react-bootstrap';


const App = () => {
  const [modalShow, setModalShow] = useState(false)
  const [id, setId] = useState()
  const [content, setContent] = useState()
  const [importance, setImportance] = useState(false)
  const [done, setDone] = useState(false)

  const SetImportantTrue = () => {
    console.log('set importance true')
    setImportance(true)
  }

  const SetImportantFalse = () => {
    console.log('set importance false')
    setImportance(false)
  }
  
  return (
    <Container className="App">
      <InputTodo 
        setImportance={setImportance}
        SetImportantTrue={SetImportantTrue}
        SetImportantFalse={SetImportantFalse}
      />
      <Row>
        
      </Row>
      <EditModal
        modalShow={modalShow}
        setModalShow={setModalShow}
        id={id}
        content={content}
        importance={importance}
        done={done}
        setDone={setDone}
      />
      <ListComponent 
        setModalShow={setModalShow}
        setId={setId}
        setContent={setContent}
        setImportance={setImportance}
        done={done}
        setDone={setDone}
      />
    </Container>
  );
}

export default App;
