import { Col,Row,Container } from "react-bootstrap";
import '../css/layout.css'
import LoginForm from "./LoginForm";
const Layout=()=>{

    return (
        <Row md={8} sm={4} className="Row">
            <LoginForm />
        </Row>
    )

}

export default Layout;