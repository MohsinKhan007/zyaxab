

import { Typography,Button } from 'antd';
const { Title } = Typography;


 const Logout = ({ handleLogout }) => {
     const LogoutUser = () => {
         handleLogout()
     }

     return (
         <div className='logout-main-div'>
             <Title level={1}>Log in Page</Title>
             <Button data-testid="logout" onClick={LogoutUser}> Logout </Button>
         </div>
     )
 }


export default Logout;