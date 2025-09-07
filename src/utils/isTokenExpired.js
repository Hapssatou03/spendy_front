// Fonction utilitaire pour vérifier si un token JWT est expiré
export const isTokenExpired = (token) => {
  // Si aucun token n'est fourni (null ou undefined), on considère qu'il est expiré
  if (!token) return true;

  try {
    // Décodage de la partie payload du JWT (au format base64)
    // Un token JWT est composé de 3 parties séparées par des points : header.payload.signature
    const payload = JSON.parse(atob(token.split('.')[1]));

    // Récupération du timestamp d'expiration (exp) dans le payload
    const exp = payload.exp;

    // Récupération du timestamp actuel (en secondes)
    const now = Math.floor(Date.now() / 1000);

    // Si la date d'expiration est passée, le token est expiré
    return exp < now;
  } catch {
    // Si une erreur survient pendant le décodage (ex : token mal formé), on retourne true (expiré par précaution)
    return true;
  }
};
