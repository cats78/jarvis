(() => {
const $=id=>document.getElementById(id);
let rec=null,active=false,installPrompt=null;
const editor=$("editor");
function say(text){if(!("speechSynthesis"in window))return;try{speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(text);u.lang="en-IN";u.rate=.94;u.pitch=.86;let vs=speechSynthesis.getVoices();let v=vs.find(x=>/male|david|mark|ravi/i.test(x.name));if(v)u.voice=v;speechSynthesis.speak(u)}catch(e){}}
function chat(who,text){let d=document.createElement("div");d.className="bubble "+(who==="YOU"?"user":"bot");let b=document.createElement("b");b.textContent=who;let p=document.createElement("p");p.textContent=text;d.append(b,p);$("chat").append(d);$("chat").scrollTop=$("chat").scrollHeight}
function reply(t,voice=true){chat("JARVIS",t);if(voice)say(t)}
function go(view){document.querySelectorAll(".view").forEach(x=>x.classList.toggle("active",x.id===view));document.querySelectorAll(".nav").forEach(x=>x.classList.toggle("active",x.dataset.view===view))}
function search(url,msg){window.open(url,"_blank","noopener,noreferrer");reply(msg)}
function command(raw){let c=raw.toLowerCase().trim();chat("YOU",raw);if(!c)return;
if(c==="help"||c.includes("what can you do"))reply("I can tell the time and date, open Google and YouTube, search the web, and help you dictate text in the Writing Studio.");
else if(c.includes("time"))reply("The time is "+new Date().toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}));
else if(c.includes("date")||c.includes("day is it"))reply("Today is "+new Date().toLocaleDateString("en-IN",{weekday:"long",year:"numeric",month:"long",day:"numeric"}));
else if(c.includes("open writing")||c.includes("writing studio")){go("writer");reply("Opening your Writing Studio.");}
else if(c.includes("open youtube"))search("https://youtube.com","Opening YouTube.");
else if(c.includes("open google"))search("https://google.com","Opening Google.");
else if(c.startsWith("search youtube for ")){let q=raw.replace(/^search youtube for /i,"");search("https://youtube.com/results?search_query="+encodeURIComponent(q),"Searching YouTube for "+q);}
else if(c.startsWith("search google for ")||c.startsWith("search ")){let q=raw.replace(/^search (google for )?/i,"");search("https://google.com/search?q="+encodeURIComponent(q),"Searching the web for "+q);}
else if(c.startsWith("write ")||c.startsWith("dictate ")){go("writer");let t=raw.replace(/^(write|dictate)\s+/i,"");editor.value+=(editor.value?"\n":"")+t;count();reply("I added that text to your Writing Studio.");}
else if(c==="hey jarvis"||c==="hello jarvis")reply("Hello! I am here. How can I help you?");
else reply("I heard you. I can search the web, open websites, tell the time and date, or take you to the Writing Studio. For advanced AI writing, an AI service needs to be connected.");
}
function count(){let v=editor.value.trim();$("wordCount").textContent=(v?v.split(/\s+/).length:0)+" words · "+editor.value.length+" characters";}
function listen(target){let SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){$("voiceStatus").textContent="VOICE RECOGNITION NOT SUPPORTED IN THIS BROWSER";return}if(active){try{rec.stop()}catch(e){}active=false;return}
rec=new SR();rec.lang="en-IN";rec.continuous=true;rec.interimResults=false;
rec.onstart=()=>{active=true;$("voiceStatus").textContent="LISTENING · SPEAK NOW";$("micBtn").innerHTML="⏹ <span>Stop listening</span>";if($("dictateBtn"))$("dictateBtn").textContent="⏹ Stop dictation";};
rec.onresult=e=>{let text=e.results[e.results.length-1][0].transcript.trim();if(target==="writer"){let replacements={"new line":"\n","new paragraph":"\n\n","comma":",","full stop":".","period":".","question mark":"?","colon":":"};let t=replacements[text.toLowerCase()]??text;let a=editor.selectionStart,b=editor.selectionEnd;editor.setRangeText((a>0&&!/[\s\n]$/.test(editor.value.slice(0,a))&&!/^[,?.!]/.test(t)?" ":"")+t,a,b,"end");count();}else if(/hey jarvis/i.test(text)){let q=text.replace(/hey jarvis/i,"").trim();if(q)command(q);else reply("Yes, I'm listening.");}else command(text);};
rec.onerror=e=>{$("voiceStatus").textContent="VOICE ERROR: "+e.error;};
rec.onend=()=>{active=false;$("voiceStatus").textContent="VOICE STANDBY";$("micBtn").innerHTML="🎙 <span>Start listening</span>";$("dictateBtn").textContent="🎙 Dictate";};
try{rec.start()}catch(e){$("voiceStatus").textContent="COULD NOT START MICROPHONE";}}
$("speakGreeting").onclick=()=>say("Hello! I am JARVIS. Welcome back. How can I help you today?");
$("micBtn").onclick=()=>listen("assistant");$("dictateBtn").onclick=()=>listen("writer");
$("chatForm").onsubmit=e=>{e.preventDefault();let v=$("chatInput").value.trim();$("chatInput").value="";command(v)};
document.querySelectorAll(".nav").forEach(b=>b.onclick=()=>go(b.dataset.view));
document.querySelectorAll("[data-view]").forEach(b=>{if(!b.classList.contains("nav"))b.onclick=()=>go(b.dataset.view)});
document.querySelectorAll("[data-cmd]").forEach(b=>b.onclick=()=>command(b.dataset.cmd));
editor.addEventListener("input",count);
$("readBtn").onclick=()=>say(editor.value||"Your document is empty.");
$("copyBtn").onclick=async()=>{try{await navigator.clipboard.writeText(editor.value);$("copyBtn").textContent="Copied!";setTimeout(()=>$("copyBtn").textContent="Copy text",1400)}catch(e){editor.select();document.execCommand("copy");$("copyBtn").textContent="Copied";}};
$("cleanBtn").onclick=()=>{editor.value=editor.value.split("\n").map(x=>x.replace(/[ \t]+/g," ").trim()).join("\n").replace(/\n{3,}/g,"\n\n");count();};
$("downloadBtn").onclick=()=>{let blob=new Blob([editor.value],{type:"text/plain;charset=utf-8"});let a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=($("docTitle").value.trim()||"jarvis-document")+".txt";a.click();URL.revokeObjectURL(a.href);};
const templates={letter:"To,\nThe [Recipient],\n[Organization]\n\nSubject: [Write subject]\n\nRespected Sir/Madam,\n\nI am writing to bring to your kind attention that...\n\nThank you.\n\nYours faithfully,\n[Your Name]",application:"To,\nThe Principal / Manager,\n[Institution / Company]\n\nSubject: Leave application\n\nRespected Sir/Madam,\n\nI request you to kindly grant me leave from [date] to [date] due to [reason]. I shall be grateful for your consideration.\n\nThank you.\n\nYours faithfully,\n[Your Name]",email:"Subject: [Email subject]\n\nDear [Name],\n\nI hope you are doing well.\n\n[Write your message here]\n\nBest regards,\n[Your Name]",news:"HEADLINE: [Enter headline]\n\n[LOCATION] : [Write the news introduction with the main event, date and place.]\n\n[Add verified details, statements and relevant background.]\n\n[Closing update.]"};document.querySelectorAll("[data-template]").forEach(b=>b.onclick=()=>{editor.value=templates[b.dataset.template];$("docTitle").value=b.textContent;count();});
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();installPrompt=e;$("installBtn").hidden=false});$("installBtn").onclick=async()=>{if(installPrompt){installPrompt.prompt();await installPrompt.userChoice;installPrompt=null}};
if("serviceWorker"in navigator&&location.protocol.startsWith("http"))addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
count();$("voiceStatus").textContent=(window.SpeechRecognition||window.webkitSpeechRecognition)?"VOICE RECOGNITION AVAILABLE · PRESS MIC":"VOICE API NOT AVAILABLE · TEXT MODE READY";
setTimeout(()=>{if("speechSynthesis"in window){say("Hello! I am JARVIS. Welcome back. How can I help you today?");}},900);
})();