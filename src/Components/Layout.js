// import { Col,Row,Container } from "react-bootstrap";
import '../css/layout.css'
import LoginForm from "./LoginForm";
import { Layout,Col,Row} from 'antd';

const { Header, Content } = Layout;
const FormLayout=()=>{

    return (
        <Layout >
            <Header style={{backgroundColor:'blue',textAlign:'center',color:'white',fontSize:'27px'}} >Zyax Login Form 'Add Form Validations'</Header>
            <Content style={{ margin: '24px ',height:'100vh',width:'100%' }}>
            
            <Row jusify="center" align="middle">
            {/* <Space > */}
                <Col span={7}/>
                <Col span={8} >
                 <LoginForm />
                </Col>
                {/* </Space> */}
            </Row>
            
            </Content>
        </Layout>
    )

}

export default FormLayout;