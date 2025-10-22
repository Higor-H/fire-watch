import fireWatchLogo from './assets/fire-watch-logo.svg'
import './App.css'
import { useState, useEffect } from "react";
import { connectWebSocket } from "./api/WebSocket.jsx";

function App() {
    const [online, setOnline] = useState("❌ Desconectado");
    const [umidade, setUmidade] = useState("-");
    const [temperatura, setTemperatura] = useState("-");
    const [fumaca, setFumaca] = useState("-");
    const [risco, setRisco] = useState("-");

    useEffect(() => {
        const disconnect = connectWebSocket({
            onOpen: () => setOnline("✅ Conectado"),
            onClose: () => setOnline("❌ Desconectado"),
            onMessage: (data) => {
                // Espera: { zone: 1, umidade, temperatura, fumaca, risco }
                if (data?.zone !== undefined && Number(data.zone) !== 1) return;
                if (data?.umidade !== undefined) setUmidade(data.umidade);
                if (data?.temperatura !== undefined) setTemperatura(data.temperatura);
                if (data?.fumaca !== undefined) setFumaca(data.fumaca ? "Sim" : "Não");
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
                </div>

                <div className="divRight">
                    <div className="card">
                        <div className="zone zone_1">
                            <p>🔬 Status Zona 1</p>
                            <p>Local: Plantação de soja</p>
                            <div className="info_menu">
                                <p>Nível de umidade: {umidade}</p>
                                <p>Temperatura: {temperatura}</p>
                                <p>Fumaça: {fumaca}</p>
                                <p>Risco de incêndio: {risco}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;







// import fireWatchLogo from './assets/fire-watch-logo.svg'
// import './App.css'
// import {useState, useEffect} from "react";
// import { connectWebSocket } from "./api/WebSocket.jsx";
//
// function App() {
//
//     const [online, setOnline] = useState("❌ Desconectado");
//     const [umidade, setUmidade] = useState("-");
//     const [temperatura, setTemperatura] = useState("-");
//     const [fumaca, setFumaca] = useState("-");
//     const [risco, setRisco] = useState("-");
//
//     useEffect(() => {
//         const disconnect = connectWebSocket({
//             onOpen: () => setOnline("✅ Conectado"),
//             onClose: () => setOnline("❌ Desconectado"),
//             onMessage: (data) => {
//                 // Espera: { zone: 1, umidade, temperatura, fumaca, risco }
//                 if (data?.zone !== undefined && Number(data.zone) !== 1) return;
//                 if (data?.umidade !== undefined) setUmidade(data.umidade);
//                 if (data?.temperatura !== undefined) setTemperatura(data.temperatura);
//                 if (data?.fumaca !== undefined) setFumaca(data.fumaca ? "Sim" : "Não");
//                 if (data?.risco !== undefined) setRisco(data.risco);
//             },
//         });
//         return () => disconnect?.();
//     }, []);
//
//   return (
//     <>
//       <div>
//           <img src={fireWatchLogo} className="logo react" alt="Site logo" />
//       </div>
//       <h1>Fire-Watch</h1>
//       <div className="card">
//         <p className="info-text">
//             Sua ferramenta de monitoramento de risco de incêndio florestal em tempo real.
//         </p>
//           <p className="info-text">
//              Status dos sensores:
//           </p>
//           <p className="info-text">
//               {online}
//           </p>
//
//       </div>
//       <p className="read-the-docs">
//
//       </p>
//         <div className="card_container">
//             <div className="card">
//                 <div className="zone zone_1">
//                     <p>🔬 Status Zona 1</p>
//                     <p>Local: Plantação de soja</p>
//
//                     <div className="info_menu">
//                         <p>Nivel de umidade:  {umidade}  </p>
//                         <p>temperatura:  {temperatura}  </p>
//                         <p>Fumaça:  {fumaca}  </p>
//                         <p>Risco de incendio: {risco} </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <footer>
//         <p></p>
//         </footer>
//     </>
//   )
// }
//
// export default App
