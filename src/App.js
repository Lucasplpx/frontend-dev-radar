import React, { useState, useEffect } from 'react';
import api from './services/api';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

export default function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const resp = await api.get('/devs');
      setDevs(resp.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {
    try {
      const resp = await api.post('/devs', data);
      setDevs([...devs, resp.data]);
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}

        </ul>
      </main>

    </div>
  )
}
