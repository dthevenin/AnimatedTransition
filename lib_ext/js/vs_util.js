window.vs={};window.vs.util={};window.vs.core={};window.vs.data={};window.vs.ui={};window.vs.fx={};window.vs.av={};window.vs.ext={};window.vs.ext.ui={};window.vs.ext.fx={};window.vs.SUPPORT_3D_TRANSFORM=!1;
(function(){FirminCSSMatrix=function(a){this.m11=this.m22=this.m33=this.m44=1;this.m12=this.m13=this.m14=this.m21=this.m23=this.m24=this.m31=this.m32=this.m34=this.m41=this.m42=this.m43=0;"string"==typeof a&&this.setMatrixValue(a)};FirminCSSMatrix.displayName="FirminCSSMatrix";FirminCSSMatrix.degreesToRadians=function(a){return a*Math.PI/180};FirminCSSMatrix.determinant2x2=function(a,b,e,g){return a*g-b*e};FirminCSSMatrix.determinant3x3=function(a,b,e,g,f,h,i,j,l){var m=FirminCSSMatrix.determinant2x2;
return a*m(f,h,j,l)-g*m(b,e,j,l)+i*m(b,e,f,h)};FirminCSSMatrix.determinant4x4=function(a){var b=FirminCSSMatrix.determinant3x3,e=a.m21,g=a.m31,f=a.m41,h=a.m12,i=a.m22,j=a.m32,l=a.m42,m=a.m13,t=a.m23,u=a.m33,y=a.m43,z=a.m14,A=a.m24,v=a.m34,w=a.m44;return a.m11*b(i,t,A,j,u,v,l,y,w)-e*b(h,m,z,j,u,v,l,y,w)+g*b(h,m,z,i,t,A,l,y,w)-f*b(h,m,z,i,t,A,j,u,v)};[["m11","a"],["m12","b"],["m21","c"],["m22","d"],["m41","e"],["m42","f"]].forEach(function(a){var b=a[0];Object.defineProperty(FirminCSSMatrix.prototype,
a[1],{set:function(a){this[b]=a},get:function(){return this[b]}})});FirminCSSMatrix.prototype.isAffine=function(){return 0===this.m13&&0===this.m14&&0===this.m23&&0===this.m24&&0===this.m31&&0===this.m32&&1===this.m33&&0===this.m34&&0===this.m43&&1===this.m44};FirminCSSMatrix.prototype.multiply=function(a){var b=new FirminCSSMatrix;b.m11=a.m11*this.m11+a.m12*this.m21+a.m13*this.m31+a.m14*this.m41;b.m12=a.m11*this.m12+a.m12*this.m22+a.m13*this.m32+a.m14*this.m42;b.m13=a.m11*this.m13+a.m12*this.m23+
a.m13*this.m33+a.m14*this.m43;b.m14=a.m11*this.m14+a.m12*this.m24+a.m13*this.m34+a.m14*this.m44;b.m21=a.m21*this.m11+a.m22*this.m21+a.m23*this.m31+a.m24*this.m41;b.m22=a.m21*this.m12+a.m22*this.m22+a.m23*this.m32+a.m24*this.m42;b.m23=a.m21*this.m13+a.m22*this.m23+a.m23*this.m33+a.m24*this.m43;b.m24=a.m21*this.m14+a.m22*this.m24+a.m23*this.m34+a.m24*this.m44;b.m31=a.m31*this.m11+a.m32*this.m21+a.m33*this.m31+a.m34*this.m41;b.m32=a.m31*this.m12+a.m32*this.m22+a.m33*this.m32+a.m34*this.m42;b.m33=a.m31*
this.m13+a.m32*this.m23+a.m33*this.m33+a.m34*this.m43;b.m34=a.m31*this.m14+a.m32*this.m24+a.m33*this.m34+a.m34*this.m44;b.m41=a.m41*this.m11+a.m42*this.m21+a.m43*this.m31+a.m44*this.m41;b.m42=a.m41*this.m12+a.m42*this.m22+a.m43*this.m32+a.m44*this.m42;b.m43=a.m41*this.m13+a.m42*this.m23+a.m43*this.m33+a.m44*this.m43;b.m44=a.m41*this.m14+a.m42*this.m24+a.m43*this.m34+a.m44*this.m44;return b};FirminCSSMatrix.prototype.isIdentityOrTranslation=function(){return 1===this.m11&&0===this.m12&&0===this.m13&&
0===this.m14&&0===this.m21&&1===this.m22&&0===this.m23&&0===this.m24&&0===this.m31&&0===this.m31&&1===this.m33&&0===this.m34&&1===this.m44};FirminCSSMatrix.prototype.adjoint=function(){var a=new FirminCSSMatrix,b=FirminCSSMatrix.determinant3x3,e=this.m11,g=this.m12,f=this.m13,h=this.m14,i=this.m21,j=this.m22,l=this.m23,m=this.m24,t=this.m31,u=this.m32,y=this.m33,z=this.m34,A=this.m41,v=this.m42,w=this.m43,q=this.m44;a.m11=b(j,u,v,l,y,w,m,z,q);a.m21=-b(i,t,A,l,y,w,m,z,q);a.m31=b(i,t,A,j,u,v,m,z,q);
a.m41=-b(i,t,A,j,u,v,l,y,w);a.m12=-b(g,u,v,f,y,w,h,z,q);a.m22=b(e,t,A,f,y,w,h,z,q);a.m32=-b(e,t,A,g,u,v,h,z,q);a.m42=b(e,t,A,g,u,v,f,y,w);a.m13=b(g,j,v,f,l,w,h,m,q);a.m23=-b(e,i,A,f,l,w,h,m,q);a.m33=b(e,i,A,g,j,v,h,m,q);a.m43=-b(e,i,A,g,j,v,f,l,w);a.m14=-b(g,j,u,f,l,y,h,m,z);a.m24=b(e,i,t,f,l,y,h,m,z);a.m34=-b(e,i,t,g,j,u,h,m,z);a.m44=b(e,i,t,g,j,u,f,l,y);return a};FirminCSSMatrix.prototype.inverse=function(){var a,b,e,g;if(this.isIdentityOrTranslation())return a=new FirminCSSMatrix,0===this.m41&&
0===this.m42&&0===this.m43||(a.m41=-this.m41,a.m42=-this.m42,a.m43=-this.m43),a;b=this.adjoint();a=FirminCSSMatrix.determinant4x4(this);if(1.0E-8>Math.abs(a))return null;for(e=1;5>e;e++)for(g=1;5>g;g++)b["m"+e+g]/=a;return b};FirminCSSMatrix.prototype.rotate=function(a,b,e){var g=FirminCSSMatrix.degreesToRadians;if("number"!=typeof a||isNaN(a))a=0;if(("number"!=typeof b||isNaN(b))&&("number"!=typeof e||isNaN(e)))e=a,b=a=0;if("number"!=typeof b||isNaN(b))b=0;if("number"!=typeof e||isNaN(e))e=0;var a=
g(a),b=g(b),e=g(e),g=new FirminCSSMatrix,f=new FirminCSSMatrix,h=new FirminCSSMatrix,i,e=e/2;i=Math.sin(e);e=Math.cos(e);h.m11=h.m22=1-2*i*i;h.m12=h.m21=2*i*e;h.m21*=-1;b/=2;i=Math.sin(b);e=Math.cos(b);f.m11=f.m33=1-2*i*i;f.m13=f.m31=2*i*e;f.m13*=-1;a/=2;i=Math.sin(a);e=Math.cos(a);g.m22=g.m33=1-2*i*i;g.m23=g.m32=2*i*e;g.m32*=-1;return h.multiply(f).multiply(g).multiply(this)};FirminCSSMatrix.prototype.rotateAxisAngle=function(a,b,e,g){if("number"!=typeof a||isNaN(a))a=0;if("number"!=typeof b||isNaN(b))b=
0;if("number"!=typeof e||isNaN(e))e=0;if("number"!=typeof g||isNaN(g))g=0;0===a&&0===b&&0===e&&(e=1);var f=new FirminCSSMatrix,h=Math.sqrt(a*a+b*b+e*e),i,j,l,g=(FirminCSSMatrix.degreesToRadians(g)||0)/2;i=Math.cos(g);j=Math.sin(g);g=j*j;0===h?(b=a=0,e=1):1!==h&&(a/=h,b/=h,e/=h);1===a&&0===b&&0===e?(f.m22=f.m33=1-2*g,f.m23=f.m32=2*i*j,f.m32*=-1):0===a&&1===b&&0===e?(f.m11=f.m33=1-2*g,f.m13=f.m31=2*i*j,f.m13*=-1):0===a&&0===b&&1===e?(f.m11=f.m22=1-2*g,f.m12=f.m21=2*i*j,f.m21*=-1):(h=j*i,i=a*a,j=b*b,
l=e*e,f.m11=1-2*(j+l)*g,f.m12=2*(a*b*g+e*h),f.m13=2*(a*e*g-b*h),f.m21=2*(b*a*g-e*h),f.m22=1-2*(l+i)*g,f.m23=2*(b*e*g+a*h),f.m31=2*(e*a*g+b*h),f.m32=2*(e*b*g-a*h),f.m33=1-2*(i+j)*g);return this.multiply(f)};FirminCSSMatrix.prototype.scale=function(a,b,e){var g=new FirminCSSMatrix;if("number"!=typeof a||isNaN(a))a=1;if("number"!=typeof b||isNaN(b))b=a;if("number"!=typeof e||isNaN(e))e=1;g.m11=a;g.m22=b;g.m33=e;return this.multiply(g)};FirminCSSMatrix.prototype.translate=function(a,b,e){var g=new FirminCSSMatrix;
if("number"!=typeof a||isNaN(a))a=0;if("number"!=typeof b||isNaN(b))b=0;if("number"!=typeof e||isNaN(e))e=0;g.m41=a;g.m42=b;g.m43=e;return this.multiply(g)};FirminCSSMatrix.prototype.setMatrixValue=function(a){var a=a.trim(),b=a.match(/^matrix(3d)?\(\s*(.+)\s*\)$/),e,g,f,h;if(b&&(a=!!b[1],b=b[2].split(/\s*,\s*/),e=b.length,g=Array(e),!(a&&16!==e)&&(a||6===e))){for(f=0;f<e;f++)if(h=b[f],h.match(/^-?\d+(\.\d+)?$/))g[f]=parseFloat(h);else return;for(f=0;f<e;f++)point=a?"m"+(Math.floor(f/4)+1)+(f%4+1):
String.fromCharCode(f+97),this[point]=g[f]}};FirminCSSMatrix.prototype.toString=function(){var a=this,b,e;this.isAffine()?(e="matrix(",b="a,b,c,d,e,f".split(",")):(e="matrix3d(",b="m11,m12,m13,m14,m21,m22,m23,m24,m31,m32,m33,m34,m41,m42,m43,m44".split(","));return e+b.map(function(b){return a[b].toFixed(6)}).join(", ")+")"};this.FirminCSSMatrix=FirminCSSMatrix}).call(this);
(function(){function a(c,n){x.isNumber(c)&&(this.x=c);x.isNumber(n)&&(this.y=n)}function b(c,n){for(var a in n)getter=n.__lookupGetter__(a),setter=n.__lookupSetter__(a),getter&&c.__defineGetter__(a,getter),setter&&c.__defineSetter__(a,setter),!getter&&!setter&&(c[a]=n[a]);return c}function e(c,n){for(var a in n){var b=Object.getOwnPropertyDescriptor(n,a);b&&(b.get||b.set)?x.defineProperty(c,a,b):c[a]=n[a]}return c}function g(c,a,d){if(Object.prototype.hasOwnProperty.call(d,"set")){var b=d.set;l(b)&&
c.__defineSetter__(a,b)}Object.prototype.hasOwnProperty.call(d,"get")&&(b=d.get,l(b)&&c.__defineGetter__(a,b))}function f(c,a,d){function b(c,a){return Object.prototype.hasOwnProperty.call(c,a)}if("object"!=typeof d||null===d)throw new TypeError("bad desc");if("string"!=typeof a||null===a)throw new TypeError("bad property name");var f={};f.enumerable=b(d,"enumerable")?!!d.enumerable:!0;f.configurable=b(d,"configurable")?!!d.configurable:!0;b(d,"value")&&(f.value=d.value);b(d,"writable")&&(f.writable=
!!d.writable);if(b(d,"get")){var e=d.get;l(e)&&(f.get=e)}b(d,"set")&&(d=d.set,l(d)&&(f.set=d));if(("get"in f||"set"in f)&&("value"in f||"writable"in f))throw new TypeError("identity-confused descriptor");Object.defineProperty(c,a,f)}function h(c,a,d){if(d){c._properties_||(c._properties_=[]);if(!c.prototype)throw"defineClassProperty on a Class without prototype";x.defineProperty(c.prototype,a,d);!1!=d.enumerable&&c._properties_.push(a)}}function i(c){var a;switch(c){case null:return null;case void 0:return}switch(D.call(c)){case OBJECT_CLASS:case OBJECT_TYPE:a=
{};for(var d in c)a[d]=i(c[d]);return a;case ARRAY_CLASS:a=[];for(d=0;d<c.length;d++)a[d]=i(c[d]);return a;default:return c}}function j(c){return!!(c&&1===c.nodeType)}function l(c){return"function"===typeof c}function m(c){return D.call(c)===STRING_CLASS}function t(c){return"undefined"===typeof c}function u(c,a){if(c){var d=c.className;return d&&0<d.length&&(d===a||RegExp("(^|\\s)"+a+"(\\s|$)").test(d))}}function y(){var c=arguments[0],a,d=1;if(c){for(;d<arguments.length;d++)a=arguments[d],u(c,a)||
(c.className=(c.className?c.className+" ":"")+a);return c}}function z(){var c=arguments[0],a,d=1;if(c&&c.className){for(;d<arguments.length;d++)a=arguments[d],c.className=A(c.className.replace(RegExp("(^|\\s+)"+a+"(\\s+|$)")," "));return c}}function A(c){return!m(c)?"":c.replace(/^\s+/,"").replace(/\s+$/,"")}function v(c){if(!m(c))return"";var a=c.split("-"),d=a.length;if(1===d)return a[0];for(var c="-"===c.charAt(0)?a[0].charAt(0).toUpperCase()+a[0].substring(1):a[0],b=1;b<d;b++)c+=a[b].charAt(0).toUpperCase()+
a[b].substring(1);return c}function w(c){if(!j(c))return{};var a=q(c,"display"),d=c.style,b=d.visibility,f=d.position,e=d.display,g=0,h=0;if("none"!==a&&null!==a)return{width:c.offsetWidth,height:c.offsetHeight};d.visibility="hidden";d.position="absolute";d.display="block";g=c.clientWidth;h=c.clientHeight;d.display=e;d.position=f;d.visibility=b;return{width:g,height:h}}function q(c,a){if(j(c)){var a="float"===a?"cssFloat":v(a),d=c.style[a];if(!d||"auto"===d)d=(d=r.defaultView.getComputedStyle(c,null))?
d[a]:null;return"opacity"===a?d?parseFloat(d):1:"auto"===d?null:d}}function P(c,a){if(j(c)){var d=c.style;t(a)&&d.removeProperty("opacity");d.opacity=1===a||""===a?"":1.0E-5>a?0:a}}function Q(c,a){if(!c)return null;if(!a&&c.getBoundingClientRect){var d=c.getBoundingClientRect();if(d)return new k.Point(d.left,d.top)}for(var b=d=0,f=c;f;){var e=0,g=0;f!=c&&(e=parseInt(f.currentStyle?f.currentStyle.borderLeftWidth:0,0),g=parseInt(f.currentStyle?f.currentStyle.borderTopWidth:0,0),e=isNaN(e)?0:e,g=isNaN(g)?
0:g);d+=f.offsetLeft-f.scrollLeft+e;b+=f.offsetTop-f.scrollTop+g;f=f.offsetParent}return new k.Point(d,b)}function R(c){var a=Q(c);return{width:c.offsetWidth,height:c.offsetWidth,left:a.x,top:a.y}}function X(c){return c&&c.getBoundingClientRect?c.getBoundingClientRect():null}function U(c){if(c&&c.childNodes)for(var a=c.childNodes.length;a--;)c.removeChild(c.firstChild)}function Y(c,a){c&&c.style?c.style.webkitTransform=a:console.warn("setElementTransform, elem null or without style")}function Z(c){if(c)return window.getComputedStyle(c).webkitTransform}
function o(c,a){c&&c.style?c.style.msTransform=a:console.warn("setElementTransform, elem null or without style")}function H(c){if(c)return window.getComputedStyle(c).msTransform}function p(c,a){c&&c.style?c.style.MozTransform=a:console.warn("setElementTransform, elem null or without style")}function C(c){if(c)return window.getComputedStyle(c).MozTransform}function I(c,a){if(!B){var d=r.createElement("style");d.appendChild(r.createTextNode(""));head=r.getElementsByTagName("head")[0];head.appendChild(d);
B=r.styleSheets[r.styleSheets.length-1]}d=0;B.cssRules?d=B.cssRules.length:B.rules&&(d=B.rules.length);B.insertRule?B.insertRule(c+" {"+a+"}",d):B.addRule&&B.addRule(c,a,d)}var k=this.vs=this.vs||{},x=k.util={};a.prototype={x:0,y:0,matrixTransform:function(c){var b=new CSSMatrix,b=b.translate(this.x,this.y,this.z||0),c=c.multiply(b),d=new a(c.m41,c.m42);delete b;delete c;return d}};k.Point=a;var r="undefined"!=typeof window?window.document:null,J=r?r.createElement("vstestelem"):null,s=J?J.style:null,
K=/\/Date\((-?\d+)\)\//;s&&(void 0!==s.webkitTransform?k.SUPPORT_3D_TRANSFORM="WebKitCSSMatrix"in window&&"m11"in new WebKitCSSMatrix:void 0!==s.MozTransform?k.SUPPORT_3D_TRANSFORM="MozPerspective"in s:void 0!==s.msTransform&&(k.SUPPORT_3D_TRANSFORM="MSCSSMatrix"in window&&"m11"in new MSCSSMatrix),k.CSS_VENDOR=function(){for(var c=["MozT","msT","OT","webkitT","t"],a,d=c.length;--d;)if(a=c[d]+"ransform",a in s)return c[d].substr(0,c[d].length-1);return null}());k.SUPPORT_CSS_TRANSFORM=null!==k.CSS_VENDOR?
!0:!1;k.CSSMatrix="WebKitCSSMatrix"in window?window.WebKitCSSMatrix:"MSCSSMatrix"in window?window.MSCSSMatrix:FirminCSSMatrix;k.CSSMatrix.prototype.isAffine||(k.CSSMatrix.prototype.isAffine=function(){return!(this.m13||this.m14||this.m23||this.m24||this.m31||this.m32||1!==this.m33&&this.m34||this.m43||1!==this.m44)});k.CSSMatrix.prototype.getMatrix3dStr=function(){return"matrix3d("+[this.m11,this.m12,this.m13,this.m14,this.m21,this.m22,this.m23,this.m24,this.m31,this.m32,this.m33,this.m34,this.m41,
this.m42,this.m43,this.m44].join(", ")+")"};k.requestAnimationFrame=(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(c){window.setTimeout(c,1E3/60)}).bind(window);k.cancelRequestAnimationFrame=(window.cancelRequestAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||clearTimeout).bind(window);
k.util.extend=Object.defineProperty?e:b;var E="function"===typeof Object.keys?Object.keys:function(c){var a=[],d;for(d in c)Object.prototype.hasOwnProperty.call(c,d)&&a.push(d);return a};NULL_TYPE="Null";UNDEFINED_TYPE="Undefined";BOOLEAN_TYPE="Boolean";NUMBER_TYPE="Number";STRING_TYPE="String";OBJECT_TYPE="Object";BOOLEAN_CLASS="[object Boolean]";NUMBER_CLASS="[object Number]";STRING_CLASS="[object String]";ARRAY_CLASS="[object Array]";OBJECT_CLASS="[object Object]";var D=Object.prototype.toString,
L=Array.isArray||function(c){return D.call(c)===ARRAY_CLASS},G,F;s&&void 0!==s.webkitTransform?(G=Y,F=Z):s&&void 0!==s.msTransform?(G=o,F=H):s&&void 0!==s.MozTransform&&(G=p,F=C);Array.prototype._remove=function(c,a){var d=this.slice((a||c)+1||this.length);this.length=0>c?this.length+c:c;return this.push.apply(this,d)};var M=function(c,a){for(var d=this.length,a=a?a:0,a=0>a?0:a;a<d;){if(this[a]===c)return a;a++}return-1};Array.prototype.findItem=Array.prototype.indexOf?Array.prototype.indexOf:M;Array.prototype.remove=
function(a,b){if("object"===typeof a||x.isString(a))for(var d=0;d<this.length;)this[d]===a?this._remove(d):d++;else this._remove(a,b);return this};Array.prototype.removeAll=function(){for(;0<this.length;)this._remove(0);return this};Array.prototype.clone=function(){return this.slice()};var B=null;k._current_platform_id=0;x.extend(x,{vsTestElem:J,vsTestStyle:s,extendClass:function(a,b){if(a&&b&&a.prototype&&b.prototype)try{if(Object.__proto__)a.prototype.__proto__=b.prototype;else{var d=a.prototype;
a.prototype=new b;x.extend(a.prototype,d)}a._properties_||(a._properties_=[]);b._properties_&&(a._properties_=a._properties_.concat(b._properties_));return a}catch(f){console.error(f.message())}},defineProperty:Object.defineProperty?f:g,defineClassProperty:h,defineClassProperties:function(a,b){if(!a.prototype)throw"defineClassProperties on a Class without prototype";for(var b=Object(b),d=E(b),f=0;f<d.length;f++)h(a,d[f],b[d[f]])},clone:i,free:function(a){a&&(a._free&&a._free(),a.destructor&&a.destructor(),
delete a)},toJSON:function(a){return JSON.stringify(a)},isElement:j,isArray:L,isFunction:l,isString:m,isNumber:function(a){return"number"===typeof a&&isFinite(a)||a instanceof Number},isUndefined:t,hasClassName:u,addClassName:y,removeClassName:z,toggleClassName:function(a,b){return!a?void 0:u(a,b)?z(a,b):y(a,b)},htmlEncode:function(a){return!m(a)?"":a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},strip:A,camelize:v,capitalize:function(a){return!m(a)?"":a.charAt(0).toUpperCase()+
a.substring(1).toLowerCase()},underscore:function(a){return!m(a)?"":a.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/-/g,"_").toLowerCase()},parseJSON:function(a){function b(a){if(m(a)){var c=K.exec(a);c&&c[1]&&(a=new Date(parseInt(c[1])))}else if(L(a))for(c=0;c<a.length;c++)a[c]=b(a[c]);else if(!(a instanceof Date)&&a instanceof Object)for(c in a)a[c]=b(a[c]);return a}if(!a)return null;var d=JSON.parse(a);return!K.test(a)?d:b(d)},addCssRule:I,
addCssRules:function(a,b){if(L(b))for(var d=b.length;d--;)I(a,b[d])},getElementHeight:function(a){return!j(a)?void 0:w(a).height},getElementWidth:function(a){return!j(a)?void 0:w(a).width},getElementDimensions:w,getElementStyle:q,setElementStyle:function(a,b){if(j(a)){var d=a.style,f;for(f in b)"opacity"===f?P(a,b[f]):(b[f]||d.removeProperty(f),d["float"===f||"cssFloat"===f?t(d.styleFloat)?"cssFloat":"styleFloat":f]=b[f])}},setElementOpacity:P,getElementOpacity:function(a){return!j(a)?void 0:q(a,
"opacity")},getElementAbsolutePosition:Q,setElementPos:function(a,b,d){a&&(a=a.style,a.left=b+"px",a.top=d+"px")},setElementSize:function(a,b,d){a&&(a=a.style,a.width=b+"px",a.height=d+"px")},setElementVisibility:function(a,b){if(a){var d=a.style;d||x.isString(a.innerHTML)?d.visibility=b?"visible":"hidden":b?a.setAttribute("visibility","visible"):a.setAttribute("visibility","hidden")}},isElementVisible:function(a){if(!a)return!1;var b=a.style;return b||x.isString(a.innerHTML)?"hidden"===b.visibility?
!1:!0:a instanceof CharacterData?!0:"hidden"===a.getAttribute("visibility")?!1:!0},removeAllElementChild:U,safeInnerHTML:function(a,b){a&&m(b)&&(window.MSApp&&window.MSApp.execUnsafeLocalFunction?window.MSApp.execUnsafeLocalFunction(function(){a.innerHTML=b}):(window.toStaticHTML&&(b=window.toStaticHTML(b)),a.innerHTML=b))},setElementInnerText:function(a,b){if(a){U(a);x.isString(b)||(b=void 0===b?"":null===b?"":x.isNumber(b)?""+b:b.toString?b.toString():"");var d=b.split("\n"),f=0;if(d.length){a.appendChild(r.createTextNode(d[f]));
for(f++;f<d.length;f++)a.appendChild(r.createElement("br")),a.appendChild(r.createTextNode(d[f]))}}},setElementTransform:G,getElementTransform:F,setElementTransformOrigin:function(a,b){a&&a.style?a.style["-"+k.CSS_VENDOR.toLowerCase()+"-transform-origin"]=b:console.warn("setElementTransformOrigin, elem null or without style")},getBoundingClientRect:J&&J.getBoundingClientRect?X:R,importFile:function(a,b,d,f){b||(b=r);var e;if("js"===f||0<=a.search("\\.js"))return f=b.createElement("script"),f.setAttribute("type",
"text/javascript"),f.setAttribute("src",a),d&&(f.onload=function(){d.call(this,a)}),b.head||(b.head=b.querySelector("head")),b.head.appendChild(f),f;if("css"===f||0<=a.search("\\.css")){e=b.createElement("link");e.setAttribute("rel","stylesheet");e.setAttribute("type","text/css");e.setAttribute("href",a);e.setAttribute("media","screen");if(x.isFunction(d)){var g=0;(function(){!e.sheet||!e.sheet.cssRules?100>g++?cssTimeout=setTimeout(arguments.callee,100):console.error("CSS load of "+a+" failed!"):
e.sheet.cssRules&&0===e.sheet.cssRules.length?console.error("CSS load of "+a+" failed!"):d.call(r,a)})()}b.head||(b.head=b.querySelector("head"));b.head.appendChild(e);return e}},setActiveStyleSheet:function(a){var b=0,d=r.getElementsByTagName("link"),f,e;k._current_platform_id=a;var g=k.Application_applications;if(g)for(e in g)b=g[e],b.view&&(b.view.style.display="none");for(b=0;b<d.length;b++)f=d[b],f.getAttribute("title")&&(f.getAttribute("title")!==a?f.setAttribute("disabled",!0):f.removeAttribute("disabled"));
if(g)for(e in g)b=g[e],b.view&&(b.view.style.display="block")},preloadTemplate:function(a){var b=a+".xhtml",f;if(!k.ui||!k.ui.View||!k.ui.View.__comp_templates[b])f=new XMLHttpRequest,f.open("GET",b,!1),f.send(null),4===f.readyState?200===f.status||0===f.status?(data=f.responseText,k.ui&&k.ui.View&&(k.ui.View.__comp_templates[b]=data)):console.error("Template file for component '"+a+"' unfound"):console.error("Pb when load the component '"+a+"' template")},__date_reg_exp:K,_findItem:M,_defineProperty_api1:g,
_defineProperty_api2:f,_extend_api1:b,_extend_api2:e})}).call(this);
(function(){function a(a){var b=a.vsGetCTM();e.setElementTransform(a,b.toString());delete b}var b=this.vs,e=b.util,g=b&&b.CSSMatrix;e.extend((window&&window.HTMLElement).prototype,{_vs_node_tx:0,_vs_node_ty:0,_vs_node_s:1,_vs_node_r:0,vsTranslate:function(b,e){this._vs_node_tx===b&&this._vs_node_ty===e||(this._vs_node_tx=b,this._vs_node_ty=e,a(this))},vsRotate:function(b){this._vs_node_r!==b&&(this._vs_node_r=b,a(this))},vsScale:function(b){this._vs_node_s!==b&&(this._vs_node_s=b,a(this))},vsSetNewTransformOrigin:function(a){if(a){this._vs_node_origin||
(this._vs_node_origin=[0,0]);var b=new g,b=b.translate(this._vs_node_origin[0],this._vs_node_origin[1],0),b=b.translate(this._vs_node_tx,this._vs_node_ty,0),b=b.rotate(0,0,this._vs_node_r),b=b.scale(this._vs_node_s,this._vs_node_s,1),b=b.translate(-this._vs_node_origin[0],-this._vs_node_origin[1],0);this._vs_transform||(this._vs_transform=b);this._vs_transform=b.multiply(this._vs_transform);delete b;this._vs_node_ty=this._vs_node_tx=0;this._vs_node_s=1;this._vs_node_r=0;this._vs_node_origin=[a.x,
a.y]}},vsClearTransformStack:function(){this._vs_transform&&delete this._vs_transform;this._vs_transform=void 0},vsGetCTM:function(){var a=new g;this._vs_node_origin||(this._vs_node_origin=[0,0]);a=a.translate(this._vs_node_origin[0],this._vs_node_origin[1],0);a=a.translate(this._vs_node_tx,this._vs_node_ty,0);a=a.rotate(0,0,this._vs_node_r);a=a.scale(this._vs_node_s,this._vs_node_s,1);a=a.translate(-this._vs_node_origin[0],-this._vs_node_origin[1],0);return this._vs_transform?a.multiply(this._vs_transform):
a},vsGetParentCTM:function(){function a(b){return!b?new g:a(b.parentNode).multiply(b.vsGetCTM())}return a(this.parentNode)}})}).call(this);
(function(){function a(a,b,c){this.configureWithEvent(a);this.type=b;this.identifier=c}function b(b,c){var d=[];b.nbPointers=b.touches.length;for(var f=0;f<b.nbPointers;f++){var e=b.touches[f],e=new a(e,s.TOUCH,e.identifier);d.push(e)}b.pointerList=d;d=[];for(f=0;f<b.targetTouches.length;f++)e=b.targetTouches[f],c&&K[e.identifier]!=c||(e=new a(e,s.TOUCH,e.identifier),d.push(e));b.targetPointerList=d;d=[];for(f=0;f<b.changedTouches.length;f++)e=b.changedTouches[f],e=new a(e,s.TOUCH,e.identifier),d.push(e);
b.changedPointerList=d}function e(b,c){var d=[];d.push(new a(b,s.MOUSE,J));c?(b.nbPointers=0,b.pointerList=[],b.targetPointerList=d,b.changedPointerList=d):(b.nbPointers=1,b.pointerList=d,b.targetPointerList=d,b.changedPointerList=[])}function g(b,c){var d=[],f=[],e=b.pointerId,g=E[e];if(c){g?(D[e]=g,delete E[e]):(g=D[e],g||(g=new a(b,b.pointerType,e),D[e]=g));for(e in D)f.push(D[e]);D={}}else g?g.configureWithEvent(b):(g=new a(b,b.pointerType,e),E[e]=g);for(e in E)d.push(E[e]);b.nbPointers=d.length;
b.pointerList=d;d=[];for(e in E)g=E[e],d.push(g);b.targetPointerList=d;b.changedPointerList=f}function f(a,b){e(a);b(a)}function h(a,b){e(a);b(a)}function i(a,b){e(a,!0);b(a)}function j(a,c,d){for(var f,e=a.targetTouches.length,g=0;g<e;g++)f=a.targetTouches[g],K[f.identifier]=d;b(a);c(a)}function l(a,c,d){b(a,d);c(a)}function m(a,c){for(var d,f=a.targetTouches.length,e=0;e<f;e++)d=a.changedTouches[e],K[d.identifier]=void 0;b(a);c(a)}function t(a,c){b(a);c(a,c)}function u(a,b,c){K[a.pointerId]=c;g(a,
!1,c);b(a);0===L&&(document.addEventListener("MSPointerUp",G),document.addEventListener("MSPointerCancel",G));L++}function y(a,b,c){g(a,!1,c);b(a)}function z(a,b){g(a,!0);b(a)}function A(a,b){g(a,!0);b(a)}function v(a,b,c){if(!b||!c||!c.__event_listeners)return-1;for(var d=0;d<c.__event_listeners.length;d++){var e=c.__event_listeners[d];if(e.target===a&&e.type===b&&e.listener===c)return d}return-1}function w(a,b,c,d){var e=d.listener?d.listener.id:void 0;switch(b){case I:return d.handler=function(a){F(a,
c,e)},!0;case k:return d.handler=function(a){M(a,c,e)},!0;case x:return d.handler=function(a){pointerEndHandler(a,c)},!0;case r:return d.handler=function(a){B(a,c)},!0}return!1}function q(a,b,c){var d=document.createEvent("Event");d.initEvent(a,!0,!0);for(var e in c)d[e]=c[e];b.dispatchEvent(d)}function P(a,b){var c=b.pageX-a.pageX,d=b.pageY-a.pageY;return Math.sqrt(c*c+d*d)}function Q(a){var b=a.length,c=0,d=0,e=0;if(0===b)return{X:0,y:0};for(;c<b;c++)var f=a[c],d=d+f.pageX,e=e+f.pageY;return{x:d/
b-$.x,y:e/b-$.y}}function R(b){b.centroid={x:b.pageX,y:b.pageY};b.translation=[b.centroid.x-N.x,b.centroid.y-N.y];b.pointerList=[new a(b,s.TOUCH,J)];b.targetPointerList=b.pointerList;b.nbPointers=1}function X(a,b,e,f){var g=f.listener?f.listener.id:void 0;switch(b){case c:return f.gesture_handler=function(a){F(a,ea,g)},a.addEventListener(o.POINTER_START,f.gesture_handler),f.handler=e,!0;case n:case d:return f.handler=e,!0}return!1}function U(a,b,e,f){switch(b){case c:return f.handler=function(a){N=
{x:a.pageX,y:a.pageY};R(a);e(a)},!0;case n:return f.handler=function(a){R(a);e(a)},!0;case d:return f.handler=function(a){R(a);e(a)},!0}return!1}function Y(a,b,e){var f=e.listener?e.listener.id:void 0;switch(b){case c:return a.removeEventListener(o.POINTER_START,e.gesture_handler,f),!0;case n:case d:return!0}return!1}function Z(a,b){switch(b){case c:case n:case d:return!0}return!1}var o=this.vs=this.vs||{},H=o.util=o.util||{},p=!1,C=window.navigator.msPointerEnabled;if("undefined"!=typeof document&&
"createTouch"in document)p=!0;else if(C)p=!0;else if("undefined"!=typeof document&&window.navigator&&window.navigator.userAgent&&(-1!==window.navigator.userAgent.indexOf("Android")||-1!==window.navigator.userAgent.indexOf("BlackBerry")))p=!0;var I,k,x,r;p?(I=C?"MSPointerDown":"touchstart",k=C?"MSPointerMove":"touchmove",x=C?"MSPointerUp":"touchend",r=C?"MSPointerCancel":"touchcancel"):(I="mousedown",k="mousemove",r=x="mouseup");var J=31337;a.prototype.configureWithEvent=function(a){this.pageX=a.pageX;
this.pageY=a.pageY;this.clientX=a.clientX;this.clientY=a.clientY;this.target=a.target;this.currentTarget=a.currentTarget};var s={TOUCH:2,PEN:3,MOUSE:4},K=[],E={},D={},L=0,G=function(a){if(a=E[a.pointerId])D[a.identifier]=a,delete E[a.identifier];L--;0===L&&(document.removeEventListener("MSPointerUp",G),document.removeEventListener("MSPointerCancel",G))},F,M,B;p?C?(F=u,M=y,pointerEndHandler=z,B=A):(F=j,M=l,pointerEndHandler=m,B=t):(F=f,M=h,B=pointerEndHandler=i);o.createCustomEvent=q;o.removePointerListener=
function(a,b,c,d){if(c){var e=v(a,b,c);if(-1===e)console.error("removePointerListener no binding");else{var f=c.__event_listeners[e];c.__event_listeners.remove(e);a:{switch(b){case I:case k:case x:case r:c=!0;break a}c=!1}c||fa(a,b,f);a.removeEventListener(b,f.handler,d);delete f}}else console.error("removePointerListener no listener")};o.addPointerListener=function(a,b,c,d){if(c){var e=c;H.isFunction(c)||(e=c.handleEvent,H.isFunction(e)&&(e=e.bind(c)));if(-1!==v(a,b,c))console.error("addPointerListener binding already existing");
else{c.__event_listeners||(c.__event_listeners=[]);var f={target:a,type:b,listener:c};c.__event_listeners.push(f);!w(a,b,e,f)&&!ga(a,b,e,f)&&(f.handler=e);a.addEventListener(b,f.handler,d)}}else console.error("addPointerListener no listener")};o.PointerTypes=s;o.POINTER_START=I;o.POINTER_MOVE=k;o.POINTER_END=x;o.POINTER_CANCEL=r;var c,n,d,p={},C=["gesturestart","gesturechange","gestureend"];document.createElement("div");for(var T=0;T<C.length;T++){var O=C[T],O="on"+O,W=O in H.vsTestElem;W||(H.vsTestElem.setAttribute(O,
"return;"),W="function"==typeof H.vsTestElem[O]);p[C[T]]=W}p.gestures=p.gesturestart&&p.gesturechange&&p.gestureend;"MSGestureEvent"in window&&(p.msGestures=!0);p.gestures=!1;p.msGestures=!1;var ba=0,ca=0,N,$,S=function(a,b){var c=b?void 0:Q(a.targetPointerList);return{scale:b?void 0:P(a.targetPointerList[0],a.targetPointerList[1])/ba,rotation:b?void 0:180*Math.atan2(a.targetPointerList[1].pageY-a.targetPointerList[0].pageY,a.targetPointerList[1].pageX-a.targetPointerList[0].pageX)/Math.PI-ca,translation:b?
void 0:[c.x-N.x,c.y-N.y],nbPointers:a.nbPointers,pointerList:a.pointerList,targetPointerList:a.targetPointerList,centroid:c,changedPointerList:a.changedPointerList}},aa=!1,ea=function(a){2>a.targetPointerList.length||(aa?q(n,a.target,S(a)):(ba=P(a.targetPointerList[0],a.targetPointerList[1]),ca=180*Math.atan2(a.targetPointerList[1].pageY-a.targetPointerList[0].pageY,a.targetPointerList[1].pageX-a.targetPointerList[0].pageX)/Math.PI,$=H.getElementAbsolutePosition(a.targetPointerList[0].target,!0),
N=Q(a.targetPointerList),document.addEventListener(o.POINTER_MOVE,da),document.addEventListener(o.POINTER_END,V),document.addEventListener(o.POINTER_CANCEL,V),q(c,a.target,S(a)),aa=!0))},da=function(a){M(a,function(a){q(n,a.target,S(a))})},V=function(a){pointerEndHandler(a,function(a){2>a.targetPointerList.length?(document.removeEventListener(o.POINTER_MOVE,da),document.removeEventListener(o.POINTER_END,V),document.removeEventListener(o.POINTER_CANCEL,V),aa=!1,q(d,a.target,S(a,!0))):q(n,a.target,
S(a))})};p.msGestures?(c="MSGestureStart",n="MSGestureChange",d="MSGestureEnd"):p.gestures?(c="gesturestart",n="gesturechange",d="gestureend"):(c="_gesture_start",n="_gesture_change",d="_gesture_end");var ga=p.gestures||p.msGestures?U:X,fa=p.gestures||p.msGestures?Z:Y;o.GESTURE_START=c;o.GESTURE_CHANGE=n;o.GESTURE_END=d}).call(this);