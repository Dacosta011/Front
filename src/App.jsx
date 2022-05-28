import { useNavigate } from "react-router-dom";
import "./App.scss";

function App() {
  let navigate = useNavigate();
  const navigateCar = () =>{
    navigate("./carro")
  }
  const navigatePa = () =>{
    navigate("./pais")
  }

  return (
    <section className="container-app">
      <div className="card-app">
        <h1>CRUDS</h1>
          <button onClick={navigateCar}>Carros</button>
          <button onClick={navigatePa}>Paises</button>
      </div>
    </section>
  );
}

export default App;
