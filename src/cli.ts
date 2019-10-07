import {Registry} from "abaplint/build/src/registry";
import {MemoryFile} from "abaplint/build/src/files";
import * as glob from "glob";
import * as fs from "fs";
import {IFile} from "abaplint/build/src/files/_ifile";
import {Moose} from "./moose";

function run() {

    const reg = new Registry();

    console.log("searching abap files...");
    // const arg = "/Users/pascal/git/abapCompiler/abapGit/src/**/*.*";
    const arg = "./src/**/*.*";
    let filenames: string[] = [];
    filenames = filenames.concat(glob.sync(arg, {nosort: true, nodir: true}));

    console.log("reading abap files...");
    const files: IFile[] = [];
    for (const filename of filenames) {
        const raw = fs.readFileSync(filename, "utf8").replace(/\r/g, ""); // ignore all carriage returns
        files.push(new MemoryFile(filename, raw));
    }

    console.log("analyzing abap files...");
    reg.addFiles(files);
    const outfile = "./" + process.cwd().substring(process.cwd().lastIndexOf("/") + 1) +".mse";
    fs.writeFileSync(outfile, new Moose(reg).getMSE(), "utf-8");

    console.log(outfile + " created.");
}

run();