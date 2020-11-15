const ADMIN_PROFILE = "admin";

function isAdmin(admin) {
  return admin === ADMIN_PROFILE;
}

module.exports = (req, res) => {
  const user = req.user;
  if (!user) return false;

  const admin = user.role;
  const originalUrl = req.originalUrl;

  switch (originalUrl) {
    case "/adm/list-users":
      return isAdmin(admin);

    default:
      return true;
  }
};
