(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const h of r.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&n(h)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();class D{constructor(t){if(D.instance)return D.instance;D.instance=this,this.canvas=t,this.width=this.canvas.width,this.height=this.canvas.height,this.windowPadding=50,this.gridDim=9,this.gridX=this.windowPadding,this.gridY=this.windowPadding,this.gridWidth=this.width-2*this.windowPadding,this.gridHeight=this.height-2*this.windowPadding,this.groupDimX=3,this.groupDimY=3,this.squareMargin=16,this.squareWidth=(this.gridWidth-(this.gridDim-1)*this.squareMargin)/this.gridDim,this.squareHeight=(this.gridHeight-(this.gridDim-1)*this.squareMargin)/this.gridDim,this.normalColor="white",this.focusColor="#FB2576",this.divColor="#00AA55",this.writtenColor="#00AAFF",this.highlightColor="#FB2576",this.incorrectColor="red"}get(){return this}}class b{constructor(t){if(b.instance)return GraphicalSettings.instance;b.instance=this,this.canvas=t,this.click=!1,this.hold=!1,this.x=0,this.y=0,this.setEventListeners()}setEventListeners(){this.canvas.addEventListener("mousedown",()=>{this.hold=!0,this.click=!0}),this.canvas.addEventListener("mouseup",()=>{this.hold=!1}),this.canvas.addEventListener("mousemove",t=>{const e=t.srcElement.clientWidth,n=t.srcElement.width,s=t.srcElement.clientHeight,r=t.srcElement.height;this.x=t.offsetX/e*n,this.y=t.offsetY/s*r}),document.addEventListener("beforeunload",t=>{this.shift=!1,this.hold=!1})}checkClick(){const t=this.click;return this.click=!1,t}clearEventListeners(){}}let A;const R=new Uint8Array(16);function F(){if(!A&&(A=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!A))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return A(R)}const f=[];for(let i=0;i<256;++i)f.push((i+256).toString(16).slice(1));function O(i,t=0){return(f[i[t+0]]+f[i[t+1]]+f[i[t+2]]+f[i[t+3]]+"-"+f[i[t+4]]+f[i[t+5]]+"-"+f[i[t+6]]+f[i[t+7]]+"-"+f[i[t+8]]+f[i[t+9]]+"-"+f[i[t+10]]+f[i[t+11]]+f[i[t+12]]+f[i[t+13]]+f[i[t+14]]+f[i[t+15]]).toLowerCase()}const V=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),q={randomUUID:V};function G(i,t,e){if(q.randomUUID&&!t&&!i)return q.randomUUID();i=i||{};const n=i.random||(i.rng||F)();if(n[6]=n[6]&15|64,n[8]=n[8]&63|128,t){e=e||0;for(let s=0;s<16;++s)t[e+s]=n[s];return t}return O(n)}class K{constructor(t,e,n,s,r,h,c,l){this.id=G(),this.value=t,this.x=e,this.y=n,this.width=s,this.height=r,this.constant=h,this.gridX=c,this.gridY=l,this.notes=[]}checkClick(t,e){return this.x<=t&&t<=this.x+this.width&&this.y<=e&&e<=this.y+this.height}}class S{constructor(t){if(S.instance)return S.instance;S.instance=this,this.keys={};for(let e=0;e<t.length;e++){const n={isPressed:!1,checked:!1};this.keys[t[e]]=n}document.addEventListener("keydown",e=>{this.registerKeyDown(e.code)}),document.addEventListener("keyup",e=>{this.registerKeyUp(e.code)})}checkPressed(t){return this.keys[t]?this.keys[t].isPressed:!1}checkTap(t){return this.keys[t]&&this.keys[t].isPressed&&!this.keys[t].checked?(this.keys[t].checked=!0,this.keys[t].checked):!1}registerKeyDown(t){this.keys[t]&&(this.keys[t].isPressed=!0,this.keys[t].checked=!1)}registerKeyUp(t){this.keys[t]&&(this.keys[t].isPressed=!1,this.keys[t].checked=!1)}}function N(i){var t=[],e=Array(81).fill(null),n=[...Array(81).keys()];T(n);for(var s=0;s<n.length;s++){var r=n[s];e[r]===null&&(t.push({pos:r,num:i[r]}),e[r]=i[r],Y(e))}T(t);for(var s=t.length-1;s>=0;s--){var h=t[s];_(t,s);var c=$(W(t),i);c===-1&&t.push(h)}return W(t)}function j(i,t){for(var e=0,n=0;n<t;n++){var s=I(i);if(s.answer===null)return-1;e+=s.state.length}return e/t}function $(i,t){t===void 0&&(t=null);var e=I(i);if(e.answer===null||t!=null&&!Q(t,e.answer))return-1;var n=e.state.length,s=M(e.state);return s.answer!=null?-1:n}function B(i){return I(i).answer}function I(i){var t=[].concat(i),e=Y(t);if(e===null)return{state:[],answer:t};var n=[{guesses:e,count:0,board:t}];return M(n)}function M(i){for(;i.length>0;){var t=i.pop();if(!(t.count>=t.guesses.length)){i.push({guesses:t.guesses,count:t.count+1,board:t.board});var e=[].concat(t.board),n=t.guesses[t.count];e[n.pos]=n.num;var s=Y(e);if(s===null)return{state:i,answer:e};i.push({guesses:s,count:0,board:e})}}return{state:[],answer:null}}function Y(i){for(;;){for(var t=!0,e=null,n=0,s=P(i),r=s.allowed,h=s.needed,c=0;c<81;c++)if(i[c]===null){var l=X(r[c]);if(l.length===0)return[];if(l.length===1)i[c]=l[0],t=!1;else if(t){var a=l.map(function(E,x){return{pos:c,num:E}}),u=C(e,n,a);e=u.guess,n=u.count}}if(!t){var m=P(i);r=m.allowed,h=m.needed}for(var o=0;o<3;o++)for(var w=0;w<9;w++)for(var l=X(h[o*9+w]),p=0;p<l.length;p++){for(var d=l[p],g=1<<d,v=[],k=0;k<9;k++){var c=L(w,k,o);r[c]&g&&v.push(c)}if(v.length===0)return[];if(v.length===1)i[v[0]]=d,t=!1;else if(t){var a=v.map(function(H,rt){return{pos:H,num:d}}),y=C(e,n,a);e=y.guess,n=y.count}}if(t)return e!=null&&T(e),e}}function P(i){for(var t=[],e=i.map(function(l,a){return l===null?511:0},[]),n=0;n<3;n++)for(var s=0;s<9;s++){var r=J(i,s,n);t.push(r);for(var h=0;h<9;h++){var c=L(s,h,n);e[c]=e[c]&r}}return{allowed:e,needed:t}}function L(i,t,e){return e===void 0&&(e=0),e===0?i*9+t:e===1?t*9+i:[0,3,6,27,30,33,54,57,60][i]+[0,1,2,9,10,11,18,19,20][t]}function J(i,t,e){for(var n=0,s=0;s<9;s++){var r=i[L(t,s,e)];r!=null&&(n|=1<<r)}return 511^n}function X(i){for(var t=[],e=0;e<9;e++)(i&1<<e)!=0&&t.push(e);return t}function C(i,t,e){return i===null||e.length<i.length?{guess:e,count:1}:e.length>i.length?{guess:i,count:t}:Z(t)===0?{guess:e,count:t+1}:{guess:i,count:t+1}}function W(i){for(var t=Array(81).fill(null),e=0;e<i.length;e++){var n=i[e],s=n.pos,r=n.num;t[s]=r}return t}function Q(i,t){for(var e=0;e<81;e++)if(i[e]!=t[e])return!1;return!0}function Z(i){return Math.floor(Math.random()*(i+1))}function T(i){for(var t=0;t<i.length;t++){for(var e=t;e===t;)e=Math.floor(Math.random()*i.length);var n=i[t];i[t]=i[e],i[e]=n}}function _(i,t,e){var n=i.slice((e||t)+1||i.length);return i.length=t<0?i.length+t:t,i.push.apply(i,n)}var U={makepuzzle:function(){return N(B(Array(81).fill(null)))},solvepuzzle:B,ratepuzzle:j,posfor:L};class tt{constructor(t){this.canvas=t,this.ctx=this.canvas.getContext("2d"),this.graphicalSettings=new D(this.canvas),this.mouseListener=new b(this.canvas),this.keyboardInput=new S(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Backspace"]),this.start=new Date,this.pencil=!1,this.newGame()}newGame(){const t=this.buildBoard();this.board=t[0],this.solvedBoard=t[1],this.focus=null,this.gameOver=!1,this.start=new Date,this.gameLoop()}buildBoard(){const t=U.makepuzzle(),e=U.solvepuzzle(t);let n=[],s=[];const{gridX:r,gridY:h,squareWidth:c,squareHeight:l,squareMargin:a}=this.graphicalSettings.get();let u=r,m=h;for(let o=0;o<9;o++){let w=[],p=[];u=r;for(let d=0;d<9;d++){const g=t[o*9+d]!=null?t[o*9+d]+1:t[o*9+d],v=new K(g,u,m,c,l,g!==null,d,o);w.push(v),u+=c+a,p.push(e[o*9+d]+1)}m+=l+a,n.push(w),s.push(p)}return[n,s]}updateFocus(){if(this.mouseListener.checkClick()){for(let t=0;t<this.board.length;t++)for(let e=0;e<this.board.length;e++)if(this.board[t][e].checkClick(this.mouseListener.x,this.mouseListener.y)){this.focus=this.board[t][e];return}this.focus=null}this.focus!==null&&(this.keyboardInput.checkTap("ArrowUp")&&this.focus.gridY-1>=0?this.focus=this.board[this.focus.gridY-1][this.focus.gridX]:this.keyboardInput.checkTap("ArrowDown")&&this.focus.gridY+1<9?this.focus=this.board[this.focus.gridY+1][this.focus.gridX]:this.keyboardInput.checkTap("ArrowRight")&&this.focus.gridX+1<9?this.focus=this.board[this.focus.gridY][this.focus.gridX+1]:this.keyboardInput.checkTap("ArrowLeft")&&this.focus.gridX-1>=0&&(this.focus=this.board[this.focus.gridY][this.focus.gridX-1]))}captureInput(){for(let t=1;t<=9;t++){const e=`Digit${t}`;this.focus&&!this.focus.constant&&this.keyboardInput.checkTap(e)&&(this.pencil?this.focus.notes.includes(t)?this.focus.notes=this.focus.notes.filter(n=>n!=t):this.focus.notes.push(t):this.focus.value=t)}this.keyboardInput.checkTap("Backspace")&&this.focus&&!this.focus.constant&&(this.focus.value=null,this.focus.notes=[])}update(){this.updateFocus(),this.captureInput()}clearFrame(){const{width:t,height:e}=this.graphicalSettings.get();this.ctx.clearRect(0,0,t,e),this.ctx.strokeStyle="white"}paintSquares(){const{normalColor:t,focusColor:e,writtenColor:n,highlightColor:s,incorrectColor:r}=this.graphicalSettings.get();for(let h=0;h<this.board.length;h++)for(let c=0;c<this.board.length;c++){const{x:l,y:a,width:u,height:m,value:o,id:w,constant:p,notes:d}=this.board[h][c];if(this.ctx.fillStyle=p?t:n,this.ctx.strokeStyle=this.focus&&this.focus.id==w?e:t,this.ctx.lineWidth=this.focus==w?2:1,this.ctx.fillStyle=this.focus&&this.focus.value==o&&o!=null?s:this.ctx.fillStyle,this.ctx.strokeRect(l,a,u,m),o){const g=o;o!=this.solvedBoard[h][c]&&(this.ctx.fillStyle=r),this.ctx.font="84px Arial",this.ctx.textAlign="center",this.ctx.fillText(""+g,l+u/2,a+m/2+32,u)}else if(d.length>0)for(let g=0;g<d.length;g++){const v=d[g],k=(v-1)%3,y=Math.floor((v-1)/3);this.ctx.fillStyle=this.focus&&this.focus.value==v&&v!=null?s:n,this.ctx.font="28px Arial",this.ctx.textAlign="center",this.ctx.fillText(""+v,l+u/3*k+14,a+m/3*y+26,u/3)}}}paintDivisions(){const{gridX:t,gridY:e,gridDim:n,groupDimX:s,groupDimY:r,gridWidth:h,gridHeight:c,divColor:l,normalColor:a,squareHeight:u,squareWidth:m,squareMargin:o}=this.graphicalSettings.get();this.ctx.fillStyle=l,this.ctx.strokeStyle=l,this.ctx.lineWidth=1;const w=n/r-1;let p=e;for(let x=0;x<w;x++)p+=r*u,p+=(r-1)*o,this.ctx.fillRect(t,p,h,o),p+=o;const d=n/s-1;let g=t;for(let x=0;x<d;x++)g+=s*m,g+=(s-1)*o,this.ctx.fillRect(g,e,o,c),g+=o;const v=t-o/2,k=e-o/2,y=h+o,E=c+o;this.ctx.lineWidth=o,this.ctx.strokeRect(v,k,y,E)}gameOverEvent(){this.gameOver=!0,this.clearFrame();const{gridX:t,gridY:e,gridWidth:n,gridHeight:s,divColor:r,squareMargin:h}=this.graphicalSettings.get(),c=t-h/2,l=e-h/2,a=n+h,u=s+h;this.ctx.strokeStyle=r,this.ctx.lineWidth=h,this.ctx.strokeRect(c,l,a,u);const m=new Date,o=Math.abs(this.start.getTime()-m.getTime())/1e3;this.ctx.textAlign="center",this.ctx.fillStyle=r,this.ctx.font="84px Arial",this.ctx.fillText("Congratulations!",t+a/2,e+u/3,a),this.ctx.fillStyle="white",this.ctx.font="48px Arial",this.ctx.fillText(`You solved the puzzle in ${this.formatTime(o)}!`,t+a/2,e+u*2/3,a)}formatTime(t){var e=parseInt(t,10),n=Math.floor(e/3600),s=Math.floor((e-n*3600)/60),r=e-n*3600-s*60;return n<10&&(n="0"+n),s<10&&(s="0"+s),r<10&&(r="0"+r),n+":"+s+":"+r}render(){this.clearFrame(),this.paintDivisions(),this.paintSquares()}gameLoop(){if(!this.gameOver){if(this.update(),this.render(),this.isBoardCorrect()){this.gameOverEvent();return}window.requestAnimationFrame(this.gameLoop.bind(this))}}isBoardCorrect(){let t=0;for(let e=0;e<this.board.length;e++)for(let n=0;n<this.board.length;n++){const s=this.board[e][n].value==this.solvedBoard[e][n]?1:0;t+=s}return t==81}togglePencil(){return this.pencil=!this.pencil,this.pencil}}const et=document.getElementById("app"),it=new tt(et);window.sudoku=it;const z=document.getElementById("toggle-pencil");z.addEventListener("click",()=>{window.sudoku.togglePencil()?z.innerText="\u274C Pencil \u270D":z.innerText="\u2705 Pen \u270D"});const st=document.getElementById("new-game");st.addEventListener("click",()=>{window.sudoku.newGame()});const nt=document.getElementById("time");setInterval(()=>{if(!window.sudoku.gameOver){const t=(new Date().getTime()-window.sudoku.start.getTime())/1e3,e=window.sudoku.formatTime(t);nt.textContent=`\u23F0 ${e}`}},100);