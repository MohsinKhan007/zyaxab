import { Alert } from 'antd';
import '../css/layout.css';
export const showSucessMessage=success=>{
    console.log("sucess Message");
    return (<Alert data-testid='sucessMsg' className='alert-custom' message={success} type='success' showIcon  />);
}

export const showErrorMessage=error=>{
    console.log("Error message");
    return (<Alert data-testid='errorMsg' className='alert-custom' message={error} type='error' showIcon />);
}
