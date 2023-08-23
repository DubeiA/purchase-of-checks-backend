const messageErrorList = {
  400: "Bad Request",
  401: "Not authorized",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
};

type HttpStatus = 400 | 401 | 403 | 404 | 409;

export const HttpError = (status: HttpStatus, customMessage?: any) => {
  const message = customMessage || messageErrorList[status];
  const error = new Error(message);
  (error as any).status = status;

  return error;
};
