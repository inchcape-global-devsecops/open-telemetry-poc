
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { SimpleSpanProcessor, ConsoleSpanExporter, BatchSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const {ZipkinExporter} = require('@opentelemetry/exporter-zipkin');




const prometheusExporter = new PrometheusExporter({
  port: process.env.OTEL_PROMETHEUS_PORT || 9464,
}, () => {
  console.log('Prometheus scrape endpoint: http://localhost:9464/metrics');
});


//Zipkin
const zipkinExporter = new ZipkinExporter({
  url: process.env.OTEL_EXPORTER_ZIPKIN_ENDPOINT,
  serviceName: 'dice-server'
});


// Configure the NodeSDK
const sdk = new NodeSDK({
  spanProcessor: new SimpleSpanProcessor(zipkinExporter), // For spans
  metricReader: prometheusExporter,
  traceExporter: zipkinExporter,
  instrumentations: [getNodeAutoInstrumentations()],
});


sdk.start();
console.log('Telemetry initialized successfully.');
console.log('Prometheus metrics available at http://localhost:9464/metrics');
