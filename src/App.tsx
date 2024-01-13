// App.tsx
import React from "react";
import TodoList from "./components/TodoList";
import DigitalClock from "./components/DigitalClock";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App: React.FC = () => {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <TodoList />
        <DigitalClock />
      </DndProvider>
    </div>
  );
};

export default App;
