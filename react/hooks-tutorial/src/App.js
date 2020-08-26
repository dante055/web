import React from 'react';
import ClassCounter from './components/ClassCounter';
import HookCounter from './components/HookCounter';
import HookCounter2 from './components/HookCounter2';
import HooksObject from './components/HooksObject';
import HookArr from './components/HookArr';
import HookEffect1 from './components/HookEffect1';
import ClassConditionalUpdate from './components/ClassConditionalUpdate';
import HookEffectConditional from './components/HookEffectConditional';
import ClassComponentDidMount from './components/ClassComponentDidMount';
import HookEffectRunOnce from './components/HookEffectRunOnce';
import HookEffectCleanUpContainer from './components/HookEffectCleanUpContainer';
import HookEffectDependency from './components/HookEffectDependency';
import HookEffectDataFetching from './components/HookEffectDataFetching';
import HookUseReducer1 from './components/HookUseReducer1';
import HookUseReducerComplex from './components/HookUseReducerComplex';
import HookUseReducerMultiple from './components/HookUseReducerMultiple';
import ComponentA from './components/globalStateManagment/ComponentA';
import StatePlusEffect from './components/dataFetching/StatePlusEffect';
import ReducerPlusFetch from './components/dataFetching/ReducerPlusFetch';
import Interval from './components/Interval';
import CustomInputHook from './components/CustomInputHook';
import './App.css';

function App() {
  return (
    <div className='App'>
      {/* <ClassCounter /> */}
      {/* <HookCounter /> */}
      {/* <HookCounter2 /> */}
      {/* <HooksObject /> */},{/* <HookArr /> */}
      {/* <HookEffect1 /> */}
      {/* <ClassConditionalUpdate /> */}
      {/* <HookEffectConditional /> */}
      {/* <ClassComponentDidMount /> */}
      {/* <HookEffectRunOnce /> */}
      {/* <HookEffectCleanUpContainer /> */}
      {/* <HookEffectDependency /> */}
      {/* <HookEffectDataFetching /> */}
      {/* <HookUseReducer1 /> */}
      {/* <HookUseReducerComplex /> */}
      {/* <HookUseReducerMultiple /> */}
      {/* <ComponentA />  */}
      {/* <StatePlusEffect /> */}
      {/* <ReducerPlusFetch /> */}
      {/* <Interval /> */}
      <CustomInputHook />
    </div>
  );
}

export default App;
