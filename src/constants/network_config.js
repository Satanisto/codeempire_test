const NETWORK_CONFIG = {
  HOST: "localhost",
  PORT: "8080"
};

export function path_to(path) {
  return `http://${NETWORK_CONFIG.HOST}:${NETWORK_CONFIG.PORT}/${path}`;
}

export default NETWORK_CONFIG;
