import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./pais.scss";

const Pais = () => {
  const [pais, setPais] = useState([]);
  const [update, setUpdate] = useState(false);

  const idpais = useRef(null);
  const nombre = useRef(null);
  const continente = useRef(null);

  useEffect(() => {
    handleAllPais();
  }, []);

  const handleAllPais = async () => {
    const res = await axios.get("http://localhost:5000/api1");
    setPais(res.data);
    console.log(res.data);
  };

  const handleAddPais = async () => {
    const newPais = {
      id: idpais.current.value,
      nombre: nombre.current.value,
      continente: continente.current.value,
    };
    const resp = await axios.post("http://localhost:5000/api1", newPais);
    console.log(resp.data);
    idpais.current.value = "";
    nombre.current.value = "";
    continente.current.value = "";
    handleAllPais();
  };

  const handleDeletePais = async (id) => {
    const resp = await axios.delete(`http://localhost:5000/api1/${id}`);
    console.log(resp.data);
    handleAllPais();
  };
  const handleUpdate = (pais) => {
    setUpdate(true);
    idpais.current.value = pais.id;
    nombre.current.value = pais.nombre;
    continente.current.value = pais.continente;
  };

  const updatePais = async () => {
    const newPais = {
      nombre: nombre.current.value,
      continente: continente.current.value,
    };
    const resp = await axios.put(
      `http://localhost:5000/api1/${idpais.current.value}`,
      newPais
    );
    console.log(resp.data);
    idpais.current.value = "";
    nombre.current.value = "";
    continente.current.value = "";
    handleAllPais();
    setUpdate(false);
  };

  return (
    <section className="container-pa">
      <h1>Paises</h1>
      <div className="con-container">
        <div className="new-pais">
          <h2>Nuevo Pais</h2>
          <div className="input-pais">
            <input type="text" placeholder="id" ref={idpais} disabled={update}/>
            <input type="text" placeholder="nombre" ref={nombre} />
            <input type="text" placeholder="continente" ref={continente} />
          </div>
          {update ? (
            <button onClick={updatePais}>Actualizar</button>
          ) : (
            <button onClick={handleAddPais}>Crear</button>
          )}
        </div>
        <div className="list-pais">
          {pais &&
            pais.map((pais) => (
              <div className="card-pais" key={pais.id}>
                <p>ID: {pais.id}</p>
                <p>Nombre: {pais.nombre}</p>
                <p>Continente: {pais.continente}</p>
                <div className="pais-but-con">
                  <button onClick={
                    () => handleUpdate(pais)
                  }>Editar</button>
                  <button onClick={() => handleDeletePais(pais.id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Pais;
