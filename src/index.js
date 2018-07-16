import React from 'react';
import {render} from 'react-dom';
import Modal from 'react-modal';
import { Provider } from 'react-redux'

import registerServiceWorker, {unregister} from './registerServiceWorker';
import App from './App';
import {store} from "./store";
import './index.css';

Modal.setAppElement("#root");
render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));
//registerServiceWorker();
unregister();
