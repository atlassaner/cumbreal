const fs = require('node:fs');
const colors = {canvas:'#F7F4EC',subtle:'#E8EDE9',ink:'#22313A',muted:'#5A6B75',faint:'#8B9CA6',teal:'#3B8078',vibrant:'#4F9D97',deep:'#28697A',light:'#E6F2F0',amber:'#F2AA2E',amberSubtle:'#FFF5E0',amberDark:'#C88515',success:'#2D7D46',alert:'#D94828',white:'#FFFFFF'};
const rgb = h => h.slice(1).match(/../g).map(v=>parseInt(v,16));
const luminance = a => a.map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
const ratio = (a,b) => {const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
const checks=[];
for(const fg of ['ink','muted','faint','teal','deep','amber','amberDark','success','alert'])for(const bg of ['canvas','subtle','light','amberSubtle','white'])checks.push({foreground:fg,background:bg,ratio:+ratio(rgb(colors[fg]),rgb(colors[bg])).toFixed(3),AA:ratio(rgb(colors[fg]),rgb(colors[bg]))>=4.5});
for(const bg of ['teal','vibrant','deep','amber','amberDark'])for(const fg of ['white','ink'])checks.push({foreground:fg,background:bg,ratio:+ratio(rgb(colors[fg]),rgb(colors[bg])).toFixed(3),AA:ratio(rgb(colors[fg]),rgb(colors[bg]))>=4.5});
for(const fg of ['muted','teal']){const alpha=.8;const composite=rgb(colors[fg]).map((v,i)=>v*alpha+rgb(colors.canvas)[i]*(1-alpha));checks.push({foreground:fg+' /80',background:'canvas',ratio:+ratio(composite,rgb(colors.canvas)).toFixed(3),AA:ratio(composite,rgb(colors.canvas))>=4.5});}
fs.writeFileSync('unslop/V2-CONTRAST-RESULTS.md','# V2 contrast stress results\n\nOpaque sRGB relative luminance; normal text threshold 4.5:1. Alpha cases are composited against canvas.\n\n| Foreground | Background | Ratio | Normal text AA |\n|---|---|---:|---|\n'+checks.map(c=>`| ${c.foreground} | ${c.background} | ${c.ratio} | ${c.AA?'PASS':'FAIL'} |`).join('\n')+'\n');
console.log(JSON.stringify({colors,checks},null,2));
