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
import RegisterModal from './components/RegisterModal';
import UserProfileModal from './components/UserProfileModal';



const App = () => {
  const [todos, setTodos] = useState([])
  const [editModalShow, setEditModalShow] = useState(false)
  const [loginModalShow, setLoginModalShow] = useState(false)
  const [registerModalShow, setRegisterModalShow] = useState(false)
  const [userProfileModalShow, setUserProfileModalShow] = useState(false)
  const [id, setId] = useState()
  const [index, setIndex] = useState()
  const [content, setContent] = useState()
  const [importance, setImportance] = useState(false)
  const [done, setDone] = useState(false)
  const [logged, setLogged] = useState(false)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()


  useEffect(() => {
    const fetchData = async () => {

      if (user !== null) {
        
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${user.token}`
          }
        }

        fetch(`${process.env.REACT_APP_PROD_URI}/api/todos/`, requestOptions)
          .then(response => {
            return response.json()
          })
          .then(data => {
            setTodos(data)
          })
      }
    }

    fetchData()
  }, [user])

  const UserList = () => {
    if (user !== null) {
      return <ListComponent
        user={user} 
        todos={todos}
        setTodos={setTodos}
        setModalShow={setEditModalShow}
        id={id}
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
                    not logged in {process.env.REACT_APP_PROD_URI}
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
      <Container fluid="sm">
        <Stack gap={3}>
          <AppHeader 
            logged={logged}
            setLogged={setLogged}
            setUser={setUser}
            setLoginModalShow={setLoginModalShow}
            setRegisterModalShow={setRegisterModalShow}
            setUserProfileModalShow={setUserProfileModalShow}
            setTodos={setTodos}
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            name={name}
            setName={setName}
          />
          <LoginModal
            modalShow={loginModalShow}
            setModalShow={setLoginModalShow}
            setLoginModalShow={setLoginModalShow}
            setLogged={setLogged}
            user={user}
            setUser={setUser}
            username={username}
            setUsername={setUsername}
            setName={setName}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
          <RegisterModal
            modalShow={registerModalShow}
            setModalShow={setRegisterModalShow}
          />
           <UserProfileModal
            modalShow={userProfileModalShow}
            setModalShow={setUserProfileModalShow}
            user={user}
            setUser={setUser}
            username={username}
            setUsername={setUsername}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
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
            user={user}
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
