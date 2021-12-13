module.exports = (req, res) => {
  res.clearCookie("jwt", {
    // domain: ".aneun-dongne.com", (배포)
    path: "/",
    secure: true,
    sameSite: "None",
  });
  res.status(205).send("Logged out successfully");
};
