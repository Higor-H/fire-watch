import { useEffect, useState, useRef } from 'react';




const useWebSocket = (url) => {
    const [message, setMessage] = useState(null);
    const ws = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket(url);

        ws.current.onmessage = (event) => {
            setMessage(event.data);
        };

        ws.current.onclose = () => {
            console.log('WebSocket Disconnected');
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };

        return () => {
            ws.current.close();
        };
    }, [url]);

    const sendMessage = (data) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(data);
        }
    };

    return { message, sendMessage };
};

export default useWebSocket;