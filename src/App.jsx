import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Fire-Watch</h1>
      <div className="card">
        <p className="info-text">
            Sua ferramenta de monitoramento de risco de incêndio florestal em tempo real.
        </p>
      </div>
      <p className="read-the-docs">

      </p>
        <div className="card_container">
            <div className="card">
                <div className="zone zone_1">
                    <p>Status Zona 1</p>
                    <p>Tamanho do campo</p>


                    <div className="info_menu">
                        <p>Nivel de umidade:    </p>
                        <p>temperatura:    </p>
                        <p>Fumaça:    </p>


                        <p>Risco de incendio: </p>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="zone zone_2">
                    <p>Status Zona 1</p>
                    <p>Tamanho do campo</p>


                    <div className="info_menu">
                        <p>Nivel de umidade:    </p>
                        <p>temperatura:    </p>
                        <p>Fumaça:    </p>

                        <p>Risco de incendio: </p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default App
