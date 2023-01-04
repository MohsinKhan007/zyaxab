
import LoginForm from "../Components/LoginForm"

import {render,screen,cleanup,waitFor, fireEvent } from '@testing-library/react';
import { isAuth, getCookies, setCookie, logout } from "../utils/AuthenticationService"

global.matchMedia = global.matchMedia || function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

  beforeEach(()=>{
    global.matchMedia = global.matchMedia || function () {
        return {
          addListener: jest.fn(),
          removeListener: jest.fn(),
        };
      };
  })
beforeEach(() =>  {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        }))
    });
});
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
  


test('form is initially rendered with empty fields',()=>{
    
    const {email,password}=setup();
 


// // testing the field are present in the Component
expect(email).toBeInTheDocument();
expect(password).toBeInTheDocument();
// // testing the field are empty initially
expect(email).toHaveTextContent('');
expect(password).toHaveTextContent('');

})

test("Form displays validation message if the email or password is blank ", () => {
    const { submitButton, email, password } = setup()

    // testing the field are present in the Component
    expect(email).toBeInTheDocument()
    expect(password).toBeInTheDocument()
    // testing the field are empty initially
    expect(email).toHaveTextContent('')
    expect(password).toHaveTextContent('')

    fireEvent.change(email,{target:{value:''}});
    fireEvent.change(password,{target:{value:''}});
    
    fireEvent(submitButton,new MouseEvent('click'));
    
    expect(screen.getByTestId('errorMsg')).toBeInTheDocument();

})

// test(("The form displays an error message if the login fails"),async()=>{


//     const { submitButton, email, password } = setup()

//     // testing the field are present in the Component
//     expect(email).toBeInTheDocument();
//     expect(password).toBeInTheDocument();
//     // testing the field are empty initially
   

//     fireEvent.change(email,{target:{value:'dummy@dummy.com'}});
//     fireEvent.change(password,{target:{value:'123456'}});

//     expect(screen.getByTestId('email').value).toBe("dummy@dummy.com");
//     expect(screen.getByTestId('password').value).toBe("123456");

//     fireEvent(submitButton,new MouseEvent('click'));

//     await waitFor(()=>{
//         expect(screen.getByTestId("errorMsg")).toBeInTheDocument()
//         expect(screen.getByTestId("errorMsg")).toHaveTextContent('No access')
//     },{timeout:5000,onTimeout:(error)=>{
//         console.log(error);
//     }});
    
//     screen.debug();

// })

// test('The form stores the access token in a cookie or local storage if the login is successful',async()=>{

//     const { submitButton, email, password } = setup();
//     expect(email).toBeInTheDocument();
//     expect(password).toBeInTheDocument();
//     // testing the field are empty initially
   

//     fireEvent.change(email,{target:{value:'test@zyax.se'}});
//     fireEvent.change(password,{target:{value:'!zyaxSe981'}});
    

//     expect(screen.getByTestId('email').value).toBe("test@zyax.se");
//     expect(screen.getByTestId('password').value).toBe("!zyaxSe981");

//     fireEvent(submitButton,new MouseEvent('click'))

//     await waitFor(()=>{
     
//         expect(screen.getByTestId("sucessMsg")).toBeInTheDocument()
//         expect(screen.getByTestId("sucessMsg")).toHaveTextContent('Login Sucessful');
       

//         console.log(isAuth()," is Auth ");
//         expect(isAuth()).toBe(true);


//     });
// },2000)

// test('user has successfully logged out',()=>{

   


//     console.log(isAuth()," is auth in logout function");

//     if(!isAuth()){

//         setCookie('tt7hzAswpgLt2wd12nECm9nfypPwZEuFs-n9O-DlMW=0sdb-rTB?2iOx1VFZiM8DyWckDtdzSI?UCPfJwsS-NAgfVkBFnim0/2iTx9l6s/sDly3adk74YlfeZst?2zfTNW3aKxCaLy?5uMzGYnmq2a6y6eq5?jWQyGy9VL8PlJfBQcPTWTxuvy3s6IZKZf-MjKqWpPzyFHvsM96sWBBG5OJqnC5zTKtsP-8CxebYmztVm3MjmhoqTlOskF0ANWAs','4?DiI-DNf-VHf-xWY?zzsywtXc5Ggllne9svIKz9YNfroSw86TYRqXz?1TQX44I8FFeyKxWW91N?LqU8n8DH=wbzuIDd!5cbxbEy1JkBt!AnM7C6ki9MCM4?2AdgbHYNbRiAvRTKeGviLTBMdkjXp019u7scwI2a!9frw43/ISna=7fBkLEHXF9Afw=mwNe7P?ZqBQG2YH7-Yf30B0TnXC7t0Gud3JRRtQSCzdfEBngyyV7ahHCXCNqGSusMkeqH');

//     }

//     expect(screen.getByTestId('logout')).toBeInTheDocument();

//     fireEvent(screen.getByTestId('logout'), new MouseEvent("click"))

//     // expect(screen.getByTestId('sucessMsg')).toBeInTheDocument();
//     // expect(screen.getByTestId('sucessMsg')).toHaveTextContent('Logout SucessFul');

//     expect(isAuth()).toBe(false);

// })