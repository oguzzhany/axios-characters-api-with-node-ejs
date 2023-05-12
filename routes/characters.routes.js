const express = require("express");
const router = express.Router();
const axios = require("axios");
const ApiService = require("../services/api.service");

const apiService = new ApiService();

/* GET home page */
router.get("/characters", (req, res, next) => {
  axios
    .get("https://ih-crud-api.herokuapp.com/characters")
    .then((responseFromAPI) => {
      // console.log(responseFromAPI)
      res.render("characters/list-characters", {
        characters: responseFromAPI.data,
      });
    })
    .catch((err) => console.error(err));
});

router.get("/characters/create", (req, res, next) => {
  res.render("characters/create-character");
});

router.post("/characters/create", (req, res) => {
  const characterInfo = req.body;

  apiService

    .createCharacter(characterInfo)

    .then((response) => {
      //   res.json(response.data);

      res.redirect(`/characters`);
    })

    .catch((error) => console.log(error));
});

// Submit info to edit a character with a matching id.

router.get("/characters/edit/:id", (req, res) => {
  const characterId = req.params.id;

  apiService

    .getOneCharacter(characterId)

    .then((response) => {
      res.render("characters/edit-character", {
        character: response.data,
      });
    })

    .catch((error) => console.log(error));
});

router.post("/characters/edit/:id", (req, res) => {
  const characterId = req.params.id;
  const characterInfo = req.body;

  apiService
    .editCharacter(characterId, characterInfo)
    .then((response) => {
      res.redirect("/characters/list");
    })
    .catch((error) => console.log(error));
});

router.get("/characters/:id", (req, res, next) => {
  axios
    .get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then((responseFromAPI) => {
      res.render("characters/details-character", {
        character: responseFromAPI.data,
      });
    })
    .catch((err) => console.error(err));
});

router.get("/characters/delete/:id", (req, res) => {
  const characterId = req.params.id;

  apiService

    .deleteCharacter(characterId)

    .then((response) => {
      res.redirect(`/characters`);
    })

    .catch((error) => console.log(error));
});

module.exports = router;
