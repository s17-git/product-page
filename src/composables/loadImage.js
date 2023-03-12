export function useLoadAvatar(name) {
    return new URL(`../assets/imgs/${name}.png`, import.meta.url).href
}

export function useLoadProduct(name) {
    return new URL(`../assets/imgs/${name}.jpg`, import.meta.url).href
}

export function useLoadSvg(name) {
    return new URL(`../assets/imgs/${name}.svg`, import.meta.url).href
}

