export type TMods = Record<string, boolean | string | undefined>

export function classNames(style: string, mods: TMods = {}, additional: (string | undefined)[] = []): string {
  return [
    style,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .reduce((acc: string[], [className, value]) => {
        if (value) {
          acc.push(className);
        }
        return acc;
      }, []),
  ]
    .join(' ');
}
