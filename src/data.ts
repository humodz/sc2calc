export interface Resources {
    minerals: number
    gas: number
}

const yields = {
    minerals: 58,
    mule: 225,
    gas: 61,
}

export const incomeSources = {
    minerals: resource(yields.minerals, 0),
    gas: resource(0, yields.gas),
    commandcenter: resource(16 * yields.minerals, 6 * yields.gas),
    orbital: resource(16 * yields.minerals + yields.mule, 6 * yields.gas),
    mule: resource(yields.mule, 0),
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

function resource(minerals: number, gas: number) {
    return { minerals, gas }
}

function unit(minerals: number, gas: number, time: number) {
    return {
        minerals: minerals * 60 / time,
        gas: gas * 60 / time,
        real: { minerals, gas, time }
    }
}