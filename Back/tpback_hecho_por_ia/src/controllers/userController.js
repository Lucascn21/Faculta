const userService = require("../services/userService");

class UserController {
  // GET /users
  async index(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.render("users/index", {
        title: "Listado de Usuarios",
        users,
      });
    } catch (error) {
      req.flash("error", `Error: ${error.message}`);
      res.redirect("/");
    }
  }

  // GET /users/:id
  async show(req, res) {
    try {
      const id = req.params.id;
      const user = await userService.getUserById(id);

      if (!user) {
        req.flash("error", "Usuario no encontrado");
        return res.redirect("/users");
      }

      const permissions = await userService.getUserPermissions(id);

      res.render("users/show", {
        title: `Usuario: ${user.username}`,
        user,
        permissions,
      });
    } catch (error) {
      req.flash("error", `Error: ${error.message}`);
      res.redirect("/users");
    }
  }
}

module.exports = new UserController();
