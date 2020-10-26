(this.webpackJsonptodo_list_with_ts=this.webpackJsonptodo_list_with_ts||[]).push([[0],{101:function(t,e,a){t.exports=a(131)},106:function(t,e,a){},107:function(t,e,a){},131:function(t,e,a){"use strict";a.r(e);var r={};a.r(r),a.d(r,"selectTasks",(function(){return it}));var n={};a.r(n),a.d(n,"selectTodoList",(function(){return pt}));var s={};a.r(s),a.d(s,"selectStatus",(function(){return xt})),a.d(s,"selectIsInitialized",(function(){return wt}));var o={};a.r(o),a.d(o,"selectIsLoggedIn",(function(){return Ut}));var i=a(0),c=a.n(i),d=a(9),u=a.n(d);a(106),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(107);var l=a(179),p=a(180),f=a(170),m=a(133),b=a(174),h=a(182),v=a(181),k=a(183),g=a(188),L=a(185),j=a(22),E=a(7),y=a.n(E),I=a(14),O=function(t,e){t.messages.length?e.dispatch(U({error:t.messages[0]})):e.dispatch(U({error:"Some error occurred"})),e.dispatch(H({status:"failed"}))},T=function(t,e){e.dispatch(U(t.message?{error:t.message}:{error:"Some error occurred"})),e.dispatch(H({status:"failed"}))},x=a(82),w=a.n(x).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"90bf912e-ca5a-4b96-9037-858f400fe7a5"}}),C=function(){return w.get("auth/me")},S=function(t){return w.post("/auth/login",t)},W=function(){return w.delete("/auth/login")},A=a(17),V=Object(A.b)("auth/login",function(){var t=Object(I.a)(y.a.mark((function t(e,a){var r,n;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(H({status:"loading"})),t.prev=1,t.next=4,S(e);case 4:if(0!==(r=t.sent).data.resultCode){t.next=10;break}return a.dispatch(H({status:"succeeded"})),t.abrupt("return");case 10:return O(r.data,a),t.abrupt("return",a.rejectWithValue({errors:r.data.messages,fieldsErrors:r.data.fieldsErrors}));case 12:t.next=19;break;case 14:return t.prev=14,t.t0=t.catch(1),n=t.t0,T(n,a),t.abrupt("return",a.rejectWithValue({errors:[n.message],fieldsErrors:void 0}));case 19:case"end":return t.stop()}}),t,null,[[1,14]])})));return function(e,a){return t.apply(this,arguments)}}()),M=Object(A.b)("auth/logout",function(){var t=Object(I.a)(y.a.mark((function t(e,a){var r;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(H({status:"loading"})),t.prev=1,t.next=4,W();case 4:if(0!==(r=t.sent).data.resultCode){t.next=10;break}return a.dispatch(H({status:"succeeded"})),t.abrupt("return");case 10:return O(r.data,a),t.abrupt("return",a.rejectWithValue({}));case 12:t.next=18;break;case 14:return t.prev=14,t.t0=t.catch(1),T(t.t0,a),t.abrupt("return",a.rejectWithValue({}));case 18:case"end":return t.stop()}}),t,null,[[1,14]])})));return function(e,a){return t.apply(this,arguments)}}()),F={login:V,logout:M},P=Object(A.c)({name:"auth",initialState:{isLoggedIn:!1},reducers:{setIsLoggedInAC:function(t,e){t.isLoggedIn=e.payload.value}},extraReducers:function(t){t.addCase(V.fulfilled,(function(t){t.isLoggedIn=!0})),t.addCase(M.fulfilled,(function(t){t.isLoggedIn=!1}))}}),_=P.reducer,N=P.actions.setIsLoggedInAC,z=Object(A.b)("auth/app",function(){var t=Object(I.a)(y.a.mark((function t(e,a){var r;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=a.dispatch,t.next=3,C();case 3:0===t.sent.data.resultCode&&r(N({value:!0}));case 5:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()),D=Object(A.c)({name:"app",initialState:{status:"idle",error:null,isInitialized:!1},reducers:{setAppStatus:function(t,e){t.status=e.payload.status},setAppError:function(t,e){t.error=e.payload.error}},extraReducers:function(t){t.addCase(z.fulfilled,(function(t){t.isInitialized=!0}))}}),R={initializeApp:z},q=D.reducer,B=D.actions,H=B.setAppStatus,U=B.setAppError;function J(t){return c.a.createElement(L.a,Object.assign({elevation:6,variant:"filled"},t))}function K(){var t=Object(j.c)((function(t){return t.app.error})),e=Object(j.b)(),a=function(t,a){e(U({error:null}))};return c.a.createElement(g.a,{open:null!==t,autoHideDuration:6e3,onClose:a},c.a.createElement(J,{onClose:a,severity:"error"},t))}var X,Y,$=a(175),G=a(46),Q=a(184),Z=a(172),tt=c.a.memo((function(t){var e=t.addItem,a=t.disabled,r=void 0!==a&&a,n=Object(i.useState)(""),s=Object(G.a)(n,2),o=s[0],d=s[1],u=Object(i.useState)(null),l=Object(G.a)(u,2),p=l[0],m=l[1],b=function(){var t=Object(I.a)(y.a.mark((function t(){return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:""!==o.trim()?e(o,{setError:m,setTitle:d}):m("Title is required");case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return c.a.createElement("div",null,c.a.createElement(Q.a,{variant:"outlined",value:o,onChange:function(t){d(t.currentTarget.value)},onKeyPress:function(t){null!==p&&m(null),13===t.charCode&&b()},error:!!p,label:"Title",helperText:p,disabled:r}),c.a.createElement(f.a,{color:"primary",onClick:b,disabled:r,style:{marginLeft:"10px"}},c.a.createElement(Z.a,null)))})),et=a(132),at=a(89),rt=c.a.memo((function(t){console.log("EditableSpan called");var e=Object(i.useState)(!1),a=Object(G.a)(e,2),r=a[0],n=a[1],s=Object(i.useState)(t.title),o=Object(G.a)(s,2),d=o[0],u=o[1];return r?c.a.createElement(Q.a,{variant:"outlined",value:d,autoFocus:!0,onChange:function(t){u(t.currentTarget.value)},onBlur:function(){n(!1),t.onChangeTitle(d)}}):c.a.createElement("span",{onDoubleClick:function(){t.disabled?n(!1):n(!0),u(t.title)}},t.title)})),nt=a(173),st=a(186),ot=a(10),it=function(t){return t.tasks},ct=function(t){return w.get("todo-lists/".concat(t,"/tasks"))},dt=function(t,e){return w.post("todo-lists/".concat(t,"/tasks"),{title:e})},ut=function(t,e){return w.delete("todo-lists/".concat(t,"/tasks/").concat(e))},lt=function(t,e,a){return w.put("todo-lists/".concat(t,"/tasks/").concat(e),a)},pt=function(t){return t.todoLists},ft=function(t,e){return w.put("todo-lists/".concat(t),{title:e})},mt=function(){return w.get("/todo-lists")},bt=function(t){return w.post("todo-lists",{title:t})},ht=function(t){return w.delete("todo-lists/".concat(t))},vt=Object(A.b)("todoLists/fetchTodoLists",function(){var t=Object(I.a)(y.a.mark((function t(e,a){var r;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(H({status:"loading"})),t.prev=1,t.next=4,mt();case 4:return r=t.sent,a.dispatch(H({status:"succeeded"})),t.abrupt("return",{todoLists:r.data});case 9:return t.prev=9,t.t0=t.catch(1),T(t.t0,a),t.abrupt("return",a.rejectWithValue({}));case 13:case"end":return t.stop()}}),t,null,[[1,9]])})));return function(e,a){return t.apply(this,arguments)}}()),kt=Object(A.b)("todoLists/removeTodoList",function(){var t=Object(I.a)(y.a.mark((function t(e,a){var r;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(H({status:"loading"})),a.dispatch(It({todoListId:e,entityStatus:"loading"})),t.prev=2,t.next=5,ht(e);case 5:if(0!==(r=t.sent).data.resultCode){t.next=11;break}return a.dispatch(H({status:"succeeded"})),t.abrupt("return",{todoListId:e});case 11:return O(r.data,a),t.abrupt("return",a.rejectWithValue(null));case 13:t.next=19;break;case 15:return t.prev=15,t.t0=t.catch(2),T(t.t0,a),t.abrupt("return",a.rejectWithValue(null));case 19:case"end":return t.stop()}}),t,null,[[2,15]])})));return function(e,a){return t.apply(this,arguments)}}()),gt=Object(A.b)("todoLists/changeTodoListTitle",function(){var t=Object(I.a)(y.a.mark((function t(e,a){var r;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(H({status:"loading"})),t.prev=1,t.next=4,ft(e.todoListId,e.newTitle);case 4:if(0!==(r=t.sent).data.resultCode){t.next=10;break}return a.dispatch(H({status:"succeeded"})),t.abrupt("return",{newTitle:e.newTitle,todoListId:e.todoListId});case 10:return O(r.data,a),t.abrupt("return",a.rejectWithValue(null));case 12:t.next=18;break;case 14:return t.prev=14,t.t0=t.catch(1),T(t.t0,a),t.abrupt("return",a.rejectWithValue(null));case 18:case"end":return t.stop()}}),t,null,[[1,14]])})));return function(e,a){return t.apply(this,arguments)}}()),Lt=Object(A.b)("todoLists/addTodoList",function(){var t=Object(I.a)(y.a.mark((function t(e,a){var r;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(H({status:"loading"})),t.prev=1,t.next=4,bt(e);case 4:if(0!==(r=t.sent).data.resultCode){t.next=10;break}return a.dispatch(H({status:"succeeded"})),t.abrupt("return",{todoList:r.data.data.item});case 10:return t.abrupt("return",O(r.data,a,!1));case 11:t.next=16;break;case 13:return t.prev=13,t.t0=t.catch(1),t.abrupt("return",T(t.t0,a,!1));case 16:case"end":return t.stop()}}),t,null,[[1,13]])})));return function(e,a){return t.apply(this,arguments)}}()),jt={fetchTodoListsTC:vt,removeTodoListTC:kt,changeTodoListTitleTC:gt,addTodoListTC:Lt},Et=Object(A.c)({name:"todoLists",initialState:[],reducers:{changeTodoListFilter:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.todoListId}));t[a].filter=e.payload.newFilter},changeTodoListEntityStatus:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.todoListId}));t[a].entityStatus=e.payload.entityStatus}},extraReducers:function(t){t.addCase(vt.fulfilled,(function(t,e){return e.payload.todoLists.map((function(t){return Object(ot.a)(Object(ot.a)({},t),{},{filter:"all",entityStatus:"idle"})}))})),t.addCase(kt.fulfilled,(function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.todoListId}));a>-1&&t.splice(a,1)})),t.addCase(gt.fulfilled,(function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.todoListId}));t[a].title=e.payload.newTitle})),t.addCase(Lt.fulfilled,(function(t,e){t.unshift(Object(ot.a)(Object(ot.a)({},e.payload.todoList),{},{filter:"all",entityStatus:"idle"}))}))}}),yt=Et.actions,It=(yt.changeTodoListFilter,yt.changeTodoListEntityStatus),Ot=Et.reducer,Tt=Object(ot.a)(Object(ot.a)({},jt),Et.actions),xt=function(t){return t.app.status},wt=function(t){return t.app.isInitialized},Ct=Object(ot.a)(Object(ot.a)({},R),D.actions),St=Object(A.b)("tasks/fetchTasks",function(){var t=Object(I.a)(y.a.mark((function t(e,a){var r,n;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(H({status:"loading"})),t.prev=2,t.next=5,ct(e);case 5:return r=t.sent,n=r.data.items,a.dispatch(H({status:"succeeded"})),t.abrupt("return",{tasks:n,todoListId:e});case 11:return t.prev=11,t.t0=t.catch(2),T(t.t0,a),t.abrupt("return",a.rejectWithValue({}));case 15:case"end":return t.stop()}}),t,null,[[2,11]])})));return function(e,a){return t.apply(this,arguments)}}()),Wt=Object(A.b)("tasks/removeTask",function(){var t=Object(I.a)(y.a.mark((function t(e,a){var r;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(H({status:"loading"})),a.dispatch(_t({todoListId:e.todoListId,taskId:e.taskId,entityTaskStatus:"loading"})),t.prev=2,t.next=5,ut(e.todoListId,e.taskId);case 5:if(0!==(r=t.sent).data.resultCode){t.next=11;break}return a.dispatch(H({status:"succeeded"})),t.abrupt("return",{taskId:e.taskId,todoListId:e.todoListId});case 11:return O(r.data,a),t.abrupt("return",a.rejectWithValue({}));case 13:t.next=19;break;case 15:return t.prev=15,t.t0=t.catch(2),T(t.t0,a),t.abrupt("return",a.rejectWithValue({}));case 19:case"end":return t.stop()}}),t,null,[[2,15]])})));return function(e,a){return t.apply(this,arguments)}}()),At=Object(A.b)("tasks/addTask",function(){var t=Object(I.a)(y.a.mark((function t(e,a){var r;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(Ct.setAppStatus({status:"loading"})),t.prev=1,t.next=4,dt(e.todoListId,e.title);case 4:if(0!==(r=t.sent).data.resultCode){t.next=10;break}return a.dispatch(Ct.setAppStatus({status:"succeeded"})),t.abrupt("return",r.data.data.item);case 10:return O(r.data,a,!1),t.abrupt("return",a.rejectWithValue({errors:r.data.messages,fieldsErrors:r.data.fieldsErrors}));case 12:t.next=17;break;case 14:return t.prev=14,t.t0=t.catch(1),t.abrupt("return",T(t.t0,a,!1));case 17:case"end":return t.stop()}}),t,null,[[1,14]])})));return function(e,a){return t.apply(this,arguments)}}()),Vt=Object(A.b)("tasks/updateTask",function(){var t=Object(I.a)(y.a.mark((function t(e,a){var r,n,s,o;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.dispatch(H({status:"loading"})),r=a.getState(),n=r.tasks[e.todoListId].find((function(t){return t.id===e.taskId}))){t.next=6;break}return console.log("task is not found in the state"),t.abrupt("return",a.rejectWithValue({}));case 6:return s=Object(ot.a)({title:n.title,startDate:n.startDate,priority:n.priority,description:n.description,deadline:n.deadline,status:n.status},e.domainModel),t.prev=7,t.next=10,lt(e.todoListId,e.taskId,s);case 10:if(0!==(o=t.sent).data.resultCode){t.next=16;break}return a.dispatch(H({status:"succeeded"})),t.abrupt("return",{taskId:e.taskId,domainModel:e.domainModel,todoListId:e.todoListId});case 16:return O(o.data,a),t.abrupt("return",a.rejectWithValue({}));case 18:t.next=24;break;case 20:return t.prev=20,t.t0=t.catch(7),T(t.t0,a),t.abrupt("return",a.rejectWithValue({}));case 24:case"end":return t.stop()}}),t,null,[[7,20]])})));return function(e,a){return t.apply(this,arguments)}}()),Mt={fetchTasks:St,removeTask:Wt,addTask:At,updateTask:Vt},Ft=Object(A.c)({name:"tasks",initialState:{},reducers:{changeTaskEntityStatusAC:function(t,e){var a=t[e.payload.todoListId],r=a.findIndex((function(t){return t.id===e.payload.taskId}));r>-1&&(a[r]=Object(ot.a)(Object(ot.a)({},a[r]),{},{entityTaskStatus:e.payload.entityTaskStatus}))}},extraReducers:function(t){t.addCase(Tt.addTodoListTC.fulfilled,(function(t,e){t[e.payload.todoList.id]=[]})),t.addCase(Tt.removeTodoListTC.fulfilled,(function(t,e){delete t[e.payload.todoListId]})),t.addCase(Tt.fetchTodoListsTC.fulfilled,(function(t,e){e.payload.todoLists.forEach((function(e){t[e.id]=[]}))})),t.addCase(St.fulfilled,(function(t,e){t[e.payload.todoListId]=e.payload.tasks.map((function(t){return Object(ot.a)(Object(ot.a)({},t),{},{entityTaskStatus:"idle"})}))})),t.addCase(Wt.fulfilled,(function(t,e){var a=t[e.payload.todoListId].findIndex((function(t){return t.id===e.payload.taskId}));a>-1&&t[e.payload.todoListId].splice(a,1)})),t.addCase(At.fulfilled,(function(t,e){t[e.payload.todoListId].unshift(Object(ot.a)(Object(ot.a)({},e.payload),{},{entityTaskStatus:"idle"}))})),t.addCase(Vt.fulfilled,(function(t,e){var a=t[e.payload.todoListId],r=a.findIndex((function(t){return t.id===e.payload.taskId}));r>-1&&(a[r]=Object(ot.a)(Object(ot.a)({},a[r]),e.payload.domainModel))}))}}),Pt=Ft.reducer,_t=Ft.actions.changeTaskEntityStatusAC,Nt=Object(ot.a)(Object(ot.a)({},Mt),Ft.actions),zt=a(23),Dt=function(){return Object(j.b)()};function Rt(t){var e=Dt();return Object(i.useMemo)((function(){return Object(zt.b)(t,e)}),[t,e])}!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(X||(X={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(Y||(Y={}));var qt=c.a.memo((function(t){var e=Rt(Nt),a=e.updateTask,r=e.removeTask,n=Object(i.useCallback)((function(){return r({taskId:t.task.id,todoListId:t.todoListId})}),[r,t.task.id,t.todoListId]),s=Object(i.useCallback)((function(e){a({taskId:t.task.id,domainModel:{title:e},todoListId:t.todoListId})}),[a,t.task.id,t.todoListId]),o="loading"===t.task.entityTaskStatus;return c.a.createElement("div",{key:t.task.id,className:t.task.status===X.Completed?"isDone":"",style:{position:"relative",display:"flex",alignItems:"center"}},c.a.createElement(st.a,{color:"primary",checked:t.task.status===X.Completed,onChange:function(e){var r=e.currentTarget.checked;a({taskId:t.task.id,domainModel:{status:r?X.Completed:X.New},todoListId:t.todoListId})},disabled:o}),c.a.createElement(rt,{title:t.task.title,onChangeTitle:s,disabled:o}),c.a.createElement(f.a,{onClick:n,disabled:o,style:{position:"absolute",right:"5px"}},c.a.createElement(nt.a,null)))})),Bt=c.a.memo((function(t){var e=t.demo,a=void 0!==e&&e,r=Object(at.a)(t,["demo"]),n=Rt(Nt).fetchTasks,s=Rt(Tt),o=s.changeTodoListFilter,d=s.removeTodoListTC,u=s.changeTodoListTitleTC,l=Dt(),p=Object(i.useCallback)(function(){var t=Object(I.a)(y.a.mark((function t(e,a){var n,s,o,i,c;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=Nt.addTask({title:e,todoListId:r.todoList.id}),t.next=3,l(n);case 3:s=t.sent,Nt.addTask.rejected.match(s)?(null===(o=s.payload)||void 0===o||null===(i=o.errors)||void 0===i?void 0:i.length)?(c=s.payload.errors[0],a.setError(c)):a.setError("Some error occurred"):a.setTitle("");case 5:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}(),[l,r.todoList.id]),m=Object(i.useCallback)((function(t){u({newTitle:t,todoListId:r.todoList.id})}),[u,r.todoList.id]),h=Object(i.useCallback)((function(t){o({newFilter:t,todoListId:r.todoList.id})}),[o,r.todoList.id]),v=r.tasks;"active"===r.todoList.filter&&(v=r.tasks.filter((function(t){return t.status===X.New}))),"completed"===r.todoList.filter&&(v=r.tasks.filter((function(t){return t.status===X.Completed}))),Object(i.useEffect)((function(){a||n(r.todoList.id)}),[a,n,r.todoList.id]);var k=function(t,e,a){return c.a.createElement(b.a,{variant:r.todoList.filter===t?"outlined":"text",onClick:function(){h(t)},color:e},a)};return c.a.createElement("div",{style:{position:"relative"}},c.a.createElement("div",{className:"todoListTitle"},c.a.createElement(f.a,{style:{position:"absolute",right:"5px",top:"7px"},onClick:function(){d(r.todoList.id)},disabled:"loading"===r.todoList.entityStatus},c.a.createElement(nt.a,null)),c.a.createElement("h3",null,c.a.createElement(rt,{title:r.todoList.title,onChangeTitle:m}))),c.a.createElement(tt,{addItem:p,disabled:"loading"===r.todoList.entityStatus}),c.a.createElement("div",null,!v.length&&c.a.createElement("div",{style:{padding:"10px",color:"gray"}},"No tasks"),v.map((function(t){return c.a.createElement(qt,{key:t.id,task:t,todoListId:r.todoList.id})}))),c.a.createElement("div",null,k("all","default","All"),k("active","primary","Active"),k("completed","secondary","Completed")))})),Ht=a(16),Ut=function(t){return t.auth.isLoggedIn},Jt=a(189),Kt=a(171),Xt=a(176),Yt=a(177),$t=a(88),Gt=function(){var t=Object(j.c)(o.selectIsLoggedIn),e=Dt(),a=Object($t.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(t){var e={};return t.email||(e.email="Email is required"),t.password||(e.password="Password is required"),e},onSubmit:function(){var t=Object(I.a)(y.a.mark((function t(a,r){var n,s,o,i;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e(Qt.login(a));case 2:n=t.sent,V.rejected.match(n)&&(null===(s=n.payload)||void 0===s||null===(o=s.fieldsErrors)||void 0===o?void 0:o.length)&&(i=n.payload.fieldsErrors[0],r.setFieldError(i.field,i.error));case 4:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()});return t?c.a.createElement(Ht.a,{to:"/"}):c.a.createElement($.a,{container:!0,justify:"center"},c.a.createElement($.a,{item:!0,xs:4},c.a.createElement("form",{onSubmit:a.handleSubmit},c.a.createElement(Jt.a,null,c.a.createElement(Kt.a,null,c.a.createElement("p",null,"To log in get registered",c.a.createElement("a",{href:"https://social-network.samuraijs.com/",target:"_blank",rel:"noopener noreferrer"},"here")),c.a.createElement("p",null,"or use common test account credentials:"),c.a.createElement("p",null,"Email: free@samuraijs.com"),c.a.createElement("p",null,"Password: free")),c.a.createElement(Xt.a,null,c.a.createElement(Q.a,Object.assign({label:"Email",margin:"normal",name:"email"},a.getFieldProps("email"))),a.errors.email?c.a.createElement("div",{style:{color:"red"}},a.errors.email):null,c.a.createElement(Q.a,Object.assign({type:"password",label:"Password"},a.getFieldProps("password"))),a.errors.password?c.a.createElement("div",{style:{color:"red"}},a.errors.password):null,c.a.createElement(Yt.a,{label:"Remember me",control:c.a.createElement(st.a,Object.assign({},a.getFieldProps("rememberMe"),{checked:a.values.rememberMe}))}),c.a.createElement(b.a,{type:"submit",variant:"contained",color:"primary"},"Login"))))))},Qt=Object(ot.a)(Object(ot.a)({},F),P.actions),Zt=function(t){var e=t.demo,a=void 0!==e&&e,s=Object(j.c)(n.selectTodoList),d=Object(j.c)(r.selectTasks),u=Object(j.c)(o.selectIsLoggedIn),l=Rt(Tt).fetchTodoListsTC,p=Dt();Object(i.useEffect)((function(){!a&&u&&l()}),[a,l,u]);var f=Object(i.useCallback)(function(){var t=Object(I.a)(y.a.mark((function t(e,a){var r,n,s,o,i,c;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=Tt.addTodoListTC(e),t.next=3,p(r);case 3:n=t.sent,Tt.addTodoListTC.rejected.match(n)?(null===(s=n.payload)||void 0===s||null===(o=s.errors)||void 0===o?void 0:o.length)?(c=null===(i=n.payload)||void 0===i?void 0:i.errors[0],a.setError(c)):a.setError("Some error occurred"):a.setTitle("");case 5:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}(),[p]);return u?c.a.createElement(c.a.Fragment,null,c.a.createElement($.a,{container:!0,style:{padding:"20px"}},c.a.createElement(tt,{addItem:f})),c.a.createElement($.a,{container:!0,spacing:3,style:{flexWrap:"nowrap",overflowX:"scroll"}},s.map((function(t){var e=d[t.id];return c.a.createElement($.a,{key:t.id,item:!0},c.a.createElement(et.a,{style:{padding:"10px",backgroundColor:"#cfe8fc",width:"300px"}},c.a.createElement(Bt,{todoList:t,tasks:e,demo:a})))})))):c.a.createElement(Ht.a,{to:"/login"})},te=a(178),ee=function(t){var e=t.demo,a=void 0!==e&&e,r=Object(j.c)(o.selectIsLoggedIn),n=Object(j.c)(s.selectStatus),d=Rt(Ct).initializeApp,u=Rt(Qt).logout,g=Object(j.c)(s.selectIsInitialized);return Object(i.useEffect)((function(){d()})),g?c.a.createElement("div",{className:"App"},c.a.createElement(K,null),c.a.createElement(l.a,{position:"static"},c.a.createElement(p.a,null,c.a.createElement(f.a,{edge:"start",color:"inherit","aria-label":"menu"},c.a.createElement(v.a,null)),c.a.createElement(m.a,{variant:"h6"},"News"),r&&c.a.createElement(b.a,{color:"inherit",onClick:u},"Log out")),"loading"===n&&c.a.createElement(h.a,{color:"secondary"})),c.a.createElement(k.a,{fixed:!0},c.a.createElement(Ht.b,{exact:!0,path:"/",render:function(){return c.a.createElement(Zt,{demo:a})}}),c.a.createElement(Ht.b,{exact:!0,path:"/login",render:function(){return c.a.createElement(Gt,null)}}))):c.a.createElement("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"}},c.a.createElement(te.a,null))},ae=a(50),re=Object(zt.c)({tasks:Pt,todoLists:Ot,app:q,auth:_}),ne=Object(A.a)({reducer:re,middleware:function(t){return t().prepend(ae.a)}});window.store=ne;var se=a(49);u.a.render(c.a.createElement(j.a,{store:ne},c.a.createElement(se.a,{basename:"/todo_list_with_ts"},c.a.createElement(ee,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[101,1,2]]]);
//# sourceMappingURL=main.ff88310a.chunk.js.map