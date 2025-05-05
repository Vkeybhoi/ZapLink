#!/usr/bin/env ts-node

const { app } = require("../src/index");

// Normalize a port into a number, string, or false
function normalizePort(val: string): number | string | false {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val; // Named pipe
  }

  if (port >= 0) {
    return port; // Port number
  }

  return false;
}

// Handle server errors
function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Start the server
const port = normalizePort(process.env.PORT || "3001");
app
  .listen(port, () => {
    console.log(`ZapLink server started on port ${port}`);
  })
  .on("error", onError);