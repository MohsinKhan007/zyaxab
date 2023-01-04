import Alert from 'react-bootstrap/Alert';

export const showSucessMessage=success=>{
    return (<Alert data-testid="sucessMsg" variant='primary'>{success}</Alert>);

}

export const showErrorMessage=error=>{
    return (<Alert data-testid="errorMsg" variant='danger'>{error}</Alert>);
}