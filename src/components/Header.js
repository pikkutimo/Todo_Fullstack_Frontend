import React from "react";
import { Button, ButtonGroup, Container, Navbar } from "react-bootstrap";

const UserGreeting = (props) => {
    return (
            <>
                <Navbar.Text className="px-5">
                    {props.name}
                </Navbar.Text>
                <Button variant="light" className="px-5" onClick={() => props.logOff()} >Log off</Button>
            </>
    )
}

const GuestGreeting = (props) => {
    
    return (
        <>
            <Navbar.Text className="px-5">
                Guest
            </Navbar.Text>
            <ButtonGroup>
            <Button variant="light" className="px-4" onClick={() => props.setLoginModalShow(true)}>Log in</Button>
            <Button variant="light" className="px-4" onClick={() => props.setRegisterModalShow(true)}>Register</Button>
            </ButtonGroup>
        </>
    )
}

const Greeting = (props) => {

    if (props.logged) {
        return <UserGreeting name={props.user.username} logOff={props.logOff}/>
    } else {
        return <GuestGreeting setLoginModalShow={props.setLoginModalShow} setRegisterModalShow={props.setRegisterModalShow} />
    }
}

const AppHeader = (props) => {

    const logOff = () => {
        props.setLogged(false)
        props.setUser(null)
        props.setTodos([])
    }

    return (
        <>
                <Navbar bg="primary" variant="dark" className="rounded-bottom pt-3">
                    <Container>
                        <Navbar.Brand className="fs-2 text-capitalize font-weight-bold px-3">To-do App</Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Greeting user={props.user} logged={props.logged} setLoginModalShow={props.setLoginModalShow} setRegisterModalShow={props.setRegisterModalShow} logOff={logOff} />
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
        </>
    )
}

export default AppHeader