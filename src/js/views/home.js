import React, { useState, useEffect } from 'react';
import { MdMail, MdPhone, MdEdit, MdDelete, MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import "../../styles/home.css"

function Home() {
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedContacts = JSON.parse(localStorage.getItem('contacts'));
        if (storedContacts) setContacts(storedContacts);
    }, []);

    const handleAddClick = () => {
        navigate('/demo');
    };

    const handleEdit = (index) => {
        navigate(`/demo/${index}`);
    };

    const handleDelete = (index) => {
        if (window.confirm("¿Estás seguro de querer eliminar este contacto?")) {
            const updatedContacts = [...contacts];
            updatedContacts.splice(index, 1);
            setContacts(updatedContacts);
            localStorage.setItem('contacts', JSON.stringify(updatedContacts));
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Mis Contactos</h2>
                <button onClick={handleAddClick} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    <MdAdd /> Agregar contacto
                </button>
            </div>

            {contacts.map((contact, index) => (
                <div className="contact-card" key={index}>
                    <img src="path/to/default/image.jpg" alt="contact" className="contact-image" />
                    <div className="contact-info">
                        <strong>{contact.name}</strong><br />
                        <MdPhone /> {contact.phone}<br />
                        <MdMail /> {contact.email}<br />
                        <span>{contact.address}</span><br />
                    </div>
                    <div className="contact-actions">
                        <button onClick={() => handleEdit(index)}><MdEdit /></button>
                        <button onClick={() => handleDelete(index)}><MdDelete /></button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;
