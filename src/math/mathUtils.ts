export const quartile = (arr: number[], quartile: number): number => {
    const values = arr.slice().sort();
    quartile = quartile / 100;
    const quartilePosition = ((values.length) - 1) * quartile;
    const roundedPosition = Math.floor(quartilePosition);
    const roundedValue = values.at(roundedPosition);
    const closeRoundedValue = values.at(roundedPosition + 1);
    return roundedValue
        ? closeRoundedValue
            ? roundedValue + (quartilePosition - roundedPosition) * (closeRoundedValue - roundedValue)
            : roundedValue
        : 0;
};
export const floatWithDecimal = (value: number): number => Math.round((value + Number.EPSILON) * 100) / 100