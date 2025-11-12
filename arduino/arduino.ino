#include <DHT.h>

#define TEMPERATURE 2
#define DHTTYPE DHT11

#define HUMIDITY A0

#define SMOKE_D = 4
#define SMOKE_A = A1

#define LED_RED 13
#define LED_GREEN 12
#define LED_BLUE 11

int smokeSensor = A1;
int smokeValue = 0;

int risk = 0;  // 0=Green, 1=Yellow, 2=Azul, 3=Red}

DHT dht(TEMPERATURE, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
  pinMode(LED_RED, OUTPUT);
  pinMode(LED_GREEN, OUTPUT);
  pinMode(LED_BLUE, OUTPUT);
}

void loop() {
  delay(500);

  analogWrite(LED_RED, 0);
  analogWrite(LED_GREEN, 255);
  analogWrite(LED_BLUE, 0);

  smokeValue = analogRead(smokeSensor);
  float temperature = dht.readTemperature();
  int sensorValue = analogRead(HUMIDITY);
  int newRisk = 0;

  if (HUMIDITY >= 60) {
    newRisk = 0;
    Serial.print("newRisk: ");Serial.println(newRisk);
  }
  else if ((temperature >= 30) && (temperature < 31) && (HUMIDITY < 60)) {
    newRisk = 1;
    Serial.print("newRisk: ");Serial.println(newRisk);
  }
  else if ((temperature >= 31) && (temperature < 32) && (HUMIDITY < 60)) {
    newRisk = 2;
    Serial.print("newRisk: ");Serial.println(newRisk);
  }
  else if ((temperature >= 32) && (HUMIDITY < 60) && (smokeValue >= 300)) {
    newRisk = 3;

    Serial.print("newRisk: ");Serial.println(newRisk);
  }

  risk = newRisk;

  Serial.print(" Risk: ");Serial.println(risk);
  Serial.print(" Smoke: "); Serial.println(smokeValue);
  Serial.print(" Celsius: "), Serial.println(temperature);
  Serial.print(" Humidity: ");Serial.println(readSensor());

  delay(500);
}

int readSensor() {
    int sensorValue = analogRead(HUMIDITY);
    if (sensorValue < 80) {
      sensorValue = 80;
    }
    if (sensorValue > 150) {
      sensorValue = 150;
    }
    int outputValue = map(sensorValue, 80, 150, 100, 0);
    return outputValue;
  }