export const MESSAGE = 'Router error';

export class RouteError extends Error {
  constructor() {
    super(MESSAGE);
  }
}
