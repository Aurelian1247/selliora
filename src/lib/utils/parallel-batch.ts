export async function parallelBatch<T, R>(
  items: T[],
  worker: (item: T) => Promise<R>,
  concurrency = 5
): Promise<R[]> {
  const results: R[] = [];
  const queue = [...items];

  const workers = new Array(concurrency).fill(null).map(async () => {
    while (queue.length) {
      const item = queue.shift();
      if (!item) return;
      const result = await worker(item);
      results.push(result);
    }
  });

  await Promise.all(workers);

  return results;
}