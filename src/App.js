import './App.css';
import  Header  from './layout/Header';
import 'semantic-ui-css/semantic.min.css';
import Axios from 'axios';
import Routes from './layout/Routes';

Axios.interceptors.request.use(function(config) {
  config.url = `${process.env.REACT_APP_API_BASE_URL}${config.url}`;
  return config;
})

function App() {
  return (
    <div>
      <Header/>
      <Routes/>
    </div>
  );
}

export default App;
