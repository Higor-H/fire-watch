export function connectWebSocket2({ onOpen, onMessage, url } = {}) {
  const wsUrl = url || (import.meta?.env?.VITE_WS_URL) || "ws://nanicowwii:7777/ws";
  const ws = new WebSocket(wsUrl);

  ws.onopen = () => {
     onOpen();
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data)
        if (onMessage) onMessage(data)
    } catch {
      console.error("WebSocket error: " + event.data);
    }
  };


  return () => {
    try { ws.close(); } catch {
        console.error("WebSocket closed with error");
    }
  };
}


