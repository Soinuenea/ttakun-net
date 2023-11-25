import { environment } from '../../../environments/environment';
import { RouteError } from '../error/route-error';

export const routerErrorHandler = (error) => {
  if (environment.printConsoleError) {
    console.error(error);
  }

  throw new RouteError();
};
