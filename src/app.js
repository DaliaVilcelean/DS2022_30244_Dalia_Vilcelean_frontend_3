import React from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import NavigationBar from './navigation-bar'
import ErrorPage from './commons/errorhandling/error-page';
import LogInPage from './login/LogInPage';
import Home from './home/home.js'
import PersonContainer from './person/person-container'
import DeviceContainer from './device/device-container';
import UserDeviceContainer from './userDevice/userdevice-container';
import UserPage from './user/UserPage';
import MessagesTable from './user/MessagesTable';


class App extends React.Component {
  

    render() {  
      
    

return(

    <div>
    <BrowserRouter>
    <NavigationBar />
    <Routes>
  
       
        <Route
             
             path='/'
            exact element={ <LogInPage/>}
         />
           <Route
                         
                         path='/home'
                        exact element={ <Home/>}
                     />
                         <Route
                         
                         path='/user'
                        exact element={ <UserPage/>}
                     />

                     <Route
                        
                         path='/person'
                          exact element={ <PersonContainer/>}
                     />
                     <Route
                        
                         path='/device'
                        exact element={<DeviceContainer/>}
                     />
                      <Route
                        
                        path='/userdevice'
                         exact element={ <UserDeviceContainer/>}
                    />

                     {/*Error*/}
                     <Route
                         
                         path='/error'
                        exact element={<ErrorPage/>}
                     />

                     <Route render={() =><ErrorPage/>} />

</Routes>
                    </BrowserRouter>
                    </div>
    
    
);
    

        
    
    };
}

export default App
