const path = require("path");

module.exports = {
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: path.join(__dirname, "uploads", ":path*"),
      },
    ];
  },
};
