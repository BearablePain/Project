type Mods = Record<string, boolean | string>

export function classNames(style: string, mods: Mods = {}, additional: string[] = []): string {
  return [
    style,
    ...additional,
    ...Object.entries(mods).reduce((acc: string[], [className, value]) => {
      if (value) {
        acc.push(className);
      } return acc;
    }, []),

  ]
    .join(' ');
}
