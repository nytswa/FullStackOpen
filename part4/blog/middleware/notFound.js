module.exports = (req, res) => {
  res.styatus(404).json({
      error: "Not found"
  })
}