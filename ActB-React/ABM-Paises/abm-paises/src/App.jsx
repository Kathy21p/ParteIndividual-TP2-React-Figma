import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [paises, setPaises] = useState(() => {
    const paisesGuardados = localStorage.getItem("paises");
    return paisesGuardados ? JSON.parse(paisesGuardados) : [];
  });

  const [nombrePais, setNombrePais] = useState("");
  const [error, setError] = useState("");

  const [paisEditar, setPaisEditar] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [errorModificar, setErrorModificar] = useState("");

  useEffect(() => {
    localStorage.setItem("paises", JSON.stringify(paises));
  }, [paises]);

  const agregarPais = () => {
    const nombre = nombrePais.trim();

    if (nombre === "") {
      setError("Debe ingresar el nombre del país.");
      return;
    }

    const existe = paises.some(
      (pais) => pais.toLowerCase() === nombre.toLowerCase(),
    );

    if (existe) {
      setError("El país ingresado ya existe.");
      return;
    }

    setPaises([...paises, nombre]);
    setNombrePais("");
    setError("");
    setMostrarFormulario(false);
  };

  const eliminarPais = (paisEliminar) => {
    const confirmar = window.confirm(
      `¿Está seguro que desea dar de baja el país ${paisEliminar}?`,
    );

    if (confirmar) {
      const nuevaLista = paises.filter((pais) => pais !== paisEliminar);

      setPaises(nuevaLista);
    }
  };

  const abrirModificar = (pais) => {
    setPaisEditar(pais);
    setMostrarFormulario(false);
    setNuevoNombre(pais);
    setErrorModificar("");
  };

  const modificarPais = () => {
    const nombre = nuevoNombre.trim();

    if (nombre === "") {
      setErrorModificar("Debe ingresar el nombre del país.");
      return;
    }

    const existe = paises.some(
      (pais) =>
        pais.toLowerCase() === nombre.toLowerCase() && pais !== paisEditar,
    );

    if (existe) {
      setErrorModificar("El país ingresado ya existe.");
      return;
    }

    const listaActualizada = paises.map((pais) =>
      pais === paisEditar ? nombre : pais,
    );

    setPaises(listaActualizada);
    setPaisEditar(null);
    setNuevoNombre("");
    setErrorModificar("");
  };

  return (
    <div>
      <h1>Sistema de Gestión de Países</h1>
      <h2>Listado de Países</h2>
      <button
        onClick={() => {
          setPaisEditar(null);
          setMostrarFormulario(true);
          setNombrePais("");
          setError("");
        }}
      >
        Alta
      </button>
      {mostrarFormulario && (
        <div className="formulario">
          <h3>Alta País</h3>

          <label>Nombre del País:</label>

          <input
            type="text"
            placeholder="Ingrese un país"
            value={nombrePais}
            onChange={(e) => {
              setNombrePais(e.target.value);
              setError("");
            }}
          />

          {error && <p className="error">{error}</p>}

          <div>
            <button onClick={agregarPais}>Aceptar</button>

            <button
              onClick={() => {
                setMostrarFormulario(false);
                setNombrePais("");
                setError("");
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {paisEditar !== null && (
        <div className="formulario">
          <h3>Modificar País</h3>

          <label>Nombre del País:</label>

          <input
            type="text"
            value={nuevoNombre}
            onChange={(e) => {
              setNuevoNombre(e.target.value);
              setErrorModificar("");
            }}
          />

          {errorModificar && <p className="error">{errorModificar}</p>}

          <div>
            <button onClick={modificarPais}>Aceptar</button>

            <button
              onClick={() => {
                setPaisEditar(null);
                setNuevoNombre("");
                setErrorModificar("");
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Nombre del País</th>
            <th>Modificar</th>
            <th>Baja</th>
          </tr>
        </thead>

        <tbody>
          {paises.map((pais, index) => (
            <tr key={index}>
              <td>{pais}</td>

              <td>
                <button onClick={() => abrirModificar(pais)}>Modificar</button>
              </td>

              <td>
                <button className="btn-baja" onClick={() => eliminarPais(pais)}>
                  Baja
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
