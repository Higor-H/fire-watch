import fireWatchLogo from './assets/fire-watch-logo-black.svg'
import './App.css'
import { useState, useEffect } from "react";
import { connectWebSocket } from "./api/WebSocket.jsx";

function App() {
    const [online, setOnline] = useState("❌ Desconectado");
    const [umidade, setUmidade] = useState("-");
    const [temperatura, setTemperatura] = useState("-");
    // const [gas, setGas] = useState("-");
    const [risco, setRisco] = useState("-");

    useEffect(() => {
        const disconnect = connectWebSocket({
            onOpen: () => setOnline("✅ Conectado"),
            onClose: () => setOnline("❌ Desconectado"),
            onMessage: (data) => {
               
                //if (data?.zone !== undefined && Number(data.zone) !== 1) return;
                if (data?.umidade !== undefined) setUmidade(data.umidade);
                if (data?.temperatura !== undefined) setTemperatura(data.temperatura);
                // if (data?.gas !== undefined) setGas(data.gas ? "Sim" : "Não");
                if (data?.risco !== undefined) setRisco(data.risco);
            },
        });
        return () => disconnect?.();
    }, []);

    return (
        <>
            <div id="root">
                <div className="divLeft">
                    <img src={fireWatchLogo} className="logo react" alt="Site logo" />
                    {/*<h1>Fire-Watch</h1>*/}
                    <div className="card">
                        <p className="info-text">
                            Sua ferramenta de monitoramento de risco de incêndio florestal em tempo real.
                        </p>
                        <p className="info-text2">
                            Status dos sensores:
                        </p>
                        <p className="info-text2">
                            {online}
                        </p>
                        <p className="info-text3">BY: Enzo Almeida, Higor Milani, Maria Chehade, Matheus Durante, Guilherme Oliveira</p>
                    </div>
                </div>

                <div className="divRight">
                    <p style={{ fontSize: '85px' }}>🔍</p>
                    <div className="card">
                        <div className="zone zone_1">

                            <p style={{ fontSize: 22 }}><b>🔬 Status Zona 1</b></p>
                            <p>Local: <b>Plantação de soja</b></p>
                            <div className="info_menu">
                                <p>Nível de umidade..... <b>{umidade}</b>%</p>
                                <p>Temperatura............ <b>{temperatura}</b>°C</p>
                                <p>Risco de incêndio..... <b>{risco}</b>%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;


