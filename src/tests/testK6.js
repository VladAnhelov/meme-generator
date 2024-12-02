import http from "k6/http";
import { sleep } from "k6";

const memebulance = "https://memebulance.netlify.app/";

export const options = {
  vus: 5, // users
  duration: "10s", // timing test
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  const res = http.get(memebulance);
  console.log(`Response time: ${res.timings.duration}ms`);
  sleep(1);
}
