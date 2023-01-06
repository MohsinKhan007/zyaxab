
import LoginForm from "../Components/LoginForm"

import {render,screen,cleanup,waitFor, fireEvent } from '@testing-library/react';
import { isAuth, getCookie, setCookie, logout } from "../utils/AuthenticationService"
import  { act } from 'react-dom/test-utils';


afterEach(()=>{
    cleanup();
})

const setup = () => {
    if(isAuth){
        logout();
    }
    let utils = render(<LoginForm />)
    let email = utils.getByTestId('email');
    let password=utils.getByTestId('password');
    let submitButton=utils.getByTestId('submit');
    return {
      email,password,submitButton,
      ...utils,
    }
  }
  
  afterEach(cleanup);

test('form is initially rendered with empty fields',()=>{
    const { email, password } = setup()
    // testing the field are present in the Component
    expect(email).toBeInTheDocument()
    expect(password).toBeInTheDocument()
    // testing the field are empty initially
    expect(email).toHaveTextContent("")
    expect(password).toHaveTextContent("")
})

test("Form displays validation message if the email or password is blank ", async() => {
    render(<LoginForm />)
    const email = screen.getByTestId("email")
    const password = screen.getByTestId("password")
    const submitButton = screen.getByTestId("submit")
    // testing the field are present in the Component
    expect(email).toBeInTheDocument()
    expect(password).toBeInTheDocument()
    // testing the field are empty initially
    expect(email).toHaveTextContent("")
    expect(password).toHaveTextContent("")

    act(() => {
        fireEvent(submitButton, new MouseEvent("click"))
    })

    expect(screen.getByTestId("errorMsg")).toBeInTheDocument()
    expect(screen.getByTestId("errorMsg")).toHaveTextContent(
        "Email or Password cannot be empty"
    )
})

test(("The form displays an error message if the login fails"),async()=>{

    const { submitButton, email, password } = setup()

    // testing the field are present in the Component
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    // testing the field are empty initially
    fireEvent.change(email,{target:{value:'dummy@dummy.com'}});
    fireEvent.change(password,{target:{value:'123456'}});

    expect(screen.getByTestId('email').value).toBe("dummy@dummy.com");
    expect(screen.getByTestId('password').value).toBe("123456");

    fireEvent(submitButton,new MouseEvent('click'));

    await waitFor(()=>{
        expect(screen.getByTestId("errorMsg")).toBeInTheDocument()
        expect(screen.getByTestId("errorMsg")).toHaveTextContent('No access')
    },{timeout:5000,onTimeout:(error)=>{
        console.log(error);
    }});

});

test('The form stores the access token in a cookie or local storage if the login is successful',async()=>{

    const { submitButton, email, password } = setup();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();

    fireEvent.change(email,{target:{value:'test@zyax.se'}});
    fireEvent.change(password,{target:{value:'!zyaxSe981'}});
    
    expect(screen.getByTestId('email').value).toBe("test@zyax.se");
    expect(screen.getByTestId('password').value).toBe("!zyaxSe981");

    fireEvent(submitButton,new MouseEvent('click'))

    await waitFor(()=>{
        expect(screen.getByTestId("sucessMsg")).toBeInTheDocument()
        expect(screen.getByTestId("sucessMsg")).toHaveTextContent('Login Sucessful');
        expect(isAuth()).toBe(true);
    });
},2000)
