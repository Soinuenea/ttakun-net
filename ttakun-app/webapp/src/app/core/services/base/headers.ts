import { HttpHeaders } from '@angular/common/http';

export const HEADER_ANONYMOUS = 'Anonymous';

export const HEADER_AVOID_ERROR_HANDLING = 'Avoid-Error-Handling';

export const HEADER_ERROR_HANDLING = 'Error-Handling';

export const HEADER_PENDING_BLOCKING = 'Blocking';

export const HEADER_PENDING_NO_BLOCKING = 'No-Blocking';

export const HEADER_ERROR_PREFIX = 'Error-Prefix';

export const getAnonymousHeader = () => new HttpHeaders().set(HEADER_ANONYMOUS, 'true');

export const getAvoidErrorHandlingHeader = () => new HttpHeaders().set(HEADER_AVOID_ERROR_HANDLING, 'true');

export const getErrorHandlingHeader = () => new HttpHeaders().set(HEADER_ERROR_HANDLING, 'true');

export const getErrorPrefixHeader = (prefix: string) => new HttpHeaders().set(HEADER_ERROR_PREFIX, prefix);

export const getAnonymousOptions = () => ({ headers: getAnonymousHeader() });

export const getAvoidErrorHandlingOptions = () => ({ headers: getAvoidErrorHandlingHeader() });

export const getErrorHandlingOptions = () => ({ headers: getErrorHandlingHeader() });

export const getErrorPrefixOptions = (prefix: string) => ({ headers: getErrorPrefixHeader(prefix) });
