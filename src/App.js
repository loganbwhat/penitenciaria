import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [detentos, setDetentos] = useState([]);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [crime, setCrime] = useState('');
  const [tempoDePena, setTempoDePena] = useState('');
  const [faccao, setFaccao] = useState('');
  const [patio, setPatio] = useState('');
  const [refeicao, setRefeicao] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/detentos')
      .then(response => setDetentos(response.data))
      .catch(error => console.error('Erro ao buscar detentos:', error));
  }, []);

  const adicionarDetento = () => {
    axios.post('http://localhost:5000/detentos', {
      nome,
      idade: parseInt(idade),
      crime,
      tempoDePena: parseInt(tempoDePena),
      faccao,
      horarios: {
        patio,
        refeicao
      }
    })
      .then(response => setDetentos([...detentos, response.data]))
      .catch(error => alert(error.response.data));
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Penitenciária</h2>
        <ul>
          <li><a href="/">Dashboard</a></li>
          <li><a href="/">Detentos</a></li>
          <li><a href="/">Horários</a></li>
          <li><a href="/">Facções</a></li>
        </ul>
      </div>

      {/* Conteúdo principal */}
      <div className="main-content">
        <div className="header">
          Sistema Penitenciário
        </div>

        {/* Formulário de cadastro */}
        <div className="form-container">
          <h3>Cadastro de Detento</h3>
          <input
            placeholder="Nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
          <input
            placeholder="Idade"
            value={idade}
            onChange={e => setIdade(e.target.value)}
          />
          <input
            placeholder="Crime"
            value={crime}
            onChange={e => setCrime(e.target.value)}
          />
          <input
            placeholder="Tempo de Pena (anos)"
            value={tempoDePena}
            onChange={e => setTempoDePena(e.target.value)}
          />
          <input
            placeholder="Facção"
            value={faccao}
            onChange={e => setFaccao(e.target.value)}
          />
          <input
            placeholder="Horário de Pátio"
            value={patio}
            onChange={e => setPatio(e.target.value)}
          />
          <input
            placeholder="Horário de Refeição"
            value={refeicao}
            onChange={e => setRefeicao(e.target.value)}
          />
          <button onClick={adicionarDetento}>Adicionar Detento</button>
        </div>

        {/* Lista de Detentos */}
        <div className="detentos-list">
          <h3>Lista de Detentos</h3>
          <ul>
            {detentos.map(detento => (
              <li key={detento._id}>
                <span>
                  <strong>{detento.nome}</strong>, {detento.idade} anos, {detento.crime}, {detento.tempoDePena} anos de pena. 
                </span>
                <span>Patio: {detento.horarios.patio}, Refeição: {detento.horarios.refeicao}, Facção: {detento.faccao}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
