/*
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { SimpleSpanProcessor, ConsoleSpanExporter, BatchSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { Resource } = require('@opentelemetry/resources');
const { trace, metrics, diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
const { PeriodicExportingMetricReader, MeterProvider } = require('@opentelemetry/sdk-metrics');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const {ZipkinExporter} = require('@opentelemetry/exporter-zipkin');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

// Define resource metadata
const resource = new Resource({
  'service.name': 'dice-server',
  'service.version': '0.1.0',
});

const prometheusExporter = new PrometheusExporter({
  endpoint: '/metrics',
  port: 9464,
}, () => {
  console.log('Prometheus scrape endpoint: http://localhost:9464/metrics');
});

const meterProvider = new MeterProvider({
  resource,
});

meterProvider.addMetricReader(
  prometheusExporter
);

metrics.setGlobalMeterProvider(meterProvider);

console.log(prometheusExporter); // Verifica que sea una instancia válida


//Zipkin
const zipkinExporter = new ZipkinExporter({
  serviceName: 'dice-server',
  url: 'http://localhost:9411/api/v2/spans',
});

const tracerProvider = new NodeTracerProvider({
  spanProcessors: [new BatchSpanProcessor(zipkinExporter)]
});
// Configure the NodeSDK
const sdk = new NodeSDK({
  resource,
  spanProcessor: new SimpleSpanProcessor(zipkinExporter), // For spans
  traceExporter: zipkinExporter,
  instrumentations: [getNodeAutoInstrumentations()],
});


sdk.start();
console.log('Telemetry initialized successfully.');
console.log('Prometheus metrics available at http://localhost:9464/metrics');
*/