
import "bootstrap/dist/css/bootstrap.min.css"
import '../css/App.css';
import { useState } from "react";

// --------------------------------------------------------------------------------

export function HomePage() {
  const [components, setComponents] = useState([
    {
      id: 1, component:
        <HomePage />
    },
    {
      id: 2, component:
        <HomePage />

    },
    {
      id: 3, component:
        <HomePage />
    },
    {
      id: 4, component:
        <HomePage />
    },
  ]);

  const handleDeleteComponent = (id: number) => {
    const updatedComponents = components.filter((component) => component.id !== id);
    setComponents(updatedComponents);
  };

  return (
    <div className="App">
      {components.map((component) => (
        <div key={component.id}>
          {component.component}
          <div className="homePageDelContainer">
            <img src="https://cdn-icons-png.freepik.com/512/3807/3807871.png" className="homePageDelIcon" alt="Delete" onClick={() => handleDeleteComponent(component.id)} />
          </div>
        </div>
      ))}
    </div>

  )
}
