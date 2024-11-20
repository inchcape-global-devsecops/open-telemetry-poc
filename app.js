
const express = require('express');
const {rollTheDice} = require('./dice.js');
const { trace, metrics} = require('@opentelemetry/api');

const tracer = trace.getTracer('dice-server', '0.1.0');
const meter = metrics.getMeter('dice-server', '0.1.0');

const requestCounter = meter.createCounter('http_request_total', {
  description: 'Total number of HTTP requests received'
})

const PORT = parseInt(process.env.PORT || '8080');
const app = express();


//path para lanzar dados
app.get('/rolldice', (req, res) => {
  const span = tracer.startSpan('http.request');
    const rolls = parseInt(req.query.rolls || '1', 10);
    if (isNaN(rolls)) {
      res
        .status(400)
        .send("Request parameter 'rolls' is missing or not a number.");
      return;
    }

    requestCounter.add(1, {route: '/rolldice' }); //incrementar metrica
    res.send(JSON.stringify(rollTheDice(rolls, 1, 6)));

    span.setAttribute('http.route', "/rolldice");
    span.setAttribute('http.status_code', 200);

    span.end();

  });

//using histograms

app.get('/', (_req, _res) => {
  const histogram = meter.createHistogram('api_response_time', {
    description: 'api response time (ms)' 
  });
  const startTime = new Date().getTime();
  setTimeout(()=> {
    const endTime = new Date().getTime();
    console.log(`startTime (ms): ${startTime}`);
    const executionTime = endTime - startTime;
    histogram.record(executionTime); // registra duracion
    _res.send(`Completed task: ${executionTime} ms.`);
  }, Math.random() * 20000);
});

app.listen(PORT, () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});


