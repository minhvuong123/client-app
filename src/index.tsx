
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from 'redux/store';
import App from './app/app';
import 'antd/dist/antd.css';
import './index.scss';
import GlobalProvider from 'hook/globalProvider';

const store = configureStore();

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </Provider>
  </Router>,
  document.getElementById('root')
);
