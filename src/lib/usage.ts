type Usage = {
  demoGenerations: number;
};

let usage: Usage = {
  demoGenerations: 0,
};

export function canGenerate() {
  return usage.demoGenerations < 3;
}

export function registerGeneration() {
  usage.demoGenerations += 1;
}

export function remainingGenerations() {
  return Math.max(0, 3 - usage.demoGenerations);
}