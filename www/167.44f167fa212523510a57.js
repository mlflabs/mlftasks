(window.webpackJsonp=window.webpackJsonp||[]).push([[167],{"bFL/":function(n,t,l){"use strict";l.r(t);var e=l("CcnG"),o=l("EnSQ"),i=(l("OO+k"),l("IvfR")),u=Object.assign||function(n){for(var t,l=1,e=arguments.length;l<e;l++)for(var o in t=arguments[l])Object.prototype.hasOwnProperty.call(t,o)&&(n[o]=t[o]);return n},r=function(n,t,l,e){return new(l||(l=Promise))(function(o,i){function u(n){try{s(e.next(n))}catch(n){i(n)}}function r(n){try{s(e.throw(n))}catch(n){i(n)}}function s(n){n.done?o(n.value):new l(function(t){t(n.value)}).then(u,r)}s((e=e.apply(n,t||[])).next())})},s=function(n,t){var l,e,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:r(0),throw:r(1),return:r(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function r(i){return function(r){return function(i){if(l)throw new TypeError("Generator is already executing.");for(;u;)try{if(l=1,e&&(o=2&i[0]?e.return:i[0]?e.throw||((o=e.return)&&o.call(e),0):e.next)&&!(o=o.call(e,i[1])).done)return o;switch(e=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,e=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(n,u)}catch(n){i=[6,n],e=0}finally{l=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,r])}}},c=function(){function n(n,t,l,e){this.dataService=n,this.route=t,this.modalController=l,this.cdr=e,this.subscriptions=[],this.items=[],this.type="default",this.title="Tasks",this.icon="clipboard",this.newTaskInputFocused=!1}return n.prototype.ngOnInit=function(){return r(this,void 0,void 0,function(){var n,t,l,e,i,u,c,a=this;return s(this,function(b){switch(b.label){case 0:return console.log("ngOnInit"),console.log("Data: ",this.route.snapshot.data),(n=this.route.snapshot.data)&&(n.icon&&(this.icon=n.icon),n.title&&(this.title=n.title),n.type&&(this.type=n.type)),console.log("Tasks type: ",this.type),"category"!==this.type?[3,3]:(t=this.route.snapshot.paramMap.get("id"),console.log("Catid: ",t),l=this,[4,this.dataService.getDoc(t)]);case 1:return l.category=b.sent(),console.log("Category: ",this.category,t),null==this.category?[2]:(this.subscriptions[0]=this.dataService.subscribeCollectionChanges(o.c,1e3).subscribe(function(n){return r(a,void 0,void 0,function(){var t;return s(this,function(l){switch(l.label){case 0:return console.log("We are making changes to docs",n),n.category!==this.category._id?[2]:(t=this,[4,this.dataService.findDocsByCategory(this.category._id)]);case 1:return t.items=l.sent(),this.cdr.detectChanges(),[2]}})})}),e=this,[4,this.dataService.findDocsByCategory(this.category._id)]);case 2:return e.items=b.sent(),[3,10];case 3:return"important"!==this.type?[3,5]:(this.subscriptions[0]=this.dataService.subscribeCollectionChanges(o.c,1e3).subscribe(function(n){return r(a,void 0,void 0,function(){var t;return s(this,function(l){switch(l.label){case 0:return console.log("We are making changes to docs",n),t=this,[4,this.dataService.findAllDocsByPropertyNotNull("important")];case 1:return t.items=l.sent(),this.cdr.detectChanges(),[2]}})})}),i=this,[4,this.dataService.findAllDocsByPropertyNotNull("important")]);case 4:return i.items=b.sent(),[3,10];case 5:return"today"!==this.type?[3,7]:(this.subscriptions[0]=this.dataService.subscribeCollectionChanges(o.c,1e3).subscribe(function(n){return r(a,void 0,void 0,function(){var t;return s(this,function(l){switch(l.label){case 0:return console.log("We are making changes to docs",n),t=this,[4,this.dataService.findAllDocsByPropertyNotNull("today")];case 1:return t.items=l.sent(),this.cdr.detectChanges(),[2]}})})}),u=this,[4,this.dataService.findAllDocsByPropertyNotNull("today")]);case 6:return u.items=b.sent(),[3,10];case 7:return"default"!==this.type?[3,9]:(this.subscriptions[0]=this.dataService.subscribeCollectionChanges(o.c,1e3).subscribe(function(n){return r(a,void 0,void 0,function(){var t;return s(this,function(l){switch(l.label){case 0:return console.log("We are making changes to docs",n),"default"!==n.category?[2]:(t=this,[4,this.dataService.findDocsByCategory("default")]);case 1:return t.items=l.sent(),this.cdr.detectChanges(),[2]}})})}),c=this,[4,this.dataService.findDocsByCategory("default")]);case 8:return c.items=b.sent(),[3,10];case 9:b.label=10;case 10:return this.cdr.detectChanges(),[2]}})})},n.prototype.selectedItem=function(n){return r(this,void 0,void 0,function(){return s(this,function(t){switch(t.label){case 0:return console.log("selectedItem",n),[4,this.modalController.create({component:i.a,componentProps:{item:u({},n)}})];case 1:return t.sent().present(),[2]}})})},n.prototype.taskChecked=function(n){console.log("Task Checked: ",n);var t=n.done?null:Date.now();this.saveItem(u({},n,{done:t}))},n.prototype.saveItem=function(n){return r(this,void 0,void 0,function(){return s(this,function(t){switch(t.label){case 0:return console.log("Saving Test: ",this.item),[4,this.dataService.save(n,o.c)];case 1:return t.sent(),[2]}})})},n.prototype.removeItem=function(n){console.log("Deleting doc:: ",n),this.item={},this.dataService.remove(n._id)},n.prototype.selectedItem2=function(n){this.item=u({},n)},n.prototype.ngOnDestroy=function(){console.log("ngOnDestroy"),this.subscriptions.forEach(function(n){n.unsubscribe()})},n.prototype.add=function(){console.log("ADD")},n.prototype.newTaskFocus=function(){console.log("newTaskFocus"),this.newTaskInputFocused=!0},n.prototype.newTaskBlur=function(){console.log("newTaskBlur"),this.newTaskInputFocused=!1},n.prototype.newTaskKeyInput=function(n){if(console.log("newTaskKeyInput",n),"Enter"===n.code&&(console.log("ENTER"),null!=this.newTask)){var t="default";null!=this.category&&null!=this.category._id&&(t=this.category._id),this.saveItem({category:t,title:this.newTask}),this.newTask=""}},n.prototype.printDone=function(n){return n?"radio-button-on":"radio-button-off"},n.prototype.printDoneColor=function(n,t){return t?n?"success":"primary":"light"},n.prototype.printTitle=function(n){return null==n||""===n?"No Title":n},n}(),a=function(){},b=l("pMnS"),d=l("ra/t"),p=l("ntG5"),h=l("M9A9"),f=l("ZYCi"),g=l("Ip0R"),y=l("Zq1E"),m=l("gIcY"),v=l("9opb"),k=e.qb({encapsulation:0,styles:[[""]],data:{}});function w(n){return e.Hb(0,[(n()(),e.sb(0,0,null,null,3,"ion-text",[["color","medium"],["position","stacked"]],null,[[null,"click"]],function(n,t,l){var e=!0;return"click"===t&&(e=!1!==n.component.selectedItem(n.parent.context.$implicit)&&e),e},d.W,d.w)),e.rb(1,49152,null,0,p.tb,[e.i,e.l],{color:[0,"color"]},null),(n()(),e.sb(2,0,null,0,1,"sub",[],null,null,null,null,null)),(n()(),e.Gb(3,null,["",""]))],function(n,t){n(t,1,0,"medium")},function(n,t){n(t,3,0,t.parent.context.$implicit.note)})}function C(n){return e.Hb(0,[(n()(),e.sb(0,0,null,null,11,"ion-item",[],null,[[null,"click"]],function(n,t,l){var o=!0;return"click"===t&&(o=!1!==e.Cb(n,2).onClick(l)&&o),o},d.N,d.n)),e.rb(1,49152,null,0,p.E,[e.i,e.l],null,null),e.rb(2,16384,null,0,h.a,[[2,f.l],e.l],null,null),(n()(),e.sb(3,0,null,0,1,"ion-icon",[["color","secondary"],["slot","start"]],null,[[null,"click"]],function(n,t,l){var e=!0;return"click"===t&&(e=!1!==n.component.taskChecked(n.context.$implicit)&&e),e},d.L,d.l)),e.rb(4,49152,null,0,p.z,[e.i,e.l],{color:[0,"color"],name:[1,"name"]},null),(n()(),e.sb(5,0,null,0,6,"div",[["class","test"],["width","100%"]],null,null,null,null,null)),(n()(),e.sb(6,0,null,null,2,"ion-text",[],null,[[null,"click"]],function(n,t,l){var e=!0;return"click"===t&&(e=!1!==n.component.selectedItem(n.context.$implicit)&&e),e},d.W,d.w)),e.rb(7,49152,null,0,p.tb,[e.i,e.l],{color:[0,"color"]},null),(n()(),e.Gb(8,0,[" "," "])),(n()(),e.sb(9,0,null,null,0,"br",[],null,null,null,null,null)),(n()(),e.jb(16777216,null,null,1,null,w)),e.rb(11,16384,null,0,g.i,[e.R,e.O],{ngIf:[0,"ngIf"]},null)],function(n,t){var l=t.component;n(t,4,0,"secondary",l.printDone(t.context.$implicit.done)),n(t,7,0,e.ub(1,"",l.printDoneColor(t.context.$implicit.done,t.context.$implicit.title),"")),n(t,11,0,t.context.$implicit.note)},function(n,t){n(t,8,0,t.component.printTitle(t.context.$implicit.title))})}function T(n){return e.Hb(2,[(n()(),e.sb(0,0,null,null,10,"ion-header",[],null,null,null,d.K,d.k)),e.rb(1,49152,null,0,p.y,[e.i,e.l],null,null),(n()(),e.sb(2,0,null,0,8,"ion-toolbar",[],null,null,null,d.Z,d.y)),e.rb(3,49152,null,0,p.xb,[e.i,e.l],null,null),(n()(),e.sb(4,0,null,0,3,"ion-buttons",[["slot","start"]],null,null,null,d.D,d.d)),e.rb(5,49152,null,0,p.g,[],null,null),(n()(),e.sb(6,0,null,0,1,"ion-menu-button",[],null,null,null,d.Q,d.r)),e.rb(7,49152,null,0,p.O,[e.i,e.l],null,null),(n()(),e.sb(8,0,null,0,2,"ion-title",[],null,null,null,d.Y,d.z)),e.rb(9,49152,null,0,p.yb,[e.i,e.l],null,null),(n()(),e.Gb(10,0,["",""])),(n()(),e.sb(11,0,null,null,5,"ion-content",[],null,null,null,d.F,d.f)),e.rb(12,49152,null,0,p.r,[e.i,e.l],null,null),(n()(),e.sb(13,0,null,0,3,"ion-list",[["padding",""]],null,null,null,d.P,d.p)),e.rb(14,49152,null,0,p.L,[e.i,e.l],null,null),(n()(),e.jb(16777216,null,0,1,null,C)),e.rb(16,278528,null,0,g.h,[e.R,e.O,e.u],{ngForOf:[0,"ngForOf"]},null),(n()(),e.sb(17,0,null,null,14,"ion-footer",[],null,null,null,d.I,d.i)),e.rb(18,49152,null,0,p.w,[e.i,e.l],null,null),(n()(),e.sb(19,0,null,0,12,"ion-toolbar",[],null,null,null,d.Z,d.y)),e.rb(20,49152,null,0,p.xb,[e.i,e.l],null,null),(n()(),e.sb(21,0,null,0,3,"ion-buttons",[["slot","start"]],null,null,null,d.D,d.d)),e.rb(22,49152,null,0,p.g,[],null,null),(n()(),e.sb(23,0,null,0,1,"ion-icon",[["color","primary"],["name","add"],["slot","icon-only"]],null,null,null,d.L,d.l)),e.rb(24,49152,null,0,p.z,[e.i,e.l],{color:[0,"color"],name:[1,"name"]},null),(n()(),e.sb(25,0,null,0,6,"ion-input",[["clearInput","true"],["id","newTask"],["name","newTask"],["placeholder","Add new task"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionFocus"],[null,"ionBlur"],[null,"keypress"],[null,"ionChange"]],function(n,t,l){var o=!0,i=n.component;return"ionChange"===t&&(o=!1!==e.Cb(n,26)._handleInputEvent(l.target.value)&&o),"ionBlur"===t&&(o=!1!==e.Cb(n,26)._handleBlurEvent()&&o),"ngModelChange"===t&&(o=!1!==(i.newTask=l)&&o),"ionFocus"===t&&(o=!1!==i.newTaskFocus()&&o),"ionBlur"===t&&(o=!1!==i.newTaskBlur()&&o),"keypress"===t&&(o=!1!==i.newTaskKeyInput(l)&&o),o},d.M,d.m)),e.rb(26,16384,null,0,y.a,[e.l],null,null),e.Eb(1024,null,m.e,function(n){return[n]},[y.a]),e.rb(28,671744,null,0,m.j,[[8,null],[8,null],[8,null],[6,m.e]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e.Eb(2048,null,m.f,null,[m.j]),e.rb(30,16384,null,0,m.g,[[4,m.f]],null,null),e.rb(31,49152,null,0,p.D,[e.i,e.l],{clearInput:[0,"clearInput"],name:[1,"name"],placeholder:[2,"placeholder"],type:[3,"type"]},null)],function(n,t){var l=t.component;n(t,16,0,l.items),n(t,24,0,"primary","add"),n(t,28,0,"newTask",l.newTask),n(t,31,0,"true","newTask","Add new task","text")},function(n,t){n(t,10,0,t.component.title),n(t,25,0,e.Cb(t,30).ngClassUntouched,e.Cb(t,30).ngClassTouched,e.Cb(t,30).ngClassPristine,e.Cb(t,30).ngClassDirty,e.Cb(t,30).ngClassValid,e.Cb(t,30).ngClassInvalid,e.Cb(t,30).ngClassPending)})}var I=e.ob("app-tasks",c,function(n){return e.Hb(0,[(n()(),e.sb(0,0,null,null,1,"app-tasks",[],null,null,null,T,k)),e.rb(1,245760,null,0,c,[o.a,f.a,v.a,e.i],null,null)],function(n,t){n(t,1,0)},null)},{},{},[]),D=l("95zI"),A=l("apKv"),S=l("B4/3");l.d(t,"TasksPageModuleNgFactory",function(){return x});var x=e.pb(a,[],function(n){return e.zb([e.Ab(512,e.k,e.eb,[[8,[b.a,I]],[3,e.k],e.z]),e.Ab(4608,g.k,g.j,[e.w,[2,g.q]]),e.Ab(4608,m.n,m.n,[]),e.Ab(4608,D.a,D.a,[e.B,e.g]),e.Ab(4608,v.a,v.a,[D.a,e.k,e.s]),e.Ab(4608,A.a,A.a,[D.a,e.k,e.s]),e.Ab(1073742336,g.b,g.b,[]),e.Ab(1073742336,m.l,m.l,[]),e.Ab(1073742336,m.c,m.c,[]),e.Ab(1073742336,S.a,S.a,[]),e.Ab(1073742336,f.n,f.n,[[2,f.t],[2,f.l]]),e.Ab(1073742336,a,a,[]),e.Ab(1024,f.j,function(){return[[{path:"",component:c}]]},[])])})}}]);