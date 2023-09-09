import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../../styles/demo.css";

function Demo() {
    const { index } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
    });

    useEffect(() => {
        if (index) {
            const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
            const contact = contacts[index];
            if (contact) {
                setFormData(contact);
            }
        }
    }, [index]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];

        if (index !== undefined) {
            contacts[index] = formData; // Editando el contacto
        } else {
            contacts.push(formData); // Añadiendo un nuevo contacto
        }

        localStorage.setItem('contacts', JSON.stringify(contacts));
        setFormData({
            name: '',
            address: '',
            phone: '',
            email: '',
        });

        navigate('/'); // Volvemos al home después de agregar/editar el contacto
    };

    return (
        <div className="App">
            <h1>{index !== undefined ? 'Edita un contacto' : 'Ingresa un contacto'}</h1>
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
                    <button type="submit">{index !== undefined ? 'Actualizar Contacto' : 'Guardar Contacto'}</button>
                </div>
            </form>
            <button onClick={() => navigate('/')}>Volver al Home</button>
        </div>
    );
}

export default Demo;

