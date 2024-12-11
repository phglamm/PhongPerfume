import { Client, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite Endpoint
  .setProject("675205e3001f27c7d90a"); // Your project ID

export const storage = new Storage(client);
