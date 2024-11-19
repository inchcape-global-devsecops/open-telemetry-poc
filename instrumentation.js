const { NodeSDK } = require('@opentelemetry/sdk-node');
const { SimpleSpanProcessor, ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-base');
const { Resource } = require('@opentelemetry/resources');
const { trace, metrics } = require('@opentelemetry/api');
const { PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const {OTLPTraceExporter,} = require('@opentelemetry/exporter-trace-otlp-http');
const {OTLPMetricExporter,} = require('@opentelemetry/exporter-trace-otlp-http');


// Define resource metadata
const resource = new Resource({
  'service.name': 'dice-server',
  'service.version': '0.1.0',
});


const sdk = new NodeSDK({
  resource,
  metricReader: new PrometheusExporter({
    port: 9464,
  }),
  traceExporter: new ConsoleSpanExporter(),
  instrumentations: [getNodeAutoInstrumentations()],
});
sdk.start();
console.log('Telemetry initialized successfully.');
console.log('Prometheus metrics available at http://localhost:9464/metrics');












