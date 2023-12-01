export const parseBoolean = (value: string) => Boolean(JSON.parse(value));

export const parseStringToBoolean = (value: string) => (value === 'true');
