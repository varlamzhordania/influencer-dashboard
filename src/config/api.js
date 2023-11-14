import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  auth: {
    username: "20e2be75-0a88-42a6-9cba-581f3bb17f11",
    password: "d9be8fcd-4587-4dc4-af52-c36b09c593ad",
  },
  headers: {
    Accept: "application/json",
    Authorization:
      "Basic NDVjYjFjZTItZjdjYi00NjFjLTgzMzEtNjJiN2YyNzg1NjIwOjEzZDkzYjZkLWUxMjEtNDU3Yy1hOTk4LTk5NWE4YzhiYmRjZQ==",
  },
});
