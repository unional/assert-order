var AssertOrder=function(t){function e(n){if(i[n])return i[n].exports;var r=i[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var i={};return e.m=t,e.c=i,e.i=function(t){return t},e.d=function(t,i,n){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}([function(t,e,i){"use strict";var n=function(){function t(t,e){void 0===e&&(e=0),this.plannedSteps=t,this.miniSteps=0,this.nextStep=e,this.possibleMoves={once:[e],some:[e],all:[e]}}return Object.defineProperty(t.prototype,"next",{get:function(){return this.nextStep},enumerable:!0,configurable:!0}),t.prototype.end=function(t){var e=this,i=function(){return void 0===e.plannedSteps||e.nextStep===e.plannedSteps},n=function(){return"Planned "+e.plannedSteps+" steps but executed "+e.nextStep+" steps"};if(t)return new Promise(function(e,r){setTimeout(function(){i()?e():r(new Error(n()))},t)});if(!i())throw new Error(n())},t.prototype.step=function(t){if(this.isValidStep("step",[t]))return this.moveNext(),this.nextStep++;throw new Error(this.getErrorMessage("step",t))},t.prototype.once=function(t){if(this.isValidStep("once",[t]))return this.moveNext(),this.nextStep++;throw new Error(this.getErrorMessage("once",t))},t.prototype.any=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];if(this.isValidStep("any",t))return this.moveNext(),this.nextStep++;throw new Error(this.getErrorMessage.apply(this,["any"].concat(t)))},t.prototype.some=function(t){if(this.isValidStep("some",[t]))return t===this.nextStep&&(this.moveNext({once:[t+1],some:[t,t+1],all:[t+1]}),this.miniSteps=0,this.nextStep++),++this.miniSteps;throw new Error(this.getErrorMessage("some",t))},t.prototype.all=function(t,e){if(e<=0)throw new Error(e+" is not a valid 'plan' value.");if(this.targetMiniSteps&&this.targetMiniSteps!==e)throw new Error("The plan count ("+e+") does not match with previous value ("+this.targetMiniSteps+").");if(this.isValidStep("all",[t],e))return void 0===this.targetMiniSteps&&(this.targetMiniSteps=e,this.miniSteps=0,this.moveNext({all:[t]})),this.miniSteps++,e===this.miniSteps&&(this.moveNext(),this.nextStep++,this.targetMiniSteps=void 0),this.miniSteps;throw new Error(this.getErrorMessage("all",t))},t.prototype.isValidStep=function(e,i,n){var r=this,s=t.alias[e]||e,o=i.find(function(t){return r.possibleMoves[s]&&r.possibleMoves[s].some(function(e){return e===t})});return(!n||this.miniSteps<=n)&&void 0!==o},t.prototype.moveNext=function(t){void 0===t&&(t={once:[this.nextStep+1],some:[this.nextStep+1],all:[this.nextStep+1]}),this.possibleMoves=t},t.prototype.getErrorMessage=function(e){for(var i=this,n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];var s=[],o=function(e){s.push.apply(s,[e].concat(t.reverseAlias[e]).map(function(t){return"'"+t+"("+i.possibleMoves[e].join("|")+")'"}))};for(var p in this.possibleMoves)o(p);return"Expecting "+s.join(", ")+", but received '"+e+"("+n.join(",")+")'"},t}();n.alias={step:"once",any:"once",multiple:"all"},n.reverseAlias={once:["step"],some:[],all:["multiple"]},e.AssertOrder=n},function(t,e,i){"use strict";var n=i(0);Object.defineProperty(e,"__esModule",{value:!0}),e.default=n.AssertOrder}]);
//# sourceMappingURL=assert-order.es5.js.map