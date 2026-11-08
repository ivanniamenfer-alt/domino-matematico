import React, {useMemo,useState} from "react";
import "./style.css";
const TILES=[
{"id":"1","leftText":"4 centenas 2 decenas 5 unidades","leftValue":425,"rightText":"Redondea 583 a la centena","rightValue":600},
{"id":"2","leftText":"9 centenas y 8 unidades","leftValue":908,"rightText":"Redondea 326 a la decena","rightValue":330},
{"id":"3","leftText":"330","leftValue":330,"rightText":"Escribe en letras 487","rightValue":487},
{"id":"4","leftText":"3 centenas 4 decenas 2 unidades","leftValue":342,"rightText":"Redondea 725 a la decena","rightValue":730},
{"id":"5","leftText":"Ochocientos setenta y cinco","leftValue":875,"rightText":"300+40+2","rightValue":342},
{"id":"6","leftText":"600","leftValue":600,"rightText":"Escribe en letras: 875","rightValue":875},
{"id":"7","leftText":"1000","leftValue":1000,"rightText":"¿Qué valor tiene el 6 en 386?","rightValue":6},
{"id":"8","leftText":"543","leftValue":543,"rightText":"700+0+9","rightValue":709},
{"id":"9","leftText":"2 centenas 7 decenas 4 unidades","leftValue":274,"rightText":"Redondea 951 a la centena","rightValue":1000},
{"id":"10","leftText":"Cuatrocientos ochenta y siete","leftValue":487,"rightText":"200+70+4","rightValue":274},
{"id":"11","leftText":"6","leftValue":6,"rightText":"Escribe en cifras: quinientos cuarenta y tres","rightValue":543},
{"id":"12","leftText":"Seiscientos","leftValue":600,"rightText":"¿Qué valor tiene el 7 en 374?","rightValue":70},
{"id":"13","leftText":"8 centenas 3 decenas 6 unidades","leftValue":836,"rightText":"Redondea 746 a la decena","rightValue":750},
{"id":"14","leftText":"750","leftValue":750,"rightText":"Escribe en letras 291","rightValue":291},
{"id":"15","leftText":"5 centenas 6 decenas 9 unidades","leftValue":569,"rightText":"Redondea 849 a la centena","rightValue":800},
{"id":"16","leftText":"70","leftValue":70,"rightText":"Escribe en cifras: novecientos treinta y dos","rightValue":932},
{"id":"17","leftText":"7 centenas y 9 unidades","leftValue":709,"rightText":"Redondea 614 a la centena","rightValue":600},
{"id":"18","leftText":"932","leftValue":932,"rightText":"800+30+6","rightValue":836},
{"id":"19","leftText":"800","leftValue":800,"rightText":"¿Qué valor tiene el 4 en 642?","rightValue":40},
{"id":"20","leftText":"715","leftValue":715,"rightText":"900+0+8","rightValue":908},
{"id":"21","leftText":"40","leftValue":40,"rightText":"Escribe en cifras setecientos quince","rightValue":715},
{"id":"22","leftText":"425","leftValue":425,"rightText":"Escribe en letras 608","rightValue":608},
{"id":"23","leftText":"Seiscientos ocho","leftValue":608,"rightText":"400+20+5","rightValue":425},
{"id":"24","leftText":"Doscientos noventa y uno","leftValue":291,"rightText":"500+60+9","rightValue":569}
];
const flip=t=>({...t,leftText:t.rightText,leftValue:t.rightValue,rightText:t.leftText,rightValue:t.leftValue});
function Tile({t,onClick,selected=false}){return <button className={`tile ${selected?'selected':''}`} onClick={onClick}><span>{t.leftText}</span><span>{t.rightText}</span></button>}
export default function App(){
const [screen,setScreen]=useState('home'),[hand,setHand]=useState([]),[chain,setChain]=useState([]),[sel,setSel]=useState(null),[msg,setMsg]=useState(''),[errors,setErrors]=useState(0);
const selected=hand.find(t=>t.id===sel); const ends=useMemo(()=>chain.length?{left:chain[0].leftValue,right:chain.at(-1).rightValue}:null,[chain]);
const start=()=>{setHand([...TILES].sort(()=>Math.random()-.5));setChain([]);setSel(null);setErrors(0);setMsg('Selecciona cualquier ficha para comenzar.');setScreen('play')};
const first=()=>{if(!selected)return;setChain([selected]);setHand(h=>h.filter(t=>t.id!==selected.id));setSel(null);setMsg('Primera ficha colocada. Busca una equivalencia.')};
const place=side=>{if(!selected||!ends)return;let p=null;if(side==='right'){if(selected.leftValue===ends.right)p=selected;else if(selected.rightValue===ends.right)p=flip(selected)}else{if(selected.rightValue===ends.left)p=selected;else if(selected.leftValue===ends.left)p=flip(selected)}if(!p){setErrors(e=>e+1);setMsg('Esa equivalencia no es correcta. Inténtalo otra vez.');return}setChain(c=>side==='right'?[...c,p]:[p,...c]);setHand(h=>h.filter(t=>t.id!==selected.id));setSel(null);setMsg('¡Muy bien! Los valores son equivalentes.')};
if(screen==='home')return <main className="home"><section><div className="badge">★</div><h1>Dominó Matemático</h1><p>Relaciona distintas formas de representar un mismo número y completa el dominó.</p><div className="rules"><h2>¿Cómo se juega?</h2><ol><li>Recibirás las <b>24 fichas</b> en orden aleatorio.</li><li>Selecciona cualquier ficha para iniciar la cadena.</li><li>Busca una ficha cuyo resultado tenga el mismo valor que uno de los extremos.</li><li>Selecciona la ficha y elige <b>izquierda</b> o <b>derecha</b>. La ficha gira automáticamente si hace falta.</li><li>Una conexión incorrecta suma un error. El objetivo es colocar correctamente las 24 fichas.</li></ol><button className="primary" onClick={start}>▶ Comenzar juego</button></div></section></main>;
return <><header><div><small>DOMINÓ MATEMÁTICO</small><h2>Completa la cadena</h2></div><div className="stats">Aciertos: <b>{chain.length}</b> · Errores: <b>{errors}</b> <button onClick={()=>setScreen('home')}>Reglas</button><button onClick={start}>Reiniciar</button></div></header><main className="game">{msg&&<div className="message">{msg}</div>}{hand.length===0&&chain.length===24&&<div className="win"><h2>🏆 ¡Dominó completado!</h2><p>Completaste las 24 fichas con {errors} errores.</p><button onClick={start}>Jugar otra vez</button></div>}<section className="board"><div className="boardHead"><div><h2>Mesa de juego</h2><p>Resuelve mentalmente los extremos y encuentra su equivalente.</p></div>{selected&&(chain.length===0?<button className="primary" onClick={first}>Colocar ficha</button>:<div><button onClick={()=>place('left')}>← Izquierda</button><button onClick={()=>place('right')}>Derecha →</button></div>)}</div><div className="chain">{chain.length?chain.map((t,i)=><div className="placed" key={t.id+i}><Tile t={t}/></div>):<p>Selecciona una ficha de abajo para iniciar</p>}</div></section><h2>Fichas disponibles</h2><p>Quedan {hand.length} fichas. Haz clic en una para seleccionarla.</p><div className="hand">{hand.map(t=><Tile key={t.id} t={t} selected={sel===t.id} onClick={()=>setSel(t.id)}/>)}</div></main></>}