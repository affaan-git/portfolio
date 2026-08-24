const site = require("./src/site.json");

module.exports = {
    siteUrl: site.url,
    generateRobotsTxt: true,
    sourceDir: process.env.NEXT_DIST_DIR || ".next"
}
