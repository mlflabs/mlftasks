(window.webpackJsonp=window.webpackJsonp||[]).push([[171],{xz6d:function(l,n,u){"use strict";u.r(n);var e=u("CcnG"),t=(u("OO+k"),u("qXBG")),r=function(l,n,u,e){return new(u||(u=Promise))(function(t,r){function i(l){try{a(e.next(l))}catch(l){r(l)}}function o(l){try{a(e.throw(l))}catch(l){r(l)}}function a(l){l.done?t(l.value):new u(function(n){n(l.value)}).then(i,o)}a((e=e.apply(l,n||[])).next())})},i=function(l,n){var u,e,t,r,i={label:0,sent:function(){if(1&t[0])throw t[1];return t[1]},trys:[],ops:[]};return r={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function o(r){return function(o){return function(r){if(u)throw new TypeError("Generator is already executing.");for(;i;)try{if(u=1,e&&(t=2&r[0]?e.return:r[0]?e.throw||((t=e.return)&&t.call(e),0):e.next)&&!(t=t.call(e,r[1])).done)return t;switch(e=0,t&&(r=[2&r[0],t.value]),r[0]){case 0:case 1:t=r;break;case 4:return i.label++,{value:r[1],done:!1};case 5:i.label++,e=r[1],r=[0];continue;case 7:r=i.ops.pop(),i.trys.pop();continue;default:if(!(t=(t=i.trys).length>0&&t[t.length-1])&&(6===r[0]||2===r[0])){i=0;continue}if(3===r[0]&&(!t||r[1]>t[0]&&r[1]<t[3])){i.label=r[1];break}if(6===r[0]&&i.label<t[1]){i.label=t[1],t=r;break}if(t&&i.label<t[2]){i.label=t[2],i.ops.push(r);break}t[2]&&i.ops.pop(),i.trys.pop();continue}r=n.call(l,i)}catch(l){r=[6,l],e=0}finally{u=t=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}([r,o])}}},o=function(){function l(l,n,u){this.auth=l,this.router=n,this.toastController=u,this.user={name:"",password:""},this.isLoading=!1}return l.prototype.ngOnInit=function(){},l.prototype.onSubmit=function(){return r(this,void 0,void 0,function(){var l,n;return i(this,function(u){switch(u.label){case 0:this.isLoading=!0,u.label=1;case 1:return u.trys.push([1,3,,4]),[4,this.auth.login(this.user.name,this.user.password)];case 2:return l=u.sent(),console.log(l),!0===l.success||this.presentToast(l.data.message),[3,4];case 3:return n=u.sent(),console.log(n),[3,4];case 4:return this.isLoading=!1,[2]}})})},l.prototype.forgotPassword=function(){this.router.navigate(["forgotPassword"])},l.prototype.register=function(){this.router.navigate(["register"])},l.prototype.presentToast=function(l){return r(this,void 0,void 0,function(){return i(this,function(n){switch(n.label){case 0:return[4,this.toastController.create({message:l,duration:2e3})];case 1:return n.sent().present(),[2]}})})},l}(),a=function(){},s=u("pMnS"),b=u("ra/t"),c=u("ntG5"),d=u("gIcY"),g=u("M9A9"),p=u("ZYCi"),f=u("Zq1E"),C=u("Ip0R"),h=u("P87I"),m=e.qb({encapsulation:0,styles:[["ion-grid[_ngcontent-%COMP%]{width:100%;height:100%}ion-row[_ngcontent-%COMP%]{height:100%}ion-col[_ngcontent-%COMP%]{border:1px solid #488aff;background:#fff}ion-button[_ngcontent-%COMP%]{font-weight:300}@media (min-width:240px) and (max-width:768px){ion-grid[_ngcontent-%COMP%]{background:#fff}ion-col[_ngcontent-%COMP%]{border:none}}"]],data:{}});function v(l){return e.Hb(0,[(l()(),e.sb(0,0,null,null,2,"ion-label",[["color","danger"],["position","stacked"]],null,null,null,b.O,b.o)),e.rb(1,49152,null,0,c.K,[e.i,e.l],{color:[0,"color"],position:[1,"position"]},null),(l()(),e.Gb(-1,0,[" Valid email is required "]))],function(l,n){l(n,1,0,"danger","stacked")},null)}function k(l){return e.Hb(0,[(l()(),e.sb(0,0,null,null,2,"ion-label",[["color","danger"],["position","stacked"]],null,null,null,b.O,b.o)),e.rb(1,49152,null,0,c.K,[e.i,e.l],{color:[0,"color"],position:[1,"position"]},null),(l()(),e.Gb(-1,0,[" Password is required "]))],function(l,n){l(n,1,0,"danger","stacked")},null)}function w(l){return e.Hb(0,[(l()(),e.sb(0,0,null,null,1,"ion-spinner",[["color","primary"],["name","dots"],["slot","middle"]],null,null,null,b.U,b.u)),e.rb(1,49152,null,0,c.nb,[e.i,e.l],{color:[0,"color"],name:[1,"name"]},null)],function(l,n){l(n,1,0,"primary","dots")},null)}function y(l){return e.Hb(0,[(l()(),e.sb(0,0,null,null,10,"ion-header",[],null,null,null,b.K,b.k)),e.rb(1,49152,null,0,c.y,[e.i,e.l],null,null),(l()(),e.sb(2,0,null,0,8,"ion-toolbar",[],null,null,null,b.Z,b.y)),e.rb(3,49152,null,0,c.xb,[e.i,e.l],null,null),(l()(),e.sb(4,0,null,0,3,"ion-buttons",[["slot","start"]],null,null,null,b.D,b.d)),e.rb(5,49152,null,0,c.g,[],null,null),(l()(),e.sb(6,0,null,0,1,"ion-menu-button",[],null,null,null,b.Q,b.r)),e.rb(7,49152,null,0,c.O,[e.i,e.l],null,null),(l()(),e.sb(8,0,null,0,2,"ion-title",[],null,null,null,b.Y,b.z)),e.rb(9,49152,null,0,c.yb,[e.i,e.l],null,null),(l()(),e.Gb(-1,0,["login"])),(l()(),e.sb(11,0,null,null,59,"ion-content",[["padding",""]],null,null,null,b.F,b.f)),e.rb(12,49152,null,0,c.r,[e.i,e.l],null,null),(l()(),e.sb(13,0,null,0,57,"ion-grid",[],null,null,null,b.J,b.j)),e.rb(14,49152,null,0,c.x,[e.i,e.l],null,null),(l()(),e.sb(15,0,null,0,55,"ion-row",[["justify-content-center",""]],null,null,null,b.T,b.t)),e.rb(16,49152,null,0,c.db,[],null,null),(l()(),e.sb(17,0,null,0,53,"ion-col",[["align-self-center",""],["size-lg","5"],["size-md","6"],["size-xs","12"]],null,null,null,b.E,b.e)),e.rb(18,49152,null,0,c.q,[e.i,e.l],null,null),(l()(),e.sb(19,0,null,0,51,"form",[["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngSubmit"],[null,"submit"],[null,"reset"]],function(l,n,u){var t=!0,r=l.component;return"submit"===n&&(t=!1!==e.Cb(l,21).onSubmit(u)&&t),"reset"===n&&(t=!1!==e.Cb(l,21).onReset()&&t),"ngSubmit"===n&&(t=!1!==r.onSubmit()&&t),t},null,null)),e.rb(20,16384,null,0,d.m,[],null,null),e.rb(21,4210688,[["userForm",4]],0,d.i,[[8,null],[8,null]],null,{ngSubmit:"ngSubmit"}),e.Eb(2048,null,d.a,null,[d.i]),e.rb(23,16384,null,0,d.h,[[4,d.a]],null,null),(l()(),e.sb(24,0,null,null,2,"div",[["text-center",""]],null,null,null,null,null)),(l()(),e.sb(25,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),e.Gb(-1,null,["Login Form"])),(l()(),e.sb(27,0,null,null,28,"div",[["padding",""]],null,null,null,null,null)),(l()(),e.sb(28,0,null,null,11,"ion-item",[],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==e.Cb(l,30).onClick(u)&&t),t},b.N,b.n)),e.rb(29,49152,null,0,c.E,[e.i,e.l],null,null),e.rb(30,16384,null,0,g.a,[[2,p.l],e.l],null,null),(l()(),e.sb(31,0,null,0,8,"ion-input",[["id","name"],["name","name"],["placeholder","Email or Username"],["required",""],["type","text"]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionChange"],[null,"ionBlur"]],function(l,n,u){var t=!0,r=l.component;return"ionChange"===n&&(t=!1!==e.Cb(l,34)._handleInputEvent(u.target.value)&&t),"ionBlur"===n&&(t=!1!==e.Cb(l,34)._handleBlurEvent()&&t),"ngModelChange"===n&&(t=!1!==(r.user.name=u)&&t),t},b.M,b.m)),e.rb(32,16384,null,0,d.k,[],{required:[0,"required"]},null),e.Eb(1024,null,d.d,function(l){return[l]},[d.k]),e.rb(34,16384,null,0,f.a,[e.l],null,null),e.Eb(1024,null,d.e,function(l){return[l]},[f.a]),e.rb(36,671744,[["name",4]],0,d.j,[[2,d.a],[6,d.d],[8,null],[6,d.e]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e.Eb(2048,null,d.f,null,[d.j]),e.rb(38,16384,null,0,d.g,[[4,d.f]],null,null),e.rb(39,49152,null,0,c.D,[e.i,e.l],{name:[0,"name"],placeholder:[1,"placeholder"],required:[2,"required"],type:[3,"type"]},null),(l()(),e.sb(40,0,null,null,11,"ion-item",[],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==e.Cb(l,42).onClick(u)&&t),t},b.N,b.n)),e.rb(41,49152,null,0,c.E,[e.i,e.l],null,null),e.rb(42,16384,null,0,g.a,[[2,p.l],e.l],null,null),(l()(),e.sb(43,0,null,0,8,"ion-input",[["id","password"],["name","password"],["placeholder","Password"],["required",""],["type","password"]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionChange"],[null,"ionBlur"]],function(l,n,u){var t=!0,r=l.component;return"ionChange"===n&&(t=!1!==e.Cb(l,46)._handleInputEvent(u.target.value)&&t),"ionBlur"===n&&(t=!1!==e.Cb(l,46)._handleBlurEvent()&&t),"ngModelChange"===n&&(t=!1!==(r.user.password=u)&&t),t},b.M,b.m)),e.rb(44,16384,null,0,d.k,[],{required:[0,"required"]},null),e.Eb(1024,null,d.d,function(l){return[l]},[d.k]),e.rb(46,16384,null,0,f.a,[e.l],null,null),e.Eb(1024,null,d.e,function(l){return[l]},[f.a]),e.rb(48,671744,[["password",4]],0,d.j,[[2,d.a],[6,d.d],[8,null],[6,d.e]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e.Eb(2048,null,d.f,null,[d.j]),e.rb(50,16384,null,0,d.g,[[4,d.f]],null,null),e.rb(51,49152,null,0,c.D,[e.i,e.l],{name:[0,"name"],placeholder:[1,"placeholder"],required:[2,"required"],type:[3,"type"]},null),(l()(),e.jb(16777216,null,null,1,null,v)),e.rb(53,16384,null,0,C.i,[e.R,e.O],{ngIf:[0,"ngIf"]},null),(l()(),e.jb(16777216,null,null,1,null,k)),e.rb(55,16384,null,0,C.i,[e.R,e.O],{ngIf:[0,"ngIf"]},null),(l()(),e.sb(56,0,null,null,14,"div",[["padding",""],["text-center",""]],null,null,null,null,null)),(l()(),e.jb(16777216,null,null,1,null,w)),e.rb(58,16384,null,0,C.i,[e.R,e.O],{ngIf:[0,"ngIf"]},null),(l()(),e.sb(59,0,null,null,3,"ion-button",[["expand","block"],["size","large"],["type","submit"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==e.Cb(l,61).onClick(u)&&t),t},b.C,b.c)),e.rb(60,49152,null,0,c.f,[e.i,e.l],{disabled:[0,"disabled"],expand:[1,"expand"],size:[2,"size"],type:[3,"type"]},null),e.rb(61,16384,null,0,g.a,[[2,p.l],e.l],null,null),(l()(),e.Gb(-1,0,["Login"])),(l()(),e.sb(63,0,null,null,3,"ion-button",[["expand","block"],["size","large"]],null,[[null,"click"]],function(l,n,u){var t=!0,r=l.component;return"click"===n&&(t=!1!==e.Cb(l,65).onClick(u)&&t),"click"===n&&(t=!1!==r.register()&&t),t},b.C,b.c)),e.rb(64,49152,null,0,c.f,[e.i,e.l],{expand:[0,"expand"],size:[1,"size"]},null),e.rb(65,16384,null,0,g.a,[[2,p.l],e.l],null,null),(l()(),e.Gb(-1,0,["Register"])),(l()(),e.sb(67,0,null,null,3,"ion-button",[["size","small"]],null,[[null,"click"]],function(l,n,u){var t=!0,r=l.component;return"click"===n&&(t=!1!==e.Cb(l,69).onClick(u)&&t),"click"===n&&(t=!1!==r.forgotPassword()&&t),t},b.C,b.c)),e.rb(68,49152,null,0,c.f,[e.i,e.l],{size:[0,"size"]},null),e.rb(69,16384,null,0,g.a,[[2,p.l],e.l],null,null),(l()(),e.Gb(-1,0,["Forgot Password"]))],function(l,n){var u=n.component;l(n,32,0,""),l(n,36,0,"name",u.user.name),l(n,39,0,"name","Email or Username","","text"),l(n,44,0,""),l(n,48,0,"password",u.user.password),l(n,51,0,"password","Password","","password"),l(n,53,0,!e.Cb(n,36).valid&&!e.Cb(n,36).pristine),l(n,55,0,!e.Cb(n,48).valid&&!e.Cb(n,48).pristine),l(n,58,0,u.isLoading),l(n,60,0,!e.Cb(n,21).valid,"block","large","submit"),l(n,64,0,"block","large"),l(n,68,0,"small")},function(l,n){l(n,19,0,e.Cb(n,23).ngClassUntouched,e.Cb(n,23).ngClassTouched,e.Cb(n,23).ngClassPristine,e.Cb(n,23).ngClassDirty,e.Cb(n,23).ngClassValid,e.Cb(n,23).ngClassInvalid,e.Cb(n,23).ngClassPending),l(n,31,0,e.Cb(n,32).required?"":null,e.Cb(n,38).ngClassUntouched,e.Cb(n,38).ngClassTouched,e.Cb(n,38).ngClassPristine,e.Cb(n,38).ngClassDirty,e.Cb(n,38).ngClassValid,e.Cb(n,38).ngClassInvalid,e.Cb(n,38).ngClassPending),l(n,43,0,e.Cb(n,44).required?"":null,e.Cb(n,50).ngClassUntouched,e.Cb(n,50).ngClassTouched,e.Cb(n,50).ngClassPristine,e.Cb(n,50).ngClassDirty,e.Cb(n,50).ngClassValid,e.Cb(n,50).ngClassInvalid,e.Cb(n,50).ngClassPending)})}var x=e.ob("app-login",o,function(l){return e.Hb(0,[(l()(),e.sb(0,0,null,null,1,"app-login",[],null,null,null,y,m)),e.rb(1,114688,null,0,o,[t.a,p.l,h.a],null,null)],function(l,n){l(n,1,0)},null)},{},{},[]),P=u("95zI"),q=u("9opb"),E=u("apKv"),z=u("B4/3");u.d(n,"LoginPageModuleNgFactory",function(){return M});var M=e.pb(a,[],function(l){return e.zb([e.Ab(512,e.k,e.eb,[[8,[s.a,x]],[3,e.k],e.z]),e.Ab(4608,C.k,C.j,[e.w,[2,C.q]]),e.Ab(4608,d.n,d.n,[]),e.Ab(4608,P.a,P.a,[e.B,e.g]),e.Ab(4608,q.a,q.a,[P.a,e.k,e.s]),e.Ab(4608,E.a,E.a,[P.a,e.k,e.s]),e.Ab(1073742336,C.b,C.b,[]),e.Ab(1073742336,d.l,d.l,[]),e.Ab(1073742336,d.c,d.c,[]),e.Ab(1073742336,z.a,z.a,[]),e.Ab(1073742336,p.n,p.n,[[2,p.t],[2,p.l]]),e.Ab(1073742336,a,a,[]),e.Ab(1024,p.j,function(){return[[{path:"",component:o}]]},[])])})}}]);