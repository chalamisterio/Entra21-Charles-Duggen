import { adicionaDois } from "./utils.js";
import cowsay from "cowsay";

console.log(`2 + 2 = ${adicionaDois(2)}`);

console.log(cowsay.say({
    text : "I'm a moooodule",
    e : "--",
    T : "Z "
}));