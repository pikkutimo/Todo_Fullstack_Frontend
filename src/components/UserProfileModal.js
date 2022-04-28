import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'

const UserProfileModal = (props) => {

    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    // let tempUserState = props.user
    // const [password, setPassword] = useState()
    // const [failure, setFailure] = useState(false)
    // const [success, setSuccess] = useState(false)
    // const [registerError, setRegisterError] = useState()

    const editProfile = () => {
        let editedUser = ({
            username,
            name,
            email
        })

        // if (username !== props.username) {
        //     tempUserState.username = username
        // }

        // if (name !== props.name) {
        //     tempUserState.name = name
        // }

        // if (email !== props.email) {
        //     tempUserState.email = email
        // }
        
        console.log(editedUser)
        // const requestOptions = {
        //     method: 'POST',
        //       headers: {
        //           'Content-Type' : 'application/json',
        //           'Authorization': `bearer ${props.user.token}`
        //       },
        //       body: JSON.stringify(editedUser),
        //   }

        // fetch(`${process.env.REACT_APP_PROD_URI}/api/users/${props.user.id}`, requestOptions)
        // .catch((error) => {
        //   console.log('Error: ', error)
        // })

        // props.setUser(tempUserState)
    }

    const RegisterTitle = () => {
        return  <Modal.Title>Edit userprofile</Modal.Title>
    }

    const FooterContent = () => {
        return (
            <>
                <Button variant="primary" onClick={() => editProfile()}>
                edit
                </Button>
                <Button variant="secondary" onClick={() => {
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
                <Row>
                    <Col>
                        Username - {props.user?.username}
                        <Form>
                            <Form.Control placeholder='Your username'
                                onChange={({ target }) => 
                                    setUsername(target.value)
                                }></Form.Control>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Name - {props.user?.name}
                        <Form>
                            <Form.Control placeholder='Your name'
                                onChange={({ target }) => 
                                    setName(target.value)
                                }></Form.Control>
                        </Form>
                    </Col>
                </Row>
                {/* <Row>
                    <Col>
                        Password
                        <Form>
                            <Form.Control placeholder='testi123'
                                onChange={({ target }) => 
                                    setPassword(target.value)
                                }></Form.Control>
                        </Form>
                    </Col>
                </Row> */}
                <Row>
                    <Col>
                        Email - {props.user?.email}
                        <Form>
                            <Form.Control placeholder='Your email'
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

export default UserProfileModal