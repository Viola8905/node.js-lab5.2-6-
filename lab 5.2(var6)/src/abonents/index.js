const Router = require("express").Router;
const abonentController = require("./controller.js");

const abonentRouter = new Router();

//CRUD
abonentRouter.get("/", abonentController.getAll);
abonentRouter.get("/query", abonentController.getQuery);
abonentRouter.get("/:id", abonentController.getById);
abonentRouter.delete("/:id", abonentController.delete);
abonentRouter.post("/",abonentController.post);
abonentRouter.patch("/:id", abonentController.patch);

module.exports = abonentRouter;