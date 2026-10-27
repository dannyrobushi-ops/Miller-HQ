'use strict';
// Explicit, versioned policy anchors. This is a review aid, not a trained model.
(function(root){
const topics=[
 ['healthcare','Health care','More public coverage','More private provision',[
  ['single-payer',-2,'Universal single-payer / Medicare for All','medicare for all|single[- ]payer'],
  ['expand-coverage',-1,'Expand ACA coverage, subsidies or a public option','public option|expand.{0,25}(?:medicaid|coverage)|(?:protect|strengthen|expand|restore).{0,35}(?:affordable care act|aca subsidies)|(?:extend|restore|expand).{0,25}(?:premium tax credits|health care subsidies)'],
  ['public-benefits',-1,'Expand public insurance benefits or public drug-price negotiation','(?:expand|extend).{0,25}(?:medicare benefits|drug.price negotiation)|(?:add|adding).{0,20}(?:dental|vision|hearing).{0,30}medicare'],
  ['medicaid-conditions',1,'Add work / participation conditions to Medicaid','medicaid work requirements|work requirement.{0,20}medicaid'],
  ['private-coverage',1,'Prioritize private insurance, HSAs and market competition','health savings accounts|market[- ]based health|private insurance competition'],
  ['repeal-aca',2,'Repeal the ACA / federal coverage framework','repeal.{0,25}(?:obamacare|affordable care act|aca)']]],
 ['taxes','Taxes & revenue','More progressive taxation','Lower / flatter taxation',[
  ['wealth-tax',-2,'Introduce an annual tax on net wealth','wealth tax|tax on net wealth'],
  ['progressive-tax',-1,'Raise taxes on high incomes or corporations','(?:raise|increase|higher).{0,35}tax.{0,40}(?:wealthy|corporat|billionaire|millionaire)|(?:wealthy|corporations|billionaires).{0,35}(?:pay|contribute).{0,15}fair share'],
  ['lower-taxes',1,'Reduce income / corporate taxes or extend broad tax cuts','(?:lower|reduce|cut).{0,20}(?:income|corporate|business) tax|(?:extend|permanent|protect).{0,35}(?:trump.{0,5}tax cuts|tax cuts and jobs act)'],
  ['flat-tax',2,'Replace progressive income taxes with a flat / consumption tax','flat tax|abolish.{0,20}income tax|national sales tax']]],
 ['climate','Climate & energy','Faster public decarbonization','More fossil-fuel discretion',[
  ['phaseout-fossil',-2,'Phase out fossil fuels / Green New Deal','green new deal|phase out.{0,20}fossil fuels'],
  ['clean-energy',-1,'Expand clean-energy investment or emissions limits','(?:invest|expand|support|promote).{0,40}(?:clean energy|renewable energy)|(?:cut|reduce).{0,20}(?:carbon|greenhouse gas) emissions'],
  ['fossil-expansion',1,'Expand oil/gas production and loosen permitting','(?:expand|increase|unleash).{0,30}(?:oil|gas|drilling)|energy dominance|drill baby drill'],
  ['climate-repeal',2,'End federal climate mandates / repeal emissions limits','(?:repeal|end|abolish).{0,30}(?:climate mandates|emissions regulations|carbon regulations)']]],
 ['abortion','Abortion & reproductive care','Broader legal access','More legal restrictions',[
  ['broad-abortion',-2,'Guarantee abortion access without gestational restrictions','(?:no|without).{0,10}gestational (?:limits|restrictions)'],
  ['abortion-access',-1,'Protect abortion access / restore Roe protections','(?:protect|restore|codify|support|defend).{0,40}(?:roe|abortion rights|reproductive freedom|abortion access|right to choose)'],
  ['abortion-limits',1,'Add gestational limits / allow state restrictions','(?:15|six|6|twelve|12|fifteen)[- ]week (?:ban|limit)|states.{0,15}(?:decide|regulate).{0,15}abortion'],
  ['abortion-ban',2,'Broad abortion ban / fetal personhood','(?:ban|prohibit).{0,10}all abortions|fetal personhood|life begins at conception']]],
 ['immigration','Immigration & borders','Broader legal pathways','Stricter exclusion / removal',[
  ['abolish-ice',-2,'Abolish ICE / decriminalize border entry','abolish ice|decriminaliz.{0,12}(?:border|entry)'],
  ['citizenship-path',-1,'Expand lawful pathways / citizenship for undocumented people','path(?:way)? to citizenship|legal status.{0,30}(?:dreamers|undocumented)|protect.{0,15}dreamers'],
  ['border-enforcement',1,'Increase border enforcement / asylum restrictions','(?:secure|close).{0,15}(?:the )?border|(?:expand|increase|strengthen).{0,30}border (?:security|enforcement)|remain in mexico'],
  ['mass-removal',2,'Mass deportation / end birthright citizenship','mass deportation|deport.{0,10}all.{0,20}(?:illegal|undocumented)|end.{0,15}birthright citizenship']]],
 ['guns','Guns & public safety','More firearm restrictions','Broader firearm access',[
  ['broad-gun-ban',-2,'Broad ban on civilian semi-automatic firearms','ban.{0,15}(?:all |civilian )?semi[- ]automatic (?:firearms|guns)'],
  ['gun-regulation',-1,'Universal checks, red-flag laws or assault-weapon limits','universal background checks|red[- ]flag laws|assault weapons ban|ban.{0,10}assault weapons'],
  ['gun-rights',1,'Expand / protect gun rights; oppose new restrictions','(?:protect|defend|support).{0,25}second amendment|constitutional carry|permitless carry'],
  ['repeal-gun-laws',2,'Repeal federal firearm restrictions','repeal.{0,15}(?:national firearms act|federal gun laws)|abolish.{0,10}atf']]],
 ['labor','Work & labor','Stronger collective protections','More employer flexibility',[
  ['worker-control',-2,'Require worker ownership / control','mandatory worker ownership|worker control of corporations'],
  ['labor-protection',-1,'Strengthen unions, collective bargaining or wage floors','pro act|protecting the right to organize|(?:strengthen|protect|expand).{0,25}(?:unions|collective bargaining)|(?:raise|increase).{0,20}minimum wage'],
  ['right-to-work',1,'Right-to-work rules / reduce labor regulation','right[- ]to[- ]work|(?:reduce|repeal).{0,20}labor regulations'],
  ['abolish-wage-floor',2,'Abolish statutory minimum wages','abolish.{0,15}minimum wage']]],
 ['elections','Voting & election rules','Broader voting access','More eligibility restrictions',[
  ['noncitizen-voting',-2,'Extend voting eligibility to noncitizens','(?:allow|support).{0,20}noncitizen.{0,10}vot'],
  ['voting-access',-1,'Expand registration / restore voting-rights protections','automatic voter registration|john lewis voting rights|(?:expand|protect).{0,20}(?:early voting|mail voting|voting rights)'],
  ['voter-id',1,'Require voter ID / proof of citizenship','voter id|proof of citizenship|save act'],
  ['restrict-franchise',2,'Substantially narrow the existing voting franchise','(?:repeal|end).{0,15}(?:nineteenth amendment|26th amendment)']]],
 ['education','Education','More public provision','More private choice',[
  ['tuition-free',-2,'Universal tuition-free public college','tuition[- ]free public college|free public college'],
  ['public-schools',-1,'Increase public-school funding / oppose vouchers','(?:increase|expand).{0,25}public school funding|(?:oppose|reject).{0,20}(?:school vouchers|private school vouchers)'],
  ['school-choice',1,'Expand school vouchers / private school choice','school choice|school vouchers|education savings accounts'],
  ['end-federal-education',2,'Abolish the federal Department of Education','(?:abolish|eliminate|close|dismantle).{0,20}department of education']]],
 ['housing','Housing','More public / tenant protections','More market discretion',[
  ['public-housing',-2,'Large public-housing expansion / universal rent control','universal rent control|mass public housing'],
  ['housing-subsidy',-1,'Expand affordable-housing aid / tenant protections','(?:expand|increase|fund).{0,35}(?:housing vouchers|affordable housing|tenant protections)'],
  ['housing-deregulation',1,'Reduce building regulation / oppose rent controls','(?:cut|reduce|remove).{0,20}(?:housing|building) regulations|(?:oppose|end).{0,15}rent control'],
  ['end-housing-aid',2,'End federal housing subsidies','(?:end|abolish).{0,20}federal housing subsidies']]],
 ['governance','Institutions & ethics','Context only','No single left/right axis',[]]
].map(([id,label,left,right,anchors])=>({id,label,left,right,anchors:anchors.map(([id,score,label,pattern])=>({id,score,label,pattern}))}));
const anchorMap=new Map(topics.flatMap(t=>t.anchors.map(a=>[a.id,{...a,topic:t.id}])));
const cleanName=s=>String(s||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const url=s=>{try{const u=new URL(s);return ['https:','http:'].includes(u.protocol)?u.href:''}catch{return ''}};
const date=s=>{if(s instanceof Date)s=[s.getFullYear(),String(s.getMonth()+1).padStart(2,'0'),String(s.getDate()).padStart(2,'0')].join('-');s=String(s||'');return /^\d{4}-\d{2}-\d{2}$/.test(s)&&new Date(s+'T12:00:00Z').toISOString().slice(0,10)===s?s:''};
function validateRows(rows,roster,{importing=false}={}){
 if(!Array.isArray(rows)||!rows.length||rows.length>5000)throw Error('Use 1–5,000 evidence rows.');
 const ids=new Set(),known=new Set(roster.map(c=>c.id));
 return rows.map((r,i)=>{
  const fail=m=>{throw Error('Row '+(i+1)+': '+m)};
  if(!r||typeof r!=='object')fail('invalid record');
  const out={};for(const k of ['id','candidateId','topic','summary','anchorId','rationale','sourceTitle','sourceUrl','publisher','kind','date','locator','excerpt','reviewStatus','context'])out[k]=String(r[k]??'').trim();
  if(!out.id)out.id='local-'+(globalThis.crypto?.randomUUID?.()||Date.now()+'-'+i+'-'+Math.random().toString(36).slice(2));
  if(ids.has(out.id))fail('duplicate ID');ids.add(out.id);
  if(!known.has(out.candidateId))fail('candidateId must match the directory');
  if(!topics.some(t=>t.id===out.topic))fail('unknown topic');
  if(!out.summary||out.summary.length>2000)fail('provide a summary of up to 2,000 characters');
  if(!out.sourceTitle||!out.publisher||!url(out.sourceUrl))fail('source title, publisher and http(s) URL are required');
  out.sourceUrl=url(out.sourceUrl);
  if(!['platform','interview','debate','speech','town hall','record','other'].includes(out.kind))fail('unknown source kind');
  if(r.date&&!date(r.date))fail('use a valid YYYY-MM-DD source date, or leave blank if unknown');
  out.date=date(r.date);if(out.date>new Date().toISOString().slice(0,10))fail('source date is in the future');
  const a=anchorMap.get(out.anchorId);if(out.anchorId&&(!a||a.topic!==out.topic))fail('anchor does not match this topic');
  if(out.excerpt.length>2000||out.rationale.length>2000||out.locator.length>300)fail('source text is too long');
  if(Object.values(out).some(x=>x.length>2500))fail('a field exceeds the limit');
  out.reviewStatus=importing?'draft':(['draft','reviewed','source-checked'].includes(out.reviewStatus)?out.reviewStatus:'draft');
  if(out.anchorId&&!out.rationale)fail('add the reason this policy anchor fits');
  return out;
 });
}
function policySummary(rows,topic){
 const evidence=rows.filter(r=>r.topic===topic),usable=evidence.filter(r=>r.reviewStatus!=='draft'&&anchorMap.has(r.anchorId));
 const bySource=new Map();for(const r of usable){const key=r.sourceUrl.replace(/#.*$/,'')+'|'+r.date;const a=anchorMap.get(r.anchorId);if(!bySource.has(key))bySource.set(key,new Set());bySource.get(key).add(a.score)}
 const scores=[...new Set([...bySource.values()].flatMap(s=>[...s]))],mixed=scores.some(s=>s<0)&&scores.some(s=>s>0);
 return {evidence,usable,sources:bySource.size,score:scores.length&&!mixed?scores.reduce((n,s)=>n+s,0)/scores.length:null,min:scores.length?Math.min(...scores):null,max:scores.length?Math.max(...scores):null,mixed,label:mixed?'Mixed evidence':!scores.length?'Unscored':bySource.size<2?'Limited evidence':'Multiple sources'};
}
function analyze(text,speaker){
 if(typeof text!=='string'||text.length>100000)throw Error('Use a transcript of up to 100,000 characters.');
 const wanted=cleanName(speaker),last=wanted.split(' ').at(-1),lines=text.replace(/\r/g,'').split('\n');
 let current='',labelled=false;const chosen=[];
 for(let line of lines){line=line.replace(/<[^>]*>/g,' ').replace(/^\[?\d{1,2}:\d{2}(?::\d{2})?(?:\.\d+)?\]?\s*/,'').trim();if(!line||/^WEBVTT|^\d+$|-->/i.test(line))continue;
  const label=line.match(/^([\p{L}][\p{L} .’'\-]{1,65}):\s*(.*)$/u);
  if(label){current=cleanName(label[1]);labelled=true;line=label[2]}
  if(!labelled||current===wanted||current===last)chosen.push(line);
 }
 // If any speaker labels exist, rerun so unlabeled introductory material is not included.
 if(labelled){chosen.length=0;current='';for(let line of lines){line=line.replace(/<[^>]*>/g,' ').replace(/^\[?\d{1,2}:\d{2}(?::\d{2})?(?:\.\d+)?\]?\s*/,'').trim();const label=line.match(/^([\p{L}][\p{L} .’'\-]{1,65}):\s*(.*)$/u);if(label){current=cleanName(label[1]);line=label[2]}if((current===wanted||current===last)&&line&&!/-->|^\d+$/.test(line))chosen.push(line)}}
 const statements=chosen.join(' ').split(/(?<=[.!?])\s+/).map(s=>s.trim()).filter(s=>s.length>10);
 const results=[],seen=new Set();
 for(const sentence of statements){for(const t of topics)for(const a of t.anchors){if(!new RegExp(a.pattern,'i').test(sentence))continue;const key=t.id+'|'+sentence;if(seen.has(key))continue;seen.add(key);
  const flags=[];if(/\b(not|never|no longer|oppose|reject|against|isn.t|don.t|doesn.t|won.t|wouldn.t|can.t)\b/i.test(sentence))flags.push('Negation or opposition needs interpretation');
  if(/\b(he|she|they|opponent|interviewer|reporter)\b|[“”]|\bsaid\b|\bsays\b|\bif\b|\?$/i.test(sentence))flags.push('Check speaker, quotation and hypothetical context');
  if(!/\b(i|we)\b.{0,28}\b(support|will|would|want|believe|favor|fight|protect|expand|restore|oppose|reject)\b/i.test(sentence))flags.push('Explicit personal commitment not established');
  results.push({topic:t.id,anchorId:flags.length?'':a.id,suggestedAnchor:a.id,excerpt:sentence.slice(0,2000),summary:sentence.slice(0,2000),flags,reviewStatus:'draft'});
 }}
 return {results:results.slice(0,30),total:results.length,speakerFiltered:labelled,characters:chosen.join(' ').length};
}
root.MillerCandidateCore={version:'0.1',rubricVersion:'2026-10-27',topics,anchorMap,cleanName,url,date,validateRows,policySummary,analyze};
})(typeof window!=='undefined'?window:globalThis);
