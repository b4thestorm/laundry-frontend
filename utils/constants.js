const BASE = "http:/localhost:8000"
const URLS = {
  register: `${BASE}/register`,
  login: `${BASE}/api-token-auth/`,
  index: `${BASE}/api/v1/machine_collection/`,
  set_expired: `${BASE}/api/v1/set_expired/`,
  machines_remaining: `${BASE}/api/v1/machines_remaining/`,
}

export {BASE, URLS}
