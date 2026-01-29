export const races = ['terran', 'zerg', 'protoss'] as const
export type Race = (typeof races)[number]

export type ResourceName = 'minerals' | 'gas' | 'larva'

export interface Resources {
  minerals: number
  gas: number
  larva: number
  real?: {
    minerals: number
    gas: number
    larva: number
    time: number
  }
}

export type ResourcesToggle = Record<ResourceName, boolean>

const yields = {
  minerals: 58,
  oversaturated: 27,
  richminerals: 83,
  mule: 225,
  gas: 61,
  richgas: 122,
  hatchery: 60 / 11,
  queen: (3 * 60) / 29,
}

export const resourceTypesByRace: Record<Race, ResourcesToggle> = {
  terran: { minerals: true, gas: true, larva: false },
  zerg: { minerals: true, gas: true, larva: true },
  protoss: { minerals: true, gas: true, larva: false },
}

export const incomeSources = {
  minerals: resource(yields.minerals, 0),
  // oversaturated: resource(yields.oversaturated, 0),
  richminerals: resource(yields.richminerals, 0),
  gas: resource(0, yields.gas),
  richgas: resource(0, yields.richgas),
}

const terranIncomeSources = {
  ...incomeSources,
  mule: resource(yields.mule, 0),
}

const zergIncomeSources = {
  ...incomeSources,
  hatchery: resource(0, 0, yields.hatchery),
  queen: resource(0, 0, yields.queen),
}

const protossIncomeSources = incomeSources

export const incomeSourcesByRace = {
  terran: terranIncomeSources,
  zerg: zergIncomeSources,
  protoss: protossIncomeSources,
}

export const terranUnits = {
  scv: unit(50, 0, 12),

  marine: unit(50, 0, 18),
  reaper: unit(50, 50, 32),
  marauder: unit(100, 25, 21),

  ghost: unit(150, 125, 29),

  hellion: unit(100, 0, 21),
  widowmine: unit(75, 25, 21),
  cyclone: unit(150, 100, 32),
  siegetank: unit(150, 125, 32),

  viking: unit(125, 75, 30),
  medivac: unit(100, 100, 30),
  liberator: unit(150, 125, 43),
  raven: unit(100, 150, 34),
  banshee: unit(150, 100, 43),

  thor: unit(300, 200, 43),
  battlecruiser: unit(400, 300, 64),
}

export const zergUnits = {
  drone: unit(50, 0, 12, 1),

  overlord: unit(100, 0, 18, 1),
  overseer: unit(50, 50, 12),

  zergling: unit(25, 0, 17, 1),
  baneling: unit(25, 25, 14),

  queen: unit(175, 0, 36),

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

export const protossUnits = {
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

export const unitsByRace = {
  terran: terranUnits,
  zerg: zergUnits,
  protoss: protossUnits,
}

function resource(minerals: number, gas: number, larva = 0) {
  return { minerals, gas, larva }
}

function unit(minerals: number, gas: number, time: number, larva = 0) {
  return {
    minerals: (minerals * 60) / time,
    gas: (gas * 60) / time,
    larva: (larva * 60) / time,
    real: { minerals, gas, time, larva },
  }
}
