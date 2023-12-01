import { HttpResponse } from '@angular/common/http';
import { getCurrentMillis, getMillis } from './date.utils';

const DATE = 'Date';

export const getMillisFromResponse = <T> (response: HttpResponse<T>) => getMillis(response.headers.get(DATE));

export const getServerDateDiff = <T> (response: HttpResponse<T>) => getCurrentMillis() - getMillisFromResponse(response);

export const isUnauthorized = <T> (error: HttpResponse<T>) => error.status === 401;
