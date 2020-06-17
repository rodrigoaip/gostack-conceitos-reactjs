import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('repositories').then(response => {      
       setRepositories(response.data); 
    })}, [] ); 


  async function handleAddRepository() {
    const response = await api.post('repositories',{
                                       title:`Novo repositório ${Date.now()}`, 
                                       url:"https://github.com/rodrigoaip/gostack-conceitos-reactjs", 
                                       techs:["Node", "ReactJS"]
    });

    setRepositories([...repositories, response.data]);
    
  }

  async function handleRemoveRepository(id) {
    const {status} = await api.delete(`repositories/${id}`);
    
    if (status === 204) {
      setRepositories(repositories.filter( repository => repository.id !== id ))
    }
    else {
      alert('Erro ao deletar, id não encontrado.');
    }



  }

  return (
    <div>
      <ul data-testid="repository-list">

      {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
      )) }

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
