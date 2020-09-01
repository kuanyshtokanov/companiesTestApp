import fetch from 'isomorphic-fetch';

export function setAuthToken(token) {
  sessionStorage.setItem('token', token);
}

export function getAuthToken() {
  return sessionStorage.getItem('token');
}

export function setRefreshToken(token) {
  sessionStorage.setItem('refresh', token);
}

export function get(resource, params, headers = {}) {
  return rest('GET', resource, params, undefined, headers);
}

export function post(resource, body = {}, qs, headers = {}) {
  return rest('POST', resource, qs, body, headers);
}

export function put(resource, body = {}, qs, headers = {}) {
  return rest('PUT', resource, qs, body, headers);
}

export function remove(resource, body = {}, qs, headers = {}) {
  return rest('DELETE', resource, qs, body, headers);
}

function formatParam(param) {
  function pad2(n) {
    if (n < 10) {
      return '0' + n;
    }

    return '' + n;
  }

  if (param instanceof Date) {
    // 2007-12-03 is backend accepted format, see JacksonConfiguration
    return `${param.getFullYear()}-${pad2(1 + param.getMonth())}-${pad2(
      param.getDate()
    )}`;
  }

  return '' + param;
}

async function parseResponse(response) {
  const contentType = response.headers.get('content-type');

  const text = await response.text();

  if (!contentType || contentType.indexOf('application/json') === -1) {
    return text;
  }

  // convert LocalDate, LocalDateTime to js Date object
  return JSON.parse(text, (key, val) => {
    if (typeof val === 'string') {
      // LocalDateTime
      if (/^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ$/.test(val)) {
        return new Date(val);
      }

      // LocalDate
      if (/^\d\d\d\d-\d\d-\d\d$/.test(val)) {
        return new Date(val);
      }
    }

    return val;
  });
}

function renderQueryString(qs) {
  if (!qs) {
    return '';
  }

  let r = '';

  Object.keys(qs).forEach((key) => {
    if (qs[key] == null) {
      return;
    }

    if (r !== '') {
      r += '&';
    }

    r += `${key}=${encodeURIComponent(formatParam(qs[key]))}`;
  });

  return `?${r}`;
}

export const rest = (method, url, queryString, body, requestHeaders) => {
  url = process.env.BASE_URL + url + renderQueryString(queryString);

  const headers = {
    ...requestHeaders
  };

  headers['Content-Type'] = 'application/json';

  if (typeof body === 'object' || typeof body === 'number') {
    // JSON request
    if (!(body instanceof FormData)) {
      body = JSON.stringify(body);
    }
  }

  const authToken = sessionStorage.getItem('token');

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  return new Promise((resolve, reject) => {
    fetch(url, {
      method,
      body,
      headers,
      cache: 'no-cache',
      credentials: 'same-origin'
    })
      // .then(confirmSuccessResponse)
      .then((response) => parseResponse(response))
      .then((response) => resolve(response))
      .catch((error) => {
        alert('error fetching response');
        reject(error)
      });
  });
}