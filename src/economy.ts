// https://liquipedia.net/starcraft2/Resources#Mining_Rates
// https://liquipedia.net/starcraft2/Larva_(Legacy_of_the_Void)

const yields = {
  minerals: [58, 115, 143],
  richminerals: [83, 165, 200],
  gas: [62, 123, 163],
  richgas: [2 * 61, 2 * 123, 2 * 163],
  mule: 225,
  hatchery: 60 / 11,
  queen: (3 * 60) / 29,
}

export function calculateIncome(
  workers: Record<string, Record<string, number>>,
) {
  const minerals = calc(
    yields.minerals,
    workers.minerals.workers,
    workers.minerals.nodes,
  )

  const richminerals = calc(
    yields.richminerals,
    workers.richminerals.workers,
    workers.richminerals.nodes,
  )

  const gas = calc(yields.gas, workers.gas.workers, workers.gas.nodes)

  const richgas = calc(
    yields.richgas,
    workers.richgas.workers,
    workers.richgas.nodes,
  )

  const maxMule = workers.minerals.nodes + workers.richminerals.nodes
  const mule = yields.mule * clamp(workers.mule?.mule ?? 0, 0, maxMule)
  const hatchery = yields.hatchery * Math.max(0, workers.larva?.hatchery ?? 0)
  const queen =
    yields.queen *
    clamp(workers.larva?.queen ?? 0, 0, workers.larva?.hatchery ?? 0)

  return {
    minerals: minerals + richminerals + mule,
    gas: gas + richgas,
    larva: hatchery + queen,
  }
}

function calc(yields: number[], workers: number, nodes: number) {
  return diffs(yields)
    .map((v, i) => v * clamp(workers - i * nodes, 0, nodes))
    .reduce(sum, 0)
}

const diffs = (values: number[]) =>
  values.map((v, i) => (i === 0 ? v : v - values[i - 1]))

const sum = (a: number, b: number) => a + b

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v))
