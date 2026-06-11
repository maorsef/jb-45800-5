import { BrowserRouter } from 'react-router-dom'
import Layout from '../layout/layout/Layout'
import './App.css'
import Auth from '../auth/auth/Auth'
import { Provider as Redux } from 'react-redux'
import store from '../../redux/store'
import Io from '../io/Io'
 
function App() {
  return (  
    <>
      <BrowserRouter>
          <Redux store={store}>
            <Auth>
                <Io>
                    <Layout />
                </Io>
            </Auth>
          </Redux>
      </BrowserRouter>
    </>
  )
}

export default App
