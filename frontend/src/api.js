import axios from "axios";

const BASE = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const api = {
  sip:     (p)    => axios.get(`${BASE}/sip/calculate`,     { params: p }),
  stepUp:  (p)    => axios.get(`${BASE}/sip/step-up`,       { params: p }),
  lumpsum: (p)    => axios.get(`${BASE}/lumpsum/calculate`, { params: p }),
  compare: (p)    => axios.get(`${BASE}/compare`,           { params: p }),
  xirr:    (body) => axios.post(`${BASE}/xirr`,             body),
};
