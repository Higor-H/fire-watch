import fireWatchLogo from './assets/fire-watch-logo-black.svg'
import './App.css'
import { useState, useEffect } from "react";
import { connectWebSocket } from "./api/WebSocket.jsx";
import {connectWebSocket2} from "./api/WebSocket2.jsx";

function App() {
    const [online, setOnline] = useState(" Desconectado ❌");
    const [umidade, setUmidade] = useState("-");
    const [temperatura, setTemperatura] = useState("-");
     const [gas, setGas] = useState("-");
    const [risco, setRisco] = useState("-");


    const [online2, setOnline2] = useState(" Desconectado ❌");
    const [umidade2, setUmidade2] = useState("-");
    const [temperatura2, setTemperatura2] = useState("-");
    const [gas2, setGas2] = useState("-");
    const [risco2, setRisco2] = useState("-");



    useEffect(() => {
        const disconnect = connectWebSocket({
            onOpen: () => setOnline(" Conectado ✅"),
            onClose: () => setOnline(" Desconectado ❌"),
            onMessage: (data) => {
               
                //if (data?.zone !== undefined && Number(data.zone) !== 1) return;
                if (data?.umidade !== undefined) setUmidade(data.umidade);
                if (data?.temperatura !== undefined) setTemperatura(data.temperatura);
                 if (data?.gas !== undefined) setGas(data.gas);
                if (data?.risco !== undefined) {
                    const riscoMap = {
                        0: "Não propenso a incêndios",
                        1: "Baixa chance de incêndio",
                        2: "Cuidado! Tempo propenso a incêndios",
                        3: "Possível incêndio em andamento"
                    };

                    setRisco(riscoMap[data.risco] || "Risco desconhecido");
                }
            },
        });
        return () => disconnect?.();
    }, []);


    useEffect(() => {
        const disconnect = connectWebSocket2({
            onOpen: () => setOnline2(" Conectado ✅"),
            onClose: () => setOnline2(" Desconectado ❌"),
            onMessage: (data) => {

                //if (data?.zone !== undefined && Number(data.zone) !== 1) return;
                if (data?.umidade !== undefined) setUmidade2(data.umidade);
                if (data?.temperatura !== undefined) setTemperatura2(data.temperatura);
                if (data?.gas !== undefined) setGas2(data.gas);
                if (data?.risco !== undefined) {
                    const riscoMap = {
                        0: "Não propenso a incêndios",
                        1: "Baixa chance de incêndio",
                        2: "Cuidado! Tempo propenso a incêndios",
                        3: "🔥 Possível incêndio em andamento! 🔥"
                    };
                    setRisco2(riscoMap[data.risco] || "Risco desconhecido");
                }
            },
        });
        return () => disconnect?.();
    }, []);


    return (
        <>
            <div id="root">
                <div className="divLeft">
                    <img src={fireWatchLogo} className="logo react" alt="Site logo" />
                    
                    <div className="card">
                        <p className="info-text">
                            Sua ferramenta de monitoramento de risco de incêndio florestal em tempo real.
                        </p>
                        <p className="info-text2">
                            Status de conexão:
                        </p>
                        <p className="info-text2">
                            Zona 1 = {online}
                        </p><p className="info-text2">
                            Zona 2 = {online2}
                        </p>
                        <p className="info-text3">BY: Enzo Almeida, Higor Milani, Maria Chehade, Matheus Durante, Guilherme Oliveira</p>
                    </div>
                </div>

                <div className="divRight">
                    <h3 style={{ fontSize: '85px' }}>🔍</h3>
                    <div className="card">
                        <div className="zone zone_1">

                            <p style={{ fontSize: 22 }}><b>🔬 Status Zona 1</b></p>
                            <p>Local: <b>Área Norte</b></p>
                            <div className="info_menu">
                                <p>Nível de umidade......... <b>{umidade}</b>%</p>
                                <p>Temperatura............ <b>{temperatura}</b>°C</p>
                                <p>Fumaça............................ <b>{gas}</b></p>
                                <p className="risk_info"><b>{risco}</b></p>
                                
                            </div>
                        </div>

                        <div className="zone zone_2">

                            <p style={{ fontSize: 22 }}><b>🔬 Status Zona 2</b></p>
                            <p>Local: <b>Área Leste</b></p>
                            <div className="info_menu">
                                <p>Nível de umidade........ <b>{umidade2}</b>%</p>
                                <p>Temperatura............ <b>{temperatura2}</b>°C</p>
                                <p>Fumaça............................ <b>{gas2}</b></p>
                                <p className="risk_info"><b>{risco2}</b></p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;


