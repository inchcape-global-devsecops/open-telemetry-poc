
PASOS PARA REPLICAR LA POC:

run prometheus container: docker run --rm -d --name prometheus -v ${PWD}/prometheus.yml:/prometheus/prometheus.yml -p 9090:9090 prom/prometheus --enable-feature=otlp-write-receive

run grafana container: docker run -d -p 3000:3000 --name=grafana -v grafana-storage:/var/lib/grafana grafana/grafana

para trazas: docker run --rm -d -p 9411:9411 --name zipkin openzipkin/zipkin

docker network create monitoring-network

docker network connect monitoring-network grafana
docker network connect monitoring-network prometheus
docker network connect monitoring-network zipkin

npm install

Run app : node --require ./instrumentation.js app.js or modify package.json: scripts: "start": "node -r ./instrumentation.js app.js"


ZERO CODE autoinstrumentation:


crear un archivo .env:

OTEL_SERVICE_NNAME=dice-server
OTEL_TRACES_EXPORTER=zipkin
OTEL_EXPORTER_ZIPKIN_ENDPOINT=http://localhost:9411/api/v2/spans
OTEL_METRICS_EXPORTER=prometheus
OTEL_EXPORTER_PROMETHEUS_ENDPOINT=9464
OTEL_LOG_LEVEL=debug


install npm install dotenv

run npm start
