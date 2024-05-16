const jwt = require("jsonwebtoken"); // Importation du module jsonwebtoken pour la gestion des tokens JWT
const secretKey = process.env.SECRET_KEY; // Récupération de la clé secrète à partir des variables d'environnement

module.exports = (req, res, next) => {
  try {
    // Vérification de la présence du token JWT dans les cookies de la requête
    const token = req.cookies.token;

    if (token) {
      // Si un token est présent, vérifiez s'il est valide
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          // Si le token est invalide ou expiré, supprimez-le des cookies
          res.clearCookie("token");
        } else {
          // Si le token est valide, redirigez l'utilisateur vers la page d'accueil
          res.redirect("/test"); // Remplacez '/accueil' par le chemin de votre page d'accueil
        }
      });
    } else {
      // Si aucun token n'est présent, continuez avec la vérification de la validité du token comme vous le faites déjà
      // Extraction du token JWT de l'en-tête "Authorization" de la requête
      const token = req.headers.authorization.split(" ")[1];
      // Vérification de la validité et décodage du token JWT avec la clé secrète
      const decodedToken = jwt.verify(token, secretKey);

      // Vérification de l'expiration du token
      if (decodedToken.exp < Date.now() / 1000) {
        // Si le token est expiré, renvoyer une réponse 401 avec un message d'erreur approprié
        return res.status(401).json({ error: "Token expired" });
      }

      // Ajout des informations d'authentification extraites du token à la requête
      req.auth = { id: decodedToken.userId }; // Modification pour extraire l'ID d'utilisateur
      next(); // Passe à la fonction middleware suivante
    }
  } catch (error) {
    // Gestion des erreurs spécifiques
    if (error.name === "TokenExpiredError") {
      // Si le token est expiré, renvoyer une réponse 401 avec un message d'erreur approprié
      return res.status(401).json({ error: "Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      // Si le token est invalide, renvoyer une réponse 401 avec un message d'erreur approprié
      return res.status(401).json({ error: "Token invalid" });
    } else {
      // Si une autre erreur se produit lors de la vérification du token, renvoyer une réponse 401 avec un message d'erreur approprié
      return res.status(401).json({ error: "Unable to verify token validity" });
    }
  }
};
