/* Neutral public polling adapter. Shared by the browser and snapshot builder. */
(function(root){
 'use strict';
 const nameKey=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\([^)]*\)/g,'').replace(/\b(jr|sr|iii|ii|iv)\b/g,'').replace(/[^a-z0-9]/g,'');
 const date=s=>/^2026-\d{2}-\d{2}/.test(String(s||''))?String(s).slice(0,10):null;
 const url=s=>{try{const u=new URL(s);return ['https:','http:'].includes(u.protocol)?u.href:''}catch{return ''}};
 const party=s=>/\(D\)|^Dem(?:ocratic)?(?: Party)?$/i.test(s)?'D':/\(R\)|^Rep(?:ublican)?(?: Party)?$/i.test(s)?'R':/\(I\)|Independent/i.test(s)?'I':'Other';
 const residual=s=>/^(undecided|other|don't know|dont know|not sure|none|would not vote|refused|neither|unsure|no answer|someone else)\b/i.test(s);
 const district=s=>{const m=String(s).match(/([A-Z]{2})-(\d{1,2}|AL)\b/);return m?m[1]+'-'+(Number(m[2])||1):null};
 function normalize(votehub,pf,atlas,markets,asOf=new Date().toISOString()){
  const names=new Map(atlas.states.map(s=>[s.name,s.id])),states=new Set(atlas.states.map(s=>s.id)),districts=new Set(atlas.districts.map(s=>s.id)),registry=new Map(),current=new Map();
  const add=(key,label,p)=>{if(residual(label))return;const n=nameKey(label);if(!n)return;if(!registry.has(key))registry.set(key,new Map());if(p!=='Other'||!registry.get(key).has(n))registry.get(key).set(n,{name:label.replace(/\s*\([^)]*\)/g,'').trim(),party:p})};
  for(const e of [...markets.events,...atlas.statewideEvents]){let key=e.category==='House'?district(e.title):e.category==='Senate'?names.get(e.region):e.office==='Governor'?'G-'+e.state:null;if(!key)continue;const cs=e.outcomes.filter(o=>!/^(Democratic Party|Republican Party|Democrat|Republican)$/i.test(o.label));current.set(key,new Set(cs.map(o=>nameKey(o.label))));cs.forEach(o=>add(key,o.label,party(o.label)))}
  function keyFor(race,kind){if(kind==='House')return district(race);if(kind==='Senate')return String(race).replace(/-S$/,'');return kind==='Governor'?race:null}
  function figures(s){return String(s||'').split(';').map(t=>{const m=t.trim().match(/^(.+?)\s+(-?\d+(?:\.\d+)?)\s*%?$/);return m?{name:m[1].replace(/\s*\([^)]*\)/g,'').trim(),party:party(m[1]),pct:Number(m[2]),residual:residual(m[1])}:null}).filter(Boolean)}
  const prows=Array.isArray(pf?.rows)?pf.rows:[];
  for(const r of prows){if(r.stage!=='vote')continue;const k=keyFor(r.race,r.kind);if(k)figures(r.figures).forEach(o=>add(k,o.name,o.party))}
  function identify(key,name){const list=[...(registry.get(key)?.values()||[])],exact=list.find(o=>nameKey(o.name)===nameKey(name));if(exact)return exact;const last=String(name).trim().split(/\s+/).at(-1),same=list.filter(o=>nameKey(o.name.split(/\s+/).at(-1))===nameKey(last));return same.length===1?same[0]:{name,party:party(name)}}
  const rows=[],rejected={invalid:0,stage:0,incomplete:0,duplicate:0};
  function accept(p){const named=p.answers.filter(o=>!o.residual),end=date(p.end),start=date(p.start);if(!end||end>asOf.slice(0,10)||start&&start>end||!url(p.url)||named.length<2||p.answers.some(o=>!Number.isFinite(o.pct)||o.pct<0||o.pct>100)||p.answers.reduce((s,o)=>s+o.pct,0)>105||!(p.office==='House'?districts.has(p.key):states.has(p.state))){rejected.invalid++;return}
   const sorted=[...named].sort((a,b)=>b.pct-a.pct),other=p.answers.filter(o=>o.residual&&/^other/i.test(o.name)).reduce((s,o)=>s+o.pct,0);
   // A collapsed "Other" bucket can hide the real runner-up (especially ranked-choice races).
   if(other>sorted[1].pct){rejected.incomplete++;return}
   const known=current.get(p.key),knownNamed=known&&named.filter(o=>known.has(nameKey(o.name))).length;
   const matchesKnown=o=>{if(!known?.size)return true;if(known.has(nameKey(o.name)))return true;const n=nameKey(o.name),last=nameKey(o.name.split(/\s+/).at(-1));return [...known].filter(k=>k[0]===n[0]&&k.endsWith(last)).length===1};
   if(known?.size>=2&&sorted.slice(0,2).some(o=>!matchesKnown(o))){rejected.stage++;return}
   if(new Set(named.map(o=>o.party)).size===1&&named[0].party!=='Other'&&knownNamed<2){rejected.stage++;return}
   rows.push({...p,start:start||null,end,url:url(p.url),answers:p.answers.map(o=>({...o,key:nameKey(o.name)})),matchup:sorted.slice(0,2).map(o=>nameKey(o.name)).sort().join('|')})
  }
  for(const r of Array.isArray(votehub)?votehub:votehub?.polls||[]){const office={'us-representative':'House','us-senator':'Senate',governor:'Governor','generic-ballot':'Generic'}[r.poll_type];if(!office||!String(r.subject).startsWith('2026'))continue;const stateName=String(r.subject).replace(/^2026\s*/,'').replace(/ \(special\)| Special$/i,''),state=names.get(stateName),key=office==='House'?district(r.seat_name||r.subject):office==='Generic'?'US':office==='Governor'?'G-'+state:state;if(!key)continue;const answers=(r.answers||[]).map(a=>{const n=identify(key,a.choice);return {name:n.name,party:n.party,pct:a.pct==null||a.pct===''?NaN:Number(a.pct),residual:residual(a.choice)}});if(office==='Generic')continue;
   accept({id:'vh-'+r.id,key,state:office==='House'?key.split('-')[0]:state,office,pollster:r.pollster,start:r.start_date,end:r.end_date,population:String(r.population||'Not supplied').toUpperCase(),sample:Number(r.sample_size)||null,sponsors:(r.sponsors||[]).join('; '),partisan:r.partisan||'',internal:!!r.internal,answers,url:r.url,provider:'VoteHub',license:'CC BY 4.0',question:'Reported general-election matchup',sourceGrade:null})
  }
  for(const r of prows){if(r.stage!=='vote'||r.question!=='Main'||!['House','Senate','Governor'].includes(r.kind)){rejected.stage++;continue}const key=keyFor(r.race,r.kind);if(!key)continue;accept({id:'pf-'+r.poll_id,key,state:r.kind==='Governor'?key.slice(2):key.split('-')[0],office:r.kind,pollster:r.pollster,start:r.fieldwork_start,end:r.fieldwork_end,population:r.population||'Not supplied',sample:Number(r.sample)||null,sponsors:r.sponsor||'',partisan:r.partisan||'',internal:false,answers:figures(r.figures),url:r.source_url,provider:'Polling Forecast',license:r.licence,question:r.question,sourceGrade:r.source_grade})}
  // Prefer VoteHub's unadjusted named results for the same survey. Never blend provider forecasts.
  const clean=merge(rows);rejected.duplicate=rows.length-clean.length;
  return {fetchedAt:asOf,providerAsOf:pf?.asOf||null,rows:clean.sort((a,b)=>b.end.localeCompare(a.end)||(a.provider==='VoteHub'?-1:1)),rejected,rawCounts:{votehub:Array.isArray(votehub)?votehub.length:votehub?.polls?.length||0,pollingForecast:prows.length}};
 }
 function merge(rows){const seen=new Set(),clean=[];for(const r of [...rows].sort((a,b)=>(a.provider==='VoteHub'?0:1)-(b.provider==='VoteHub'?0:1))){const host=new URL(r.url).hostname.replace(/^www\./,'');const identity=[r.key,nameKey(r.pollster),r.end,r.start||'',r.population].join('|'),source=[r.key,host,new URL(r.url).pathname,r.end,r.population].join('|');if(seen.has(identity)||seen.has(source))continue;seen.add(identity);seen.add(source);clean.push(r)}return clean.sort((a,b)=>b.end.localeCompare(a.end)||(a.provider==='VoteHub'?-1:1))}
 root.MillerPolling={normalize,merge,nameKey,residual,district};
})(typeof window!=='undefined'?window:globalThis);
