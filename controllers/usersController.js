// controllers/albumsController.js
// GET /api/albums
// controllers/albumsController.js
var db = require('../models');

function index(req, res) {
  // send back all albums as JSON
  db.Album.find(function albumsListed(err, allAlbums) {
    res.json(allAlbums);
  });
}

// POST /api/albums
function create(req, res) {
  // create an album based on request body and send it back as JSON
  var newAlbum = new db.Album(req.body);

  // save new todo in db
  newAlbum.save(function handleNewAlbum(err, savedAlbum) {
    res.json(savedAlbum);
  });
}

// GET /api/albums/:albumId
function show(req, res) {
  // find one album by id and send it back as JSON
}

// DELETE /api/albums/:albumId
function destroy(req, res) {
  // find one album by id, delete it, and send it back as JSON
}

// PUT or PATCH /api/albums/:albumId
function update(req, res) {
  // find one album by id, update it based on request body,
  // and send it back as JSON
}

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};