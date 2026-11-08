import "./App.css";
import { useState } from "react";

function App() {
  const [direccion, setDireccion] = useState({
    alias: "",
    calle: "",
    numero: "",
    ciudad: "",
    localidad: "",
    piso: "",
    departamento: "",
    observaciones: "",
  });

  const [direcciones, setDirecciones] = useState(() => {
    const guardadas = localStorage.getItem("direcciones");
    return guardadas ? JSON.parse(guardadas) : [];
  });

  const [error, setError] = useState("");

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setDireccion({
      ...direccion,
      [name]: value,
    });

    setError("");
  };

  const cancelarDireccion = () => {
    setDireccion({
      alias: "",
      calle: "",
      numero: "",
      ciudad: "",
      localidad: "",
      piso: "",
      departamento: "",
      observaciones: "",
    });
    setError("");
  };

  const guardarDireccion = () => {
    const camposObligatorios = [
      "alias",
      "calle",
      "numero",
      "ciudad",
      "localidad",
    ];

    const hayCamposVacios = camposObligatorios.some(
      (campo) => direccion[campo].trim() === "",
    );

    if (hayCamposVacios) {
      setError("Debe completar todos los campos obligatorios.");
      return;
    }

    const nuevasDirecciones = [...direcciones, direccion];

    setDirecciones(nuevasDirecciones);

    localStorage.setItem("direcciones", JSON.stringify(nuevasDirecciones));

    setError("");

    setDireccion({
      alias: "",
      calle: "",
      numero: "",
      ciudad: "",
      localidad: "",
      piso: "",
      departamento: "",
      observaciones: "",
    });

    alert("Dirección guardada correctamente.");
  };

  return (
    <div className="contenedor">
      <h1>Gestión de Direcciones de Entrega</h1>
      <p>Registro de direcciones para pedidos de comida</p>

      <div className="formulario">
        <h2>Agregar Dirección</h2>

        <label>Alias de la dirección *</label>
        <input
          type="text"
          name="alias"
          placeholder="Ej: Casa, Trabajo"
          value={direccion.alias}
          onChange={manejarCambio}
        />

        <label>Calle *</label>
        <input
          type="text"
          name="calle"
          placeholder="Ingrese la calle"
          value={direccion.calle}
          onChange={manejarCambio}
        />

        <label>Número *</label>
        <input
          type="text"
          name="numero"
          placeholder="Ingrese el número"
          value={direccion.numero}
          onChange={manejarCambio}
        />

        <label>Ciudad *</label>
        <input
          type="text"
          name="ciudad"
          placeholder="Ingrese la ciudad"
          value={direccion.ciudad}
          onChange={manejarCambio}
        />

        <label>Localidad *</label>
        <input
          type="text"
          name="localidad"
          placeholder="Ingrese la localidad"
          value={direccion.localidad}
          onChange={manejarCambio}
        />

        <label>Piso</label>
        <input
          type="text"
          name="piso"
          placeholder="Ingrese el piso"
          value={direccion.piso}
          onChange={manejarCambio}
        />

        <label>Departamento</label>
        <input
          type="text"
          name="departamento"
          placeholder="Ingrese el departamento"
          value={direccion.departamento}
          onChange={manejarCambio}
        />

        <label>Observaciones</label>
        <textarea
          name="observaciones"
          placeholder="Indicaciones adicionales"
          value={direccion.observaciones}
          onChange={manejarCambio}
        />
        {error && <p className="error">{error}</p>}

        <div className="botones">
          <button onClick={guardarDireccion}>Aceptar</button>
          <button onClick={cancelarDireccion}>Cancelar</button>
        </div>
      </div>

      <div className="listado">
        <h2>Direcciones Registradas</h2>

        {direcciones.length === 0 ? (
          <p>No hay direcciones registradas.</p>
        ) : (
          <div className="lista-direcciones">
            {direcciones.map((dir, index) => (
              <div className="tarjeta-direccion" key={index}>
                <h3>{dir.alias}</h3>

                <p>
                  <strong>Calle:</strong> {dir.calle} {dir.numero}
                </p>

                <p>
                  <strong>Ciudad:</strong> {dir.ciudad}
                </p>

                <p>
                  <strong>Localidad:</strong> {dir.localidad}
                </p>

                {dir.piso && (
                  <p>
                    <strong>Piso:</strong> {dir.piso}
                  </p>
                )}

                {dir.departamento && (
                  <p>
                    <strong>Departamento:</strong> {dir.departamento}
                  </p>
                )}

                {dir.observaciones && (
                  <p>
                    <strong>Observaciones:</strong> {dir.observaciones}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
