const {spawn,spawnSync}=require('node:child_process');
const fs=require('node:fs');
const {chromium}=require('playwright');
const pass=process.argv[2]||'final';
const runBuild=process.argv[3]!=='capture-only';
(async()=>{
 if(runBuild){const result=spawnSync(process.execPath,['node_modules/next/dist/bin/next','build'],{stdio:'inherit',env:{...process.env,NEXT_TELEMETRY_DISABLED:'1'}});if(result.status!==0)process.exit(result.status||1);}
 const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3100'],{stdio:['ignore','pipe','pipe']});
 let browser;
 try{await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error('Server readiness timeout')),30000);server.stdout.on('data',d=>{if(String(d).includes('Ready')){clearTimeout(timer);resolve();}});server.stderr.on('data',d=>process.stderr.write(d));server.on('exit',c=>{clearTimeout(timer);reject(new Error('Server exited '+c));});});
 browser=await chromium.launch({channel:'msedge'});const page=await browser.newPage();const dir=`unslop/screenshots/${pass}`;fs.mkdirSync(dir,{recursive:true});const results=[];
 for(const width of [375,768,1024,1440]){await page.setViewportSize({width,height:900});await page.goto('http://127.0.0.1:3100',{waitUntil:'networkidle'});await page.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,100));}scrollTo(0,0);});await page.waitForTimeout(700);await page.screenshot({path:`${dir}/${width}.png`,fullPage:true});results.push(await page.evaluate(()=>({width:innerWidth,overflow:Math.max(0,document.documentElement.scrollWidth-innerWidth),headingFont:getComputedStyle(document.querySelector('h1')).fontFamily})));}
 fs.writeFileSync(`unslop/${pass}-checks.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results));
 }finally{if(browser)await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exit(1)});
