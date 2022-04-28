import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'

const LoginModal = (props) => {

    
    const [failure, setFailure] = useState(false)
    const [loginError, setLoginError] = useState()

    const login = async () => {
        const username = props.username
        const password = props.password

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
        
        await fetch(`${process.env.REACT_APP_PROD_URI}/api/login`, requestOptions)
        .then((response) => {
            console.log(response)
            if (!response.ok) {
                throw new Error('invalid username/password')
            } else return response.json()
        })
        .then((data) => {
            props.setUser(data)
            console.log(data)
            props.setName(data.name)
            props.setUsername(data.username)
            props.setEmail(data.email)
            props.setLogged(true)
            props.setPassword(null)
            props.setModalShow(false)
        })
        .catch((error) => {
            setFailure(true)
            setLoginError(error.toString())
            props.setName(null)
            props.setUsername(null)
            props.setEmail(null)
            props.setPassword(null)
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
                                    props.setUsername(target.value)
                                }></Form.Control>
                        </Form>
                    </Col>
                    <Col>
                        Password
                        <Form>
                            <Form.Control placeholder='test123'
                                onChange={({ target }) =>
                                    props.setPassword(target.value)
                                }></Form.Control>
                        </Form>
                    </Col>
                </Row>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={login}>
              login
            </Button>
            <Button variant="secondary" onClick={() => {
                setFailure(false)
                setLoginError()
                props.setModalShow(false)
            }}>
              cancel
            </Button>
          </Modal.Footer>
        </Modal>
        </>
    )
}

export default LoginModal