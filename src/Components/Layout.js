// import { Col,Row,Container } from "react-bootstrap";
import '../css/layout.css'
import LoginForm from "./LoginForm";
import { Layout,Col,Row} from 'antd';

const { Header, Content } = Layout;
const FormLayout=()=>{

    
    return (
        <Layout >
             <Header className='header-custom' >Zyax Login Form </Header>
            <Content className='content-custom'>
            
            <Row jusify="center" align="middle">
           
                <Col span={7}/>
                <Col span={8} > 
                 <LoginForm />
                </Col>
               
            </Row>
            
            </Content>
        </Layout>
    )

}

export default FormLayout;