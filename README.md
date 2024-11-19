Run app : node --require ./insteumentation.js app.js

run prometheus container: docker run --rm -v ${PWD}/prometheus.yml:/prometheus/prometheus.yml -p 9090:9090 prom/prometheus --enable-feature=otlp-write-receive

run grafana container: docker run -d -p 3000:3000 --name=grafana -v grafana-storage:/var/lib/grafana grafana/grafana