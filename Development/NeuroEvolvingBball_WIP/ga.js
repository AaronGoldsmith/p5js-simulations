

function nextGeneration() {
  console.log('next generation');
  calculateFitness();
  for (let i = 0; i < TOTAL; i++) {
    bballs[i] = pickOne();
  }
  savedBalls = [];
}

function pickOne() {
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r = r - savedBalls[index].fitness;
    index++;
  }
  index--;
  let ball = savedBalls[index];
  let child = new Basketball(ball.brain);
  child.mutate();
  return child;
}

function calculateFitness() {
  let sum = 0;
  for (let ball of savedBalls) {
    sum += ball.score;
  }
  for (let ball of savedBalls) {
    ball.fitness = ball.score / sum;
    console.log(ball.fitness)
  }
}
