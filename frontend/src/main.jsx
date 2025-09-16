import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './main.scss'
import Router from "./routes/Router.jsx";
import {Provider} from "react-redux";
import store from "./store.js";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <Router/>
        </Provider>
    </StrictMode>,
)
