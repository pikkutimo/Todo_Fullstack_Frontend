import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap'
import { MdModeEdit } from 'react-icons/md'


const UserProfileModal = (props) => {

    const [error, setError] = useState()
    const [alert, setAlert] = useState(false)
    const [passwordAgain, setPasswordAgain] = useState()
    const [editUsername, setEditUsername] = useState(true)
    const [editName, setEditName] = useState(true)
    const [editEmail, setEditEmail] = useState(true)
    const [editPassword, setEditPassword] = useState(true)

    const editProfile = () => {

        if (!validate()) {
            setAlert(true)
            return
        }

        let username = props.username
        let name = props.name
        let email = props.email
        let password = props.password

        let editedUser = ({
            username,
            name,
            email,
            password
        })

        const requestOptions = {
            method: 'PUT',
              headers: {
                  'Content-Type' : 'application/json',
                  'Authorization': `bearer ${props.user.token}`
              },
              body: JSON.stringify(editedUser),
          }

        fetch(`${process.env.REACT_APP_PROD_URI}/api/users/${props.user.id}`, requestOptions)
        .then(response => {
            return response.json()
        })
        .then(fetchedUser => {
            console.log(fetchedUser)
            props.setUser(fetchedUser)})
        .catch((error) => {
          console.log('Error: ', error)
        })

        setEditEmail(true)
        setEditName(true)
        setEditUsername(true)
        setEditPassword(true)
        setPasswordAgain(null)
        props.setModalShow(false)
        
    }

    const isEmail = email => {
        const emailRegex = /\S+@\S+\.\S+/
        
        if(emailRegex.test(email)) {
            return true
        }

        return false
    }

    const validate = () => {
        // Should check if the edit is true
        if (!editEmail && !isEmail(props.email)) {
            setError('Email is not valid!')
            return false
        }

        if (!editPassword && passwordAgain !== props.password) {
            setError('Passwords do not match!')
            return false
        }

        return true
    }
    const RegisterTitle = () => {
        return  <Modal.Title>Edit userprofile</Modal.Title>
    }

    const FooterContent = () => {
        return (
            <>
                <Button variant="primary" onClick={() => editProfile() }>
                ok
                </Button>
                <Button variant="secondary" onClick={() => {
                    setEditEmail(true)
                    setEditName(true)
                    setEditUsername(true)
                    setEditPassword(true)
                    setPasswordAgain(null)
                    setError(null)
                    setAlert(false)
                    props.setModalShow(false)
                }}>
                cancel
                </Button>
            </>
        )
    }

    return (
        <>
            <Modal show={props.modalShow} enforceFocus={true} keyboard={true}>
            <Modal.Header>
               <RegisterTitle />
            </Modal.Header>
            <Modal.Body>
                <Alert variant="danger" show={alert} onClose={() => {
                    setAlert(false)
                    setError(null)
                }} dismissible>
                    <Alert.Heading>ERROR</Alert.Heading>
                    <p>{error}</p>
                </Alert>
                <Form>
                <Row>
                    <Col>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Row>
                                <Col sm={10}>
                                    <Form.Control disabled={editUsername} defaultValue={props.username}
                                        onChange={({ target }) => {
                                            props.setUsername(target.value)
                                        }
                                        }></Form.Control>
                                </Col>
                                <Col sm={2}>
                                    <Button onClick={() => setEditUsername(!editUsername)}>
                                        <MdModeEdit />
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                                <Row>
                                    <Col sm={10}>
                                        <Form.Control disabled={editName} defaultValue={props.name}
                                            onChange={({ target }) => {
                                                props.setName(target.value)
                                            }
                                            }></Form.Control>
                                    </Col>
                                    <Col sm={2}>
                                        <Button onClick={() => setEditName(!editName)}>
                                            <MdModeEdit />
                                        </Button>
                                    </Col>
                                </Row>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                                <Row>
                                    <Col sm={10}>
                                        <Form.Control disabled={editEmail} defaultValue={props.email}
                                            onChange={({ target }) => {
                                                props.setEmail(target.value)
                                            }
                                            }></Form.Control>
                                    </Col>
                                    <Col sm={2}>
                                    <Button onClick={() => setEditEmail(!editEmail)}>
                                        <MdModeEdit />
                                    </Button>
                                    </Col>
                                </Row>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                                <Row>
                                    <Col sm={10}>
                                        <Form.Control disabled={editPassword}
                                        type="password"
                                        onChange={({ target }) => 
                                            props.setPassword(target.value)
                                        }></Form.Control>
                                    </Col>
                                    <Col sm={2}>
                                        <Button onClick={() => setEditPassword(!editPassword)}>
                                            <MdModeEdit />
                                        </Button>
                                    </Col>
                                </Row>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="passWordAgain">
                            <Form.Label>Password Again</Form.Label>
                                <Col sm={10}>
                                <Form.Control disabled={editPassword}
                                    type="password"
                                    onChange={({ target }) =>
                                            setPasswordAgain(target.value)
                                    }></Form.Control>
                                </Col>
                                <Col sm={2}>
                                </Col>
                        </Form.Group>
                            
                    </Col>
                </Row>
                </Form>
          </Modal.Body>
          <Modal.Footer>
            <FooterContent />
          </Modal.Footer>
        </Modal>
        </>
    )
}

export default UserProfileModal