// Imagens em /images. Substitua os arquivos (mesmo nome) por fotos reais e autorizadas do restaurante.
const IMG={hero:"images/hero.webp",story:"images/story.webp",c1:"images/lanches.webp",c2:"images/porcoes.webp",c3:"images/pratos.webp",c4:"images/drinks.webp",g1:"images/salao.webp",g2:"images/mesas.webp",g3:"images/bar.webp",g4:"images/panoramica.webp",g5:"images/decoracao.webp",g6:"images/fachada.webp"};
// Preencha só após confirmar com o restaurante. 0=domingo … 6=sábado. Ex.: {5:[["18:00","23:59"]]}
const HORARIOS=null;
const WA="https://wa.me/551126300742?text=";
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
$$('.ph[data-img]').forEach(e=>{const u=IMG[e.dataset.img];if(u){e.style.backgroundImage=`url(${u})`;e.classList.add('has')}});
$$('.wa-link').forEach(a=>a.href=WA+encodeURIComponent("Olá! Gostaria de fazer uma reserva no Terraço Gastrobar. Poderiam me passar mais informações?"));
const words=["GASTRONOMIA & EXPERIÊNCIA","MOMENTOS ESPECIAIS","SABORES QUE SURPREENDEM","UM LUGAR PARA COMPARTILHAR","TERRAÇO GASTROBAR"];
$('#mq').innerHTML=[...words,...words].map(w=>`<span>${w}</span>`).join('');
$('#yr').textContent=new Date().getFullYear();
addEventListener('load',()=>setTimeout(()=>document.body.classList.add('ready'),800));
setTimeout(()=>document.body.classList.add('ready'),1800);
const hd=$('#hd'),bg=$('.hero .bg');
addEventListener('scroll',()=>{hd.classList.toggle('solid',scrollY>40)},{passive:true});
const bt=$('#burger'),mn=$('#menu');
bt.onclick=()=>{const o=mn.classList.toggle('open');bt.setAttribute('aria-expanded',o)};
$$('.links a').forEach(a=>a.addEventListener('click',()=>{mn.classList.remove('open');bt.setAttribute('aria-expanded',false)}));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
$$('.rv').forEach(e=>io.observe(e));
$$('.card,.sp').forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')}));
// lightbox
const figs=$$('[data-lb]');let cur=0;const lb=$('#lb');
const show=i=>{cur=(i+figs.length)%figs.length;const p=$('.ph',figs[cur]);const li=$('#lbi');li.style.backgroundImage=p.style.backgroundImage;li.dataset.label=p.dataset.label;li.classList.toggle('has',p.classList.contains('has'));$('#lbc').textContent=$('figcaption',figs[cur]).textContent+` (${cur+1}/${figs.length})`};
figs.forEach((f,i)=>{f.tabIndex=0;f.setAttribute('role','button');const o=()=>{show(i);lb.classList.add('open');$('#lbx').focus()};f.onclick=o;f.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();o()}}});
$('#lbx').onclick=()=>lb.classList.remove('open');$('#lbp').onclick=()=>show(cur-1);$('#lbn').onclick=()=>show(cur+1);
lb.onclick=e=>{if(e.target===lb)lb.classList.remove('open')};
addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')lb.classList.remove('open');if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)});
// form -> WhatsApp
$('#rf').addEventListener('submit',e=>{e.preventDefault();let ok=true;
const chk=(id,fn,m)=>{const el=$('#'+id),er=el.nextElementSibling,v=el.value.trim();const good=fn(v);er.textContent=good?'':m;el.setAttribute('aria-invalid',!good);if(!good)ok=false};
chk('n',v=>v.length>=2,'Informe seu nome.');
chk('t',v=>v.replace(/\D/g,'').length>=10,'Informe um telefone válido.');
chk('d',v=>v&&new Date(v+'T23:59')>=new Date(),'Escolha uma data futura.');
chk('h',v=>!!v,'Informe o horário.');
chk('p',v=>+v>=1&&+v<=50,'Informe de 1 a 50 pessoas.');
if(!ok)return;
const [y,m,d]=$('#d').value.split('-');
const msg=`Olá! Gostaria de solicitar uma reserva no Terraço Gastrobar.\nNome: ${$('#n').value}\nTelefone: ${$('#t').value}\nData: ${d}/${m}/${y}\nHorário: ${$('#h').value}\nPessoas: ${$('#p').value}\nObservações: ${$('#o').value||'—'}`;
window.open(WA+encodeURIComponent(msg),'_blank','noopener,noreferrer')});
// copy address
$('#cp').onclick=async()=>{const b=$('#cp');try{await navigator.clipboard.writeText($('#addr').textContent);b.textContent='ENDEREÇO COPIADO ✓'}catch{b.textContent='COPIE MANUALMENTE'}setTimeout(()=>b.textContent='COPIAR ENDEREÇO',2200)};
// aberto agora (só com horários confirmados)
if(HORARIOS){const f=new Intl.DateTimeFormat('en-US',{timeZone:'America/Sao_Paulo',weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date());
const g=t=>f.find(p=>p.type===t).value,day=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(g('weekday')),min=(+g('hour')%24)*60+(+g('minute'));
const open=(HORARIOS[day]||[]).some(([a,b])=>{const t=s=>s.split(':').reduce((x,y)=>x*60+ +y);return min>=t(a)&&min<=t(b)});
$('#status').textContent=open?'● Aberto agora':'● Fechado no momento';$('#status').style.color=open?'#7fd38a':'#e59a8a'}
