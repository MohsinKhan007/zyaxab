import { Alert } from 'antd';

export const showSucessMessage=success=>{
    return (<Alert data-testid='sucessMsg' message={success} type='success' showIcon closable />);
}

export const showErrorMessage=error=>{
    return (<Alert data-testid='errorMsg' message={error} type='error' showIcon closable/>);
}
