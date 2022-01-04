import fs from "fs";
import express from 'express';
import { prepareDictionary, findWords } from "./parausolver.js";

(async function main() {
  let dictname = "./dicts/ca.softcatala.txt";
  let dictionary = prepareDictionary(fs.readFileSync(dictname, 'utf8'));

  let app = express();

  app.use(express.static('./client'));

  app.get("/info", function (req, res) {
    res.send({ dictionaryname: dictname, dictionaryentries: dictionary.length });
  });

  app.get("/words/:letters", function (request, response) {
    let { letters } = request.params;
    let solutions = findWords(dictionary, letters);
    response.send({ letters, total: solutions.length, solutions });
  });

  let server = await app.listen(process.env.PORT || 2464 );
  console.log('PA-rau-solver server is open for ebusiness at port', server.address().port);
})()

