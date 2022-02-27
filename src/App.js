import React, { useState, useEffect } from 'react';
import InputTodo from './components/Input';
import './components/List'
import EditModal from './components/EditModal';
import ListComponent from './components/List';
import { Container, Stack, Row, Col } from 'react-bootstrap'
import './styles/ListStyle.css'
import AppHeader from './components/Header';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import env from 'react-dotenv'
import jwt_decode from "jwt-decode";
import RegisterModal from './components/RegisterModal';


const App = () => {
  const [todos, setTodos] = useState([])
  const [editModalShow, setEditModalShow] = useState(false)
  const [loginModalShow, setLoginModalShow] = useState(false)
  const [registerModalShow, setRegisterModalShow] = useState(false)
  const [id, setId] = useState()
  const [index, setIndex] = useState()
  const [content, setContent] = useState()
  const [importance, setImportance] = useState(false)
  const [done, setDone] = useState(false)
  const [logged, setLogged] = useState(false)
  const [user, setUser] = useState(null)

  const fetchData = async () => {
    let userid = "62161811385b6f23a4bcf219"

    fetch(`http://localhost:3002/api/users/${userid}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setTodos(data)
      })

  }

  useEffect(() => {
    fetchData()
  }, [user])

  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem('loggedTodAppUser')
  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON)
  //     setUser(user)
  //   }
  // }, [])

  const UserList = () => {
    if (user !== null) {
      return <ListComponent
        user={user} 
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
    } else {
      return (
        <>
          <Row className="justify-content-md-center">
                <Col xs="10">
                    lorem ipsum ... not logged in
                </Col>
            </Row>
        </>
      )
    }

  }

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
            setRegisterModalShow={setRegisterModalShow}
          />
          <LoginModal
            modalShow={loginModalShow}
            setModalShow={setLoginModalShow}
            setLoginModalShow={setLoginModalShow}
            setLogged={setLogged}
            user={user}
            setUser={setUser}
          />
          <RegisterModal
            modalShow={registerModalShow}
            setModalShow={setRegisterModalShow}
            setLoginModalShow={setLoginModalShow}
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
          <UserList />
          <Footer />
        </Stack>
      </Container>
    </div>
  );
}

export default App;
