const {
  SEMATTRS_CODE_FUNCTION, 
  SEMATTRS_CODE_FILEPATH, 
 } = require('@opentelemetry/semantic-conventions');
const express = require('express');
const {rollTheDice} = require('./dice.js');
const { trace, metrics} = require('@opentelemetry/api');

//initialize tracesz
const tracer = trace.getTracer('dice-server', '0.1.0');
const meter = metrics.getMeter('dice-server', '0.1.0');

const PORT = parseInt(process.env.PORT || '8080');
const app = express();


app.get('/rolldice', (req, res) => {
    const rolls = req.query.rolls ? parseInt(req.query.rolls.toString()) : NaN;
    if (isNaN(rolls)) {
      res
        .status(400)
        .send("Request parameter 'rolls' is missing or not a number.");
      return;
    }
    res.send(JSON.stringify(rollTheDice(rolls, 1, 6)));
  });

app.listen(PORT, () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});

//using histograms

app.get('/', (_req, _res) => {
  const histogram = meter.createHistogram('task.duration');
  const startTime = new Date().getTime();

  // do some work in an API call

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;

  // Record the duration of the task operation
  histogram.record(executionTime);
});



