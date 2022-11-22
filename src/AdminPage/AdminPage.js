import React from 'react'
import {BrowserRouter } from 'react-router-dom'
import {Router, Route} from 'react-router-dom'
import NavigationBar from '../navigation-bar'
import Home from '../home/home';
import PersonContainer from '../person/person-container'
import DeviceContainer from '../device/device-container';

import ErrorPage from '../commons/errorhandling/error-page';
import styles from '../commons/styles/project-style.css';
import { render } from 'react-dom';
import {Routes} from 'react-router-dom'
import LogInPage from '../login/LogInPage';




const AdminPage=()=>{




        return (
            <div className={styles.back}>
         
                <div>
                <BrowserRouter>
                <NavigationBar />
                <Routes>
              
                   
                    <Route
                         
                         path='/login'
                        exact element={ <LogInPage/>}
                     />
                
                  
                        <Route
                         
                            path='/'
                           exact element={ <Home/>}
                        />

                        <Route
                           
                            path='/person'
                             exact element={ <PersonContainer/>}
                        />
                        <Route
                           
                            path='/device'
                           exact element={<DeviceContainer/>}
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
         
            </div>
        )
        
}

export default AdminPage;