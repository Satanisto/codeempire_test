export function partition(list, separators = 2) {
  if (!Array.isArray(list)) throw TypeError();

  separators = Number(separators);

  if (isNaN(separators)) throw TypeError();

  list.sort((left, right) => right - left);

  const heaps = Array.from(Array(separators), () => []);
  const sums = Array.from(Array(separators), () => 0);

  list.forEach(val => {
    let min_index = null;

    sums.reduce(
      (prev, curr, index) =>
        Number(curr) < Number(prev) ? ((min_index = index), curr) : prev,
      Number.POSITIVE_INFINITY
    );

    heaps[min_index].push(val);
    sums[min_index] += Number(val);
  });

  return heaps;
}

export default partition;
