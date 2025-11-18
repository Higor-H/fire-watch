// src/components/Dash.jsx
import React, { useEffect, useState } from "react";
import "./Dash.css";
import { Client } from "@stomp/stompjs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Dash() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const client = new Client({
            brokerURL: "wss://jaragua.lmq.cloudamqp.com:443/ws",
            connectHeaders: {
                login: "olwzrmms",
                passcode: "gN9IrwdQnueRM96S9lyNzC-WntXi4y1-"
            },
            onConnect: () => {
                console.log("✅ Conectado ao RabbitMQ via STOMP/WebSocket");
                client.subscribe("/queue/zona_1", (msg) => handleMessage(msg));
                client.subscribe("/queue/zona_2", (msg) => handleMessage(msg));
            },
            debug: (str) => console.log(str),
            reconnectDelay: 5000,
        });

        function handleMessage(message) {
            try {
                const parsed = JSON.parse(message.body);
                const entry = {
                    ...parsed,
                    time: new Date(parsed.timestamp || Date.now()).toLocaleTimeString(),
                };
                setData((prev) => [...prev, entry]);
            } catch (e) {
                console.error("Erro ao processar mensagem:", e);
            }
        }

        client.activate();

        return () => client.deactivate();
    }, []);

    return (
        <div className="dash-container">
            <h1>🔥 Fire Watch Dashboard</h1>
            <p className="subtitle">Monitoramento em tempo real via RabbitMQ (WebSocket)</p>

            <div className="charts-container">
                <div className="chart-card">
                    <h2>Temperatura (°C)</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="temperatura" stroke="#ff4c4c" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h2>Umidade (%)</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="umidade" stroke="#4c9bff" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h2>Gás (ppm)</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="gas" stroke="#ffa14c" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="table-container">
                <h2>Últimos Registros</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Zona</th>
                        <th>Temperatura</th>
                        <th>Umidade</th>
                        <th>Gás</th>
                        <th>Risco</th>
                        <th>Horário</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.slice(-10).reverse().map((item, i) => (
                        <tr key={i}>
                            <td>{item.zona}</td>
                            <td>{item.temperatura}</td>
                            <td>{item.umidade}</td>
                            <td>{item.gas}</td>
                            <td>{item.risco}</td>
                            <td>{item.time}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
