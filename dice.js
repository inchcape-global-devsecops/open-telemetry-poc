/*dice.js*/

const {trace, metrics } = require('@opentelemetry/api');
const tracer = trace.getTracer('dice-lib');
const meter = metrics.getMeter('dice-lib');

 //using counter for metrics: measure a non-negative => we can use to count how often the dice has been rolled
//contador de lanzamiento de los datos
const counter = meter.createCounter('dice_rolls_total', {
  description: 'total number of launches'
});

//tiempos de respuesta en histograma
const histogram = meter.createHistogram('dice_roll_duration', {
  description: 'duration of the dice roll(ms)'
});

//lanzamiento de un dado
function rollOnce(min, max) {
  //nested spans: creates a child span for each roll that has parentspan's id as their parent ID
  return tracer.startActiveSpan(`rollOnce:$(i)`, (span) => {
    const result = Math.floor(Math.random() * (max - min + 1) + min);
    span.setAttribute('dicelib.rolled', result.toString());
    span.end();
    return result;
  })
  }
  
  //lanzar dados
  function rollTheDice(rolls, min, max) {

    //create a span. A span must be closed
    return tracer.startActiveSpan('rollTheDice', {attributes: {'dicelib.rolls': rolls.toString() } },
     (span) => {
      const result = [];
      const startTime = new Date().getTime();
      for (let i = 0; i < rolls; i++) {
        result.push(rollOnce(min, max));
      }
      const endTime = new Date().getTime();
      const duration =  endTime - startTime;
      histogram.record(duration);
      counter.add(rolls);
      span.end();
      return result;
    });
  }
  
  //get the current or active span
  const activeSpan = trace.getActiveSpan();

  module.exports = { rollTheDice };