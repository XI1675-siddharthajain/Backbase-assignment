import { HttpErrorResponse } from '@angular/common/http';

export const MOCKED_HTTP_ERROR_RESPONSE: HttpErrorResponse = new HttpErrorResponse({
  error: 'Some Error',
  status: 404,
  statusText: 'Not Found',
});
