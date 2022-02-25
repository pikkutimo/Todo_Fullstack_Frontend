import React, { useState, useEffect } from 'react';
import InputTodo from './components/Input';
import './components/List'
import EditModal from './components/EditModal';
import ListComponent from './components/List';
import { Container, Stack } from 'react-bootstrap'
import './styles/ListStyle.css'
import AppHeader from './components/Header';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import env from 'react-dotenv'


const App = () => {
  const [todos, setTodos] = useState([])
  const [editModalShow, setEditModalShow] = useState(false)
  const [loginModalShow, setLoginModalShow] = useState(false)
  const [id, setId] = useState()
  const [index, setIndex] = useState()
  const [content, setContent] = useState()
  const [importance, setImportance] = useState(false)
  const [done, setDone] = useState(false)
  const [logged, setLogged] = useState(false)
  const [user, setUser] = useState(null)

  const fetchData = () => {
    // utilizing heroku api https://rocky-harbor-47876.herokuapp.com
    fetch("http://localhost:3002/api/todos")
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
            user={user}
            setUser={setUser}
            setLoginModalShow={setLoginModalShow}
          />
          <LoginModal 
            modalShow={loginModalShow}
            setModalShow={setLoginModalShow}
            setLoginModalShow={setLoginModalShow}
            setLogged={setLogged}
            setUser={setUser}
          />
          <InputTodo
            user={user}
            logged={logged}
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
            modalShow={editModalShow}
            setModalShow={setEditModalShow}
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
            setModalShow={setEditModalShow}
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
