import React, { Component } from 'react';
import './App.css';
import { Greet } from './components/Greet'; // named export
// import Greet from './components/Greet'; // default export : you can change the name
import Welcome from './components/Welcome';
import Bye from './components/Bye';
import Message from './components/Message';
import Counter from './components/Counter';
import FunctionClick from './components/FunctionClick';
import ClassClick from './components/ClassClick';
import ParentComponent from './components/ParentComponent';
import GreetingUser from './components/GreetingUser';
import NameList from './components/NameList';
import ToDoList from './components/ToDoList';
import StyleSheet from './components/StyleSheet';
import Inline from './components/Inline';
import Form from './components/Form';
import MountLifecycleA from './components/MountLifecycleA';
import FragmentDemo from './components/FragmentDemo';
import ParentComp from './components/ParentComp';
import RefsDemo from './components/RefsDemo';
import FrParent from './components/FrParent';
import Portal from './components/Portal';
import ErrorComponent from './components/ErrorComponent';
import ErrorBoundary from './components/ErrorBoundary';
import HoverIcre from './components/HOC/HoverIcre';
import ClickIncr from './components/HOC/ClickIncr';
import Counter2 from './components/RenderProps/Counter2';
import HoverInc2 from './components/RenderProps/HoverInc2';
import ClickInc2 from './components/RenderProps/ClickInc2';
import ComponentA from './components/Context/ComponentA';
import { UserProvider } from './components/Context/userContext';
import ComponentC from './components/Context/ComponentC';
import ComponentB from './components/Context/ComponentB';
import ComponentD from './components/Context/ComponentD';

/* function based stateless component (in hooks they are statefull)*/
/* 
function App() {
  return (
    <div className="App">
      <Greet />
    </div>
  );
} 
*/

/* Class based statefull component */
// eslint-disable-next-line
class App extends Component {
  render() {
    return (
      <div className='App'>
        {/* <Greet name="Dante" alias="Son of Sparda" />
        <Greet name="Virgil" alias="Nero's Father">
          <p>This is to test the children1 props</p>
          <b>This is to test the children2 props</b>
        </Greet>
        <Welcome name="Dante" alias="Son of Sparda" />
        <Welcome name="Virgil" alias="Nero's Father">
          <p id="testId">This is to test the children1 props</p>
          <b className="bold">
            <p>This is to test the children2 props (only bold)</p>
          </b>
          <b className="bold">
            <p>This is to test the children3 props (only bold)</p>
          </b>
        </Welcome>
        <Bye /> */}
        {/* <Message test="propTestsing" name="test" /> */}
        {/* <Counter /> */}
        {/* 
        <FunctionClick />
        <ClassClick /> 
        */}
        {/* <ParentComponent /> */}
        {/* <GreetingUser /> */}
        {/* <NameList /> */}
        <ToDoList />
        {/*
        <StyleSheet primary={true} />
        <Inline /> 
        */}
        {/* <Form /> */}
        {/* <MountLifecycleA /> */}
        {/* <FragmentDemo /> */}
        {/* <ParentComp /> */}
        {/* <RefsDemo /> */}
        {/* <FrParent /> */}
        {/* <Portal /> */}
        {/* 
        <ErrorBoundary>
          <ErrorComponent hero="dante" />
        </ErrorBoundary>
        <ErrorBoundary>
          <ErrorComponent hero="vergil" />
        </ErrorBoundary>
        <ErrorBoundary>
          <ErrorComponent hero="joker" />
        </ErrorBoundary>
         */}
        {/* <ClickIncr /> */}
        {/* <HoverIcre /> */}
        {/* <HoverIcre inc={5} /> */}

        {/* 
        <Counter2
          render={(count, incrementCounter) => (
            <ClickInc2 count={count} incrementCounter={incrementCounter} />
          )}
        />
        <Counter2
          render={(count, incrementCounter) => (
            <HoverInc2 count={count} incrementCounter={incrementCounter} />
          )}
        /> 
        */}
        {/* 
        <Counter2>
          {(count, incrementCounter) => (
            <ClickInc2 count={count} incrementCounter={incrementCounter} />
          )}
        </Counter2>
        <Counter2>
          {(count, incrementCounter) => (
            <HoverInc2 count={count} incrementCounter={incrementCounter} />
          )}
        </Counter2>
         */}
        {/* <UserProvider value="dante">
          <ComponentA />
        </UserProvider> */}
        {/* <ComponentA /> */}
        {/* <UserProvider value={{ name: 'dante', title: 'devil slayer' }}> */}
        {/* <UserProvider value={['Dante', 'Devil Slayer']}>
          <ComponentA />
        </UserProvider>
        <ComponentD /> */}
      </div>
    );
  }
}

export default App;
