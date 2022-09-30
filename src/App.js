import { useState } from "react";
import UserBar from "./user/UserBar";

function App() {
  const [name, setName] = useState('');
  function handleNameChange(evt){
    setName(evt.target.value);
  }
  
  return (
    <div>
      <h1>Hello {name}</h1>
      <input  type = "text"
              value = {name}
              onChange = {handleNameChange}
      />
      <UserBar/>
    </div>
  );
}

export default App;