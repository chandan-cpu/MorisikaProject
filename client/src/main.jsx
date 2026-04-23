import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import store from './redux/store.js'
import { Provider } from "react-redux";

createRoot(document.getElementById('root')).render(

    <HashRouter>
       <Provider store={store}>
         <App />
       </Provider>
    </HashRouter>
)
