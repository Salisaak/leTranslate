#! /usr/bin/env node
//trnsl -l hindu -s "Hey how is it going"

const chalk = require("chalk"); //color library
const boxen = require("boxen"); //box library
const translate = require("@vitalets/google-translate-api"); //google translate api
const yargsParser = require("yargs-parser"); //parsing library
const figlet = require("figlet"); //word art module

const deez = () => {
  const usage = chalk.keyword("violet")(
    "\nUsage: trnsl -l <language>  -s <sentence> \n" +
      boxen(                                                    //display helpdesk and box border
        chalk.green("\n" + "Translates a sentence to specific language" + "\n"),
        { padding: 1, borderColor: "green", dimBorder: true }
      ) +
      "\n"
  );

  const options = yargsParser(process.argv.slice(2));  //process.argv[] array of script. slice to move onto command line
                                                        // yargsParser parses array into javascript object
  if (options.language == null && options.l == null) {
    console.log(
      chalk.yellow(figlet.textSync("Yjol D.eez", { horizontalLayout: "full" })) 
    );
    console.log(usage);
    return;
  } //if language/sentence isnt there or field left blank then go to "helpdesk"

  if (options.sentence == null && options.s == null) {
    console.log(usage);
    return;
  }

  const language = options.l || options.language;    
  const sentence = options.s || options.sentence;     

  translate(sentence, { to: language.toLowerCase() })
    .then((res) => {
      console.log(
        "\n" +
          boxen(chalk.green(sentence + "\n\n" + res.text), {       //if both feilds are present then the translate api will translate the given sentence to the given langy
            padding: 1,
            borderColor: "green",
            dimBorder: true,
          }) +
          "\n"
      );
    })
    // .catch((err) => {
    //   console.error(err);   //catch error
    // });
};

deez();
module.exports = deez;

