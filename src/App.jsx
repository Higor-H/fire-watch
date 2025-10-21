import fireWatchLogo from './assets/fire-watch-logo.svg'
import './App.css'
import {useState} from "react";

function App() {

    const [online, setOnline] = useState("❌ Desconectado");
    //conectWebSocket();

  return (
    <>
      <div>
          <img src={fireWatchLogo} className="logo react" alt="Site logo" />
      </div>
      <h1>Fire-Watch</h1>
      <div className="card">
        <p className="info-text">
            Sua ferramenta de monitoramento de risco de incêndio florestal em tempo real.
        </p>
          <p className="info-text">
             Status dos sensores:
          </p>
          <p className="info-text">
              {online}
          </p>

      </div>
      <p className="read-the-docs">

      </p>
        <div className="card_container">
            <div className="card">
                <div className="zone zone_1">
                    <p>🔬 Status Zona 1</p>
                    <p>Local: Plantação de soja</p>


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
                    <p>Local: Plantação de milho</p>


                    <div className="info_menu">
                        <p>Nivel de umidade:    </p>
                        <p>temperatura:    </p>
                        <p>Fumaça:    </p>

                        <p>Risco de incendio: </p>
                    </div>
                </div>
            </div>
        </div>
        <footer>
        <p>footer</p>
        </footer>
    </>
  )
}

export default App
