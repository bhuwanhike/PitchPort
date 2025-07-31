import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 10, // virtual users
  duration: "30s", // run for 30 seconds
};

export default function () {
  const url = "http://localhost:5000/chat"; // replace with your API endpoint

  const payload = JSON.stringify({
    message: "Who are the investors on PitchPort?",
    history: [],
  });

  const params = {
    headers: { "Content-Type": "application/json" },
  };

  const res = http.post(url, payload, params);

  check(res, { "status is 200": (r) => r.status === 200 });

  sleep(1); // wait before sending next request
}
