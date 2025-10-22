🔥 FireWatch — Sistema de Monitoramento Inteligente de Incêndios
📘 Sumário Executivo

O FireWatch é um sistema IoT desenvolvido para monitorar e prever incêndios por meio da coleta e análise de dados ambientais. O dispositivo utiliza sensores de umidade, temperatura e fumaça conectados a uma Raspberry Pi e um Arduino, enviando informações em tempo real para uma aplicação web. O objetivo é detectar precocemente possíveis focos de incêndio, prevenindo danos ambientais, materiais e humanos.
| Integrante         | Matrícula | Função                                        |
| ------------------ | --------- | --------------------------------------------- |
| Enzo Gambatto      | 1134927   | Integração Raspberry + Arduino / Documentação |
| Maria Chehade      | 1134607   | Hardware Arduino                              |
| Higor Milani       | 1135828   | Frontend                                      |
| Matheus Durante    | 1134843   | Código Arduino                                |
| Guilherme Oliveira | 1120756   | Código Arduino / Integração                   |

🎯 Objetivos
Objetivo Geral

Prevenir e reduzir os danos causados por incêndios em diferentes ambientes — urbanos, rurais, industriais e naturais — por meio de um sistema inteligente de detecção antecipada.

Objetivos Específicos

Monitorar continuamente a umidade do solo e do ar, além da presença de fumaça;

Enviar os dados coletados para um sistema digital em tempo real;

Emitir alertas automáticos em caso de risco detectado;

Testar e validar o funcionamento do protótipo (MVP).

⚙️ Descrição do Produto Final

O FireWatch será um dispositivo inteligente de monitoramento ambiental que utiliza sensores para coletar informações do solo e do ar, detectando indícios de incêndios. Os dados são processados e exibidos em uma interface digital que alerta o usuário sobre potenciais riscos.
A versão ideal incluirá:

Comunicação via rede sem fio;

Alertas automatizados (notificações);

Dashboard completo de análise em tempo real.

🧩 MVP (Protótipo Desenvolvido)

O MVP consiste em uma versão simplificada e funcional do sistema, equipada com:

Sensor de umidade do solo

Sensor de umidade e temperatura (DHT11)

Sensor de fumaça (MQ-2)

Microcontrolador Arduino conectado à Raspberry Pi

Sistema backend em Flask e banco de dados SQLite

Essa versão tem como foco validar a precisão das medições e a confiabilidade do envio de alertas.

💡 Problema e Solução

Os incêndios representam um grave risco ambiental e econômico. O FireWatch busca detectar incêndios antes que se espalhem, monitorando variáveis ambientais críticas e identificando padrões de risco.
A solução oferece:

Monitoramento contínuo;

Detecção precoce;

Comunicação entre hardware e software;

Possibilidade de expansão para grandes áreas.

🔗 Projetos Similares e Diferenciais

CNN Brasil – Tecnologia de sensores pode prever incêndios florestais

Saneamento Ambiental – Drones com sensores de gases

🔸 Diferencial do FireWatch: detecção adaptável a grandes áreas, como regiões florestais extensas, superando as limitações de projetos que operam apenas em zonas urbanas.

| Item                        | Quantidade | Preço Unitário (R$) | Total (R$)   |
| --------------------------- | ---------- | ------------------- | ------------ |
| Arduino                     | 1          | 36,00               | 36,00        |
| Sensor de gás/fumaça MQ-2   | 1          | 22,00               | 22,00        |
| Sensor DHT11 (umidade/ar)   | 1          | 15,00               | 15,00        |
| Sensor de umidade do solo   | 1          | 11,00               | 11,00        |
| Raspberry Pi 4 (8GB)        | 1          | 900,00              | 900,00       |
| LED RGB                     | 1          | 0,50                | 0,50         |
| Resistores 1k               | 3          | 0,15                | 0,45         |
| Kit Jumpers                 | 1          | 20,00               | 20,00        |
| Cabos (Arduino + Raspberry) | 2          | 20,00               | 40,00        |
| **Total Estimado (MVP)**    | —          | —                   | **1.044,95** |

⚠️ Principais Riscos

Necessidade de dois Arduinos para cobrir áreas maiores;

Limitação de sensores disponíveis no laboratório;

Recursos financeiros e de tempo reduzidos para o desenvolvimento completo;

Dependência da estabilidade da conexão entre dispositivos.

🧠 Tecnologias Utilizadas

Hardware: Arduino, Raspberry Pi 4

Sensores: DHT11, MQ-2, Sensor de umidade do solo

Software: Python (Flask), SQLite, HTML/CSS/JS

Comunicação: Serial / WebSocket

Prototipagem: Tinkercad
