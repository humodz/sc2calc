export const races = ['terran', 'zerg', 'protoss'] as const
export type Race = (typeof races)[number]

export type ResourceName = 'minerals' | 'gas' | 'larva'

export interface Resources {
  minerals: number
  gas: number
  larva: number
}

export interface Unit extends Resources {
  real: Resources & { time: number }
}

export type ResourcesToggle = Record<ResourceName, boolean>

export const resourceTypesByRace: Record<Race, ResourcesToggle> = {
  terran: { minerals: true, gas: true, larva: false },
  zerg: { minerals: true, gas: true, larva: true },
  protoss: { minerals: true, gas: true, larva: false },
}

interface ResourceNode {
  nodes: number
  workers: number
}
export interface IncomeSources {
  minerals: ResourceNode
  gas: ResourceNode
  richminerals: ResourceNode
  richgas: ResourceNode
  mule: { mule: number }
  larva: { hatchery: number; queen: number }
}

const normalResource = ['nodes', 'workers']

const incomeSources: Record<string, string[]> = {
  minerals: normalResource,
  gas: normalResource,
  richminerals: normalResource,
  richgas: normalResource,
}

const terranIncomeSources: Record<string, string[]> = {
  ...incomeSources,
  mule: ['mule'],
}

const zergIncomeSources: Record<string, string[]> = {
  ...incomeSources,
  larva: ['hatchery', 'queen'],
}

const protossIncomeSources = incomeSources

export const terranUnits: Record<string, Unit> = {
  scv: unit(50, 0, 12),

  marine: unit(50, 0, 18),
  reaper: unit(50, 50, 32),
  marauder: unit(100, 25, 21),
  ghost: unit(150, 125, 29),

  hellion: unit(100, 0, 21),
  widowmine: unit(75, 25, 21),
  cyclone: unit(150, 100, 32),
  siegetank: unit(150, 125, 32),
  thor: unit(300, 200, 43),

  viking: unit(125, 75, 30),
  medivac: unit(100, 100, 30),
  liberator: unit(150, 125, 43),
  raven: unit(100, 150, 34),
  banshee: unit(150, 100, 43),
  battlecruiser: unit(400, 300, 64),
}

export const zergUnits: Record<string, Unit> = {
  drone: unit(50, 0, 12, 1),
  queen: unit(175, 0, 36),

  overlord: unit(100, 0, 18, 1),
  overseer: unit(50, 50, 12),

  zergling: unit(50, 0, 17, 1),
  baneling: unit(25, 25, 14),

  roach: unit(75, 25, 19, 1),
  ravager: unit(25, 75, 12),

  hydralisk: unit(100, 50, 24, 1),
  lurker: unit(50, 100, 18),

  mutalisk: unit(100, 100, 24, 1),
  corruptor: unit(150, 100, 29, 1),
  broodlord: unit(150, 150, 24),

  infestor: unit(100, 150, 36, 1),
  swarmhost: unit(100, 75, 29, 1),
  viper: unit(100, 200, 29, 1),
  ultralisk: unit(275, 200, 39, 1),
}

export const protossUnits: Record<string, Unit> = {
  probe: unit(50, 0, 12),

  zealot: unit(100, 0, 27),
  adept: unit(100, 25, 30),
  stalker: unit(125, 50, 27),
  sentry: unit(50, 100, 23),
  hightemplar: unit(50, 150, 39),
  darktemplar: unit(125, 125, 39),

  observer: unit(25, 75, 17.9),
  warpprism: unit(250, 0, 36),
  immortal: unit(250, 100, 39),
  colossus: unit(300, 200, 54),
  disruptor: unit(150, 150, 36),

  phoenix: unit(150, 100, 25),
  oracle: unit(150, 150, 37),
  voidray: unit(250, 150, 43),
  tempest: unit(250, 175, 43),
  carrier: unit(350, 250, 64),
  mothership: unit(400, 400, 89),
}

export const dataByRace = {
  terran: {
    resources: resourceTypesByRace.terran,
    incomeSources: terranIncomeSources,
    units: terranUnits,
  },
  zerg: {
    resources: resourceTypesByRace.zerg,
    incomeSources: zergIncomeSources,
    units: zergUnits,
  },
  protoss: {
    resources: resourceTypesByRace.protoss,
    incomeSources: protossIncomeSources,
    units: protossUnits,
  },
}

function unit(minerals: number, gas: number, time: number, larva = 0) {
  return {
    minerals: (minerals * 60) / time,
    gas: (gas * 60) / time,
    larva: (larva * 60) / time,
    real: { minerals, gas, time, larva },
  }
}
