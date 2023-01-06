import { Alert } from 'antd';
import '../css/layout.css';

export const showMessage=(message,type)=>{
    return (<Alert data-testid='alertMsg'  className='alert-custom' message={message} type={type} showIcon />);
}