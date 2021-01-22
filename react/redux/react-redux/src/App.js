import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import CakeContainer from './components/CakeContainer';
import IceCreamContainer from './components/IceCreamContainer';
import CakeAndIceCream from './components/CakeAndIceCream';
import Timer from './components/Timer';
import HooksContiner from './components/HooksContiner';
import NewCakeContainer from './components/NewCakeContainer';
import ItemContainer from './components/ItemContainer';
import UserContainer from './components/UserContainer';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        {/* 
        <ItemContainer cake />
        <ItemContainer />
        <CakeContainer />
        <IceCreamContainer />
        <HooksContiner />
        <CakeAndIceCream />
        <NewCakeContainer /> 
        */}
        <UserContainer />
        {/* <Timer /> */}
      </div>
    </Provider>
  );
}

export default App;
