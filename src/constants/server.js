export const SERVER_URL =
  process.env.NODE_ENV === "PROD"
    ? "https://server.conticlub.co"
    : "http://localhost:8080";
