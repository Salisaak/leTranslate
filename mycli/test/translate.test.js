const chalk = require("chalk");
const boxen = require("boxen");
const translate = require("@vitalets/google-translate-api");
const yargsParser = require("yargs-parser");
const figlet = require("figlet");

const deez = require("../bin/index.js");   //import deez

jest.mock("chalk");                       
jest.mock("boxen");
jest.mock("@vitalets/google-translate-api");    //mock imported dependencies
jest.mock("yargs-parser");
jest.mock("figlet");

describe("deez", () => {    //group tests
  afterEach(() => {
    jest.clearAllMocks();    //reset mocks
  });

  test("translation", async () => {   //test func
    const sentence = "Hello";    //test sentence
    const translationResponse = { text: "Bonjour" };  
    translate.mockResolvedValueOnce(translationResponse);  //fake translation 

    const consoleLogSpy = jest.spyOn(console, "log");  //tracks console.log calls

    yargsParser.mockReturnValueOnce({   //mocks parser
      language: "fr",
      l: null,
      sentence,
      s: null,
    });

    await deez(); //calls deez,  await since its asynchronous 

    expect(translate).toHaveBeenCalledWith(sentence, { to: "fr" });     //makes sure translate was called with the right arguments
    expect(consoleLogSpy).toHaveBeenCalledWith(   //checks for console.log output with chalk and boxen
      "\n" +
        boxen(
          `Mocked Chalk Text\n\n${sentence}\n\n${translationResponse.text}`,
          {
            padding: 1,
            borderColor: "green",
            dimBorder: true,
          }
        ) +
        "\n"
    );
  });
});
