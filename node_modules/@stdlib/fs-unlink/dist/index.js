"use strict";var n=function(e,r){return function(){return r||e((r={exports:{}}).exports,r),r.exports}};var i=n(function(p,u){
var a=require("fs").unlink;function l(e,r){a(e,r)}u.exports=l
});var s=n(function(x,t){
var o=require("fs").unlinkSync;function v(e){try{o(e)}catch(r){return r}return null}t.exports=v
});var y=require('@stdlib/utils-define-nonenumerable-read-only-property/dist'),c=i(),k=s();y(c,"sync",k);module.exports=c;
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
