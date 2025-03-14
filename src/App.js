// App project was created using the link:
// https://medium.com/@worachote/building-a-todo-list-app-with-reactjs-a-step-by-step-guide-2c58b9b6c0f5
// Used ChatGPT to help with connecting app to firebase

import React from 'react';
import TodoMonth from './components/TodoMonth';
import './App.css';

function App() {
  return (
    <div className="App">
      <TodoMonth/>
    </div>
  );
}

export default App;
