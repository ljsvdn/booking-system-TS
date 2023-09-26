export const isAdmin = (req: any, res: any, next: any) => {
  if (req.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
};
