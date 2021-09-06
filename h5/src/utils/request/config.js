// Content-Type
export const CONTENT_TYPE = {
  JSON: "application/json;charset=UTF-8",
  // FORM: "application/x-www-form-urlencoded; charset=UTF-8",
  FORM: `multipart/form-data; boundary=<calculated when request is sent>`,
};

// 请求方
export const REQUEST_METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

// HTTP状态码
export const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

export const BASE_URL = "http://api";
