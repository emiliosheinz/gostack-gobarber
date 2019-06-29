class FileController {
  store(req, res) {
    return res.json(req.file)
  }
}

export default new FileController()
