import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";

const UserGreeting = (props) => {
    return (
            <>
                <Navbar.Text className="px-5">
                    {props.name}
                </Navbar.Text>
                <Button variant="light" className="px-5">Log off</Button>
            </>
    )
}

const GuestGreeting = () => {
    return (
        <>
            <Navbar.Text className="px-5">
                Guest
            </Navbar.Text>
            <Button variant="light" className="px-5">Log in</Button>
        </>
    )
}

const Greeting = (props) => {
    if (props.logged) {
        return <UserGreeting name={"Timo"}/>
    } else {
        return <GuestGreeting />
    }
}

const AppHeader = (props) => {

    return (
        <>
                <Navbar bg="primary" variant="dark" className="rounded-bottom pt-3">
                    <Container>
                        <Navbar.Brand className="fs-2 text-capitalize font-weight-bold px-3">To-do App</Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            {/* <Greeting logged={props.logged} /> */}
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
        </>
    )
}

export default AppHeader