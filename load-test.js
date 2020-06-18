import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  hosts: { 
    "https://dwetter.nl": "1.1.1.1"
  },
  duration: "30s",
  vus: 50,
  thresholds: {
    "http_req_duration": ["p(95)<500"],
    "check_failure_rate": [
      "rate<0.01",
      { threshold: "rate<=0.05", abortOnFail: true},
    ]
  }
};

export default function () {
  const response = http.get("https://dwetter.nl");
  
  check(response, {
    "http2 is used": (r) => r.proto === "HTTP/2.0",
    "status was 200": (r) => r.status === 200,
  });

  sleep(Math.random() * 3 + 2); // Random sleep between 2s and 5s
}