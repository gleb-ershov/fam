// 1xx: Informational responses
export const HTTP_STATUS_CONTINUE = { code: 100, message: "Continue" };
export const HTTP_STATUS_SWITCHING_PROTOCOLS = {
	code: 101,
	message: "Switching Protocols",
};
export const HTTP_STATUS_PROCESSING = { code: 102, message: "Processing" };

// 2xx: Successful responses
export const HTTP_STATUS_OK = { code: 200, message: "OK" };
export const HTTP_STATUS_CREATED = { code: 201, message: "Created" };
export const HTTP_STATUS_ACCEPTED = { code: 202, message: "Accepted" };
export const HTTP_STATUS_NON_AUTHORITATIVE_INFORMATION = {
	code: 203,
	message: "Non-Authoritative Information",
};
export const HTTP_STATUS_NO_CONTENT = { code: 204, message: "No Content" };
export const HTTP_STATUS_RESET_CONTENT = {
	code: 205,
	message: "Reset Content",
};
export const HTTP_STATUS_PARTIAL_CONTENT = {
	code: 206,
	message: "Partial Content",
};
export const HTTP_STATUS_MULTI_STATUS = { code: 207, message: "Multi-Status" };

// 3xx: Redirection
export const HTTP_STATUS_MULTIPLE_CHOICES = {
	code: 300,
	message: "Multiple Choices",
};
export const HTTP_STATUS_MOVED_PERMANENTLY = {
	code: 301,
	message: "Moved Permanently",
};
export const HTTP_STATUS_FOUND = { code: 302, message: "Found" };
export const HTTP_STATUS_SEE_OTHER = { code: 303, message: "See Other" };
export const HTTP_STATUS_NOT_MODIFIED = { code: 304, message: "Not Modified" };
export const HTTP_STATUS_USE_PROXY = { code: 305, message: "Use Proxy" };
export const HTTP_STATUS_TEMPORARY_REDIRECT = {
	code: 307,
	message: "Temporary Redirect",
};
export const HTTP_STATUS_PERMANENT_REDIRECT = {
	code: 308,
	message: "Permanent Redirect",
};

// 4xx: Client Errors
export const HTTP_STATUS_BAD_REQUEST = { code: 400, message: "Bad Request" };
export const HTTP_STATUS_UNAUTHORIZED = { code: 401, message: "Unauthorized" };
export const HTTP_STATUS_PAYMENT_REQUIRED = {
	code: 402,
	message: "Payment Required",
};
export const HTTP_STATUS_FORBIDDEN = { code: 403, message: "Forbidden" };
export const HTTP_STATUS_NOT_FOUND = { code: 404, message: "Not Found" };
export const HTTP_STATUS_METHOD_NOT_ALLOWED = {
	code: 405,
	message: "Method Not Allowed",
};
export const HTTP_STATUS_NOT_ACCEPTABLE = {
	code: 406,
	message: "Not Acceptable",
};
export const HTTP_STATUS_PROXY_AUTHENTICATION_REQUIRED = {
	code: 407,
	message: "Proxy Authentication Required",
};
export const HTTP_STATUS_REQUEST_TIMEOUT = {
	code: 408,
	message: "Request Timeout",
};
export const HTTP_STATUS_CONFLICT = { code: 409, message: "Conflict" };
export const HTTP_STATUS_GONE = { code: 410, message: "Gone" };
export const HTTP_STATUS_LENGTH_REQUIRED = {
	code: 411,
	message: "Length Required",
};
export const HTTP_STATUS_PRECONDITION_FAILED = {
	code: 412,
	message: "Precondition Failed",
};
export const HTTP_STATUS_PAYLOAD_TOO_LARGE = {
	code: 413,
	message: "Payload Too Large",
};
export const HTTP_STATUS_URI_TOO_LONG = { code: 414, message: "URI Too Long" };
export const HTTP_STATUS_UNSUPPORTED_MEDIA_TYPE = {
	code: 415,
	message: "Unsupported Media Type",
};
export const HTTP_STATUS_RANGE_NOT_SATISFIABLE = {
	code: 416,
	message: "Range Not Satisfiable",
};
export const HTTP_STATUS_EXPECTATION_FAILED = {
	code: 417,
	message: "Expectation Failed",
};
export const HTTP_STATUS_IM_A_TEAPOT = { code: 418, message: "I'm a teapot" }; // "418 I'm a teapot" is an April Fools' joke in RFC 2324
export const HTTP_STATUS_MISDIRECTED_REQUEST = {
	code: 421,
	message: "Misdirected Request",
};
export const HTTP_STATUS_UNPROCESSABLE_ENTITY = {
	code: 422,
	message: "Unprocessable Entity",
};
export const HTTP_STATUS_LOCKED = { code: 423, message: "Locked" };
export const HTTP_STATUS_FAILED_DEPENDENCY = {
	code: 424,
	message: "Failed Dependency",
};
export const HTTP_STATUS_TOO_EARLY = { code: 425, message: "Too Early" };
export const HTTP_STATUS_UPGRADE_REQUIRED = {
	code: 426,
	message: "Upgrade Required",
};
export const HTTP_STATUS_PRECONDITION_REQUIRED = {
	code: 428,
	message: "Precondition Required",
};
export const HTTP_STATUS_TOO_MANY_REQUESTS = {
	code: 429,
	message: "Too Many Requests",
};
export const HTTP_STATUS_REQUEST_HEADER_FIELDS_TOO_LARGE = {
	code: 431,
	message: "Request Header Fields Too Large",
};
export const HTTP_STATUS_UNAVAILABLE_FOR_LEGAL_REASONS = {
	code: 451,
	message: "Unavailable For Legal Reasons",
};

// 5xx: Server Errors
export const HTTP_STATUS_INTERNAL_SERVER_ERROR = {
	code: 500,
	message: "Internal Server Error",
};
export const HTTP_STATUS_NOT_IMPLEMENTED = {
	code: 501,
	message: "Not Implemented",
};
export const HTTP_STATUS_BAD_GATEWAY = { code: 502, message: "Bad Gateway" };
export const HTTP_STATUS_SERVICE_UNAVAILABLE = {
	code: 503,
	message: "Service Unavailable",
};
export const HTTP_STATUS_GATEWAY_TIMEOUT = {
	code: 504,
	message: "Gateway Timeout",
};
export const HTTP_STATUS_HTTP_VERSION_NOT_SUPPORTED = {
	code: 505,
	message: "HTTP Version Not Supported",
};
export const HTTP_STATUS_VARIANT_ALSO_NEGOTIATES = {
	code: 506,
	message: "Variant Also Negotiates",
};
export const HTTP_STATUS_INSUFFICIENT_STORAGE = {
	code: 507,
	message: "Insufficient Storage",
};
export const HTTP_STATUS_LOOP_DETECTED = {
	code: 508,
	message: "Loop Detected",
};
export const HTTP_STATUS_NOT_EXTENDED = { code: 510, message: "Not Extended" };
export const HTTP_STATUS_NETWORK_AUTHENTICATION_REQUIRED = {
	code: 511,
	message: "Network Authentication Required",
};