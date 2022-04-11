import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'

const LoginModal = (props) => {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [failure, setFailure] = useState(false)
    const [loginError, setLoginError] = useState()

    const login = async () => {
        const loginUser = ({
            username,
            password
        })
        const requestOptions = {
            method: 'POST',
              headers: {
                  'Content-Type' : 'application/json',
              },
              body: JSON.stringify(loginUser),
          }
        
        await fetch(`${process.env.REACT_APP_PROD_URI}/api/login/`, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error('invalid username/password')
            } else return response.json()
        })
        .then((data) => {
            props.setUser(data)
            props.setLogged(true)
            props.setModalShow(false)
        })
        .catch((error) => {
            setFailure(true)
            setLoginError(error.toString())
            console.log('Error: ', error)
        })
    }

    const LoginTitle = () => {
        if(failure) {
            return <Modal.Title>Login - {loginError}</Modal.Title>
        } else {
            return  <Modal.Title>Login</Modal.Title>
        }
    }

    return (
        <>
            <Modal show={props.modalShow} enforceFocus={true} keyboard={true}>
            <Modal.Header>
               <LoginTitle />
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        Username
                        <Form>
                            <Form.Control placeholder='teemu.testi@gmail.com'
                                onChange={({ target }) => 
                                    setUsername(target.value)
                                }></Form.Control>
                        </Form>
                    </Col>
                    <Col>
                        Password
                        <Form>
                            <Form.Control placeholder='test123'
                                onChange={({ target }) =>
                                    setPassword(target.value)
                                }></Form.Control>
                        </Form>
                    </Col>
                </Row>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={login}>
              login
            </Button>
            <Button variant="secondary" onClick={() => props.setModalShow(false)}>
              cancel
            </Button>
          </Modal.Footer>
        </Modal>
        </>
    )
}

export default LoginModal