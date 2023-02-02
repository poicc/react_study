import React, { useState, createContext } from 'react';
import CounterClass from './01_体验hooks/01_counter-class';
import CounterHook from './01_体验hooks/02_counter-hook';
import CounterHook2 from './01_体验hooks/03_counter-hook';
import MultiHookState from './02_useState使用/01_多个状态的使用';
import ComplexHookState from './02_useState使用/02_复杂状态的修改';
import ClassCounterTitleChange from './03_useEffect使用/01_class实现title的修改';
import HookCounterChangeTitle from './03_useEffect使用/02_useEffect的hook实现title的修改';
import EffectHookCancelDemo from './03_useEffect使用/03_useEffect模拟订阅和取消订阅';
import MultiEffectHookDemo from './03_useEffect使用/04_多useEffect一起使用';
import ContextHookDemo from './04_useContext使用/useContext的使用';



export const UserContext = createContext();
export const TokenContext = createContext();

export const ThemeContext = createContext();

export default function App() {
  const [show, setShow] = useState(true);

  return (
    <div>
      {/* 1.Hook初体验 */}
      {/* <CounterClass/> */}
      {/* <CounterHook/> */}
      {/* <CounterHook2/> */}

      {/* 2.useState */}
      {/* <MultiHookState/> */}
      {/* <ComplexHookState/> */}

      {/* 3.useEffect */}
      {/* <ClassCounterTitleChange/> */}
      {/* <HookCounterChangeTitle/> */}
      {/* {show && <EffectHookCancelDemo/>} */}
      {/* <MultiEffectHookDemo/> */}

      {/* 4.useContext */}
      <UserContext.Provider value={{name: "why", age: 18}}>
        <ThemeContext.Provider value={{fontSize: "30px", color: "red"}}>
          <ContextHookDemo/>
        </ThemeContext.Provider>
      </UserContext.Provider>

      <button onClick={e => setShow(!show)}>切换</button>
    </div>
  )
}