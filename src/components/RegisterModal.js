import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'

const RegisterModal = (props) => {

    const [username, setUsername] = useState()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [failure, setFailure] = useState(false)
    const [success, setSuccess] = useState(false)
    const [registerError, setRegisterError] = useState()

    const register = () => {
        const newUser = ({
            username,
            name,
            password,
            email
        })

        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
          }
        
        fetch(`${process.env.REACT_APP_DEV_URI}/api/signup`, requestOptions)
        .then(response => {
            if (!response.ok) {
                setRegisterError(response.statusText)
                setFailure(true)
                throw Error(`status: ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
           console.log(data)
           setSuccess(true)
           props.setLoginModalShow(true)
           props.setModalShow(false)
        })
        .catch((error) => {
            console.log('Error: ', error)
        })
    }

    const RegisterTitle = () => {
        if(failure) {
            return <Modal.Title>Register - {registerError}</Modal.Title>
        } else {
            return  <Modal.Title>Register</Modal.Title>
        }
    }

    const FooterContent = () => {
        if (!success) {
            return (
                <>
                    <Button variant="primary" onClick={() => register()}>
                    register
                    </Button>
                    <Button variant="secondary" onClick={() => props.setModalShow(false)}>
                    cancel
                    </Button>
                </>
            )
        } else {
            return (
                <Button variant="success" onClick={() => {
                    props.setLoginModalShow(true)
                    setSuccess(false)
                    props.setModalShow(false)
                }}>
                Registration ok!
                </Button>
            )
        }
    }

    return (
        <>
            <Modal show={props.modalShow} enforceFocus={true} keyboard={true}>
            <Modal.Header>
               <RegisterTitle />
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        Username
                        <Form>
                            <Form.Control placeholder='Testi1'
                                onChange={({ target }) => 
                                    setUsername(target.value)
                                }></Form.Control>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Name
                        <Form>
                            <Form.Control placeholder='Teemu Testi'
                                onChange={({ target }) => 
                                    setName(target.value)
                                }></Form.Control>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Password
                        <Form>
                            <Form.Control placeholder='testi123'
                                onChange={({ target }) => 
                                    setPassword(target.value)
                                }></Form.Control>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Email
                        <Form>
                            <Form.Control placeholder='teemu.testi@testi.fi'
                                onChange={({ target }) => 
                                    setEmail(target.value)
                                }></Form.Control>
                        </Form>
                    </Col>
                </Row>
            
          </Modal.Body>
          <Modal.Footer>
            <FooterContent />
          </Modal.Footer>
        </Modal>
        </>
    )
}

export default RegisterModal