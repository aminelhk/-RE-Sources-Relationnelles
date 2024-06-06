// Importation du module HTTP natif de Node.js pour créer un serveur HTTP.
import http from "http";
// Importation de l'application Express configurée depuis le fichier app.js.
import app from "./app";

// Détermination du port sur lequel le serveur doit écouter.
// Utilise la variable d'environnement PORT si disponible, sinon définit le port à "3000".
const port = process.env.PORT || "3000";
// Configuration du port de l'application Express pour qu'elle sache sur quel port écouter.
app.set("port", port);

// Définition d'une route de test "/test" sur notre application Express.
app.get("/test", (req, res) => {
  // Obtention des informations d'adresse du serveur.
  const serverAddress = server.address();
  // Détermination de l'adresse IP du serveur.
  // Si l'adresse est "::", cela signifie écoute sur toutes les interfaces IPv6, donc nous utilisons "localhost".
  const serverIp =
    serverAddress.address === "::" ? "localhost" : serverAddress.address;
  // Obtention du port sur lequel le serveur écoute.
  const serverPort = serverAddress.port;
  // Envoi de la réponse contenant l'IP et le port du serveur au client.
  res.send(`Server IP: ${serverIp}, Server Port: ${serverPort}`);
});

// Fonction de gestion des erreurs qui peuvent survenir lors de l'écoute du serveur.
const errorHandler = (error) => {
  // Vérifie si l'erreur ne concerne pas une tentative d'écoute.
  if (error.syscall !== "listen") {
    throw error; // Si c'est une autre erreur, la lance.
  }
  // Obtention des informations d'adresse du serveur pour le message d'erreur.
  const address = server.address();
  // Formatage de la chaîne indiquant sur quoi le serveur essayait d'écouter.
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  // Traitement des erreurs spécifiques liées à l'écoute.
  switch (error.code) {
    case "EACCES": // Erreur d'accès : besoin de privilèges plus élevés.
      console.error(bind + " requires elevated privileges.");
      process.exit(1); // Arrêt du processus avec un code d'erreur.
    case "EADDRINUSE": // L'adresse (port) est déjà utilisée.
      console.error(bind + " is already in use.");
      process.exit(1); // Arrêt du processus avec un code d'erreur.
    default: // Pour toutes autres erreurs, lance l'erreur.
      throw error;
  }
};

// Création d'un serveur HTTP à partir de notre application Express.
const server = http.createServer(app);

// Configuration des écouteurs d'événements pour le serveur.
server.on("error", errorHandler); // Gestion des erreurs lors de l'écoute.
server.on("listening", () => {
  // Log dans la console quand le serveur commence à écouter.
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Server listening on ${bind}.`);
});

// Démarrage de l'écoute du serveur sur le port défini.
server.listen(port);
