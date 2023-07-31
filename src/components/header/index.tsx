import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { GiHorseHead } from "react-icons/gi"
import { TbUserEdit } from "react-icons/tb"
import { BsPersonLock } from "react-icons/bs"
import { BiExit } from "react-icons/bi"

export function Header() {
    //Aqui crio minha barra de navegação padrão, utilizando os componentes do bootstrap
    return <Navbar bg="primary" data-bs-theme="dark">
        <Container>
            <Navbar.Brand href="/"><GiHorseHead /> Pegasus</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/">Inicio</Nav.Link>
                <Nav.Link href="/usuarios">Usuários</Nav.Link>
                <Nav.Link href="/scripts">Scripts</Nav.Link>
                <Nav.Link href="/versoes">Versões</Nav.Link>
            </Nav>

            <Navbar.Collapse className="justify-content-end">
                <NavDropdown title="Jose" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#">Editar perfil <TbUserEdit /></NavDropdown.Item>
                    <NavDropdown.Item href="#">Alterar senha <BsPersonLock /></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Sair <BiExit /></NavDropdown.Item>
                </NavDropdown>
            </Navbar.Collapse>
        </Container>
    </Navbar >
}