import React from "react";
import { Button, ButtonGroup,DropdownButton, Dropdown,  Container, Navbar } from "react-bootstrap";

const UserGreeting = (props) => {
    return (
            <>
                <DropdownButton id="dropdown-basic-button" size="lg" drop="start" title={props.username}>
                <Dropdown.Item onClick={() => props.setUserProfileModalShow(true) }>Userprofile</Dropdown.Item>
                <Dropdown.Item onClick={() => props.logOff()}>Log out</Dropdown.Item>
                </DropdownButton>
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
        return <UserGreeting 
        logOff={props.logOff} 
        username={props.username}
        setUserProfileModalShow={props.setUserProfileModalShow}/>
    } else {
        return <GuestGreeting setLoginModalShow={props.setLoginModalShow} setRegisterModalShow={props.setRegisterModalShow} />
    }
}

const AppHeader = (props) => {

    const logOff = () => {
        props.setLogged(false)
        props.setUser(null)
        props.setUsername(null)
        props.setName(null)
        props.setEmail(null)
        props.setTodos([])
    }

    return (
        <>
                <Navbar bg="primary" variant="dark" className="rounded-bottom pt-3">
                    <Container>
                        <Navbar.Brand className="fs-2 text-capitalize font-weight-bold px-3">To-do App</Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Greeting username={props.username} logged={props.logged} setLoginModalShow={props.setLoginModalShow} setRegisterModalShow={props.setRegisterModalShow} setUserProfileModalShow={props.setUserProfileModalShow} logOff={logOff} />
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
        </>
    )
}

export default AppHeader