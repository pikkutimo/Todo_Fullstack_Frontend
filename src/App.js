import React, { useState, useEffect } from 'react';
import InputTodo from './components/Input';
import './components/List'
import EditModal from './components/EditModal';
import ListComponent from './components/List';
import { Container, Stack } from 'react-bootstrap'
import './styles/ListStyle.css'
import AppHeader from './components/Header';
import Footer from './components/Footer';


const App = () => {
  const [todos, setTodos] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [id, setId] = useState()
  const [index, setIndex] = useState()
  const [content, setContent] = useState()
  const [importance, setImportance] = useState(false)
  const [done, setDone] = useState(false)
  const [logged, setLogged] = useState(true)
  
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


  const SetImportantTrue = () => {
    console.log('set importance true')
    setImportance(true)
  }

  const SetImportantFalse = () => {
    console.log('set importance false')
    setImportance(false)
  }
  
  return (
    <div className="App">
      <Container>
        <Stack gap={3}>
          <AppHeader 
            logged={logged}
            setLogged={setLogged}
          />
          <InputTodo
            todos={todos}
            setTodos={setTodos}
            importance={importance}
            setImportance={setImportance}
            SetImportantTrue={SetImportantTrue}
            SetImportantFalse={SetImportantFalse}
          />
          <EditModal
            todos={todos}
            setTodos={setTodos}
            modalShow={modalShow}
            setModalShow={setModalShow}
            id={id}
            index={index}
            setIndex={setIndex}
            content={content}
            importance={importance}
            setImportance={setImportance}
            SetImportantTrue={SetImportantTrue}
            SetImportantFalse={SetImportantFalse}
            done={done}
            setDone={setDone}
          />
          <ListComponent 
            todos={todos}
            setTodos={setTodos}
            setModalShow={setModalShow}
            setId={setId}
            setIndex={setIndex}
            setContent={setContent}
            setImportance={setImportance}
            done={done}
            setDone={setDone}
          />
          <Footer />
        </Stack>
      </Container>
    </div>
  );
}

export default App;
