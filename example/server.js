const PORT = 3001;

const express = require("express");
const server = express();
require("../index");
const genericErrorHandler = require("../generic-error-handler");
server.use(express.json());


const returnOk = (req, res) => {
    res.send("ok");
}
const router = express.Router();
router.get("/400", (req, res, next) => {
    next(new BadRequestError());
}, returnOk);
router.get("/401", (req, res, next) => {
    next(new UnauthorizedError());
}, returnOk);

router.get("/404", (req, res, next) => {
    next(new NotFoundError());
}, returnOk);

router.get("/500", (req, res, next) => {
    next(new InternalServerError());
}, returnOk);

router.get("/", returnOk);

server.use("/", router);
server.use(genericErrorHandler);

server.listen(PORT, () => {
    console.log(`Server sucessfully running on port ${PORT}`);
});
