import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/demo.css"


function Demo() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  });
  const navigate = useNavigate();

  // Carga los contactos del localStorage al montar el componente y
  // actualiza el estado con esos datos
  const getContacts = () => {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    return contacts;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const contacts = getContacts();
    contacts.push(formData);  // Añadimos el nuevo contacto

    localStorage.setItem('contacts', JSON.stringify(contacts));
    setFormData({
      name: '',
      address: '',
      phone: '',
      email: '',
    });

    navigate('/'); // Volvemos al home después de agregar el contacto
  };

  return (
    <div className="App">
      <h1>Ingresa un contacto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nombre:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Dirección:
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Teléfono:
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <button type="submit">Guardar Contacto</button>
        </div>
      </form>
      <button onClick={() => navigate('/')}>Volver al Home</button>
    </div>
  );
}

export default Demo;

