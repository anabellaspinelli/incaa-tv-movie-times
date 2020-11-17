type Duck = {
    isDuck: true
    name: string
    lastName?: string
} & WithPowerLevel & WithSize

type Chicken = {
    isChicken: true
} & WithSize

type Bird = Duck | Chicken

type WithPowerLevel = {
    powerLevel: number
}

type WithSize = {
    size: Size
}

type Size = 'xs' | 's' | 'm' | 'l' | 'xl'

const pickOutfit = (bird: Bird): string => {
    switch (bird.size) {
        case 'xs':
            return 'tiny t sheert'
        case 's':
            return 'smol t sheert'
        case 'm':
            return 'regoolar t sheert'
        case 'l':
            return 'larsh t sheert'
        case 'xl':
            return 'eggstra larsh t sheert'            
    }
}

const quack = (duck: Duck) => {
    console.log(`My quack is: ${duck.name}`)
}

const duckToUltraDuck = (duck: Duck):Duck => {
    return duck
}

const realDuck: Duck = {
    isDuck: true,
    name: 'Cassandra',
    lastName: 'McWilliams',
    powerLevel: 9,
    size: 'm'
}

const duckImpersonator = {
    isDuck: true,
    name: 'Ducky',
    lastName: 'McDuck Face',
    secretIdentity: 'chicken',
    powerLevel: 4
}

quack(realDuck)
quack({name: 'Martí', isDuck: true, powerLevel: 10})
// quack(duckImpersonator)

duckToUltraDuck(duckImpersonator)

const add = (a: number, b: number) => {
    return a + b
}

add(1, 2)