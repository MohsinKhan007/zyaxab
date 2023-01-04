

import { Typography,Button } from 'antd';
const { Title } = Typography;


 const Logout = ({ handleLogout }) => {
     const LogoutUser = () => {
         handleLogout()
     }

     return (
         <div style={{margin:'10px'}}>
             <Title level={1}>Logged in Page</Title>
             <Button onClick={LogoutUser}> Logout </Button>
         </div>
     )
 }


export default Logout;