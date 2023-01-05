import { Alert } from 'antd';

export const showSucessMessage=success=>{
    console.log("sucess Message");
    return (<Alert data-testid='sucessMsg' message={success} type='success' showIcon  />);
}

export const showErrorMessage=error=>{
    console.log("Error message");
    return (<Alert data-testid='errorMsg' message={error} type='error' showIcon />);
}
