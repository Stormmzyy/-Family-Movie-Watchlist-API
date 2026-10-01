export function authorizeModification(req, res, next) {
  const { role, id } = req.user || {};

  if (role === "parent") {
    return next();
  }

  // Compare as strings so "3" (route param) and 3 (token payload) match.
  if (
    role === "child" &&
    id !== undefined &&
    String(req.params.userId) === String(id)
  ) {
    return next();
  }

  return res.status(403).json({ error: "Access denied" });
}
