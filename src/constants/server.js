export const SERVER_URL =
  process.env.NODE_ENV === "PROD"
    ? "https://server.conticlub.co"
    : "http://localhost:8080";

export const BUCKET_URL =
  process.env.NODE_ENV === "PROD"
    ? "https://conticlub.co"
    : "https://conticlub.co";
