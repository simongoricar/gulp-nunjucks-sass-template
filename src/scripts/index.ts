/**
 * Special aliases are available:
 *
 * "@": resolves to the root source directory
 * "@SCSS": resolves to the root scss directory
 * "@SCRIPTS": resolves to the root scripts directory
 */
import vars from "@SCSS/_vars.scss";

console.log("Hello world!");

console.log("SCSS variables: ");
console.log(vars);
