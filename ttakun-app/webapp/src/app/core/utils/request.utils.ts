import { HEADER_ANONYMOUS } from '../services/base/headers';
import { getSession } from '../services/storage.service';

export const addAuthHeader = (request) => {
  if (!request.headers.has(HEADER_ANONYMOUS)) {
    const session = getSession();
    const token = (session) ? session.token : null;
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${ token }`
        }
      });
    }
  }

  return request;
};
