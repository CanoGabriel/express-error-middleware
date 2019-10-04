const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

(async () => {
    try {
        const errorConfiguration = JSON.parse(await readFile(`${__dirname}/errors-configuration.json`, "utf8"));

        errorConfiguration.forEach((errorConfig) => {
            const newError = function newError(message) {
                this.message = message || errorConfig.message || "Unknown Error";
                this.code = errorConfig.code || 500;
                Error.captureStackTrace(this, this.constructor);
            };

            newError.prototype = Object.create(Error.prototype);
            global[errorConfig.name] = newError;
        });
    } catch (e) {
        console.log(e);
        console.log("Global Errors configuration failed");
    }
})();
