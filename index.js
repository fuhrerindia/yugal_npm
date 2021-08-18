#! /usr/bin/env node
const fs = require("fs");
const yargs = require("yargs");
const chalk = require("chalk");
const boxen = require("boxen");
const path = require("path");
const shell = require('shelljs');
const yugalrepo = "https://github.com/sinhapaurush/yugal.git";

const dirpath = shell.exec("pwd").replace("\n", "");

const options = yargs
    .usage("Usage: -init <projectName>")
    .option("init", { alias: "start", describe: "Your Project name", type: "string", demandOption: true })
    .argv;

const greeting = `Creating New Yugal Project: ${options.init.toUpperCase()}`;
const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "green",
};
const msgBox = boxen(greeting, boxenOptions);

console.log(msgBox);

let projname = options.init;

if (!fs.existsSync(`${dirpath}/${projname}`)) {
    shell.cd(dirpath);
    shell.exec(`git clone ${yugalrepo}`);
    shell.exec(`mv 'yugal' ${projname}`);
    shell.cd(projname);
    shell.exec("rm -rf .git");
    shell.exec("rm readme.md");
    shell.cd("lib");
    shell.exec("rm readme.txt");
    console.log("PROJECT CREATED AT: " + dirpath)
}else{
    console.log(boxen(`A directory or Yugal project already exists with the name '${projname}' in this directory.`, {
        borderColor: "yellow"
    }));
}