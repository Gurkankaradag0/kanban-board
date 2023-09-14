import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'

import { CookiesProvider } from 'react-cookie'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
    <CookiesProvider>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </CookiesProvider>
)
