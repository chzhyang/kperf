import http from 'k6/http';

var host_header = `${__ENV.KPERF_HOST}`;
var endpoint = `${__ENV.KPERF_ENDPOINT}`;

export const options = {
  insecureSkipTLSVerify: false,
  noConnectionReuse: true,
  noVUConnectionReuse: true,
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%   
    http_req_duration: ['p(95)<1000'], // 95% of requests should be below 2500ms
  },
};

export default function () {
  const params = {
    headers: {
    'Host': host_header,
    },
  };
  const resp = http.get(endpoint, params);
  console.log('tls: '+ resp.timings.tls_handshaking);
}
