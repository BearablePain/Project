type Mods = Record<string, boolean | string>

export function classNames(cls: string, mods: Mods, additional: string[]): string {
    return [
        cls,
        ...additional,
        ...Object.entries(mods).reduce((acc: string[], [className, value ]) => {
            if(Boolean(value)) {
             acc.push(className)
        }return acc}, [])

    ]
        .join(' ');
}


