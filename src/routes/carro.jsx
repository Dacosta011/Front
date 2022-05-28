import React, { useEffect, useState, useRef } from "react";
import axios from "axios"
import "./carro.scss";

const Carro = () => {
  const [carros, setCarros] = useState();
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    handleEfect();
  }, []);

  const idcarro = useRef(null);
  const marcaCar = useRef(null);
  const modeloCar = useRef(null);

  const handleNew = async() => {
    const newCar = {
      id: idcarro.current.value,
      marca: marcaCar.current.value,
      modelo: modeloCar.current.value,
    };
    const data = await axios.post("http://localhost:3001/api2", newCar);
    const response = await data.data;
    idcarro.current.value = "";
    marcaCar.current.value = "";
    modeloCar.current.value = "";
    console.log(response);
    handleEfect();
  };

  const handleDelete = async(id) => {
    console.log(id);
    const data = await axios.delete(`http://localhost:3001/api2/${id}`);
    const response = await data.data;
    console.log(response);
    handleEfect();
  };

  const handleUpdate = async(carro) => {
    setUpdate(true);
    idcarro.current.value = carro.id;
    marcaCar.current.value = carro.marca;
    modeloCar.current.value = carro.modelo;
  };

  const updateCar = async() => {
    const newCar = {
      marca: marcaCar.current.value,
      modelo: modeloCar.current.value,
    };
    const data = await axios.put(`http://localhost:3001/api2/${idcarro.current.value}`, newCar);
    const response = await data.data;
    setUpdate(false);
    idcarro.current.value = "";
    marcaCar.current.value = "";
    modeloCar.current.value = "";
    console.log(response);
    handleEfect();
  };


  const handleEfect = async () => {
    const response = await fetch("http://localhost:3001/api2");
    const data = await response.json();
    setCarros(data);
    console.log(data);
  };
  return (
    <>
      <h1>carros</h1>
      <div className="container-car">
        <div className="new-carro">
          <p className="p-new">Crear un nuevo carro</p>
          <div className="inp-container-car">
            <input type="text" placeholder="id" ref={idcarro} disabled={update}/>
            <input type="text" placeholder="marca" ref={marcaCar}/>
            <input type="text" placeholder="modelo" ref={modeloCar}/>
          </div>
          {update ? (
            <button onClick={updateCar}>Actualizar</button>
          ) : (
            <button onClick={handleNew}>Crear</button>
          )}
        </div>
        <section className="container-car">
          {carros &&
            carros.map((carro) => (
              <div className="card-car" key={carro.id}>
                <p>ID: {carro.id}</p>
                <p>Marca: {carro.marca}</p>
                <p>Modelo: {carro.modelo}</p>
                <div className="but-con">
                  <button onClick={
                    () => handleDelete(carro.id)
                  }>Eliminar</button>
                  <button onClick={
                    () => handleUpdate(carro)
                  }>Modificar</button>
                </div>
              </div>
            ))}
            
        </section>
      </div>
    </>
  );
};

export default Carro;
