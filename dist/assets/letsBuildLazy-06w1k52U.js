function createLetsBuildView({ z, n, Os, qi, st, hu, Us, Ja, fr, vu, xd, Bf, du, zs, Pf, Of, vh, aS, Mk, QD, iS, bv, h_, lS, nS, Gl, n1, hd, ik, Bs }) {
  function qP(o) {
    var r, a, s, c, u, d, f;
    if (o.customHtmlOverride && o.customHtmlOverride.trim().length > 40) return o.customHtmlOverride;
    const v = JSON.stringify(o).replace(/</g, "\\u003c");
    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${o.brandName} — Cinematic 3D</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<style>
:root{color-scheme:dark;--bg:#0b0710;--bg2:#2a1136;--fg:#fff7ee;--mut:#c9b9cd;--liq:#ff7a2f;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
@property --bg{syntax:'<color>';inherits:true;initial-value:#0b0710}
@property --bg2{syntax:'<color>';inherits:true;initial-value:#2a1136}
@property --liq{syntax:'<color>';inherits:true;initial-value:#ff7a2f}
:root{transition:--bg .9s,--bg2 .9s,--liq .9s}
*{box-sizing:border-box}
body{margin:0;background:radial-gradient(ellipse at 50% 40%,var(--bg2),var(--bg) 72%) fixed;color:var(--fg);font-family:'Plus Jakarta Sans','Segoe UI',system-ui,-apple-system,sans-serif;overflow-x:hidden}
#gl{position:fixed;inset:0;width:100%;height:100%;z-index:0;cursor:grab;touch-action:pan-y}
#gl:active{cursor:grabbing}
#flash{position:fixed;inset:0;z-index:2;pointer-events:none;opacity:0;background:radial-gradient(circle at 50% 38%,#fff 0,#fff 10%,var(--liq) 32%,transparent 70%);mix-blend-mode:screen}
#vig{position:fixed;inset:0;z-index:2;pointer-events:none;background:radial-gradient(circle,transparent 55%,#000a 100%)}
#sprog{position:fixed;left:0;top:0;height:3px;width:100%;background:linear-gradient(90deg,var(--liq),#fff);transform-origin:left;transform:scaleX(0);z-index:210}
main{position:relative;z-index:1;pointer-events:none}
main a,main button,main details,main summary,main .card,main .cap,main .ps,main .bd,main .hl,main .choreo-card,main [data-edit-section]{pointer-events:auto}

/* ── CLICK-TO-EDIT INSPECTOR OVERLAY ── */
[data-edit-section]{position:relative;transition:outline .2s ease,box-shadow .2s ease}
body.inspector-on [data-edit-section]:hover{outline:2px dashed var(--liq);outline-offset:6px;cursor:pointer}
body.inspector-on [data-edit-section].is-selected-element{outline:2px solid #fff;outline-offset:6px;box-shadow:0 0 0 4px rgba(255,122,47,0.35)}
.edit-pill-badge{
  position:absolute;top:10px;right:10px;z-index:80;
  background:var(--liq);color:#150a05;
  font-family:'Plus Jakarta Sans',sans-serif;font-size:10px;font-weight:900;
  letter-spacing:1.3px;text-transform:uppercase;
  padding:5px 12px;border-radius:999px;
  box-shadow:0 8px 20px rgba(0,0,0,0.45);
  pointer-events:none;opacity:0;transform:translateY(-4px);
  transition:opacity .18s ease,transform .18s ease;
}
body.inspector-on [data-edit-section]:hover>.edit-pill-badge,
body.inspector-on [data-edit-section].is-selected-element>.edit-pill-badge{opacity:1;transform:translateY(0)}

nav{position:fixed;top:env(safe-area-inset-top,0px);left:0;right:0;z-index:50;display:flex;align-items:center;justify-content:space-between;padding:16px 5vw;background:linear-gradient(180deg,rgba(11,7,16,0.75),transparent);backdrop-filter:blur(8px)}
nav .brand-wrap{display:flex;align-items:center;gap:10px;text-decoration:none;color:inherit}
nav .brand-wrap img{height:34px;width:auto;border-radius:8px;object-fit:contain}
nav b{letter-spacing:.28em;font-size:1.25rem;font-weight:900}
nav .nav-links{display:flex;gap:22px;align-items:center}
nav .nav-links a{color:inherit;text-decoration:none;font-size:.78rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;opacity:.82;transition:letter-spacing .3s,opacity .3s,color .3s}
nav .nav-links a:hover{letter-spacing:.25em;opacity:1;color:var(--liq)}
nav .nav-actions{display:flex;gap:10px;align-items:center}
nav button{background:#ffffff12;border:1px solid #ffffff38;color:inherit;border-radius:99px;padding:8px 18px;font:inherit;font-size:.78rem;font-weight:800;letter-spacing:.15em;cursor:pointer;backdrop-filter:blur(10px);transition:letter-spacing .3s,background .3s,border-color .3s}
nav button:hover{letter-spacing:.24em;background:#ffffff26;border-color:var(--liq)}
nav button i{display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--liq);margin-right:9px;vertical-align:middle;box-shadow:0 0 10px var(--liq)}
.crate-cnt{background:var(--liq);color:#150a05;padding:2px 8px;border-radius:99px;font-weight:900;font-size:.72rem;margin-left:6px}
@media(max-width:900px){nav .nav-links{display:none}}

.stg{position:sticky;top:0;height:100vh;height:100dvh;overflow:hidden}
.stg::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(420px circle at var(--mxp,50%) var(--myp,50%),var(--liq),transparent 70%);opacity:.14;mix-blend-mode:screen}
.cap{position:absolute;left:5vw;bottom:13vh;max-width:min(480px,84vw);opacity:0;transform:translateY(30px);transition:opacity .7s,transform .7s;text-shadow:0 2px 24px #000;background:rgba(11,7,16,0.48);backdrop-filter:blur(14px);padding:24px 28px;border-radius:24px;border:1px solid rgba(255,255,255,0.12)}
.cap.on{opacity:1;transform:none}
.cap small.stage-tag{display:inline-block;letter-spacing:.24em;font-size:.7rem;font-weight:800;color:var(--liq);text-transform:uppercase;margin-bottom:8px}
.cap h2{margin:0 0 .35em;font-family:'Anton',Impact,sans-serif;font-size:clamp(2.2rem,5.5vw,4.3rem);line-height:.95;text-transform:uppercase;font-weight:400;letter-spacing:.02em;transition:letter-spacing .4s}
.cap:hover h2{letter-spacing:.05em}
.cap p{margin:0;color:var(--mut);font-size:1rem;line-height:1.55;transition:color .3s}
.cap:hover p{color:#fff}
.cap em{font-style:normal;color:var(--liq);transition:text-shadow .4s}
.cap:hover em{text-shadow:0 0 28px var(--liq)}
.ps{position:absolute;right:5vw;bottom:13vh;text-align:right;font-weight:900;font-size:clamp(2rem,5.5vw,3.8rem);text-shadow:0 2px 24px #000;background:rgba(11,7,16,0.48);backdrop-filter:blur(14px);padding:18px 26px;border-radius:22px;border:1px solid rgba(255,255,255,0.12);transition:scale .3s}
.ps:hover{scale:1.06}
.ps small{display:block;color:var(--mut);font-size:.28em;letter-spacing:.22em;font-weight:700;margin-top:4px}
.cap,.ps{translate:calc(var(--px,0)*-14px) calc(var(--py,0)*-9px)}

#flv{position:absolute;left:50%;bottom:3.2vh;transform:translateX(-50%);display:flex;gap:10px;z-index:6;flex-wrap:wrap;justify-content:center}
#flv button{border:1px solid #ffffff44;background:#0b0710aa;color:var(--fg);padding:10px 18px;border-radius:99px;cursor:pointer;font-size:.78rem;font-weight:800;letter-spacing:.12em;backdrop-filter:blur(10px);transition:transform .25s,background .25s,border-color .25s}
#flv button:hover{transform:translateY(-4px) scale(1.06);background:#ffffff30}
#flv button.act{background:var(--liq);border-color:var(--liq);color:#150a05;font-weight:900;box-shadow:0 0 25px var(--liq)}

.stage-pills{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-top:16px}
.stage-pill{padding:8px 12px;border-radius:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);font-size:.74rem;font-weight:800;letter-spacing:.06em;color:rgba(255,255,255,0.55);transition:.3s}
.stage-pill.act{background:var(--liq);color:#150a05;border-color:var(--liq);box-shadow:0 0 18px var(--liq)}

.hl{position:absolute;left:5vw;top:50%;transform:translateY(-50%);max-width:min(560px,86vw)}
.hl>*{opacity:0;transform:translateY(34px);transition:opacity .9s,transform .9s;display:block}
body.go .hl>*{opacity:1;transform:none}
.hl>:nth-child(2){transition-delay:.12s}.hl>:nth-child(3){transition-delay:.24s}.hl>:nth-child(4){transition-delay:.36s}.hl>:nth-child(5){transition-delay:.48s}.hl>:nth-child(6){transition-delay:.6s}
.hl small{letter-spacing:.28em;color:var(--liq);font-size:.78rem;font-weight:800;margin-bottom:12px;text-transform:uppercase}
.hl h1{margin:0 0 .2em;font-family:'Anton',Impact,sans-serif;font-size:clamp(3.2rem,10vw,7.8rem);line-height:.9;text-transform:uppercase;font-weight:400;letter-spacing:.01em;text-shadow:0 4px 40px #000}
.hl h1 em{font-style:normal;color:var(--liq);transition:letter-spacing .4s}
.hl h1:hover em{letter-spacing:.05em}
.hl p{color:var(--mut);line-height:1.6;max-width:440px;margin:0 0 22px;font-size:1.02rem}
.btn{display:inline-block!important;background:var(--liq);color:#150a05;padding:14px 32px;border-radius:99px;font-weight:900;font-size:.82rem;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;width:max-content;border:0;cursor:pointer;transition:box-shadow .3s,translate .2s}
.btn:hover,.cta a:hover{box-shadow:0 0 0 8px #ffffff22,0 0 50px var(--liq)}
.drag-pill{display:inline-flex!important;align-items:center;gap:8px;margin-top:14px;padding:7px 16px;border-radius:99px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);font-size:.68rem;font-weight:800;letter-spacing:.2em;color:#fff;width:max-content}
.sc{margin-top:18px;font-size:.72rem;font-weight:800;letter-spacing:.28em;color:var(--mut);animation:bob 1.6s ease-in-out infinite}
@keyframes bob{50%{transform:translateY(8px)}}

.bd{position:absolute;right:7vw;top:19vh;width:146px;height:146px;border-radius:50%;background:var(--liq);color:#150a05;display:grid;place-content:center;text-align:center;font-weight:900;font-size:1.45rem;line-height:1.05;box-shadow:0 20px 50px #0008;opacity:0;scale:.4;transition:opacity .8s .5s,scale .8s .5s cubic-bezier(.2,1.4,.4,1)}
body.go .bd{opacity:1;scale:1}
body.go .bd:hover{scale:1.12;transition:scale .3s}
.bd::before{content:'';position:absolute;inset:-14px;border:2px dashed #fff9;border-radius:50%;animation:sp 12s linear infinite}
.bd span{font-size:.52rem;letter-spacing:.12em;margin-top:6px;font-weight:800}
@keyframes sp{to{rotate:360deg}}
@media(max-width:800px){.bd{top:12vh;right:5vw;width:108px;height:108px;font-size:1.05rem}.cap{bottom:11vh;padding:18px 20px}.ps{bottom:auto;top:12vh;right:5vw}}

/* ── MARQUEE RIBBON ── */
.mq-bar{position:relative;z-index:4;background:var(--liq);color:#150a05;padding:16px 0;overflow:hidden;transform:rotate(-1deg) scale(1.02);box-shadow:0 16px 40px rgba(0,0,0,0.45)}
.mq-track{display:flex;gap:48px;width:max-content;animation:mqScroll 24s linear infinite;font-family:'Anton',Impact,sans-serif;font-size:1.75rem;letter-spacing:2px;text-transform:uppercase}
@keyframes mqScroll{to{transform:translateX(-50%)}}

/* ── ANIMATED 3D CAN PRELOADER ── */
#ld{position:fixed;inset:0;z-index:200;background:radial-gradient(ellipse at 50% 40%,var(--bg2),var(--bg) 72%);display:grid;place-items:center;transition:opacity .7s cubic-bezier(.2,.8,.2,1)}
#ld.done{opacity:0;pointer-events:none}
.lw{text-align:center;display:flex;flex-direction:column;align-items:center;gap:10px}
#lsv{height:42vh;max-height:310px;overflow:visible;filter:drop-shadow(0 0 40px var(--liq))}
.lb circle{animation:bu 2.2s linear infinite}
@keyframes bu{from{transform:translateY(0);opacity:.9}to{transform:translateY(-150px);opacity:0}}
#ldc{transition:transform .8s cubic-bezier(.2,.8,.2,1),opacity .8s;transform-box:fill-box;transform-origin:center}
#ldc.pop{transform:translateY(-110px) rotate(380deg);opacity:0}
.lt{display:flex;gap:18px;align-items:baseline}.lt b{letter-spacing:.4em;font-size:1.3rem}.lt span{font-size:1.3rem;font-variant-numeric:tabular-nums;color:var(--liq);font-weight:800}
#lm{color:var(--mut);font-style:normal;font-size:.95rem;min-height:1.4em}
.tk{opacity:0;transform:scale(.6);transition:.6s cubic-bezier(.2,1.4,.4,1);background:var(--liq);color:#150a05;padding:10px 20px;border-radius:12px;font-weight:800;font-size:.88rem;border:2px dashed #150a05}
.tk.on{opacity:1;transform:none}

/* ── FULLSCREEN FLAVOR SELECTOR OVERLAY ── */
#fs{position:fixed;inset:0;z-index:140;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:11vh 5vw 7vh;text-align:center;opacity:0;pointer-events:none;transition:opacity .7s}
#fs.on{opacity:1;pointer-events:auto}
#fs.bk{background:rgba(8,5,12,0.84);backdrop-filter:blur(16px)}
#fs h2{margin:0;font-family:'Anton',Impact,sans-serif;font-size:clamp(2.2rem,6vw,4.5rem);text-transform:uppercase;font-weight:400;letter-spacing:.03em;text-shadow:0 4px 30px #000}
#fs h2 em{font-style:normal;color:var(--liq)}
#fs p{margin:8px 0 0;color:var(--mut)}
.fl{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-bottom:22px}
.fl button{display:flex;flex-direction:column;align-items:center;gap:5px;min-width:122px;padding:14px 18px;border-radius:20px;border:1.5px solid #ffffff30;background:#00000055;color:var(--fg);cursor:pointer;backdrop-filter:blur(10px);transition:transform .3s,border-color .3s,background .3s}
.fl button i{width:34px;height:34px;border-radius:50%;box-shadow:0 0 0 3px #ffffff30}
.fl button b{letter-spacing:.16em;font-size:.82rem;font-weight:900}
.fl button small{color:var(--mut);font-size:.68rem}
.fl button:hover{transform:translateY(-6px) scale(1.06)}
.fl button.act{border-color:var(--liq);background:#ffffff1c;transform:translateY(-6px);box-shadow:0 12px 30px rgba(0,0,0,0.4)}
#go{border:0;cursor:pointer;font-size:.92rem}
body.sel .hl,body.sel .bd{opacity:0!important}

#gr{position:fixed;inset:-50%;z-index:3;pointer-events:none;opacity:.08;mix-blend-mode:overlay;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");animation:gr .7s steps(4) infinite}
@keyframes gr{0%{transform:translate(0,0)}25%{transform:translate(-5%,4%)}50%{transform:translate(4%,-6%)}75%{transform:translate(-3%,-3%)}}
#sk{position:fixed;left:0;right:0;top:46%;height:2px;z-index:2;pointer-events:none;background:linear-gradient(90deg,transparent,var(--liq),#fff,var(--liq),transparent);filter:blur(3px);mix-blend-mode:screen;opacity:.35;animation:sk 5s ease-in-out infinite}
@keyframes sk{50%{opacity:.08;transform:scaleX(.7)}}

/* ── EDITORIAL & LINEUP SECTIONS ── */
.sec{max-width:1200px;margin:auto;padding:12vh 5vw 4vh;position:relative}
.sec h2{font-family:'Anton',Impact,sans-serif;font-size:clamp(2.2rem,6vw,4.4rem);margin:0 0 .35em;text-transform:uppercase;font-weight:400; letter-spacing:.02em;line-height:1}
.sec h2 em{font-style:normal;color:var(--liq)}
.lead{color:var(--mut);max-width:760px;line-height:1.75;font-size:1.06rem}
.stats{display:flex;gap:42px;flex-wrap:wrap;margin-top:34px}
.stats div{color:var(--mut);font-size:.9rem}
.stats b{display:block;font-family:'Anton',Impact,sans-serif;font-size:2.8rem;color:var(--liq);letter-spacing:.03em}
.lineup{display:grid;gap:22px;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));margin-top:30px}
.card{padding:30px;border-radius:24px;background:linear-gradient(160deg,#ffffff16,#ffffff06);border:1px solid #ffffff1f;opacity:0;transform:translateY(50px) scale(.96);transition:all .8s cubic-bezier(.2,.8,.2,1);position:relative;overflow:hidden;backdrop-filter:blur(12px)}
.card.in{opacity:1;transform:perspective(800px) rotateX(calc(var(--rx,0)*1deg)) rotateY(calc(var(--ry,0)*1deg))}
.card.rdy{transition:transform .15s ease-out,border-color .3s}
.card::before{content:'';position:absolute;inset:0;background:radial-gradient(260px circle at var(--cx,50%) var(--cy,50%),#ffffff22,transparent 60%);opacity:0;transition:opacity .3s;pointer-events:none}
.card:hover::before{opacity:1}
.card:hover{border-color:var(--liq)}
.lc .sil{height:210px;display:flex;justify-content:center;margin-bottom:14px}
.lc .sil svg{height:100%;filter:drop-shadow(0 14px 28px #0009);transition:transform .4s}
.lc:hover .sil svg{transform:translateY(-8px) rotate(-4deg) scale(1.05)}
.lc h3{font-family:'Anton',Impact,sans-serif;font-size:1.7rem;letter-spacing:.06em;margin:0}
.lc em{display:block;font-style:normal;color:var(--liq);font-size:.85rem;font-weight:700;margin:4px 0 10px}
.lc ul{padding-left:18px;color:var(--mut);font-size:.88rem;line-height:1.7;margin:12px 0 18px}
.lc .btn-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.lc .btn{padding:11px 20px;font-size:.75rem;border:0;cursor:pointer}
.lc .btn.sec-btn{background:#ffffff18;color:#fff;border:1px solid #ffffff30}
.lc .btn.sec-btn:hover{background:var(--liq);color:#150a05}
.pk.act{opacity:.65}

.specw{display:flex;gap:40px;align-items:center;flex-wrap:wrap;margin-top:30px;background:linear-gradient(160deg,#ffffff12,#ffffff04);border:1px solid #ffffff1a;border-radius:28px;padding:36px}
#spb svg{height:320px;filter:drop-shadow(0 18px 40px #000a)}
.sp{flex:1;min-width:280px}
.sp h3{font-family:'Anton',Impact,sans-serif;font-size:2.3rem;letter-spacing:.08em;margin:0 0 6px;color:var(--liq)}
.sp p{color:var(--mut);line-height:1.7}
.sp table{width:100%;border-collapse:collapse;margin-top:14px}
.sp th,.sp td{padding:11px 8px;border-bottom:1px solid #ffffff1c;text-align:left;vertical-align:top;font-size:.92rem}
.sp th{color:var(--liq);width:34%;font-weight:800;text-transform:uppercase;font-size:.78rem;letter-spacing:.1em}

.step b{font-family:'Anton',Impact,sans-serif;font-size:2.4rem;color:var(--liq);display:block;letter-spacing:.04em}
.step h3{margin:6px 0;font-size:1.25rem}
.step p{color:var(--mut);line-height:1.6;margin:0;font-size:.92rem}

/* ── NUTRITION & REVIEWS GRID ── */
.nut-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:36px;align-items:center;margin-top:28px}
.fda-card{background:#fff8f0;color:#121212;border-radius:24px;padding:28px;border:5px solid #121212;box-shadow:0 24px 60px rgba(0,0,0,0.45)}
.fda-title{font-family:'Anton',Impact,sans-serif;font-size:2.4rem;border-bottom:8px solid #121212;padding-bottom:4px;line-height:1}
.fda-serv{font-weight:800;font-size:.9rem;padding:8px 0;border-bottom:4px solid #121212}
.fda-cal{display:flex;justify-content:space-between;align-items:flex-end;padding:10px 0;border-bottom:6px solid #121212}
.fda-cal strong{font-family:'Anton',Impact,sans-serif;font-size:2.8rem;line-height:1}
.fda-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #ccc;font-size:.9rem;font-weight:600}
.fda-row strong{font-weight:900}
@media(max-width:860px){.nut-grid{grid-template-columns:1fr}}

.faq details{border-bottom:1px solid #ffffff22;padding:18px 4px}
.faq summary{cursor:pointer;font-weight:800;font-size:1.08rem;transition:color .3s}
.faq summary:hover{color:var(--liq)}
.faq p{color:var(--mut);line-height:1.7;margin:10px 0 0}

.cta{text-align:center;padding:14vh 5vw 10vh}
.cta h2{font-family:'Anton',Impact,sans-serif;font-size:clamp(2.6rem,8vw,6.4rem);margin:0 0 .25em;line-height:.95;text-transform:uppercase}
.cta .lead{margin:0 auto 28px}
.cta a{display:inline-block;background:var(--liq);color:#150a05;padding:16px 38px;border-radius:99px;font-weight:900;letter-spacing:.14em;text-decoration:none}

footer{border-top:1px solid #ffffff1c;margin-top:6vh;padding:48px 5vw 30px;text-align:left;background:rgba(6,4,10,0.65)}
.fg{max-width:1200px;margin:0 auto 30px;display:grid;gap:30px;grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}
.fg b{display:block;letter-spacing:.2em;margin-bottom:10px;color:var(--fg)}
.fg a{display:block;color:var(--mut);text-decoration:none;margin:6px 0;font-size:.9rem}
.fg a:hover{color:var(--liq)}
.fg p{margin:0;color:var(--mut);line-height:1.6;font-size:.9rem}
footer>p{text-align:center;max-width:1200px;margin:0 auto;color:var(--mut);font-size:.8rem}

#cr{position:fixed;left:0;top:0;width:38px;height:38px;margin:-19px 0 0 -19px;border:1.5px solid var(--liq);border-radius:50%;z-index:200;pointer-events:none;opacity:0;transition:width .25s,height .25s,margin .25s,background .25s}
#cr.h{width:72px;height:72px;margin:-36px 0 0 -36px;background:#ffffff14}
@media(hover:none){#cr{display:none}}

#fizzo-toast{
  position:fixed;left:50%;bottom:28px;transform:translate(-50%,30px);
  background:#150a05;color:#fff;border:1.5px solid var(--liq);
  padding:13px 26px;border-radius:999px;font-weight:800;font-size:.86rem;
  letter-spacing:1px;z-index:250;opacity:0;pointer-events:none;
  box-shadow:0 16px 40px rgba(0,0,0,0.6);transition:.4s cubic-bezier(.16,1,.3,1);
}
#fizzo-toast.on{opacity:1;transform:translate(-50%,0)}
</style></head>
<body class="inspector-on">

<!-- ── ANIMATED 3D CAN PRELOADER ── -->
<div id="ld" data-edit-section="brand" data-edit-field="loaderImageUrl" data-edit-label="Preloader Logo & Emblem" style="cursor:pointer">
  <div class="lw">
    ${o.loaderImageUrl || o.logoImageUrl ? `<div class="ld-custom-logo" style="width:110px;height:110px;border-radius:24px;background:rgba(255,255,255,0.18);backdrop-filter:blur(12px);border:2px solid rgba(255,255,255,0.35);display:flex;align-items:center;justify-content:center;box-shadow:0 16px 36px rgba(0,0,0,0.35);margin:0 auto 16px;padding:12px"><img src="${o.loaderImageUrl || o.logoImageUrl}" alt="Loader Emblem" style="max-width:100%;max-height:100%;object-fit:contain"/></div>` : ""}
    <svg viewBox="0 0 120 250" id="lsv"><defs><clipPath id="lcl"><path d="M26 24H94L104 42V216Q104 232 88 232H32Q16 232 16 216V42Z"/></clipPath></defs>
    <g clip-path="url(#lcl)"><rect id="lq2" x="0" y="235" width="120" height="240" fill="var(--liq)"/><rect id="lfm" x="0" y="230" width="120" height="6" fill="#fff" opacity=".85"/>
    <g class="lb" fill="#fff" opacity=".75"><circle cx="35" cy="230" r="3"/><circle cx="60" cy="232" r="4" style="animation-delay:.5s"/><circle cx="82" cy="230" r="3" style="animation-delay:1s"/><circle cx="50" cy="232" r="2.5" style="animation-delay:1.4s"/><circle cx="90" cy="232" r="3.5" style="animation-delay:.25s"/></g></g>
    <path d="M26 24H94L104 42V216Q104 232 88 232H32Q16 232 16 216V42Z" fill="#ffffff10" stroke="#fff" stroke-opacity=".8" stroke-width="3"/>
    <rect x="24" y="20" width="72" height="6" rx="3" fill="#e5e7eb"/>
    <rect x="28" y="230" width="64" height="6" rx="3" fill="#e5e7eb"/>
    <g id="ldc"><rect x="46" y="8" width="28" height="12" rx="5" fill="var(--liq)" stroke="#fff" stroke-width="1.5"/></g></svg>
    <div class="lt"><b>${o.brandName}</b><span id="lp">0%</span></div><em id="lm">Chilling the cans…</em>
    <div class="tk" id="tk">🎟️ BUY 1 GET 1 FREE · CODE <b>${o.promoCode || "FIZZ20"}</b></div>
  </div>
</div>
<script>
/* ── IMMEDIATE PRELOADER ANIMATION (Independent of 3D / Assets) ── */
window.dismissFizzoPreloader = function() {
  const ldc = document.getElementById('ldc');
  if (ldc) ldc.classList.add('pop');
  const tk = document.getElementById('tk'); if (tk) tk.classList.add('on');
  const ld = document.getElementById('ld');
  if (ld) {
    ld.style.opacity = '0';
    ld.style.transition = 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
    setTimeout(() => { try { ld.remove(); } catch(e){} }, 700);
  }
  document.body.classList.add('go');
};

(function(){
  const lq2 = document.getElementById('lq2'), lfm = document.getElementById('lfm'), lpe = document.getElementById('lp'), lme = document.getElementById('lm');
  const M = ['Chilling the cans…', 'Infusing pinpoint fizz…', 'Laser-etching free code under the tab…', 'Almost ready…'];
  const lt0 = performance.now();
  let lpv = 0;
  function lk(){
    const el = (performance.now() - lt0) / 1050;
    lpv = Math.min(1, Math.max(lpv + 0.035, el));
    if (lq2) lq2.setAttribute('y', String(235 - lpv * 195));
    if (lfm) lfm.setAttribute('y', String(230 - lpv * 195));
    if (lpe) lpe.textContent = Math.round(lpv * 100) + '%';
    if (lme) lme.textContent = M[Math.min(3, Math.floor(lpv * 4))];
    if (lpv < 1) { requestAnimationFrame(lk); return; }
    if (lme) lme.textContent = 'POP! Your free-drink code is ready';
    setTimeout(window.dismissFizzoPreloader, 180);
  }
  lk();
  setTimeout(window.dismissFizzoPreloader, 1900);
})();
<\/script>

<div id="cr"></div>
<div id="sprog"></div>
<div id="fizzo-toast"></div>

<!-- ── FULLSCREEN FLAVOR SELECTOR OVERLAY ── -->
<div id="fs">
  <div>
    <h2>Choose your <em>flavor</em></h2>
    <p>Each flavour has its own 3D aluminum can, metallic colour, and world.</p>
  </div>
  <div>
    <div class="fl" id="fsBtns"></div>
    <button class="btn" id="go">ENTER ${o.brandName} →</button>
  </div>
</div>

<canvas id="gl"></canvas><div id="flash"></div><div id="vig"></div>
<div id="gr"></div><div id="sk"></div>

<!-- ── NAVBAR ── -->
<nav data-edit-section="brand" data-edit-label="Brand & Navbar">
  <span class="edit-pill-badge">✎ Edit Brand &amp; Nav</span>
  <a href="#tH" class="brand-wrap">
    ${o.logoImageUrl ? `<img src="${o.logoImageUrl}" alt="logo" />` : ""}
    <b>${o.brandName}</b>
  </a>
  <div class="nav-links">
    <a href="#flavors">${((r = o.navLinks) == null ? void 0 : r[0]) || "Flavors"}</a>
    <a href="#tB">${((a = o.navLinks) == null ? void 0 : a[1]) || "Can Fill"}</a>
    <a href="#tD">${((s = o.navLinks) == null ? void 0 : s[2]) || "Glass Pour"}</a>
    <a href="#journal">Articles</a>
    <a href="#contact">Contact</a>
  </div>
  <div class="nav-actions">
    <button id="nf"><i></i>FLAVOR</button>
    <button id="crateBtn">Inquire / Contact →</button>
  </div>
</nav>

<main>
  <!-- ── HERO STAGE (tH) ── -->
  <div class="tr" id="tH" style="height:175vh">
    <div class="stg" id="hero" data-edit-section="hero" data-edit-label="Hero Section">
      <span class="edit-pill-badge">✎ Edit Hero Section</span>
      <div class="hl">
        <small>${o.heroBadge || "SIGNATURE EDITION · LIVE 3D"}</small>
        <h1>${o.heroTitleLine1 || "Pop the"} <em id="hn">${o.heroTitleLine3 || "Fizz"}</em></h1>
        <p>${o.heroSubtext}</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <a class="btn" href="#flavors">EXPLORE 3D LINEUP</a>
          <a class="btn sec-btn" href="#contact" style="text-decoration:none;padding:15px 28px;border-radius:99px">PARTNER INQUIRY</a>
        </div>
        <span class="drag-pill">⟷ DRAG 3D CAN TO ROTATE</span>
        <span class="sc">${o.heroScrollHint || "SCROLL ↓"}</span>
      </div>
      <div class="bd">${o.promoBadgeTop || "CRAFT"}<br>${o.promoBadgeBottom || "SERIES"}<span>EDITION · ${o.promoCode || "2026"}</span></div>
    </div>
  </div>

  <!-- ── STAGE A (tA): CAN FORMING & SLEEVE WRAP ── -->
  <div class="tr" id="tA" style="height:360vh">
    <div class="stg" data-edit-section="bottle" data-edit-label="Stage 01: 3D Can Forming & Label">
      <span class="edit-pill-badge">✎ Edit Can Forming &amp; Fill</span>
      <div class="cap on" data-a="0" data-b="0.25">
        <small class="stage-tag">STAGE 01 · ALUMINUM BILLET</small>
        <h2>Born from a <em>billet</em></h2>
        <p>Every ${o.brandName} can starts as a pure recyclable aluminum cup, heated and ready to be drawn inside a precision steel die.</p>
      </div>
      <div class="cap" data-a="0.25" data-b="0.76">
        <small class="stage-tag">STAGE 01 · PRECISION MOLDING</small>
        <h2>Deep <em>drawing</em></h2>
        <p>High-pressure steel dies stretch the aluminum walls into our signature sleek 330 ml craft can silhouette in milliseconds.</p>
      </div>
      <div class="cap" data-a="0.76" data-b="1.1">
        <small class="stage-tag">STAGE 01 · ARTWORK WRAP</small>
        <h2>Sleeve <em>on</em></h2>
        <p>Once chilled, the vibrant metallic flavour sleeve wraps 360° around the can. Your can is ready for cold-filling.</p>
      </div>
      <div class="ps"><span id="vA">25</span>°C<small>CAN SHELL TEMP</small></div>
    </div>
  </div>

  <!-- ── STAGE B (tB): CHILLED NOZZLE FILL & LID SEAM SEAL ── -->
  <div class="tr" id="tB" style="height:360vh">
    <div class="stg" data-edit-section="bottle" data-edit-label="Stage 02: 3D Can Filling & Sealing">
      <span class="edit-pill-badge">✎ Edit Can Filling Stage</span>
      <div class="cap on" data-a="0" data-b="0.78">
        <small class="stage-tag">${o.bottleBadge || "STAGE 02 · STERILE NOZZLE FILL"}</small>
        <h2>${o.bottleTitleLine1 || "Fill"} <em>${o.bottleTitleStroke || "it up"}</em></h2>
        <p>${o.bottleSubtext || "A sterile high-velocity nozzle fills the aluminum can with chilled, perfectly carbonated botanical drink — exactly 330 ml each time."}</p>
      </div>
      <div class="cap" data-a="0.78" data-b="1.1">
        <small class="stage-tag">STAGE 02 · DOUBLE-SEAM LOCK</small>
        <h2>Seal <em>the lid</em></h2>
        <p>The moment 330 ml is reached, the stay-on-tab aluminum lid is double-seamed under pressure to lock in every bubble.</p>
      </div>
      <div class="ps"><span id="vB">0</span> ml<small>CHILLED FILLED</small></div>
    </div>
  </div>

  <!-- ── STAGE C (tC): CO2 PRESSURE BUILD & TAB POP BURST ── -->
  <div class="tr" id="tC" style="height:360vh">
    <div class="stg" data-edit-section="fill" data-edit-label="Stage 03: Pressure & Tab Pop">
      <span class="edit-pill-badge">✎ Edit Pressure &amp; Pour</span>
      <div class="cap on" data-a="0" data-b="0.32">
        <small class="stage-tag">STAGE 03 · CARBONATION CHARGE</small>
        <h2>Pressure <em>build</em></h2>
        <p>Beneath the aluminum tab, pinpoint carbon dioxide is tightly pressurised. That pressure gives ${o.brandName} its crisp champagne bite.</p>
      </div>
      <div class="cap" data-a="0.32" data-b="1.1">
        <small class="stage-tag">STAGE 03 · STAY-ON-TAB BURST</small>
        <h2><em>Pop!</em> Crack the tab</h2>
        <p>The aluminum tab lifts, the gas escapes in a frosty burst, and the first refreshing fizz of the day greets you.</p>
      </div>
      <div class="ps"><span id="vC">1.0</span> bar<small>CO₂ PRESSURE</small></div>
    </div>
  </div>

  <!-- ── STAGE D (tD): CAN TILT, GLASS POUR, FOAM & ICE + LIVE FLAVOR SWITCHER ── -->
  <div class="tr" id="tD" style="height:430vh">
    <div class="stg" data-edit-section="fill" data-edit-label="Stage 04: 3D Can Pour into Glass">
      <span class="edit-pill-badge">✎ Edit 3D Glass Pour</span>
      <div class="cap on" data-a="0" data-b="0.44">
        <small class="stage-tag">${o.fillBadge || "STAGE 04 · FRESH GLASS POUR"}</small>
        <h2>Time to <em>pour</em></h2>
        <p>${o.fillSubtext || "Tilt the FIZZO can and let the ice-cold drink cascade into the crystal glass, building a light, bubbly foam head with floating ice."}</p>
      </div>
      <div class="cap" data-a="0.44" data-b="1.1">
        <small class="stage-tag">STAGE 04 · CHAMPAGNE FIZZ</small>
        <h2>${o.fillTitleLine1 || "Feel"} the <em>${o.fillTitleLine3 || "fizz"}</em></h2>
        <p>Thousands of tiny bubbles in every sip: crisp, cold, zero sugar, and packed with real organic fruit.</p>
      </div>
      <div class="ps"><span id="vD">0</span>%<small>GLASS FILLED</small></div>
      <div id="flv"></div>
    </div>
  </div>

  <!-- ── STAGE E (tE): WORLDWIDE 3D GLOBE DISTRIBUTION ── -->
  <div class="tr" id="tE" style="height:380vh">
    <div class="stg" data-edit-section="hero" data-edit-label="Stage 05: Worldwide 3D Globe">
      <span class="edit-pill-badge">✎ Edit Global Reach</span>
      <div class="cap on" data-a="0" data-b="1.1">
        <small class="stage-tag">STAGE 05 · SIX CONTINENTS</small>
        <h2><em>World</em>wide</h2>
        <p>From one chilled aluminum can to every corner of the globe. ${o.brandName} travels cold-chain to hospitality venues across six continents.</p>
      </div>
      <div class="ps"><span id="vE">0</span>+<small>COUNTRIES</small></div>
    </div>
  </div>

  <!-- ── STAGE F (tF): 3D VARIETY BOX PACKING CHOREOGRAPHY (FINAL 3D STAGE) ── -->
  <div class="tr" id="tF" style="height:430vh">
    <div class="stg" data-edit-section="pack" data-edit-label="Stage 06: 3D Variety Box Packing">
      <span class="edit-pill-badge">✎ Edit 3D Variety Box Pack</span>
      <div class="cap on" data-a="0" data-b="1.1">
        <small class="stage-tag">${o.packBadge || "STAGE 06 · 3D VARIETY CRATE"}</small>
        <h2>${o.packTitleLine1 || "Watch It"} <em>${o.packTitleStroke || "Pack"}</em> ${o.packTitleLine3 || "Up!"}</h2>
        <p>${o.packSubtext || "Watch all 4 signature FIZZO cans drop into our custom kraft Variety Box — flaps fold shut and branded tape seals your crate."}</p>
        <div class="stage-pills">
          <div class="stage-pill act" id="pkSt1">${((c = o.packSteps) == null ? void 0 : c[0]) || "01. Open Crate"}</div>
          <div class="stage-pill" id="pkSt2">${((u = o.packSteps) == null ? void 0 : u[1]) || "02. Drop 4 Cans"}</div>
          <div class="stage-pill" id="pkSt3">${((d = o.packSteps) == null ? void 0 : d[2]) || "03. Fold Flaps"}</div>
          <div class="stage-pill" id="pkSt4">${((f = o.packSteps) == null ? void 0 : f[3]) || "04. Tape Seal"}</div>
        </div>
      </div>
      <div class="ps"><span id="vF">0</span>%<small>CRATE PACKED</small></div>
    </div>
  </div>

  <!-- ── MARQUEE RIBBON ── -->
  <div class="mq-bar" data-edit-section="marquee" data-edit-label="Marquee Ribbon">
    <span class="edit-pill-badge">✎ Edit Marquee Strip</span>
    <div class="mq-track">
      ${[...o.marqueeItems || [], ...o.marqueeItems || []].map((h) => `<span>${h}</span>`).join("")}
    </div>
  </div>

  <!-- ── MEET FIZZO SECTION ── -->
  <section class="sec" id="about" data-edit-section="hero" data-edit-label="About FIZZO Story">
    <span class="edit-pill-badge">✎ Edit Brand Story</span>
    <h2>Meet <em>${o.brandName}</em></h2>
    <p class="lead">${o.brandName} is a sparkling craft drink brand built on one simple idea: a soda should feel as good as it tastes. Every aluminum can is formed with precision, wrapped in bold metallic artwork, filled ice-cold with real organic fruit and prebiotic fiber, sealed under pressure, and packed into our signature Variety Crate.</p>
    <p class="lead">We craft four distinct flavours — switch between them below or in the 3D selector above to watch the entire website, lighting, and 3D can transform in real time.</p>
    <div class="stats">
      <div><b>4</b>Signature flavours</div>
      <div><b>330 ml</b>Per chilled can</div>
      <div><b>190+</b>Countries reached</div>
      <div><b>100%</b>Recyclable aluminum can</div>
    </div>
  </section>

  <!-- ── THE LINEUP (4 FLAVOR SHOWCASE CARDS — NO CART/CHECKOUT) ── -->
  <section class="sec" id="flavors" data-edit-section="flavors" data-edit-label="4 Flavor Cans Lineup">
    <span class="edit-pill-badge">✎ Edit 4 Flavors</span>
    <h2>The <em>lineup</em></h2>
    <p class="lead">Four flavours, four custom 3D cans. Choose one and the whole experience — including the colours, 3D can, and studio lighting — switches to match.</p>
    <div class="lineup" id="lu"></div>
  </section>

  <!-- ── CAN DETAILS & LIVE SPECIFICATION TABLE ── -->
  <section class="sec" id="spec" data-edit-section="flavors" data-edit-label="Can Details & Spec">
    <span class="edit-pill-badge">✎ Edit Flavor Specs</span>
    <h2>Can <em>details</em></h2>
    <p class="lead">The full specification of your selected flavour can. It updates automatically whenever you switch flavour.</p>
    <div class="specw">
      <div id="spb"></div>
      <div class="sp" id="sp"></div>
    </div>
  </section>

  <!-- ── EDITORIAL ARTICLES, PRESS & FORMULATION JOURNAL ── -->
  <section class="sec" id="journal" data-edit-section="pack" data-edit-label="Editorial Articles & Journal">
    <span class="edit-pill-badge">✎ Edit Articles &amp; Journal</span>
    <h2>Brand <em>Journal</em> &amp; Articles</h2>
    <p class="lead">Read our latest craft beverage formulation stories, sustainability reports, and culinary pairing articles.</p>
    <div class="lineup">
      <article class="card">
        <small style="color:var(--liq);font-weight:800;letter-spacing:.18em;font-size:.7rem">FORMULATION ARCHIVE · 05 MIN READ</small>
        <h3 style="margin:8px 0">Why Cold-Pressed Botanicals Beat Synthetic Extracts</h3>
        <p style="color:var(--mut);font-size:.94rem;line-height:1.65">By pressing Sicilian blood oranges and wild blackberries below 4°C, we preserve volatile aromatic esters that high-heat pasteurization destroys.</p>
      </article>
      <article class="card">
        <small style="color:var(--liq);font-weight:800;letter-spacing:.18em;font-size:.7rem">PACKAGING ENGINEERING · 04 MIN READ</small>
        <h3 style="margin:8px 0">Closed-Loop Aluminum: From Billet to Infinite Recycling</h3>
        <p style="color:var(--mut);font-size:.94rem;line-height:1.65">Inside our deep-draw aluminum forming line and why 330 ml cans chill 4x faster while maintaining 8.0 bar of pinpoint carbonation.</p>
      </article>
      <article class="card">
        <small style="color:var(--liq);font-weight:800;letter-spacing:.18em;font-size:.7rem">HOSPITALITY &amp; CULTURE · 06 MIN READ</small>
        <h3 style="margin:8px 0">Zero-Proof Mixology in Michelin-Starred Dining Rooms</h3>
        <p style="color:var(--mut);font-size:.94rem;line-height:1.65">How sommeliers across Tokyo, Paris, and Dubai are pairing prebiotic botanical sodas with multi-course tasting menus.</p>
      </article>
    </div>
  </section>

  <!-- ── NUTRITION FACTS & BOTANICAL FORMULA ── -->
  <section class="sec" id="nutrition" data-edit-section="nutrition" data-edit-label="Nutrition & Formula">
    <span class="edit-pill-badge">✎ Edit Nutrition Facts</span>
    <h2>${o.nutritionTitle || "Clean"} <em>Formula</em></h2>
    <div class="nut-grid">
      <div>
        <p class="lead">${o.nutritionSubtitle}</p>
        <div class="card in rdy" style="margin-top:22px">
          <h3 style="color:var(--liq);margin:0 0 8px">100% CLEAN BOTANICAL INGREDIENTS</h3>
          <p>${o.nutritionIngredients}</p>
        </div>
      </div>
      <div class="fda-card">
        <div class="fda-title">Nutrition Facts</div>
        <div class="fda-serv">Serving Size ${o.nutritionServing}</div>
        <div class="fda-cal">
          <span>Amount Per Serving<br><strong>Calories</strong></span>
          <strong>${o.nutritionCalories}</strong>
        </div>
        ${(o.nutritionFacts || []).map((h) => `
        <div class="fda-row">
          <span>${h.label} <strong>${h.amount}</strong></span>
          <span>${h.dv}</span>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <!-- ── CUSTOMER REVIEWS ── -->
  <section class="sec" id="reviews" data-edit-section="reviews" data-edit-label="Customer Reviews">
    <span class="edit-pill-badge">✎ Edit Customer Reviews</span>
    <h2>${o.reviewsTitle || "Loved by"} <em>Sippers</em></h2>
    <p class="lead">${o.reviewsBadge}</p>
    <div class="lineup">
      ${(o.reviews || []).map((h) => `
      <div class="card">
        <div style="color:var(--liq);letter-spacing:3px;font-size:1.1rem;margin-bottom:10px">${h.rating}</div>
        <p style="color:#fff;font-size:.98rem;line-height:1.6;margin-bottom:16px">"${h.quote}"</p>
        <strong style="display:block;color:var(--liq)">${h.name}</strong>
        <small style="color:var(--mut)">${h.role}</small>
      </div>`).join("")}
    </div>
  </section>

  <!-- ── DIRECT CONTACT & HOSPITALITY / DISTRIBUTION INQUIRY SECTION (NO CHECKOUT) ── -->
  <section class="sec" id="contact" data-edit-section="footer" data-edit-label="Contact & Inquiry Concierge">
    <span class="edit-pill-badge">✎ Edit Contact Section</span>
    <h2>Direct <em>Contact</em> &amp; Distribution</h2>
    <p class="lead">Interested in stocking ${o.brandName}, custom event tasting crates, or press samples? Send our concierge team a direct inquiry below.</p>
    <div class="nut-grid" style="margin-top:26px">
      <div class="card in rdy">
        <small style="color:var(--liq);font-weight:800;letter-spacing:.18em">GLOBAL HOSPITALITY DESK</small>
        <h3 style="margin:10px 0 8px">${o.brandName} Craft Beverage Studio</h3>
        <p style="color:var(--mut);line-height:1.65;margin-bottom:18px">Direct wholesale, lounge partnerships, architectural events, and editorial press kits shipped worldwide from our cold-chain hubs.</p>
        <p style="margin:6px 0"><strong>Concierge Email:</strong> hello@${(o.brandName || "fizzo").toLowerCase()}.example</p>
        <p style="margin:6px 0"><strong>Distribution Hubs:</strong> London · Dubai · New York · Tokyo</p>
        <p style="margin:6px 0"><strong>Response Time:</strong> Within 4 Business Hours</p>
      </div>
      <form id="fizzoContactForm" class="card in rdy" style="display:grid;gap:14px">
        <input required placeholder="Your Full Name / Organization" style="padding:14px 16px;border-radius:14px;border:1px solid rgba(255,255,255,0.18);background:rgba(0,0,0,0.35);color:#fff;font:inherit" />
        <input required type="email" placeholder="Business or Press Email Address" style="padding:14px 16px;border-radius:14px;border:1px solid rgba(255,255,255,0.18);background:rgba(0,0,0,0.35);color:#fff;font:inherit" />
        <textarea rows="3" required placeholder="Tell us about your hospitality inquiry, event showcase, or tasting request..." style="padding:14px 16px;border-radius:14px;border:1px solid rgba(255,255,255,0.18);background:rgba(0,0,0,0.35);color:#fff;font:inherit"></textarea>
        <button type="submit" class="btn" style="justify-content:center;border:0;cursor:pointer" id="orderNowBtn">${o.footerCtaText || "SEND DIRECT INQUIRY →"}</button>
      </form>
    </div>
  </section>

  <!-- ── FOOTER (WITH LOCKED POWERED BY EFERZ WATERMARK) ── -->
  <footer data-edit-section="footer" data-edit-label="Footer Section">
    <span class="edit-pill-badge">✎ Edit Footer</span>
    <div class="fg">
      <div><b>${o.footerTitle || o.brandName}</b><p>${o.footerSubtext}</p></div>
      <div><b>EXPLORE</b><a href="#about">About</a><a href="#flavors">Lineup</a><a href="#spec">Can Details</a><a href="#journal">Articles</a><a href="#contact">Contact</a></div>
      <div><b>CONTACT</b><p>hello@${(o.brandName || "fizzo").toLowerCase()}.example</p></div>
    </div>
    <div style="max-width:1180px;margin:28px auto 0;padding-top:20px;border-top:1px solid rgba(255,255,255,0.12);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px;font-size:.8rem;color:rgba(255,255,255,0.72)">
      <span>© 2026 <strong style="color:#fff">${o.brandName || "FIZZO"}</strong>. All Rights Reserved.</span>
      <span style="display:inline-flex;align-items:center;gap:8px;padding:7px 16px;border-radius:999px;background:rgba(208,33,40,0.16);border:1px solid rgba(208,33,40,0.55);color:#fff;font-weight:800;letter-spacing:.08em;user-select:none">
        🔒 Powered by <a href="https://eferz.com" target="_blank" rel="noopener noreferrer" style="color:#ff5500;text-decoration:underline;font-weight:900">EFerz</a> (<a href="https://eferz.com" target="_blank" rel="noopener noreferrer" style="color:#fff;text-decoration:none">EFerz.com</a>)
      </span>
    </div>
  </footer>
</main>

<!-- Floating Quick-Edit Bar when any text is clicked -->
<div id="fizzo-inline-bar" style="position:fixed;bottom:22px;left:50%;transform:translate(-50%,20px);z-index:260;background:rgba(12,8,18,0.95);backdrop-filter:blur(16px);border:1px solid var(--liq);color:#fff;padding:8px 18px;border-radius:999px;font-size:.76rem;font-weight:700;letter-spacing:.06em;display:flex;align-items:center;gap:10px;opacity:0;pointer-events:none;transition:.3s;box-shadow:0 16px 40px rgba(0,0,0,0.7)">
  <span style="width:8px;height:8px;border-radius:50%;background:var(--liq);box-shadow:0 0 10px var(--liq)"></span>
  <span id="fizzo-inline-msg">Click any text to edit directly on canvas or in the left customizer</span>
</div>

<script src="/three.r128.min.js"><\/script>
<script>
(function initFizzoScope(){
  if (typeof THREE === 'undefined') {
    if (!window._threeScriptRequested) {
      window._threeScriptRequested = true;
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      s.onload = () => setTimeout(initFizzoScope, 20);
      document.head.appendChild(s);
    }
    setTimeout(initFizzoScope, 40);
    return;
  }
  const CONFIG = ${v};
  const $=n=>document.getElementById(n),clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),sm=(a,b,x)=>clamp((x-a)/(b-a)),ease=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2,lerp=(a,b,t)=>a+(b-a)*t;
  const root=document.documentElement,V3=THREE.Vector3;

/* ── CLICK-TO-EDIT INSPECTOR + DIRECT INLINE TEXT EDITING ── */
function highlightSelectedSection(sectionId, flavorIndex) {
  document.querySelectorAll('[data-edit-section]').forEach((el) => {
    const matchSec = el.getAttribute('data-edit-section') === sectionId;
    const elFlav = el.getAttribute('data-flavor-index');
    const matchFlav =
      sectionId !== 'flavors' ||
      flavorIndex === undefined ||
      elFlav === null ||
      elFlav === String(flavorIndex);
    el.classList.toggle('is-selected-element', Boolean(matchSec && matchFlav));
  });
}

document.addEventListener('click', (e) => {
  /* Allow direct click-on-any-text editing when inspector is enabled */
  if (document.body.classList.contains('inspector-on')) {
    const textEl = e.target.closest('h1,h2,h3,p,small,em,b,span,li,td,th');
    const inLockedFooter = e.target.closest('footer a[href*="EFerz"]');
    if (textEl && !inLockedFooter && !textEl.classList.contains('edit-pill-badge') && textEl.children.length <= 2) {
      textEl.setAttribute('contenteditable', 'true');
      textEl.style.outline = '1.5px dashed var(--liq)';
      textEl.style.outlineOffset = '4px';
      textEl.style.borderRadius = '6px';
      const bar = $('fizzo-inline-bar');
      const msg = $('fizzo-inline-msg');
      if (bar && msg) {
        msg.textContent = '✎ Editing text directly: "' + (textEl.innerText || '').slice(0, 32) + '..."';
        bar.style.opacity = '1';
        bar.style.transform = 'translate(-50%,0)';
        clearTimeout(bar._t);
        bar._t = setTimeout(() => {
          bar.style.opacity = '0';
          bar.style.transform = 'translate(-50%,20px)';
        }, 3200);
      }
    }
  }

  const target = e.target.closest('[data-edit-section]');
  if (!target) return;
  const section = target.getAttribute('data-edit-section');
  const flavorAttr = target.getAttribute('data-flavor-index');
  const label = target.getAttribute('data-edit-label') || section;
  const flavorIndex = flavorAttr !== null ? parseInt(flavorAttr, 10) : cf;

  highlightSelectedSection(section, flavorIndex);
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({
      type: 'FIZZO_SELECT_SECTION',
      section: section,
      flavorIndex: flavorIndex,
      label: label
    }, '*');
  }
});

window.addEventListener('message', (event) => {
  const data = event.data;
  if (!data || typeof data !== 'object') return;
  if (data.type === 'FIZZO_SET_INSPECTOR') {
    document.body.classList.toggle('inspector-on', Boolean(data.enabled));
  }
  if (data.type === 'FIZZO_FOCUS_SECTION') {
    highlightSelectedSection(data.section, data.flavorIndex);
    if (typeof data.flavorIndex === 'number' && data.flavorIndex >= 0 && data.flavorIndex < F.length) {
      pick(data.flavorIndex);
    }
    const el = document.querySelector('[data-edit-section="' + data.section + '"]');
    if (el && data.scrollIntoView) {
      const top = el.getBoundingClientRect().top + scrollY - 60;
      tg = clamp(top, 0, root.scrollHeight - innerHeight);
    }
  }
});

/* ── TOAST & DIRECT CONTACT SCROLL (NO CART/CHECKOUT) ── */
function showToast(msg) {
  const t = $('fizzo-toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('on');
  clearTimeout(t._tm);
  t._tm = setTimeout(() => t.classList.remove('on'), 2600);
}
function scrollToContact(flavName) {
  const cEl = $('contact');
  if (cEl) tg = clamp(cEl.getBoundingClientRect().top + scrollY - 60, 0, root.scrollHeight - innerHeight);
  if (flavName) showToast('✦ Selected ' + flavName + ' — Send your inquiry below');
}
$('crateBtn').onclick = () => scrollToContact();
const cForm = $('fizzoContactForm');
if (cForm) {
  cForm.onsubmit = (e) => {
    e.preventDefault();
    showToast('✦ Direct Inquiry Sent! Our hospitality team will reply shortly.');
    cForm.reset();
  };
}

/* ── SMOOTH SCROLL ── */
let tg=scrollY,cur=scrollY,loading=false,selecting=false;
addEventListener('wheel',e=>{if(selecting)return;if(e.ctrlKey)return;tg=clamp(tg+e.deltaY*(e.deltaMode?32:1),0,root.scrollHeight-innerHeight)},{passive:true});
addEventListener('scroll',()=>{if(Math.abs(scrollY-cur)>3)tg=cur=scrollY});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.onclick=e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));if(t)tg=clamp(t.getBoundingClientRect().top+scrollY,0,root.scrollHeight-innerHeight)});

/* ── WEBGL RENDERER & STUDIO ENVIRONMENT ── */
const cv=$('gl'),R=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true});
R.setPixelRatio(Math.min(devicePixelRatio,2));R.outputEncoding=THREE.sRGBEncoding;R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.08;R.localClippingEnabled=true;
const scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(35,1,.1,100);
const env=new THREE.Scene();env.add(new THREE.Mesh(new THREE.BoxGeometry(30,30,30),new THREE.MeshBasicMaterial({color:0x0c0714,side:THREE.BackSide})));
function pnl(w,h,x,y,z,c,i){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color(c).multiplyScalar(i),side:THREE.DoubleSide}));m.position.set(x,y,z);m.lookAt(0,0,0);env.add(m)}
pnl(3,16,-9,2,4,0xffffff,6);pnl(3,16,9,2,3,0xffe2c8,5);pnl(14,3,0,10,0,0xffffff,5);pnl(4,12,0,0,-10,0xff6a2a,4);
scene.environment=new THREE.PMREMGenerator(R).fromScene(env,.02).texture;
const key=new THREE.DirectionalLight(0xffe8d0,1.35);key.position.set(4,6,6);scene.add(key);
const rim=new THREE.PointLight(0xff7a2f,2.2,30);rim.position.set(-4,2,-4);scene.add(rim);
function resize(){R.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}resize();addEventListener('resize',resize);

/* ── MAP CONFIG FLAVORS TO 3D CAN PROFILES ── */
const patterns = ['wave', 'sun', 'stripes', 'dots'];
const F = (CONFIG.flavors || []).map((fl, i) => ({
  n: fl.name || ('FLAVOR ' + (i + 1)),
  sub: fl.sub || 'Sparkling Craft Drink',
  desc: fl.desc || 'Crisp, cold, and packed with real organic fruit.',
  customImageUrl: fl.customImageUrl || null,
  price: fl.price || '$32.00',
  packLabel: fl.packLabel || '12-Can Case',
  ctaText: fl.ctaText || ('Add To Crate — ' + fl.name),
  cal: fl.calories || '35',
  sug: fl.sugar || '0g',
  fib: fl.fiber || '5g',
  caf: fl.caffeine || (i === 0 ? '34 mg' : '0 mg'),
  notes: fl.tastingNotes || (i === 0 ? 'Blood orange, vanilla bean, citrus zest' : i === 1 ? 'Wild blackberry, hibiscus, raspberry' : i === 2 ? 'Key lime zest, garden mint, sea salt' : 'Concord grape, botanical extracts'),
  ing: fl.ingredients || CONFIG.nutritionIngredients || 'Carbonated Mountain Water, Cold-Pressed Organic Juice, Prebiotic Fiber',
  acc: fl.accentHex || '#ff9a00',
  liq: fl.canHex || '#ff5500',
  bg: '#0b0710',
  bg2: fl.bgHex || '#c84200',
  cap: '#e5e7eb',
  tint: '#ffffff',
  ly: [0.55, 4.95],
  lb: { c1: fl.canHex || '#ff5500', c2: fl.accentHex || '#ffffff44', d: patterns[i % 4] },
  /* Sleek 330ml Aluminum Beverage Can Lathe Profile (height 0 to 5.6) */
  bp: [
    [0, 0.04],
    [0.82, 0.0],
    [1.04, 0.14],
    [1.18, 0.42],
    [1.18, 4.88],
    [1.02, 5.34],
    [0.92, 5.52],
    [0.96, 5.6]
  ]
}));

const LIQ=new THREE.Color(F[0].acc);
function lathe(p,spline){const v=p.map(a=>new THREE.Vector2(a[0],a[1]));return new THREE.LatheGeometry(spline?new THREE.SplineCurve(v).getPoints(90):v,64)}
const canShellM=new THREE.MeshPhysicalMaterial({color:0xf4f6f9,roughness:.18,metalness:.82,transparent:true,opacity:.42,clearcoat:1,clearcoatRoughness:.08,envMapIntensity:2.2,side:THREE.DoubleSide,depthWrite:false,emissive:0xff6a1f,emissiveIntensity:0});
function liqMat(pl){return new THREE.MeshPhysicalMaterial({color:LIQ,roughness:.15,transparent:true,opacity:.94,side:THREE.DoubleSide,clippingPlanes:[pl],emissive:LIQ,emissiveIntensity:.32,envMapIntensity:1.3,clearcoat:.6})}
const plB=new THREE.Plane(new V3(0,-1,0),-9),plG=new THREE.Plane(new V3(0,-1,0),-9);
const liqMats=[];

/* ── 3D SODA CAN GROUP (PIVOT AT TOP MOUTH FOR POURING & FILLING) ── */
const bottle=new THREE.Group(),sc=new THREE.Group(),body=new THREE.Group();body.position.y=-5.6;
bottle.add(sc);sc.add(body);
const gMesh=new THREE.Mesh(lathe(F[0].bp,1),canShellM);body.add(gMesh);
const lm1=liqMat(plB);liqMats.push(lm1);
const lMesh=new THREE.Mesh(lathe(F[0].bp.map(a=>[a[0]*.94,a[1]]),1),lm1);body.add(lMesh);

/* Metallic Top & Bottom Can Rims */
const rimMetalMat=new THREE.MeshStandardMaterial({color:0xe5e7eb,metalness:.95,roughness:.16,envMapIntensity:2});
const topChime=new THREE.Mesh(new THREE.TorusGeometry(.94,.055,16,64),rimMetalMat);
topChime.rotation.x=Math.PI/2;topChime.position.y=5.56;body.add(topChime);
const botChime=new THREE.Mesh(new THREE.TorusGeometry(.86,.05,16,64),rimMetalMat);
botChime.rotation.x=Math.PI/2;botChime.position.y=.06;body.add(botChime);

/* Dynamic 360° Can Artwork Sleeve Texture */
let loadedLogoImg = null;
if (CONFIG.logoImageUrl) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    loadedLogoImg = img;
    drawLabel(F[cf]);
    rebuildPackCans();
  };
  img.src = CONFIG.logoImageUrl;
}

const lc=document.createElement('canvas');lc.width=1024;lc.height=512;const lx=lc.getContext('2d'),ltex=new THREE.CanvasTexture(lc);ltex.encoding=THREE.sRGBEncoding;
function drawLabel(f, targetCtx, targetTex){
  const ctx = targetCtx || lx;
  const tex = targetTex || ltex;
  const L=f.lb;
  const grad=ctx.createLinearGradient(0,0,1024,512);
  grad.addColorStop(0,L.c1);
  grad.addColorStop(0.5,f.acc);
  grad.addColorStop(1,L.c1);
  ctx.fillStyle=grad;ctx.fillRect(0,0,1024,512);

  ctx.fillStyle='rgba(255,255,255,0.14)';
  if(L.d=='wave'){ctx.beginPath();ctx.moveTo(0,512);for(let x=0;x<=1024;x+=8)ctx.lineTo(x,420+Math.sin(x/40)*18);ctx.lineTo(1024,512);ctx.fill()}
  if(L.d=='sun')for(let i=0;i<24;i++){ctx.beginPath();ctx.moveTo(512,256);ctx.arc(512,256,620,i*.2618,i*.2618+.1309);ctx.fill()}
  if(L.d=='stripes')for(let x=-300;x<1200;x+=64){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x+32,0);ctx.lineTo(x+160,512);ctx.lineTo(x+128,512);ctx.fill()}
  if(L.d=='dots')for(let x=24;x<1024;x+=48)for(let y=24;y<512;y+=48){ctx.beginPath();ctx.arc(x+((y/48|0)%2)*24,y,7,0,7);ctx.fill()}

  /* Silver Rim Strips */
  ctx.fillStyle='rgba(255,255,255,0.32)';
  ctx.fillRect(0,12,1024,10);
  ctx.fillRect(0,490,1024,10);

  if (loadedLogoImg) {
    try { ctx.drawImage(loadedLogoImg, 462, 34, 100, 70); } catch(e){}
  }

  if (f.customImageUrl) {
    if (!f._customImg) {
      const ci = new Image();
      ci.crossOrigin = 'anonymous';
      ci.onload = () => {
        f._customImg = ci;
        try { ctx.drawImage(ci, 0, 0, 1024, 512); tex.needsUpdate = true; } catch(e){}
      };
      ci.src = f.customImageUrl;
    } else {
      try { ctx.drawImage(f._customImg, 0, 0, 1024, 512); } catch(e){}
    }
  }

  ctx.fillStyle='#fff';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.font='900 138px Anton, Impact, Segoe UI, sans-serif';
  ctx.shadowColor='rgba(0,0,0,0.35)';ctx.shadowBlur=18;
  ctx.fillText((CONFIG.brandName || 'FIZZO').toUpperCase(),512,205);
  ctx.shadowBlur=0;

  /* White Pill for Flavor Name */
  ctx.fillStyle='#ffffff';
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(252,295,520,76,38);
  else ctx.fillRect(252,295,520,76);
  ctx.fill();

  ctx.fillStyle='#150a05';
  ctx.font='900 42px Plus Jakarta Sans, Segoe UI, sans-serif';
  ctx.fillText(f.n.toUpperCase(),512,334);

  ctx.fillStyle='rgba(255,255,255,0.9)';
  ctx.font='800 24px Plus Jakarta Sans, sans-serif';
  ctx.fillText((f.sub || 'SPARKLING CRAFT SODA').toUpperCase() + '  •  330 ML',512,435);
  tex.needsUpdate=true;
}
drawLabel(F[0]);

const label=new THREE.Mesh(new THREE.CylinderGeometry(1.195,1.195,4.35,64,1,true),new THREE.MeshStandardMaterial({map:ltex,roughness:.26,metalness:.42,side:THREE.DoubleSide}));
label.position.y=2.72;label.rotation.y=Math.PI;body.add(label);

/* Aluminum Can Lid + Stay-On Pull Tab (Seals in Stage B & Pops in Stage C!) */
const cap=new THREE.Group();
const lidDisk=new THREE.Mesh(new THREE.CylinderGeometry(.92,.92,.08,48),rimMetalMat);
const pullTab=new THREE.Mesh(new THREE.TorusGeometry(.22,.035,12,28),rimMetalMat);
pullTab.rotation.x=Math.PI/2;pullTab.position.set(.14,.06,0);
const tabRivet=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,.1,16),rimMetalMat);
tabRivet.position.set(0,.05,0);
cap.add(lidDisk,pullTab,tabRivet);
bottle.add(cap);

const grp=new THREE.Group();grp.add(bottle);scene.add(grp);

/* ── STAGE A & B: STEEL FORMING DIES, STERILE NOZZLE & LIQUID STREAM ── */
const mm=new THREE.MeshStandardMaterial({color:0x2b2b33,metalness:.9,roughness:.35}),mL=new THREE.Mesh(new THREE.BoxGeometry(1.1,6.4,3),mm),mR=mL.clone();grp.add(mL,mR);
const noz=new THREE.Group(),nm=new THREE.MeshStandardMaterial({color:0xb4b8c2,metalness:1,roughness:.25});
const n1=new THREE.Mesh(new THREE.CylinderGeometry(.36,.36,2.6,32),nm);n1.position.y=1.5;const n2=new THREE.Mesh(new THREE.CylinderGeometry(.16,.2,.4,24),nm);n2.position.y=.2;noz.add(n1,n2);grp.add(noz);
const stream=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,1,16).translate(0,.5,0),new THREE.MeshPhysicalMaterial({color:LIQ,emissive:LIQ,emissiveIntensity:.35,roughness:.1,transparent:true,opacity:.9}));grp.add(stream);liqMats.push(stream.material);

/* ── STAGE D: CRYSTAL TUMBLER GLASS, FOAM HEAD & FLOATING ICE ── */
const gl=new THREE.Group();
const glassTumblerMat=new THREE.MeshPhysicalMaterial({color:0xffffff,roughness:.04,metalness:0,transparent:true,opacity:.24,clearcoat:1,clearcoatRoughness:.03,envMapIntensity:2.2,side:THREE.DoubleSide,depthWrite:false});
gl.add(new THREE.Mesh(lathe([[0,0],[.9,0],[1,.1],[1.08,.7],[1.35,3.4]]),glassTumblerMat));
const lm2=liqMat(plG);liqMats.push(lm2);
gl.add(new THREE.Mesh(lathe([[0,.12],[.88,.12],[.95,.2],[1,.7],[1.27,3.4]]),lm2));
/* Floating Ice Cubes inside the Glass */
const iceG=new THREE.Group();
const iceM=new THREE.MeshPhysicalMaterial({color:0xe8f8ff,roughness:.08,transparent:true,opacity:.75,clearcoat:1,envMapIntensity:2});
for(let ic=0;ic<3;ic++){
  const cube=new THREE.Mesh(new THREE.BoxGeometry(.42,.42,.42),iceM);
  cube.position.set((ic-1)*.34,(ic%2)*.14,(ic-1)*.2);
  cube.rotation.set(ic*.5,ic*.8,ic*.3);
  iceG.add(cube);
}
gl.add(iceG);
grp.add(gl);

/* ── PODIUM, GLOW RING & SHADOW ── */
const sg=document.createElement('canvas');sg.width=sg.height=128;const sx=sg.getContext('2d'),gr=sx.createRadialGradient(64,64,0,64,64,64);gr.addColorStop(0,'rgba(0,0,0,.75)');gr.addColorStop(1,'rgba(0,0,0,0)');sx.fillStyle=gr;sx.fillRect(0,0,128,128);
const shadow=new THREE.Mesh(new THREE.PlaneGeometry(5,5),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(sg),transparent:true,depthWrite:false}));shadow.rotation.x=-Math.PI/2;grp.add(shadow);
const pod=new THREE.Mesh(new THREE.CylinderGeometry(3,3.15,.25,72),new THREE.MeshStandardMaterial({color:0x101014,metalness:.9,roughness:.2,envMapIntensity:1.5}));pod.position.y=-2.93;grp.add(pod);
const ring=new THREE.Mesh(new THREE.RingGeometry(2.55,2.65,96),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.7,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,depthWrite:false}));ring.rotation.x=-Math.PI/2;ring.position.y=-2.795;grp.add(ring);

/* Condensation Droplets on 3D Can */
const drops=new THREE.InstancedMesh(new THREE.SphereGeometry(.024,10,8),new THREE.MeshPhysicalMaterial({color:0xffffff,roughness:0,metalness:0,transparent:true,opacity:.45,envMapIntensity:2.5,clearcoat:1,depthWrite:false}),95);body.add(drops);
function dropsFor(f){
  const m=new THREE.Matrix4(),q=new THREE.Quaternion();
  for(let n=0;n<95;n++){
    const y=.45+Math.random()*4.5,r=1.19,a=Math.random()*6.283,k=.7+Math.random()*.8,l=1+Math.random()*1.5;
    m.compose(new V3(Math.sin(a)*(r+.025),y,Math.cos(a)*(r+.025)),q.setFromEuler(new THREE.Euler(0,a,0)),new V3(k,k*l,k*.5));
    drops.setMatrixAt(n,m);
  }
  drops.instanceMatrix.needsUpdate=true;
}
dropsFor(F[0]);

/* ── CO2 FIZZ BURST PARTICLES & BOKEH ── */
const spc=document.createElement('canvas');spc.width=spc.height=64;const spx=spc.getContext('2d'),sgr=spx.createRadialGradient(32,32,0,32,32,32);sgr.addColorStop(0,'rgba(255,255,255,1)');sgr.addColorStop(1,'rgba(255,255,255,0)');spx.fillStyle=sgr;spx.fillRect(0,0,64,64);
const N=500,gp=new Float32Array(N*3),gv=new Float32Array(N*3),gla=new Float32Array(N),gcol=new Float32Array(N*3),gg=new THREE.BufferGeometry();
gg.setAttribute('position',new THREE.BufferAttribute(gp,3));gg.setAttribute('color',new THREE.BufferAttribute(gcol,3));
const pts=new THREE.Points(gg,new THREE.PointsMaterial({size:1.2,map:new THREE.CanvasTexture(spc),vertexColors:true,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));pts.frustumCulled=false;scene.add(pts);
let gi=0;function emit(n,sp,y){for(let k=0;k<n;k++){const i=gi++%N,a=Math.random()*6.28,v=(.04+Math.random()*.1)*sp;gp.set([Math.cos(a)*.18,y,Math.sin(a)*.18],i*3);gv.set([Math.cos(a)*v*.5,v*(.8+Math.random()),Math.sin(a)*v*.5],i*3);gla[i]=1}}

const st=new Float32Array(900);for(let i=0;i<300;i++){const v=new V3(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize().multiplyScalar(40);st.set([v.x,v.y,v.z],i*3)}
const sgm=new THREE.BufferGeometry();sgm.setAttribute('position',new THREE.BufferAttribute(st,3));scene.add(new THREE.Points(sgm,new THREE.PointsMaterial({size:.12,color:0xffffff,transparent:true,opacity:.6})));

const BK=120,bkp=new Float32Array(BK*3);for(let i=0;i<BK;i++)bkp.set([(Math.random()-.5)*26,(Math.random()-.5)*14,-4-Math.random()*8],i*3);
const bkg=new THREE.BufferGeometry();bkg.setAttribute('position',new THREE.BufferAttribute(bkp,3));
const bkm=new THREE.PointsMaterial({size:1.1,map:new THREE.CanvasTexture(spc),color:0xffffff,transparent:true,opacity:.25,blending:THREE.AdditiveBlending,depthWrite:false});scene.add(new THREE.Points(bkg,bkm));

/* ── STAGE E (tE): 3D WORLDWIDE GLOBE ── */
const globe=new THREE.Group(),tc=document.createElement('canvas');tc.width=2000;tc.height=960;const tx=tc.getContext('2d');
tx.fillStyle='#0d1530';tx.fillRect(0,0,2000,960);tx.strokeStyle='#ffffff10';for(let i=0;i<2000;i+=100){tx.beginPath();tx.moveTo(i,0);tx.lineTo(i,960);tx.stroke()}for(let i=0;i<960;i+=80){tx.beginPath();tx.moveTo(0,i);tx.lineTo(2000,i);tx.stroke()}
tx.scale(2,2);
['M120 90L230 70L300 100L310 150L270 190L240 230L210 215L160 170L130 130Z','M330 50L390 45L380 95L345 90Z','M250 250L310 250L340 300L310 370L275 420L265 340L240 290Z','M460 100L540 85L560 130L520 150L470 145Z','M470 165L560 160L590 210L570 300L530 350L500 300L480 230Z','M560 85L700 70L830 100L860 160L800 210L740 240L700 200L640 180L590 160Z','M660 195L710 200L695 250Z','M780 310L860 300L880 350L820 370L780 350Z'].forEach(d=>{const p=new Path2D(d);tx.save();tx.clip(p);tx.fillStyle='#ffd2a8';for(let x=0;x<1000;x+=4)for(let y=0;y<480;y+=4)tx.fillRect(x,y,1.4,1.4);tx.restore()});
const gt=new THREE.CanvasTexture(tc);gt.encoding=THREE.sRGBEncoding;
globe.add(new THREE.Mesh(new THREE.SphereGeometry(3,96,64),new THREE.MeshStandardMaterial({map:gt,emissiveMap:gt,emissive:0xffffff,emissiveIntensity:.7,roughness:.7,metalness:.1})));
const atm=new THREE.Mesh(new THREE.SphereGeometry(3.15,64,48),new THREE.MeshBasicMaterial({color:LIQ,transparent:true,opacity:.1,side:THREE.BackSide,blending:THREE.AdditiveBlending,depthWrite:false}));globe.add(atm);
const ll=(x,y,r)=>{const ph=(x/1000)*2*Math.PI,th=(y/480)*Math.PI;return new V3(-r*Math.cos(ph)*Math.sin(th),r*Math.cos(th),r*Math.sin(ph)*Math.sin(th))};
const hub=[640,205],hv=ll(hub[0],hub[1],3.02),routes=[],lineMats=[];
const hm=new THREE.Mesh(new THREE.SphereGeometry(.1,16,16),new THREE.MeshBasicMaterial({color:0xffffff}));hm.position.copy(hv);globe.add(hm);
[[262,142],[150,152],[312,332],[482,112],[502,238],[552,332],[846,150],[842,346]].forEach(d=>{
 const b=ll(d[0],d[1],3.02),mid=hv.clone().add(b).multiplyScalar(.5).normalize().multiplyScalar(3.1+hv.distanceTo(b)*.3),cv3=new THREE.QuadraticBezierCurve3(hv,mid,b),pp=cv3.getPoints(64);
 const lm=new THREE.LineBasicMaterial({color:LIQ});lineMats.push(lm);const ln=new THREE.Line(new THREE.BufferGeometry().setFromPoints(pp),lm);ln.geometry.setDrawRange(0,0);globe.add(ln);
 const mk=new THREE.Mesh(new THREE.SphereGeometry(.07,16,16),new THREE.MeshBasicMaterial({color:0xffffff}));mk.position.copy(b);mk.visible=false;globe.add(mk);
 const dots=[0,1,2].map(()=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.045,8,8),new THREE.MeshBasicMaterial({color:0xffffff}));m.visible=false;globe.add(m);return m});
 routes.push({ln,cv3,mk,dots})});
const rot0=-Math.atan2(hv.x,hv.z);globe.visible=false;scene.add(globe);

/* ── STAGE F (tF): 3D VARIETY BOX PACKING GROUP (FINAL 3D STAGE) ── */
const packGroup=new THREE.Group();
packGroup.visible=false;
scene.add(packGroup);

function makeBoxFrontTex(){
  const c=document.createElement('canvas');c.width=1024;c.height=512;const ctx=c.getContext('2d');
  ctx.fillStyle='#c68b59';ctx.fillRect(0,0,1024,512);
  ctx.strokeStyle='#8c582c';ctx.lineWidth=18;ctx.strokeRect(20,20,984,472);
  ctx.fillStyle='#150a05';ctx.font='900 130px Anton, Impact, sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText((CONFIG.brandName || 'FIZZO').toUpperCase() + ' VARIETY BOX',512,210);
  ctx.fillStyle=F[0].liq;ctx.beginPath();
  if(ctx.roundRect)ctx.roundRect(242,305,540,86,43);else ctx.fillRect(242,305,540,86);
  ctx.fill();
  ctx.fillStyle='#fff';ctx.font='800 36px Plus Jakarta Sans, sans-serif';
  ctx.fillText('4 SIGNATURE CANS • CHILLED PACK',512,348);
  const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;t.needsUpdate=true;return t;
}
const kraftMat=new THREE.MeshStandardMaterial({color:0xc68b59,roughness:.75});
const kraftFrontMat=new THREE.MeshStandardMaterial({map:makeBoxFrontTex(),roughness:.68});
const boxW=4.2,boxH=2.65,boxD=2.85;
const boxBase=new THREE.Group();packGroup.add(boxBase);
const fWall=new THREE.Mesh(new THREE.BoxGeometry(boxW,boxH,.09),kraftFrontMat);fWall.position.set(0,0,boxD/2);
const bWall=new THREE.Mesh(new THREE.BoxGeometry(boxW,boxH,.09),kraftMat);bWall.position.set(0,0,-boxD/2);
const lWall=new THREE.Mesh(new THREE.BoxGeometry(.09,boxH,boxD),kraftMat);lWall.position.set(-boxW/2,0,0);
const rWall=new THREE.Mesh(new THREE.BoxGeometry(.09,boxH,boxD),kraftMat);rWall.position.set(boxW/2,0,0);
const botFloor=new THREE.Mesh(new THREE.BoxGeometry(boxW,.09,boxD),kraftMat);botFloor.position.set(0,-boxH/2,0);
boxBase.add(fWall,bWall,lWall,rWall,botFloor);

const leftFlapPivot=new THREE.Group();leftFlapPivot.position.set(-boxW/2,boxH/2,0);
const leftFlapMesh=new THREE.Mesh(new THREE.BoxGeometry(boxW/2,.08,boxD),kraftMat);leftFlapMesh.position.set(boxW/4,0,0);
leftFlapPivot.add(leftFlapMesh);leftFlapPivot.rotation.z=Math.PI*.65;boxBase.add(leftFlapPivot);

const rightFlapPivot=new THREE.Group();rightFlapPivot.position.set(boxW/2,boxH/2,0);
const rightFlapMesh=new THREE.Mesh(new THREE.BoxGeometry(boxW/2,.08,boxD),kraftMat);rightFlapMesh.position.set(-boxW/4,0,0);
rightFlapPivot.add(rightFlapMesh);rightFlapPivot.rotation.z=-Math.PI*.65;boxBase.add(rightFlapPivot);

const tapeMat=new THREE.MeshStandardMaterial({color:0xff7a2f,roughness:.3});
const tapeStrip=new THREE.Mesh(new THREE.BoxGeometry(boxW+.08,.06,.48),tapeMat);
tapeStrip.position.set(0,boxH/2+.06,0);tapeStrip.scale.x=.001;boxBase.add(tapeStrip);

/* 4 Miniature 3D Cans that fly into the Variety Box */
const packCans=[];
const slotOffsets=[{x:-1.25,z:.48},{x:-.42,z:-.48},{x:.42,z:.48},{x:1.25,z:-.48}];
function createMiniCan(flavIdx){
  const g=new THREE.Group();
  const fl=F[flavIdx]||F[0];
  const mc=document.createElement('canvas');mc.width=1024;mc.height=512;const mctx=mc.getContext('2d');
  const mtex=new THREE.CanvasTexture(mc);mtex.encoding=THREE.sRGBEncoding;
  drawLabel(fl,mctx,mtex);
  const cyl=new THREE.Mesh(new THREE.CylinderGeometry(.56,.56,2.1,48,1,true),new THREE.MeshStandardMaterial({map:mtex,roughness:.26,metalness:.4}));
  const topM=new THREE.Mesh(new THREE.CylinderGeometry(.5,.56,.16,48),rimMetalMat);topM.position.y=1.13;
  const lidM=new THREE.Mesh(new THREE.CylinderGeometry(.49,.49,.04,48),rimMetalMat);lidM.position.y=1.21;
  const botM=new THREE.Mesh(new THREE.CylinderGeometry(.56,.48,.14,48),rimMetalMat);botM.position.y=-1.12;
  g.add(cyl,topM,lidM,botM);
  g.userData={mc,mctx,mtex,flavIdx};
  return g;
}
for(let i=0;i<4;i++){
  const mc=createMiniCan(i);
  packGroup.add(mc);
  packCans.push(mc);
}
function rebuildPackCans(){
  packCans.forEach((mc,i)=>{
    drawLabel(F[i]||F[0],mc.userData.mctx,mc.userData.mtex);
  });
}

/* ── SVG CAN ILLUSTRATION FOR LINEUP CARDS & SPEC VIEW ── */
function canSVG(f,i){
  if (f.customImageUrl && f.customImageUrl.trim()) {
    return '<img src="' + f.customImageUrl + '" alt="' + f.n + '" style="height:100%;max-width:140px;object-fit:contain;filter:drop-shadow(0 14px 28px rgba(0,0,0,0.6));border-radius:12px">';
  }
  const brand=(CONFIG.brandName||'FIZZO').toUpperCase();
  return '<svg viewBox="0 0 130 240">' +
    '<defs><linearGradient id="cg'+i+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="'+f.liq+'"/><stop offset="50%" stop-color="'+f.acc+'"/><stop offset="100%" stop-color="'+f.liq+'"/></linearGradient></defs>' +
    '<rect x="30" y="14" width="70" height="8" rx="4" fill="#e5e7eb"/>' +
    '<path d="M30 22H100L110 38V208Q110 222 95 222H35Q20 222 20 208V38Z" fill="url(#cg'+i+')" stroke="#ffffff" stroke-opacity=".55" stroke-width="2"/>' +
    '<rect x="20" y="42" width="90" height="6" fill="#ffffff" opacity=".28"/>' +
    '<rect x="20" y="192" width="90" height="6" fill="#ffffff" opacity=".28"/>' +
    '<circle cx="65" cy="115" r="36" fill="#000000" fill-opacity=".22" stroke="#ffffff" stroke-opacity=".5" stroke-width="2"/>' +
    '<text x="65" y="110" text-anchor="middle" fill="#ffffff" font-family="Anton,Impact,sans-serif" font-size="24" letter-spacing="2">'+brand+'</text>' +
    '<rect x="31" y="124" width="68" height="18" rx="9" fill="#ffffff"/>' +
    '<text x="65" y="136" text-anchor="middle" fill="#150a05" font-family="Plus Jakarta Sans,sans-serif" font-weight="900" font-size="8.5">'+f.n.toUpperCase()+'</text>' +
    '<rect x="32" y="222" width="66" height="6" rx="3" fill="#d1d5db"/>' +
  '</svg>';
}

/* Populate Fullscreen Flavor Selector & Stage D Buttons */
$('fsBtns').innerHTML = F.map((f,i)=>'<button data-i="'+i+'"><i style="background:'+f.liq+'"></i><b>'+f.n+'</b><small>'+f.sub+'</small></button>').join('');
$('flv').innerHTML = F.map((f,i)=>'<button data-i="'+i+'">'+f.n+'</button>').join('');

/* Populate Lineup Cards */
$('lu').innerHTML = F.map((f,i)=>{
  return '<div class="card lc" data-edit-section="flavors" data-flavor-index="'+i+'" data-edit-label="Flavor 0'+(i+1)+': '+f.n+'">' +
    '<span class="edit-pill-badge">✎ Edit '+f.n+'</span>' +
    '<div class="sil">'+canSVG(f,i)+'</div>' +
    '<h3>'+f.n+'</h3>' +
    '<em>'+f.sub+' · '+f.price+' ('+f.packLabel+')</em>' +
    '<p class="lead" style="font-size:.93rem;line-height:1.6">'+f.desc+'</p>' +
    '<ul>' +
      '<li>Can: Sleek 330 ml recyclable aluminum can</li>' +
      '<li>Tasting notes: '+f.notes+'</li>' +
      '<li>Macros: '+f.cal+' kcal, '+f.sug+' sugar, '+f.fib+' fiber</li>' +
      '<li>Caffeine: '+f.caf+'</li>' +
    '</ul>' +
    '<div class="btn-row">' +
      '<button class="btn pk" data-i="'+i+'">Switch 3D Can</button>' +
      '<button class="btn sec-btn add-crate-btn" data-name="'+f.n+'">Inquire →</button>' +
    '</div>' +
  '</div>';
}).join('');

document.querySelectorAll('.add-crate-btn').forEach(btn => {
  btn.onclick = (e) => {
    e.stopPropagation();
    scrollToContact(btn.getAttribute('data-name') || 'FIZZO Edition');
  };
});

let cf=0,pend=null,swapT=1;
function renderSpec(){
  const f=F[cf]||F[0];
  const r=[
    ['Flavour profile', f.sub],
    ['Tasting notes', f.notes],
    ['Ingredients', f.ing],
    ['Can volume', '330 ml (11.2 fl oz) Sleek Craft Can'],
    ['Case price', f.price + ' (' + f.packLabel + ')'],
    ['Calories', f.cal + ' kcal per can'],
    ['Sugar & Fiber', f.sug + ' sugar · ' + f.fib + ' prebiotic fiber'],
    ['Caffeine', f.caf],
    ['Can & Lid', 'Brushed silver crown with stay-on pull tab'],
    ['Packaging', '100% infinitely recyclable aluminum + Variety Box']
  ];
  $('spb').innerHTML=canSVG(f,'spec');
  $('sp').innerHTML='<h3>'+f.n+'</h3><p>'+f.desc+'</p><table>'+r.map(x=>'<tr><th>'+x[0]+'</th><td>'+x[1]+'</td></tr>').join('')+'</table>';
}

function setBottle(f){
  drawLabel(f);
  dropsFor(f);
}
function theme(f){
  renderSpec();
  root.style.setProperty('--liq',f.acc);
  root.style.setProperty('--bg',f.bg);
  root.style.setProperty('--bg2',f.bg2);
  LIQ.set(f.acc);
  liqMats.forEach(m=>{m.color.set(f.liq);m.emissive.set(f.liq)});
  lineMats.forEach(m=>m.color.set(f.acc));
  rim.color.set(f.acc);
  atm.material.color.set(f.acc);
  ring.material.color.set(f.acc);
  bkm.color.set(f.acc);
  tapeMat.color.set(f.acc);
  $('nf').innerHTML='<i></i>'+f.n;
  $('hn').textContent=f.n;
  document.querySelectorAll('[data-i]').forEach(b=>b.classList.toggle('act',+b.dataset.i===cf));
}
function pick(i){
  if(i===cf&&pend===null)return;
  cf=i;theme(F[i]);pend=i;swapT=0;
}
setBottle(F[0]);
document.querySelectorAll('#flv button,.fl button,.pk').forEach(b=>b.onclick=(e)=>{e.stopPropagation();pick(+b.dataset.i)});
renderSpec();

const io=new IntersectionObserver(es=>es.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('in'),i*100);setTimeout(()=>e.target.classList.add('rdy'),i*100+900);io.unobserve(e.target)}}),{threshold:.18});
document.querySelectorAll('.card').forEach(c=>io.observe(c));

/* ── INTERACTIVE 3D DRAG-TO-ROTATE ON CANVAS ── */
let dYaw=0,dPitch=0,dVel=0,dragging=false,lx0=0,ly0=0,idleT=0;
cv.addEventListener('pointerdown',e=>{
  dragging=true;lx0=e.clientX;ly0=e.clientY;dVel=0;idleT=0;
  try{cv.setPointerCapture(e.pointerId)}catch(_){}
});
cv.addEventListener('pointermove',e=>{
  if(!dragging)return;
  const dx=e.clientX-lx0,dy=e.clientY-ly0;
  lx0=e.clientX;ly0=e.clientY;
  dYaw+=dx*.012;
  dPitch=clamp(dPitch+dy*.006,-.45,.45);
  dVel=dx*.012;
  idleT=0;
});
const endDrag=()=>{dragging=false};
cv.addEventListener('pointerup',endDrag);
cv.addEventListener('pointercancel',endDrag);

/* ── 6-STAGE 3D SCROLL TIMELINE (tA, tB, tC, tD, tE, tF) ── */
const ids=['tA','tB','tC','tD','tE','tF'].map($),S=[0,0,0,0,0,0];
const K=[
  [0,.6,12.5,0],
  [.5,.4,11.5,-.2],
  [-.3,.5,12.5,0],
  [.15,.2,12,.3],
  [0,.6,12.5,0],
  [.25,.75,13.2,-.2]
];
const pr=e=>{const r=e.getBoundingClientRect();return clamp(-r.top/(r.height-innerHeight))};
const cp=(e,v)=>e.querySelectorAll('.cap').forEach(c=>c.classList.toggle('on',v>=+c.dataset.a&&v<+c.dataset.b));
const px=-1.6,py=2.0;
let tm=0,popped=false,H=0,mx=0,my=0,smx=0,smy=0,curIdx=0,curBy=2.8,selK=0,podX=0,intro=0,back=0,rx=0,ry=0,cxm=0,cym=0;
const tH=$('tH');

function frame(){
  tm+=.016;
  if(Math.abs(tg-cur)>.3){cur+=(tg-cur)*.085;scrollTo(0,cur)}
  $('sprog').style.transform='scaleX('+(scrollY/Math.max(1,root.scrollHeight-innerHeight))+')';

  if(!dragging){
    dYaw+=dVel;dVel*=.94;idleT+=.016;
    if(idleT>2.2){dYaw-=Math.round(dYaw/6.2832)*6.2832;dYaw*=.95;dPitch*=.94}
  }

  ids.forEach((e,i)=>S[i]+=(pr(e)-S[i])*.09);
  H+=(pr(tH)-H)*.09;
  let idx=S.findIndex(v=>v<.997);if(idx<0)idx=5;curIdx=idx;
  const p=S[idx],s=S.reduce((a,b)=>a+b,0);

  let heat=0,mold=0,sx_=1,sy_=1,lab=1,lvl=-9,capY=99,noz_=0,strm=0,bx=0,by=2.8,th=0,gf=0,gs=1,fl=0,op=1;

  /* Stage 0 (tA): Aluminum Billet -> Deep Drawing -> Sleeve On */
  if(idx==0){
    heat=clamp(p/.2)*(1-sm(.5,.8,p)*.9);
    mold=sm(.15,.35,p)*(1-sm(.65,.8,p));
    const bl=ease(sm(.35,.65,p));
    sx_=.34+.66*bl;sy_=.38+.62*bl;
    lab=sm(.78,.98,p);
    op=sm(0,.08,p);
    $('vA').textContent=Math.round(25+heat*195);
  }
  /* Stage 1 (tB): Sterile Nozzle Fill (0-330ml) & Lid Seam Seal */
  if(idx==1){
    const f=ease(sm(.12,.77,p));
    lvl=-2.72+f*4.1;
    noz_=ease(sm(0,.1,p))*(1-ease(sm(.78,.86,p)));
    strm=p>.1&&p<.8?1:0;
    capY=p>.82?lerp(4,.02,ease(sm(.86,1,p))):99;
    $('vB').textContent=Math.round(f*330);
  }
  /* Stage 2 (tC): CO2 Pressure Build (1.0 - 8.0 bar) & Stay-on-Tab Pop Burst */
  if(idx==2){
    lvl=1.38;
    const pop=sm(.3,.42,p);
    capY=pop>.98?99:.02+ease(pop)*7;
    const jit=p<.3?sm(0,.3,p)*.05:Math.max(0,(.42-p)*.3);
    bx=(Math.random()-.5)*jit;by=2.8+(Math.random()-.5)*jit;
    fl=p<.28?0:p<.33?(p-.28)/.05:Math.max(0,1-(p-.33)/.14);
    if(p>=.3&&!popped){popped=true;emit(160,2.2,by+.4)}if(p<.28)popped=false;
    if(p>.3&&p<.85)emit(Math.ceil(5*(1-(p-.3)/.55)),1,by+.4);
    if(p<.3&&p>.15&&Math.random()<p)emit(1,.4,by+.4);
    $('vC').textContent=(p<.3?1+sm(0,.3,p)*7:Math.max(1,8-(p-.3)*14)).toFixed(1);
  }
  /* Stage 3 (tD): Tilt 3D Can & Pour into Crystal Glass with Ice */
  if(idx==3){
    const mv=ease(sm(0,.2,p));
    bx=lerp(0,px,mv);by=lerp(2.8,py,mv);
    th=ease(sm(.2,.5,p))*2.05*(1-ease(sm(.85,1,p)));
    const rem=1-.88*sm(.42,.85,p);
    gf=ease(sm(.42,.85,p));
    const hL=4.1*(.25+.75*rem),c=Math.cos(th);
    lvl=by+(hL-5.6)*c+rem*.7*(1-c);
    gs=ease(sm(0,.15,p));
    strm=th>1.6&&p<.88?clamp((th-1.55)*3)*(1-sm(.82,.88,p)):0;
    op=1-sm(.94,1,p);
    $('vD').textContent=Math.round(gf*100);
  }
  /* Hero Transition into Stage 0 */
  if(H<.997){
    const m=sm(.35,1,H),c3=sm(.3,.6,H);
    heat=0;mold=0;
    sx_=lerp(1,.34,ease(m));sy_=lerp(1,.38,ease(m));
    lab=1-sm(.4,.8,H);
    lvl=1.38-sm(.3,.75,H)*5;
    capY=c3>.98?99:.02+ease(c3)*5;
    noz_=0;strm=0;
    bx=1.9*(1-m)*clamp((cam.aspect-.7)/.5)*(1-selK);
    by=2.8;th=0;op=1;fl=0;
  }
  curBy=by;$('hero').style.opacity=1-sm(0,.45,H);
  const gY=-2.68+gf*2.95;plG.constant=gY;plB.constant=lvl;
  iceG.position.y=Math.max(.35,gf*2.75);iceG.rotation.y=tm*.6;

  const isGlobe = idx === 4;
  const isPack = idx === 5;
  grp.visible = !isGlobe && !isPack;
  globe.visible = isGlobe;
  packGroup.visible = isPack;

  /* Apply 3D Can Transforms */
  bottle.position.set(bx,by,0);
  bottle.rotation.z=th;
  bottle.rotation.y=(H<.997?(selecting?tm*.7:Math.sin(tm*.5)*.45):0)+(swapT<1?swapT*6.283:0)+smx*.4+dYaw;
  bottle.rotation.x=smy*.12+dPitch;
  sc.scale.set(sx_,sy_,sx_);
  canShellM.emissiveIntensity=heat*1.3;canShellM.opacity=.42+heat*.35;
  label.scale.y=Math.max(.001,lab);label.rotation.y=Math.PI+(1-lab)*3;label.visible=lab>.01;drops.visible=lab>.5;
  cap.visible=capY<50;cap.position.y=capY;cap.rotation.y=capY>1?capY*3:0;cap.rotation.z=capY>1?capY*.4:0;
  mL.visible=mR.visible=idx==0&&H>=.997;mL.position.set(-(1.86+(1-mold)*5.5),0,0);mR.position.set(1.86+(1-mold)*5.5,0,0);
  noz.visible=idx==1;const tipY=by+.5+(1-noz_)*6;noz.position.set(0,tipY,0);
  gl.visible=idx==3;gl.position.set(px,-2.78,0);gl.scale.setScalar(gs);
  stream.visible=strm>0;if(strm>0){const x0=idx==3?bx:0,ly=idx==3?gY:lvl,top=idx==3?by:tipY;stream.position.set(x0,ly,0);stream.scale.set(strm,Math.max(.01,top-ly),strm)}
  podX+=((idx==3?px:bx)-podX)*.1;pod.position.x=ring.position.x=podX;ring.material.opacity=.5+.3*Math.sin(tm*2);shadow.position.set(podX,-2.79,0);shadow.scale.setScalar(idx==3?gs:1);
  if(swapT<1){swapT=Math.min(1,swapT+.03);if(swapT>=.5&&pend!==null){setBottle(F[pend]);pend=null}}
  grp.scale.setScalar(Math.max(.001,op*(swapT<1?Math.abs(Math.cos(swapT*Math.PI)):1)));

  /* Gas & Bokeh */
  for(let i=0;i<BK;i++){bkp[i*3+1]+=.004*(1+i%3);if(bkp[i*3+1]>7)bkp[i*3+1]=-7}bkg.attributes.position.needsUpdate=true;
  for(let i=0;i<N;i++){if(gla[i]>0){gla[i]-=.012;gp[i*3]+=gv[i*3];gp[i*3+1]+=gv[i*3+1];gp[i*3+2]+=gv[i*3+2];gv[i*3]*=.985;gv[i*3+1]=gv[i*3+1]*.985+.0004;gv[i*3+2]*=.985;const c=gla[i]*gla[i]*.45;gcol.set([c,c,c],i*3)}else gcol.set([0,0,0],i*3)}
  gg.attributes.position.needsUpdate=gg.attributes.color.needsUpdate=true;
  $('flash').style.opacity=fl;R.toneMappingExposure=1.08+fl*1.2;rim.intensity=2.2+fl*30;rim.position.set(-4+smx*8,2-smy*2,-4);

  /* Stage 4 (tE): Worldwide 3D Globe */
  if(isGlobe){
    const ge=ease(sm(0,.12,p));
    globe.scale.setScalar(Math.max(.001,ge));
    globe.rotation.y=rot0-p*1.1+smx*.5+dYaw*.5;
    routes.forEach((r,i)=>{
      const t=clamp((p-.04-i*.08)/.25);
      r.ln.geometry.setDrawRange(0,Math.floor(t*65));
      r.mk.visible=t>.98;r.mk.scale.setScalar(1+.4*Math.sin(tm*4));
      r.dots.forEach((d,k)=>{d.visible=t>0;if(t>0)d.position.copy(r.cv3.getPoint(((tm*(.15+Math.abs(smx)*.25)+k/3)%1)*t))});
    });
    $('vE').textContent=Math.round(clamp(p/.9)*190);
  }

  /* Stage 5 (tF): 3D Variety Box Packing Choreography */
  if(isPack){
    const pe=ease(sm(0,.1,p));
    packGroup.scale.setScalar(Math.max(.001,pe*1.05));
    packGroup.position.set(1.35*clamp((cam.aspect-.7)/.5),-.35,0);
    packGroup.rotation.y=lerp(-.45,.38,p)+smx*.35+dYaw*.6;
    packGroup.rotation.x=.24+smy*.1+dPitch*.4;

    packCans.forEach((mc,i)=>{
      const startP=.10+i*.11;
      const localP=clamp((p-startP)/.32,0,1);
      const easeP=1-Math.pow(1-localP,3);
      mc.position.x=lerp(slotOffsets[i].x*2.2,slotOffsets[i].x,easeP);
      mc.position.y=lerp(4.8,-.05,easeP);
      mc.position.z=slotOffsets[i].z;
      mc.rotation.y=easeP*Math.PI*2;
    });

    const flapP=clamp((p-.62)/.20,0,1);
    leftFlapPivot.rotation.z=lerp(Math.PI*.65,0,ease(flapP));
    rightFlapPivot.rotation.z=lerp(-Math.PI*.65,0,ease(flapP));

    const tapeP=clamp((p-.82)/.14,.001,1);
    tapeStrip.scale.x=ease(tapeP);

    const pct=Math.round(p*100);
    $('vF').textContent=pct;
    $('pkSt1').classList.toggle('act',p<.22);
    $('pkSt2').classList.toggle('act',p>=.22&&p<.62);
    $('pkSt3').classList.toggle('act',p>=.62&&p<.82);
    $('pkSt4').classList.toggle('act',p>=.82);
  }

  /* Camera Interpolation Across All 6 Stages */
  const si=clamp(s,0,4.999),i0=Math.floor(si),f=ease(si-i0),a=K[i0],b=K[Math.min(i0+1,5)],fit=Math.max(1,.9/cam.aspect);
  const az=lerp(a[0],b[0],f)+(idx<4?(p-.5)*.15:0)+smx*.1,hh=lerp(a[1],b[1],f),dd=lerp(a[2],b[2],f)*fit+selK*1.8+intro*3,ly=lerp(a[3],b[3],f);
  cam.position.set(Math.sin(az)*dd+Math.sin(tm*.35)*.18,hh+(dd-12.5)*.08-smy*.4+Math.sin(tm*.27)*.1,Math.cos(az)*dd);
  cam.lookAt(0,ly,0);cam.fov=35-fl*4+intro*8;cam.updateProjectionMatrix();

  for(let i=0;i<6;i++)cp(ids[i],S[i]);
  const r=ids[5].getBoundingClientRect();
  cv.style.opacity=r.bottom>innerHeight?1:clamp(r.bottom/innerHeight);
  if(cv.style.opacity>0)R.render(scene,cam);

  selK+=((selecting?1:0)-selK)*.06;intro*=.96;
  if(cur<40)$('fs').classList.remove('bk');
  smx+=(mx-smx)*.06;smy+=(my-smy)*.06;rx+=(cxm-rx)*.2;ry+=(cym-ry)*.2;
  $('cr').style.transform='translate('+rx+'px,'+ry+'px)';
  requestAnimationFrame(frame);
}
frame();

/* ── MOUSE PARALLAX & 3D CARD TILT ── */
addEventListener('mousemove',e=>{
  mx=e.clientX/innerWidth*2-1;my=e.clientY/innerHeight*2-1;cxm=e.clientX;cym=e.clientY;
  root.style.setProperty('--px',mx);root.style.setProperty('--py',my);
  root.style.setProperty('--mxp',e.clientX+'px');root.style.setProperty('--myp',e.clientY+'px');
  $('cr').style.opacity=1;
  if(curIdx==2&&S[2]>.3&&Math.random()<.5)emit(2,.7,curBy+.4);
  $('cr').classList.toggle('h',!!e.target.closest('a,button,.card,.cap,.ps,.bd'));
});
document.querySelectorAll('.card').forEach(c=>{
  c.addEventListener('mousemove',e=>{
    const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    c.style.setProperty('--ry',(x-.5)*14);c.style.setProperty('--rx',(.5-y)*14);
    c.style.setProperty('--cx',x*100+'%');c.style.setProperty('--cy',y*100+'%');
  });
  c.addEventListener('mouseleave',()=>{c.style.setProperty('--rx',0);c.style.setProperty('--ry',0)});
});
document.querySelectorAll('.btn,.cta a').forEach(a=>{
  a.addEventListener('mousemove',e=>{
    const r=a.getBoundingClientRect();
    a.style.translate=((e.clientX-r.left-r.width/2)*.22)+'px '+((e.clientY-r.top-r.height/2)*.3)+'px';
  });
  a.addEventListener('mouseleave',()=>a.style.translate='');
});

/* ── PRELOADER & FLAVOR MODAL SEQUENCE ── */
const dismissFizzoPreloader = () => {
  if (typeof window.dismissFizzoPreloader === 'function') {
    window.dismissFizzoPreloader();
  }
  theme(F[cf]);
  selecting=false;loading=false;
  document.body.style.overflow='';
  document.body.classList.add('go');
  intro=1;
};
setTimeout(dismissFizzoPreloader, 1800);

$('nf').onclick=(e)=>{
  e.stopPropagation();
  if(selecting||document.getElementById('ld'))return;
  back=cur;tg=0;loading=true;selecting=true;
  document.body.style.overflow='hidden';
  document.body.classList.add('sel');
  $('fs').classList.add('on','bk');
};
$('go').onclick=(e)=>{
  e.stopPropagation();
  selecting=false;$('fs').classList.remove('on');loading=false;
  document.body.style.overflow='';
  document.body.classList.remove('sel');
  document.body.classList.add('go');
  intro=1;if(back>200)tg=back;back=0;
};
addEventListener('keydown',e=>{if(e.key==='Escape'&&selecting)$('go').click()});
})();
<\/script></body></html>`;
  }
  const YP = ({ config: o, selectedSection: r, selectedFlavorIndex: a, inspectorEnabled: s = true, onSelectElement: c }) => {
    const u = z.useRef(null), d = z.useMemo(() => qP(o), [o]);
    return z.useEffect(() => {
      const f = (v) => {
        const h = v.data;
        h && h.type === "FIZZO_SELECT_SECTION" && c && c(h.section, h.flavorIndex, h.label);
      };
      return window.addEventListener("message", f), () => window.removeEventListener("message", f);
    }, [c]), z.useEffect(() => {
      var f;
      const v = (f = u.current) == null ? void 0 : f.contentWindow;
      v && v.postMessage({ type: "FIZZO_SET_INSPECTOR", enabled: s }, "*");
    }, [s, d]), z.useEffect(() => {
      var f;
      const v = (f = u.current) == null ? void 0 : f.contentWindow;
      !v || !r || v.postMessage({ type: "FIZZO_FOCUS_SECTION", section: r, flavorIndex: a, scrollIntoView: false }, "*");
    }, [r, a]), n.jsxDEV("iframe", { ref: u, title: `${o.brandName} — Cinematic 3D Experience`, srcDoc: d, className: "w-full h-full border-0 bg-[#0b0710]", sandbox: "allow-scripts allow-same-origin" }, void 0, false);
  }, y3 = () => ({ brandName: "Velora", brandSub: "Botanics", logoImageUrl: null, loaderImageUrl: null, navLinks: ["Home", "Collection", "Ingredients", "Rituals", "About", "Contacts"], heroBigTitle: "VELORA", heroTagline: "Velora Botanics: haute botanical skincare, velvet lip colour and artisanal eau de parfum — crafted where cold-pressed plants meet cellular science.", heroBadgeText: "GLOW FROM WITHIN • HAUTE BOTANICALS • ", collectionEyebrow: "CLEAN BEAUTY, THOUGHTFULLY MADE", collectionTitlePrefix: "The", collectionTitleItalic: "collection", collectionLead: "Every formula is compounded in small batches with cold-pressed plant actives, bio-fermented peptides, and refillable French glass. Zero parabens, zero silicones, cruelty-free.", products: [{ name: "Rosehip Glow Serum", categoryLabel: "SERUMS & OILS", groupIndex: 1, tagline: "Radiant, dewy and bright", description: "A lightweight facial elixir with cold-pressed Andean rosehip, sea buckthorn and vitamin E to even tone and awaken a glass-skin glow.", colorHex: "#e3a36b", bgHex: "#f9e0d0", lidHex: "#c9a063", shapeIndex: 1, sizeText: "30 ml", notes: "Rosehip seed, wild geranium, warm musk", ingredients: "Rosa Canina Seed Oil, Olive Squalane, Tocopherol (Vitamin E), Pelargonium Graveolens", price: 38 }, { name: "Vitamin C Brightening Serum", categoryLabel: "SERUMS & OILS", groupIndex: 1, tagline: "Fresh, citrusy and clarifying", description: "A clinical 10% ascorbyl glucoside & ferulic acid serum that visibly fades hyperpigmentation and shields skin from daily oxidative stress.", colorHex: "#f2b441", bgHex: "#ffe7bd", lidHex: "#c98f86", shapeIndex: 1, sizeText: "30 ml", notes: "Sicilian neroli, sweet mandarin peel", ingredients: "Ascorbyl Glucoside (10%), Ferulic Acid, Organic Aloe Barbadensis, Botanical Glycerin", price: 42 }, { name: "Hyaluronic Hydra Serum", categoryLabel: "SERUMS & OILS", groupIndex: 1, tagline: "Cooling and deeply hydrating", description: "Three molecular weights of bio-fermented hyaluronic acid drench skin from the surface down to the dermal matrix.", colorHex: "#9ccbe0", bgHex: "#dff0f6", lidHex: "#2a1a1f", shapeIndex: 1, sizeText: "30 ml", notes: "Pure botanical hydrosol (Fragrance-Free)", ingredients: "Multi-Weight Sodium Hyaluronate (2%), Vitamin B5 (Panthenol), Alpine Glacier Water", price: 36 }, { name: "Shea Night Cream", categoryLabel: "FACE CREAMS", groupIndex: 2, tagline: "Rich, soft and restoring", description: "A velvety overnight cocoon with unrefined Ghanaian shea butter and biomimetic ceramides that rebuild the lipid barrier while you sleep.", colorHex: "#f1dcc0", bgHex: "#f6e8dc", lidHex: "#c9a063", shapeIndex: 0, sizeText: "50 ml", notes: "Warm shea, Madagascar vanilla, sweet almond", ingredients: "Butyrospermum Parkii (Shea), Ceramide NP/AP/EOP, Simmondsia Chinensis (Jojoba), Squalane", price: 54 }, { name: "Rose Petal Day Cream", categoryLabel: "FACE CREAMS", groupIndex: 2, tagline: "Light, calming and glowing", description: "A weightless whipped day emulsion infused with Damask rose distillate, 4% niacinamide and invisible mineral SPF 30.", colorHex: "#ebb0bc", bgHex: "#fbdde3", lidHex: "#c98f86", shapeIndex: 0, sizeText: "50 ml", notes: "Damask rose petal, white peony", ingredients: "Rosa Damascena Flower Water, Niacinamide (4%), Non-Nano Zinc Oxide (SPF 30), Squalane", price: 48 }, { name: "Velvet Lipstick Berry Rouge", categoryLabel: "LIPS & FRAGRANCE", groupIndex: 3, tagline: "Deep berry with a velvet finish", description: "A high-pigment couture lipstick with a plush matte finish, suspended in nourishing candelilla wax and cold-pressed berry seed oils.", colorHex: "#9c2b4a", bgHex: "#f3d3dc", lidHex: "#c9a063", shapeIndex: 2, sizeText: "3.5 g", notes: "Tahitian vanilla bean, crushed berry", ingredients: "Euphorbia Cerifera (Candelilla) Wax, Ricinus Communis, Shea Butter, Pure Mineral Pigments", price: 28 }, { name: "Satin Lipstick Nude Rose", categoryLabel: "LIPS & FRAGRANCE", groupIndex: 3, tagline: "Everyday nude with a satin shine", description: "A hydrating satin-balm lipstick in a universally flattering Parisian rose-nude that plumps and softens lips on contact.", colorHex: "#c4817c", bgHex: "#f6e0dc", lidHex: "#c98f86", shapeIndex: 2, sizeText: "3.5 g", notes: "Soft vanilla, rose wax", ingredients: "Candelilla Wax, Organic Jojoba Esters, Vitamin E, Damask Rose Flower Wax, Mineral Pigments", price: 28 }, { name: "Midnight Rose Eau de Parfum", categoryLabel: "LIPS & FRAGRANCE", groupIndex: 3, tagline: "Warm, floral and sensual", description: "Velvety Bulgarian rose and night-blooming Grasse jasmine layered over smoked amber, cashmere wood and sustainable Mysore sandalwood.", colorHex: "#d98aa0", bgHex: "#efd9e6", lidHex: "#c9a063", shapeIndex: 3, sizeText: "50 ml", notes: "Bulgarian Rose, Grasse Jasmine, Warm Amber, Sandalwood", ingredients: "Organic Wheat Alcohol, Parfum (Pure Botanical Absolutes), Rosa Damascena, Jasminum Grandiflorum", price: 86 }], orbStages: [{ title: "Hydrate", description: "Three molecular weights of bio-fermented hyaluronic acid lock moisture into every dermal layer, delivering a 72-hour dewy cushion.", colors: ["#c4506a", "#f3b6c2", "#ffe3d0"] }, { title: "Brighten", description: "Clinical 10% vitamin C and cold-pressed Andean rosehip dissolve dullness and awaken a luminous, lit-from-within complexion.", colors: ["#c98a2e", "#f4d27a", "#fff3c8"] }, { title: "Restore", description: "Biomimetic ceramides and unrefined shea butter rebuild your skin barrier overnight — leaving skin calm, resilient and velvety.", colors: ["#2f7f94", "#9ad6e2", "#e6fbff"] }], ingredientsEyebrow: "THE POWER OF PLANTS & CLINICAL ACTIVES", ingredientsTitlePrefix: "Nature,", ingredientsTitleItalic: "proven", ingredientsLead: "We pair cold-pressed heirloom botanicals with dermatologist-validated actives at their exact clinical percentages — full transparency in every drop.", ritualsEyebrow: "SLOW DOWN, GLOW UP", ritualsTitlePrefix: "Beauty as a", ritualsTitleItalic: "ritual", ritualsLead: "Step inside our botanical flagship atelier or follow our 4-step daily cellular ritual at home. Choose a private skin consultation, sculptural facial or bespoke perfumery session.", rituals: [{ number: "01", title: "The Skin Consultation", duration: "45 minutes", description: "A private one-to-one diagnostic session with our dermal botanist who maps your barrier health and formulates a custom morning & evening regimen.", included: ["3D dermal hydration mapping", "Bespoke morning & night prescription card", "3 luxury 10 ml travel elixirs to take home"], bgHex: "#f9e0d0", petalHex: "#d9764a", centerHex: "#ffd9a8", petalCount: 8 }, { number: "02", title: "The Sculptural Facial Ritual", duration: "90 minutes", description: "A slow, restorative buccal and lymphatic facial layering our warm rosehip oils, cryo-globes and ceramide masks for instant sculptural lift.", included: ["Double botanical oil cleanse & steam", "Buccal sculptural massage & LED therapy", "Complimentary Rose Petal Day Cream mini"], bgHex: "#fbdde3", petalHex: "#d1607a", centerHex: "#ffd0da", petalCount: 10 }, { number: "03", title: "The Haute Fragrance Atelier", duration: "2 hours", description: "Sit at our perfumer’s organ and compose your own signature eau de parfum from rare Damask rose, Grasse jasmine, smoked amber and sandalwood.", included: ["Guided olfactory pyramid blending", "Hand-crimped 30 ml engraved glass flacon", "Artisanal rose-water tea & patisserie"], bgHex: "#efd9e6", petalHex: "#c98aa0", centerHex: "#f2d36a", petalCount: 6 }], aboutEyebrow: "OUR ATELIER & HERITAGE", aboutTitlePrefix: "Rooted in", aboutTitleItalic: "botany", aboutTitleSuffix: ", backed by science", aboutLead: "Velora Botanics began twelve years ago in an independent botanical laboratory with a single conviction: high-luxury skincare should be both clinically potent and 100% biocompatible. Today, our cosmetic chemists and master herbalists cold-press and compound every batch in house.", stats: [{ number: 12, label: "years of cellular research" }, { number: 8, label: "award-winning formulas" }, { number: 30, label: "cold-pressed botanicals" }, { number: 100, label: "% vegan & refillable glass" }], reviewsEyebrow: "VERIFIED CLINICAL & COMMUNITY LOVE", reviewsTitlePrefix: "Loved by", reviewsTitleItalic: "real skin", reviews: [{ author: "Amina K. · Verified Buyer", quote: "My skin has never looked this luminous. Three drops of the Rosehip Glow Serum every night completely transformed my texture." }, { author: "Sana R. · Aesthetician", quote: "The Shea Night Cream feels like whipped silk. My barrier recovered in four nights without a trace of heaviness." }, { author: "Hira M. · Beauty Editor", quote: "Velvet Lipstick in Berry Rouge is the ultimate French-girl berry — weightless, hydrating and stays put through dinner." }, { author: "Zoya A. · Perfumery Collector", quote: "Midnight Rose smells like a candlelit rose garden after rain. Warm sandalwood and real Bulgarian rose that lasts 10 hours." }, { author: "Mehr S. · Sensitive Skin", quote: "Finally a 10% Vitamin C serum that never stings or oxidizes. My post-acne marks faded noticeably in three weeks." }, { author: "Dania F. · Architect", quote: "The weighted apothecary glass bottles and gold droppers look like sculptures on my vanity — and the refills are effortless." }], contactEyebrow: "PRIVATE CONCIERGE & STUDIO", contactTitlePrefix: "Say", contactTitleItalic: "hello", contactLead: "Questions about your skin regimen, a bespoke wholesale partnership, or booking a private studio ritual? Our concierge responds within one business day.", contactEmail: "concierge@velorabotanics.example", contactHours: "Flagship Atelier open Monday to Saturday · 10:00 to 19:00", footerTagline: "Haute botanical skincare, velvet lip colour & artisanal fragrance.", footerStudioAddress: "Flagship Studio: 8 Rue des Rosiers / Garden District", footerLabAddress: "Botanical Lab: Villa Botanica, Grasse Valley", footerCopyright: "© 2026 Velora Botanics. Crafted for interactive 3D WebGL showcase. All formulas & designs original.", customHtmlOverride: null });
  function XP(o) {
    if (o.customHtmlOverride && o.customHtmlOverride.trim().length > 40) return o.customHtmlOverride;
    const r = JSON.stringify(o).replace(/</g, "\\u003c");
    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${o.brandName} ${o.brandSub} — Haute Botanical 3D</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,900;1,9..144,400;1,9..144,600&family=DM+Sans:wght@400;500;700&display=swap">
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<style>
:root{
  --cream:#fbf3ee;
  --cream-2:#f5e6de;
  --ink:#231419;
  --mut:#73565e;
  --org:#c4506a;
  --gold:#c9a063;
  --grn:#8a6a3a;
  --tint:#ffd7c8;
  --c:#c4391d;
  box-sizing:border-box;
  padding-top:env(safe-area-inset-top,0px);
  padding-bottom:env(safe-area-inset-bottom,0px);
}
@property --tint{syntax:'<color>';inherits:true;initial-value:#ffd7c8}
@property --c{syntax:'<color>';inherits:true;initial-value:#c4391d}
:root{transition:--tint .85s cubic-bezier(.2,.8,.2,1),--c .85s cubic-bezier(.2,.8,.2,1)}
*{box-sizing:border-box}
body{margin:0;background:var(--cream);color:var(--ink);font-family:'DM Sans',system-ui,sans-serif;overflow-x:hidden}
h1,h2,h3,h4,.sf{font-family:'Fraunces',Georgia,serif}
a{color:inherit}
img,svg{max-width:100%}

/* ── CLICK-TO-EDIT INSPECTOR ── */
[data-edit-section]{position:relative;transition:outline .2s ease,box-shadow .2s ease}
body.inspector-on [data-edit-section]:hover{outline:2px dashed #c4506a;outline-offset:6px;cursor:pointer}
body.inspector-on [data-edit-section].is-selected-element{outline:2px solid #231419;outline-offset:6px;box-shadow:0 0 0 5px rgba(196,80,106,0.22)}
.edit-pill-badge{
  position:absolute;top:12px;right:12px;z-index:99;
  background:linear-gradient(135deg,#c4506a,#9c2b4a);color:#fbf3ee;
  font-family:'DM Sans',sans-serif;font-size:10px;font-weight:700;
  letter-spacing:1.3px;text-transform:uppercase;
  padding:5px 12px;border-radius:999px;
  box-shadow:0 8px 22px rgba(35,20,25,0.28);
  pointer-events:none;opacity:0;transform:translateY(-4px);
  transition:opacity .18s ease,transform .18s ease;
}
body.inspector-on [data-edit-section]:hover>.edit-pill-badge,
body.inspector-on [data-edit-section].is-selected-element>.edit-pill-badge{opacity:1;transform:translateY(0)}

/* ── LOADER (BYPASSED FOR INSTANT DEMO ACCESS) ── */
#ld{display:none !important}
#ld .rt{width:min(58vmin,320px);animation:sp 14s linear infinite}
#ld .rt text{font-size:10.2px;letter-spacing:3.4px;fill:var(--ink);font-weight:700}
#ld b{position:absolute;font-family:Fraunces,Georgia,serif;font-size:clamp(2.8rem,9vw,5rem);font-weight:900;color:var(--ink)}
#ld small{position:absolute;bottom:9vh;letter-spacing:.38em;font-size:.7rem;color:var(--mut);font-weight:700}
@keyframes sp{to{rotate:360deg}}

/* ── CUSTOM CURSOR ── */
#cr{position:fixed;left:0;top:0;width:36px;height:36px;margin:-18px 0 0 -18px;border:1.5px solid var(--ink);border-radius:50%;z-index:150;pointer-events:none;opacity:0;transition:width .25s,height .25s,margin .25s,background .25s,border-color .25s}
#cr.h{width:72px;height:72px;margin:-36px 0 0 -36px;background:rgba(196,80,106,0.16);border-color:var(--org)}
#cr.dg{width:86px;height:86px;margin:-43px 0 0 -43px;background:rgba(201,160,99,0.22);border-color:var(--gold)}
#cr.dg::after{content:'360°';position:absolute;inset:0;display:grid;place-items:center;font-size:.65rem;letter-spacing:.22em;font-weight:700;color:var(--ink)}
@media(hover:none){#cr{display:none}}

/* ── LUXURY GLASSMORPHIC NAVBAR ── */
nav{
  position:fixed;top:env(safe-area-inset-top,0px);left:0;right:0;z-index:60;
  display:flex;align-items:center;justify-content:space-between;
  padding:14px 4vw;
  background:rgba(251,243,238,0.78);
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
  border-bottom:1px solid rgba(35,20,25,0.08);
}
.lg{font-family:Fraunces,Georgia,serif;font-weight:900;font-size:1.5rem;text-decoration:none;display:flex;align-items:center;gap:10px;letter-spacing:-.02em}
.lg svg{width:32px;height:32px;filter:drop-shadow(0 4px 10px rgba(196,80,106,0.25))}
.lg img{height:34px;width:auto;border-radius:8px;object-fit:contain}
.lg span{font-weight:400;font-style:italic;color:var(--org);margin-left:2px}
nav ul{display:flex;gap:28px;list-style:none;margin:0;padding:0}
nav ul a{text-decoration:none;font-size:.86rem;font-weight:600;letter-spacing:.04em;position:relative;padding:4px 0}
nav ul a::after{content:'';position:absolute;left:0;bottom:0;height:1.5px;width:0;background:var(--org);transition:width .3s}
nav ul a:hover::after{width:100%}
.rg{display:flex;gap:12px;align-items:center}
.lang{font-size:.74rem;letter-spacing:.18em;font-weight:700;color:var(--mut);padding:6px 12px;border-radius:99px;border:1px solid rgba(35,20,25,0.12)}
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  background:var(--ink);color:var(--cream);
  padding:12px 26px;border-radius:99px;text-decoration:none;
  font-weight:700;font-size:.8rem;letter-spacing:.1em;text-transform:uppercase;
  border:0;cursor:pointer;transition:background .3s,box-shadow .3s,transform .25s;
}
.btn:hover{background:var(--org);box-shadow:0 14px 32px rgba(196,80,106,0.32)}
.btn.o{background:rgba(251,243,238,0.65);color:var(--ink);border:1.5px solid var(--ink);backdrop-filter:blur(8px)}
.btn.o:hover{background:var(--ink);color:var(--cream)}
.bag-pill{background:var(--org);color:#fff;padding:2px 8px;border-radius:99px;font-size:.72rem;font-weight:800}
#bg{display:none;background:none;border:0;width:42px;height:42px;cursor:pointer;position:relative}
#bg i,#bg i::before{content:'';position:absolute;left:9px;width:24px;height:2px;background:var(--ink);transition:.3s}
#bg i{top:20px}#bg i::before{top:-7px;left:0}
#mn{position:fixed;inset:0;z-index:55;background:var(--cream);display:flex;flex-direction:column;justify-content:center;gap:12px;padding:0 8vw;transform:translateY(-100%);transition:transform .7s cubic-bezier(.76,0,.2,1)}
#mn.on{transform:none}
#mn a{font-family:Fraunces,Georgia,serif;font-size:2.4rem;text-decoration:none;font-weight:900}
@media(max-width:920px){nav ul,.lang{display:none}#bg{display:block}}

/* ── HERO 3D STAGE ── */
#hT{position:relative}
#hero{position:sticky;top:0;height:100vh;height:100dvh;min-height:660px;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end}
#hero::before{
  content:'';position:absolute;left:50%;top:48%;
  width:min(76vh,76vw);height:min(76vh,76vw);translate:-50% -50%;
  border-radius:50%;
  background:radial-gradient(circle at 35% 30%,#ffffffaa,var(--tint) 62%,transparent 100%);
  box-shadow:inset 0 0 80px rgba(255,255,255,0.65),0 30px 90px rgba(196,80,106,0.12);
  transition:background .85s;
}
#hero::after{
  content:'';position:absolute;left:50%;top:48%;
  width:min(82vh,82vw);height:min(82vh,82vw);translate:-50% -50%;
  border-radius:50%;border:1px dashed rgba(201,160,99,0.45);
  pointer-events:none;animation:sp 60s linear infinite;
}
#gl{position:absolute;inset:0;width:100%;height:100%;z-index:2;cursor:grab;touch-action:pan-y;user-select:none;-webkit-user-select:none}
.bt{
  position:absolute;left:0;right:0;top:12.5vh;text-align:center;
  font-family:Fraunces,Georgia,serif;font-weight:900;
  font-size:clamp(4.2rem,16.5vw,15.5rem);line-height:.82;letter-spacing:-.03em;
  color:transparent;-webkit-text-stroke:1.5px rgba(35,20,25,0.13);
  z-index:1;white-space:nowrap;user-select:none;pointer-events:none;
}
.h-top-card{
  position:absolute;z-index:3;top:11.5vh;left:4vw;max-width:min(380px,42vw);
  background:rgba(251,243,238,0.68);backdrop-filter:blur(12px);
  padding:14px 18px;border-radius:20px;border:1px solid rgba(35,20,25,0.09);
  box-shadow:0 12px 32px rgba(35,20,25,0.05);
}
.h-top-card small{display:block;font-size:.66rem;letter-spacing:.26em;text-transform:uppercase;color:var(--org);font-weight:700;margin-bottom:4px}
.h1{font-size:clamp(.92rem,1.25vw,1.12rem);line-height:1.45;margin:0;font-weight:500;color:var(--ink)}
.badge{position:absolute;z-index:3;right:4vw;top:14vh;width:clamp(104px,11.5vw,146px);animation:sp 22s linear infinite;filter:drop-shadow(0 10px 24px rgba(196,80,106,0.2))}
.badge text{font-size:11px;letter-spacing:3.3px;fill:var(--ink);font-weight:700}

/* Hero Floating Glass Product Info Card */
.info{
  position:absolute;z-index:4;left:4vw;bottom:13.5vh;max-width:min(440px,68vw);
  background:rgba(255,250,247,0.82);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);
  padding:24px 26px;border-radius:28px;
  border:1px solid rgba(201,160,99,0.35);
  box-shadow:0 24px 60px rgba(35,20,25,0.1);
}
.info-top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:6px}
.info small{letter-spacing:.26em;font-size:.68rem;color:var(--org);font-weight:700;text-transform:uppercase}
.info .sz-pill{font-size:.7rem;font-weight:700;letter-spacing:.12em;padding:3px 10px;border-radius:99px;background:rgba(35,20,25,0.07);color:var(--ink)}
.info h2{font-size:clamp(1.65rem,3.1vw,2.5rem);margin:.05em 0 .15em;line-height:1.05;letter-spacing:-.01em}
.info .tag-em{font-family:Fraunces,Georgia,serif;font-style:italic;color:var(--mut);font-size:.95rem;margin-bottom:8px;display:block}
.info p{margin:0 0 14px;color:var(--mut);line-height:1.55;font-size:.92rem}
.info .note-bar{display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:12px;background:rgba(201,160,99,0.12);margin-bottom:16px;font-size:.78rem;color:var(--ink)}
.info .note-bar b{color:var(--grn);letter-spacing:.08em;text-transform:uppercase;font-size:.68rem}
.info>*{transition:opacity .4s,transform .4s}
.info.sw>*{opacity:0;transform:translateY(12px)}
.ib{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.pri{font-family:Fraunces,Georgia,serif;font-size:1.75rem;font-weight:900;color:var(--ink);margin-right:4px}

.ctr{
  position:absolute;z-index:4;right:4vw;bottom:14vh;
  display:flex;align-items:center;gap:14px;
  background:rgba(255,250,247,0.78);backdrop-filter:blur(14px);
  padding:8px 12px;border-radius:99px;border:1px solid rgba(35,20,25,0.12);
  box-shadow:0 14px 34px rgba(35,20,25,0.08);
}
.ctr b{font-family:Fraunces,Georgia,serif;font-size:1.15rem;font-variant-numeric:tabular-nums;padding:0 4px}
.ar{width:46px;height:46px;border-radius:50%;border:1.5px solid var(--ink);background:none;cursor:pointer;font-size:1.1rem;transition:background .3s,color .3s,transform .3s;color:var(--ink);display:grid;place-items:center}
.ar:hover{background:var(--ink);color:var(--cream);transform:scale(1.06)}

.pl{position:absolute;z-index:4;right:4vw;top:50%;translate:0 -50%;list-style:none;margin:0;padding:0;text-align:right;display:flex;flex-direction:column;gap:7px}
.pl li{font-family:Fraunces,Georgia,serif;font-size:.88rem;cursor:pointer;opacity:.38;transition:opacity .35s,transform .35s,color .35s;transform-origin:right;padding:2px 0}
.pl li.on{opacity:1;transform:scale(1.18);color:var(--c);font-weight:900}
.pl li:hover{opacity:.85}
.pb{position:absolute;z-index:5;left:0;top:0;height:4px;width:0;background:linear-gradient(90deg,var(--org),var(--gold))}
@media(max-width:1040px){.pl{display:none}}

.dh{
  position:absolute;z-index:4;left:50%;bottom:13.5vh;translate:-50% 0;
  font-size:.68rem;font-weight:700;letter-spacing:.26em;color:var(--ink);
  background:rgba(255,250,247,0.85);backdrop-filter:blur(10px);
  border:1px solid rgba(201,160,99,0.45);
  padding:9px 18px;border-radius:99px;transition:opacity .6s;pointer-events:none;
  animation:nd 2.4s ease-in-out infinite;
  box-shadow:0 10px 28px rgba(35,20,25,0.08);
}
@keyframes nd{50%{transform:translateX(8px)}}
.sd{position:absolute;z-index:4;left:50%;bottom:9.8vh;translate:-50% 0;font-size:.62rem;font-weight:700;letter-spacing:.32em;color:var(--mut);text-align:center}

.mq{position:absolute;z-index:4;left:0;right:0;bottom:0;height:8.2vh;min-height:52px;background:var(--ink);color:var(--cream);overflow:hidden;display:flex;align-items:center;border-top:1px solid rgba(201,160,99,0.35)}
.mq div{display:flex;gap:46px;white-space:nowrap;animation:mq 38s linear infinite;padding-left:46px;font-family:Fraunces,Georgia,serif;font-size:1.08rem;letter-spacing:.03em}
.mq span::after{content:'✦';margin-left:46px;color:var(--gold)}
@keyframes mq{to{transform:translateX(-50%)}}
@media(max-width:820px){
  .h-top-card{max-width:62vw;padding:10px 14px}
  .badge{top:12vh;width:84px}
  .info{bottom:10vh;max-width:92vw;left:4vw;right:4vw;padding:18px 20px}
  .ctr{bottom:auto;top:24vh;right:4vw;flex-direction:column;padding:8px}
  .dh,.sd{display:none}
}

.bt,.info,.ctr,.pl,.dh{opacity:0;transition:opacity 1.1s .15s,transform 1.3s .15s cubic-bezier(.2,.8,.2,1)}
.bt{transform:translateY(60px)}
body.go .bt,body.go .info,body.go .ctr,body.go .pl,body.go .dh{opacity:1;transform:none}
.lk{position:absolute;border-radius:50%;filter:blur(75px);opacity:.5;z-index:0;animation:lk 14s ease-in-out infinite alternate;pointer-events:none}
@keyframes lk{to{transform:translate(8vw,6vh) scale(1.2)}}
#gr{position:fixed;inset:-50%;z-index:140;pointer-events:none;opacity:.055;mix-blend-mode:multiply;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");animation:gn .8s steps(4) infinite}
@keyframes gn{0%{transform:translate(0,0)}25%{transform:translate(-4%,3%)}50%{transform:translate(3%,-5%)}75%{transform:translate(-3%,-2%)}}
#sprog{position:fixed;left:0;top:0;height:3px;width:100%;background:linear-gradient(90deg,var(--org),var(--gold));transform-origin:left;transform:scaleX(0);z-index:70}

/* ── EDITORIAL BANDS & SECTIONS ── */
.sec{max-width:1240px;margin:auto;padding:13vh 5vw 4vh}
.ey{display:inline-flex;align-items:center;gap:8px;letter-spacing:.28em;font-size:.7rem;color:var(--org);font-weight:700;text-transform:uppercase;padding:6px 14px;border-radius:99px;background:rgba(196,80,106,0.09);border:1px solid rgba(196,80,106,0.2)}
.sec h2.t{font-size:clamp(2.3rem,5.8vw,4.5rem);margin:.2em 0 .3em;line-height:1;font-weight:900;letter-spacing:-.02em}
.sec h2.t em{color:var(--org);font-weight:400;font-style:italic}
.lead{color:var(--mut);line-height:1.75;font-size:1.08rem;max-width:740px}
.rv{opacity:0;transform:translateY(36px);transition:opacity .85s,transform .85s cubic-bezier(.2,.8,.2,1)}
.rv.in{opacity:1;transform:none}

.band{
  height:40vh;min-height:260px;margin:0;display:grid;place-items:center;position:relative;overflow:hidden;
  background:linear-gradient(125deg,#2a161d,#c4506a 52%,#c9a063);
}
.band::before{
  content:'HAUTE BOTANICAL ATELIER • SMALL BATCH FORMULATIONS';
  position:absolute;top:28px;letter-spacing:.38em;font-size:.66rem;color:rgba(251,243,238,0.75);font-weight:700;
}
.band h1{font-size:clamp(3.2rem,11vw,9rem);margin:0;color:var(--cream);font-weight:900;line-height:.9;z-index:2;text-shadow:0 10px 40px rgba(0,0,0,0.28);font-style:italic}

/* ── COLLECTION FILTER PILLS & LUXURY ARCH PRODUCT CARDS ── */
.cat{display:flex;gap:10px;flex-wrap:wrap;margin:28px 0 0}
.cat a{padding:11px 22px;border:1.5px solid rgba(35,20,25,0.22);border-radius:99px;text-decoration:none;font-size:.82rem;font-weight:700;letter-spacing:.06em;transition:all .3s;background:rgba(255,255,255,0.45)}
.cat a:hover{background:var(--ink);color:var(--cream);border-color:var(--ink)}

.gr{display:grid;gap:26px;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));margin-top:28px}
.pcd{
  cursor:pointer;background:rgba(255,252,249,0.75);border:1px solid rgba(35,20,25,0.09);
  border-radius:30px;padding:16px 16px 22px;
  transition:transform .45s cubic-bezier(.2,.8,.2,1),box-shadow .45s,border-color .3s;
  display:flex;flex-direction:column;justify-content:space-between;
}
.pcd:hover{transform:translateY(-10px);box-shadow:0 28px 55px rgba(35,20,25,0.12);border-color:var(--gold)}
.pcd .ar2{
  height:285px;border-radius:999px 999px 22px 22px;
  display:grid;place-items:end center;padding-bottom:18px;
  transition:transform .5s cubic-bezier(.2,.8,.2,1),box-shadow .5s;
  overflow:hidden;position:relative;
  border:1px solid rgba(255,255,255,0.65);
}
.pcd .ar2 .sz-tag{
  position:absolute;top:14px;right:14px;
  background:rgba(255,250,247,0.88);backdrop-filter:blur(6px);
  padding:4px 10px;border-radius:99px;font-size:.68rem;font-weight:700;letter-spacing:.1em;color:var(--ink);
}
.pcd svg{height:78%;transition:transform .6s cubic-bezier(.2,.8,.2,1);filter:drop-shadow(0 16px 18px rgba(35,20,25,0.22))}
.pcd:hover .ar2{transform:perspective(700px) rotateX(calc(var(--rx,0)*1deg)) rotateY(calc(var(--ry,0)*1deg))}
.pcd:hover svg{transform:translateY(-12px) rotate(-5deg) scale(1.07)}
.pcd-meta{padding:14px 6px 0}
.pcd-cat{font-size:.66rem;letter-spacing:.22em;text-transform:uppercase;color:var(--org);font-weight:700}
.pcd h3{margin:4px 0 4px;font-size:1.25rem;line-height:1.15}
.pcd .tag-txt{color:var(--mut);font-size:.86rem;display:block;margin-bottom:12px}
.pcd-foot{display:flex;align-items:center;justify-content:space-between;padding-top:12px;border-top:1px solid rgba(35,20,25,0.08)}
.pcd-foot b{font-family:Fraunces,Georgia,serif;font-size:1.3rem}
.pcd-actions{display:flex;gap:6px}
.pcd-btn{
  padding:7px 13px;border-radius:99px;border:1px solid var(--ink);
  background:transparent;color:var(--ink);font-size:.7rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;transition:.25s;
}
.pcd-btn:hover{background:var(--ink);color:var(--cream)}
.pcd-btn.fill{background:var(--ink);color:var(--cream)}
.pcd-btn.fill:hover{background:var(--org);border-color:var(--org)}

table{width:100%;border-collapse:collapse;margin:18px 0;background:rgba(255,252,249,0.65);border-radius:20px;overflow:hidden;border:1px solid rgba(35,20,25,0.08)}
th,td{text-align:left;padding:15px 18px;border-bottom:1px solid rgba(35,20,25,0.08);font-size:.94rem}
th{color:var(--org);font-size:.72rem;letter-spacing:.22em;font-weight:700;background:rgba(196,80,106,0.06)}

/* ── 3D CELLULAR ESSENCE SHADER ORB SECTION ── */
#oT{position:relative;height:300vh}
#orb{position:sticky;top:0;height:100vh;height:100dvh;overflow:hidden;background:radial-gradient(circle at 62% 50%,#3d1b28,#13090e 75%);color:#fbf3ee}
#ob{position:absolute;inset:0;width:100%;height:100%}
.oc{
  position:absolute;left:5vw;top:50%;translate:0 -50%;max-width:min(460px,84vw);z-index:2;
  background:rgba(25,12,18,0.52);backdrop-filter:blur(16px);
  padding:30px 32px;border-radius:30px;border:1px solid rgba(255,255,255,0.12);
  transition:opacity .45s,transform .45s;
}
.oc.sw{opacity:0;transform:translateY(16px)}
.oc small{letter-spacing:.3em;color:#e8a0a8;font-size:.72rem;font-weight:700}
.oc h2{font-family:Fraunces,Georgia,serif;font-size:clamp(2.6rem,7vw,5.2rem);margin:.12em 0 .18em;line-height:.95;font-weight:900}
.oc p{color:#e2ced3;line-height:1.68;margin:0 0 20px;font-size:1rem}
.orb-tabs{display:flex;gap:8px;flex-wrap:wrap}
.orb-tab{
  padding:8px 16px;border-radius:99px;border:1px solid rgba(255,255,255,0.24);
  background:rgba(255,255,255,0.06);color:#fff;font-size:.74rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;transition:.3s;
}
.orb-tab.on,.orb-tab:hover{background:#e8a0a8;color:#1a0c11;border-color:#e8a0a8}
.od{position:absolute;right:5vw;top:50%;translate:0 -50%;display:flex;flex-direction:column;gap:14px;z-index:2}
.od i{width:10px;height:10px;border-radius:50%;background:#ffffff44;transition:.4s;cursor:pointer}
.od i.on{background:#e8a0a8;transform:scale(1.7);box-shadow:0 0 16px #e8a0a8}
@media(max-width:800px){.oc{top:auto;bottom:8vh;translate:0 0;padding:22px 24px}}

/* ── INGREDIENTS & BOTANICAL BLOOM GALLERY ── */
.tg{display:inline-flex;border:1.5px solid var(--ink);border-radius:99px;padding:4px;margin:14px 0 0;background:rgba(255,255,255,0.5)}
.tg button{border:0;background:none;padding:10px 24px;border-radius:99px;font:inherit;font-weight:700;font-size:.84rem;cursor:pointer;transition:.3s;color:var(--ink)}
.tg button.on{background:var(--ink);color:var(--cream)}
.pn{display:none}.pn.on{display:block;animation:fi .6s}
@keyframes fi{from{opacity:0;transform:translateY(16px)}}
.gal{display:flex;gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;padding:12px 0 22px;scrollbar-width:none}
.gal::-webkit-scrollbar{display:none}
.gal>div{
  flex:0 0 min(78vw,295px);height:345px;border-radius:28px;scroll-snap-align:start;
  display:grid;place-items:center;position:relative;overflow:hidden;
  transition:transform .45s,box-shadow .45s;border:1px solid rgba(35,20,25,0.08);
}
.gal>div:hover{transform:translateY(-8px);box-shadow:0 22px 44px rgba(35,20,25,0.12)}
.gal>div b{position:absolute;left:20px;bottom:18px;font-family:Fraunces,Georgia,serif;font-size:1.25rem}
.gal>div small{position:absolute;left:20px;top:18px;font-size:.66rem;letter-spacing:.22em;text-transform:uppercase;font-weight:700;color:var(--mut)}
.gal svg{width:62%}
.gc{display:flex;gap:10px;align-items:center;margin-top:8px}
.gc small{color:var(--mut);margin-left:8px}

/* ── STUDIO RITUALS ── */
.ex{
  display:grid;grid-template-columns:1fr 1.1fr;gap:5vw;align-items:center;margin:56px 0;
  background:rgba(255,252,249,0.72);border:1px solid rgba(35,20,25,0.08);
  border-radius:34px;padding:28px;box-shadow:0 20px 50px rgba(35,20,25,0.05);
}
.ex:nth-child(even) .ph{order:2}
.ph{aspect-ratio:4/3;border-radius:26px;display:grid;place-items:center;overflow:hidden;position:relative;transition:transform .6s}
.ex:hover .ph{transform:rotate(-1.2deg) scale(1.02)}
.ph svg{width:48%;animation:fl 8s ease-in-out infinite}
@keyframes fl{50%{transform:translateY(-18px) rotate(12deg)}}
.ex .no{font-family:Fraunces,Georgia,serif;font-size:3.6rem;color:var(--org);line-height:1;font-weight:900}
.ex h3{font-size:2rem;margin:6px 0}
.ex .du{color:var(--grn);font-weight:700;font-size:.8rem;letter-spacing:.18em;text-transform:uppercase}
.ex ul{padding-left:18px;color:var(--mut);line-height:1.8;margin:10px 0 18px}
@media(max-width:820px){.ex{grid-template-columns:1fr;padding:20px}.ex:nth-child(even) .ph{order:0}}

/* ── STATS, REVIEWS & CONTACT ── */
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:22px;margin-top:34px}
.stat-box{background:rgba(255,252,249,0.75);border:1px solid rgba(201,160,99,0.3);border-radius:24px;padding:24px;text-align:center}
.stats b{display:block;font-family:Fraunces,Georgia,serif;font-size:3.2rem;color:var(--org);line-height:1;margin-bottom:6px}
.stats div{color:var(--mut);font-size:.92rem;font-weight:500}

.tm{overflow:hidden;padding:10px 0 36px}
#tmi{display:flex;gap:22px;width:max-content;animation:mq 55s linear infinite}
.tm:hover #tmi{animation-play-state:paused}
.tq{width:min(82vw,360px);padding:28px;border-radius:26px;background:#fffaf7;border:1px solid rgba(35,20,25,0.1);box-shadow:0 14px 36px rgba(35,20,25,0.05);transition:transform .4s,border-color .3s}
.tq:hover{transform:translateY(-8px);border-color:var(--org)}
.tq .st{color:var(--gold);letter-spacing:.22em;margin-bottom:10px;font-size:.95rem}
.tq p{margin:0 0 14px;line-height:1.65;font-size:.96rem;color:var(--ink)}
.tq b{font-size:.82rem;color:var(--org);letter-spacing:.06em;text-transform:uppercase}

.cg{display:grid;grid-template-columns:1fr 1fr;gap:6vw;background:rgba(255,252,249,0.78);border:1px solid rgba(35,20,25,0.09);border-radius:34px;padding:42px}
@media(max-width:820px){.cg{grid-template-columns:1fr;padding:24px}}
form{display:grid;gap:14px;max-width:560px}
input,textarea{font:inherit;padding:15px 18px;border-radius:16px;border:1.5px solid rgba(35,20,25,0.18);background:#fff;color:var(--ink);transition:.3s}
input:focus,textarea:focus{outline:0;border-color:var(--org);box-shadow:0 0 0 4px rgba(196,80,106,0.16)}

footer{background:var(--ink);color:#e8d8c8;margin-top:10vh;padding:60px 5vw 32px;border-top:3px solid var(--gold)}
.fg{max-width:1200px;margin:0 auto 30px;display:grid;gap:30px;grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}
.fg b{display:block;color:var(--gold);margin-bottom:12px;letter-spacing:.2em;font-size:.76rem}
.fg a{display:block;text-decoration:none;margin:7px 0;opacity:.82;font-size:.92rem;transition:color .25s}
.fg a:hover{color:var(--org);opacity:1}
.fg p{margin:0 0 8px;opacity:.82;line-height:1.6;font-size:.92rem}
footer>p{text-align:center;font-size:.8rem;opacity:.6;margin:0;padding-top:20px;border-top:1px solid rgba(255,255,255,0.1)}

/* ── PRODUCT DETAIL MODAL ── */
#dt{position:fixed;inset:0;z-index:120;display:grid;place-items:center;padding:4vw;background:rgba(35,20,25,0.76);backdrop-filter:blur(10px);opacity:0;pointer-events:none;transition:opacity .4s}
#dt.on{opacity:1;pointer-events:auto}
.dp{background:var(--cream);border-radius:32px;max-width:900px;width:100%;max-height:90vh;overflow:auto;display:grid;grid-template-columns:1fr 1.25fr;transform:translateY(40px) scale(.96);transition:transform .5s cubic-bezier(.2,.8,.2,1);border:1px solid rgba(201,160,99,0.4);box-shadow:0 30px 80px rgba(0,0,0,0.4)}
#dt.on .dp{transform:none}
.dp .im{display:grid;place-items:center;padding:34px;min-height:320px;position:relative}
.dp .im svg{height:280px;filter:drop-shadow(0 20px 26px rgba(35,20,25,0.28))}
.dp .tx{padding:36px 34px}
.dp h3{font-size:2rem;margin:0 0 6px}
.dp td,.dp th{padding:10px 6px}
.x{float:right;background:none;border:1px solid var(--ink);border-radius:50%;width:38px;height:38px;cursor:pointer;transition:background .3s,color .3s}
.x:hover{background:var(--org);color:#fff;border-color:var(--org)}
@media(max-width:720px){.dp{grid-template-columns:1fr}}

/* ── TOAST NOTIFICATION ── */
#ts{position:fixed;left:50%;bottom:28px;translate:-50% 30px;background:var(--ink);color:var(--cream);border:1px solid var(--gold);padding:13px 26px;border-radius:99px;font-size:.86rem;font-weight:700;z-index:160;opacity:0;pointer-events:none;box-shadow:0 16px 40px rgba(35,20,25,0.35);transition:.45s cubic-bezier(.2,.8,.2,1)}
#ts.on{opacity:1;translate:-50% 0}
</style></head>
<body class="inspector-on">

<!-- ── SPINNING BOTANICAL PRELOADER ── -->
<div id="ld" data-edit-section="brand" data-edit-field="loaderImageUrl" data-edit-label="Preloader Logo & Emblem" style="cursor:pointer">
  ${o.loaderImageUrl ? `<div class="ld-custom-logo" style="width:110px;height:110px;border-radius:24px;background:rgba(255,255,255,0.7);backdrop-filter:blur(12px);border:1.5px solid rgba(201,160,99,0.4);display:flex;align-items:center;justify-content:center;box-shadow:0 16px 36px rgba(35,20,25,0.15);margin-bottom:14px;padding:12px"><img src="${o.loaderImageUrl}" alt="Loader Emblem" style="max-width:100%;max-height:100%;object-fit:contain"/></div>` : ""}
  <svg class="rt" viewBox="0 0 200 200"><defs><path id="lp" d="M100 100m-82 0a82 82 0 1 1 164 0a82 82 0 1 1-164 0"/></defs><text><textPath href="#lp">CLEAN BEAUTY • CRUELTY FREE • VEGAN FORMULAS • SMALL BATCH • </textPath></text></svg>
  <b id="lc">0%</b>
  <small>PREPARING THE BOTANICAL ATELIER</small>
</div>
<script>
/* ── IMMEDIATE PRELOADER ANIMATION ── */
window.dismissVeloraLoader = function() {
  const ld = document.getElementById('ld');
  if (ld) {
    ld.classList.add('go');
    setTimeout(() => {
      try { ld.remove(); } catch(e) {}
    }, 600);
  }
  document.body.classList.add('go');
};

(function(){
  const t0 = performance.now();
  const lc = document.getElementById('lc');
  let v = 0;
  function lk(){
    const el = (performance.now() - t0) / 1000;
    v = Math.min(1, Math.max(v + 0.035, el));
    if (lc) lc.textContent = Math.round(v * 100) + '%';
    if (v < 1) return requestAnimationFrame(lk);
    setTimeout(window.dismissVeloraLoader, 160);
  }
  lk();
  setTimeout(window.dismissVeloraLoader, 1900);
})();
<\/script>

<div id="cr"></div><i id="sprog"></i><div id="gr"></div><div id="ts"></div>

<!-- ── NAVBAR ── -->
<nav data-edit-section="brand" data-edit-label="Brand & Navbar">
  <span class="edit-pill-badge">✎ Edit Brand &amp; Nav</span>
  <a class="lg" href="#hero">
    ${o.logoImageUrl ? `<img src="${o.logoImageUrl}" alt="logo" />` : '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#c4506a"/><path d="M20 7C27 15 29 21 29 25a9 9 0 0 1-18 0c0-4 2-10 9-18z" fill="#fbf3ee"/><path d="M20 16v14" stroke="#c4506a" stroke-width="2"/></svg>'}
    ${o.brandName}<span>${o.brandSub}</span>
  </a>
  <ul>
    <li><a href="#hero">${o.navLinks[0] || "Home"}</a></li>
    <li><a href="#pantry">${o.navLinks[1] || "Collection"}</a></li>
    <li><a href="#production">${o.navLinks[2] || "Ingredients"}</a></li>
    <li><a href="#experience">${o.navLinks[3] || "Rituals"}</a></li>
    <li><a href="#about">${o.navLinks[4] || "About"}</a></li>
    <li><a href="#contact">${o.navLinks[5] || "Contacts"}</a></li>
  </ul>
  <div class="rg">
    <span class="lang">FR / EN</span>
    <a class="btn bagb" id="bagb" href="#contact" style="text-decoration:none">Book Consultation →</a>
    <button id="bg" aria-label="Menu"><i></i></button>
  </div>
</nav>

<div id="mn">
  <a href="#hero">${o.navLinks[0] || "Home"}</a>
  <a href="#pantry">${o.navLinks[1] || "Collection"}</a>
  <a href="#production">${o.navLinks[2] || "Ingredients"}</a>
  <a href="#experience">${o.navLinks[3] || "Rituals"}</a>
  <a href="#about">${o.navLinks[4] || "About"}</a>
  <a href="#contact">${o.navLinks[5] || "Contacts"}</a>
</div>

<!-- ── HERO 3D STAGE (8 INTERACTIVE 3D VESSELS) ── -->
<div id="hT">
  <section id="hero" data-edit-section="hero" data-edit-label="3D Hero & Vessels">
    <span class="edit-pill-badge">✎ Edit 3D Hero &amp; Vessels</span>
    <i class="lk" style="left:-8vw;top:6vh;width:42vw;height:42vw;background:var(--tint)"></i>
    <i class="lk" style="right:-10vw;bottom:8vh;width:38vw;height:38vw;background:#e8a0a8;animation-delay:-5s"></i>
    <i class="lk" style="left:30vw;top:50vh;width:26vw;height:26vw;background:#c9a063;opacity:.35;animation-delay:-9s"></i>
    <i class="pb" id="pb"></i>
    <ul class="pl" id="pl"></ul>
    <div class="bt">${o.heroBigTitle}</div>
    <div class="h-top-card">
      <small>HAUTE BOTANICAL FORMULATIONS</small>
      <p class="h1">${o.heroTagline}</p>
    </div>
    <svg class="badge" viewBox="0 0 200 200"><defs><path id="bp" d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0"/></defs><circle cx="100" cy="100" r="40" fill="#c4506a"/><text><textPath href="#bp">${o.heroBadgeText}</textPath></text><circle cx="100" cy="100" r="14" fill="#fff6d9"/></svg>
    <canvas id="gl"></canvas>

    <!-- Floating Glass Product Card (Showcase & Inquiry — No Cart/Checkout) -->
    <div class="info" id="inf" data-edit-section="products" data-edit-label="Active 3D Product">
      <div class="info-top">
        <small id="ik">SERUMS &amp; OILS</small>
        <span class="sz-pill" id="isz">30 ml</span>
      </div>
      <h2 id="in">Rosehip Glow Serum</h2>
      <span class="tag-em" id="itg">Radiant, dewy and bright</span>
      <p id="id"></p>
      <div class="note-bar"><b>BOTANICAL NOTES:</b> <span id="int">Rosehip, geranium, soft musk</span></div>
      <div class="ib">
        <b class="pri" id="ipr">$38</b>
        <button class="btn" id="add">Inquire / Sample</button>
        <button class="btn o" id="quickSpecBtn">3D Formula Details</button>
      </div>
    </div>

    <div class="ctr">
      <button class="ar" id="pv" aria-label="Previous">←</button>
      <b id="cn">01 / 08</b>
      <button class="ar" id="nx" aria-label="Next">→</button>
    </div>
    <div class="dh" id="dh">⟷ DRAG 3D VESSEL TO ROTATE 360°</div>
    <div class="sd">SCROLL TO EXPLORE 8 BOTANICAL VESSELS</div>
    <div class="mq"><div id="mqd"></div></div>
  </section>
</div>

<!-- ── THE COLLECTION SECTION ── -->
<div class="band"><h1 class="sf">Collection</h1></div>
<section class="sec" id="pantry" data-edit-section="products" data-edit-label="Product Collection">
  <span class="edit-pill-badge">✎ Edit Collection &amp; 8 Products</span>
  <span class="ey rv">✦ ${o.collectionEyebrow}</span>
  <h2 class="t rv">${o.collectionTitlePrefix} <em>${o.collectionTitleItalic}</em></h2>
  <p class="lead rv">${o.collectionLead}</p>
  <div class="cat rv">
    <a href="#c1">01 · Serums &amp; Oils</a>
    <a href="#c2">02 · Whipped Face Creams</a>
    <a href="#c3">03 · Velvet Lips &amp; Eau de Parfum</a>
    <a href="#c4">04 · Travel Discovery Minis</a>
  </div>

  <div id="c1" style="padding-top:60px">
    <h2 class="t rv" style="font-size:clamp(1.8rem,4vw,3rem)">Serums &amp; Facial Oils</h2>
    <p class="lead rv">Concentrated cellular treatments for luminosity, barrier hydration and tone — housed in UV-protective 30 ml glass dropper flacons.</p>
    <div class="gr" id="g1"></div>
  </div>

  <div id="c2" style="padding-top:60px">
    <h2 class="t rv" style="font-size:clamp(1.8rem,4vw,3rem)">Whipped Face Creams</h2>
    <p class="lead rv">Day and overnight barrier emulsions in heavy refillable 50 ml French glass jars with brushed gold lids.</p>
    <div class="gr" id="g2"></div>
  </div>

  <div id="c3" style="padding-top:60px">
    <h2 class="t rv" style="font-size:clamp(1.8rem,4vw,3rem)">Velvet Lips &amp; Haute Fragrance</h2>
    <p class="lead rv">Pure mineral pigment lipsticks suspended in botanical waxes and our signature Bulgarian rose eau de parfum.</p>
    <div class="gr" id="g3"></div>
  </div>

  <div id="c4" style="padding-top:60px">
    <h2 class="t rv" style="font-size:clamp(1.8rem,4vw,3rem)">Travel Discovery Minis</h2>
    <p class="lead rv">Flight-ready glass miniatures crafted for luxury hotels, weekend rituals and bespoke gifting.</p>
    <table class="rv">
      <tr><th>BOTANICAL FORMULA</th><th>POTENCY WINDOW</th><th>TRAVEL VESSEL</th></tr>
      <tr><td>Rosehip Glow Serum</td><td>12 months after opening</td><td>10 ml Pipette Flacon</td></tr>
      <tr><td>Vitamin C Brightening Serum</td><td>12 months after opening</td><td>10 ml Pipette Flacon</td></tr>
      <tr><td>Hyaluronic Hydra Serum</td><td>12 months after opening</td><td>10 ml Pipette Flacon</td></tr>
      <tr><td>Rose Petal Day Cream SPF 30</td><td>12 months after opening</td><td>15 ml Refillable Jar</td></tr>
      <tr><td>Shea &amp; Ceramide Night Cream</td><td>12 months after opening</td><td>15 ml Refillable Jar</td></tr>
      <tr><td>Midnight Rose Eau de Parfum</td><td>24 months after opening</td><td>10 ml Atomizer Spray</td></tr>
    </table>
  </div>
</section>

<!-- ── 3D CELLULAR ESSENCE SHADER ORB STAGE ── -->
<div id="oT">
  <section id="orb" data-edit-section="orb" data-edit-label="3D Essence Shader Orb">
    <span class="edit-pill-badge">✎ Edit 3D Essence Orb</span>
    <canvas id="ob"></canvas>
    <div class="oc" id="oc">
      <small id="os">THE CELLULAR ESSENCE · 01</small>
      <h2 id="ot">${o.orbStages[0].title}</h2>
      <p id="od2">${o.orbStages[0].description}</p>
      <div class="orb-tabs">
        <button class="orb-tab on" data-orb="0">01 · ${o.orbStages[0].title}</button>
        <button class="orb-tab" data-orb="1">02 · ${o.orbStages[1].title}</button>
        <button class="orb-tab" data-orb="2">03 · ${o.orbStages[2].title}</button>
      </div>
    </div>
    <div class="od"><i class="on" data-orb="0"></i><i data-orb="1"></i><i data-orb="2"></i></div>
  </section>
</div>

<!-- ── INGREDIENTS & CLINICAL ACTIVES ── -->
<div class="band" style="background:linear-gradient(120deg,#c9a063,#8a6a3a 58%,#c4506a)"><h1 class="sf">Ingredients</h1></div>
<section class="sec" id="production" data-edit-section="ingredients" data-edit-label="Botanicals & Actives">
  <span class="edit-pill-badge">✎ Edit Ingredients</span>
  <span class="ey rv">✦ ${o.ingredientsEyebrow}</span>
  <h2 class="t rv">${o.ingredientsTitlePrefix} <em>${o.ingredientsTitleItalic}</em></h2>
  <p class="lead rv">${o.ingredientsLead}</p>
  <div class="tg rv" id="tg">
    <button class="on" data-p="0">Cold-Pressed Botanicals</button>
    <button data-p="1">Clinical Actives (%)</button>
  </div>
  <div class="pn on" id="p0">
    <h3 class="sf" style="font-size:1.85rem;margin:26px 0 6px">Heirloom botanicals we harvest &amp; cold-press</h3>
    <p class="lead">Extracted without hexane or high heat to preserve delicate polyphenols, essential fatty acids and aromatic molecules.</p>
    <table>
      <tr><th>BOTANICAL EXTRACT</th><th>KEY FORMULA</th><th>DERMAL BENEFIT</th></tr>
      <tr><td>Andean Rosehip Seed Oil</td><td>Rosehip Glow Serum</td><td>Pro-retinol cellular renewal &amp; evening tone</td></tr>
      <tr><td>Unrefined Ghanaian Shea</td><td>Shea Night Cream</td><td>Deep lipid replenishment &amp; barrier comfort</td></tr>
      <tr><td>Organic Damask Rose Hydrosol</td><td>Rose Petal Day Cream</td><td>Calming redness &amp; weightless dewy hydration</td></tr>
      <tr><td>Alpine Aloe Barbadensis</td><td>Hydra Serum &amp; Day Cream</td><td>Instant soothing &amp; trans-epidermal water lock</td></tr>
      <tr><td>Grasse Jasmine Grandiflorum</td><td>Midnight Rose Parfum</td><td>Sensual night-blooming floral heart note</td></tr>
    </table>
  </div>
  <div class="pn" id="p1">
    <h3 class="sf" style="font-size:1.85rem;margin:26px 0 6px">Biocompatible clinical actives</h3>
    <p class="lead">Formulated at their exact peer-reviewed concentrations for visible results without barrier irritation.</p>
    <table>
      <tr><th>CLINICAL ACTIVE</th><th>EXACT DOSAGE</th><th>OPTIMAL RITUAL</th></tr>
      <tr><td>Vitamin C (Ascorbyl Glucoside + Ferulic)</td><td>10.0%</td><td>Morning · Antioxidant shield &amp; brightening</td></tr>
      <tr><td>Triple-Weight Hyaluronic Acid</td><td>2.0%</td><td>Morning &amp; Night · Multi-depth dermal plumping</td></tr>
      <tr><td>Pharmaceutical Niacinamide (B3)</td><td>4.0%</td><td>Morning · Pore refinement &amp; tone balance</td></tr>
      <tr><td>Biomimetic Ceramides NP / AP / EOP</td><td>1.5%</td><td>Night · Overnight lipid barrier reconstruction</td></tr>
    </table>
  </div>
  <div class="gc">
    <button class="ar" id="gp" aria-label="Previous">←</button>
    <button class="ar" id="gn" aria-label="Next">→</button>
    <small>Browse our raw botanical archive (or use ← → arrow keys)</small>
  </div>
  <div class="gal" id="gal"></div>
</section>

<!-- ── STUDIO RITUALS ── -->
<div class="band" style="background:linear-gradient(120deg,#e8a0a8,#c4506a 55%,#8a6a3a)"><h1 class="sf">Rituals</h1></div>
<section class="sec" id="experience" data-edit-section="rituals" data-edit-label="Studio Rituals">
  <span class="edit-pill-badge">✎ Edit 3 Studio Rituals</span>
  <span class="ey rv">✦ ${o.ritualsEyebrow}</span>
  <h2 class="t rv">${o.ritualsTitlePrefix} <em>${o.ritualsTitleItalic}</em></h2>
  <p class="lead rv">${o.ritualsLead}</p>
  <div id="exs"></div>
</section>

<!-- ── BOTANICAL JOURNAL & DERMAL SCIENCE ARTICLES ── -->
<section class="sec" id="journal" data-edit-section="about" data-edit-label="Botanical Journal Articles">
  <span class="edit-pill-badge">✎ Edit Articles &amp; Journal</span>
  <span class="ey rv">✦ BOTANICAL MONOGRAPHS &amp; ARTICLES</span>
  <h2 class="t rv">The <em>Atelier</em> Journal</h2>
  <p class="lead rv">Peer-reviewed clinical notes, cold-pressing harvests, and holistic dermal rituals written by our Grasse &amp; Paris formulators.</p>
  <div class="stats" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr));text-align:left">
    <article class="stat-box" style="text-align:left">
      <small style="color:var(--org);font-weight:800;letter-spacing:.18em;font-size:.68rem">MONOGRAPH 01 · CELLULAR LIPIDS</small>
      <h3 class="sf" style="font-size:1.45rem;margin:8px 0;color:var(--ink)">Cold-Pressed Andean Rosehip vs. Synthetic Retinoids</h3>
      <p style="font-size:.92rem;line-height:1.65;color:var(--mut)">How trans-retinoic acid in wild-harvested Rosa rubiginosa accelerates epidermal turnover without compromising the stratum corneum.</p>
    </article>
    <article class="stat-box" style="text-align:left">
      <small style="color:var(--org);font-weight:800;letter-spacing:.18em;font-size:.68rem">MONOGRAPH 02 · OLFACTORY ARCHIVE</small>
      <h3 class="sf" style="font-size:1.45rem;margin:8px 0;color:var(--ink)">Dawn Harvests in Grasse: Steam-Distilling Rosa Damascena</h3>
      <p style="font-size:.92rem;line-height:1.65;color:var(--mut)">Over 4,000 kilograms of hand-picked dawn petals are distilled in copper alembics to yield a single liter of our cellular hydrosol.</p>
    </article>
    <article class="stat-box" style="text-align:left">
      <small style="color:var(--org);font-weight:800;letter-spacing:.18em;font-size:.68rem">MONOGRAPH 03 · SUSTAINABLE GLASS</small>
      <h3 class="sf" style="font-size:1.45rem;margin:8px 0;color:var(--ink)">UV-Protective Apothecary Vessels &amp; Infinite Refills</h3>
      <p style="font-size:.92rem;line-height:1.65;color:var(--mut)">Why heavy French glass and brushed brass collars protect delicate polyphenols from photo-oxidation far longer than plastic packaging.</p>
    </article>
  </div>
</section>

<!-- ── ABOUT & STATS ── -->
<section class="sec" id="about" data-edit-section="about" data-edit-label="About & Stats">
  <span class="edit-pill-badge">✎ Edit About &amp; Stats</span>
  <span class="ey rv">✦ ${o.aboutEyebrow}</span>
  <h2 class="t rv">${o.aboutTitlePrefix} <em>${o.aboutTitleItalic}</em>${o.aboutTitleSuffix}</h2>
  <p class="lead rv">${o.aboutLead}</p>
  <div class="stats">
    ${o.stats.map((a) => `<div class="stat-box"><b data-n="${a.number}">0</b><div>${a.label}</div></div>`).join("")}
  </div>
</section>

<!-- ── CUSTOMER REVIEWS ── -->
<section class="sec" id="love" data-edit-section="reviews" data-edit-label="Customer Reviews">
  <span class="edit-pill-badge">✎ Edit Reviews</span>
  <span class="ey rv">✦ ${o.reviewsEyebrow}</span>
  <h2 class="t rv">${o.reviewsTitlePrefix} <em>${o.reviewsTitleItalic}</em></h2>
</section>
<div class="tm" data-edit-section="reviews" data-edit-label="Customer Reviews"><div id="tmi"></div></div>

<!-- ── CONTACT CONCIERGE ── -->
<section class="sec" id="contact" data-edit-section="contact" data-edit-label="Contact Section">
  <span class="edit-pill-badge">✎ Edit Contacts</span>
  <div class="cg">
    <div>
      <span class="ey rv">✦ ${o.contactEyebrow}</span>
      <h2 class="t rv">${o.contactTitlePrefix} <em>${o.contactTitleItalic}</em></h2>
      <p class="lead rv">${o.contactLead}</p>
      <p class="lead rv" style="color:var(--ink);font-weight:600">${o.contactEmail}<br><span style="color:var(--mut);font-weight:400">${o.contactHours}</span></p>
    </div>
    <form id="fm" class="rv">
      <input required placeholder="Your full name">
      <input required type="email" placeholder="Your email address">
      <textarea rows="4" required placeholder="Tell us about your skin goals or preferred studio ritual…"></textarea>
      <button class="btn" type="submit">Send Concierge Note</button>
      <p id="ok" style="color:var(--org);margin:0;font-weight:700"></p>
    </form>
  </div>
</section>

<!-- ── FOOTER (WITH LOCKED POWERED BY EFERZ WATERMARK) ── -->
<footer data-edit-section="footer" data-edit-label="Footer Section">
  <span class="edit-pill-badge">✎ Edit Footer</span>
  <div class="fg">
    <div><b>${o.brandName.toUpperCase()} ${o.brandSub.toUpperCase()}</b><p>${o.footerTagline}</p></div>
    <div><b>EXPLORE</b><a href="#pantry">${o.navLinks[1] || "Collection"}</a><a href="#production">${o.navLinks[2] || "Ingredients"}</a><a href="#experience">${o.navLinks[3] || "Rituals"}</a><a href="#journal">Journal</a></div>
    <div><b>ATELIERS</b><p>${o.footerStudioAddress}</p><p>${o.footerLabAddress}</p></div>
    <div><b>CONCIERGE</b><p>${o.contactEmail}</p><a href="#contact">Book a Private Consultation</a></div>
  </div>
  <div style="max-width:1200px;margin:28px auto 0;padding-top:20px;border-top:1px solid rgba(255,255,255,0.12);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px;font-size:.82rem;color:#e8d8c8">
    <span>© 2026 <strong style="color:#fff">${o.brandName} ${o.brandSub}</strong>. All Rights Reserved.</span>
    <span style="display:inline-flex;align-items:center;gap:8px;padding:7px 16px;border-radius:999px;background:rgba(196,80,106,0.22);border:1px solid #c9a063;color:#fff;font-weight:700;letter-spacing:.08em;user-select:none">
      🔒 Powered by <a href="https://eferz.com" target="_blank" rel="noopener noreferrer" style="color:#c9a063;text-decoration:underline;font-weight:900">EFerz</a> (<a href="https://eferz.com" target="_blank" rel="noopener noreferrer" style="color:#fff;text-decoration:none">EFerz.com</a>)
    </span>
  </div>
</footer>

<!-- Floating Quick-Edit Bar when any text is clicked -->
<div id="velora-inline-bar" style="position:fixed;bottom:22px;left:50%;transform:translate(-50%,20px);z-index:260;background:rgba(35,20,25,0.95);backdrop-filter:blur(16px);border:1px solid #c9a063;color:#fbf3ee;padding:8px 18px;border-radius:999px;font-size:.76rem;font-weight:700;letter-spacing:.06em;display:flex;align-items:center;gap:10px;opacity:0;pointer-events:none;transition:.3s;box-shadow:0 16px 40px rgba(0,0,0,0.45)">
  <span style="width:8px;height:8px;border-radius:50%;background:#c4506a;box-shadow:0 0 10px #c4506a"></span>
  <span id="velora-inline-msg">Click any text to edit directly on canvas or in the left customizer</span>
</div>

<!-- ── PRODUCT FORMULA QUICK-VIEW MODAL ── -->
<div id="dt">
  <div class="dp">
    <div class="im" id="di"></div>
    <div class="tx">
      <button class="x" id="dx">✕</button>
      <small id="dk" style="letter-spacing:.24em;color:var(--org);font-weight:700;font-size:.7rem"></small>
      <h3 id="dn" class="sf"></h3>
      <p class="lead" id="dd" style="font-size:.96rem;margin:0 0 12px"></p>
      <table id="dtb"></table>
      <div style="display:flex;gap:10px;align-items:center;margin-top:16px">
        <button class="btn" id="dc">Request Private Sample</button>
        <button class="btn o" id="view3dBtn">Inspect in 3D Hero ↑</button>
      </div>
    </div>
  </div>
</div>

<script src="/three.r128.min.js"><\/script>
<script>
(function initVeloraScope(){
  if (typeof THREE === 'undefined') {
    if (!window._threeScriptRequested) {
      window._threeScriptRequested = true;
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      s.onload = () => setTimeout(initVeloraScope, 20);
      document.head.appendChild(s);
    }
    setTimeout(initVeloraScope, 40);
    return;
  }
  const CONFIG = ${r};

/* ── CLICK-TO-EDIT INSPECTOR + DIRECT INLINE TEXT EDITING ── */
function highlightSelectedSection(sectionId) {
  document.querySelectorAll('[data-edit-section]').forEach((el) => {
    const matchSec = el.getAttribute('data-edit-section') === sectionId;
    el.classList.toggle('is-selected-element', Boolean(matchSec));
  });
}

document.addEventListener('click', (e) => {
  if (document.body.classList.contains('inspector-on')) {
    const textEl = e.target.closest('h1,h2,h3,p,small,em,b,span,li,td,th');
    const inLockedFooter = e.target.closest('footer a[href*="EFerz"]');
    if (textEl && !inLockedFooter && !textEl.classList.contains('edit-pill-badge') && textEl.children.length <= 2) {
      textEl.setAttribute('contenteditable', 'true');
      textEl.style.outline = '1.5px dashed #c4506a';
      textEl.style.outlineOffset = '4px';
      textEl.style.borderRadius = '6px';
      const bar = document.getElementById('velora-inline-bar');
      const msg = document.getElementById('velora-inline-msg');
      if (bar && msg) {
        msg.textContent = '✎ Editing text directly: "' + (textEl.innerText || '').slice(0, 32) + '..."';
        bar.style.opacity = '1';
        bar.style.transform = 'translate(-50%,0)';
        clearTimeout(bar._t);
        bar._t = setTimeout(() => {
          bar.style.opacity = '0';
          bar.style.transform = 'translate(-50%,20px)';
        }, 3200);
      }
    }
  }

  const pcd = e.target.closest('.pcd');
  if (pcd && pcd.dataset.i !== undefined) {
    const pIdx = parseInt(pcd.dataset.i, 10);
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({
        type: 'VELORA_SELECT_SECTION',
        section: 'products',
        productIndex: pIdx,
        label: 'Product: ' + (CONFIG.products[pIdx] ? CONFIG.products[pIdx].name : '')
      }, '*');
    }
  }
  const target = e.target.closest('[data-edit-section]');
  if (!target) return;
  const section = target.getAttribute('data-edit-section');
  const label = target.getAttribute('data-edit-label') || section;
  highlightSelectedSection(section);
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({
      type: 'VELORA_SELECT_SECTION',
      section: section,
      productIndex: section === 'products' ? si : undefined,
      label: label
    }, '*');
  }
});

window.addEventListener('message', (event) => {
  const data = event.data;
  if (!data || typeof data !== 'object') return;
  if (data.type === 'VELORA_SET_INSPECTOR') {
    document.body.classList.toggle('inspector-on', Boolean(data.enabled));
  }
  if (data.type === 'VELORA_FOCUS_SECTION') {
    highlightSelectedSection(data.section);
    if (data.section === 'products' && typeof data.productIndex === 'number') {
      show(data.productIndex);
    }
  }
});

const $=i=>document.getElementById(i),root=document.documentElement,clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),lerp=(a,b,t)=>a+(b-a)*t,ease=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
const P=CONFIG.products.map(p=>({
  n:p.name,
  k:p.categoryLabel,
  g:p.groupIndex,
  t:p.tagline,
  d:p.description,
  c:p.colorHex,
  bg:p.bgHex,
  lid:p.lidHex,
  s:p.shapeIndex,
  w:p.sizeText,
  notes:p.notes,
  ing:p.ingredients,
  pr:p.price,
  customImageUrl:p.customImageUrl||null
}));
const brandCaps = (CONFIG.brandName || 'VELORA').toUpperCase();

/* ── DETAILED BOTANICAL VESSEL SVG ILLUSTRATIONS ── */
function jarSVG(p){
  const s=p.s,l=p.lid,c=p.c,st='stroke="#231419" stroke-opacity=".35" stroke-width="1.8"';
  const tx=(x,y,t,sz=7.5)=>'<text x="'+x+'" y="'+y+'" text-anchor="middle" font-size="'+sz+'" font-weight="900" font-family="Georgia,serif" letter-spacing="1.2" fill="#231419">'+t+'</text>';
  if(s==0){
    /* Whipped Cream Apothecary Jar with Gold Collar */
    return '<svg viewBox="0 0 120 120">' +
      '<rect x="16" y="16" width="88" height="26" rx="7" fill="'+l+'" '+st+'/>' +
      '<rect x="22" y="42" width="76" height="5" fill="#c9a063"/>' +
      '<path d="M12 47h96v46c0 10-7 16-16 16H28c-9 0-16-6-16-16z" fill="'+c+'"/>' +
      '<path d="M12 47h96v46c0 10-7 16-16 16H28c-9 0-16-6-16-16z" fill="#fff" fill-opacity=".22" '+st+'/>' +
      '<rect x="26" y="60" width="68" height="34" rx="5" fill="#fbf3ee" stroke="#c9a063" stroke-width="1"/>' +
      tx(60,75,brandCaps,8) +
      '<text x="60" y="86" text-anchor="middle" font-size="5.5" font-family="sans-serif" fill="#73565e">'+p.w.toUpperCase()+'</text>' +
    '</svg>';
  }
  if(s==1){
    /* Glass Dropper Serum Flacon with Pipette & Gold Ring */
    return '<svg viewBox="0 0 120 185">' +
      '<rect x="47" y="4" width="26" height="34" rx="13" fill="#231419"/>' +
      '<rect x="39" y="36" width="42" height="14" rx="3" fill="'+l+'" '+st+'/>' +
      '<path d="M35 52h50c7 0 13 6 13 14v92c0 10-6 16-14 16H36c-8 0-14-6-14-16V66c0-8 6-14 13-14z" fill="'+c+'"/>' +
      '<rect x="57" y="52" width="6" height="86" rx="3" fill="#ffffff" fill-opacity=".45"/>' +
      '<path d="M35 52h50c7 0 13 6 13 14v92c0 10-6 16-14 16H36c-8 0-14-6-14-16V66c0-8 6-14 13-14z" fill="#fff" fill-opacity=".18" '+st+'/>' +
      '<rect x="30" y="90" width="60" height="48" rx="5" fill="#fbf3ee" stroke="#c9a063" stroke-width="1"/>' +
      tx(60,110,brandCaps,8) +
      '<text x="60" y="124" text-anchor="middle" font-size="5.5" font-family="sans-serif" fill="#73565e">SERUM · '+p.w.toUpperCase()+'</text>' +
    '</svg>';
  }
  if(s==2){
    /* Couture Lipstick Bullet with Gold Collar */
    return '<svg viewBox="0 0 90 185">' +
      '<path d="M30 18Q45 2 60 18V70H30z" fill="'+c+'" '+st+'/>' +
      '<rect x="26" y="68" width="38" height="14" rx="2" fill="#c9a063"/>' +
      '<rect x="23" y="82" width="44" height="90" rx="6" fill="'+l+'" '+st+'/>' +
      '<rect x="23" y="82" width="44" height="8" fill="#fff" fill-opacity=".35"/>' +
      tx(45,130,brandCaps,6.5) +
    '</svg>';
  }
  /* Haute Eau de Parfum Flacon with Atomizer */
  return '<svg viewBox="0 0 120 175">' +
    '<rect x="43" y="4" width="34" height="38" rx="6" fill="'+l+'" '+st+'/>' +
    '<rect x="50" y="42" width="20" height="14" fill="#c9a063"/>' +
    '<line x1="60" y1="56" x2="68" y2="152" stroke="#ffffff" stroke-opacity=".55" stroke-width="2"/>' +
    '<rect x="16" y="56" width="88" height="106" rx="16" fill="'+c+'"/>' +
    '<rect x="16" y="56" width="88" height="106" rx="16" fill="#fff" fill-opacity=".2" '+st+'/>' +
    '<rect x="32" y="92" width="56" height="44" rx="5" fill="#fbf3ee" stroke="#c9a063" stroke-width="1"/>' +
    tx(60,112,brandCaps,8) +
    '<text x="60" y="125" text-anchor="middle" font-size="5.2" font-family="sans-serif" fill="#73565e">EAU DE PARFUM</text>' +
  '</svg>';
}

function bloom(c,f,n){
  let o='';
  for(let i=0;i<n;i++)o+='<ellipse cx="100" cy="52" rx="22" ry="44" fill="'+c+'" opacity=".88" transform="rotate('+(i/n*360)+' 100 100)"/>';
  return '<svg viewBox="0 0 200 200">'+o+'<circle cx="100" cy="100" r="24" fill="'+f+'"/><circle cx="100" cy="100" r="10" fill="#231419" opacity=".18"/></svg>';
}

/* ── POPULATE COLLECTION GRID CARDS (SHOWCASE & INQUIRY — NO CART) ── */
[1,2,3].forEach(g=>{
  $('g'+g).innerHTML = P.map((p,i)=>[p,i]).filter(x=>x[0].g==g).map(([p,i])=>
    '<div class="pcd rv" data-i="'+i+'">' +
      '<div>' +
        '<div class="ar2" style="background:'+p.bg+'">' +
          '<span class="sz-tag">'+p.w+'</span>' +
          (p.customImageUrl ? ('<img src="' + p.customImageUrl + '" alt="' + p.n + '" style="height:78%;max-width:85%;object-fit:contain;filter:drop-shadow(0 16px 18px rgba(35,20,25,0.22))">') : jarSVG(p)) +
        '</div>' +
        '<div class="pcd-meta">' +
          '<span class="pcd-cat">'+p.k+'</span>' +
          '<h3 class="sf">'+p.n+'</h3>' +
          '<span class="tag-txt">'+p.t+'</span>' +
        '</div>' +
      '</div>' +
      '<div class="pcd-foot">' +
        '<b>$'+p.pr+'</b>' +
        '<div class="pcd-actions">' +
          '<button class="pcd-btn view-3d-card" data-i="'+i+'">3D View</button>' +
          '<button class="pcd-btn fill quick-add-card" data-i="'+i+'">Inquire →</button>' +
        '</div>' +
      '</div>' +
    '</div>'
  ).join('');
});

$('mqd').innerHTML=(P.map(p=>'<span>'+p.n+'</span>').join('')).repeat(2);
const GL=[
  ['Andean Rosehip','#d9764a','#ffd9a8',8,'COLD-PRESSED OIL'],
  ['Ghanaian Shea','#e8c9a0','#fff1d6',6,'UNREFINED BUTTER'],
  ['Damask Rose','#d1607a','#ffd0da',10,'STEAM HYDROSOL'],
  ['Alpine Aloe','#7aa86a','#d8efc8',7,'CELLULAR GEL'],
  ['Grasse Jasmine','#f4efe6','#f2d36a',6,'NIGHT ABSOLUTE']
],GB=['#ffe3c2','#f6e8dc','#fbdde3','#e1efc3','#f9f3e2'];
$('gal').innerHTML=GL.map((g,i)=>'<div style="background:'+GB[i]+'"><small>'+g[4]+'</small>'+bloom(g[1],g[2],g[3])+'<b>'+g[0]+'</b></div>').join('');

const EX=CONFIG.rituals.map(r=>[r.number,r.title,r.duration,r.description,r.included,r.bgHex,r.petalHex,r.centerHex,r.petalCount]);
$('exs').innerHTML=EX.map(e=>'<div class="ex rv"><div class="ph" style="background:'+e[5]+'">'+bloom(e[6],e[7],e[8])+'</div><div><div class="no">'+e[0]+'</div><div class="du">'+e[2].toUpperCase()+'</div><h3 class="sf">'+e[1]+'</h3><p class="lead" style="margin:0 0 10px">'+e[3]+'</p><b>Included in your ritual:</b><ul>'+e[4].map(x=>'<li>'+x+'</li>').join('')+'</ul><a class="btn o" href="#contact">Reserve Atelier Session</a></div></div>').join('');

/* ── MODAL & CONCIERGE INQUIRY ACTIONS (NO CART/CHECKOUT) ── */
let cm=0;
function openProductModal(idx){
  const p=P[idx];if(!p)return;
  cm=idx;
  $('dk').textContent=p.k+' · '+p.w;
  $('dc').textContent='Inquire About '+p.n;
  $('di').innerHTML=jarSVG(p);
  $('di').style.background=p.bg;
  $('dn').textContent=p.n;
  $('dd').textContent=p.d;
  $('dtb').innerHTML=[
    ['Sensory Profile',p.t],
    ['Botanical Notes',p.notes],
    ['Key Actives & INCI',p.ing],
    ['Vessel Size',p.w+' Refillable Apothecary Glass']
  ].map(r=>'<tr><th>'+r[0].toUpperCase()+'</th><td>'+r[1]+'</td></tr>').join('');
  $('dt').classList.add('on');
}
document.querySelectorAll('.pcd').forEach(c=>c.onclick=(e)=>{
  if(e.target.closest('.quick-add-card')||e.target.closest('.view-3d-card'))return;
  openProductModal(+c.dataset.i);
});
document.querySelectorAll('.quick-add-card').forEach(b=>b.onclick=(e)=>{
  e.stopPropagation();
  scrollToConcierge(+b.dataset.i);
});
document.querySelectorAll('.view-3d-card').forEach(b=>b.onclick=(e)=>{
  e.stopPropagation();
  goto(+b.dataset.i);
});
$('quickSpecBtn').onclick=(e)=>{e.stopPropagation();openProductModal(si)};
$('view3dBtn').onclick=()=>{cl();goto(cm)};

const cl=()=>$('dt').classList.remove('on');
$('dx').onclick=cl;$('dt').onclick=e=>{if(e.target===$('dt'))cl()};$('dc').addEventListener('click',cl);
$('fm').onsubmit=e=>{e.preventDefault();$('ok').textContent='Merci! Your private concierge request has been received.';e.target.reset()};

function scrollToConcierge(i){
  const cEl=$('contact');
  if(cEl)tg=clamp(cEl.getBoundingClientRect().top+scrollY-60,0,root.scrollHeight-innerHeight);
  const t=$('ts');
  t.textContent='✦ Inquiring about '+P[i].n+' — Complete the Concierge form below';
  t.classList.add('on');
  clearTimeout(t._h);
  t._h=setTimeout(()=>t.classList.remove('on'),2600);
}
$('add').onclick=()=>scrollToConcierge(si);
$('dc').addEventListener('click',()=>scrollToConcierge(cm));

const QS=CONFIG.reviews.map(r=>[r.author,r.quote]);
$('tmi').innerHTML=QS.concat(QS).map(q=>'<div class="tq"><div class="st">★★★★★</div><p>"'+q[1]+'"</p><b>'+q[0]+'</b></div>').join('');
document.querySelectorAll('.pcd').forEach(c=>{
  c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*12);c.style.setProperty('--rx',(.5-(e.clientY-r.top)/r.height)*12)});
  c.addEventListener('mouseleave',()=>{c.style.setProperty('--rx',0);c.style.setProperty('--ry',0)});
});

/* ── PRODUCTION TOGGLE & GALLERY ── */
document.querySelectorAll('#tg button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('#tg button').forEach(x=>x.classList.toggle('on',x===b));
  document.querySelectorAll('.pn').forEach((p,i)=>p.classList.toggle('on',i==+b.dataset.p));
});
const gal=$('gal');
$('gn').onclick=()=>gal.scrollBy({left:315,behavior:'smooth'});
$('gp').onclick=()=>gal.scrollBy({left:-315,behavior:'smooth'});
addEventListener('keydown',e=>{
  if(e.key==='Escape')cl();
  const r=gal.getBoundingClientRect();
  if(r.top<innerHeight&&r.bottom>0){
    if(e.key==='ArrowRight')$('gn').click();
    if(e.key==='ArrowLeft')$('gp').click();
  }
});

/* ── MOBILE MENU & SMOOTH SCROLL ── */
$('bg').onclick=()=>$('mn').classList.toggle('on');
$('mn').querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>$('mn').classList.remove('on')));

let tg=scrollY,cur=scrollY,lock=false;
addEventListener('wheel',e=>{if(e.ctrlKey||$('dt').classList.contains('on'))return;tg=clamp(tg+e.deltaY*(e.deltaMode?32:1),0,root.scrollHeight-innerHeight)},{passive:true});
addEventListener('scroll',()=>{if(Math.abs(scrollY-cur)>3)tg=cur=scrollY});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const h=a.getAttribute('href'),t=h.length>1&&document.querySelector(h);
  if(!t)return;
  e.preventDefault();
  tg=clamp(t.getBoundingClientRect().top+scrollY-(h==='#hero'?0:70),0,root.scrollHeight-innerHeight);
}));

const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){
    e.target.classList.add('in');
    if(e.target.dataset.n){
      const n=+e.target.dataset.n,t=performance.now();
      (function c(){const v=clamp((performance.now()-t)/1400);e.target.textContent=Math.round(n*(1-Math.pow(1-v,3)));if(v<1)requestAnimationFrame(c)})();
    }
    io.unobserve(e.target);
  }
}),{threshold:.15});
document.querySelectorAll('.rv,[data-n]').forEach(e=>io.observe(e));

let mx=0,my=0,sx=0,sy=0,cx=0,cy=0,rx=0,ry=0;
addEventListener('mousemove',e=>{
  mx=e.clientX/innerWidth*2-1;my=e.clientY/innerHeight*2-1;cx=e.clientX;cy=e.clientY;
  $('cr').style.opacity=1;
  $('cr').classList.toggle('h',!!e.target.closest('a,button,.pcd,.gal>div,.ex,input,textarea'));
  $('cr').classList.toggle('dg',e.target===cv);
});
document.querySelectorAll('.btn').forEach(b=>{
  b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.translate=((e.clientX-r.left-r.width/2)*.2)+'px '+((e.clientY-r.top-r.height/2)*.26)+'px'});
  b.addEventListener('mouseleave',()=>b.style.translate='');
});

/* ── THREE.JS HAUTE BOTANICAL 3D VESSEL STAGE ── */
const cv=$('gl'),hero=$('hero'),R=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true});
R.setPixelRatio(Math.min(devicePixelRatio,2));R.outputEncoding=THREE.sRGBEncoding;R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.2;
const scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(30,1,.1,100);cam.position.set(0,0,15);
const env=new THREE.Scene();env.add(new THREE.Mesh(new THREE.BoxGeometry(30,30,30),new THREE.MeshBasicMaterial({color:0x8a7a6c,side:THREE.BackSide})));
function pnl(w,h,x,y,z,c,i){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color(c).multiplyScalar(i),side:THREE.DoubleSide}));m.position.set(x,y,z);m.lookAt(0,0,0);env.add(m)}
pnl(3,16,-9,2,4,0xffffff,6);pnl(3,16,9,2,3,0xfff0dc,5);pnl(14,3,0,10,0,0xffffff,5);pnl(10,2,0,-9,3,0xffe0c0,3);pnl(8,2,0,4,-9,0xffc0d0,6);pnl(2,10,-6,0,-6,0xffffff,5);pnl(2,10,6,0,-6,0xffd8c8,5);
scene.environment=new THREE.PMREMGenerator(R).fromScene(env,.02).texture;
const key=new THREE.DirectionalLight(0xfff0dc,1.35);key.position.set(4,6,7);scene.add(key);

function lathe(a){return new THREE.LatheGeometry(new THREE.SplineCurve(a.map(v=>new THREE.Vector2(v[0],v[1]))).getPoints(90),64)}
const PR=[
  /* 0: Refillable French Glass Cream Jar */
  {p:[[0,.02],[1.5,0],[1.64,.12],[1.68,.5],[1.68,1.8],[1.62,2.05],[1.55,2.1]],top:2.1,H:3,lr:1.68,L:[.35,1.75],lid:{r:1.7,h:.88},fill:.74,k:1.28,jar:true},
  /* 1: UV-Glass Dropper Serum Bottle + Pipette + Gold Collar */
  {p:[[0,.02],[1.0,0],[1.14,.12],[1.18,.5],[1.18,2.9],[1.1,3.2],[.82,3.4],[.62,3.5],[.62,3.7]],top:3.7,H:5.1,lr:1.18,L:[.7,2.6],lid:{r:.74,h:.44},fill:.66,bulb:true,k:.88},
  /* 2: Couture Lipstick Bullet + Brushed Gold Collar */
  {lip:true,top:3.8,H:3.8,lr:.76,L:[.4,1.4],lid:{r:.76,h:1.8},k:1.15},
  /* 3: Eau de Parfum Flacon + Gold Atomizer + Internal Dip Tube */
  {p:[[0,.02],[1.35,0],[1.5,.15],[1.54,.5],[1.54,2.5],[1.4,2.85],[.5,3.0],[.45,3.2]],top:3.2,H:4.3,lr:1.54,L:[.9,2.2],lid:{r:.58,h:1.25},fill:.78,parfum:true,k:1.02}
];
let kk=1;
const jar=new THREE.Group(),sc=new THREE.Group();jar.add(sc);
const glassM=new THREE.MeshPhysicalMaterial({color:0xffffff,roughness:.03,transparent:true,opacity:.22,clearcoat:1,clearcoatRoughness:.02,envMapIntensity:3.4,side:THREE.DoubleSide,depthWrite:false});
const fillM=new THREE.MeshPhysicalMaterial({color:0xe3a36b,roughness:.2,clearcoat:.7,envMapIntensity:1.4,emissive:0xe3a36b,emissiveIntensity:.18});
const lidM=new THREE.MeshStandardMaterial({color:0xc9a063,metalness:.82,roughness:.22,envMapIntensity:2});
const goldTrimM=new THREE.MeshStandardMaterial({color:0xd4af37,metalness:.92,roughness:.18,envMapIntensity:2.2});

const lc=document.createElement('canvas');lc.width=1024;lc.height=420;const lx=lc.getContext('2d'),ltex=new THREE.CanvasTexture(lc);ltex.encoding=THREE.sRGBEncoding;
const labelM=new THREE.MeshStandardMaterial({map:ltex,roughness:.55,metalness:.08,side:THREE.DoubleSide});
const mG=new THREE.Mesh(lathe(PR[0].p),glassM),mF=new THREE.Mesh(lathe(PR[0].p),fillM),mL=new THREE.Mesh(new THREE.CylinderGeometry(1,1,.5,48),lidM),mB=new THREE.Mesh(new THREE.CylinderGeometry(1,1,1,48,1,true),labelM);
const mU=new THREE.Mesh(new THREE.LatheGeometry([[0,0],[.4,0],[.42,.15],[.42,.75],[.3,1],[0,1.05]].map(a=>new THREE.Vector2(a[0],a[1])),40),new THREE.MeshStandardMaterial({color:0x231419,roughness:.5}));

/* Extra Luxury 3D Details: Internal Glass Pipette / Perfume Dip Tube & Gold Neck Collar */
const pipetteTube=new THREE.Mesh(new THREE.CylinderGeometry(.07,.05,2.75,24),glassM);
pipetteTube.position.y=2.1;
const goldCollar=new THREE.Mesh(new THREE.CylinderGeometry(.78,.78,.22,48),goldTrimM);
goldCollar.position.y=1.82;
sc.add(mG,mF,mL,mB,mU,pipetteTube,goldCollar);
scene.add(jar);

function wrap(t,max){const w=t.split(' '),o=[];let l='';w.forEach(x=>{if((l+' '+x).trim().length>max&&l){o.push(l);l=x}else l=(l+' '+x).trim()});o.push(l);return o}
function label(p){
  lx.fillStyle='#fbf3ee';lx.fillRect(0,0,1024,420);
  lx.fillStyle=p.c;lx.fillRect(0,0,1024,26);lx.fillRect(0,394,1024,26);
  /* Gold Hairline Frame */
  lx.strokeStyle='#c9a063';lx.lineWidth=4;lx.strokeRect(24,42,976,336);
  lx.fillStyle='#231419';lx.textAlign='center';lx.textBaseline='middle';
  lx.font='700 54px Georgia,serif';
  const spacedBrand = (CONFIG.brandName || 'VELORA').toUpperCase().split('').join(' ');
  lx.fillText(spacedBrand,512,96);
  lx.fillStyle=p.c==='#f1dcc0'?'#a9744a':p.c;
  lx.font='italic 700 58px Georgia,serif';
  wrap(p.n,18).slice(0,3).forEach((t,i,a)=>lx.fillText(t,512,212+(i-(a.length-1)/2)*66));
  lx.fillStyle='#73565e';lx.font='700 26px sans-serif';
  lx.fillText((CONFIG.brandSub || 'BOTANICS').toUpperCase()+' · '+p.w.split(',')[0].toUpperCase(),512,348);
  ltex.needsUpdate=true;
}

function setJar(p){
  const d=PR[p.s];kk=d.k;
  mG.visible=!d.lip;
  if(d.lip){
    mG.geometry.dispose();mF.geometry.dispose();
    mF.geometry=new THREE.LatheGeometry([[0,1.8],[.58,1.8],[.58,2.95],[.48,3.42],[.22,3.74],[0,3.82]].map(a=>new THREE.Vector2(a[0],a[1])),48);
  } else {
    mG.geometry.dispose();mG.geometry=lathe(d.p);
    mF.geometry.dispose();
    const pts=new THREE.SplineCurve(d.p.map(v=>new THREE.Vector2(v[0],v[1]))).getPoints(90),fy=d.top*d.fill,f=pts.filter(v=>v.y<=fy).map(v=>new THREE.Vector2(v.x*.94,v.y));
    f.push(new THREE.Vector2(0,fy));
    mF.geometry=new THREE.LatheGeometry(f,64);
  }
  mL.geometry.dispose();
  mL.geometry=new THREE.CylinderGeometry(d.lid.r,d.lid.r,d.lid.h,48);
  mL.position.y=d.lip?d.lid.h/2:d.top+d.lid.h/2-.05;
  mU.visible=!!d.bulb;mU.position.y=d.top+.35;

  /* Show internal glass pipette for Serum Dropper (s=1) & Parfum (s=3) */
  pipetteTube.visible=Boolean(d.bulb||d.parfum);
  pipetteTube.position.y=d.bulb?2.15:1.85;

  /* Show sculpted gold collar on Lipstick (s=2), Parfum atomizer (s=3) & Cream Jar (s=0) */
  goldCollar.visible=true;
  goldCollar.geometry.dispose();
  if(d.lip){
    goldCollar.geometry=new THREE.CylinderGeometry(.79,.79,.22,48);
    goldCollar.position.y=1.78;
  } else if(d.parfum){
    goldCollar.geometry=new THREE.CylinderGeometry(.48,.48,.28,48);
    goldCollar.position.y=3.22;
  } else if(d.jar){
    goldCollar.geometry=new THREE.CylinderGeometry(1.71,1.71,.1,48);
    goldCollar.position.y=2.08;
  } else {
    goldCollar.geometry=new THREE.CylinderGeometry(.76,.76,.1,48);
    goldCollar.position.y=3.68;
  }

  const h=d.L[1]-d.L[0],tl=Math.min(5.5,h*2.44/d.lr);
  mB.geometry.dispose();
  mB.geometry=new THREE.CylinderGeometry(d.lr+.03,d.lr+.03,h,48,1,true,-tl/2,tl);
  mB.position.y=(d.L[0]+d.L[1])/2;
  sc.position.y=-d.H/2;
  fillM.color.set(p.c);fillM.emissive.set(p.c);lidM.color.set(p.lid);
  label(p);bubbles(p);pedUpd(d,p);
}

/* ── FLOATING BOTANICAL PETALS & GOLDEN AURA PEDESTAL ── */
const BN=18,bubs=[];
const ps=new THREE.Shape();ps.moveTo(0,0);ps.quadraticCurveTo(.55,.5,0,1.3);ps.quadraticCurveTo(-.55,.5,0,0);
const petalG=new THREE.ShapeGeometry(ps,12);petalG.translate(0,-.65,0);
const bm=new THREE.MeshStandardMaterial({color:0xc4391d,roughness:.42,envMapIntensity:1.3,side:THREE.DoubleSide});
for(let i=0;i<BN;i++){
  const m=new THREE.Mesh(petalG,bm);
  const a=Math.random()*6.283,r=2.5+Math.random()*3.2;
  m.userData={a,r,y:(Math.random()-.5)*5,s:.1+Math.random()*.25,sp:.15+Math.random()*.3,z:-2+Math.random()*3};
  m.scale.setScalar(m.userData.s*1.7);
  scene.add(m);bubs.push(m);
}
function bubbles(p){bm.color.set(p.c)}

const ped=new THREE.Group(),pedM=new THREE.MeshStandardMaterial({color:0xf6e8dc,roughness:.28,metalness:.15,envMapIntensity:1.5});
ped.add(new THREE.Mesh(new THREE.CylinderGeometry(2.38,2.52,.24,72),pedM));
const pr1=new THREE.Mesh(new THREE.TorusGeometry(2.39,.038,16,96),goldTrimM);
pr1.rotation.x=Math.PI/2;pr1.position.y=.12;ped.add(pr1);
const auraHalo=new THREE.Mesh(new THREE.TorusGeometry(2.75,.018,12,96),goldTrimM);
auraHalo.rotation.x=Math.PI/2.2;auraHalo.position.y=.45;ped.add(auraHalo);

const shc=document.createElement('canvas');shc.width=shc.height=128;const shx=shc.getContext('2d'),shg=shx.createRadialGradient(64,64,0,64,64,64);shg.addColorStop(0,'rgba(60,20,30,.55)');shg.addColorStop(1,'rgba(60,20,30,0)');shx.fillStyle=shg;shx.fillRect(0,0,128,128);
const shd=new THREE.Mesh(new THREE.PlaneGeometry(3.6,3.6),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(shc),transparent:true,depthWrite:false}));shd.rotation.x=-Math.PI/2;shd.position.y=.125;ped.add(shd);jar.add(ped);

function pedUpd(d,p){ped.position.y=-d.H/2-.12;pedM.color.set(p.bg);rimL.color.set(p.c);glM.color.set(p.lid)}
const rimL=new THREE.PointLight(0xff9ab0,3,40);rimL.position.set(-5,3,-4);scene.add(rimL);
const rimR=new THREE.PointLight(0xffe0c0,2.2,40);rimR.position.set(5,4,-3);scene.add(rimR);
scene.add(new THREE.HemisphereLight(0xfff5f0,0xc9a0a8,.55));

const gcv=document.createElement('canvas');gcv.width=gcv.height=64;const gx2=gcv.getContext('2d'),gg2=gx2.createRadialGradient(32,32,0,32,32,32);gg2.addColorStop(0,'rgba(255,255,255,1)');gg2.addColorStop(1,'rgba(255,255,255,0)');gx2.fillStyle=gg2;gx2.fillRect(0,0,64,64);
const GN=180,gpos=new Float32Array(GN*3);for(let i=0;i<GN;i++)gpos.set([(Math.random()-.5)*13,(Math.random()-.5)*8,-3+Math.random()*5],i*3);
const gge=new THREE.BufferGeometry();gge.setAttribute('position',new THREE.BufferAttribute(gpos,3));
const glM=new THREE.PointsMaterial({size:.14,map:new THREE.CanvasTexture(gcv),color:0xc9a063,transparent:true,opacity:.65,blending:THREE.AdditiveBlending,depthWrite:false}),glit=new THREE.Points(gge,glM);scene.add(glit);

function fit(){const w=hero.clientWidth,h=hero.clientHeight;R.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();cam.position.z=15*Math.max(1,1.05/cam.aspect*.9)}
fit();addEventListener('resize',fit);

/* ── HERO 8-PRODUCT SLIDER & SCROLL CHOREOGRAPHY ── */
let si=0,pend=null,swapT=1,auto=0,hov=false;
function show(i){
  document.querySelectorAll('#pl li').forEach((l,k)=>l.classList.toggle('on',k===i));
  si=(i+P.length)%P.length;
  const p=P[si];pend=si;swapT=0;
  const inf=$('inf');inf.classList.add('sw');
  setTimeout(()=>{
    $('ik').textContent=p.k;
    $('isz').textContent=p.w;
    $('in').textContent=p.n;
    $('itg').textContent=p.t;
    $('id').textContent=p.d;
    $('int').textContent=p.notes;
    $('ipr').textContent='$'+p.pr;
    $('cn').textContent=String(si+1).padStart(2,'0')+' / '+String(P.length).padStart(2,'0');
    inf.classList.remove('sw');
  },280);
  root.style.setProperty('--tint',p.bg);
  root.style.setProperty('--c',p.c);
  auto=0;
}
function goto(i){
  const r=$('hT'),top=r.getBoundingClientRect().top+scrollY;
  tg=top+clamp(i,0,P.length-1)/(P.length-1)*(r.offsetHeight-innerHeight)+2;
}
$('pl').innerHTML=P.map((p,i)=>'<li data-i="'+i+'">0'+(i+1)+' · '+p.n+'</li>').join('');
document.querySelectorAll('#pl li').forEach(l=>l.onclick=()=>goto(+l.dataset.i));
$('nx').onclick=()=>goto(Math.min(si+1,P.length-1));
$('pv').onclick=()=>goto(Math.max(si-1,0));
hero.addEventListener('mouseenter',()=>hov=true);
hero.addEventListener('mouseleave',()=>hov=false);
setJar(P[0]);
$('id').textContent=P[0].d;
$('ipr').textContent='$'+P[0].pr;
$('isz').textContent=P[0].w;
$('itg').textContent=P[0].t;
$('int').textContent=P[0].notes;
document.querySelector('#pl li').classList.add('on');
$('hT').style.height=(P.length+1)*70+'vh';

/* ── 3D CELLULAR ESSENCE SHADER ORB ── */
const oT=$('oT'),oc=$('ob'),oR=new THREE.WebGLRenderer({canvas:oc,antialias:true,alpha:true});oR.setPixelRatio(Math.min(devicePixelRatio,2));
const oS=new THREE.Scene(),oCam=new THREE.PerspectiveCamera(35,1,.1,50);oCam.position.z=7;
const OV=\`uniform float uT,uA;varying vec3 vN,vV;
float disp(vec3 p){return uA*(.22*sin(p.x*2.2+uT)*sin(p.y*2.0+uT*1.3)+.16*sin(p.z*3.0+uT*.9+p.x)*sin(p.y*2.6-uT)+.07*sin(p.x*5.0+p.y*4.0+uT*2.0));}
vec3 dp(vec3 p){return p*(1.0+disp(p));}
void main(){vec3 p=normalize(position);vec3 t=normalize(cross(p,vec3(0.0,1.0,0.001)));vec3 b=cross(p,t);float e=.02;
vec3 p0=dp(p),p1=dp(normalize(p+t*e)),p2=dp(normalize(p+b*e));vec3 n=normalize(cross(p1-p0,p2-p0));if(dot(n,p)<0.0)n=-n;
vN=normalize(normalMatrix*n);vec4 mv=modelViewMatrix*vec4(p0,1.0);vV=mv.xyz;gl_Position=projectionMatrix*mv;}\`;
const OF=\`uniform vec3 uC1,uC2,uC3;varying vec3 vN,vV;
void main(){vec3 n=normalize(vN);vec3 v=normalize(-vV);float f=pow(1.0-max(dot(n,v),0.0),2.5);
vec3 L=normalize(vec3(.5,.8,.6));float dif=max(dot(n,L),0.0);vec3 H=normalize(L+v);float sp=pow(max(dot(n,H),0.0),70.0);
vec3 base=mix(uC1,uC2,n.y*.5+.5);base=mix(base,uC3,f);vec3 col=base*(.38+.8*dif)+vec3(sp)+f*uC3*.7;
vec3 L2=normalize(vec3(-.7,-.2,.4));col+=pow(max(dot(n,normalize(L2+v)),0.0),30.0)*uC3*.5;gl_FragColor=vec4(col,1.0);}\`;
const oU={uT:{value:0},uA:{value:.8},uC1:{value:new THREE.Color(CONFIG.orbStages[0].colors[0])},uC2:{value:new THREE.Color(CONFIG.orbStages[0].colors[1])},uC3:{value:new THREE.Color(CONFIG.orbStages[0].colors[2])}};
const orb=new THREE.Mesh(new THREE.IcosahedronGeometry(1,64),new THREE.ShaderMaterial({uniforms:oU,vertexShader:OV,fragmentShader:OF}));oS.add(orb);
const OP=900,opp=new Float32Array(OP*3);for(let i=0;i<OP;i++){const a=Math.random()*6.283,r=2.3+Math.random()*1.7,y=(Math.random()-.5)*2.6;opp.set([Math.cos(a)*r,y,Math.sin(a)*r],i*3)}
const opg=new THREE.BufferGeometry();opg.setAttribute('position',new THREE.BufferAttribute(opp,3));
const oPts=new THREE.Points(opg,new THREE.PointsMaterial({size:.045,color:0xffffff,transparent:true,opacity:.7,blending:THREE.AdditiveBlending,depthWrite:false}));oS.add(oPts);

function oFit(){const w=oc.clientWidth,h=oc.clientHeight;if(!w||!h)return;oR.setSize(w,h,false);oCam.aspect=w/h;oCam.updateProjectionMatrix();oCam.position.z=7*Math.max(1,.85/oCam.aspect)}
oFit();addEventListener('resize',oFit);

const OS=CONFIG.orbStages.map(st=>({t:st.title,d:st.description,c:st.colors.map(x=>new THREE.Color(x))}));
let oi=0;
function jumpOrbStage(k){
  const top=oT.getBoundingClientRect().top+scrollY;
  tg=top+(k/2.2)*(oT.offsetHeight-innerHeight)+10;
}
document.querySelectorAll('[data-orb]').forEach(el=>{
  el.onclick=(e)=>{e.stopPropagation();jumpOrbStage(+el.getAttribute('data-orb'))};
});

/* ── 360° POINTER DRAG ON 3D VESSEL ── */
let dYaw=0,dPitch=0,vel=0,drag=false,ax0=0,ay0=0,idle=0;
cv.addEventListener('pointerdown',e=>{drag=true;ax0=e.clientX;ay0=e.clientY;vel=0;idle=0;try{cv.setPointerCapture(e.pointerId)}catch(_){}cv.style.cursor='grabbing';$('dh').style.opacity=0});
cv.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-ax0,dy=e.clientY-ay0;ax0=e.clientX;ay0=e.clientY;dYaw+=dx*.012;dPitch=clamp(dPitch+dy*.006,-.5,.5);vel=dx*.012;idle=0});
const dup=()=>{drag=false;cv.style.cursor='grab'};cv.addEventListener('pointerup',dup);cv.addEventListener('pointercancel',dup);

let tm=0;
function frame(){
  tm+=.016;
  if(Math.abs(tg-cur)>.3){cur+=(tg-cur)*.09;scrollTo(0,cur)}
  sx+=(mx-sx)*.06;sy+=(my-sy)*.06;rx+=(cx-rx)*.2;ry+=(cy-ry)*.2;$('cr').style.transform='translate('+rx+'px,'+ry+'px)';
  const hr=hero.getBoundingClientRect();
  if(hr.bottom>0){
    const tr=$('hT').getBoundingClientRect(),hp=clamp(-tr.top/(tr.height-innerHeight)),pos=hp*(P.length-1),sp=clamp((innerHeight-tr.bottom)/innerHeight);
    $('pb').style.width=(hp*100)+'%';
    const ti=Math.round(pos);
    if(ti!==si&&swapT>.55&&!lock)show(ti);

    let rs=0,sk=1;
    if(swapT<1){swapT=Math.min(1,swapT+.028);rs=ease(swapT)*6.283;sk=Math.abs(Math.cos(swapT*Math.PI));if(swapT>=.5&&pend!==null){setJar(P[pend]);pend=null}}
    const as=innerWidth<800?.78:1;
    jar.scale.setScalar(Math.max(.001,sk*(1-sp*.35)*as*kk));
    jar.position.set(0,.2+sp*3.2+(pos-ti)*-1.1+Math.sin(tm*.8)*.1,0);
    if(!drag){dYaw+=vel;vel*=.94;idle+=.016;if(idle>2){dYaw-=Math.round(dYaw/6.2832)*6.2832;dYaw*=.96;dPitch*=.95}}
    const dg=drag?0:1;
    jar.rotation.y=rs+pos*1.4+Math.sin(tm*.5)*.3*dg+sx*.5*dg+sp*2+dYaw;
    jar.rotation.x=sy*.14*dg+dPitch;
    jar.rotation.z=-sx*.05+Math.sin(tm*.6)*.03;
    auraHalo.rotation.z=tm*.8;
    bubs.forEach(m=>{const u=m.userData,a=u.a+tm*u.sp*.4;m.position.set(Math.cos(a)*u.r-sx*u.z*.3,u.y+Math.sin(tm*u.sp*2+u.a)*.3+sp*2,Math.sin(a)*u.r*.4+u.z);m.rotation.set(tm*u.sp*2+u.a,tm*u.sp*1.3,u.a)});
    glit.rotation.y=tm*.04;glit.position.y=Math.sin(tm*.3)*.2;glM.opacity=.55+.25*Math.sin(tm*2);
    cam.position.x=sx*.3;cam.lookAt(0,0,0);cv.style.opacity=1-sp*.8;
    R.render(scene,cam);
  }
  $('sprog').style.transform='scaleX('+(scrollY/Math.max(1,root.scrollHeight-innerHeight))+')';
  rimL.position.set(-5+sx*8,3-sy*3,-4);

  const orr=oT.getBoundingClientRect();
  if(orr.bottom>0&&orr.top<innerHeight){
    const op=clamp(-orr.top/(orr.height-innerHeight)),opos=op*2,i0=Math.min(1,Math.floor(opos)),ofr=ease(clamp(opos-i0));
    oU.uC1.value.copy(OS[i0].c[0]).lerp(OS[i0+1].c[0],ofr);
    oU.uC2.value.copy(OS[i0].c[1]).lerp(OS[i0+1].c[1],ofr);
    oU.uC3.value.copy(OS[i0].c[2]).lerp(OS[i0+1].c[2],ofr);
    oU.uT.value=tm*.8;
    oU.uA.value=.55+.45*Math.sin(op*Math.PI*3)*Math.sin(op*Math.PI*3)+.25;
    orb.scale.setScalar(1.55+.25*Math.sin(op*6.283));
    orb.rotation.y=op*5+tm*.2+sx*.6;
    orb.rotation.x=sy*.3+op*1.5;
    oPts.rotation.y=-tm*.08+op*2;
    oPts.rotation.x=.3*Math.sin(tm*.2);
    const k=Math.min(2,Math.floor(op*3));
    if(k!==oi){
      oi=k;
      const oc2=$('oc');oc2.classList.add('sw');
      setTimeout(()=>{
        $('os').textContent='THE CELLULAR ESSENCE · 0'+(k+1);
        $('ot').textContent=OS[k].t;
        $('od2').textContent=OS[k].d;
        oc2.classList.remove('sw');
      },260);
      document.querySelectorAll('.od i').forEach((d,j)=>d.classList.toggle('on',j===k));
      document.querySelectorAll('.orb-tab').forEach((b,j)=>b.classList.toggle('on',j===k));
    }
    oFit();oR.render(oS,oCam);
  }
  requestAnimationFrame(frame);
}
frame();

/* ── PRELOADER DISMISSAL FALLBACK ── */
setTimeout(() => {
  if (typeof window.dismissVeloraLoader === 'function') {
    window.dismissVeloraLoader();
  }
  lock = false;
  document.body.classList.add('go');
}, 1800);
})();
<\/script></body></html>`;
  }
  const KP = ({ config: o, selectedSection: r, selectedProductIndex: a, inspectorEnabled: s = true, onSelectElement: c }) => {
    const u = z.useRef(null), d = z.useMemo(() => XP(o), [o]);
    return z.useEffect(() => {
      const f = (v) => {
        const h = v.data;
        h && h.type === "VELORA_SELECT_SECTION" && c && c(h.section, h.productIndex, h.label);
      };
      return window.addEventListener("message", f), () => window.removeEventListener("message", f);
    }, [c]), z.useEffect(() => {
      var f;
      const v = (f = u.current) == null ? void 0 : f.contentWindow;
      v && v.postMessage({ type: "VELORA_SET_INSPECTOR", enabled: s }, "*");
    }, [s, d]), z.useEffect(() => {
      var f;
      const v = (f = u.current) == null ? void 0 : f.contentWindow;
      !v || !r || v.postMessage({ type: "VELORA_FOCUS_SECTION", section: r, productIndex: a }, "*");
    }, [r, a]), n.jsxDEV("iframe", { ref: u, title: `${o.brandName} ${o.brandSub} — 3D Clean Beauty Experience`, srcDoc: d, className: "w-full h-full border-0 bg-[#fbf3ee]", sandbox: "allow-scripts allow-same-origin" }, void 0, false);
  }, ZP = () => ({ brandName: "ZAIKA", brandSub: "PANTRY", logoImageUrl: null, loaderImageUrl: null, storyImageUrl: null, heroTagline: "Taste the old kitchen.", rotatingRingText: "HANDMADE PICKLES · CHUTNEYS · SAUCES · SMALL BATCH · SLOW SUN · ", storyTitle: "Slow sun, strong spice.", storyText: "Zaika Pantry began in a family kitchen in Karachi, where every summer the roof filled with jars of mangoes, chillies and lemons curing in the sun. We still make everything the same way: small batches, cold-pressed mustard oil, hand-ground masalas and absolutely no shortcuts.", storyStat1Num: "38", storyStat1Label: "YEARS OF RECIPES", storyStat2Num: "100%", storyStat2Label: "NATURAL INGREDIENTS", storyStat3Num: "0", storyStat3Label: "PRESERVATIVES ADDED", netWeightLabel: "340 g glass jar", shelfLifeText: "12 months unopened. Refrigerate after opening and keep the oil on top.", products: [{ n: "Mango Pickle", l1: "MANGO", l2: "ACHAR", tag: "CLASSIC · SUN CURED", rs: 890, heat: 4, col: "#e0881c", tint: "#f7d9a2", pc: "#8a3a0a", lid: "#b3202a", desc: "Raw green mangoes cut by hand, rubbed with salt and left under the summer sun, then folded into a masala of fennel, nigella, fenugreek and cold-pressed mustard oil. Tangy first, fiery after, and completely unforgettable.", ing: "Raw mango, mustard oil, fennel, nigella, fenugreek, red chilli, turmeric, salt", nut: "42 kcal · 4 g fat · 2 g carbs", pair: "Paratha, daal chawal, biryani", quote: "The jar every dinner table needs." }, { n: "Green Chilli Pickle", l1: "GREEN", l2: "CHILLI", tag: "FIERY · CRUNCHY", rs: 790, heat: 5, col: "#5d8a2e", tint: "#d3e6b2", pc: "#2f5214", lid: "#2d4a1c", desc: "Whole green chillies slit and stuffed with crushed mustard, cumin and lemon, then cured in oil until they turn glossy and deeply savoury. Brave hearts only.", ing: "Green chilli, mustard seed, cumin, lemon juice, mustard oil, salt", nut: "30 kcal · 3 g fat · 1 g carbs", pair: "Kebabs, nihari, plain rice", quote: "Small chilli. Big personality." }, { n: "Mint Chutney", l1: "MINT", l2: "CHUTNEY", tag: "FRESH · COOLING", rs: 650, heat: 2, col: "#3f9a55", tint: "#c4e8cb", pc: "#1d5a30", lid: "#e8b13a", desc: "Garden mint and coriander ground with green chilli, roasted cumin and a squeeze of lime. Bright, herby and cooling, it lifts anything that comes off the grill.", ing: "Mint, coriander, green chilli, lime, roasted cumin, black salt", nut: "12 kcal · 0.5 g fat · 2 g carbs", pair: "Samosas, tikka, sandwiches", quote: "A cool breeze for hot food." }, { n: "Tamarind Chutney", l1: "TAMARIND", l2: "CHUTNEY", tag: "SWEET · TANGY", rs: 690, heat: 1, col: "#5a2a14", tint: "#ecd0ae", pc: "#4a1d0a", lid: "#5a1020", desc: "Slow-cooked tamarind pulp sweetened with jaggery and finished with dried ginger, black salt and roasted cumin. Dark, glossy and the secret behind every great chaat.", ing: "Tamarind, jaggery, dried ginger, roasted cumin, black salt, chilli", nut: "38 kcal · 0 g fat · 9 g carbs", pair: "Chaat, pakoray, dahi bhallay", quote: "Sweet, sour and a little bit sneaky." }, { n: "Garlic Chilli Sauce", l1: "GARLIC", l2: "CHILLI SAUCE", tag: "BOLD · SMOKY", rs: 750, heat: 4, col: "#c0302a", tint: "#f6bfb5", pc: "#8a1810", lid: "#1d1d1d", desc: "Sun-dried red chillies and roasted garlic blended with vinegar and a hint of smoked paprika into a thick sauce that clings to everything.", ing: "Red chilli, roasted garlic, vinegar, smoked paprika, sugar, salt", nut: "20 kcal · 0 g fat · 4 g carbs", pair: "Rolls, fries, grilled chicken", quote: "One spoon and the whole plate wakes up." }, { n: "Lemon Pickle", l1: "LEMON", l2: "PICKLE", tag: "ZESTY · AGED", rs: 820, heat: 3, col: "#d9b72a", tint: "#f8ecb3", pc: "#8a6f08", lid: "#e8b13a", desc: "Whole lemons aged for sixty days in rock salt and spices until the peel turns soft and the juice turns golden. Salty, sharp and quietly sweet.", ing: "Lemon, rock salt, black pepper, ajwain, red chilli, mustard oil", nut: "25 kcal · 2 g fat · 2 g carbs", pair: "Khichdi, curd rice, dal", quote: "Sixty days of patience in every bite." }], footerGiant: "Zaika", footerCopyright: "© 2026 ZAIKA PANTRY · A DEMO CONCEPT", customHtmlOverride: null });
  function AT(o) {
    if (o.customHtmlOverride) return o.customHtmlOverride;
    const r = JSON.stringify(o.products), a = (o.rotatingRingText || "HANDMADE PICKLES · CHUTNEYS · SAUCES · SMALL BATCH · SLOW SUN · ").trim() + " ", s = o.logoImageUrl ? `<img src="${o.logoImageUrl}" alt="${o.brandName}" style="max-height:36px;max-width:160px;object-fit:contain;vertical-align:middle;display:inline-block" />` : `${o.brandName}<small>${o.brandSub || "PANTRY"}</small>`, c = o.loaderImageUrl ? `<div style="position:absolute;top:20vh;left:50%;transform:translateX(-50%);z-index:3;text-align:center"><img src="${o.loaderImageUrl}" alt="Preloader Logo" style="max-height:72px;max-width:200px;object-fit:contain;filter:drop-shadow(0 6px 18px rgba(0,0,0,0.25))" /></div>` : "", u = o.storyImageUrl ? `<div style="margin-top:24px;border-radius:24px;overflow:hidden;max-height:280px"><img src="${o.storyImageUrl}" alt="Our Story" style="width:100%;height:260px;object-fit:cover;border-radius:24px" /></div>` : "";
    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${o.brandName} ${o.brandSub}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,700;0,900;1,700;1,900&family=Mulish:wght@400;600;800&display=swap" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<script>
if (typeof THREE === 'undefined') {
  document.write('<script src="/three.r128.min.js"><\\/script>');
}
<\/script>
<style>
:root{--mar:#5a1020;--red:#d23a2a;--cream:#f4eadb;--ink:#2a0d12;--mus:#e8b13a;--grn:#3f6b3a;color-scheme:light}
*{box-sizing:border-box;margin:0;padding:0}
html{scrollbar-width:none}html::-webkit-scrollbar{display:none}
body{background:var(--cream);color:var(--ink);font-family:Mulish,system-ui,sans-serif;overflow-x:hidden}
button{font:inherit;color:inherit;background:none;border:0;cursor:pointer}
/* loader */
#ld{position:fixed;inset:0;z-index:200;background:var(--cream)}
#ldp{position:absolute;inset:0;background:var(--red);transition:transform 1s cubic-bezier(.76,0,.24,1)}
#ld.go #ldp{transform:translateY(-100%)}
#ld.go .sh{transition:transform 1s cubic-bezier(.76,0,.24,1);transform:translateY(-120vh)!important}
#ld.done{display:none}
.sh{position:absolute;opacity:.92;animation:fl 6s ease-in-out infinite alternate;z-index:1}
@keyframes fl{to{margin-top:-40px;margin-left:30px;rotate:25deg}}
#cnt{position:absolute;z-index:2;left:50%;top:50%;transform:translate(-50%,-50%);font-family:'Bodoni Moda',serif;font-style:italic;font-weight:900;font-size:min(26vw,220px);color:var(--cream);line-height:1;transition:opacity .4s}
#ld.go #cnt,#ld.go #ldt{opacity:0}
#ldt{position:absolute;z-index:2;bottom:6vh;left:0;right:0;text-align:center;color:var(--cream);letter-spacing:.4em;font-size:12px;font-weight:800;transition:opacity .4s}
/* header */
#hd{position:fixed;top:0;left:0;right:0;z-index:50;display:flex;justify-content:space-between;align-items:center;padding:20px 28px;pointer-events:none}
#hd>*{pointer-events:auto}
#mb{display:flex;flex-direction:column;gap:6px;width:34px;padding:6px 0}
#mb i{display:block;height:2px;background:var(--mar);transition:.3s}
#mb:hover i:nth-child(2){transform:translateX(8px)}
#logo{position:absolute;left:50%;transform:translateX(-50%);text-align:center;font-family:'Bodoni Moda',serif;font-weight:900;font-size:26px;letter-spacing:.08em;color:var(--mar);cursor:pointer}
#logo small{display:block;font:800 8px Mulish;letter-spacing:.5em;margin-top:2px}
#cur{display:flex;border:2px solid var(--mar);border-radius:30px;overflow:hidden;font-weight:800;font-size:12px;color:var(--mar)}
#cur button{padding:7px 14px}#cur .on{background:var(--mar);color:var(--cream)}
/* menu */
#mn{position:fixed;inset:0;z-index:90;background:var(--mar);color:var(--cream);display:flex;flex-direction:column;justify-content:center;padding:0 8vw;clip-path:circle(0 at 40px 40px);transition:clip-path .8s cubic-bezier(.76,0,.24,1);pointer-events:none}
#mn.on{clip-path:circle(150% at 40px 40px);pointer-events:auto}
#mn a{font-family:'Bodoni Moda',serif;font-style:italic;font-weight:900;font-size:min(8vw,52px);line-height:1.2;cursor:pointer;transition:.3s;width:max-content}
#mn a:hover{transform:translateX(24px);color:var(--mus)}
#mx{position:absolute;top:18px;left:28px;font-size:38px;color:var(--cream)}
#wp{position:fixed;inset:0;z-index:150;background:var(--mar);transform:translateY(100%);pointer-events:none}
#pill{position:fixed;z-index:120;left:0;top:0;pointer-events:none;background:var(--mar);color:var(--cream);font-weight:800;font-size:11px;letter-spacing:.2em;padding:14px 20px;border-radius:40px;transform:translate(-50%,-50%) scale(0);transition:transform .25s;white-space:nowrap}
#pill.on{transform:translate(-50%,-50%) scale(1)}
#toast{position:fixed;bottom:30px;left:50%;transform:translate(-50%,120px);background:var(--mar);color:var(--cream);padding:14px 26px;border-radius:40px;z-index:140;transition:.5s;font-weight:700;font-size:14px}
#toast.on{transform:translate(-50%,0)}
canvas#gb,canvas#gl{position:fixed;left:0;top:0;width:100vw;height:100vh;pointer-events:none;will-change:transform}
#gb{z-index:3;filter:blur(9px)}#gl{z-index:4}
/* hero */
#hT{height:700vh;position:relative}
#hero{position:sticky;top:0;height:100vh;overflow:hidden}
#blobw{position:absolute;left:50%;top:50%;width:max(118vh,70vw);height:max(118vh,70vw);transform:translate(-50%,-50%);z-index:1}
#blobw svg{width:100%;height:100%;overflow:visible}
#arcg{transform-origin:500px 500px}
#hero .hc{position:absolute;left:0;right:0;bottom:5vh;z-index:6;text-align:center;color:var(--cream);pointer-events:none}
#hname{font-family:'Bodoni Moda',serif;font-style:italic;font-weight:900;font-size:min(7vw,46px)}
#hsub{font-size:11px;letter-spacing:.35em;font-weight:800;margin-top:6px;opacity:.85}
#scr{position:absolute;left:28px;bottom:5vh;z-index:6;color:var(--cream);writing-mode:vertical-rl;letter-spacing:.4em;font-size:10px;font-weight:800}
#dots{position:absolute;right:28px;top:50%;transform:translateY(-50%);z-index:6;display:flex;flex-direction:column;gap:10px}
#dots i{width:8px;height:8px;border-radius:50%;background:var(--cream);opacity:.35;transition:.3s}#dots i.on{opacity:1;transform:scale(1.5)}
/* sections */
.sec{padding:14vh 6vw;position:relative}
.ey{font-size:11px;font-weight:800;letter-spacing:.4em;color:var(--red);margin-bottom:18px}
.h2{font-family:'Bodoni Moda',serif;font-style:italic;font-weight:900;font-size:min(11vw,110px);line-height:.95;color:var(--mar)}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:6vh}
.card{position:relative;border-radius:36px;background:var(--t);height:min(46vw,520px);overflow:hidden;cursor:pointer;isolation:isolate}
.card.in{transition:transform .5s cubic-bezier(.2,.8,.2,1),box-shadow .5s,opacity 1s}
.card.in:hover{transform:translateY(-8px);box-shadow:0 30px 50px -25px rgba(60,10,20,.5)}
.card svg.sil{position:absolute;left:-10%;top:-10%;width:120%;height:120%;z-index:-1;transition:transform .9s cubic-bezier(.2,.8,.2,1)}
.card:hover svg.sil{transform:rotate(18deg) scale(1.12)}
.card img{position:absolute;left:50%;bottom:17%;height:66%;transform:translateX(-50%);transition:transform .6s cubic-bezier(.2,.8,.2,1);filter:drop-shadow(0 24px 22px rgba(40,10,10,.35))}
.card:hover img{transform:translateX(-50%) translateY(-14px) rotate(-5deg) scale(1.07)}
.card .ct{position:absolute;left:24px;right:24px;bottom:20px;display:flex;justify-content:space-between;align-items:flex-end;color:var(--mar)}
.card b{font-family:'Bodoni Moda',serif;font-style:italic;font-weight:900;font-size:clamp(18px,2.4vw,30px);line-height:1}
.card span{font-weight:800;font-size:13px}
.card .tg{position:absolute;top:20px;left:22px;font-size:10px;letter-spacing:.3em;font-weight:800;color:var(--mar);opacity:.7}
.rv{opacity:0;transform:translateY(50px);transition:1s cubic-bezier(.2,.8,.2,1)}.rv.in{opacity:1;transform:none}
#story{background:var(--mar);color:var(--cream);border-radius:60px 60px 0 0}
#story .h2{color:var(--cream)}
#story p{max-width:620px;font-size:18px;line-height:1.7;margin-top:30px;opacity:.85}
.nums{display:grid;grid-template-columns:repeat(3,1fr);gap:30px;margin-top:8vh;border-top:1px solid rgba(244,234,219,.25);padding-top:36px}
.nums b{display:block;font-family:'Bodoni Moda',serif;font-style:italic;font-size:min(10vw,80px);color:var(--mus);font-weight:900}
.nums span{font-size:11px;letter-spacing:.3em;font-weight:800}
/* product */
#prod{display:none}
#pT{height:450vh;position:relative}
#pstage{position:sticky;top:0;height:100vh;overflow:hidden;background:var(--pt,#eee);cursor:grab}
#ptitle{position:absolute;left:0;right:0;top:50%;transform:translateY(-54%);text-align:center;font-family:'Bodoni Moda',serif;font-style:italic;font-weight:900;line-height:.82;color:var(--pc,var(--mar));z-index:2;font-size:min(21vw,22vh*3.1)}
#ptitle span{display:block}
.sd{position:absolute;z-index:6;top:50%;font-size:11px;font-weight:800;letter-spacing:.3em;color:var(--mar);max-width:180px;line-height:1.8}
.sd.l{left:28px}.sd.r{right:28px;text-align:right}
.sd em{display:block;font-style:normal;color:var(--red);margin-bottom:6px}
#dragh{position:absolute;bottom:4vh;left:0;right:0;text-align:center;z-index:6;font-size:11px;letter-spacing:.4em;font-weight:800;color:var(--mar)}
#pinfo{display:grid;grid-template-columns:1.1fr 1fr;gap:6vw;background:var(--cream)}
#pinfo p{font-size:18px;line-height:1.75;margin:24px 0;max-width:560px}
.facts{display:grid;grid-template-columns:1fr 1fr;gap:14px;align-content:start}
.fact{background:#fff7;border:1.5px solid var(--mar);border-radius:24px;padding:20px;transition:.4s}
.fact:hover{background:var(--mar);color:var(--cream);transform:translateY(-4px)}
.fact small{font-size:10px;letter-spacing:.3em;font-weight:800;color:var(--red);display:block;margin-bottom:8px}
.fact:hover small{color:var(--mus)}.fact div{font-weight:700;line-height:1.5}
.buy{display:flex;gap:24px;align-items:center;margin-top:30px;flex-wrap:wrap}
.btn{background:var(--mar);color:var(--cream);padding:18px 34px;border-radius:50px;font-weight:800;letter-spacing:.2em;font-size:12px;transition:.4s}
.btn:hover{background:var(--red);transform:scale(1.04)}
.price{font-family:'Bodoni Moda',serif;font-weight:900;font-size:40px;color:var(--mar)}
.heat{display:flex;gap:5px;margin-top:8px;align-items:center}.heat i{width:20px;height:6px;border-radius:4px;background:#0002}.heat i.on{background:var(--red)}
.quote{font-family:'Bodoni Moda',serif;font-style:italic;font-size:min(7vw,52px);font-weight:700;color:var(--mar);line-height:1.15;max-width:900px}
/* footer */
#ft{background:var(--mar);color:var(--cream);padding:10vh 6vw 4vh;overflow:hidden}
#ft .cols{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:40px}
#ft h4{font-size:11px;letter-spacing:.35em;color:var(--mus);margin-bottom:16px}
#ft a{display:block;margin:8px 0;opacity:.8;cursor:pointer;transition:.3s;width:max-content}#ft a:hover{opacity:1;transform:translateX(8px)}
#ft form{display:flex;border-bottom:1.5px solid var(--cream);margin-top:14px;max-width:360px}
#ft input{flex:1;background:none;border:0;color:var(--cream);padding:12px 0;font:inherit;outline:none}
#ft input::placeholder{color:#f4eadb99}
.giant{font-family:'Bodoni Moda',serif;font-style:italic;font-weight:900;font-size:27vw;line-height:.8;margin-top:8vh;letter-spacing:-.02em;color:var(--red);white-space:nowrap;transition:transform .8s cubic-bezier(.2,.8,.2,1)}
.giant:hover{transform:translateX(-3vw)}
.copy{display:flex;justify-content:space-between;font-size:11px;letter-spacing:.2em;margin-top:30px;opacity:.7;flex-wrap:wrap;gap:10px}
@media(max-width:800px){
#hd{padding:14px 16px}#logo{font-size:20px}.cards{grid-template-columns:1fr 1fr;gap:12px}.card{height:62vw;border-radius:24px}
#pinfo{grid-template-columns:1fr}.sd{display:none}.nums{grid-template-columns:1fr}#ft .cols{grid-template-columns:1fr}.sec{padding:10vh 5vw}
#scr{display:none}#dots{right:12px}
}
</style>
</head>
<body>
<div id="ld">
  <div id="ldp"></div>
  ${c}
  <div id="cnt">0</div>
  <div id="ldt">${o.brandName ? "OPENING " + o.brandName.toUpperCase() : "OPENING THE PANTRY"}</div>
</div>

<div id="hd">
  <button id="mb" aria-label="Menu"><i></i><i></i><i></i></button>
  <div id="logo" data-edit-section="brand" data-edit-field="brandName">${s}</div>
  <div id="cur"><button class="on" data-c="Rs">Rs</button><button data-c="$">$</button></div>
</div>

<div id="mn"><button id="mx" aria-label="Close">×</button></div>
<div id="wp"></div><div id="pill">DISCOVER THE PRODUCT</div><div id="toast"></div>
<canvas id="gb"></canvas><canvas id="gl"></canvas>

<main id="home">
 <div id="hT" data-edit-section="hero"><div id="hero">
  <div id="blobw"><svg viewBox="0 0 1000 1000"><defs><path id="cp" d="M500,500 m-452,0 a452,452 0 1,1 904,0 a452,452 0 1,1 -904,0"/></defs><path id="blob" fill="#5a1020"/><g id="arcg"><text fill="#f4eadb" font-family="Bodoni Moda,serif" font-style="italic" font-weight="900" font-size="40" opacity=".0"><textPath id="arct" href="#cp" textLength="2840" lengthAdjust="spacing">${a}</textPath></text></g></svg></div>
  <div id="scr">SCROLL</div><div id="dots"></div>
  <div class="hc"><div id="hname"></div><div id="hsub"></div></div>
 </div></div>

 <section class="sec" id="cardsec" data-edit-section="products">
  <div class="ey">THE PANTRY</div>
  <div class="h2 rv" data-edit-section="hero" data-edit-field="heroTagline">${o.heroTagline}</div>
  <div class="cards" id="cards"></div>
 </section>

 <section class="sec" id="story" data-edit-section="story">
  <div class="ey" style="color:var(--mus)">OUR STORY</div>
  <div class="h2 rv" data-edit-field="storyTitle">${o.storyTitle}</div>
  <p class="rv" data-edit-field="storyText">${o.storyText}</p>
  ${u}
  <div class="nums rv">
    <div><b>${o.storyStat1Num}</b><span>${o.storyStat1Label}</span></div>
    <div><b>${o.storyStat2Num}</b><span>${o.storyStat2Label}</span></div>
    <div><b>${o.storyStat3Num}</b><span>${o.storyStat3Label}</span></div>
  </div>
 </section>
</main>

<main id="prod">
 <div id="pT"><div id="pstage" data-edit-section="spotlight"><h1 id="ptitle"><span id="pl1"></span><span id="pl2"></span></h1>
  <div class="sd l"><em>FLAVOUR</em><span id="sdl"></span></div><div class="sd r"><em>NET WEIGHT</em>${o.netWeightLabel}</div><div id="dragh">DRAG THE JAR TO ROTATE</div></div></div>
 <section class="sec" id="pinfo" data-edit-section="spotlight"><div><div class="ey" id="ptag"></div><div class="quote" id="pq"></div><p id="pd"></p>
  <div class="buy"><div><div class="price" id="pp"></div><div class="heat" id="ph"></div></div><button class="btn" id="add">ADD TO BAG</button></div></div>
  <div class="facts">
    <div class="fact"><small>INGREDIENTS</small><div id="fi"></div></div>
    <div class="fact"><small>NUTRITION / 15 g</small><div id="fn"></div></div>
    <div class="fact"><small>PAIRS WITH</small><div id="fp"></div></div>
    <div class="fact"><small>SHELF LIFE</small><div>${o.shelfLifeText}</div></div>
  </div></section>
 <section class="sec"><div class="ey">KEEP EXPLORING</div><div class="h2">The other<br>products.</div><div class="cards" id="oth"></div></section>
</main>

<footer id="ft" data-edit-section="footer">
  <div class="cols">
    <div><h4>JOIN THE KITCHEN</h4><div style="font-family:'Bodoni Moda',serif;font-size:30px;font-style:italic;font-weight:700;max-width:380px">New batches, recipes and first access to seasonal jars.</div><form id="nf"><input type="email" required placeholder="Your email"><button>→</button></form></div>
    <div><h4>PRODUCTS</h4><div id="fl"></div></div>
    <div><h4>${o.brandName}</h4><a data-h>Home</a><a>Our story</a><a>Wholesale</a><a>Contact</a></div>
  </div>
  <div class="giant" data-edit-field="footerGiant">${o.footerGiant || o.brandName}</div>
  <div class="copy">
    <span>${o.footerCopyright || "© 2026 ZAIKA PANTRY · A DEMO CONCEPT"} · Powered by EFerz (EFerz.com)</span>
  </div>
</footer>

<script>
const $=s=>document.querySelector(s),clamp=(v,a,b)=>Math.min(b,Math.max(a,v)),lerp=(a,b,t)=>a+(b-a)*t;
const P=${r};
const N=P.length;let cur='Rs';
const price=p=>cur==='Rs'?'Rs '+p.rs.toLocaleString():'$'+(p.rs/280).toFixed(2);

/* Preloader Counter Execution */
const c=$('#cnt');let n=0;
const iv=setInterval(()=>{
  n+=Math.ceil(Math.random()*6);
  if(n>=100){
    n=100;
    clearInterval(iv);
    if(c)c.textContent=100;
    setTimeout(()=>{
      const ld=$('#ld');
      if(ld){
        ld.classList.add('go');
        setTimeout(()=>ld.classList.add('done'),1300);
      }
    },350);
  }
  if(c)c.textContent=n;
},60);

/* Click-to-edit postMessage integration */
document.addEventListener('click', e => {
  const secEl = e.target.closest('[data-edit-section]');
  const cardEl = e.target.closest('[data-i]');
  const pIdx = cardEl ? Number(cardEl.getAttribute('data-i')) : undefined;
  if (secEl) {
    const sec = secEl.getAttribute('data-edit-section');
    const field = e.target.getAttribute('data-edit-field') || secEl.getAttribute('data-edit-field');
    window.parent && window.parent.postMessage({
      type: 'ZAIKA_SECTION_SELECT',
      section: sec,
      productIndex: pIdx,
      field: field
    }, '*');
  }
});

/* ---------- three ---------- */
const gl=$('#gl'),gb=$('#gb'),gbx=gb.getContext('2d');
const R=new THREE.WebGLRenderer({canvas:gl,alpha:true,antialias:true});
R.setClearColor(0,0);R.outputEncoding=THREE.sRGBEncoding;R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.05;
const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(30,1,.1,100);cam.position.set(0,0,16);
{const es=new THREE.Scene();es.add(new THREE.Mesh(new THREE.BoxGeometry(40,30,40),new THREE.MeshBasicMaterial({color:0x35302c,side:THREE.BackSide})));
 const pn=(w,h,d,x,y,z,c)=>{const m=new THREE.MeshBasicMaterial();m.color.setRGB(c[0],c[1],c[2]);const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);es.add(o)};
 pn(16,1,10,0,13,0,[7,7,7]);pn(1,14,10,-17,0,2,[5,4.6,4]);pn(1,14,10,17,0,2,[3,3.4,4]);pn(14,8,1,0,2,-17,[2.2,2,1.8]);
 const pm=new THREE.PMREMGenerator(R);sc.environment=pm.fromScene(es,.03).texture}
sc.add(new THREE.AmbientLight(0xffffff,.45));const dl=new THREE.DirectionalLight(0xfff2e0,1.1);dl.position.set(3,6,8);sc.add(dl);
const V=a=>new THREE.Vector2(a[0],a[1]);const lathe=a=>new THREE.LatheGeometry(a.map(V),72);
const GP=[[0,0],[.9,0],[1.12,.03],[1.24,.12],[1.29,.3],[1.3,.55],[1.3,2.55],[1.27,2.82],[1.17,3.06],[1.13,3.18],[1.13,3.3],[1.18,3.33],[1.18,3.42]];
const CP=[[0,.1],[1.0,.1],[1.17,.2],[1.24,.35],[1.25,.6],[1.25,2.5],[1.1,2.58],[0,2.62]];
const LP=[[1.34,0],[1.36,.05],[1.36,.58],[1.32,.64],[1.1,.66],[0,.66]];
const tex=c=>{const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;t.anisotropy=8;return t};
function fitText(x,s,w,start,weight){let sz=start;do{x.font=weight+' '+sz+'px "Bodoni Moda",Georgia,serif';sz-=4}while(x.measureText(s).width>w&&sz>24)}
function labelTex(p){const c=document.createElement('canvas');c.width=1010;c.height=500;const x=c.getContext('2d');
 x.fillStyle='#f7eddb';x.fillRect(0,0,1010,500);x.fillStyle=p.pc;x.fillRect(0,0,1010,84);x.fillRect(0,432,1010,68);
 x.textAlign='center';x.textBaseline='middle';x.fillStyle='#f7eddb';x.font='800 28px Mulish,sans-serif';
 if('letterSpacing' in x)x.letterSpacing='10px';x.fillText('${o.brandName.toUpperCase()} ${o.brandSub ? o.brandSub.toUpperCase() : "PANTRY"}',505,44);x.fillText('${o.netWeightLabel} · SMALL BATCH',505,468);
 x.fillStyle=p.col;x.globalAlpha=.22;x.beginPath();x.arc(505,250,170,0,7);x.fill();x.globalAlpha=1;
 if('letterSpacing' in x)x.letterSpacing='0px';
 x.fillStyle=p.pc;fitText(x,p.l1,720,150,'italic 900');x.fillText(p.l1,505,200);
 x.fillStyle=p.col;fitText(x,p.l2,720,100,'italic 900');x.fillText(p.l2,505,310);
 x.fillStyle=p.pc;x.font='800 22px Mulish,sans-serif';if('letterSpacing' in x)x.letterSpacing='8px';x.fillText(p.tag.replace(' · ',' — '),505,390);
 return tex(c)}
function contentTex(p){const c=document.createElement('canvas');c.width=256;c.height=256;const x=c.getContext('2d');x.fillStyle=p.col;x.fillRect(0,0,256,256);
 for(let i=0;i<500;i++){x.fillStyle=Math.random()<.5?'rgba(255,255,255,.14)':'rgba(0,0,0,.18)';const r=1+Math.random()*5;x.beginPath();x.arc(Math.random()*256,Math.random()*256,r,0,7);x.fill()}
 const t=tex(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(4,2);return t}
const jars=[];
function makeJar(p){const g=new THREE.Group(),inn=new THREE.Group();inn.position.y=-1.98;g.add(inn);const mats=[];
 const add=(geo,mat,ro,base)=>{const m=new THREE.Mesh(geo,mat);m.renderOrder=ro;inn.add(m);mats.push({m:mat,b:base});return m};
 add(lathe(CP),new THREE.MeshStandardMaterial({map:contentTex(p),roughness:.35,metalness:0,envMapIntensity:.8}),0,1);
 const lb=add(new THREE.CylinderGeometry(1.318,1.318,2.45,64,1,true,-1.885,3.75),new THREE.MeshStandardMaterial({map:labelTex(p),roughness:.6,side:THREE.DoubleSide,envMapIntensity:.4}),1,1);lb.position.y=1.25;
 add(lathe(LP),new THREE.MeshStandardMaterial({color:p.lid,roughness:.3,metalness:.75,envMapIntensity:1.4}),1,1).position.y=3.3;
 add(lathe(GP),new THREE.MeshPhysicalMaterial({color:0xffffff,roughness:.03,metalness:0,clearcoat:1,clearcoatRoughness:.02,envMapIntensity:1.6}),2,.2);
 sc.add(g);return {g,mats,p}}
function setA(j,a){j.mats.forEach(o=>{o.m.transparent=true;o.m.opacity=o.b*a;o.m.depthWrite=o.b===1&&a>.98});j.g.visible=a>.01}
function resize(){const dpr=Math.min(devicePixelRatio||1,2),w=innerWidth,h=innerHeight;R.setPixelRatio(dpr);R.setSize(w,h,false);gb.width=gl.width;gb.height=gl.height;cam.aspect=w/h;cam.updateProjectionMatrix()}
function pass(arr){jars.forEach((j,i)=>setA(j,arr[i]));R.render(sc,cam)}
/* ---------- shapes / blob ---------- */
(function(){const pts=[];const n=14;for(let i=0;i<n;i++){const a=i/n*6.283;const r=350+16*Math.sin(3*a+1)+12*Math.sin(5*a+2);pts.push([500+r*Math.cos(a),500+r*Math.sin(a)])}
 let d='';for(let i=0;i<n;i++){const a=pts[i],b=pts[(i+1)%n],m=[(a[0]+b[0])/2,(a[1]+b[1])/2];if(!i){const l=pts[n-1];d='M'+(l[0]+a[0])/2+','+(l[1]+a[1])/2}d+=' Q'+a[0]+','+a[1]+' '+m[0]+','+m[1]}
 $('#blob').setAttribute('d',d+'Z');
 const cols=['#f4eadb','#e8b13a','#5a1020','#3f6b3a','#f4eadb','#e8b13a'];
 const ld=$('#ld');for(let i=0;i<9;i++){const s=document.createElement('div');s.className='sh';const w=50+Math.random()*110;
  s.style.cssText='left:'+(Math.random()*92)+'%;top:'+(Math.random()*86)+'%;width:'+w+'px;height:'+w+'px;background:'+cols[i%6]+';animation-delay:'+(-Math.random()*5)+'s;clip-path:polygon('+([...Array(6)].map((_,k)=>{const a=k/6*6.283+Math.random()*.6,r=36+Math.random()*14;return(50+r*Math.cos(a))+'% '+(50+r*Math.sin(a))+'%'}).join(','))+')';
  ld.insertBefore(s,$('#cnt'))}})();
function sil(c){const pts=[...Array(7)].map((_,k)=>{const a=k/7*6.283+Math.random()*.5,r=36+Math.random()*12;return[50+r*Math.cos(a),50+r*Math.sin(a)]});
 return '<svg class="sil" viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="'+pts.map(p=>p.join(',')).join(' ')+'" fill="'+c+'"/></svg>'}
/* ---------- UI ---------- */
const snaps=[];
function cardHTML(i){
  const p=P[i];
  const imgSrc = (p.customImageUrl && p.customImageUrl.trim()) ? p.customImageUrl : (snaps[i] || '');
  return '<div class="card rv" data-i="'+i+'" style="--t:'+p.tint+'">'+sil(p.col+'44')+'<div class="tg">'+p.tag+'</div><img src="'+imgSrc+'" alt="'+p.n+'"><div class="ct"><b>'+p.n+'</b><span data-pr="'+i+'">'+price(p)+'</span></div></div>';
}
let intro=null,spin=null;const ease3=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
let sel=0,page='home',tgt=0,cs=0,own=false,lastW=0,mx=0,hk=-1,u=0,tu=0;const T0=performance.now();
function buildCards(){$('#cards').innerHTML=P.map((_,i)=>cardHTML(i)).join('');$('#fl').innerHTML=P.map((p,i)=>'<a data-i="'+i+'">'+p.n+'</a>').join('');
 $('#mn').insertAdjacentHTML('beforeend','<a data-h>Home</a>'+P.map((p,i)=>'<a data-i="'+i+'">'+p.n+'</a>').join(''));
 $('#dots').innerHTML=P.map(()=>'<i></i>').join('')}
function renderProd(i){const p=P[i];sel=i;const o=P.map((_,k)=>k).filter(k=>k!==i);
 $('#pl1').textContent=p.l1;$('#pl2').textContent=p.l2;const ps=$('#pstage');ps.style.setProperty('--pt',p.tint);ps.style.setProperty('--pc',p.pc);
 $('#sdl').textContent=p.tag;$('#ptag').textContent=p.tag;$('#pq').textContent='“'+p.quote+'”';$('#pd').textContent=p.desc;$('#pp').textContent=price(p);
 $('#ph').innerHTML=[1,2,3,4,5].map(k=>'<i class="'+(k<=p.heat?'on':'')+'"></i>').join('')+'<small style="margin-left:8px;font-size:10px;letter-spacing:.2em;font-weight:800">HEAT</small>';
 $('#fi').textContent=p.ing;$('#fn').textContent=p.nut;$('#fp').textContent=p.pair;
 $('#oth').innerHTML=o.slice(0,3).map(cardHTML).join('');bind()}
function wipe(cb){const w=$('#wp');w.style.transition='transform .7s cubic-bezier(.76,0,.24,1)';w.style.transform='translateY(0)';
 setTimeout(()=>{cb();scrollTo(0,0);tgt=0;cs=0;own=false;w.style.transition='none';
  requestAnimationFrame(()=>requestAnimationFrame(()=>{w.style.transition='transform .7s cubic-bezier(.76,0,.24,1)';w.style.transform='translateY(-100%)';setTimeout(()=>{w.style.transition='none';w.style.transform='translateY(100%)'},750)}))},750)}
function go(i,auto){$('#mn').classList.remove('on');$('#pill').classList.remove('on');wipe(()=>{if(i<0){page='home';$('#home').style.display='';$('#prod').style.display='none'}else{renderProd(i);page='prod';{rot=0;rv=0}$('#home').style.display='none';$('#prod').style.display='block'}
 document.querySelectorAll('.rv').forEach(e=>{e.classList.remove('in');io.observe(e)})})}
function bind(){document.querySelectorAll('[data-i]').forEach(e=>{if(e.dataset.b)return;e.dataset.b=1;e.addEventListener('click',()=>go(+e.dataset.i));
 if(e.classList.contains('card')){e.addEventListener('mouseenter',()=>$('#pill').classList.add('on'));e.addEventListener('mouseleave',()=>$('#pill').classList.remove('on'))}});
 document.querySelectorAll('[data-h]').forEach(e=>{if(e.dataset.b)return;e.dataset.b=1;e.addEventListener('click',()=>go(-1))})}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),2400)}
$('#nf').onsubmit=e=>{e.preventDefault();toast('Thank you, you are on the list.');e.target.reset()};
$('#mb').onclick=()=>$('#mn').classList.add('on');$('#mx').onclick=()=>$('#mn').classList.remove('on');$('#logo').onclick=()=>page==='home'?(tgt=0,own=true):go(-1);
$('#add').onclick=()=>toast(P[sel].n+' added to your bag');
document.querySelectorAll('#cur button').forEach(b=>b.onclick=()=>{cur=b.dataset.c;document.querySelectorAll('#cur button').forEach(x=>x.classList.toggle('on',x===b));document.querySelectorAll('[data-pr]').forEach(e=>e.textContent=price(P[+e.dataset.pr]));$('#pp').textContent=price(P[sel])});
addEventListener('mousemove',e=>{const p=$('#pill');p.style.left=e.clientX+'px';p.style.top=e.clientY+'px';mx=e.clientX;
 if(page==='home'&&scrollY<$('#hT').offsetHeight-innerHeight*.5&&!e.target.closest('.card'))p.classList.toggle('on',Math.abs(e.clientX-innerWidth/2)<innerWidth*.14&&Math.abs(e.clientY-innerHeight*.45)<innerHeight*.3)});
$('#hero').addEventListener('click',e=>{if(Math.abs(e.clientX-innerWidth/2)<innerWidth*.16)go(((Math.round(u)%N)+N)%N)});
/* drag */
let drag=false,lx=0,rot=0,rv=0;
addEventListener('pointerdown',e=>{if(page==='prod'&&!spin&&e.target.closest('#pstage')){drag=true;lx=e.clientX;$('#pstage').style.cursor='grabbing'}});
addEventListener('pointermove',e=>{if(drag){const d=e.clientX-lx;lx=e.clientX;rv=d*.012;rot+=rv}});
addEventListener('pointerup',()=>{drag=false;$('#pstage').style.cursor='grab'});
/* smooth scroll */
addEventListener('wheel',e=>{if(e.ctrlKey)return;e.preventDefault();if(intro||spin)return;lastW=performance.now();if(!own){cs=scrollY;tgt=scrollY;own=true}tgt=clamp(tgt+e.deltaY*(e.deltaMode?32:1),0,document.documentElement.scrollHeight-innerHeight)},{passive:false});
addEventListener('scroll',()=>{if(performance.now()-lastW>250&&!own){tgt=cs=scrollY}});
/* loop */
function frame(now){requestAnimationFrame(frame);
 if(own){cs+=(tgt-cs)*.085;if(Math.abs(tgt-cs)<.4){cs=tgt;own=false}scrollTo(0,cs)}
 const sy=scrollY,vh=innerHeight,t=(now-T0)/1000;
 const pin=page==='home'?$('#hT'):$('#pT'),hr=pin.offsetHeight-vh,off=Math.max(0,sy-hr),pr=clamp(sy/hr,0,1);
 gl.style.transform=gb.style.transform=off>0?'translateY('+(-off)+'px)':'';
 $('#arcg').style.transform='rotate('+(t*6+sy*.05)+'deg)';
 if(off>vh)return;
 const sw=Math.min(4.2,(2*16*Math.tan(THREE.MathUtils.degToRad(15))*cam.aspect)*.3);
 if(page==='home'){const pu=u;
  tu=pr*3*N;u+=(tu-u)*.07;const vel=u-pu;const sway=clamp(vel*14,-.25,.25);
  const A=[],B=[];
  jars.forEach((j,i)=>{let d=((i-u)%N+N)%N;if(d>N/2)d-=N;const ad=Math.abs(d);const b=clamp((ad-.9)/.45,0,1);const s=1.5-.28*Math.min(ad,2);
   j.g.position.set(d*sw*1.1,-.1-Math.min(ad,2)*.15+(1-clamp(ad,0,1))*Math.sin(t*1.2)*.05,-ad*1.5);j.g.scale.setScalar(ad>2.8?.001:s*(innerWidth<800?.78:1));
   j.g.rotation.set(0,d*.55+Math.sin(t*.6)*.12,-d*.05+sway*(1-b));const v=ad<2.8;A.push(v?b:0);B.push(v?1-b:0)});
  pass(A);gbx.clearRect(0,0,gb.width,gb.height);gbx.drawImage(gl,0,0);pass(B);
  const k=((Math.round(u)%N)+N)%N;if(k!==hk){hk=k;$('#hname').textContent=P[k].n;$('#hsub').textContent=P[k].tag;document.querySelectorAll('#dots i').forEach((d,x)=>d.classList.toggle('on',x===k))}
 }else{
  gbx.clearRect(0,0,gb.width,gb.height);const e=1-Math.pow(1-pr,3);
  if(!drag){rv*=.94;rot+=rv}
  jars.forEach((j,i)=>{if(i!==sel){setA(j,0);return}setA(j,1);
   j.g.position.set(0,lerp(-2.6,.2,e),0);j.g.scale.setScalar((innerWidth<800?1.15:1.6)+e*.3);j.g.rotation.set(0,rot+pr*6*Math.PI,0)});
  $('#ptitle').style.transform='translateY(-54%) scale('+(1+pr*.06)+')';
  R.render(sc,cam)}
}
(async function initScene(){
 try{
   try{await Promise.all(['900 40px "Bodoni Moda"','italic 900 40px "Bodoni Moda"','800 20px Mulish'].map(f=>document.fonts.load(f)))}catch(e){}
   resize();addEventListener('resize',resize);
   P.forEach(p=>jars.push(makeJar(p)));
   const cz=cam.position.z;R.setPixelRatio(1);R.setSize(520,640,false);cam.aspect=520/640;cam.position.z=11;cam.updateProjectionMatrix();
   jars.forEach((j,i)=>{jars.forEach((k,x)=>setA(k,x===i?1:0));j.g.position.set(0,0,0);j.g.scale.setScalar(1);j.g.rotation.set(0,-.35,0);R.render(sc,cam);try{snaps[i]=gl.toDataURL('image/png');}catch(e){snaps[i]='';}});
   cam.position.z=cz;resize();
   buildCards();renderProd(0);bind();document.querySelectorAll('.rv').forEach(e=>io.observe(e));
   requestAnimationFrame(frame);
 }catch(err){
   console.warn("Zaika 3D scene fallback:", err);
   buildCards();renderProd(0);bind();
 }
})();
<\/script>
</body>
</html>`;
  }
  const JP = ({ config: o, onSelectElement: r, onInlineTextChange: a }) => {
    const s = z.useRef(null), c = z.useMemo(() => AT(o), [o]);
    return z.useEffect(() => {
      const u = (d) => {
        !d.data || typeof d.data != "object" || (d.data.type === "ZAIKA_ELEMENT_CLICK" ? r == null || r("brand", void 0, d.data.field) : d.data.type === "ZAIKA_TEXT_EDIT" ? a == null || a(d.data.field, d.data.value) : d.data.type === "ZAIKA_SECTION_SELECT" && (r == null || r(d.data.section, d.data.productIndex, d.data.label || d.data.field)));
      };
      return window.addEventListener("message", u), () => window.removeEventListener("message", u);
    }, [r, a]), n.jsxDEV("iframe", { ref: s, title: `${o.brandName} Live 3D Experience`, srcDoc: c, className: "w-full h-full border-0 bg-transparent block", sandbox: "allow-scripts allow-same-origin allow-forms" }, void 0, false);
  }, QP = () => ({ brandName: "MELTO", brandSub: "CREAMERY", logoImageUrl: null, loaderImageUrl: null, storyImageUrl: null, heroTagline: "Scoop into pure joy.", rotatingRingText: "HAND CHURNED ICE CREAM · GELATO · SORBET · SMALL BATCH · ", storyTitle: "Slow churned, never rushed.", storyText: "Melto Creamery began in a tiny kitchen with one hand-cranked churn and a stubborn belief that ice cream should taste like its ingredients. We still make every pint the same way: small batches, fresh cream, real fruit, roasted nuts and absolutely no shortcuts.", storyStat1Num: "38", storyStat1Label: "YEARS OF CHURNING", storyStat2Num: "100%", storyStat2Label: "NATURAL INGREDIENTS", storyStat3Num: "0", storyStat3Label: "ARTIFICIAL COLOURS", netWeightLabel: "473 ml pint tub", storageText: "Keep frozen at −18°C. Let the pint soften for five minutes before scooping.", products: [{ n: "Strawberry Cream", l1: "STRAWBERRY", l2: "CREAM", tag: "FRUITY · CREAMY", rs: 690, heat: 3, col: "#ff8fb1", tint: "#ffd6e3", pc: "#a8184f", top: ["#ffffff", "#ff3d7f", "#ffd1e0", "#a8184f"], desc: "Sun-ripe strawberries folded into slow-churned fresh cream, with real berry ribbons running through every scoop. Sweet, fragrant and unapologetically pink.", ing: "Fresh cream, whole milk, strawberries, cane sugar, vanilla, pinch of sea salt", nut: "138 kcal · 7 g fat · 16 g carbs", pair: "Waffles, brownies, fresh berries", quote: "Summer, scooped." }, { n: "Pistachio", l1: "PISTACHIO", l2: "GELATO", tag: "NUTTY · SILKY", rs: 790, heat: 4, col: "#a9d18e", tint: "#e0f0cf", pc: "#3d6a1f", top: ["#3d6a1f", "#7fb25a", "#e8f5d2", "#ffffff"], desc: "Roasted Sicilian-style pistachios stone-ground into a velvety gelato with a gentle salty finish. Rich, green and wonderfully nutty.", ing: "Whole milk, cream, roasted pistachios, cane sugar, sea salt", nut: "156 kcal · 9 g fat · 15 g carbs", pair: "Espresso, cannoli, dark chocolate", quote: "Green gold in every spoon." }, { n: "Belgian Chocolate", l1: "BELGIAN", l2: "CHOCOLATE", tag: "DEEP · INTENSE", rs: 750, heat: 5, col: "#6b3a26", tint: "#ecd3c2", pc: "#4a2112", top: ["#2a120a", "#ffffff", "#c8864f", "#4a2112"], desc: "Dark Belgian cocoa melted into a thick, fudgy base and finished with shaved chocolate. For people who think chocolate is a personality.", ing: "Cream, milk, Belgian dark chocolate, cocoa, cane sugar, vanilla", nut: "172 kcal · 10 g fat · 17 g carbs", pair: "Hot brownie, banana, salted caramel", quote: "Dark, deep and dangerously good." }, { n: "Mango Sorbet", l1: "MANGO", l2: "SORBET", tag: "TROPICAL · DAIRY FREE", rs: 650, heat: 2, col: "#ffb627", tint: "#ffe6a8", pc: "#9a5a00", top: ["#ff8a00", "#fff1b8", "#ffffff", "#9a5a00"], desc: "Alphonso mangoes blended with a squeeze of lime and nothing else. Dairy free, bright and as juicy as biting into the fruit itself.", ing: "Alphonso mango, cane sugar, lime juice, water", nut: "96 kcal · 0 g fat · 23 g carbs", pair: "Coconut, chilli lime, sparkling water", quote: "Sunshine without the sunburn." }, { n: "Vanilla Bean", l1: "VANILLA", l2: "BEAN", tag: "CLASSIC · PURE", rs: 620, heat: 3, col: "#f6e3b4", tint: "#fbf0d2", pc: "#8a6a1f", top: ["#3b2a14", "#ffffff", "#e6c37a", "#8a6a1f"], desc: "Madagascan vanilla beans steeped overnight in cream, then slow-churned until perfectly smooth. Simple, honest and impossible to get bored of.", ing: "Cream, whole milk, Madagascan vanilla beans, cane sugar, egg yolk", nut: "142 kcal · 8 g fat · 15 g carbs", pair: "Apple pie, affogato, fresh fruit", quote: "Plain? Never. Pure." }, { n: "Blueberry Swirl", l1: "BLUEBERRY", l2: "SWIRL", tag: "TANGY · RIPPLED", rs: 720, heat: 3, col: "#8c7ae6", tint: "#dcd6fa", pc: "#3d2f9a", top: ["#3d2f9a", "#ffffff", "#b9aef5", "#5646d1"], desc: "Tangy blueberry compote swirled through a cheesecake-style cream base, with a hint of lemon zest. Purple, playful and ridiculously moreish.", ing: "Cream, milk, blueberries, cream cheese, cane sugar, lemon zest", nut: "148 kcal · 8 g fat · 17 g carbs", pair: "Pancakes, shortbread, lemon tart", quote: "A little tart, a lot of heart." }], footerGiant: "Melto", footerCopyright: "© 2026 MELTO CREAMERY · A DEMO CONCEPT", customHtmlOverride: null });
  function MT(o) {
    if (o.customHtmlOverride) return o.customHtmlOverride;
    const r = JSON.stringify(o.products), a = (o.rotatingRingText || "HAND CHURNED ICE CREAM · GELATO · SORBET · SMALL BATCH · ").trim() + " ", s = o.logoImageUrl ? `<img src="${o.logoImageUrl}" alt="${o.brandName}" style="max-height:36px;max-width:160px;object-fit:contain;vertical-align:middle;display:inline-block" />` : `${o.brandName}<small>${o.brandSub || "CREAMERY"}</small>`, c = o.loaderImageUrl ? `<div style="position:absolute;top:20vh;left:50%;transform:translateX(-50%);z-index:3;text-align:center"><img src="${o.loaderImageUrl}" alt="Preloader Logo" style="max-height:72px;max-width:200px;object-fit:contain;filter:drop-shadow(0 6px 18px rgba(0,0,0,0.25))" /></div>` : "", u = o.storyImageUrl ? `<div style="margin-top:24px;border-radius:24px;overflow:hidden;max-height:280px"><img src="${o.storyImageUrl}" alt="Our Story" style="width:100%;height:260px;object-fit:cover;border-radius:24px" /></div>` : "";
    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${o.brandName} ${o.brandSub}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,700;0,900;1,700;1,900&family=Mulish:wght@400;600;800&display=swap" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<script>
if (typeof THREE === 'undefined') {
  document.write('<script src="/three.r128.min.js"><\\/script>');
}
<\/script>
<style>
:root{--mar:#4b1d3f;--red:#ff5c8a;--cream:#fff3ea;--ink:#2a1030;--mus:#ffc857;--grn:#6fcf97;color-scheme:light}
*{box-sizing:border-box;margin:0;padding:0}
html{scrollbar-width:none}html::-webkit-scrollbar{display:none}
body{background:var(--cream);color:var(--ink);font-family:Mulish,system-ui,sans-serif;overflow-x:hidden}
button{font:inherit;color:inherit;background:none;border:0;cursor:pointer}
/* loader */
#ld{position:fixed;inset:0;z-index:200;background:var(--cream)}
#ldp{position:absolute;inset:0;background:var(--red);transition:transform 1s cubic-bezier(.76,0,.24,1)}
#ld.go #ldp{transform:translateY(-100%)}
#ld.go .sh{transition:transform 1s cubic-bezier(.76,0,.24,1);transform:translateY(-120vh)!important}
#ld.done{display:none}
.sh{position:absolute;opacity:.92;animation:fl 6s ease-in-out infinite alternate;z-index:1}
@keyframes fl{to{margin-top:-40px;margin-left:30px;rotate:25deg}}
#cnt{position:absolute;z-index:2;left:50%;top:50%;transform:translate(-50%,-50%);font-family:'Bodoni Moda',serif;font-style:italic;font-weight:900;font-size:min(26vw,220px);color:var(--cream);line-height:1;transition:opacity .4s}
#ld.go #cnt,#ld.go #ldt{opacity:0}
#ldt{position:absolute;z-index:2;bottom:6vh;left:0;right:0;text-align:center;color:var(--cream);letter-spacing:.4em;font-size:12px;font-weight:800;transition:opacity .4s}
/* header */
#hd{position:fixed;top:0;left:0;right:0;z-index:50;display:flex;justify-content:space-between;align-items:center;padding:20px 28px;pointer-events:none}
#hd>*{pointer-events:auto}
#mb{display:flex;flex-direction:column;gap:6px;width:34px;padding:6px 0}
#mb i{display:block;height:2px;background:var(--mar);transition:.3s}
#mb:hover i:nth-child(2){transform:translateX(8px)}
#logo{position:absolute;left:50%;transform:translateX(-50%);text-align:center;font-family:'Bodoni Moda',serif;font-weight:900;font-size:26px;letter-spacing:.08em;color:var(--mar);cursor:pointer}
#logo small{display:block;font:800 8px Mulish;letter-spacing:.5em;margin-top:2px}
#cur{display:flex;border:2px solid var(--mar);border-radius:30px;overflow:hidden;font-weight:800;font-size:12px;color:var(--mar)}
#cur button{padding:7px 14px}#cur .on{background:var(--mar);color:var(--cream)}
/* menu */
#mn{position:fixed;inset:0;z-index:90;background:var(--mar);color:var(--cream);display:flex;flex-direction:column;justify-content:center;padding:0 8vw;clip-path:circle(0 at 40px 40px);transition:clip-path .8s cubic-bezier(.76,0,.24,1);pointer-events:none}
#mn.on{clip-path:circle(150% at 40px 40px);pointer-events:auto}
#mn a{font-family:'Bodoni Moda',serif;font-style:italic;font-weight:900;font-size:min(8vw,52px);line-height:1.2;cursor:pointer;transition:.3s;width:max-content}
#mn a:hover{transform:translateX(24px);color:var(--mus)}
#mx{position:absolute;top:18px;left:28px;font-size:38px;color:var(--cream)}
#wp{position:fixed;inset:0;z-index:150;background:var(--mar);transform:translateY(100%);pointer-events:none}
#pill{position:fixed;z-index:120;left:0;top:0;pointer-events:none;background:var(--mar);color:var(--cream);font-weight:800;font-size:11px;letter-spacing:.2em;padding:14px 20px;border-radius:40px;transform:translate(-50%,-50%) scale(0);transition:transform .25s;white-space:nowrap}
#pill.on{transform:translate(-50%,-50%) scale(1)}
#toast{position:fixed;bottom:30px;left:50%;transform:translate(-50%,120px);background:var(--mar);color:var(--cream);padding:14px 26px;border-radius:40px;z-index:140;transition:.5s;font-weight:700;font-size:14px}
#toast.on{transform:translate(-50%,0)}
canvas#gb,canvas#gl{position:fixed;left:0;top:0;width:100vw;height:100vh;pointer-events:none;will-change:transform}
#gb{z-index:3;filter:blur(9px)}#gl{z-index:4}
/* hero */
#hT{height:700vh;position:relative}
#hero{position:sticky;top:0;height:100vh;overflow:hidden}
#blobw{position:absolute;left:50%;top:50%;width:max(118vh,70vw);height:max(118vh,70vw);transform:translate(-50%,-50%);z-index:1}
#blobw svg{width:100%;height:100%;overflow:visible}
#arcg{transform-origin:500px 500px}
#hero .hc{position:absolute;left:0;right:0;bottom:5vh;z-index:6;text-align:center;color:var(--cream);pointer-events:none}
#hname{font-family:'Bodoni Moda',serif;font-style:italic;font-weight:900;font-size:min(7vw,46px)}
#hsub{font-size:11px;letter-spacing:.35em;font-weight:800;margin-top:6px;opacity:.85}
#scr{position:absolute;left:28px;bottom:5vh;z-index:6;color:var(--cream);writing-mode:vertical-rl;letter-spacing:.4em;font-size:10px;font-weight:800}
#dots{position:absolute;right:28px;top:50%;transform:translateY(-50%);z-index:6;display:flex;flex-direction:column;gap:10px}
#dots i{width:8px;height:8px;border-radius:50%;background:var(--cream);opacity:.35;transition:.3s}#dots i.on{opacity:1;transform:scale(1.5)}
/* sections */
.sec{padding:14vh 6vw;position:relative}
.ey{font-size:11px;font-weight:800;letter-spacing:.4em;color:var(--red);margin-bottom:18px}
.h2{font-family:'Bodoni Moda',serif;font-style:italic;font-weight:900;font-size:min(11vw,110px);line-height:.95;color:var(--mar)}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:6vh}
.card{position:relative;border-radius:36px;background:var(--t);height:min(46vw,520px);overflow:hidden;cursor:pointer;isolation:isolate}
.card.in{transition:transform .5s cubic-bezier(.2,.8,.2,1),box-shadow .5s,opacity 1s}
.card.in:hover{transform:translateY(-8px);box-shadow:0 30px 50px -25px rgba(60,10,20,.5)}
.card svg.sil{position:absolute;left:-10%;top:-10%;width:120%;height:120%;z-index:-1;transition:transform .9s cubic-bezier(.2,.8,.2,1)}
.card:hover svg.sil{transform:rotate(18deg) scale(1.12)}
.card img{position:absolute;left:50%;bottom:17%;height:66%;transform:translateX(-50%);transition:transform .6s cubic-bezier(.2,.8,.2,1);filter:drop-shadow(0 24px 22px rgba(40,10,10,.35))}
.card:hover img{transform:translateX(-50%) translateY(-14px) rotate(-5deg) scale(1.07)}
.card .ct{position:absolute;left:24px;right:24px;bottom:20px;display:flex;justify-content:space-between;align-items:flex-end;color:var(--mar)}
.card b{font-family:'Bodoni Moda',serif;font-style:italic;font-weight:900;font-size:clamp(18px,2.4vw,30px);line-height:1}
.card span{font-weight:800;font-size:13px}
.card .tg{position:absolute;top:20px;left:22px;font-size:10px;letter-spacing:.3em;font-weight:800;color:var(--mar);opacity:.7}
.rv{opacity:0;transform:translateY(50px);transition:1s cubic-bezier(.2,.8,.2,1)}.rv.in{opacity:1;transform:none}
#story{background:var(--mar);color:var(--cream);border-radius:60px 60px 0 0}
#story .h2{color:var(--cream)}
#story p{max-width:620px;font-size:18px;line-height:1.7;margin-top:30px;opacity:.85}
.nums{display:grid;grid-template-columns:repeat(3,1fr);gap:30px;margin-top:8vh;border-top:1px solid rgba(244,234,219,.25);padding-top:36px}
.nums b{display:block;font-family:'Bodoni Moda',serif;font-style:italic;font-size:min(10vw,80px);color:var(--mus);font-weight:900}
.nums span{font-size:11px;letter-spacing:.3em;font-weight:800}
/* product */
#prod{display:none}
#pT{height:450vh;position:relative}
#pstage{position:sticky;top:0;height:100vh;overflow:hidden;background:var(--pt,#eee);cursor:grab}
#ptitle{position:absolute;left:0;right:0;top:50%;transform:translateY(-54%);text-align:center;font-family:'Bodoni Moda',serif;font-style:italic;font-weight:900;line-height:.82;color:var(--pc,var(--mar));z-index:2;font-size:min(21vw,22vh*3.1)}
#ptitle span{display:block}
.sd{position:absolute;z-index:6;top:50%;font-size:11px;font-weight:800;letter-spacing:.3em;color:var(--mar);max-width:180px;line-height:1.8}
.sd.l{left:28px}.sd.r{right:28px;text-align:right}
.sd em{display:block;font-style:normal;color:var(--red);margin-bottom:6px}
#dragh{position:absolute;bottom:4vh;left:0;right:0;text-align:center;z-index:6;font-size:11px;letter-spacing:.4em;font-weight:800;color:var(--mar)}
#pinfo{display:grid;grid-template-columns:1.1fr 1fr;gap:6vw;background:var(--cream)}
#pinfo p{font-size:18px;line-height:1.75;margin:24px 0;max-width:560px}
.facts{display:grid;grid-template-columns:1fr 1fr;gap:14px;align-content:start}
.fact{background:#fff7;border:1.5px solid var(--mar);border-radius:24px;padding:20px;transition:.4s}
.fact:hover{background:var(--mar);color:var(--cream);transform:translateY(-4px)}
.fact small{font-size:10px;letter-spacing:.3em;font-weight:800;color:var(--red);display:block;margin-bottom:8px}
.fact:hover small{color:var(--mus)}.fact div{font-weight:700;line-height:1.5}
.buy{display:flex;gap:24px;align-items:center;margin-top:30px;flex-wrap:wrap}
.btn{background:var(--mar);color:var(--cream);padding:18px 34px;border-radius:50px;font-weight:800;letter-spacing:.2em;font-size:12px;transition:.4s}
.btn:hover{background:var(--red);transform:scale(1.04)}
.price{font-family:'Bodoni Moda',serif;font-weight:900;font-size:40px;color:var(--mar)}
.heat{display:flex;gap:5px;margin-top:8px;align-items:center}.heat i{width:20px;height:6px;border-radius:4px;background:#0002}.heat i.on{background:var(--red)}
.quote{font-family:'Bodoni Moda',serif;font-style:italic;font-size:min(7vw,52px);font-weight:700;color:var(--mar);line-height:1.15;max-width:900px}
/* footer */
#ft{background:var(--mar);color:var(--cream);padding:10vh 6vw 4vh;overflow:hidden}
#ft .cols{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:40px}
#ft h4{font-size:11px;letter-spacing:.35em;color:var(--mus);margin-bottom:16px}
#ft a{display:block;margin:8px 0;opacity:.8;cursor:pointer;transition:.3s;width:max-content}#ft a:hover{opacity:1;transform:translateX(8px)}
#ft form{display:flex;border-bottom:1.5px solid var(--cream);margin-top:14px;max-width:360px}
#ft input{flex:1;background:none;border:0;color:var(--cream);padding:12px 0;font:inherit;outline:none}
#ft input::placeholder{color:#fff3ea99}
.giant{font-family:'Bodoni Moda',serif;font-style:italic;font-weight:900;font-size:27vw;line-height:.8;margin-top:8vh;letter-spacing:-.02em;color:var(--red);white-space:nowrap;transition:transform .8s cubic-bezier(.2,.8,.2,1)}
.giant:hover{transform:translateX(-3vw)}
.copy{display:flex;justify-content:space-between;font-size:11px;letter-spacing:.2em;margin-top:30px;opacity:.7;flex-wrap:wrap;gap:10px}
@media(max-width:800px){
#hd{padding:14px 16px}#logo{font-size:20px}.cards{grid-template-columns:1fr 1fr;gap:12px}.card{height:62vw;border-radius:24px}
#pinfo{grid-template-columns:1fr}.sd{display:none}.nums{grid-template-columns:1fr}#ft .cols{grid-template-columns:1fr}.sec{padding:10vh 5vw}
#scr{display:none}#dots{right:12px}
}
</style>
</head>
<body>
<div id="ld">
  <div id="ldp"></div>
  ${c}
  <div id="cnt">0</div>
  <div id="ldt">${o.brandName ? "OPENING " + o.brandName.toUpperCase() : "OPENING THE FLAVOURS"}</div>
</div>

<div id="hd">
  <button id="mb" aria-label="Menu"><i></i><i></i><i></i></button>
  <div id="logo" data-edit-section="brand" data-edit-field="brandName">${s}</div>
  <div id="cur"><button class="on" data-c="Rs">Rs</button><button data-c="$">$</button></div>
</div>

<div id="mn"><button id="mx" aria-label="Close">×</button></div>
<div id="wp"></div><div id="pill">DISCOVER THE PRODUCT</div><div id="toast"></div>
<canvas id="gb"></canvas><canvas id="gl"></canvas>

<main id="home">
 <div id="hT" data-edit-section="hero"><div id="hero">
  <div id="blobw"><svg viewBox="0 0 1000 1000"><defs><path id="cp" d="M500,500 m-452,0 a452,452 0 1,1 904,0 a452,452 0 1,1 -904,0"/></defs><path id="blob" fill="#4b1d3f"/><g id="arcg"><text fill="#fff3ea" font-family="Bodoni Moda,serif" font-style="italic" font-weight="900" font-size="40" opacity=".0"><textPath id="arct" href="#cp" textLength="2840" lengthAdjust="spacing">${a}</textPath></text></g></svg></div>
  <div id="scr">SCROLL</div><div id="dots"></div>
  <div class="hc"><div id="hname"></div><div id="hsub"></div></div>
 </div></div>

 <section class="sec" id="cardsec" data-edit-section="products">
  <div class="ey">THE FLAVOURS</div>
  <div class="h2 rv" data-edit-section="hero" data-edit-field="heroTagline">${o.heroTagline}</div>
  <div class="cards" id="cards"></div>
 </section>

 <section class="sec" id="story" data-edit-section="story">
  <div class="ey" style="color:var(--mus)">OUR STORY</div>
  <div class="h2 rv" data-edit-field="storyTitle">${o.storyTitle}</div>
  <p class="rv" data-edit-field="storyText">${o.storyText}</p>
  ${u}
  <div class="nums rv">
    <div><b>${o.storyStat1Num}</b><span>${o.storyStat1Label}</span></div>
    <div><b>${o.storyStat2Num}</b><span>${o.storyStat2Label}</span></div>
    <div><b>${o.storyStat3Num}</b><span>${o.storyStat3Label}</span></div>
  </div>
 </section>
</main>

<main id="prod">
 <div id="pT"><div id="pstage" data-edit-section="spotlight"><h1 id="ptitle"><span id="pl1"></span><span id="pl2"></span></h1>
  <div class="sd l"><em>FLAVOUR</em><span id="sdl"></span></div><div class="sd r"><em>NET WEIGHT</em>${o.netWeightLabel}</div><div id="dragh">DRAG THE PINT TO ROTATE</div></div></div>
 <section class="sec" id="pinfo" data-edit-section="spotlight"><div><div class="ey" id="ptag"></div><div class="quote" id="pq"></div><p id="pd"></p>
  <div class="buy"><div><div class="price" id="pp"></div><div class="heat" id="ph"></div></div><button class="btn" id="add">ADD TO BAG</button></div></div>
  <div class="facts">
    <div class="fact"><small>INGREDIENTS</small><div id="fi"></div></div>
    <div class="fact"><small>NUTRITION / SCOOP</small><div id="fn"></div></div>
    <div class="fact"><small>PAIRS WITH</small><div id="fp"></div></div>
    <div class="fact"><small>STORAGE</small><div>${o.storageText}</div></div>
  </div></section>
 <section class="sec"><div class="ey">KEEP EXPLORING</div><div class="h2">The other<br>flavours.</div><div class="cards" id="oth"></div></section>
</main>

<footer id="ft" data-edit-section="footer">
  <div class="cols">
    <div><h4>JOIN THE KITCHEN</h4><div style="font-family:'Bodoni Moda',serif;font-size:30px;font-style:italic;font-weight:700;max-width:380px">New flavours, recipes and first access to seasonal pints.</div><form id="nf"><input type="email" required placeholder="Your email"><button>→</button></form></div>
    <div><h4>PRODUCTS</h4><div id="fl"></div></div>
    <div><h4>${o.brandName}</h4><a data-h>Home</a><a>Our story</a><a>Wholesale</a><a>Contact</a></div>
  </div>
  <div class="giant" data-edit-field="footerGiant">${o.footerGiant || o.brandName}</div>
  <div class="copy">
    <span>${o.footerCopyright || "© 2026 MELTO CREAMERY · A DEMO CONCEPT"} · Powered by EFerz (EFerz.com)</span>
  </div>
</footer>

<script>
const $=s=>document.querySelector(s),clamp=(v,a,b)=>Math.min(b,Math.max(a,v)),lerp=(a,b,t)=>a+(b-a)*t;
const P=${r};
const N=P.length;let cur='Rs';
const price=p=>cur==='Rs'?'Rs '+p.rs.toLocaleString():'$'+(p.rs/280).toFixed(2);

/* Preloader Counter Execution */
const c=$('#cnt');let n=0;
const iv=setInterval(()=>{
  n+=Math.ceil(Math.random()*6);
  if(n>=100){
    n=100;
    clearInterval(iv);
    if(c)c.textContent=100;
    setTimeout(()=>{
      const ld=$('#ld');
      if(ld){
        ld.classList.add('go');
        setTimeout(()=>ld.classList.add('done'),1300);
      }
    },350);
  }
  if(c)c.textContent=n;
},60);

/* Click-to-edit postMessage integration */
document.addEventListener('click', e => {
  const secEl = e.target.closest('[data-edit-section]');
  const cardEl = e.target.closest('[data-i]');
  const pIdx = cardEl ? Number(cardEl.getAttribute('data-i')) : undefined;
  if (secEl) {
    const sec = secEl.getAttribute('data-edit-section');
    const field = e.target.getAttribute('data-edit-field') || secEl.getAttribute('data-edit-field');
    window.parent && window.parent.postMessage({
      type: 'MELTO_SECTION_SELECT',
      section: sec,
      productIndex: pIdx,
      field: field
    }, '*');
  }
});

/* ---------- three ---------- */
const gl=$('#gl'),gb=$('#gb'),gbx=gb.getContext('2d');
const R=new THREE.WebGLRenderer({canvas:gl,alpha:true,antialias:true});
R.setClearColor(0,0);R.outputEncoding=THREE.sRGBEncoding;R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.05;
const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(30,1,.1,100);cam.position.set(0,0,16);
{const es=new THREE.Scene();es.add(new THREE.Mesh(new THREE.BoxGeometry(40,30,40),new THREE.MeshBasicMaterial({color:0x35302c,side:THREE.BackSide})));
 const pn=(w,h,d,x,y,z,c)=>{const m=new THREE.MeshBasicMaterial();m.color.setRGB(c[0],c[1],c[2]);const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);es.add(o)};
 pn(16,1,10,0,13,0,[7,7,7]);pn(1,14,10,-17,0,2,[5,4.6,4]);pn(1,14,10,17,0,2,[3,3.4,4]);pn(14,8,1,0,2,-17,[2.2,2,1.8]);
 const pm=new THREE.PMREMGenerator(R);sc.environment=pm.fromScene(es,.03).texture}
sc.add(new THREE.AmbientLight(0xffffff,.45));const dl=new THREE.DirectionalLight(0xfff2e0,1.1);dl.position.set(3,6,8);sc.add(dl);
const V=a=>new THREE.Vector2(a[0],a[1]);const lathe=a=>new THREE.LatheGeometry(a.map(V),72);
const TP=[[0,0],[.9,0],[.95,.04],[1.29,2.46],[1.34,2.52],[1.34,2.6],[1.27,2.6],[1.25,2.5]];
const DP=[[0,2.3],[1.24,2.3],[1.3,2.55],[1.22,2.85],[1.02,3.15],[.68,3.4],[.32,3.56],[0,3.62]];
const tex=c=>{const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;t.anisotropy=8;return t};
function fitText(x,s,w,start,weight){let sz=start;do{x.font=weight+' '+sz+'px "Bodoni Moda",Georgia,serif';sz-=4}while(x.measureText(s).width>w&&sz>24)}
function labelTex(p){const c=document.createElement('canvas');c.width=1010;c.height=500;const x=c.getContext('2d');
 x.fillStyle='#fff8f0';x.fillRect(0,0,1010,500);x.fillStyle=p.pc;x.fillRect(0,0,1010,84);x.fillRect(0,432,1010,68);
 x.textAlign='center';x.textBaseline='middle';x.fillStyle='#fff8f0';x.font='800 28px Mulish,sans-serif';
 if('letterSpacing' in x)x.letterSpacing='10px';x.fillText('${o.brandName.toUpperCase()} ${o.brandSub ? o.brandSub.toUpperCase() : "CREAMERY"}',505,44);x.fillText('${o.netWeightLabel} · HAND CHURNED',505,468);
 x.fillStyle=p.col;x.globalAlpha=.22;x.beginPath();x.arc(505,250,170,0,7);x.fill();x.globalAlpha=1;
 if('letterSpacing' in x)x.letterSpacing='0px';
 x.fillStyle=p.pc;fitText(x,p.l1,720,150,'italic 900');x.fillText(p.l1,505,200);
 x.fillStyle=p.col;fitText(x,p.l2,720,100,'italic 900');x.fillText(p.l2,505,310);
 x.fillStyle=p.pc;x.font='800 22px Mulish,sans-serif';if('letterSpacing' in x)x.letterSpacing='8px';x.fillText(p.tag.replace(' · ',' — '),505,390);
 return tex(c)}
function iceTex(p){const c=document.createElement('canvas');c.width=512;c.height=256;const x=c.getContext('2d');x.fillStyle=p.col;x.fillRect(0,0,512,256);
 for(let i=0;i<9;i++){x.strokeStyle=i%2?'rgba(255,255,255,.28)':'rgba(0,0,0,.12)';x.lineWidth=8+Math.random()*12;x.beginPath();const y0=Math.random()*256;x.moveTo(0,y0);for(let k=1;k<=8;k++)x.lineTo(k*64,y0+Math.sin(k*1.3+i)*28);x.stroke()}
 for(let i=0;i<260;i++){x.fillStyle=Math.random()<.5?'rgba(255,255,255,.18)':'rgba(0,0,0,.1)';x.beginPath();x.arc(Math.random()*512,Math.random()*256,1+Math.random()*3,0,7);x.fill()}
 const t=tex(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;return t}
const jars=[];
function makeJar(p){const g=new THREE.Group(),inn=new THREE.Group();inn.position.y=-1.8;g.add(inn);const mats=[];
 const add=(geo,mat,ro)=>{const m=new THREE.Mesh(geo,mat);m.renderOrder=ro;inn.add(m);mats.push({m:mat,b:1});return m};
 add(lathe(TP),new THREE.MeshStandardMaterial({color:p.pc,roughness:.55,envMapIntensity:.6,side:THREE.DoubleSide}),0);
 add(new THREE.CylinderGeometry(1.277,.997,2.0,64,1,true,-1.885,3.75),new THREE.MeshStandardMaterial({map:labelTex(p),roughness:.6,side:THREE.DoubleSide,envMapIntensity:.4}),1).position.y=1.27;
 add(lathe(DP),new THREE.MeshStandardMaterial({map:iceTex(p),roughness:.5,envMapIntensity:.9}),0);
 const n=80,im=new THREE.InstancedMesh(new THREE.BoxGeometry(.05,.05,.22),new THREE.MeshStandardMaterial({roughness:.4}),n),o=new THREE.Object3D(),cc=new THREE.Color();
 for(let i=0;i<n;i++){const k=1+Math.floor(Math.random()*6),f=Math.random(),A=DP[k],B=DP[k+1],r=lerp(A[0],B[0],f)*.97,y=lerp(A[1],B[1],f),ph=Math.random()*6.283;
  o.position.set(r*Math.sin(ph),y+.03,r*Math.cos(ph));o.rotation.set(Math.random()*3,Math.random()*3,Math.random()*3);o.updateMatrix();im.setMatrixAt(i,o.matrix);im.setColorAt(i,cc.set(p.top[i%p.top.length]))}
 im.renderOrder=2;inn.add(im);mats.push({m:im.material,b:1});
 sc.add(g);return {g,mats,p}}
function setA(j,a){j.mats.forEach(o=>{o.m.transparent=true;o.m.opacity=o.b*a;o.m.depthWrite=o.b===1&&a>.98});j.g.visible=a>.01}
function resize(){const dpr=Math.min(devicePixelRatio||1,2),w=innerWidth,h=innerHeight;R.setPixelRatio(dpr);R.setSize(w,h,false);gb.width=gl.width;gb.height=gl.height;cam.aspect=w/h;cam.updateProjectionMatrix()}
function pass(arr){jars.forEach((j,i)=>setA(j,arr[i]));R.render(sc,cam)}
/* ---------- shapes / blob ---------- */
(function(){const pts=[];const n=14;for(let i=0;i<n;i++){const a=i/n*6.283;const r=350+16*Math.sin(3*a+1)+12*Math.sin(5*a+2);pts.push([500+r*Math.cos(a),500+r*Math.sin(a)])}
 let d='';for(let i=0;i<n;i++){const a=pts[i],b=pts[(i+1)%n],m=[(a[0]+b[0])/2,(a[1]+b[1])/2];if(!i){const l=pts[n-1];d='M'+(l[0]+a[0])/2+','+(l[1]+a[1])/2}d+=' Q'+a[0]+','+a[1]+' '+m[0]+','+m[1]}
 $('#blob').setAttribute('d',d+'Z');
 const cols=['#fff3ea','#ffc857','#4b1d3f','#6fcf97','#fff3ea','#ffc857'];
 const ld=$('#ld');for(let i=0;i<9;i++){const s=document.createElement('div');s.className='sh';const w=50+Math.random()*110;
  s.style.cssText='left:'+(Math.random()*92)+'%;top:'+(Math.random()*86)+'%;width:'+w+'px;height:'+w+'px;background:'+cols[i%6]+';animation-delay:'+(-Math.random()*5)+'s;clip-path:polygon('+([...Array(6)].map((_,k)=>{const a=k/6*6.283+Math.random()*.6,r=36+Math.random()*14;return(50+r*Math.cos(a))+'% '+(50+r*Math.sin(a))+'%'}).join(','))+')';
  ld.insertBefore(s,$('#cnt'))}})();
function sil(c){
  const pts=[...Array(7)].map((_,k)=>{
    const a=k/7*6.283+Math.random()*.5,r=36+Math.random()*12;
    return[50+r*Math.cos(a),50+r*Math.sin(a)];
  });
  return '<svg class="sil" viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="'+pts.map(p=>p.join(',')).join(' ')+'" fill="'+c+'"/></svg>';
}
/* ---------- UI ---------- */
const snaps=[];
function cardHTML(i){
  const p=P[i];
  const imgSrc = (p.customImageUrl && p.customImageUrl.trim()) ? p.customImageUrl : (snaps[i] || '');
  return '<div class="card rv" data-i="'+i+'" style="--t:'+p.tint+'">'+sil(p.col+'44')+'<div class="tg">'+p.tag+'</div><img src="'+imgSrc+'" alt="'+p.n+'"><div class="ct"><b>'+p.n+'</b><span data-pr="'+i+'">'+price(p)+'</span></div></div>';
}
let intro=null,spin=null;const ease3=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
let sel=0,page='home',tgt=0,cs=0,own=false,lastW=0,mx=0,hk=-1,u=0,tu=0;const T0=performance.now();
function buildCards(){$('#cards').innerHTML=P.map((_,i)=>cardHTML(i)).join('');$('#fl').innerHTML=P.map((p,i)=>'<a data-i="'+i+'">'+p.n+'</a>').join('');
 $('#mn').insertAdjacentHTML('beforeend','<a data-h>Home</a>'+P.map((p,i)=>'<a data-i="'+i+'">'+p.n+'</a>').join(''));
 $('#dots').innerHTML=P.map(()=>'<i></i>').join('')}
function renderProd(i){const p=P[i];sel=i;const o=P.map((_,k)=>k).filter(k=>k!==i);
 $('#pl1').textContent=p.l1;$('#pl2').textContent=p.l2;const ps=$('#pstage');ps.style.setProperty('--pt',p.tint);ps.style.setProperty('--pc',p.pc);
 $('#sdl').textContent=p.tag;$('#ptag').textContent=p.tag;$('#pq').textContent='“'+p.quote+'”';$('#pd').textContent=p.desc;$('#pp').textContent=price(p);
 $('#ph').innerHTML=[1,2,3,4,5].map(k=>'<i class="'+(k<=p.heat?'on':'')+'"></i>').join('')+'<small style="margin-left:8px;font-size:10px;letter-spacing:.2em;font-weight:800">RICHNESS</small>';
 $('#fi').textContent=p.ing;$('#fn').textContent=p.nut;$('#fp').textContent=p.pair;
 $('#oth').innerHTML=o.slice(0,3).map(cardHTML).join('');bind()}
function wipe(cb){const w=$('#wp');w.style.transition='transform .7s cubic-bezier(.76,0,.24,1)';w.style.transform='translateY(0)';
 setTimeout(()=>{cb();scrollTo(0,0);tgt=0;cs=0;own=false;w.style.transition='none';
  requestAnimationFrame(()=>requestAnimationFrame(()=>{w.style.transition='transform .7s cubic-bezier(.76,0,.24,1)';w.style.transform='translateY(-100%)';setTimeout(()=>{w.style.transition='none';w.style.transform='translateY(100%)'},750)}))},750)}
function go(i,auto){$('#mn').classList.remove('on');$('#pill').classList.remove('on');wipe(()=>{if(i<0){page='home';$('#home').style.display='';$('#prod').style.display='none'}else{renderProd(i);page='prod';{rot=0;rv=0}$('#home').style.display='none';$('#prod').style.display='block'}
 document.querySelectorAll('.rv').forEach(e=>{e.classList.remove('in');io.observe(e)})})}
function bind(){document.querySelectorAll('[data-i]').forEach(e=>{if(e.dataset.b)return;e.dataset.b=1;e.addEventListener('click',()=>go(+e.dataset.i));
 if(e.classList.contains('card')){e.addEventListener('mouseenter',()=>$('#pill').classList.add('on'));e.addEventListener('mouseleave',()=>$('#pill').classList.remove('on'))}});
 document.querySelectorAll('[data-h]').forEach(e=>{if(e.dataset.b)return;e.dataset.b=1;e.addEventListener('click',()=>go(-1))})}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),2400)}
$('#nf').onsubmit=e=>{e.preventDefault();toast('Thank you, you are on the list.');e.target.reset()};
$('#mb').onclick=()=>$('#mn').classList.add('on');$('#mx').onclick=()=>$('#mn').classList.remove('on');$('#logo').onclick=()=>page==='home'?(tgt=0,own=true):go(-1);
$('#add').onclick=()=>toast(P[sel].n+' added to your bag');
document.querySelectorAll('#cur button').forEach(b=>b.onclick=()=>{cur=b.dataset.c;document.querySelectorAll('#cur button').forEach(x=>x.classList.toggle('on',x===b));document.querySelectorAll('[data-pr]').forEach(e=>e.textContent=price(P[+e.dataset.pr]));$('#pp').textContent=price(P[sel])});
addEventListener('mousemove',e=>{const p=$('#pill');p.style.left=e.clientX+'px';p.style.top=e.clientY+'px';mx=e.clientX;
 if(page==='home'&&scrollY<$('#hT').offsetHeight-innerHeight*.5&&!e.target.closest('.card'))p.classList.toggle('on',Math.abs(e.clientX-innerWidth/2)<innerWidth*.14&&Math.abs(e.clientY-innerHeight*.45)<innerHeight*.3)});
$('#hero').addEventListener('click',e=>{if(Math.abs(e.clientX-innerWidth/2)<innerWidth*.16)go(((Math.round(u)%N)+N)%N)});
/* drag */
let drag=false,lx=0,rot=0,rv=0;
addEventListener('pointerdown',e=>{if(page==='prod'&&!spin&&e.target.closest('#pstage')){drag=true;lx=e.clientX;$('#pstage').style.cursor='grabbing'}});
addEventListener('pointermove',e=>{if(drag){const d=e.clientX-lx;lx=e.clientX;rv=d*.012;rot+=rv}});
addEventListener('pointerup',()=>{drag=false;$('#pstage').style.cursor='grab'});
/* smooth scroll */
addEventListener('wheel',e=>{if(e.ctrlKey)return;e.preventDefault();if(intro||spin)return;lastW=performance.now();if(!own){cs=scrollY;tgt=scrollY;own=true}tgt=clamp(tgt+e.deltaY*(e.deltaMode?32:1),0,document.documentElement.scrollHeight-innerHeight)},{passive:false});
addEventListener('scroll',()=>{if(performance.now()-lastW>250&&!own){tgt=cs=scrollY}});
/* loop */
function frame(now){requestAnimationFrame(frame);
 if(own){cs+=(tgt-cs)*.085;if(Math.abs(tgt-cs)<.4){cs=tgt;own=false}scrollTo(0,cs)}
 const sy=scrollY,vh=innerHeight,t=(now-T0)/1000;
 const pin=page==='home'?$('#hT'):$('#pT'),hr=pin.offsetHeight-vh,off=Math.max(0,sy-hr),pr=clamp(sy/hr,0,1);
 gl.style.transform=gb.style.transform=off>0?'translateY('+(-off)+'px)':'';
 $('#arcg').style.transform='rotate('+(t*6+sy*.05)+'deg)';
 if(off>vh)return;
 const sw=Math.min(4.2,(2*16*Math.tan(THREE.MathUtils.degToRad(15))*cam.aspect)*.3);
 if(page==='home'){const pu=u;
  tu=pr*3*N;u+=(tu-u)*.07;const vel=u-pu;const sway=clamp(vel*14,-.25,.25);
  const A=[],B=[];
  jars.forEach((j,i)=>{let d=((i-u)%N+N)%N;if(d>N/2)d-=N;const ad=Math.abs(d);const b=clamp((ad-.9)/.45,0,1);const s=1.5-.28*Math.min(ad,2);
   j.g.position.set(d*sw*1.1,-.1-Math.min(ad,2)*.15+(1-clamp(ad,0,1))*Math.sin(t*1.2)*.05,-ad*1.5);j.g.scale.setScalar(ad>2.8?.001:s*(innerWidth<800?.78:1));
   j.g.rotation.set(0,d*.55+Math.sin(t*.6)*.12,-d*.05+sway*(1-b));const v=ad<2.8;A.push(v?b:0);B.push(v?1-b:0)});
  pass(A);gbx.clearRect(0,0,gb.width,gb.height);gbx.drawImage(gl,0,0);pass(B);
  const k=((Math.round(u)%N)+N)%N;if(k!==hk){hk=k;$('#hname').textContent=P[k].n;$('#hsub').textContent=P[k].tag;document.querySelectorAll('#dots i').forEach((d,x)=>d.classList.toggle('on',x===k))}
 }else{
  gbx.clearRect(0,0,gb.width,gb.height);const e=1-Math.pow(1-pr,3);
  if(!drag){rv*=.94;rot+=rv}
  jars.forEach((j,i)=>{if(i!==sel){setA(j,0);return}setA(j,1);
   j.g.position.set(0,lerp(-2.6,.2,e),0);j.g.scale.setScalar((innerWidth<800?1.15:1.6)+e*.3);j.g.rotation.set(0,rot+pr*6*Math.PI,0)});
  $('#ptitle').style.transform='translateY(-54%) scale('+(1+pr*.06)+')';
  R.render(sc,cam)}
}
(async function initScene(){
 try{
   try{await Promise.all(['900 40px "Bodoni Moda"','italic 900 40px "Bodoni Moda"','800 20px Mulish'].map(f=>document.fonts.load(f)))}catch(e){}
   resize();addEventListener('resize',resize);
   P.forEach(p=>jars.push(makeJar(p)));
   const cz=cam.position.z;R.setPixelRatio(1);R.setSize(520,640,false);cam.aspect=520/640;cam.position.z=11;cam.updateProjectionMatrix();
   jars.forEach((j,i)=>{jars.forEach((k,x)=>setA(k,x===i?1:0));j.g.position.set(0,0,0);j.g.scale.setScalar(1);j.g.rotation.set(0,-.35,0);R.render(sc,cam);try{snaps[i]=gl.toDataURL('image/png');}catch(e){snaps[i]='';}});
   cam.position.z=cz;resize();
   buildCards();renderProd(0);bind();document.querySelectorAll('.rv').forEach(e=>io.observe(e));
   requestAnimationFrame(frame);
 }catch(err){
   console.warn("Melto 3D scene fallback:", err);
   buildCards();renderProd(0);bind();
 }
})();
<\/script>
</body>
</html>`;
  }
  const e6 = ({ config: o, onSelectElement: r, onInlineTextChange: a }) => {
    const s = z.useRef(null), c = z.useMemo(() => MT(o), [o]);
    return z.useEffect(() => {
      const u = (d) => {
        !d.data || typeof d.data != "object" || (d.data.type === "MELTO_ELEMENT_CLICK" ? r == null || r("brand", void 0, d.data.field) : d.data.type === "MELTO_TEXT_EDIT" ? a == null || a(d.data.field, d.data.value) : d.data.type === "MELTO_SECTION_SELECT" && (r == null || r(d.data.section, d.data.productIndex, d.data.label || d.data.field)));
      };
      return window.addEventListener("message", u), () => window.removeEventListener("message", u);
    }, [r, a]), n.jsxDEV("iframe", { ref: s, title: `${o.brandName} Live 3D Experience`, srcDoc: c, className: "w-full h-full border-0 bg-transparent block", sandbox: "allow-scripts allow-same-origin allow-forms" }, void 0, false);
  };
  function t6(o) {
    return o.sceneType === "melto-icecream" ? { layoutClass: "arch-gelato-cremerie", fontUrl: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,800;1,9..144,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap", displayFont: "'Fraunces', Georgia, serif", bodyFont: "'Plus Jakarta Sans', sans-serif", monoFont: "'Space Mono', monospace", stackLabel: "CRYOGENIC 3D GELATO CHURN · THREE.JS · GSAP SCROLL · EFERZ PLATFORM", showcaseSectionTitle: "Artisan Gelato Flavors & Single-Origin Pints", showcaseSectionSubtitle: "Slow-churned Jersey cream, single-origin cacao shells, and hand-swirled fruit compotes.", articlesSectionTitle: "The Cremerie Journal & Gelato Masterclasses", articlesSectionSubtitle: "Insights into micro-crystal freezing, Bronte pistachio terroirs, and sub-zero cold-chain transport.", contactTitle: "Private Gelato Tasting Flights & Event Catering", contactSubtitle: "Reserve our mobile gelato cart, schedule private flavor tastings, or request restaurant wholesale distribution.", contactHubs: "Bologna Atelier · London Mayfair · Dubai Marina · New York SoHo", contactFormPlaceholder: "Tell us about your event date, custom flavor request, or wholesale pints inquiry...", contactSubmitText: "Book Private Tasting →", defaultArticles: [{ tag: "COLD CHURN · SCIENCE", readTime: "05 MIN READ", title: "Why -18°C Cryo-Freezing Eliminates Ice Crystals in Pure Jersey Cream", summary: "How ultra-fast rapid chilling preserves the velvety lipid matrix of organic Jersey dairy without synthetic stabilizers." }, { tag: "TERROIR · INGREDIENTS", readTime: "06 MIN READ", title: "Mount Etna Volcanic Soil: The Emerald Soul of Bronte Pistachios", summary: "Exploring the biennial harvest of DOP Sicilian pistachios roasted slowly to produce intense emerald green paste." }, { tag: "CHOCOLATE · CRAFT", readTime: "04 MIN READ", title: "72% Single-Origin Arriba Dark Chocolate: The Science of the Crisp Snap Shell", summary: "Balancing pure cacao butter melting curves so the outer coating cracks instantly on contact while retaining rich floral fruit notes." }] } : { layoutClass: "arch-spice-atelier", fontUrl: "https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap", displayFont: "'Cinzel', Georgia, serif", bodyFont: "'Plus Jakarta Sans', sans-serif", monoFont: "'IBM Plex Mono', monospace", stackLabel: "TRADITIONAL STONE CHAKKI 3D · THREE.JS · WEBGL · EFERZ PLATFORM", showcaseSectionTitle: "Heritage Stone-Ground Masaley & Pure Blends", showcaseSectionSubtitle: "Hand-harvested unpolished crops ground below 45°C to preserve fragile aromatic volatile oils.", articlesSectionTitle: "Heritage Spice Chronicles & Culinary Monographs", articlesSectionSubtitle: "Ancient techniques of slow stone milling, sun-curing rhizomes, and culinary alchemy.", contactTitle: "Chef Culinary Consultation & Tasting Sample Kits", contactSubtitle: "Request custom restaurant recipe blends, commercial wholesale accounts, or our chef discovery box.", contactHubs: "Lahore Heritage Hub · Old Delhi Khari Baoli · Dubai Al Ras · London Spice Lane", contactFormPlaceholder: "Share details about your culinary kitchen, restaurant requirements, or requested spice sample kit...", contactSubmitText: "Request Chef Spice Kit →", defaultArticles: [{ tag: "HERITAGE MILLING · MONOGRAPH", readTime: "07 MIN READ", title: "Why Low-RPM Granite Chakki Milling Keeps Fragrant Volatiles Alive", summary: "High-speed industrial blenders scorch spices at 80°C. Discover why traditional cold granite grinding locks in 3x higher essential oils." }, { tag: "HARVEST ROOTS · BOTANY", readTime: "06 MIN READ", title: "7.5% Curcumin in Lakadong Turmeric: Nature’s Golden Healer", summary: "Deep inside the organic hill farms where pristine mountain rainwater and natural soil create the world’s most potent turmeric." }, { tag: "ROYAL CUISINE · GASTRONOMY", readTime: "05 MIN READ", title: "The Lost Art of Muslin Potli: Perfuming Dum Biryani with Zero Grit", summary: "How sealing whole royal spices in fine unbleached cotton infuses long-grain Basmati with fragrant spice vapors during slow sealed dum cooking." }] };
  }
  function r6(o) {
    return o.logoImageUrl ? `<img src="${o.logoImageUrl}" alt="${o.brandName}" class="custom-brand-icon" />` : o.sceneType === "melto-icecream" ? `
      <svg viewBox="0 0 40 40" class="brand-mark-svg" style="width:38px;height:38px;border-radius:10px;background:linear-gradient(135deg,#E29578,#522E2A);padding:6px;box-shadow:0 0 16px rgba(226,149,120,0.4)">
        <path d="M20 6C15 6 11 10 11 15C11 18 13 20 15 22L20 34L25 22C27 20 29 18 29 15C29 10 25 6 20 6Z" fill="#FFF"/>
        <path d="M15 15C15 12 17 10 20 10C23 10 25 12 25 15" stroke="#522E2A" stroke-width="2" stroke-linecap="round"/>
        <circle cx="20" cy="15" r="2" fill="#E29578"/>
      </svg>
    ` : `
    <svg viewBox="0 0 40 40" class="brand-mark-svg" style="width:38px;height:38px;border-radius:10px;background:linear-gradient(135deg,#E59500,#C02626);padding:6px;box-shadow:0 0 16px rgba(229,149,0,0.4)">
      <path d="M12 24C12 28.4 15.6 32 20 32C24.4 32 28 28.4 28 24H12Z" fill="#FFF"/>
      <line x1="8" y1="24" x2="32" y2="24" stroke="#FFF" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="26" y1="12" x2="18" y2="22" stroke="#FFF" stroke-width="3" stroke-linecap="round"/>
      <circle cx="27" cy="11" r="2.5" fill="#E59500"/>
    </svg>
  `;
  }
  function i6(o, r, a) {
    return (o.variantGeneration || 0) % 2, o.sceneType === "melto-icecream" ? `
    <!-- ── MELTO 2026 ARCHETYPE: ARTISAN GELATERIA & CRYO CHURN ── -->
    <nav data-edit-section="brand" class="nav-gelato">
      <a href="#tH" class="brand-link">
        ${a}
        <div>
          <span class="brand-name" data-edit-path="brandName" data-edit-label="Brand Name">${o.brandName}</span>
          <span class="brand-tag" data-edit-path="brandTag" data-edit-label="Brand Tagline">${o.brandTag}</span>
        </div>
      </a>
      <div class="gelato-temp-indicator">
        <i class="frost-dot"></i>
        <span>CHURN TEMP: <strong>-18.0°C CRYO</strong></span>
        <span>DAIRY: <strong>100% JERSEY</strong></span>
      </div>
      <div class="nav-links">
        <a href="#tS0" data-edit-path="navLinks.0" data-edit-label="Nav Link 1">${o.navLinks[0]}</a>
        <a href="#tS1" data-edit-path="navLinks.1" data-edit-label="Nav Link 2">${o.navLinks[1]}</a>
        <a href="#products" data-edit-path="navLinks.2" data-edit-label="Nav Link 3">${o.navLinks[2]}</a>
        <a href="#contact" data-edit-path="navLinks.3" data-edit-label="Nav Link 4">${o.navLinks[3]}</a>
      </div>
      <a href="#contact" class="nav-cta" data-edit-path="navCta" data-edit-label="Navbar CTA">${o.navCta}</a>
    </nav>

    <main>
      <!-- HERO STAGE (COMPACT 135VH) -->
      <div class="tr" id="tH" style="height:135vh">
        <div class="stg" data-edit-section="hero">
          <div class="hl">
            <small data-edit-path="heroBadge" data-edit-label="Hero Kicker">${o.heroBadge}</small>
            <h1>
              <span data-edit-path="heroTitle1" data-edit-label="Hero Line 1">${o.heroTitle1}</span>
              <em data-edit-path="heroTitleAccent" data-edit-label="Hero Accent">${o.heroTitleAccent}</em>
            </h1>
            <p data-edit-path="heroSubtitle" data-edit-label="Hero Subtitle">${o.heroSubtitle}</p>
            <div class="btn-row">
              <a href="#products" class="btn">Explore Flavors →</a>
              <a href="#contact" class="btn sec-outline" data-edit-path="navCta" data-edit-label="Hero CTA">${o.navCta}</a>
            </div>
            <div class="drag-badge" data-edit-path="heroDragHint" data-edit-label="3D Drag Hint">${o.heroDragHint}</div>
          </div>

          <aside class="gelato-telemetry-panel">
            <div class="panel-head">
              <span>CRYO VAULT STATUS</span>
              <strong data-edit-path="promoCode" data-edit-label="Vault Code">${o.promoCode}</strong>
            </div>
            <div class="temp-display">
              <span class="temp-val" data-edit-path="promoBadgeTop" data-edit-label="Badge Top">${o.promoBadgeTop}</span>
              <small data-edit-path="promoBadgeBottom" data-edit-label="Badge Bottom">${o.promoBadgeBottom}</small>
            </div>
            <div class="gelato-facts">
              ${o.stats.slice(0, 2).map((s, c) => `
              <div>
                <small data-edit-path="stats.${c}.label" data-edit-label="Stat Label">${s.label}</small>
                <strong data-edit-path="stats.${c}.value" data-edit-label="Stat Value">${s.value}</strong>
              </div>`).join("")}
            </div>
          </aside>
        </div>
      </div>

      <!-- COMPACT 155VH ALTERNATING SCROLL STAGES -->
      ${o.stages.map((s, c) => `
      <div class="tr" id="tS${c}" style="height:155vh">
        <div class="stg" data-edit-section="stages">
          <div class="cap ${c % 2 === 1 ? "cap-right" : "cap-left"}">
            <div class="hud-corner-tag">COLD CHURN CHOREOGRAPHY // 0${c + 1}</div>
            <span class="st-badge" data-edit-path="stages.${c}.badge" data-edit-label="Stage 0${c + 1} Badge">${s.badge}</span>
            <h2>
              <span data-edit-path="stages.${c}.title" data-edit-label="Stage 0${c + 1} Title">${s.title}</span>
              <em data-edit-path="stages.${c}.highlight" data-edit-label="Stage 0${c + 1} Highlight">${s.highlight}</em>
            </h2>
            <p data-edit-path="stages.${c}.description" data-edit-label="Stage 0${c + 1} Description">${s.description}</p>
            <div class="inline-stage-metric">
              <b data-edit-path="stages.${c}.metricValue" data-edit-label="Stage Metric">${s.metricValue}</b>
              <span data-edit-path="stages.${c}.metricUnit" data-edit-label="Stage Unit">${s.metricUnit}</span>
              <small data-edit-path="stages.${c}.metricLabel" data-edit-label="Stage Metric Label">${s.metricLabel}</small>
            </div>
          </div>
        </div>
      </div>`).join("")}

      <!-- SIGNATURE GELATO FLAVORS MATRIX -->
      <section class="sec" id="products" data-edit-section="products">
        <div class="sec-head">
          <div>
            <small class="sec-kicker">ARTISAN FLAVOR SELECTION // SINGLE-ORIGIN PINTS</small>
            <h2 data-edit-path="productsTitle" data-edit-label="Products Title">${o.productsTitle}</h2>
          </div>
          <p data-edit-path="productsSubtitle" data-edit-label="Products Subtitle">${o.productsSubtitle}</p>
        </div>
        <div class="grid-4">
          ${o.products.map((s, c) => `
          <div class="card gelato-flavor-card">
            <div>
              <span class="card-code" data-edit-path="products.${c}.code" data-edit-label="Item #${c + 1} Code">${s.code}</span>
              <h3 data-edit-path="products.${c}.name" data-edit-label="Item #${c + 1} Title">${s.name}</h3>
              <div class="sub" data-edit-path="products.${c}.subtitle" data-edit-label="Item #${c + 1} Subtitle">${s.subtitle}</div>
              <p data-edit-path="products.${c}.description" data-edit-label="Item #${c + 1} Summary">${s.description}</p>
              <ul class="spec-list">
                <li data-edit-path="products.${c}.specs.0" data-edit-label="Item #${c + 1} Spec 1">${s.specs[0]}</li>
                <li data-edit-path="products.${c}.specs.1" data-edit-label="Item #${c + 1} Spec 2">${s.specs[1]}</li>
                <li data-edit-path="products.${c}.specs.2" data-edit-label="Item #${c + 1} Spec 3">${s.specs[2]}</li>
              </ul>
            </div>
            <div class="card-foot">
              <span class="card-price" data-edit-path="products.${c}.price" data-edit-label="Item #${c + 1} Price">${s.price}</span>
              <a href="#contact" class="card-btn inquire-trigger" data-item="${s.name}">Request Tasting →</a>
            </div>
          </div>`).join("")}
        </div>
      </section>
    ` : `
    <nav data-edit-section="brand" class="nav-spice">
      <a href="#tH" class="brand-link">
        ${a}
        <div>
          <span class="brand-name" data-edit-path="brandName" data-edit-label="Brand Name">${o.brandName}</span>
          <span class="brand-tag" data-edit-path="brandTag" data-edit-label="Brand Tagline">${o.brandTag}</span>
        </div>
      </a>
      <div class="spice-mill-indicator">
        <i class="amber-dot"></i>
        <span>MILLING: <strong>COLD STONE CHAKKI (&lt;45°C)</strong></span>
        <span>PURITY: <strong>100% UNPOLISHED</strong></span>
      </div>
      <div class="nav-links">
        <a href="#tS0" data-edit-path="navLinks.0" data-edit-label="Nav Link 1">${o.navLinks[0]}</a>
        <a href="#tS1" data-edit-path="navLinks.1" data-edit-label="Nav Link 2">${o.navLinks[1]}</a>
        <a href="#products" data-edit-path="navLinks.2" data-edit-label="Nav Link 3">${o.navLinks[2]}</a>
        <a href="#contact" data-edit-path="navLinks.3" data-edit-label="Nav Link 4">${o.navLinks[3]}</a>
      </div>
      <a href="#contact" class="nav-cta" data-edit-path="navCta" data-edit-label="Navbar CTA">${o.navCta}</a>
    </nav>

    <main>
      <!-- HERO STAGE (COMPACT 135VH) -->
      <div class="tr" id="tH" style="height:135vh">
        <div class="stg" data-edit-section="hero">
          <div class="hl">
            <small data-edit-path="heroBadge" data-edit-label="Hero Kicker">${o.heroBadge}</small>
            <h1>
              <span data-edit-path="heroTitle1" data-edit-label="Hero Line 1">${o.heroTitle1}</span>
              <em data-edit-path="heroTitleAccent" data-edit-label="Hero Accent">${o.heroTitleAccent}</em>
            </h1>
            <p data-edit-path="heroSubtitle" data-edit-label="Hero Subtitle">${o.heroSubtitle}</p>
            <div class="btn-row">
              <a href="#products" class="btn">Explore Heritage Blends →</a>
              <a href="#contact" class="btn sec-outline" data-edit-path="navCta" data-edit-label="Hero CTA">${o.navCta}</a>
            </div>
            <div class="drag-badge" data-edit-path="heroDragHint" data-edit-label="3D Drag Hint">${o.heroDragHint}</div>
          </div>

          <aside class="spice-curcumin-panel">
            <div class="panel-head">
              <span>LAB PURITY ANALYSIS</span>
              <strong data-edit-path="promoCode" data-edit-label="Batch Code">${o.promoCode}</strong>
            </div>
            <div class="purity-display">
              <span class="purity-val" data-edit-path="promoBadgeTop" data-edit-label="Badge Top">${o.promoBadgeTop}</span>
              <small data-edit-path="promoBadgeBottom" data-edit-label="Badge Bottom">${o.promoBadgeBottom}</small>
            </div>
            <div class="spice-kpis">
              ${o.stats.slice(0, 2).map((s, c) => `
              <div>
                <small data-edit-path="stats.${c}.label" data-edit-label="Stat Label">${s.label}</small>
                <strong data-edit-path="stats.${c}.value" data-edit-label="Stat Value">${s.value}</strong>
              </div>`).join("")}
            </div>
          </aside>
        </div>
      </div>

      <!-- COMPACT 155VH ALTERNATING SCROLL STAGES -->
      ${o.stages.map((s, c) => `
      <div class="tr" id="tS${c}" style="height:155vh">
        <div class="stg" data-edit-section="stages">
          <div class="cap ${c % 2 === 1 ? "cap-right" : "cap-left"}">
            <div class="hud-corner-tag">HERITAGE MILLING WAYPOINT // 0${c + 1}</div>
            <span class="st-badge" data-edit-path="stages.${c}.badge" data-edit-label="Stage 0${c + 1} Badge">${s.badge}</span>
            <h2>
              <span data-edit-path="stages.${c}.title" data-edit-label="Stage 0${c + 1} Title">${s.title}</span>
              <em data-edit-path="stages.${c}.highlight" data-edit-label="Stage 0${c + 1} Highlight">${s.highlight}</em>
            </h2>
            <p data-edit-path="stages.${c}.description" data-edit-label="Stage 0${c + 1} Description">${s.description}</p>
            <div class="inline-stage-metric">
              <b data-edit-path="stages.${c}.metricValue" data-edit-label="Stage Metric">${s.metricValue}</b>
              <span data-edit-path="stages.${c}.metricUnit" data-edit-label="Stage Unit">${s.metricUnit}</span>
              <small data-edit-path="stages.${c}.metricLabel" data-edit-label="Stage Metric Label">${s.metricLabel}</small>
            </div>
          </div>
        </div>
      </div>`).join("")}

      <!-- HERITAGE MASALEY SHOWCASE -->
      <section class="sec" id="products" data-edit-section="products">
        <div class="sec-head">
          <div>
            <small class="sec-kicker">HERITAGE STONE-GROUND COLLECTION // GLASS APOTHECARY</small>
            <h2 data-edit-path="productsTitle" data-edit-label="Products Title">${o.productsTitle}</h2>
          </div>
          <p data-edit-path="productsSubtitle" data-edit-label="Products Subtitle">${o.productsSubtitle}</p>
        </div>
        <div class="grid-4">
          ${o.products.map((s, c) => `
          <div class="card spice-potli-card">
            <div>
              <span class="card-code" data-edit-path="products.${c}.code" data-edit-label="Item #${c + 1} Code">${s.code}</span>
              <h3 data-edit-path="products.${c}.name" data-edit-label="Item #${c + 1} Title">${s.name}</h3>
              <div class="sub" data-edit-path="products.${c}.subtitle" data-edit-label="Item #${c + 1} Subtitle">${s.subtitle}</div>
              <p data-edit-path="products.${c}.description" data-edit-label="Item #${c + 1} Summary">${s.description}</p>
              <ul class="spec-list">
                <li data-edit-path="products.${c}.specs.0" data-edit-label="Item #${c + 1} Spec 1">${s.specs[0]}</li>
                <li data-edit-path="products.${c}.specs.1" data-edit-label="Item #${c + 1} Spec 2">${s.specs[1]}</li>
                <li data-edit-path="products.${c}.specs.2" data-edit-label="Item #${c + 1} Spec 3">${s.specs[2]}</li>
              </ul>
            </div>
            <div class="card-foot">
              <span class="card-price" data-edit-path="products.${c}.price" data-edit-label="Item #${c + 1} Price">${s.price}</span>
              <a href="#contact" class="card-btn inquire-trigger" data-item="${s.name}">Request Sample →</a>
            </div>
          </div>`).join("")}
        </div>
      </section>
    `;
  }
  function a6(o) {
    const r = JSON.stringify(o).replace(/</g, "\\u003c"), a = t6(o), s = (o.variantGeneration || 0) % 2 === 1, c = r6(o), u = i6(o, a, c);
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>${o.brandName} — ${o.brandTag} | 2026 Interactive 3D Showcase</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${a.fontUrl}" rel="stylesheet">
<style>
:root{
  --bg:${o.bgDarkHex};
  --bg2:${o.bgMidHex};
  --pri:${o.primaryHex};
  --sec:${o.secondaryHex};
  --fg:#f8fafc;
  --mut:#94a3b8;
  --font-display:${a.displayFont};
  --font-body:${a.bodyFont};
  --font-mono:${a.monoFont};
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{
  background:radial-gradient(ellipse at ${s ? "30% 25%" : "68% 36%"},var(--bg2),var(--bg) 74%) fixed;
  color:var(--fg);
  font-family:var(--font-body);
  overflow-x:hidden;
  scroll-behavior:smooth;
}

body.arch-gelato-cremerie::before{
  content:'';position:fixed;inset:0;z-index:1;pointer-events:none;
  background:radial-gradient(circle at 75% 25%, rgba(226,149,120,0.14), transparent 50%);
}

body.arch-spice-atelier::before{
  content:'';position:fixed;inset:0;z-index:1;pointer-events:none;
  background:
    radial-gradient(circle at 20% 30%, rgba(229,149,0,0.12), transparent 45%),
    radial-gradient(circle at 80% 70%, rgba(192,38,38,0.10), transparent 50%);
}

#gl{
  position:fixed;inset:0;width:100%;height:100%;z-index:0;
  cursor:grab;touch-action:pan-y;
}
#gl:active{cursor:grabbing}
#sprog{
  position:fixed;left:0;top:0;height:3px;width:100%;
  background:linear-gradient(90deg,var(--pri),var(--sec),#fff);
  transform-origin:left;transform:scaleX(0);z-index:220;
}
#vig{
  position:fixed;inset:0;z-index:1;pointer-events:none;
  background:radial-gradient(circle,transparent 50%,rgba(0,0,0,0.75) 100%);
}
main{position:relative;z-index:2;pointer-events:none}
main a,main button,main input,main textarea,main select,main .card,main .cap,main .ps,main .hl,main .bd,main .art-card,main .contact-wrap,main .gelato-telemetry-panel,main .spice-curcumin-panel,main [data-edit-path],main [data-edit-section]{pointer-events:auto}

/* ── DIRECT CLICK-ANY-TEXT INLINE EDITOR & INSPECTOR ── */
body.inspector-on [data-edit-path]{
  position:relative;
  border-radius:6px;
  transition:outline .18s ease,background-color .18s ease,box-shadow .18s ease;
}
body.inspector-on [data-edit-path]:hover{
  outline:1.5px dashed var(--pri);
  outline-offset:4px;
  background:rgba(255,255,255,0.06);
  cursor:text;
}
body.inspector-on [data-edit-path]:focus,
body.inspector-on [data-edit-path].active-text-node{
  outline:2px solid var(--pri);
  outline-offset:5px;
  background:rgba(0,0,0,0.7);
  box-shadow:0 0 0 4px rgba(255,255,255,0.14),0 12px 30px rgba(0,0,0,0.6);
}
#inline-edit-Banner{
  position:fixed;bottom:18px;left:50%;transform:translate(-50%,20px);
  z-index:240;background:rgba(10,12,20,0.94);backdrop-filter:blur(16px);
  border:1px solid var(--pri);color:#fff;padding:8px 16px;border-radius:999px;
  font-size:.72rem;font-weight:700;letter-spacing:.06em;
  display:flex;align-items:center;gap:8px;
  opacity:0;pointer-events:none;transition:.3s cubic-bezier(.16,1,.3,1);
  box-shadow:0 16px 40px rgba(0,0,0,0.65);
}
#inline-edit-Banner.on{opacity:1;transform:translate(-50%,0)}
#inline-edit-Banner span.dot{width:8px;height:8px;border-radius:50%;background:var(--pri);box-shadow:0 0 10px var(--pri)}

nav{
  position:fixed;top:0;left:0;right:0;z-index:80;
  display:flex;align-items:center;justify-content:space-between;
  padding:14px 5vw;
  background:linear-gradient(180deg,rgba(4,7,15,0.92),rgba(4,7,15,0.4));
  backdrop-filter:blur(16px);
  border-bottom:1px solid rgba(255,255,255,0.09);
}
.brand-link{display:flex;align-items:center;gap:12px;text-decoration:none;color:#fff}
.custom-brand-icon{
  width:38px;height:38px;border-radius:10px;object-fit:cover;
  border:1.5px solid var(--pri);box-shadow:0 0 18px var(--pri);
}
.brand-name{font-family:var(--font-display);font-size:1.25rem;letter-spacing:.1em;font-weight:700}
.brand-tag{font-family:var(--font-mono);font-size:.58rem;letter-spacing:.2em;color:var(--pri);display:block;font-weight:600}
.nav-links{display:flex;gap:24px;align-items:center}
.nav-links a{
  color:var(--fg);text-decoration:none;font-size:.74rem;font-weight:600;
  letter-spacing:.13em;text-transform:uppercase;opacity:.84;transition:.25s;
}
.nav-links a:hover{opacity:1;color:var(--pri)}
.nav-cta{
  background:var(--pri);color:#05070e;border:0;border-radius:999px;
  padding:9px 22px;font-weight:800;font-size:.74rem;letter-spacing:.13em;
  text-transform:uppercase;cursor:pointer;transition:.25s;text-decoration:none;
}
.gelato-temp-indicator, .spice-mill-indicator{
  display:flex;gap:14px;font-family:var(--font-mono);font-size:.64rem;letter-spacing:.14em;
  padding:6px 14px;border-radius:6px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);
}
.gelato-temp-indicator strong, .spice-mill-indicator strong{color:var(--pri)}
.frost-dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:#38bdf8;box-shadow:0 0 8px #38bdf8}
.amber-dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:#f59e0b;box-shadow:0 0 8px #f59e0b}
@media(max-width:920px){.nav-links,.gelato-temp-indicator,.spice-mill-indicator{display:none}}

/* ── HERO & SCROLL STAGES ── */
.tr{position:relative}
.stg{position:sticky;top:0;height:100vh;height:100dvh;overflow:hidden}
.hl{
  position:absolute;
  ${s ? "right:5vw;text-align:right;align-items:flex-end;" : "left:5vw;text-align:left;align-items:flex-start;"}
  top:52%;transform:translateY(-50%);
  max-width:min(540px,88vw);display:flex;flex-direction:column;
}
.hl small{
  font-family:var(--font-mono);
  display:inline-block;letter-spacing:.18em;color:var(--pri);
  font-size:.68rem;font-weight:700;margin-bottom:10px;text-transform:uppercase;
}
.hl h1{
  font-family:var(--font-display);
  font-size:clamp(2.6rem,6.2vw,5.2rem);line-height:.96;
  letter-spacing:-.01em;margin-bottom:12px;
  text-shadow:0 12px 42px rgba(0,0,0,0.85);
}
.hl h1 em{font-style:normal;color:var(--pri);display:block}
.hl p{
  color:var(--mut);font-size:.96rem;line-height:1.6;
  max-width:470px;margin-bottom:18px;
}
.btn-row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
.btn{
  display:inline-flex;align-items:center;gap:8px;
  background:var(--pri);color:#05070e;padding:12px 24px;border-radius:999px;
  font-weight:800;font-size:.74rem;letter-spacing:.13em;text-transform:uppercase;
  text-decoration:none;border:0;cursor:pointer;transition:.3s;
}
.btn.sec-outline{
  background:rgba(255,255,255,0.06);color:#fff;
  border:1px solid rgba(255,255,255,0.22);backdrop-filter:blur(10px);
}
.btn:hover{box-shadow:0 0 0 4px rgba(255,255,255,0.14),0 0 28px var(--pri)}
.drag-badge{
  margin-top:12px;display:inline-flex;align-items:center;gap:8px;
  padding:7px 14px;border-radius:99px;background:rgba(8,12,22,0.75);
  border:1px solid rgba(255,255,255,0.16);font-size:.63rem;font-weight:700;
  font-family:var(--font-mono);letter-spacing:.14em;color:#fff;backdrop-filter:blur(12px);
}

/* ── GELATO TELEMETRY & SPICE CURCUMIN ASIDE PANELS ── */
.gelato-telemetry-panel, .spice-curcumin-panel{
  position:absolute;right:5vw;top:52%;transform:translateY(-50%);
  width:290px;padding:20px;border-radius:18px;
  background:rgba(18,12,15,0.88);backdrop-filter:blur(18px);
  border:1px solid rgba(255,255,255,0.15);
  box-shadow:0 24px 60px rgba(0,0,0,0.65);
}
.panel-head{display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:.62rem;letter-spacing:.14em;color:var(--pri);margin-bottom:12px}
.temp-display, .purity-display{text-align:center;padding:12px 0 16px;border-bottom:1px solid rgba(255,255,255,0.1)}
.temp-val, .purity-val{display:block;font-family:var(--font-display);font-size:3.2rem;font-weight:800;color:var(--pri);line-height:1}
.temp-display small, .purity-display small{font-family:var(--font-mono);font-size:.64rem;letter-spacing:.18em;color:#fff;text-transform:uppercase}
.gelato-facts, .spice-kpis{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:14px}
.gelato-facts small, .spice-kpis small{display:block;font-family:var(--font-mono);font-size:.58rem;letter-spacing:.12em;color:var(--mut)}
.gelato-facts strong, .spice-kpis strong{font-family:var(--font-display);font-size:1.15rem;color:#fff}
@media(max-width:860px){.gelato-telemetry-panel,.spice-curcumin-panel{display:none}}

/* ── COMPACT 155VH SCROLL STAGES ── */
.cap{
  position:absolute;bottom:9vh;max-width:min(460px,86vw);
  background:rgba(12,10,14,0.82);backdrop-filter:blur(18px);
  border:1px solid rgba(255,255,255,0.16);border-radius:20px;padding:22px 26px;
  box-shadow:0 20px 50px rgba(0,0,0,0.6);
}
.cap.cap-left{left:5vw}
.cap.cap-right{right:5vw}
.hud-corner-tag{
  font-family:var(--font-mono);font-size:.56rem;letter-spacing:.18em;color:var(--sec);
  margin-bottom:4px;
}
.cap .st-badge{
  font-family:var(--font-mono);
  display:inline-block;font-size:.63rem;font-weight:700;letter-spacing:.18em;
  color:var(--pri);text-transform:uppercase;margin-bottom:6px;
}
.cap h2{
  font-family:var(--font-display);font-size:clamp(1.75rem,3.6vw,2.75rem);
  line-height:1.02;margin-bottom:8px;
}
.cap h2 em{font-style:normal;color:var(--pri);margin-left:6px}
.cap p{color:var(--mut);font-size:.9rem;line-height:1.58}
.inline-stage-metric{
  margin-top:12px;padding-top:10px;border-top:1px solid rgba(255,255,255,0.1);
  display:flex;align-items:baseline;gap:8px;
}
.inline-stage-metric b{font-family:var(--font-display);font-size:1.85rem;color:var(--pri)}
.inline-stage-metric span{font-family:var(--font-mono);font-size:.8rem;font-weight:700;color:#fff}
.inline-stage-metric small{font-family:var(--font-mono);font-size:.6rem;color:var(--mut);letter-spacing:.14em;margin-left:auto}

/* Stage Quick-Jump Dots */
.stage-nav{
  position:fixed;right:1.6vw;top:50%;transform:translateY(-50%);
  z-index:60;display:flex;flex-direction:column;gap:8px;
}
.stage-dot{
  width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,0.22);
  border:1px solid rgba(255,255,255,0.4);cursor:pointer;transition:.3s;
}
.stage-dot.on{background:var(--pri);transform:scale(1.4);box-shadow:0 0 12px var(--pri)}

/* ── MARQUEE RIBBON ── */
.mq-bar{
  position:relative;z-index:4;background:var(--pri);color:#05070e;
  padding:12px 0;overflow:hidden;
  box-shadow:0 12px 30px rgba(0,0,0,0.45);
}
.mq-track{
  display:flex;gap:40px;width:max-content;animation:mq 26s linear infinite;
  font-family:var(--font-display);font-size:1.25rem;font-weight:800;letter-spacing:1.8px;text-transform:uppercase;
}
@keyframes mq{to{transform:translateX(-50%)}}

/* ── CONTENT SECTIONS ── */
.sec{max-width:1220px;margin:auto;padding:6vh 5vw 3vh;position:relative;z-index:4}
.sec-kicker{
  display:block;font-family:var(--font-mono);font-size:.62rem;letter-spacing:.2em;
  color:var(--pri);margin-bottom:6px;font-weight:700;
}
.sec-head{margin-bottom:24px;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:16px;border-bottom:1px solid rgba(255,255,255,0.12);padding-bottom:16px}
.sec-head h2{
  font-family:var(--font-display);font-size:clamp(1.85rem,4vw,3.1rem);
  line-height:1.04;
}
.sec-head p{color:var(--mut);max-width:520px;line-height:1.58;font-size:.92rem}

.grid-4{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px}
.card{
  padding:24px;border-radius:18px;background:rgba(255,255,255,0.035);
  border:1px solid rgba(255,255,255,0.1);backdrop-filter:blur(14px);
  display:flex;flex-direction:column;justify-content:space-between;
  transition:border-color .3s,transform .3s;
}
.card:hover{border-color:var(--pri);transform:translateY(-4px)}
.card-code{font-family:var(--font-mono);font-size:.64rem;letter-spacing:.18em;color:var(--pri);display:block;margin-bottom:6px}
.card h3{font-family:var(--font-display);font-size:1.32rem;margin-bottom:4px}
.card .sub{font-size:.78rem;color:var(--sec);margin-bottom:10px;font-weight:600}
.card p{font-size:.85rem;color:var(--mut);line-height:1.52;margin-bottom:14px}
.spec-list{list-style:none;margin:0 0 16px;display:grid;gap:6px}
.spec-list li{font-family:var(--font-mono);font-size:.68rem;color:#cbd5e1;padding:4px 8px;border-radius:6px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08)}
.card-foot{display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(255,255,255,0.09);padding-top:14px}
.card-price{font-family:var(--font-mono);font-size:1.05rem;font-weight:700;color:#fff}
.card-btn{
  font-family:var(--font-mono);font-size:.68rem;font-weight:700;letter-spacing:.12em;
  text-transform:uppercase;color:var(--pri);text-decoration:none;
}
.card-btn:hover{text-decoration:underline}

/* ── ARTICLES GRID ── */
.articles-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px}
.art-card{
  padding:24px;border-radius:18px;background:rgba(255,255,255,0.035);
  border:1px solid rgba(255,255,255,0.12);backdrop-filter:blur(16px);
  display:flex;flex-direction:column;justify-content:space-between;
  transition:border-color .3s,transform .3s;
}
.art-card:hover{border-color:var(--pri);transform:translateY(-4px)}
.art-meta{
  display:flex;align-items:center;justify-content:space-between;gap:10px;
  font-family:var(--font-mono);font-size:.64rem;letter-spacing:.15em;color:var(--pri);
  margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid rgba(255,255,255,0.09);
}
.art-card h3{font-family:var(--font-display);font-size:1.24rem;line-height:1.25;margin-bottom:10px;color:#fff}
.art-card p{color:var(--mut);font-size:.86rem;line-height:1.6;margin-bottom:16px}
.art-link{font-family:var(--font-mono);font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#fff;text-decoration:none}
.art-link:hover{color:var(--pri)}

/* ── DIRECT CONTACT & INQUIRY SECTION (NO CHECKOUT FLOW) ── */
.contact-wrap{
  display:grid;grid-template-columns:1.05fr 1.2fr;gap:28px;
  padding:32px;border-radius:24px;
  background:linear-gradient(155deg,rgba(22,14,20,0.92),rgba(8,6,10,0.88));
  border:1px solid rgba(255,255,255,0.16);backdrop-filter:blur(20px);
  box-shadow:0 24px 60px rgba(0,0,0,0.65);
}
@media(max-width:860px){.contact-wrap{grid-template-columns:1fr;padding:22px}}
.contact-info h3{font-family:var(--font-display);font-size:clamp(1.65rem,3.2vw,2.4rem);line-height:1.08;margin-bottom:10px}
.contact-info p{color:var(--mut);line-height:1.6;font-size:.9rem;margin-bottom:16px}
.hub-box{
  padding:14px 16px;border-radius:14px;background:rgba(255,255,255,0.04);
  border:1px solid rgba(255,255,255,0.1);margin-bottom:10px;
}
.hub-box small{display:block;font-family:var(--font-mono);font-size:.6rem;letter-spacing:.18em;color:var(--pri);margin-bottom:4px;font-weight:700}
.hub-box strong{font-size:.86rem;color:#fff;display:block}
.contact-form{display:grid;gap:12px}
.contact-form .row-2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media(max-width:600px){.contact-form .row-2{grid-template-columns:1fr}}
.contact-form input,.contact-form textarea{
  width:100%;padding:12px 14px;border-radius:12px;
  border:1px solid rgba(255,255,255,0.16);background:rgba(4,7,14,0.75);
  color:#fff;font-family:var(--font-body);font-size:.88rem;transition:.25s;
}
.contact-form input:focus,.contact-form textarea:focus{
  outline:none;border-color:var(--pri);box-shadow:0 0 0 3px rgba(255,255,255,0.1);
}

/* ── PERMANENTLY LOCKED WATERMARK: POWERED BY EFERZ (EFERZ.COM) ── */
footer{
  position:relative;z-index:4;background:rgba(5,4,8,0.96);
  border-top:1px solid rgba(255,255,255,0.12);padding:36px 5vw 26px;margin-top:4vh;
}
.foot-top{
  max-width:1220px;margin:0 auto 20px;display:flex;flex-wrap:wrap;
  align-items:center;justify-content:space-between;gap:16px;
}
.locked-watermark-bar{
  max-width:1220px;margin:0 auto;padding-top:18px;
  border-top:1px solid rgba(255,255,255,0.1);
  display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px;
  font-size:.82rem;color:var(--mut);
  user-select:none;
}
.efforts-badge{
  display:inline-flex;align-items:center;gap:8px;
  padding:7px 16px;border-radius:999px;
  background:rgba(208,33,40,0.18);
  border:1px solid rgba(208,33,40,0.6);color:#fff;
  font-size:.74rem;font-weight:800;letter-spacing:.08em;text-decoration:none;
  transition:.25s;
}
.efforts-badge:hover{background:#d02128;border-color:#d02128;box-shadow:0 0 24px rgba(208,33,40,0.6)}
.efforts-badge i.lock-icon{font-style:normal;font-size:.78rem}

#toast{
  position:fixed;top:72px;right:24px;z-index:250;
  background:#0f172a;color:#fff;border:1.5px solid var(--pri);
  padding:10px 20px;border-radius:14px;font-size:.8rem;font-weight:700;
  opacity:0;transform:translateY(-12px);pointer-events:none;transition:.35s;
  box-shadow:0 18px 40px rgba(0,0,0,0.6);
}
#toast.on{opacity:1;transform:translateY(0)}
</style>
</head>
<body class="inspector-on ${a.layoutClass}">

<div id="sprog"></div>
<div id="vig"></div>
<canvas id="gl"></canvas>
<div id="toast"></div>
<div id="inline-edit-Banner">
  <span class="dot"></span>
  <span id="inline-edit-status">Click any text on the page to edit it directly in place</span>
</div>

<!-- Stage Quick-Jump Dots -->
<div class="stage-nav">
  <div class="stage-dot on" data-jump="#tH" title="Hero Stage"></div>
  <div class="stage-dot" data-jump="#tS0" title="Stage 01"></div>
  <div class="stage-dot" data-jump="#tS1" title="Stage 02"></div>
  <div class="stage-dot" data-jump="#tS2" title="Stage 03"></div>
  <div class="stage-dot" data-jump="#tS3" title="Stage 04"></div>
</div>

<!-- ── DISTINCT ARCHETYPE BODY SHELL ── -->
${u}

  <!-- ── MARQUEE RIBBON ── -->
  <div class="mq-bar" data-edit-section="marquee">
    <div class="mq-track">
      ${[...o.marqueeItems, ...o.marqueeItems].map((d, f) => `<span data-edit-path="marqueeItems.${f % 5}" data-edit-label="Marquee Item #${f % 5 + 1}">${d}</span>`).join("")}
    </div>
  </div>

  <!-- ── EDITORIAL JOURNAL MONOGRAPHS ── -->
  <section class="sec" id="articles" data-edit-section="reviews">
    <div class="sec-head">
      <div>
        <small class="sec-kicker">EDITORIAL JOURNAL &amp; TASTING NOTES</small>
        <h2>${a.articlesSectionTitle}</h2>
      </div>
      <p>${a.articlesSectionSubtitle}</p>
    </div>
    <div class="articles-grid">
      ${a.defaultArticles.map((d) => `
      <article class="art-card">
        <div>
          <div class="art-meta">
            <span>${d.tag}</span>
            <span class="rt">${d.readTime}</span>
          </div>
          <h3>${d.title}</h3>
          <p>${d.summary}</p>
        </div>
        <a href="#contact" class="art-link inquire-trigger" data-item="${d.title}">Request Tasting Monograph →</a>
      </article>`).join("")}
    </div>
  </section>

  <!-- ── CLIENT & PARTNER ENDORSEMENTS ── -->
  <section class="sec" id="reviews" data-edit-section="reviews">
    <div class="sec-head">
      <div>
        <small class="sec-kicker">VERIFIED SOMMELIER &amp; CHEF ENDORSEMENTS</small>
        <h2>Culinary &amp; Industry <em>Reviews</em></h2>
      </div>
    </div>
    <div class="grid-4">
      ${o.reviews.map((d, f) => `
      <div class="card">
        <div>
          <div style="color:var(--pri);letter-spacing:3px;margin-bottom:8px;font-size:.78rem">✦ VERIFIED CRITIC</div>
          <p data-edit-path="reviews.${f}.quote" data-edit-label="Review #${f + 1} Quote">"${d.quote}"</p>
        </div>
        <div>
          <strong style="display:block;color:#fff;font-size:.92rem" data-edit-path="reviews.${f}.name" data-edit-label="Review #${f + 1} Author">${d.name}</strong>
          <small style="color:var(--mut);font-size:.76rem" data-edit-path="reviews.${f}.role" data-edit-label="Review #${f + 1} Role">${d.role}</small>
        </div>
      </div>`).join("")}
    </div>
  </section>

  <!-- ── DIRECT CONTACT & INQUIRY CONCIERGE (NO CHECKOUT FLOW) ── -->
  <section class="sec" id="contact" data-edit-section="footer">
    <div class="contact-wrap">
      <div class="contact-info">
        <small style="font-family:var(--font-mono);color:var(--pri);letter-spacing:.18em;font-weight:700;display:block;margin-bottom:6px;font-size:.64rem">DIRECT TASTING &amp; INQUIRY DESK</small>
        <h3 data-edit-path="footerHeadline" data-edit-label="Contact Headline">${o.footerHeadline || a.contactTitle}</h3>
        <p data-edit-path="footerSubtext" data-edit-label="Contact Subtext">${o.footerSubtext || a.contactSubtitle}</p>
        <div class="hub-box">
          <small>GLOBAL HUBS &amp; ATELIERS</small>
          <strong>${a.contactHubs}</strong>
        </div>
        <div class="hub-box">
          <small>DIRECT CONCIERGE DISPATCH</small>
          <strong>concierge@${o.brandName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com</strong>
        </div>
      </div>

      <form class="contact-form" id="directInquiryForm" onsubmit="event.preventDefault(); window.top && window.top.postMessage({type:'INQUIRY_SUBMIT', data:'success'}, '*'); document.getElementById('inqSuccess').style.display='block'; return false;">
        <div class="row-2">
          <input type="text" name="full_name" required placeholder="Your Full Name / Title" />
          <input type="email" name="email" required placeholder="Email Address" />
        </div>
        <div class="row-2">
          <input type="text" name="organization" placeholder="Venue / Organization" />
          <input type="text" name="subject" id="inquirySubjectInput" placeholder="Subject / Flavor or Spice Spec" />
        </div>
        <textarea rows="3" name="message" required placeholder="${a.contactFormPlaceholder}"></textarea>
        <button type="submit" class="btn" style="justify-content:center;width:100%" data-edit-path="footerCta" data-edit-label="Contact Submit Button">${o.footerCta || a.contactSubmitText}</button>
        <p id="inqSuccess" style="display:none;color:var(--pri);font-size:.82rem;font-weight:700;margin-top:6px;text-align:center">✓ Direct inquiry received. Our concierge will reply within 4 hours.</p>
      </form>
    </div>
  </section>

  <!-- ── FOOTER WITH PERMANENTLY LOCKED POWERED BY EFERZ WATERMARK ── -->
  <footer>
    <div class="foot-top">
      <div>
        <strong style="font-family:var(--font-display);letter-spacing:.12em;font-size:1.2rem">${o.brandName}</strong>
        <p style="color:var(--mut);font-size:.8rem;margin-top:3px">${o.brandTag} · ${a.stackLabel}</p>
      </div>
      <div style="display:flex;gap:20px;font-size:.78rem;color:var(--mut)">
        <a href="#tH" style="color:inherit;text-decoration:none">3D Stage</a>
        <a href="#products" style="color:inherit;text-decoration:none">Collection</a>
        <a href="#articles" style="color:inherit;text-decoration:none">Journal</a>
        <a href="#contact" style="color:inherit;text-decoration:none">Contact</a>
      </div>
    </div>

    <!-- LOCKED WATERMARK: POWERED BY EFERZ (EFERZ.COM) -->
    <div class="locked-watermark-bar" title="Locked EFerz Watermark">
      <div>
        © ${(/* @__PURE__ */ new Date()).getFullYear()} <strong style="color:#fff">${o.brandName}</strong>. All Rights Reserved.
      </div>
      <a href="https://eferz.com" target="_blank" rel="noopener noreferrer" class="efforts-badge">
        <i class="lock-icon">🔒</i>
        <span>Powered by <strong>EFerz</strong> (<strong style="text-decoration:underline">EFerz.com</strong>)</span>
      </a>
    </div>
  </footer>
</main>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<script>
(function initUniversalScope(){
  if (typeof THREE === 'undefined') {
    setTimeout(initUniversalScope, 40);
    return;
  }
  const CONFIG = ${r};
  const $ = id => document.getElementById(id);
  const clamp = (x, a=0, b=1) => Math.max(a, Math.min(b, x));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = x => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

  /* ── 1. DIRECT CLICK-ANY-TEXT INLINE EDITING ENGINE ── */
  const banner = $('inline-edit-Banner');
  const bannerText = $('inline-edit-status');
  let activeEditingNode = null;

  function showToast(msg) {
    const t = $('toast');
    if (!t) return;
    t.innerText = msg;
    t.classList.add('on');
    clearTimeout(t._tm);
    t._tm = setTimeout(() => t.classList.remove('on'), 2200);
  }

  document.querySelectorAll('[data-edit-path]').forEach(el => {
    el.setAttribute('title', 'Click to edit text directly');
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      const path = el.getAttribute('data-edit-path');
      const label = el.getAttribute('data-edit-label') || path;
      const section = el.closest('[data-edit-section]')?.getAttribute('data-edit-section') || 'brand';
      const curVal = el.innerText.trim();

      if (activeEditingNode && activeEditingNode !== el) {
        activeEditingNode.classList.remove('active-text-node');
        activeEditingNode.removeAttribute('contenteditable');
      }

      activeEditingNode = el;
      el.classList.add('active-text-node');
      el.setAttribute('contenteditable', 'true');
      el.focus();

      if (banner && bannerText) {
        bannerText.innerHTML = 'Editing <strong>' + label + '</strong> · Press Enter or click away to save';
        banner.classList.add('on');
      }

      window.parent && window.parent.postMessage({
        type: 'UNIVERSAL_ELEMENT_CLICK',
        section: section,
        label: label,
        path: path,
        currentValue: curVal
      }, '*');
    });

    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        el.blur();
      }
    });

    el.addEventListener('blur', () => {
      const path = el.getAttribute('data-edit-path');
      const label = el.getAttribute('data-edit-label') || path;
      const newVal = el.innerText.trim();
      el.classList.remove('active-text-node');
      el.removeAttribute('contenteditable');
      if (banner) banner.classList.remove('on');

      showToast('Updated ' + label);

      window.parent && window.parent.postMessage({
        type: 'UNIVERSAL_TEXT_EDIT',
        path: path,
        value: newVal,
        label: label
      }, '*');
    });
  });

  /* Inquire buttons autofill contact form */
  document.querySelectorAll('.inquire-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const item = btn.getAttribute('data-item');
      const subInput = $('inquirySubjectInput');
      if (subInput && item) {
        subInput.value = 'Inquiry: ' + item;
      }
    });
  });

  /* Stage Nav Dots click handler */
  document.querySelectorAll('.stage-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const target = dot.getAttribute('data-jump');
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ── 2. THREE.JS 3D PROCEDURAL SCENE (MELTO ICE CREAM & DESI SPICES) ── */
  const canvas = $('gl');
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 7.8);

  const ambient = new THREE.AmbientLight(0xffffff, 1.4);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(CONFIG.primaryHex, 2.8);
  keyLight.position.set(4, 5, 4);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(CONFIG.secondaryHex, 2.2);
  fillLight.position.set(-4, -2, -3);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0xffffff, 2.2, 14);
  rimLight.position.set(0, 4, -3);
  scene.add(rimLight);

  const rootGroup = new THREE.Group();
  scene.add(rootGroup);

  const priMat = new THREE.MeshStandardMaterial({
    color: CONFIG.primaryHex,
    roughness: 0.32,
    metalness: 0.22,
  });
  const secMat = new THREE.MeshStandardMaterial({
    color: CONFIG.secondaryHex,
    roughness: 0.45,
    metalness: 0.15,
  });
  const darkStone = new THREE.MeshStandardMaterial({
    color: 0x1f191b,
    roughness: 0.88,
    metalness: 0.1,
  });
  const waffleMat = new THREE.MeshStandardMaterial({
    color: 0xd49b55,
    roughness: 0.75,
    metalness: 0.05,
  });
  const chocoMat = new THREE.MeshStandardMaterial({
    color: 0x2b140e,
    roughness: 0.25,
    metalness: 0.15,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.55,
    roughness: 0.1,
    transmission: 0.75,
    thickness: 1.2,
  });
  const goldBrassMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    roughness: 0.28,
    metalness: 0.85,
  });
  const glowMat = new THREE.MeshBasicMaterial({ color: CONFIG.primaryHex });

  /* Studio Podium */
  const podium = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.4, 0.16, 64), darkStone);
  podium.position.y = -2.45;
  const podiumRing = new THREE.Mesh(new THREE.TorusGeometry(3.1, 0.03, 16, 96), glowMat);
  podiumRing.rotation.x = Math.PI / 2;
  podiumRing.position.y = -2.36;
  scene.add(podium, podiumRing);

  /* Atmospheric Dust Particles */
  const pCount = 200;
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    pPos.set([(Math.random() - 0.5) * 24, (Math.random() - 0.5) * 16, (Math.random() - 0.5) * 12 - 2], i * 3);
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMesh = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: CONFIG.primaryHex, size: 0.08, transparent: true, opacity: 0.5 }));
  scene.add(pMesh);

  /* 4 Sub-Groups for Stage Assembly */
  const parts = {
    a: new THREE.Group(),
    b: new THREE.Group(),
    c: new THREE.Group(),
    d: new THREE.Group(),
  };
  rootGroup.add(parts.a, parts.b, parts.c, parts.d);

  const sceneType = CONFIG.sceneType;

  if (sceneType === 'melto-icecream') {
    /* ── MELTO 3D PROCEDURAL ICE CREAM CONE & GELATO DIPS ── */
    // Part A: Crisp Waffle Cone
    const coneGeo = new THREE.ConeGeometry(1.2, 3.4, 32);
    coneGeo.rotateX(Math.PI);
    const coneMesh = new THREE.Mesh(coneGeo, waffleMat);
    coneMesh.position.y = -1.2;
    parts.a.add(coneMesh);

    // Waffle Texture Grid Rings
    for (let r = 0; r < 5; r++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.3 + r * 0.22, 0.025, 8, 32), darkStone);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -2.4 + r * 0.55;
      parts.a.add(ring);
    }

    // Part B: Big Swirled Gelato Scoop
    const scoopGeo = new THREE.SphereGeometry(1.35, 48, 36);
    const scoopMesh = new THREE.Mesh(scoopGeo, priMat);
    scoopMesh.position.y = 0.85;
    
    // Top swirl dollop
    const topDollop = new THREE.Mesh(new THREE.ConeGeometry(0.7, 0.9, 24), priMat);
    topDollop.position.y = 2.1;
    parts.b.add(scoopMesh, topDollop);

    // Part C: Dipped 72% Dark Chocolate Shell & Dripping Drops
    const dipCap = new THREE.Mesh(new THREE.SphereGeometry(1.39, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.45), chocoMat);
    dipCap.position.y = 0.85;
    
    // Dripping chocolate drops on sides
    const drip1 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.14, 0.65, 16), chocoMat);
    drip1.position.set(1.15, 0.4, 0.4);
    const drip2 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.12, 0.85, 16), chocoMat);
    drip2.position.set(-1.18, 0.25, -0.3);
    parts.c.add(dipCap, drip1, drip2);

    // Sprinkled Pistachio & Honeycomb Shards
    for (let s = 0; s < 18; s++) {
      const ang = (s / 18) * Math.PI * 2;
      const rad = 0.85 + Math.random() * 0.45;
      const shard = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 0.14), s % 2 === 0 ? goldBrassMat : priMat);
      shard.position.set(Math.cos(ang) * rad, 1.4 + Math.random() * 0.6, Math.sin(ang) * rad);
      shard.rotation.set(Math.random(), Math.random(), Math.random());
      parts.c.add(shard);
    }

    // Part D: Cryo Frost Halo & Artisan Spoon
    const frostRing = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.04, 16, 72), glassMat);
    frostRing.rotation.x = Math.PI / 2;
    frostRing.position.y = 0.6;
    const spoon = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 3.2, 16), goldBrassMat);
    spoon.rotation.z = Math.PI / 4;
    spoon.position.set(1.6, 0.6, 0);
    parts.d.add(frostRing, spoon);

  } else {
    /* ── DESI SPICES 3D PROCEDURAL BLACK GRANITE MORTAR & WHOLE SPICES ── */
    // Part A: Heavy Granite Mortar Bowl & Angled Pestle
    const mortarOuter = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 1.6, 1.6, 36), darkStone);
    mortarOuter.position.y = -0.7;
    const mortarRim = new THREE.Mesh(new THREE.TorusGeometry(2.08, 0.18, 16, 48), darkStone);
    mortarRim.rotation.x = Math.PI / 2;
    mortarRim.position.y = 0.1;
    const pestle = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.52, 2.6, 24), darkStone);
    pestle.rotation.z = 0.42;
    pestle.rotation.x = 0.25;
    pestle.position.set(0.65, 0.45, 0.1);
    parts.a.add(mortarOuter, mortarRim, pestle);

    // Part B: Whole Heirloom Spices (Star Anise, Cinnamon, Cardamom)
    // Star Anise (8-pointed star arms)
    const starCenter = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 12), secMat);
    for (let a = 0; a < 8; a++) {
      const armAng = (a / 8) * Math.PI * 2;
      const arm = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.65, 12), secMat);
      arm.rotation.z = armAng - Math.PI / 2;
      arm.position.set(Math.cos(armAng) * 0.35, Math.sin(armAng) * 0.35, 0);
      starCenter.add(arm);
    }
    starCenter.position.set(-1.6, 1.1, 0.6);
    starCenter.rotation.x = 0.4;
    parts.b.add(starCenter);

    // Ceylon Cinnamon Sticks (rolled hollow cylinders)
    const cin1 = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 2.2, 16, 1, true), secMat);
    cin1.rotation.set(0.6, 0.8, -0.4);
    cin1.position.set(1.4, 0.9, -0.5);
    parts.b.add(cin1);

    // Green Cardamom Pods (elongated ribbed ellipsoids)
    for (let c = 0; c < 5; c++) {
      const ang = (c / 5) * Math.PI * 2;
      const card = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 12), priMat);
      card.scale.set(1, 1.9, 1);
      card.position.set(Math.cos(ang) * 1.3, -0.15 + (c % 2) * 0.25, Math.sin(ang) * 1.3);
      card.rotation.set(Math.random(), Math.random(), Math.random());
      parts.b.add(card);
    }

    // Part C: Golden Turmeric & Kashmiri Mirch Ground Dust Swirl
    const powderBed = new THREE.Mesh(new THREE.CylinderGeometry(1.65, 1.1, 0.3, 32), priMat);
    powderBed.position.y = -0.05;
    const mirchAccent = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.5, 0.32, 24), secMat);
    mirchAccent.position.set(0.3, -0.04, 0.2);
    parts.c.add(powderBed, mirchAccent);

    // Part D: Airtight Glass Spice Apothecary Jar with Brass Lid
    const jar = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 1.8, 32), glassMat);
    jar.position.set(-2.2, -0.6, -0.8);
    const jarLid = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.25, 32), goldBrassMat);
    jarLid.position.set(-2.2, 0.35, -0.8);
    const jarSpice = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.78, 1.3, 32), priMat);
    jarSpice.position.set(-2.2, -0.7, -0.8);
    parts.d.add(jar, jarLid, jarSpice);
  }

  /* ── 3. INTERACTIVE 360° DRAG ORBIT CONTROLS ── */
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let targetRotX = 0.2;
  let targetRotY = -0.3;
  let curRotX = 0.2;
  let curRotY = -0.3;

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  window.addEventListener('mouseup', () => { isDragging = false; });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - prevMouseX;
    const dy = e.clientY - prevMouseY;
    targetRotY += dx * 0.008;
    targetRotX += dy * 0.008;
    targetRotX = clamp(targetRotX, -1.0, 1.0);
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  /* Touch Drag Orbit */
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => { isDragging = false; });

  canvas.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - prevMouseX;
    const dy = e.touches[0].clientY - prevMouseY;
    targetRotY += dx * 0.01;
    targetRotX += dy * 0.01;
    targetRotX = clamp(targetRotX, -1.0, 1.0);
    prevMouseX = e.touches[0].clientX;
    prevMouseY = e.touches[0].clientY;
  }, { passive: true });

  /* ── 4. SCROLL-DRIVEN 3D CHOREOGRAPHY LOOP ── */
  const sprog = $('sprog');
  const stageDots = document.querySelectorAll('.stage-dot');

  function render(time) {
    requestAnimationFrame(render);
    const t = time * 0.001;

    // Smooth drag interpolation
    curRotX = lerp(curRotX, targetRotX, 0.08);
    curRotY = lerp(curRotY, targetRotY, 0.08);

    // Scroll progress calculation
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const scrollP = clamp(maxScroll > 0 ? scrollY / maxScroll : 0, 0, 1);

    if (sprog) sprog.style.transform = 'scaleX(' + scrollP + ')';

    // Auto rotate slow drift when not dragging
    const idleSpin = isDragging ? 0 : Math.sin(t * 0.5) * 0.08;

    rootGroup.rotation.x = curRotX;
    rootGroup.rotation.y = curRotY + idleSpin;

    // Stage progression dynamics
    const s1 = clamp(scrollY / (window.innerHeight * 1.55), 0, 1);
    const s2 = clamp((scrollY - window.innerHeight * 1.55) / (window.innerHeight * 1.55), 0, 1);
    const s3 = clamp((scrollY - window.innerHeight * 3.1) / (window.innerHeight * 1.55), 0, 1);
    const s4 = clamp((scrollY - window.innerHeight * 4.65) / (window.innerHeight * 1.55), 0, 1);

    // Update active stage dot
    const stageIdx = scrollY < window.innerHeight * 0.9 ? 0 :
                     s2 < 0.2 ? 1 :
                     s3 < 0.2 ? 2 :
                     s4 < 0.2 ? 3 : 4;
    stageDots.forEach((d, i) => {
      d.classList.toggle('on', i === stageIdx);
    });

    if (sceneType === 'melto-icecream') {
      parts.a.position.y = lerp(-0.2, 0.1, s1);
      parts.b.position.y = lerp(0.85, 0.95 + Math.sin(t * 2) * 0.05, s2);
      parts.c.position.y = lerp(0.85, 0.95, s3);
      parts.d.rotation.y = t * 0.5;
    } else {
      parts.a.rotation.y = Math.sin(t * 0.8) * 0.1;
      parts.b.position.y = Math.sin(t * 1.5) * 0.12;
      parts.c.rotation.y = t * 0.4;
      parts.d.position.y = -0.6 + Math.sin(t * 1.2) * 0.08;
    }

    pMesh.rotation.y = t * 0.03;
    renderer.render(scene, camera);
  }

  requestAnimationFrame(render);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();
})();
<\/script>
</body>
</html>`;
  }
  const n6 = ({ config: o, inspectorEnabled: r = true, onSelectElement: a, onInlineTextChange: s }) => {
    const c = z.useRef(null), u = z.useMemo(() => a6(o), [o]);
    return z.useEffect(() => {
      const d = (f) => {
        !f.data || typeof f.data != "object" || (f.data.type === "UNIVERSAL_ELEMENT_CLICK" ? a == null || a(f.data.section, f.data.label, f.data.path, f.data.currentValue) : f.data.type === "UNIVERSAL_TEXT_EDIT" && (s == null || s(f.data.path, f.data.value)));
      };
      return window.addEventListener("message", d), () => window.removeEventListener("message", d);
    }, [a, s]), n.jsxDEV("iframe", { ref: c, title: `${o.brandName} Live 3D Experience`, srcDoc: u, className: "w-full h-full border-0 bg-transparent block", sandbox: "allow-scripts allow-same-origin allow-forms" }, void 0, false);
  }, fh = [{ id: "melto-icecream-3d", categoryId: "icecream-gelato", categoryTitle: "Ice Cream, Gelato & Frozen Confections", categoryTitleAr: "الآيس كريم والجيلاتو والحلويات المثلجة الحرفية", subCategoryTitle: "MELTO — 3D Waffle Cone, 72% Belgian Dip & -18°C Cryo Churn", subCategoryTitleAr: "MELTO — جيلاتو الحرفي وتغميس المخروط وغرفة التجميد ثلاثية الأبعاد", sceneType: "melto-icecream", brandName: "MELTO", brandTag: "ARTISAN GELATO & COLD CHURN", logoImageUrl: null, primaryHex: "#E29578", secondaryHex: "#522E2A", bgDarkHex: "#140D0F", bgMidHex: "#261619", navLinks: ["Flavors", "Cold Churn", "Artisan Dip", "Scoop Vault"], navCta: "Tasting Flight", heroBadge: "🍦 ARTISAN FROZEN CONFECTIONS · 2026 COLLECTION", heroTitle1: "MELT INTO", heroTitleAccent: "PURE GELATO", heroSubtitle: "Scroll to experience slow-churned Madagascar vanilla and Bronte pistachio cream freeze at -18°C, dip into single-origin 72% Belgian chocolate, and pack into bespoke chilled insulated coffrets.", heroDragHint: "⟷ DRAG 3D GELATO SCOOP & CONE TO ROTATE 360°", promoBadgeTop: "-18°C", promoBadgeBottom: "SLOW CHURN", promoCode: "MELTO2026", marqueeItems: ["🍦 100% ORGANIC JERSEY MILK", "🍫 72% BELGIAN CRACKING SHELL", "❄️ -18°C CRYOGENIC CHURN", "🌰 BRONTE PISTACHIO PASTE", "🌿 ZERO ARTIFICIAL GUMS"], stages: [{ stepNumber: "01", badge: "STAGE 01 · CRYOGENIC SLOW CHURN", title: "Fresh Jersey Dairy &", highlight: "Bourbon Vanilla", description: "100% organic Jersey cream infused with split Madagascar Bourbon vanilla pods, chilled at -18°C to produce velvety micro-crystals without overrun air.", metricValue: "-18°", metricUnit: "CELSIUS", metricLabel: "CHURN TEMPERATURE" }, { stepNumber: "02", badge: "STAGE 02 · CRISP CONE & BELGIAN DIP", title: "Hand-Rolled Waffle &", highlight: "72% Dark Shell", description: "Freshly griddled waffle cones rolled warm by hand, dipped into warm single-origin 72% Belgian chocolate that instantly snaps into a crunchy shell.", metricValue: "72%", metricUnit: "CACAO", metricLabel: "BELGIAN CHOCOLATE" }, { stepNumber: "03", badge: "STAGE 03 · ARTISAN SWIRL & CRUNCH", title: "Layered Pistachio &", highlight: "Golden Honeycomb", description: "Pure Sicilian Bronte pistachio paste folded with caramel ribbons and sea-salted honeycomb crunch shards for layered texture in every bite.", metricValue: "100%", metricUnit: "NATURAL", metricLabel: "WHOLE BOTANICALS" }, { stepNumber: "04", badge: "STAGE 04 · SUBLIME SCOOP VAULT", title: "Preserved at -12°C for", highlight: "Silky Mouthfeel", description: "Stored inside precision sub-zero nitrogen gelato vaults ready for private tasting flights, luxury events, and temperature-guaranteed door delivery.", metricValue: "48H", metricUnit: "FROZEN", metricLabel: "INSULATED VAULT" }], productsTitle: "Artisan Gelato Flavors", productsSubtitle: "Select any signature creation to inspect milk fat profiles, origin notes, or click any text directly on screen to customize.", products: [{ code: "PST-01", name: "Bronte Pistachio Velvet", subtitle: "DOP Sicilian Roasted Pistachio Cream", price: "$14.50 / Pint", description: "Slow-churned Jersey cream folded with slow-roasted green pistachios from Mount Etna, finished with roasted nut shards.", specs: ["Milk: 100% Jersey Cow", "Temp: -18°C Stable", "Shell: Crushed Pistachio"], accentHex: "#84cc16" }, { code: "NOIR-72", name: "Belgian Noir & Fleur de Sel", subtitle: "72% Single-Origin Cocoa with Flaky Salt", price: "$15.00 / Pint", description: "Intense single-origin Ecuadorian dark chocolate gelato balanced with mineral-rich Guérande sea-salt crystals.", specs: ["Origin: Ecuador 72%", "Texture: Velvet Dense", "Salt: Guérande Flakes"], accentHex: "#E29578" }, { code: "MNG-KES", name: "Alphonso Mango & Saffron Ribbon", subtitle: "Pure Ratnagiri Mango Swirl & Kashmiri Kesar", price: "$14.00 / Pint", description: "Sun-ripened Alphonso mango pulp churned with pure Kashmiri saffron threads and cold-pressed lime juice.", specs: ["Fruit: 75% Pure Pulp", "Dairy: Dairy-Free Sorbetto", "Infusion: Saffron Threads"], accentHex: "#f59e0b" }, { code: "CRML-88", name: "Burnt Butter Honeycomb", subtitle: "Salted Golden Toffee with Crunchy Honeycomb", price: "$15.50 / Pint", description: "Caramelized French butter gelato with crisp wild flower honeycomb rocks that melt slowly on the tongue.", specs: ["Caramel: Slow Browned", "Crunch: Organic Honeycomb", "Finish: Madagascar Bourbon"], accentHex: "#d97706" }], stats: [{ value: "-18°C", label: "Cryo-Freeze Precision" }, { value: "100%", label: "Clean Jersey Milk" }, { value: "72%", label: "Belgian Cocoa Shell" }, { value: "0g", label: "Artificial Emulsifiers" }], reviews: [{ name: "Chef Matteo Rossi", role: "Michelin Pastry Director", quote: "Melto’s texture achieves that rare micro-crystalline creaminess you only find in Bologna’s finest historic gelaterias." }, { name: "Clara Beauchamp", role: "Food & Wine Editor", quote: "The cracking snap of the dark chocolate shell against the velvety pistachio is pure sensory poetry." }, { name: "Zayn Malik", role: "Culinary Critic", quote: "Zero ice crystals, incredible depth of real vanilla, and arrived completely frozen in their insulated nitrogen box." }], footerHeadline: "READY FOR A PRIVATE TASTING FLIGHT?", footerSubtext: "Request bespoke gelato catering for private events, luxury culinary showcases, or hospitality wholesale accounts.", footerCta: "BOOK PRIVATE TASTING →" }, { id: "desi-spices-3d", categoryId: "traditional-spices", categoryTitle: "Traditional Spices & Seasonings", categoryTitleAr: "التوابل والبهارات التراثية والمصالحات الطبيعية", subCategoryTitle: "DESI SPICES — 3D Granite Mortar, Whole Spice Volatiles & Slow Stone-Ground Masaley", subCategoryTitleAr: "DESI SPICES — الهاون الحجري وطحن البهارات التراثية ثلاثية الأبعاد", sceneType: "desi-spices-mortar", brandName: "DESI SPICES", brandTag: "HERITAGE STONE-GROUND MASALEY", logoImageUrl: null, primaryHex: "#E59500", secondaryHex: "#C02626", bgDarkHex: "#120A05", bgMidHex: "#251307", navLinks: ["Heritage Blends", "Stone Chakki", "Volatile Oils", "Chef Vault"], navCta: "Request Spice Kit", heroBadge: "🌶️ HERITAGE HARVEST · 100% PURE STONE-GROUND", heroTitle1: "SLOW GROUND", heroTitleAccent: "DESI SPICES", heroSubtitle: "Scroll to witness sun-cured whole spices hand-crushed in our heavy black granite mortar, watch volatile essential oils release under low-RPM stone grinding, and seal in airtight glass apothecary jars.", heroDragHint: "⟷ DRAG 3D GRANITE MORTAR & WHOLE SPICES TO ROTATE 360°", promoBadgeTop: "100%", promoBadgeBottom: "PURE AROMA", promoCode: "DESI2026", marqueeItems: ["🌶️ ZERO ARTIFICIAL COLOR", "🪨 SLOW GRANITE STONE CHAKKI", "🌿 HIGH VOLATILE ESSENTIAL OILS", "☀️ SUN-DRIED UNPOLISHED CROPS", "🏺 AIRTIGHT GLASS APOTHECARY"], stages: [{ stepNumber: "01", badge: "STAGE 01 · SUN-CURED HERITAGE HARVEST", title: "Sun-Ripened Pods &", highlight: "Mountain Bark", description: "Select single-origin whole pods, bark, and wild rhizomes dried on natural clay courtyards under peak desert sun to lock rich essential oils.", metricValue: "100%", metricUnit: "NATURAL", metricLabel: "SUN-CURED SELECTION" }, { stepNumber: "02", badge: "STAGE 02 · BLACK GRANITE MORTAR", title: "Hand-Cracking Whole", highlight: "Cardamom & Star Anise", description: "Heavy carved black granite mortar and pestle hand-crushes whole spices to fracture the outer seed coats, releasing intense volatile aroma notes.", metricValue: "16", metricUnit: "WHOLE", metricLabel: "HEIRLOOM SPICES" }, { stepNumber: "03", badge: "STAGE 03 · SLOW STONE CHAKKI MILLING", title: "Sub-45°C Cold Grind", highlight: "Preserves Fragrance", description: "Traditional heavy granite stone chakki mills operate at gentle low RPM so heat friction never burns the delicate natural spices.", metricValue: "<45°", metricUnit: "CELSIUS", metricLabel: "COLD MILLING TEMP" }, { stepNumber: "04", badge: "STAGE 04 · AIRTIGHT GLASS APOTHECARY", title: "Induction-Sealed in", highlight: "UV Amber Jars", description: "Sealed inside food-grade amber glass apothecary jars with oxygen-barrier seals to ensure your masaley arrive kitchen-fresh with zero loss of aroma.", metricValue: "365", metricUnit: "DAYS", metricLabel: "FRESHNESS SEAL" }], productsTitle: "Signature Heritage Masaley", productsSubtitle: "Select any stone-ground master blend to inspect whole spice ratios, pungency ratings, or click any text on screen to edit live.", products: [{ code: "GM-16", name: "Shahi Royal Garam Masala", subtitle: "16 Whole Spices with Black Cardamom & Mace", price: "$16.50 / 250g Jar", description: "Hand-roasted whole spices stone-ground together with Ceylon cinnamon, green and black cardamom, star anise, nutmeg, and cloves.", specs: ["Blend: 16 Whole Spices", "Milling: Cold Stone Chakki", "Aroma: Warm Woody Spice"], accentHex: "#E59500" }, { code: "KM-01", name: "Kashmiri Lal Mirch (Stemless)", subtitle: "Vibrant Sun-Dried Crimson Chili with Gentle Smoke", price: "$14.00 / 200g Jar", description: "Naturally sun-dried Kashmiri chilies stone-ground to impart rich, vibrant crimson red color without blistering heat or added artificial food dye.", specs: ["Heat: 1,500 SHU (Mild)", "Color: Deep Crimson Red", "Purity: Zero Added Color"], accentHex: "#C02626" }, { code: "LK-75", name: "Golden Lakadong Turmeric", subtitle: "High 7.5% Curcumin Wild Mountain Harvest", price: "$18.00 / 250g Jar", description: "Wild-harvested mountain turmeric rhizomes tested at 7.5% natural curcumin, offering deep earthy aroma and bright golden hue.", specs: ["Curcumin: 7.5% Guaranteed", "Soil: Meghalaya Hills", "Roots: Unpolished Sun-Cured"], accentHex: "#f59e0b" }, { code: "BY-POT", name: "Imperial Shahi Biryani Potli", subtitle: "Whole-Leaf Muslin Sachet with Shahi Zeera & Anise", price: "$15.00 / 6 Pouches", description: "Pure unground whole spice bouquet enclosed in organic cotton muslin sachets, engineered to perfume royal dum biryani rice without leaving gritty residue.", specs: ["Format: Muslin Cotton Potli", "Cuisine: Dum Biryani & Pulao", "Yield: 6 Royal Feasts"], accentHex: "#10b981" }], stats: [{ value: "7.5%", label: "Peak Curcumin Potency" }, { value: "100%", label: "Unadulterated Single-Origin" }, { value: "<45°C", label: "Cold Stone Chakki Temp" }, { value: "0g", label: "Zero Preservatives & Starch" }], reviews: [{ name: "Chef Asim Baig", role: "Executive Chef, Heritage Bukhara", quote: "Desi Spices Garam Masala has that authentic slow-stone aroma that industrial pre-packaged powders completely lose. It transforms every handi." }, { name: "Shireen Anwar", role: "Master Culinary Artist", quote: "The Kashmiri chili color is naturally breathtaking and the Lakadong turmeric aroma fills the whole kitchen. Truly pure heirloom spices." }, { name: "Tariq Aziz", role: "Spice Connoisseur & Food Historian", quote: "Finally, real traditional spices packed in heavy glass jars with zero fillers or synthetic dyes. This is how spices were ground a century ago." }], footerHeadline: "PARTNER WITH OUR SPICE ATELIER", footerSubtext: "Inquire for private restaurant culinary blends, wholesale gourmet accounts, or tasting sample collections.", footerCta: "REQUEST CHEF SPICE KIT →" }], hh = [{ id: "food-beverage", title: "01. Food, Beverage & Juice Cans", titleAr: "01. الأغذية والمشروبات وعصائر الفواكه 3D", subtitle: "3D Drink Cans, 6-Stage Can Forming, 330ml Nozzle Fill, Pop, Pour & Variety Box", subtitleAr: "عبوات مشروبات ثلاثية الأبعاد، تشكيل العبوة، سكب الكأس وتعبئة الصندوق", description: "Complete FIZZO 3D interactive website with Three.js cans, Variety Box packing choreography, glass pour with ice, and click-any-text editing.", descriptionAr: "موقع FIZZO التفاعلي ثلاثي الأبعاد بالكامل مع تدوير العبوة بالماوس، تعبئة الصندوق، سكب الكأس، وميزة التعديل المباشر لأي نص.", badge: "LIVE 3D CAN + BOX", badgeAr: "نموذج 3D متاح", isAvailable: true, accent: "#FF5500", subCategoriesCount: 1 }, { id: "icecream-gelato", title: "02. Ice Cream, Gelato & Frozen Treats", titleAr: "02. الآيس كريم والجيلاتو والحلويات المثلجة", subtitle: "Exact 3D Pint Tub, Hand-Churned Creamery, Instanced Sprinkles & Flavour Tasting", subtitleAr: "مخروط وعبوة الآيس كريم، الكريمة الحرفية وتدوير العبوة ثلاثية الأبعاد 3D", description: "Exact Melto Creamery 3D experience with real-time Three.js pint tub, rich scoops, sprinkle physics, smooth scroll transitions, and click-any-text editing.", descriptionAr: "تصميم Melto Creamery ثلاثي الأبعاد الحقيقي مع عبوة الآيس كريم، الكريمة الحرفية، وتجربة تصفح ثلاثية الأبعاد كاملة.", badge: "EXACT 3D PINT TUB", badgeAr: "نموذج 3D متاح", isAvailable: true, accent: "#ff5c8a", subCategoriesCount: 1 }, { id: "traditional-spices", title: "03. Traditional Spices & Seasonings", titleAr: "03. التوابل والبهارات التراثية والمصالحات", subtitle: "Exact 3D Lathe Glass Jar, Sun-Cured Masalas, Heat Ratings & 3D Jar Rotation", subtitleAr: "الجار الزجاجي، البهارات التراثية، مقياس الحرارة وتدوير الجار بالماوس 3D", description: "Exact Zaika Pantry 3D experience with Three.js lathe glass jars, lid textures, heat ratings, 6 pantry products, smooth scroll transitions, and click-any-text editing.", descriptionAr: "تصميم Zaika Pantry ثلاثي الأبعاد الحقيقي مع الجار الزجاجي ثلاثي الأبعاد، بهارات ومخللات، وميزة التعديل المباشر.", badge: "EXACT 3D GLASS JAR", badgeAr: "نموذج 3D متاح", isAvailable: true, accent: "#e0881c", subCategoriesCount: 1 }, { id: "beauty-cosmetics", title: "04. Beauty, Skincare & Luxury Cosmetics", titleAr: "04. الجمال والعناية بالبشرة ومستحضرات التجميل", subtitle: "3D Glass Dropper Serums, French Cream Jars, Lipsticks & Botanical Shader Orb", subtitleAr: "عبوات السيروم الزجاجية، كريمات البشرة، أحمر الشفاه وكرة الشيدر 3D", description: "Complete VELORA BOTANICS 3D WebGL experience with 8 physical glass vessels, internal pipettes, gold collars, floating botanical petals, and click-any-text editor.", descriptionAr: "موقع Velora Botanics التفاعلي ثلاثي الأبعاد بالكامل مع 8 منتجات ثلاثية الأبعاد، بتلات طائرة، وميزة التعديل المباشر.", badge: "LIVE 8-VESSEL 3D", badgeAr: "نموذج 3D متاح", isAvailable: true, accent: "#c4506a", subCategoriesCount: 1 }], ox = [{ id: "drink", categoryId: "food-beverage", templateType: "fizzo", title: "FIZZO — 3D Soda Can & Variety Box Packing", titleAr: "FIZZO — عبوة المشروبات الغازية وتعبئة الصندوق 3D", subtitle: "6-Stage 3D Can Forming, 330ml Nozzle Fill, Pop, Glass Pour, Globe & Variety Box", subtitleAr: "تشكيل العبوة، التعبئة، فتح الغطاء، سكب الكأس، وتعبئة الصندوق", description: "Complete FIZZO 3D interactive website with Three.js drag-to-rotate cans, Variety Box packing choreography, Glass Pour with ice, and click-any-text editing.", descriptionAr: "موقع FIZZO التفاعلي ثلاثي الأبعاد بالكامل مع تدوير العبوة بالماوس، تعبئة الصندوق، سكب الكأس، وميزة التعديل المباشر لأي نص.", badge: "LIVE 3D CAN + BOX", badgeAr: "جاهز للتخصيص المباشر", isAvailable: true, accent: "#FF5500" }, { id: "melto-icecream-3d", categoryId: "icecream-gelato", templateType: "melto", title: "MELTO — 3D Ice Cream & Gelato Creamery", titleAr: "MELTO — الآيس كريم والجيلاتو الحرفي ثلاثي الأبعاد 3D", subtitle: "Exact 3D Pint Tub, Lathe Geometry, Instanced Sprinkles & Flavour Explorer", subtitleAr: "عبوة الآيس كريم، الكريمة الحرفية، وتدوير العبوة 3D", description: "Exact Melto Creamery 3D experience with real-time Three.js pint tub, rich scoops, sprinkle physics, smooth scroll transitions, and click-any-text editing.", descriptionAr: "تصميم Melto Creamery ثلاثي الأبعاد الحقيقي مع عبوة الآيس كريم، الكريمة الحرفية، وتجربة تصفح ثلاثية الأبعاد كاملة.", badge: "EXACT 3D PINT TUB", badgeAr: "جاهز للتخصيص المباشر", isAvailable: true, accent: "#ff5c8a", activeSessionBy: "Gelato Chef #104 (Active)" }, { id: "desi-spices-3d", categoryId: "traditional-spices", templateType: "zaika", title: "ZAIKA / DESI — 3D Heritage Spice & Pickle Pantry", titleAr: "ZAIKA — التوابل والمخللات التراثية ثلاثية الأبعاد 3D", subtitle: "Exact 3D Glass Lathe Jar, Heat Meter, Sun-Cured Masalas & 3D Jar Rotation", subtitleAr: "الجار الزجاجي، درجات الحرارة والبهارات التراثية وتدوير الجار 3D", description: "Exact Zaika Pantry 3D experience with Three.js lathe glass jars, lid textures, heat ratings, 6 pantry products, smooth scroll transitions, and click-any-text editing.", descriptionAr: "تصميم Zaika Pantry ثلاثي الأبعاد الحقيقي مع الجار الزجاجي ثلاثي الأبعاد، بهارات ومخللات، وميزة التعديل المباشر.", badge: "EXACT 3D GLASS JAR", badgeAr: "جاهز للتخصيص المباشر", isAvailable: true, accent: "#e0881c", activeSessionBy: "Master Blender #208 (Active)" }, { id: "velora-botanics", categoryId: "beauty-cosmetics", templateType: "velora", title: "VELORA BOTANICS — 8 Haute 3D Skincare Vessels & Shader Orb", titleAr: "VELORA BOTANICS — 8 عبوات عناية بالبشرة وكرة الشيدر 3D", subtitle: "3D Glass Dropper Serums, French Cream Jars, Lipsticks, Parfum & Essence Orb", subtitleAr: "عبوات السيروم الزجاجية، كريمات البشرة، أحمر الشفاه والعطور ثلاثية الأبعاد", description: "Complete Velora Botanics 3D WebGL experience with 8 physical glass vessels, internal pipettes, gold collars, floating botanical petals, and click-any-text editor.", descriptionAr: "موقع Velora Botanics التفاعلي ثلاثي الأبعاد بالكامل مع 8 منتجات ثلاثية الأبعاد، بتلات طائرة، وميزة التعديل المباشر.", badge: "LIVE 8-VESSEL 3D", badgeAr: "جاهز للتخصيص المباشر", isAvailable: true, accent: "#c4506a" }], Zn = ({ label: o, sublabel: r, value: a, onChange: s, accentColor: c = "#FF5500", placeholder: u = "https://...", presetImages: d }) => {
    const f = z.useRef(null), v = (h) => {
      var w;
      const x = (w = h.target.files) == null ? void 0 : w[0];
      if (!x) return;
      const b = new FileReader();
      b.onload = () => {
        typeof b.result == "string" && s(b.result);
      }, b.readAsDataURL(x), h.target.value = "";
    };
    return n.jsxDEV("div", { className: "space-y-2 p-3 rounded-xl bg-white/[0.03] border border-white/10", children: [n.jsxDEV("div", { className: "flex items-center justify-between", children: [n.jsxDEV("label", { className: "text-[10px] font-mono uppercase tracking-wider text-white/80 font-semibold", children: o }, void 0, false), a && n.jsxDEV("button", { type: "button", onClick: () => s(null), className: "text-[10px] font-mono text-rose-300 hover:text-rose-100 underline cursor-pointer", children: "Remove" }, void 0, false)] }, void 0, true), r && n.jsxDEV("p", { className: "text-[10px] text-white/50", children: r }, void 0, false), a && n.jsxDEV("div", { className: "flex items-center gap-3 p-2 rounded-lg bg-black/40 border border-white/15", children: [n.jsxDEV("div", { className: "w-12 h-12 rounded-lg bg-white/10 overflow-hidden shrink-0 flex items-center justify-center p-1 border border-white/20", children: n.jsxDEV("img", { src: a, alt: "Preview", className: "max-w-full max-h-full object-contain" }, void 0, false) }, void 0, false), n.jsxDEV("div", { className: "flex-1 min-w-0", children: [n.jsxDEV("p", { className: "text-[10px] font-mono text-emerald-300 truncate", children: "Asset Applied ✓" }, void 0, false), n.jsxDEV("p", { className: "text-[9px] text-white/50 truncate", children: a.startsWith("data:") ? "Custom Uploaded Image" : a }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { className: "flex items-center gap-2", children: [n.jsxDEV("input", { type: "text", value: a != null && a.startsWith("data:") ? "" : a || "", placeholder: a != null && a.startsWith("data:") ? "Custom uploaded image active" : u, onChange: (h) => s(h.target.value.trim() || null), className: "flex-1 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white placeholder-white/30" }, void 0, false), n.jsxDEV("input", { ref: f, type: "file", accept: "image/*", className: "hidden", onChange: v }, void 0, false), n.jsxDEV("button", { type: "button", onClick: () => {
      var h;
      return (h = f.current) == null ? void 0 : h.click();
    }, style: { borderColor: `${c}55` }, className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] border text-[11px] font-mono uppercase tracking-wider text-white cursor-pointer", children: [n.jsxDEV(Os, { className: "w-3.5 h-3.5", style: { color: c } }, void 0, false), n.jsxDEV("span", { children: "Upload" }, void 0, false)] }, void 0, true)] }, void 0, true), d && d.length > 0 && n.jsxDEV("div", { className: "pt-1", children: [n.jsxDEV("p", { className: "text-[9px] font-mono uppercase text-white/40 mb-1", children: "Presets:" }, void 0, false), n.jsxDEV("div", { className: "flex flex-wrap gap-1.5", children: d.map((h, w) => n.jsxDEV("button", { type: "button", onClick: () => s(h.url), className: "px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] hover:bg-white/15 text-white/80 border border-white/10 cursor-pointer", children: h.label }, w, false)) }, void 0, false)] }, void 0, true)] }, void 0, true);
  }, E3 = () => ({ brandName: "FIZZO", logoImageUrl: null, loaderImageUrl: null, navLinks: ["Flavors", "Can Fill", "Glass Pour", "Variety Box", "Nutrition"], navCtaText: "Crate", heroBadge: "NEW SEASON · SUMMER 2026", heroTitleLine1: "Pop the", heroTitleStroke: "INTO", heroTitleLine3: "Fizz", heroSubtext: "Ice-cold, extra bubbly and made to be shared. Find your flavour in our sleek 330 ml aluminum can, and look under the tab for a free-drink code.", heroScrollHint: "SCROLL ↓ TO EXPLORE CAN FORMING, FILLING, POP, POUR, GLOBE & VARIETY BOX", promoCode: "FIZZ20", promoBadgeTop: "BUY 1", promoBadgeBottom: "GET 1", flavors: [{ name: "ORANGE CRUSH", sub: "Sun-ripened Blood Orange", badge: "🍊 01 / BLOOD ORANGE", title1: "ORANGE", title2: "CRUSH", desc: "Sun-ripened Sicilian blood oranges blended with sparkling mountain water and a zesty peel finish.", price: "$32.00", packLabel: "12-Can Case", ctaText: "Add To Crate — ORANGE CRUSH", calories: "35", sugar: "0g", fiber: "5g", bgHex: "#c84200", canHex: "#ff5500", accentHex: "#ff9a00", caffeine: "0 mg", tastingNotes: "Sweet Sicilian orange, peel zest, light vanilla" }, { name: "BERRY BLAST", sub: "Wild Mixed Berries", badge: "🍓 02 / WILD BERRY", title1: "BERRY", title2: "BLAST", desc: "Crushed Oregon blackberries, tart raspberries, and hibiscus flowers for a bold electric berry punch.", price: "$34.00", packLabel: "12-Can Case", ctaText: "Add To Crate — BERRY BLAST", calories: "35", sugar: "0g", fiber: "5g", bgHex: "#8a0e3b", canHex: "#e01e5a", accentHex: "#ff5c8a", caffeine: "0 mg", tastingNotes: "Raspberry, blackcurrant, wild strawberry" }, { name: "LIME VOLT", sub: "Zesty Key Lime & Mint", badge: "🍋‍🟩 03 / KEY LIME", title1: "LIME", title2: "VOLT", desc: "Crisp Mexican key limes, cooling garden mint, and sea-salt electrolytes for ultimate sub-zero refreshment.", price: "$32.00", packLabel: "12-Can Case", ctaText: "Add To Crate — LIME VOLT", calories: "30", sugar: "0g", fiber: "5g", bgHex: "#15612c", canHex: "#22c55e", accentHex: "#86efac", caffeine: "0 mg", tastingNotes: "Key lime zest, fresh garden mint, green apple" }, { name: "CLASSIC COLA", sub: "Bold Botanical Cola", badge: "⚡ 04 / CRAFT COLA", title1: "CLASSIC", title2: "COLA", desc: "Deep caramel, warm Madagascar vanilla and a hint of citrus spice, finished with sharp champagne carbonation.", price: "$36.00", packLabel: "12-Can Case", ctaText: "Add To Crate — CLASSIC COLA", calories: "35", sugar: "0g", fiber: "5g", bgHex: "#420814", canHex: "#d90a1e", accentHex: "#ff6b6b", caffeine: "34 mg", tastingNotes: "Caramel, Madagascar vanilla, citrus zest, warm spice" }], marqueeItems: ["⚡ ZERO SUGAR", "🍊 REAL COLD-PRESSED FRUIT", "🫧 5G PREBIOTIC FIBER", "🥫 100% RECYCLABLE CAN", "📦 4-FLAVOR VARIETY BOX"], packBadge: "📦 Stage 06 · Interactive 3D Variety Box Packing", packTitleLine1: "Watch It", packTitleStroke: "Pack", packTitleLine3: "Up!", packSubtext: "Watch all 4 signature FIZZO cans drop into our custom kraft Variety Box — flaps fold shut and branded tape seals your crate.", packSteps: ["01. Open Crate", "02. Drop 4 Cans", "03. Fold Flaps", "04. Tape Seal"], fillBadge: "🫧 Stage 04 · Fresh Glass Pour & Fizz", fillTitleLine1: "Feel", fillTitleStroke: "the", fillTitleLine3: "fizz", fillSubtext: "Tilt the FIZZO can and let the ice-cold drink cascade into the crystal glass, building a light, bubbly foam head with floating ice.", fillSteps: ["01. Tilt & Pop", "02. Liquid Stream", "03. Glass Fill", "04. Foam & Ice"], bottleBadge: "🥫 Stage 02 · Sterile Nozzle Can Fill & Lid Seam", bottleTitleLine1: "Fill", bottleTitleStroke: "it up", bottleTitleLine3: "330ml", bottleSubtext: "A sterile high-velocity nozzle fills the aluminum can with chilled, perfectly carbonated botanical drink — exactly 330 ml each time before locking the stay-on-tab lid.", bottleSteps: ["01. Aluminum Billet", "02. Deep Drawing", "03. 330ml Nozzle Fill", "04. Lid Seam Lock"], nutritionBadge: "🔬 CLEAN BOTANICAL FORMULA", nutritionTitle: "Clean", nutritionSubtitle: "We replaced high-fructose corn syrup and artificial dyes with cold-pressed organic juice, Jerusalem artichoke prebiotic fiber, and pinpoint champagne carbonation.", nutritionServing: "1 Can (330mL / 11.2 fl oz)", nutritionCalories: "35", nutritionFacts: [{ label: "Total Fat", amount: "0g", dv: "0%" }, { label: "Sodium", amount: "15mg", dv: "1%" }, { label: "Total Carbohydrate", amount: "8g", dv: "3%" }, { label: "Dietary Prebiotic Fiber", amount: "5g", dv: "18%" }, { label: "Total Sugars (0g Added)", amount: "0g", dv: "0%" }, { label: "Vitamin C (Botanical)", amount: "45mg", dv: "50%" }], nutritionIngredients: "Carbonated Mountain Water, Cold-Pressed Organic Fruit Juice, Organic Jerusalem Artichoke Inulin (Prebiotic Fiber), Natural Botanical Extracts, Monk Fruit Extract, Sea Salt.", reviewsBadge: "★ 4.9 / 5 FROM 14,000+ SIPPERS", reviewsTitle: "Loved by", reviews: [{ name: "Maya Lin", role: "Verified Variety Box Buyer", rating: "★★★★★", quote: "Orange Crush tastes like freshly squeezed Sicilian blood oranges with champagne bubbles. Watching the 4-can Variety Box arrive chilled is a treat." }, { name: "Marcus Vance", role: "Fitness & Nutrition Coach", rating: "★★★★★", quote: "35 calories, zero sugar, and 5g of prebiotic fiber in a sleek 330ml can. The Lime Volt after a workout is unbeatable." }, { name: "Elena Rostova", role: "Beverage Sommelier", rating: "★★★★★", quote: "The carbonation bite when you crack the aluminum pull-tab puts every other craft soda to shame. Berry Blast is a masterpiece." }], footerTitle: "FIZZO SODA", footerSubtext: "Buy one 4-Flavor Variety Box, get one free with code FIZZ20 on your first order.", footerCtaText: "ORDER VARIETY BOX NOW ↑", footerCopyright: "© 2026 FIZZO. All Rights Reserved. | Powered by EFerz (EFerz.com)", customHtmlOverride: null }), o6 = ({ onNavigate: o }) => {
    const { lang: r, isRTL: a, currency: s, formatPrice: c } = qi(), u = r === "ar", [d, f] = z.useState("categories"), [v, h] = z.useState("food-beverage"), [w, x] = z.useState("fizzo"), [b, E] = z.useState("melto-icecream-3d"), [M, L] = z.useState(E3), [A, N] = z.useState(QP), [k, V] = z.useState(ZP), [C, B] = z.useState(y3), [j, D] = z.useState(() => {
      const y = {};
      return fh.forEach((_) => {
        y[_.id] = JSON.parse(JSON.stringify(_));
      }), y;
    }), [T, F] = z.useState({ "melto-icecream-3d": { occupiedBy: "Gelato Chef #104 (Active)", variantCount: 1 }, "desi-spices-3d": { occupiedBy: "Master Blender #208 (Active)", variantCount: 1 } }), [G, H] = z.useState("brand"), [U, Y] = z.useState(""), [re, ne] = z.useState("");
    z.useEffect(() => {
      const y = [32, 34, 32, 36];
      L((_) => ({ ..._, flavors: _.flavors.map(($, ie) => ({ ...$, price: s === "SAR" ? c(y[ie] || 32) : `$${(y[ie] || 32).toFixed(2)}` })) }));
    }, [s, c]);
    const [q, oe] = z.useState(true), [ee, te] = z.useState(false), [ue, X] = z.useState(true), [Z, ke] = z.useState("brand"), [De, Ke] = z.useState("brand"), [me, Ve] = z.useState(0), [Re, Xe] = z.useState(0), [Q, ge] = z.useState(0), [Ze, _e] = z.useState("brand"), [et, lt] = z.useState("Brand & Navbar"), [at, ze] = z.useState(false), [Je, yt] = z.useState(false), [Qe, Mt] = z.useState(null), [xt, fe] = z.useState({}), [kt, Et] = z.useState(null), K = z.useRef(null), O = z.useRef(null), ye = z.useRef(null), Te = z.useRef(null), Ie = (y, _, $) => {
      const ie = new FileReader();
      ie.onload = () => {
        if (typeof ie.result != "string") return;
        const I = new Image();
        I.onload = () => {
          const le = document.createElement("canvas");
          le.width = 128, le.height = 128;
          const ve = le.getContext("2d");
          if (!ve) {
            $(ie.result);
            return;
          }
          ve.save(), ve.beginPath(), ve.roundRect(4, 4, 120, 120, 28), ve.clip();
          const Se = Math.min(I.width, I.height), Ce = (I.width - Se) / 2, rt = (I.height - Se) / 2;
          ve.drawImage(I, Ce, rt, Se, Se, 4, 4, 120, 120), ve.restore(), ve.strokeStyle = _ || "#d02128", ve.lineWidth = 4, ve.beginPath(), ve.roundRect(4, 4, 120, 120, 28), ve.stroke(), $(le.toDataURL("image/png"));
        }, I.src = ie.result;
      }, ie.readAsDataURL(y);
    }, Ae = z.useCallback((y, _, $) => {
      _ && D((ie) => {
        const I = ie[y];
        if (!I) return ie;
        const le = JSON.parse(JSON.stringify(I)), ve = _.split(".");
        let Se = le;
        for (let Ce = 0; Ce < ve.length - 1; Ce++) {
          if (Se[ve[Ce]] === void 0) return ie;
          Se = Se[ve[Ce]];
        }
        return Se[ve[ve.length - 1]] = $, { ...ie, [y]: le };
      });
    }, []), Ye = z.useCallback((y) => {
      var _;
      st.playServiceLaunch();
      const $ = [{ pri: "#00F5D4", sec: "#FF2A85", bg: "#040911", mid: "#0D2238" }, { pri: "#F59E0B", sec: "#38BDF8", bg: "#0A0704", mid: "#26180A" }, { pri: "#A855F7", sec: "#CCFF00", bg: "#07040E", mid: "#1E0D36" }, { pri: "#10B981", sec: "#F43F5E", bg: "#030B08", mid: "#0A291E" }], ie = (((_ = T[y.id]) == null ? void 0 : _.variantCount) || 1) + 1, I = $[ie % $.length];
      F((le) => ({ ...le, [y.id]: { occupiedBy: `Workspace #${ie} (Your Isolated Instance)`, variantCount: ie } })), y.templateType === "melto" ? (x("melto"), h("icecream-gelato")) : y.templateType === "zaika" ? (x("zaika"), h("traditional-spices")) : y.templateType === "velora" ? (x("velora"), h("beauty-cosmetics"), Ke("brand")) : y.templateType === "universal" && y.universalId ? (D((le) => {
        const ve = le[y.universalId];
        return ve ? { ...le, [y.universalId]: { ...ve, primaryHex: I.pri, secondaryHex: I.sec, bgDarkHex: I.bg, bgMidHex: I.mid, variantGeneration: (ve.variantGeneration || 0) + 1 } } : le;
      }), x("universal"), E(y.universalId), H("brand")) : (x("fizzo"), h("food-beverage"), ke("brand")), Mt(`Spawned Fresh 3D Variant #0${ie} with isolated layout & studio palette so you can edit without conflicts!`), setTimeout(() => Mt(null), 4200), f("studio");
    }, [T]), pe = z.useCallback((y, _, $) => {
      st.playCardHoverTick(), te(false), oe(true), ke(y), typeof _ == "number" && !Number.isNaN(_) && Ve(_), $ && lt($), setTimeout(() => {
        var ie;
        (ie = Te.current) == null || ie.scrollTo({ top: 0, behavior: "smooth" });
      }, 40);
    }, []), He = z.useCallback((y, _, $) => {
      st.playCardHoverTick(), te(false), oe(true), Ke(y), typeof _ == "number" && !Number.isNaN(_) && Xe(_), $ && lt($), setTimeout(() => {
        var ie;
        (ie = Te.current) == null || ie.scrollTo({ top: 0, behavior: "smooth" });
      }, 40);
    }, []), Pe = z.useCallback((y, _, $) => {
      st.playCardHoverTick(), te(false), oe(true), (y === "brand" || y === "hero" || y === "products" || y === "story" || y === "spotlight" || y === "footer" || y === "html") && _e(y), typeof _ == "number" && !Number.isNaN(_) && ge(_), $ && lt($), setTimeout(() => {
        var ie;
        (ie = Te.current) == null || ie.scrollTo({ top: 0, behavior: "smooth" });
      }, 40);
    }, []), it = z.useCallback((y, _, $, ie) => {
      st.playCardHoverTick(), te(false), oe(true), (y === "brand" || y === "hero" || y === "stages" || y === "products" || y === "reviews" || y === "footer") && H(y), lt(_), $ && (Y($), ne(ie || ""));
    }, []), $e = (y) => {
      var _;
      const $ = (_ = y.target.files) == null ? void 0 : _[0];
      if (!$ || !kt) return;
      const ie = hh.find((le) => le.id === kt), I = (ie == null ? void 0 : ie.accent) || "#d02128";
      Ie($, I, (le) => {
        fe((ve) => ({ ...ve, [kt]: le })), kt === "food-beverage" ? L((ve) => ({ ...ve, logoImageUrl: le })) : kt === "beauty-cosmetics" ? B((ve) => ({ ...ve, logoImageUrl: le })) : D((ve) => {
          const Se = { ...ve };
          return Object.keys(Se).forEach((Ce) => {
            Se[Ce].categoryId === kt && (Se[Ce] = { ...Se[Ce], logoImageUrl: le });
          }), Se;
        }), st.playServiceLaunch();
      }), y.target.value = "";
    }, R = (y) => {
      var _, $;
      const ie = (_ = y.target.files) == null ? void 0 : _[0];
      if (!ie) return;
      const I = w === "universal" ? (($ = j[b]) == null ? void 0 : $.primaryHex) || "#00E5FF" : w === "velora" ? "#c4506a" : "#FF5500";
      Ie(ie, I, (le) => {
        w === "velora" ? B((ve) => ({ ...ve, logoImageUrl: le })) : w === "universal" ? D((ve) => {
          const Se = ve[b];
          return Se ? { ...ve, [b]: { ...Se, logoImageUrl: le } } : ve;
        }) : L((ve) => ({ ...ve, logoImageUrl: le })), st.playCardHoverTick();
      }), y.target.value = "";
    }, ae = (y) => {
      var _;
      const $ = (_ = y.target.files) == null ? void 0 : _[0];
      if (!$) return;
      const ie = new FileReader();
      ie.onload = () => {
        typeof ie.result == "string" && (w === "velora" ? B((I) => ({ ...I, customHtmlOverride: ie.result })) : L((I) => ({ ...I, customHtmlOverride: ie.result })), st.playServiceLaunch());
      }, ie.readAsText($);
    }, Me = () => {
      st.playCardHoverTick(), ze(true), setTimeout(() => ze(false), 2600);
    }, Le = () => {
      if (st.playCardHoverTick(), w === "velora") B(y3());
      else if (w === "universal") {
        const y = fh.find((_) => _.id === b);
        y && D((_) => ({ ..._, [b]: JSON.parse(JSON.stringify(y)) }));
      } else L(E3());
    }, J = (y, _, $) => {
      L((ie) => {
        const I = [...ie.flavors];
        return I[y] = { ...I[y], [_]: $ }, { ...ie, flavors: I };
      });
    }, Ee = (y, _, $) => {
      B((ie) => {
        const I = [...ie.products];
        return I[y] = { ...I[y], [_]: $ }, { ...ie, products: I };
      });
    }, he = (y, _) => {
      B(($) => {
        const ie = [...$.navLinks];
        return ie[y] = _, { ...$, navLinks: ie };
      });
    }, We = (y, _, $) => {
      B((ie) => {
        const I = [...ie.orbStages];
        return I[y] = { ...I[y], [_]: $ }, { ...ie, orbStages: I };
      });
    }, Ue = (y, _, $) => {
      B((ie) => {
        const I = [...ie.orbStages], le = [...I[y].colors];
        return le[_] = $, I[y] = { ...I[y], colors: le }, { ...ie, orbStages: I };
      });
    }, Fe = (y, _, $) => {
      B((ie) => {
        const I = [...ie.rituals];
        return I[y] = { ...I[y], [_]: $ }, { ...ie, rituals: I };
      });
    }, pt = (y, _, $) => {
      B((ie) => {
        const I = [...ie.stats];
        return I[y] = { ...I[y], [_]: $ }, { ...ie, stats: I };
      });
    }, tt = (y, _, $) => {
      B((ie) => {
        const I = [...ie.reviews];
        return I[y] = { ...I[y], [_]: $ }, { ...ie, reviews: I };
      });
    }, At = (y, _) => {
      L(($) => {
        const ie = [...$.navLinks];
        return ie[y] = _, { ...$, navLinks: ie };
      });
    }, It = (y, _) => {
      L(($) => {
        const ie = [...$.marqueeItems];
        return ie[y] = _, { ...$, marqueeItems: ie };
      });
    }, qt = (y, _, $) => {
      L((ie) => {
        const I = [...ie[y]];
        return I[_] = $, { ...ie, [y]: I };
      });
    }, Bt = (y, _, $) => {
      L((ie) => {
        const I = [...ie.nutritionFacts];
        return I[y] = { ...I[y], [_]: $ }, { ...ie, nutritionFacts: I };
      });
    }, Wr = (y, _, $) => {
      L((ie) => {
        const I = [...ie.reviews];
        return I[y] = { ...I[y], [_]: $ }, { ...ie, reviews: I };
      });
    }, li = hh.find((y) => y.id === v) || hh[0], $r = ox.filter((y) => y.categoryId === v), qr = (y, _) => {
      if (xt[y]) return n.jsxDEV("img", { src: xt[y], alt: y, width: 44, height: 44, className: "w-11 h-11 rounded-xl object-cover shrink-0 shadow-md" }, void 0, false);
      switch (y) {
        case "food-beverage":
          return n.jsxDEV("svg", { viewBox: "0 0 64 64", className: "w-11 h-11 shrink-0", fill: "none", children: [n.jsxDEV("rect", { x: "18", y: "10", width: "28", height: "44", rx: "7", stroke: _, strokeWidth: "2.4", fill: `${_}18` }, void 0, false), n.jsxDEV("path", { d: "M22 10h20M22 54h20M18 24h28M18 40h28", stroke: "#fff", strokeOpacity: "0.5", strokeWidth: "1.6" }, void 0, false), n.jsxDEV("circle", { cx: "32", cy: "32", r: "5", fill: _ }, void 0, false), n.jsxDEV("circle", { cx: "27", cy: "6", r: "2", fill: _ }, void 0, false), n.jsxDEV("circle", { cx: "36", cy: "4", r: "1.5", fill: "#fff" }, void 0, false)] }, void 0, true);
        case "icecream-gelato":
          return n.jsxDEV("svg", { viewBox: "0 0 64 64", className: "w-11 h-11 shrink-0", fill: "none", children: [n.jsxDEV("path", { d: "M22 32l10 26 10-26H22z", stroke: "#fff", strokeWidth: "2.2", fill: `${_}30` }, void 0, false), n.jsxDEV("circle", { cx: "32", cy: "22", r: "14", fill: _ }, void 0, false), n.jsxDEV("path", { d: "M24 20c0-4.4 3.6-8 8-8s8 3.6 8 8", stroke: "#fff", strokeWidth: "2", strokeLinecap: "round" }, void 0, false), n.jsxDEV("circle", { cx: "32", cy: "8", r: "3", fill: "#f43f5e" }, void 0, false)] }, void 0, true);
        case "traditional-spices":
          return n.jsxDEV("svg", { viewBox: "0 0 64 64", className: "w-11 h-11 shrink-0", fill: "none", children: [n.jsxDEV("path", { d: "M16 34c0 8.8 7.2 16 16 16s16-7.2 16-16H16z", stroke: _, strokeWidth: "2.4", fill: `${_}25` }, void 0, false), n.jsxDEV("line", { x1: "12", y1: "34", x2: "52", y2: "34", stroke: "#fff", strokeWidth: "2.5", strokeLinecap: "round" }, void 0, false), n.jsxDEV("line", { x1: "42", y1: "16", x2: "30", y2: "32", stroke: "#fff", strokeWidth: "3", strokeLinecap: "round" }, void 0, false), n.jsxDEV("circle", { cx: "43", cy: "15", r: "3.5", fill: _ }, void 0, false)] }, void 0, true);
        case "beauty-cosmetics":
          return n.jsxDEV("svg", { viewBox: "0 0 64 64", className: "w-11 h-11 shrink-0", fill: "none", children: [n.jsxDEV("rect", { x: "27", y: "6", width: "10", height: "10", rx: "4", fill: "#fff", fillOpacity: "0.8" }, void 0, false), n.jsxDEV("rect", { x: "24", y: "16", width: "16", height: "5", rx: "2", fill: _ }, void 0, false), n.jsxDEV("path", { d: "M20 22h24l4 8v22a6 6 0 0 1-6 6H22a6 6 0 0 1-6-6V30l4-8z", stroke: _, strokeWidth: "2.4", fill: `${_}18` }, void 0, false), n.jsxDEV("path", { d: "M32 22v24", stroke: "#fff", strokeOpacity: "0.55", strokeWidth: "1.8" }, void 0, false), n.jsxDEV("circle", { cx: "32", cy: "38", r: "5", stroke: "#fff", strokeOpacity: "0.7", strokeWidth: "1.5" }, void 0, false)] }, void 0, true);
        case "logistics-supply":
          return n.jsxDEV("svg", { viewBox: "0 0 64 64", className: "w-11 h-11 shrink-0", fill: "none", children: [n.jsxDEV("path", { d: "M8 42h48l-6 12H14L8 42z", stroke: _, strokeWidth: "2.4", fill: `${_}20` }, void 0, false), n.jsxDEV("rect", { x: "16", y: "28", width: "14", height: "14", rx: "2", stroke: "#fff", strokeWidth: "1.8", fill: `${_}35` }, void 0, false), n.jsxDEV("rect", { x: "32", y: "28", width: "14", height: "14", rx: "2", stroke: _, strokeWidth: "1.8" }, void 0, false), n.jsxDEV("path", { d: "M46 10v32M26 14h28M32 14v10", stroke: _, strokeWidth: "2.2", strokeLinecap: "round" }, void 0, false)] }, void 0, true);
        case "automotive-ev":
          return n.jsxDEV("svg", { viewBox: "0 0 64 64", className: "w-11 h-11 shrink-0", fill: "none", children: [n.jsxDEV("path", { d: "M8 38l8-12h28l12 12v8H8v-8z", stroke: _, strokeWidth: "2.4", fill: `${_}18` }, void 0, false), n.jsxDEV("circle", { cx: "19", cy: "46", r: "6", stroke: "#fff", strokeWidth: "2.2", fill: "#090d16" }, void 0, false), n.jsxDEV("circle", { cx: "45", cy: "46", r: "6", stroke: "#fff", strokeWidth: "2.2", fill: "#090d16" }, void 0, false), n.jsxDEV("path", { d: "M14 20h24M22 14h18", stroke: _, strokeWidth: "1.8", strokeLinecap: "round" }, void 0, false)] }, void 0, true);
        case "real-estate-arch":
          return n.jsxDEV("svg", { viewBox: "0 0 64 64", className: "w-11 h-11 shrink-0", fill: "none", children: [n.jsxDEV("path", { d: "M22 56V14l10-8 10 8v42", stroke: _, strokeWidth: "2.4", fill: `${_}18` }, void 0, false), n.jsxDEV("path", { d: "M12 56V28l10-6M52 56V28l-10-6M8 56h48", stroke: "#fff", strokeOpacity: "0.65", strokeWidth: "2" }, void 0, false), n.jsxDEV("path", { d: "M26 22h12M26 30h12M26 38h12M26 46h12", stroke: _, strokeWidth: "1.6" }, void 0, false)] }, void 0, true);
        case "luxury-horology":
          return n.jsxDEV("svg", { viewBox: "0 0 64 64", className: "w-11 h-11 shrink-0", fill: "none", children: [n.jsxDEV("circle", { cx: "32", cy: "32", r: "18", stroke: _, strokeWidth: "2.5", fill: `${_}16` }, void 0, false), n.jsxDEV("circle", { cx: "32", cy: "32", r: "11", stroke: "#fff", strokeOpacity: "0.45", strokeDasharray: "3 3", strokeWidth: "1.6" }, void 0, false), n.jsxDEV("path", { d: "M32 22v10l7 5M24 8h16M24 56h16", stroke: "#fff", strokeWidth: "2.2", strokeLinecap: "round" }, void 0, false)] }, void 0, true);
        case "ai-semiconductor":
          return n.jsxDEV("svg", { viewBox: "0 0 64 64", className: "w-11 h-11 shrink-0", fill: "none", children: [n.jsxDEV("rect", { x: "18", y: "18", width: "28", height: "28", rx: "5", stroke: _, strokeWidth: "2.4", fill: `${_}18` }, void 0, false), n.jsxDEV("rect", { x: "25", y: "25", width: "14", height: "14", rx: "2", fill: _ }, void 0, false), n.jsxDEV("path", { d: "M24 10v8M32 10v8M40 10v8M24 46v8M32 46v8M40 46v8M10 24h8M10 32h8M10 40h8M46 24h8M46 32h8M46 40h8", stroke: "#fff", strokeOpacity: "0.7", strokeWidth: "1.8", strokeLinecap: "round" }, void 0, false)] }, void 0, true);
        case "fashion-sneaker":
          return n.jsxDEV("svg", { viewBox: "0 0 64 64", className: "w-11 h-11 shrink-0", fill: "none", children: [n.jsxDEV("path", { d: "M10 44V22l14 6 12-10 18 16v10H10z", stroke: _, strokeWidth: "2.4", fill: `${_}18` }, void 0, false), n.jsxDEV("rect", { x: "8", y: "44", width: "48", height: "6", rx: "3", fill: "#fff", fillOpacity: "0.85" }, void 0, false), n.jsxDEV("path", { d: "M22 36h20", stroke: _, strokeWidth: "2", strokeLinecap: "round" }, void 0, false)] }, void 0, true);
        case "fintech-wealth":
          return n.jsxDEV("svg", { viewBox: "0 0 64 64", className: "w-11 h-11 shrink-0", fill: "none", children: [n.jsxDEV("rect", { x: "8", y: "16", width: "48", height: "32", rx: "6", stroke: _, strokeWidth: "2.4", fill: `${_}18` }, void 0, false), n.jsxDEV("rect", { x: "15", y: "26", width: "10", height: "8", rx: "2", fill: _ }, void 0, false), n.jsxDEV("path", { d: "M15 40h22M42 26h7", stroke: "#fff", strokeOpacity: "0.75", strokeWidth: "2", strokeLinecap: "round" }, void 0, false)] }, void 0, true);
        case "aerospace-orbital":
          return n.jsxDEV("svg", { viewBox: "0 0 64 64", className: "w-11 h-11 shrink-0", fill: "none", children: [n.jsxDEV("rect", { x: "25", y: "22", width: "14", height: "20", rx: "3", stroke: "#fff", strokeWidth: "2.2", fill: `${_}28` }, void 0, false), n.jsxDEV("rect", { x: "6", y: "26", width: "16", height: "12", rx: "2", stroke: _, strokeWidth: "2", fill: `${_}15` }, void 0, false), n.jsxDEV("rect", { x: "42", y: "26", width: "16", height: "12", rx: "2", stroke: _, strokeWidth: "2", fill: `${_}15` }, void 0, false), n.jsxDEV("path", { d: "M26 16a6 6 0 0 1 12 0M32 42v12", stroke: _, strokeWidth: "2.2", strokeLinecap: "round" }, void 0, false)] }, void 0, true);
        case "medtech-biotech":
          return n.jsxDEV("svg", { viewBox: "0 0 64 64", className: "w-11 h-11 shrink-0", fill: "none", children: [n.jsxDEV("path", { d: "M20 10c0 16 24 16 24 32s-24 16-24 32", stroke: _, strokeWidth: "2.4", strokeLinecap: "round" }, void 0, false), n.jsxDEV("path", { d: "M44 10c0 16-24 16-24 32s24 16 24 32", stroke: "#fff", strokeOpacity: "0.8", strokeWidth: "2.4", strokeLinecap: "round" }, void 0, false), n.jsxDEV("path", { d: "M23 18h18M22 32h20M23 46h18", stroke: _, strokeWidth: "1.8" }, void 0, false)] }, void 0, true);
        case "spatial-audio":
          return n.jsxDEV("svg", { viewBox: "0 0 64 64", className: "w-11 h-11 shrink-0", fill: "none", children: [n.jsxDEV("path", { d: "M14 34v-4a18 18 0 0 1 36 0v4", stroke: "#fff", strokeWidth: "2.4" }, void 0, false), n.jsxDEV("rect", { x: "10", y: "32", width: "10", height: "18", rx: "5", stroke: _, strokeWidth: "2.4", fill: `${_}22` }, void 0, false), n.jsxDEV("rect", { x: "44", y: "32", width: "10", height: "18", rx: "5", stroke: _, strokeWidth: "2.4", fill: `${_}22` }, void 0, false), n.jsxDEV("circle", { cx: "32", cy: "38", r: "6", stroke: _, strokeOpacity: "0.6", strokeWidth: "1.6" }, void 0, false)] }, void 0, true);
        case "clean-energy":
          return n.jsxDEV("svg", { viewBox: "0 0 64 64", className: "w-11 h-11 shrink-0", fill: "none", children: [n.jsxDEV("circle", { cx: "32", cy: "24", r: "4", fill: _ }, void 0, false), n.jsxDEV("path", { d: "M32 24V8M32 24l14 9M32 24l-14 9M32 28v28M20 56h24", stroke: "#fff", strokeWidth: "2.3", strokeLinecap: "round" }, void 0, false), n.jsxDEV("circle", { cx: "32", cy: "24", r: "15", stroke: _, strokeOpacity: "0.45", strokeDasharray: "4 4", strokeWidth: "1.6" }, void 0, false)] }, void 0, true);
        default:
          return n.jsxDEV("svg", { viewBox: "0 0 64 64", className: "w-11 h-11 shrink-0", fill: "none", children: [n.jsxDEV("rect", { x: "14", y: "10", width: "36", height: "44", rx: "5", stroke: _, strokeWidth: "2.4", fill: `${_}18` }, void 0, false), n.jsxDEV("circle", { cx: "32", cy: "23", r: "6", stroke: "#fff", strokeWidth: "2" }, void 0, false), n.jsxDEV("circle", { cx: "32", cy: "40", r: "6", stroke: _, strokeWidth: "2" }, void 0, false)] }, void 0, true);
      }
    };
    if (d === "categories" || d === "subcategories") return n.jsxDEV("div", { dir: a ? "rtl" : "ltr", className: "min-h-screen w-full bg-[#060609] text-white flex flex-col selection:bg-[#FF5500] selection:text-white overflow-x-hidden", children: [n.jsxDEV("input", { ref: O, type: "file", accept: "image/*", onChange: $e, className: "hidden" }, void 0, false), n.jsxDEV("header", { className: "sticky top-0 z-40 min-h-[4rem] py-2.5 px-4 sm:px-6 md:px-10 border-b border-white/10 bg-[#060609]/90 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3", children: [n.jsxDEV("div", { className: "flex items-center gap-3 sm:gap-4", children: [n.jsxDEV("button", { type: "button", onClick: () => {
      st.playCardHoverTick(), d === "subcategories" ? f("categories") : o == null || o("agency");
    }, className: "inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-[11px] sm:text-xs font-mono uppercase tracking-[0.16em] text-white/80 hover:text-white transition-all cursor-pointer", children: [n.jsxDEV(hu, { className: `w-3.5 h-3.5 ${a ? "rotate-180" : ""}` }, void 0, false), d === "subcategories" ? u ? "جميع الفئات (4 قطاعات مختارة)" : "All 4 Categories" : u ? "العودة إلى إيفرز" : "Back to EFerz"] }, void 0, true), n.jsxDEV("div", { className: "hidden sm:flex items-center gap-2.5 pl-2", children: n.jsxDEV("span", { className: "text-xs font-mono uppercase tracking-[0.22em] text-white/60", children: u ? "إيفرز // استوديو البناء التفاعلي · 4 نماذج 3D حية (14 قطاعاً)" : "EFERZ // LET'S BUILD STUDIO · 4 LIVE 3D DEMOS (14 INDUSTRY PACKS)" }, void 0, false) }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: "flex items-center gap-1.5 sm:gap-3 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.14em]", children: [n.jsxDEV("span", { className: `px-2.5 sm:px-3 py-1 rounded-full border ${d === "categories" ? "bg-[#d02128]/20 border-[#d02128] text-white" : "bg-white/[0.04] border-white/10 text-white/50"}`, children: u ? "01. القطاعات (14)" : "01. Industry Packs (14)" }, void 0, false), n.jsxDEV(Us, { className: `w-3.5 h-3.5 text-white/30 ${a ? "rotate-180" : ""}` }, void 0, false), n.jsxDEV("span", { className: `px-2.5 sm:px-3 py-1 rounded-full border ${d === "subcategories" ? "bg-[#d02128]/20 border-[#d02128] text-white" : "bg-white/[0.04] border-white/10 text-white/50"}`, children: u ? "02. النموذج والتوفر" : "02. 3D Demo & Lock Status" }, void 0, false), n.jsxDEV(Us, { className: `w-3.5 h-3.5 text-white/30 hidden sm:inline ${a ? "rotate-180" : ""}` }, void 0, false), n.jsxDEV("span", { className: "hidden sm:inline px-3 py-1 rounded-full border bg-white/[0.03] border-white/10 text-white/40", children: u ? "03. تخصيص 3D مباشر" : "03. Live 3D Customize" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { className: "flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10 flex flex-col justify-between", children: d === "categories" ? n.jsxDEV("div", { children: [n.jsxDEV("div", { className: "max-w-3xl mb-6 sm:mb-8", children: [n.jsxDEV("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d02128]/15 border border-[#d02128]/40 text-[#d02128] text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] mb-3", children: [n.jsxDEV(Ja, { className: "w-3.5 h-3.5" }, void 0, false), u ? "الخطوة 01 — 14 قطاعاً مع 4 نماذج ثلاثية الأبعاد حية + محول الصور إلى أيقونات" : "STEP 01 — 14 INDUSTRY PACKS · 4 LIVE 3D DEMOS · IMAGE-TO-ICON GENERATOR · WEBGL + HTML5 + PHP"] }, void 0, true), n.jsxDEV("h1", { className: "text-2xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight leading-[1.06] text-white", children: u ? n.jsxDEV(n.Fragment, { children: ["اختر القطاع لإطلاق", " ", n.jsxDEV("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-white via-[#d02128] to-[#ff4d49]", children: "موقعك السينمائي ثلاثي الأبعاد." }, void 0, false)] }, void 0, true) : n.jsxDEV(n.Fragment, { children: ["Select an industry to launch your", " ", n.jsxDEV("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-white via-[#d02128] to-[#ff4d49]", children: "bespoke 2026 3D website." }, void 0, false)] }, void 0, true) }, void 0, false), n.jsxDEV("p", { className: "mt-2.5 text-xs sm:text-sm md:text-base text-white/65 leading-relaxed", children: u ? "كل فئة مصممة بهوية وتخطيط مختلف تماماً مع أيقونة مخصصة قابلة للتعديل (يمكنك رفع أي صورة لتحويلها تلقائياً إلى أيقونة 3D متوهجة)." : 'Each category features a distinct 2026 layout structure, custom industry icon (click "Upload Image → Icon" on any card to auto-convert your own image into a stylized icon), editorial articles, and a one-page Contact Concierge.' }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: hh.map((y) => n.jsxDEV("div", { onClick: () => {
      st.playCardHoverTick(), h(y.id), f("subcategories");
    }, className: `group relative ${a ? "text-right" : "text-left"} p-5 rounded-2xl border transition-all duration-300 overflow-hidden bg-gradient-to-br from-white/[0.07] to-white/[0.02] border-white/20 hover:border-[#d02128] hover:shadow-[0_0_40px_rgba(236,57,53,0.18)] cursor-pointer flex flex-col justify-between`, children: [n.jsxDEV("div", { className: "absolute -right-12 -top-12 w-36 h-36 rounded-full blur-3xl opacity-25 group-hover:opacity-50 transition-opacity pointer-events-none", style: { background: y.accent || "#d02128" } }, void 0, false), n.jsxDEV("div", { children: [n.jsxDEV("div", { className: "relative z-10 flex items-center justify-between gap-2.5 mb-3.5", children: [n.jsxDEV("div", { className: "flex items-center gap-2.5", children: [n.jsxDEV("div", { className: "p-2 rounded-xl bg-black/60 border border-white/15 shadow-inner relative group/icon", children: qr(y.id, y.accent) }, void 0, false), n.jsxDEV("div", { children: [n.jsxDEV("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-[0.18em] border bg-white/[0.06] border-white/20 text-white", children: u ? y.badgeAr : y.badge }, void 0, false), n.jsxDEV("button", { type: "button", onClick: (_) => {
      var $;
      _.stopPropagation(), Et(y.id), ($ = O.current) == null || $.click();
    }, className: "mt-1 flex items-center gap-1 text-[9px] font-mono uppercase tracking-[0.14em] text-cyan-300 hover:text-white transition-colors cursor-pointer", title: "Upload any image to automatically convert and apply it as this category & website icon", children: [n.jsxDEV(Os, { className: "w-2.5 h-2.5" }, void 0, false), n.jsxDEV("span", { children: u ? "رفع صورة كأيقونة" : "Image → Icon" }, void 0, false)] }, void 0, true)] }, void 0, true)] }, void 0, true), n.jsxDEV("span", { className: "text-[10px] font-mono text-white/50", children: u ? `${y.subCategoriesCount} نموذج` : `${y.subCategoriesCount} Demo${y.subCategoriesCount > 1 ? "s" : ""}` }, void 0, false)] }, void 0, true), n.jsxDEV("h2", { className: "relative z-10 text-lg sm:text-xl font-display font-bold text-white group-hover:text-[#d02128] transition-colors", children: u ? y.titleAr : y.title }, void 0, false), n.jsxDEV("p", { className: "relative z-10 text-[10px] font-mono uppercase tracking-[0.15em] mt-0.5", style: { color: y.accent }, children: u ? y.subtitleAr : y.subtitle }, void 0, false), n.jsxDEV("p", { className: "relative z-10 text-xs text-white/65 leading-relaxed mt-2 line-clamp-2", children: u ? y.descriptionAr : y.description }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: "relative z-10 mt-4 pt-3 border-t border-white/10 flex items-center justify-between", children: [n.jsxDEV("span", { className: "text-[10px] font-mono uppercase tracking-[0.18em] text-white/80 group-hover:text-white", children: u ? "افتح النماذج ثلاثية الأبعاد" : "Open Bespoke 3D Demo" }, void 0, false), n.jsxDEV("div", { className: "w-7 h-7 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1 text-white", style: { backgroundColor: y.accent || "#d02128" }, children: n.jsxDEV(fr, { className: "w-3.5 h-3.5" }, void 0, false) }, void 0, false)] }, void 0, true)] }, y.id, true)) }, void 0, false)] }, void 0, true) : n.jsxDEV("div", { children: [n.jsxDEV("div", { className: "max-w-3xl mb-6 sm:mb-8", children: [n.jsxDEV("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d02128]/15 border border-[#d02128]/40 text-[#d02128] text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] mb-3", children: [n.jsxDEV(Ja, { className: "w-3.5 h-3.5" }, void 0, false), u ? `الخطوة 02 — ${li.titleAr}` : `STEP 02 — ${li.title.toUpperCase()}`] }, void 0, true), n.jsxDEV("h1", { className: "text-2xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight leading-[1.05] text-white", children: u ? li.titleAr : li.title }, void 0, false), n.jsxDEV("p", { className: "mt-2.5 text-xs sm:text-sm md:text-base text-white/65 leading-relaxed", children: u ? 'إذا كان النموذج قيد الاستخدام حالياً من قِبل مستخدم آخر، سيظهر لك تنبيه "قيد الاستخدام" مع زر لتوليد نسخة 3D جديدة ومستقلة فوراً لكي تعمل عليها بحرية.' : "Each demo includes a custom 3D WebGL stage, industry-specific layout, custom Image-to-Icon converter, editorial articles section, and a one-page Contact Concierge form." }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: $r.map((y) => {
      const _ = T[y.id], $ = !!(_ || y.activeSessionBy), ie = (_ == null ? void 0 : _.occupiedBy) || y.activeSessionBy;
      return n.jsxDEV("div", { className: `group relative ${a ? "text-right" : "text-left"} p-5 sm:p-6 rounded-2xl border transition-all duration-300 overflow-hidden bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-white/[0.01] border-white/25 hover:border-[#d02128] shadow-[0_20px_50px_rgba(0,0,0,0.45)] flex flex-col justify-between`, children: [n.jsxDEV("div", { children: [n.jsxDEV("div", { className: "relative z-10 flex flex-wrap items-center justify-between gap-2 mb-4", children: [n.jsxDEV("div", { className: "flex items-center gap-3", children: [n.jsxDEV("div", { className: "p-2 rounded-xl bg-black/55 border border-white/15", children: qr(y.categoryId, y.accent) }, void 0, false), n.jsxDEV("div", { children: [n.jsxDEV("span", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] border text-white", style: { backgroundColor: `${y.accent}25`, borderColor: y.accent }, children: u ? y.badgeAr : y.badge }, void 0, false), n.jsxDEV("button", { type: "button", onClick: () => {
        var I;
        Et(y.categoryId), (I = O.current) == null || I.click();
      }, className: "mt-1 flex items-center gap-1 text-[9px] font-mono uppercase tracking-[0.14em] text-cyan-300 hover:text-white cursor-pointer", children: [n.jsxDEV(Os, { className: "w-2.5 h-2.5" }, void 0, false), n.jsxDEV("span", { children: u ? "تحويل صورة إلى أيقونة" : "Upload Image → Icon" }, void 0, false)] }, void 0, true)] }, void 0, true)] }, void 0, true), $ ? n.jsxDEV("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-amber-500/20 border border-amber-400/50 text-amber-200", children: [n.jsxDEV(vu, { className: "w-3 h-3 text-amber-300" }, void 0, false), u ? `قيد الاستخدام الآن (${ie})` : `In Use: ${ie}`] }, void 0, true) : n.jsxDEV("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-500/15 border border-emerald-400/40 text-emerald-300", children: u ? "متاح للتخصيص الفوري" : "Available · Slot #01 Open" }, void 0, false)] }, void 0, true), n.jsxDEV("h2", { className: "relative z-10 text-xl sm:text-2xl md:text-3xl font-display font-bold text-white", children: u ? y.titleAr : y.title }, void 0, false), n.jsxDEV("p", { className: "relative z-10 text-xs font-mono uppercase tracking-[0.15em] mt-1.5", style: { color: y.accent }, children: u ? y.subtitleAr : y.subtitle }, void 0, false), n.jsxDEV("p", { className: "relative z-10 text-xs sm:text-sm text-white/70 leading-relaxed mt-3 sm:mt-4", children: u ? y.descriptionAr : y.description }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: "relative z-10 mt-6 pt-5 border-t border-white/10 space-y-3", children: [$ && n.jsxDEV("div", { className: "p-3 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-100 text-xs leading-relaxed flex items-start gap-2.5", children: [n.jsxDEV(vu, { className: "w-4 h-4 text-amber-300 shrink-0 mt-0.5" }, void 0, false), n.jsxDEV("div", { children: [n.jsxDEV("strong", { className: "block text-amber-300 font-mono uppercase text-[10px] tracking-wider", children: u ? "هذا النموذج قيد التعديل حالياً من مستخدم آخر" : "ACTIVE MULTI-USER SESSION DETECTED" }, void 0, false), n.jsxDEV("span", { children: u ? "لتجنب تعارض التعديلات، يمكنك توليد نسخة 3D جديدة ومستقلة بتصميم وألوان مخصصة لك فوراً." : 'Another user is currently working on the primary slot of this demo. Click "Generate Fresh 3D Variant" below to spawn your own conflict-free 3D workspace.' }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { className: "flex flex-wrap items-center gap-2.5", children: [n.jsxDEV("button", { type: "button", onClick: () => {
        st.playServiceLaunch(), F((I) => {
          var le;
          return { ...I, [y.id]: { occupiedBy: "You (Active Studio Lock)", variantCount: ((le = I[y.id]) == null ? void 0 : le.variantCount) || 1 } };
        }), y.templateType === "melto" ? (x("melto"), h("icecream-gelato"), _e("brand"), lt("01. Brand & Tagline")) : y.templateType === "zaika" ? (x("zaika"), h("traditional-spices"), _e("brand"), lt("01. Brand & Tagline")) : y.templateType === "velora" ? (x("velora"), h("beauty-cosmetics"), Ke("brand"), lt("Brand & Navbar")) : y.templateType === "universal" && y.universalId ? (x("universal"), E(y.universalId), H("brand"), lt("Brand & 3D Theme")) : (x("fizzo"), h("food-beverage"), ke("brand"), lt("Brand & Navbar")), f("studio");
      }, className: "flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-mono uppercase tracking-[0.16em] font-bold text-white transition-all cursor-pointer shadow-lg hover:brightness-110", style: { backgroundColor: y.accent || "#d02128" }, children: [n.jsxDEV("span", { children: u ? "تشغيل النموذج والتخصيص المباشر" : "Launch 3D Studio & Customize" }, void 0, false), n.jsxDEV(fr, { className: "w-4 h-4" }, void 0, false)] }, void 0, true), n.jsxDEV("button", { type: "button", onClick: () => Ye(y), className: "inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/25 text-xs font-mono uppercase tracking-[0.14em] text-cyan-300 font-semibold transition-all cursor-pointer", title: "Generate a fresh isolated 3D demo variant so multiple users never overwrite each other", children: [n.jsxDEV(xd, { className: "w-3.5 h-3.5" }, void 0, false), n.jsxDEV("span", { children: u ? "توليد نسخة 3D جديدة" : "+ Generate Fresh 3D Variant" }, void 0, false)] }, void 0, true)] }, void 0, true)] }, void 0, true)] }, y.id, true);
    }) }, void 0, false)] }, void 0, true) }, void 0, false)] }, void 0, true);
    const ci = w === "melto", Cr = w === "zaika", zr = w === "velora", sr = w === "universal", jt = j[b] || j[fh[0].id], lr = M.flavors[me] || M.flavors[0], Fr = C.products[Re] || C.products[0], Mi = [{ id: "brand", label: "01. Brand & Header", icon: Bf }, { id: "hero", label: "02. 3D Hero Carousel", icon: Ja }, { id: "products", label: ci ? "03. 6 3D Flavours" : "03. 6 3D Jars & Sauces", icon: du }, { id: "story", label: "04. Heritage Story", icon: zs }, { id: "spotlight", label: ci ? "05. 3D Pint Spotlight" : "05. 3D Jar Spotlight", icon: Pf }, { id: "footer", label: "06. Giant & Lock", icon: Of }, { id: "html", label: "07. Custom HTML", icon: vh }], gi = [{ id: "brand", label: "01. Brand & Nav", icon: aS }, { id: "hero", label: "02. Hero & Promo", icon: Bf }, { id: "flavors", label: "03. 4 3D Cans", icon: du }, { id: "bottle", label: "04. Can Fill (330ml)", icon: Mk }, { id: "fill", label: "05. Pop & Pour", icon: QD }, { id: "pack", label: "06. Variety Box", icon: Pf }, { id: "marquee", label: "07. Marquee Bar", icon: Ja }, { id: "nutrition", label: "08. Nutrition", icon: iS }, { id: "reviews", label: "09. Reviews", icon: bv }, { id: "footer", label: "10. Footer CTA", icon: Of }, { id: "html", label: "11. Custom HTML", icon: vh }], Pi = [{ id: "brand", label: "01. Brand & Nav", icon: aS }, { id: "hero", label: "02. 3D Hero Stage", icon: Bf }, { id: "products", label: "03. 8 3D Products", icon: du }, { id: "orb", label: "04. 3D Shader Orb", icon: Ja }, { id: "ingredients", label: "05. Ingredients", icon: iS }, { id: "rituals", label: "06. 3 Rituals", icon: h_ }, { id: "about", label: "07. About & Stats", icon: zs }, { id: "reviews", label: "08. Skin Reviews", icon: bv }, { id: "contact", label: "09. Contact Studio", icon: Pf }, { id: "footer", label: "10. Footer", icon: Of }, { id: "html", label: "11. Custom HTML", icon: vh }], ht = [{ id: "brand", label: "01. Brand & Colors", icon: du }, { id: "hero", label: "02. 3D Hero & Promo", icon: Bf }, { id: "stages", label: "03. 4 3D Scroll Stages", icon: Pf }, { id: "products", label: "04. Products & Specs", icon: Ja }, { id: "reviews", label: "05. Reviews & Stats", icon: bv }, { id: "footer", label: "06. Footer & EFerz Lock", icon: Of }], Ne = ci ? "#ff5c8a" : Cr ? "#e0881c" : sr ? jt.primaryHex : zr ? "#c4506a" : "#FF5500";
    return n.jsxDEV("div", { dir: a ? "rtl" : "ltr", className: "fixed inset-0 z-50 bg-[#050508] text-white flex flex-col overflow-hidden select-none", children: [n.jsxDEV("header", { className: "h-14 px-3 md:px-5 bg-[#08080D]/95 border-b border-white/12 flex items-center justify-between gap-2 z-50 shrink-0", children: [n.jsxDEV("div", { className: "flex items-center gap-2", children: [n.jsxDEV("button", { type: "button", onClick: () => {
      st.playCardHoverTick(), f("subcategories");
    }, className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-[11px] font-mono uppercase tracking-[0.14em] text-white/85 transition-all cursor-pointer", children: [n.jsxDEV(hu, { className: `w-3.5 h-3.5 ${a ? "rotate-180" : ""}` }, void 0, false), n.jsxDEV("span", { className: "hidden sm:inline", children: u ? "النماذج" : "All Demos" }, void 0, false)] }, void 0, true), n.jsxDEV("select", { value: w === "fizzo" ? "drink" : w === "melto" ? "melto-icecream-3d" : w === "zaika" ? "desi-spices-3d" : w === "velora" ? "velora-botanics" : b, onChange: (y) => {
      const _ = y.target.value;
      if (st.playCardHoverTick(), _ === "drink") h("food-beverage"), x("fizzo");
      else if (_ === "melto-icecream-3d") h("icecream-gelato"), x("melto");
      else if (_ === "desi-spices-3d") h("traditional-spices"), x("zaika");
      else if (_ === "velora-botanics") h("beauty-cosmetics"), x("velora");
      else {
        const $ = fh.find((ie) => ie.id === _);
        $ && (h($.categoryId), x("universal"), E($.id));
      }
    }, className: "hidden md:block px-3 py-1.5 rounded-lg bg-[#12121C] border border-white/20 text-[11px] font-mono text-white cursor-pointer max-w-[250px] truncate", children: [n.jsxDEV("option", { value: "drink", children: "01. FIZZO — 3D Soda Can & Variety Box" }, void 0, false), n.jsxDEV("option", { value: "melto-icecream-3d", children: "02. MELTO — 3D Ice Cream & Gelato" }, void 0, false), n.jsxDEV("option", { value: "desi-spices-3d", children: "03. ZAIKA / DESI — 3D Spice & Pickle Pantry" }, void 0, false), n.jsxDEV("option", { value: "velora-botanics", children: "04. VELORA — 8 3D Skincare Vessels & Orb" }, void 0, false)] }, void 0, true), n.jsxDEV("button", { type: "button", onClick: () => {
      const y = ox.find((_) => w === "fizzo" ? _.id === "drink" : w === "velora" ? _.id === "velora-botanics" : _.universalId === b) || ox[0];
      Ye(y);
    }, title: "If another user is editing this demo, click to generate a fresh 3D variant instance", className: "hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-[10px] font-mono uppercase tracking-wider text-cyan-200 cursor-pointer transition-all", children: [n.jsxDEV(xd, { className: "w-3 h-3 text-cyan-300" }, void 0, false), n.jsxDEV("span", { children: u ? "+ نسخة 3D جديدة" : "+ New 3D Variant" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { className: "flex items-center gap-1.5 bg-white/[0.04] p-1 rounded-xl border border-white/10", children: [n.jsxDEV("button", { type: "button", onClick: () => {
      st.playCardHoverTick(), te(false), oe(true);
    }, style: !ee && q ? { backgroundColor: Ne } : void 0, className: `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-[0.12em] transition-all cursor-pointer ${!ee && q ? "text-white font-semibold shadow-sm" : "text-white/65 hover:text-white"}`, children: [n.jsxDEV(lS, { className: "w-3.5 h-3.5" }, void 0, false), n.jsxDEV("span", { children: u ? "تخصيص" : "Customize" }, void 0, false)] }, void 0, true), n.jsxDEV("button", { type: "button", onClick: () => {
      st.playCardHoverTick(), X((y) => !y);
    }, title: "Click any text or container on the website to edit it directly", className: `hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-[0.12em] transition-all cursor-pointer ${ue ? "bg-cyan-500/20 border border-cyan-400/50 text-cyan-200 font-semibold" : "text-white/55 hover:text-white"}`, children: [n.jsxDEV(nS, { className: "w-3.5 h-3.5 text-cyan-300" }, void 0, false), n.jsxDEV("span", { children: ue ? u ? "تعديل أي نص بالنقر: مفعل" : "Click-Any-Text: ON" : u ? "التعديل بالنقر: متوقف" : "Click-Any-Text: OFF" }, void 0, false)] }, void 0, true), n.jsxDEV("button", { type: "button", onClick: () => {
      st.playCardHoverTick(), te(true), oe(false);
    }, className: `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-[0.12em] transition-all cursor-pointer ${ee ? "bg-white text-black font-semibold shadow-sm" : "text-white/65 hover:text-white"}`, children: [n.jsxDEV(Gl, { className: "w-3.5 h-3.5" }, void 0, false), n.jsxDEV("span", { children: u ? "معاينة كاملة" : "Preview Site" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { className: "flex items-center gap-2", children: [n.jsxDEV("button", { type: "button", onClick: Le, title: "Reset to default demo", className: "hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-[11px] font-mono uppercase tracking-[0.12em] text-white/65 hover:text-white transition-all cursor-pointer", children: [n.jsxDEV(n1, { className: "w-3.5 h-3.5" }, void 0, false), n.jsxDEV("span", { className: "hidden md:inline", children: u ? "إعادة ضبط" : "Reset" }, void 0, false)] }, void 0, true), n.jsxDEV("button", { type: "button", onClick: Me, className: "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 text-white text-[11px] font-mono uppercase tracking-[0.15em] transition-all cursor-pointer", children: [at ? n.jsxDEV(hd, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false) : n.jsxDEV(ik, { className: "w-3.5 h-3.5", style: { color: Ne } }, void 0, false), n.jsxDEV("span", { children: at ? u ? "تم الحفظ!" : "Saved!" : u ? "حفظ" : "Save" }, void 0, false)] }, void 0, true), n.jsxDEV("button", { type: "button", onClick: () => {
      st.playCardHoverTick(), yt(true), setTimeout(() => yt(false), 3200);
    }, className: "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#d02128]/15 border border-[#d02128]/40 text-white text-[11px] font-mono uppercase tracking-[0.16em] cursor-not-allowed opacity-90 hover:opacity-100 transition-all", title: "Publish is locked in demo mode", children: [n.jsxDEV(Bs, { className: "w-3.5 h-3.5 text-[#d02128]" }, void 0, false), n.jsxDEV("span", { children: u ? "نشر الموقع" : "Publish" }, void 0, false)] }, void 0, true)] }, void 0, true)] }, void 0, true), Qe && n.jsxDEV("div", { className: "fixed top-16 left-1/2 -translate-x-1/2 z-[75] px-5 py-3 rounded-2xl bg-[#0B192C]/95 border border-cyan-400/60 shadow-2xl backdrop-blur-xl flex items-center gap-3 max-w-lg", children: [n.jsxDEV(xd, { className: "w-4 h-4 text-cyan-300 shrink-0 animate-spin" }, void 0, false), n.jsxDEV("p", { className: "text-xs font-mono text-cyan-100", children: Qe }, void 0, false)] }, void 0, true), Je && n.jsxDEV("div", { className: "fixed top-16 right-5 z-[70] px-4 py-3 rounded-2xl bg-[#12121A]/95 border border-[#d02128]/50 shadow-2xl backdrop-blur-xl flex items-center gap-3 max-w-sm animate-fade-in", children: [n.jsxDEV("div", { className: "w-8 h-8 rounded-xl bg-[#d02128]/20 border border-[#d02128]/40 flex items-center justify-center shrink-0", children: n.jsxDEV(Bs, { className: "w-4 h-4 text-[#d02128]" }, void 0, false) }, void 0, false), n.jsxDEV("div", { children: [n.jsxDEV("p", { className: "text-xs font-mono uppercase tracking-[0.15em] text-[#d02128] font-semibold", children: u ? "خطوة النشر مقفلة في العرض التجريبي" : "Publish Step Locked" }, void 0, false), n.jsxDEV("p", { className: "text-[11px] text-white/75 leading-snug mt-0.5", children: u ? "تم حفظ تخصيص موقعك ثلاثي الأبعاد مع حقوق Powered by EFerz." : "Your customized 3D website is saved with locked Powered by EFerz (EFerz.com) attribution." }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { className: "flex-1 flex flex-col md:flex-row overflow-hidden relative", children: [!ee && q && n.jsxDEV("aside", { className: "w-full md:w-[390px] lg:w-[430px] max-h-[50vh] md:max-h-none md:h-full bg-[#0B0B12] border-b md:border-b-0 md:border-r border-white/12 flex flex-col z-30 shrink-0 overflow-hidden", children: [n.jsxDEV("div", { className: "p-3.5 border-b border-white/10 flex items-center justify-between gap-2 bg-[#10101A]", children: [n.jsxDEV("div", { className: "min-w-0", children: [n.jsxDEV("div", { className: "flex items-center gap-1.5", children: [n.jsxDEV(nS, { className: "w-3.5 h-3.5 text-cyan-400 shrink-0" }, void 0, false), n.jsxDEV("span", { className: "text-[10px] font-mono uppercase tracking-[0.18em] text-cyan-300 truncate", children: u ? `العنصر المحدد: ${et}` : `Editing: ${et}` }, void 0, false)] }, void 0, true), n.jsxDEV("h2", { className: "text-xs sm:text-sm font-display font-bold text-white mt-0.5 truncate", children: u ? "انقر على أي نص في الموقع لتعديله فوراً أو من القائمة" : "Click any text on site to edit inline or below" }, void 0, false)] }, void 0, true), n.jsxDEV("button", { type: "button", onClick: () => oe(false), className: "px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-mono text-white/60 hover:text-white cursor-pointer shrink-0", children: u ? "إخفاء" : "Hide" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: "p-2 bg-black/45 border-b border-white/10 max-h-32 overflow-y-auto", children: n.jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-1 text-[10px] font-mono uppercase tracking-[0.06em]", children: ci || Cr ? Mi.map((y) => {
      const _ = y.icon, $ = Ze === y.id;
      return n.jsxDEV("button", { type: "button", onClick: () => {
        _e(y.id), lt(y.label);
      }, style: $ ? { backgroundColor: Ne } : void 0, className: `flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-left truncate transition-all cursor-pointer ${$ ? "text-white font-bold shadow-sm" : "bg-white/[0.03] text-white/65 hover:text-white hover:bg-white/10"}`, children: [n.jsxDEV(_, { className: "w-3 h-3 shrink-0" }, void 0, false), n.jsxDEV("span", { className: "truncate", children: y.label }, void 0, false)] }, y.id, true);
    }) : sr ? ht.map((y) => {
      const _ = y.icon, $ = G === y.id;
      return n.jsxDEV("button", { type: "button", onClick: () => {
        H(y.id), lt(y.label);
      }, style: $ ? { backgroundColor: Ne } : void 0, className: `flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-left truncate transition-all cursor-pointer ${$ ? "text-black font-bold shadow-sm" : "bg-white/[0.03] text-white/65 hover:text-white hover:bg-white/10"}`, children: [n.jsxDEV(_, { className: "w-3 h-3 shrink-0" }, void 0, false), n.jsxDEV("span", { className: "truncate", children: y.label }, void 0, false)] }, y.id, true);
    }) : zr ? Pi.map((y) => {
      const _ = y.icon, $ = De === y.id;
      return n.jsxDEV("button", { type: "button", onClick: () => {
        Ke(y.id), lt(y.label);
      }, className: `flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-left truncate transition-all cursor-pointer ${$ ? "bg-[#c4506a] text-white font-bold shadow-sm" : "bg-white/[0.03] text-white/65 hover:text-white hover:bg-white/10"}`, children: [n.jsxDEV(_, { className: "w-3 h-3 shrink-0" }, void 0, false), n.jsxDEV("span", { className: "truncate", children: y.label }, void 0, false)] }, y.id, true);
    }) : gi.map((y) => {
      const _ = y.icon, $ = Z === y.id;
      return n.jsxDEV("button", { type: "button", onClick: () => {
        ke(y.id), lt(y.label);
      }, className: `flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-left truncate transition-all cursor-pointer ${$ ? "bg-[#FF5500] text-white font-bold shadow-sm" : "bg-white/[0.03] text-white/65 hover:text-white hover:bg-white/10"}`, children: [n.jsxDEV(_, { className: "w-3 h-3 shrink-0" }, void 0, false), n.jsxDEV("span", { className: "truncate", children: y.label }, void 0, false)] }, y.id, true);
    }) }, void 0, false) }, void 0, false), n.jsxDEV("div", { ref: Te, className: "flex-1 overflow-y-auto p-4 space-y-5 select-text", children: [n.jsxDEV("div", { className: "p-2.5 rounded-xl bg-[#d02128]/15 border border-[#d02128]/40 flex items-center justify-between gap-2 text-[11px]", children: [n.jsxDEV("div", { className: "flex items-center gap-2 min-w-0", children: [n.jsxDEV(Bs, { className: "w-3.5 h-3.5 text-[#d02128] shrink-0" }, void 0, false), n.jsxDEV("span", { className: "text-white/90 truncate", children: ["Footer Locked: ", n.jsxDEV("strong", { children: "Powered by EFerz (EFerz.com)" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("a", { href: "https://eferz.com", target: "_blank", rel: "noopener noreferrer", className: "text-[10px] font-mono uppercase tracking-wider text-amber-300 underline shrink-0", children: "EFerz.com ↗" }, void 0, false)] }, void 0, true), ci ? n.jsxDEV("div", { className: "space-y-4", children: [Ze === "brand" && n.jsxDEV("div", { className: "space-y-4", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-[#ff5c8a]/15 border border-[#ff5c8a]/40", children: n.jsxDEV("p", { className: "text-xs text-white/85 leading-relaxed", children: [n.jsxDEV("strong", { children: "MELTO Artisan Creamery:" }, void 0, false), " Customize the brand identity, logo, sub-headline, and preloader emblem."] }, void 0, true) }, void 0, false), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Brand Name" }, void 0, false), n.jsxDEV("input", { type: "text", value: A.brandName, onChange: (y) => N((_) => ({ ..._, brandName: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Sub-Headline" }, void 0, false), n.jsxDEV("input", { type: "text", value: A.brandSub, onChange: (y) => N((_) => ({ ..._, brandSub: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV(Zn, { label: "Header Brand Logo", sublabel: "Custom emblem or logo shown in top header bar", value: A.logoImageUrl, onChange: (y) => N((_) => ({ ..._, logoImageUrl: y })), accentColor: "#ff5c8a", placeholder: "https://...", presetImages: [{ label: "Artisan Creamery Crest", url: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&auto=format&fit=crop&q=80" }, { label: "Vintage Dairy Stamp", url: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&auto=format&fit=crop&q=80" }, { label: "Scoop & Cone Badge", url: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&auto=format&fit=crop&q=80" }] }, void 0, false), n.jsxDEV(Zn, { label: "Preloader Logo & Emblem", sublabel: "Displays inside the loading screen on initial visit", value: A.loaderImageUrl, onChange: (y) => N((_) => ({ ..._, loaderImageUrl: y })), accentColor: "#ff5c8a", placeholder: "https://...", presetImages: [{ label: "Artisan Milk Churn", url: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format&fit=crop&q=80" }, { label: "Ice Cream Crest", url: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&auto=format&fit=crop&q=80" }, { label: "Golden Scoop", url: "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=400&auto=format&fit=crop&q=80" }] }, void 0, false)] }, void 0, true), Ze === "hero" && n.jsxDEV("div", { className: "space-y-4", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-[#ff5c8a]/15 border border-[#ff5c8a]/40", children: n.jsxDEV("p", { className: "text-xs text-white/85 leading-relaxed", children: [n.jsxDEV("strong", { children: "3D Tubs Carousel & Stage:" }, void 0, false), " Customize the main tagline and rotating ring text."] }, void 0, true) }, void 0, false), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Hero Tagline" }, void 0, false), n.jsxDEV("input", { type: "text", value: A.heroTagline, onChange: (y) => N((_) => ({ ..._, heroTagline: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Rotating Ring Text" }, void 0, false), n.jsxDEV("input", { type: "text", value: A.rotatingRingText, onChange: (y) => N((_) => ({ ..._, rotatingRingText: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), Ze === "products" && n.jsxDEV("div", { className: "space-y-4", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-[#ff5c8a]/15 border border-[#ff5c8a]/40", children: n.jsxDEV("p", { className: "text-xs text-white/85 leading-relaxed", children: [n.jsxDEV("strong", { children: "6 Signature 3D Flavors:" }, void 0, false), " Select a flavor to customize image, colors, ingredients, price, and descriptions."] }, void 0, true) }, void 0, false), n.jsxDEV("div", { className: "flex gap-1.5 overflow-x-auto pb-1", children: A.products.map((y, _) => n.jsxDEV("button", { type: "button", onClick: () => ge(_), style: { borderColor: Q === _ ? y.col : "transparent", backgroundColor: Q === _ ? `${y.col}33` : "rgba(255,255,255,0.05)" }, className: "px-2.5 py-1.5 rounded-lg border text-[11px] font-mono whitespace-nowrap text-white cursor-pointer", children: y.n }, _, false)) }, void 0, false), A.products[Q] && n.jsxDEV("div", { className: "space-y-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/10", children: [n.jsxDEV(Zn, { label: `${A.products[Q].n} Custom Tub Artwork`, sublabel: "Replaces or overlays the tub image on cards & spotlight", value: A.products[Q].customImageUrl, onChange: (y) => {
      N((_) => {
        const $ = [..._.products];
        return $[Q] = { ...$[Q], customImageUrl: y }, { ..._, products: $ };
      });
    }, accentColor: A.products[Q].col, placeholder: "https://...", presetImages: [{ label: "Belgian Chocolate Scoop", url: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&auto=format&fit=crop&q=80" }, { label: "Vanilla Bean Gelato", url: "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=600&auto=format&fit=crop&q=80" }, { label: "Wild Strawberry Pint", url: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80" }, { label: "Pistachio Churn", url: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&auto=format&fit=crop&q=80" }, { label: "Salted Caramel Swirl", url: "https://images.unsplash.com/photo-1560008581-09826d1de69e?w=600&auto=format&fit=crop&q=80" }] }, void 0, false), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Flavor Name" }, void 0, false), n.jsxDEV("input", { type: "text", value: A.products[Q].n, onChange: (y) => {
      const _ = y.target.value;
      N(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], n: _ }, { ...$, products: ie };
      });
    }, className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Price (Rs)" }, void 0, false), n.jsxDEV("input", { type: "number", value: A.products[Q].rs, onChange: (y) => {
      const _ = Number(y.target.value);
      N(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], rs: _ }, { ...$, products: ie };
      });
    }, className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-3 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Primary Color" }, void 0, false), n.jsxDEV("div", { className: "flex items-center gap-1.5", children: [n.jsxDEV("input", { type: "color", value: A.products[Q].col, onChange: (y) => {
      const _ = y.target.value;
      N(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], col: _ }, { ...$, products: ie };
      });
    }, className: "w-7 h-7 rounded border border-white/20 bg-transparent cursor-pointer p-0 shrink-0" }, void 0, false), n.jsxDEV("input", { type: "text", value: A.products[Q].col, onChange: (y) => {
      const _ = y.target.value;
      N(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], col: _ }, { ...$, products: ie };
      });
    }, className: "w-full px-1.5 py-1 rounded bg-white/[0.05] border border-white/15 text-[11px] font-mono text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Card Tint" }, void 0, false), n.jsxDEV("div", { className: "flex items-center gap-1.5", children: [n.jsxDEV("input", { type: "color", value: A.products[Q].tint, onChange: (y) => {
      const _ = y.target.value;
      N(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], tint: _ }, { ...$, products: ie };
      });
    }, className: "w-7 h-7 rounded border border-white/20 bg-transparent cursor-pointer p-0 shrink-0" }, void 0, false), n.jsxDEV("input", { type: "text", value: A.products[Q].tint, onChange: (y) => {
      const _ = y.target.value;
      N(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], tint: _ }, { ...$, products: ie };
      });
    }, className: "w-full px-1.5 py-1 rounded bg-white/[0.05] border border-white/15 text-[11px] font-mono text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Lid Color" }, void 0, false), n.jsxDEV("div", { className: "flex items-center gap-1.5", children: [n.jsxDEV("input", { type: "color", value: A.products[Q].lid || "#ffffff", onChange: (y) => {
      const _ = y.target.value;
      N(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], lid: _ }, { ...$, products: ie };
      });
    }, className: "w-7 h-7 rounded border border-white/20 bg-transparent cursor-pointer p-0 shrink-0" }, void 0, false), n.jsxDEV("input", { type: "text", value: A.products[Q].lid || "#ffffff", onChange: (y) => {
      const _ = y.target.value;
      N(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], lid: _ }, { ...$, products: ie };
      });
    }, className: "w-full px-1.5 py-1 rounded bg-white/[0.05] border border-white/15 text-[11px] font-mono text-white" }, void 0, false)] }, void 0, true)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Label Top" }, void 0, false), n.jsxDEV("input", { type: "text", value: A.products[Q].l1, onChange: (y) => {
      const _ = y.target.value;
      N(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], l1: _ }, { ...$, products: ie };
      });
    }, className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Label Bottom" }, void 0, false), n.jsxDEV("input", { type: "text", value: A.products[Q].l2, onChange: (y) => {
      const _ = y.target.value;
      N(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], l2: _ }, { ...$, products: ie };
      });
    }, className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Tagline" }, void 0, false), n.jsxDEV("input", { type: "text", value: A.products[Q].tag, onChange: (y) => {
      const _ = y.target.value;
      N(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], tag: _ }, { ...$, products: ie };
      });
    }, className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Richness Level (1-5)" }, void 0, false), n.jsxDEV("input", { type: "range", min: 1, max: 5, value: A.products[Q].heat, onChange: (y) => {
      const _ = Number(y.target.value);
      N(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], heat: _ }, { ...$, products: ie };
      });
    }, className: "w-full" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Description" }, void 0, false), n.jsxDEV("textarea", { rows: 2, value: A.products[Q].desc, onChange: (y) => {
      const _ = y.target.value;
      N(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], desc: _ }, { ...$, products: ie };
      });
    }, className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Ingredients" }, void 0, false), n.jsxDEV("input", { type: "text", value: A.products[Q].ing || "", onChange: (y) => {
      const _ = y.target.value;
      N(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], ing: _ }, { ...$, products: ie };
      });
    }, className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Nutrition Fact" }, void 0, false), n.jsxDEV("input", { type: "text", value: A.products[Q].nut || "", onChange: (y) => {
      const _ = y.target.value;
      N(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], nut: _ }, { ...$, products: ie };
      });
    }, className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Pairs With" }, void 0, false), n.jsxDEV("input", { type: "text", value: A.products[Q].pair || "", onChange: (y) => {
      const _ = y.target.value;
      N(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], pair: _ }, { ...$, products: ie };
      });
    }, className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Chef Quote" }, void 0, false), n.jsxDEV("input", { type: "text", value: A.products[Q].quote || "", onChange: (y) => {
      const _ = y.target.value;
      N(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], quote: _ }, { ...$, products: ie };
      });
    }, className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true)] }, void 0, true)] }, void 0, true), Ze === "story" && n.jsxDEV("div", { className: "space-y-4", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-[#ff5c8a]/15 border border-[#ff5c8a]/40", children: n.jsxDEV("p", { className: "text-xs text-white/85 leading-relaxed", children: [n.jsxDEV("strong", { children: "Artisan Story & Kitchen Heritage:" }, void 0, false), " Slow-churned fresh cream narrative, farm photo, and stats."] }, void 0, true) }, void 0, false), n.jsxDEV(Zn, { label: "Heritage Kitchen & Farm Banner Image", sublabel: "Displays inside the Our Story section", value: A.storyImageUrl, onChange: (y) => N((_) => ({ ..._, storyImageUrl: y })), accentColor: "#ff5c8a", placeholder: "https://...", presetImages: [{ label: "Alpine Dairy Pasture", url: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&auto=format&fit=crop&q=80" }, { label: "Slow Copper Churn", url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80" }, { label: "Fresh Milk Creamery", url: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&auto=format&fit=crop&q=80" }] }, void 0, false), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Story Title" }, void 0, false), n.jsxDEV("input", { type: "text", value: A.storyTitle, onChange: (y) => N((_) => ({ ..._, storyTitle: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Story Paragraph" }, void 0, false), n.jsxDEV("textarea", { rows: 4, value: A.storyText, onChange: (y) => N((_) => ({ ..._, storyText: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white leading-relaxed" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-3 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[9px] font-mono text-white/60 mb-1", children: "Stat 1 Num" }, void 0, false), n.jsxDEV("input", { type: "text", value: A.storyStat1Num, onChange: (y) => N((_) => ({ ..._, storyStat1Num: y.target.value })), className: "w-full px-2 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false), n.jsxDEV("input", { type: "text", value: A.storyStat1Label, onChange: (y) => N((_) => ({ ..._, storyStat1Label: y.target.value })), placeholder: "Label", className: "w-full mt-1 px-2 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-[10px] text-white/70" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[9px] font-mono text-white/60 mb-1", children: "Stat 2 Num" }, void 0, false), n.jsxDEV("input", { type: "text", value: A.storyStat2Num, onChange: (y) => N((_) => ({ ..._, storyStat2Num: y.target.value })), className: "w-full px-2 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false), n.jsxDEV("input", { type: "text", value: A.storyStat2Label, onChange: (y) => N((_) => ({ ..._, storyStat2Label: y.target.value })), placeholder: "Label", className: "w-full mt-1 px-2 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-[10px] text-white/70" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[9px] font-mono text-white/60 mb-1", children: "Stat 3 Num" }, void 0, false), n.jsxDEV("input", { type: "text", value: A.storyStat3Num, onChange: (y) => N((_) => ({ ..._, storyStat3Num: y.target.value })), className: "w-full px-2 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false), n.jsxDEV("input", { type: "text", value: A.storyStat3Label, onChange: (y) => N((_) => ({ ..._, storyStat3Label: y.target.value })), placeholder: "Label", className: "w-full mt-1 px-2 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-[10px] text-white/70" }, void 0, false)] }, void 0, true)] }, void 0, true)] }, void 0, true), Ze === "spotlight" && n.jsxDEV("div", { className: "space-y-4", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-[#ff5c8a]/15 border border-[#ff5c8a]/40", children: n.jsxDEV("p", { className: "text-xs text-white/85 leading-relaxed", children: [n.jsxDEV("strong", { children: "3D Pint Spotlight & Specifications:" }, void 0, false), " Tub volume label and freezer storage recommendations."] }, void 0, true) }, void 0, false), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Net Weight / Volume" }, void 0, false), n.jsxDEV("input", { type: "text", value: A.netWeightLabel, onChange: (y) => N((_) => ({ ..._, netWeightLabel: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Storage Instructions" }, void 0, false), n.jsxDEV("textarea", { rows: 2, value: A.storageText, onChange: (y) => N((_) => ({ ..._, storageText: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), Ze === "footer" && n.jsxDEV("div", { className: "space-y-4", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Giant Wordmark" }, void 0, false), n.jsxDEV("input", { type: "text", value: A.footerGiant, onChange: (y) => N((_) => ({ ..._, footerGiant: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: "p-3.5 rounded-xl bg-[#d02128]/15 border border-[#d02128]/40 space-y-1.5", children: [n.jsxDEV("div", { className: "flex items-center gap-2 text-xs text-white font-bold", children: [n.jsxDEV(Bs, { className: "w-3.5 h-3.5 text-[#d02128]" }, void 0, false), "Protected Attribution Watermark"] }, void 0, true), n.jsxDEV("p", { className: "text-[11px] text-white/70", children: ["© 2026 ", n.jsxDEV("strong", { children: A.brandName }, void 0, false), ". All Rights Reserved. |", " ", n.jsxDEV("strong", { className: "text-amber-300", children: "Powered by EFerz (EFerz.com)" }, void 0, false), " — permanently locked."] }, void 0, true)] }, void 0, true)] }, void 0, true), Ze === "html" && n.jsxDEV("div", { className: "space-y-4", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-cyan-500/15 border border-cyan-400/40", children: n.jsxDEV("p", { className: "text-xs text-white/85 leading-relaxed", children: [n.jsxDEV("strong", { children: "Direct HTML Code Editor:" }, void 0, false), " Paste or edit custom HTML directly. Changes apply immediately to the 3D frame."] }, void 0, true) }, void 0, false), n.jsxDEV("textarea", { rows: 12, value: A.customHtmlOverride || MT(A), onChange: (y) => N((_) => ({ ..._, customHtmlOverride: y.target.value })), className: "w-full p-3 rounded-xl bg-black/60 border border-white/20 text-[11px] font-mono text-cyan-200 leading-relaxed" }, void 0, false), n.jsxDEV("button", { type: "button", onClick: () => N((y) => ({ ...y, customHtmlOverride: null })), className: "px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white cursor-pointer", children: "Reset to Authentic Template" }, void 0, false)] }, void 0, true)] }, void 0, true) : Cr ? n.jsxDEV("div", { className: "space-y-4", children: [Ze === "brand" && n.jsxDEV("div", { className: "space-y-4", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-[#e0881c]/15 border border-[#e0881c]/40", children: n.jsxDEV("p", { className: "text-xs text-white/85 leading-relaxed", children: [n.jsxDEV("strong", { children: "ZAIKA Heritage Pantry:" }, void 0, false), " Customize the traditional spice brand identity, logo, and preloader emblem."] }, void 0, true) }, void 0, false), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Brand Name" }, void 0, false), n.jsxDEV("input", { type: "text", value: k.brandName, onChange: (y) => V((_) => ({ ..._, brandName: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Sub-Headline" }, void 0, false), n.jsxDEV("input", { type: "text", value: k.brandSub, onChange: (y) => V((_) => ({ ..._, brandSub: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV(Zn, { label: "Header Brand Logo", sublabel: "Custom emblem or logo shown in top header bar", value: k.logoImageUrl, onChange: (y) => V((_) => ({ ..._, logoImageUrl: y })), accentColor: "#e0881c", placeholder: "https://...", presetImages: [{ label: "Brass Spice Stamp", url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop&q=80" }, { label: "Royal Mughal Crest", url: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=400&auto=format&fit=crop&q=80" }, { label: "Mortar & Pestle", url: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&auto=format&fit=crop&q=80" }] }, void 0, false), n.jsxDEV(Zn, { label: "Preloader Logo & Emblem", sublabel: "Displays inside the loading screen on initial visit", value: k.loaderImageUrl, onChange: (y) => V((_) => ({ ..._, loaderImageUrl: y })), accentColor: "#e0881c", placeholder: "https://...", presetImages: [{ label: "Clay Urn Matka", url: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=400&auto=format&fit=crop&q=80" }, { label: "Saffron Threads", url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop&q=80" }, { label: "Terracotta Jar", url: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=400&auto=format&fit=crop&q=80" }] }, void 0, false)] }, void 0, true), Ze === "hero" && n.jsxDEV("div", { className: "space-y-4", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-[#e0881c]/15 border border-[#e0881c]/40", children: n.jsxDEV("p", { className: "text-xs text-white/85 leading-relaxed", children: [n.jsxDEV("strong", { children: "3D Jars Carousel & Stage:" }, void 0, false), " Customize the main tagline and rotating circular ring text."] }, void 0, true) }, void 0, false), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Hero Tagline" }, void 0, false), n.jsxDEV("input", { type: "text", value: k.heroTagline, onChange: (y) => V((_) => ({ ..._, heroTagline: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Rotating Ring Text" }, void 0, false), n.jsxDEV("input", { type: "text", value: k.rotatingRingText, onChange: (y) => V((_) => ({ ..._, rotatingRingText: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), Ze === "products" && n.jsxDEV("div", { className: "space-y-4", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-[#e0881c]/15 border border-[#e0881c]/40", children: n.jsxDEV("p", { className: "text-xs text-white/85 leading-relaxed", children: [n.jsxDEV("strong", { children: "6 Heritage Jars & Masalas:" }, void 0, false), " Select a jar to adjust image, colors, heat, ingredients, and pricing."] }, void 0, true) }, void 0, false), n.jsxDEV("div", { className: "flex gap-1.5 overflow-x-auto pb-1", children: k.products.map((y, _) => n.jsxDEV("button", { type: "button", onClick: () => ge(_), style: { borderColor: Q === _ ? y.col : "transparent", backgroundColor: Q === _ ? `${y.col}33` : "rgba(255,255,255,0.05)" }, className: "px-2.5 py-1.5 rounded-lg border text-[11px] font-mono whitespace-nowrap text-white cursor-pointer", children: y.n }, _, false)) }, void 0, false), k.products[Q] && n.jsxDEV("div", { className: "space-y-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/10", children: [n.jsxDEV(Zn, { label: `${k.products[Q].n} Custom Jar Artwork`, sublabel: "Replaces or overlays the jar image on cards & spotlight", value: k.products[Q].customImageUrl, onChange: (y) => {
      V((_) => {
        const $ = [..._.products];
        return $[Q] = { ...$[Q], customImageUrl: y }, { ..._, products: $ };
      });
    }, accentColor: k.products[Q].col, placeholder: "https://...", presetImages: [{ label: "Kashmiri Degi Mirch", url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80" }, { label: "Mango Achar Urn", url: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=600&auto=format&fit=crop&q=80" }, { label: "Golden Turmeric Jar", url: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&auto=format&fit=crop&q=80" }, { label: "Garam Masala Blend", url: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=600&auto=format&fit=crop&q=80" }, { label: "Green Chilli Thecha", url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80" }] }, void 0, false), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Jar Name" }, void 0, false), n.jsxDEV("input", { type: "text", value: k.products[Q].n, onChange: (y) => {
      const _ = y.target.value;
      V(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], n: _ }, { ...$, products: ie };
      });
    }, className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Price (Rs)" }, void 0, false), n.jsxDEV("input", { type: "number", value: k.products[Q].rs, onChange: (y) => {
      const _ = Number(y.target.value);
      V(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], rs: _ }, { ...$, products: ie };
      });
    }, className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-3 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Spice Color" }, void 0, false), n.jsxDEV("div", { className: "flex items-center gap-1.5", children: [n.jsxDEV("input", { type: "color", value: k.products[Q].col, onChange: (y) => {
      const _ = y.target.value;
      V(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], col: _ }, { ...$, products: ie };
      });
    }, className: "w-7 h-7 rounded border border-white/20 bg-transparent cursor-pointer p-0 shrink-0" }, void 0, false), n.jsxDEV("input", { type: "text", value: k.products[Q].col, onChange: (y) => {
      const _ = y.target.value;
      V(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], col: _ }, { ...$, products: ie };
      });
    }, className: "w-full px-1.5 py-1 rounded bg-white/[0.05] border border-white/15 text-[11px] font-mono text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Card Tint" }, void 0, false), n.jsxDEV("div", { className: "flex items-center gap-1.5", children: [n.jsxDEV("input", { type: "color", value: k.products[Q].tint, onChange: (y) => {
      const _ = y.target.value;
      V(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], tint: _ }, { ...$, products: ie };
      });
    }, className: "w-7 h-7 rounded border border-white/20 bg-transparent cursor-pointer p-0 shrink-0" }, void 0, false), n.jsxDEV("input", { type: "text", value: k.products[Q].tint, onChange: (y) => {
      const _ = y.target.value;
      V(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], tint: _ }, { ...$, products: ie };
      });
    }, className: "w-full px-1.5 py-1 rounded bg-white/[0.05] border border-white/15 text-[11px] font-mono text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Lid Color" }, void 0, false), n.jsxDEV("div", { className: "flex items-center gap-1.5", children: [n.jsxDEV("input", { type: "color", value: k.products[Q].lid || "#ffffff", onChange: (y) => {
      const _ = y.target.value;
      V(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], lid: _ }, { ...$, products: ie };
      });
    }, className: "w-7 h-7 rounded border border-white/20 bg-transparent cursor-pointer p-0 shrink-0" }, void 0, false), n.jsxDEV("input", { type: "text", value: k.products[Q].lid || "#ffffff", onChange: (y) => {
      const _ = y.target.value;
      V(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], lid: _ }, { ...$, products: ie };
      });
    }, className: "w-full px-1.5 py-1 rounded bg-white/[0.05] border border-white/15 text-[11px] font-mono text-white" }, void 0, false)] }, void 0, true)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Label Top" }, void 0, false), n.jsxDEV("input", { type: "text", value: k.products[Q].l1, onChange: (y) => {
      const _ = y.target.value;
      V(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], l1: _ }, { ...$, products: ie };
      });
    }, className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Label Bottom" }, void 0, false), n.jsxDEV("input", { type: "text", value: k.products[Q].l2, onChange: (y) => {
      const _ = y.target.value;
      V(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], l2: _ }, { ...$, products: ie };
      });
    }, className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Tagline" }, void 0, false), n.jsxDEV("input", { type: "text", value: k.products[Q].tag, onChange: (y) => {
      const _ = y.target.value;
      V(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], tag: _ }, { ...$, products: ie };
      });
    }, className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Heat Level (1-5)" }, void 0, false), n.jsxDEV("input", { type: "range", min: 1, max: 5, value: k.products[Q].heat, onChange: (y) => {
      const _ = Number(y.target.value);
      V(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], heat: _ }, { ...$, products: ie };
      });
    }, className: "w-full" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Description" }, void 0, false), n.jsxDEV("textarea", { rows: 2, value: k.products[Q].desc, onChange: (y) => {
      const _ = y.target.value;
      V(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], desc: _ }, { ...$, products: ie };
      });
    }, className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Ingredients" }, void 0, false), n.jsxDEV("input", { type: "text", value: k.products[Q].ing || "", onChange: (y) => {
      const _ = y.target.value;
      V(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], ing: _ }, { ...$, products: ie };
      });
    }, className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Nutritional Fact" }, void 0, false), n.jsxDEV("input", { type: "text", value: k.products[Q].nut || "", onChange: (y) => {
      const _ = y.target.value;
      V(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], nut: _ }, { ...$, products: ie };
      });
    }, className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Kitchen Pairing" }, void 0, false), n.jsxDEV("input", { type: "text", value: k.products[Q].pair || "", onChange: (y) => {
      const _ = y.target.value;
      V(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], pair: _ }, { ...$, products: ie };
      });
    }, className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Heritage Quote" }, void 0, false), n.jsxDEV("input", { type: "text", value: k.products[Q].quote || "", onChange: (y) => {
      const _ = y.target.value;
      V(($) => {
        const ie = [...$.products];
        return ie[Q] = { ...ie[Q], quote: _ }, { ...$, products: ie };
      });
    }, className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true)] }, void 0, true)] }, void 0, true), Ze === "story" && n.jsxDEV("div", { className: "space-y-4", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-[#e0881c]/15 border border-[#e0881c]/40", children: n.jsxDEV("p", { className: "text-xs text-white/85 leading-relaxed", children: [n.jsxDEV("strong", { children: "Sun-Cured Heritage Story:" }, void 0, false), " Slow sun, mustard oil, family recipes, photo, and stats."] }, void 0, true) }, void 0, false), n.jsxDEV(Zn, { label: "Spice Farm & Terracotta Yard Banner Image", sublabel: "Displays inside the Our Heritage Story section", value: k.storyImageUrl, onChange: (y) => V((_) => ({ ..._, storyImageUrl: y })), accentColor: "#e0881c", placeholder: "https://...", presetImages: [{ label: "Terracotta Yard Sun Drying", url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80" }, { label: "Stone Mill Grinding", url: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&auto=format&fit=crop&q=80" }, { label: "Old Delhi Spice Bazaar", url: "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=800&auto=format&fit=crop&q=80" }] }, void 0, false), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Story Title" }, void 0, false), n.jsxDEV("input", { type: "text", value: k.storyTitle, onChange: (y) => V((_) => ({ ..._, storyTitle: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Story Paragraph" }, void 0, false), n.jsxDEV("textarea", { rows: 4, value: k.storyText, onChange: (y) => V((_) => ({ ..._, storyText: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white leading-relaxed" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-3 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[9px] font-mono text-white/60 mb-1", children: "Stat 1 Num" }, void 0, false), n.jsxDEV("input", { type: "text", value: k.storyStat1Num, onChange: (y) => V((_) => ({ ..._, storyStat1Num: y.target.value })), className: "w-full px-2 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false), n.jsxDEV("input", { type: "text", value: k.storyStat1Label, onChange: (y) => V((_) => ({ ..._, storyStat1Label: y.target.value })), placeholder: "Label", className: "w-full mt-1 px-2 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-[10px] text-white/70" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[9px] font-mono text-white/60 mb-1", children: "Stat 2 Num" }, void 0, false), n.jsxDEV("input", { type: "text", value: k.storyStat2Num, onChange: (y) => V((_) => ({ ..._, storyStat2Num: y.target.value })), className: "w-full px-2 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false), n.jsxDEV("input", { type: "text", value: k.storyStat2Label, onChange: (y) => V((_) => ({ ..._, storyStat2Label: y.target.value })), placeholder: "Label", className: "w-full mt-1 px-2 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-[10px] text-white/70" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[9px] font-mono text-white/60 mb-1", children: "Stat 3 Num" }, void 0, false), n.jsxDEV("input", { type: "text", value: k.storyStat3Num, onChange: (y) => V((_) => ({ ..._, storyStat3Num: y.target.value })), className: "w-full px-2 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false), n.jsxDEV("input", { type: "text", value: k.storyStat3Label, onChange: (y) => V((_) => ({ ..._, storyStat3Label: y.target.value })), placeholder: "Label", className: "w-full mt-1 px-2 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-[10px] text-white/70" }, void 0, false)] }, void 0, true)] }, void 0, true)] }, void 0, true), Ze === "spotlight" && n.jsxDEV("div", { className: "space-y-4", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-[#e0881c]/15 border border-[#e0881c]/40", children: n.jsxDEV("p", { className: "text-xs text-white/85 leading-relaxed", children: [n.jsxDEV("strong", { children: "3D Jar Spotlight & Specifications:" }, void 0, false), " Glass jar net weight and shelf life instructions."] }, void 0, true) }, void 0, false), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Net Weight Label" }, void 0, false), n.jsxDEV("input", { type: "text", value: k.netWeightLabel, onChange: (y) => V((_) => ({ ..._, netWeightLabel: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Shelf Life Instructions" }, void 0, false), n.jsxDEV("textarea", { rows: 2, value: k.shelfLifeText, onChange: (y) => V((_) => ({ ..._, shelfLifeText: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), Ze === "footer" && n.jsxDEV("div", { className: "space-y-4", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Giant Wordmark" }, void 0, false), n.jsxDEV("input", { type: "text", value: k.footerGiant, onChange: (y) => V((_) => ({ ..._, footerGiant: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: "p-3.5 rounded-xl bg-[#d02128]/15 border border-[#d02128]/40 space-y-1.5", children: [n.jsxDEV("div", { className: "flex items-center gap-2 text-xs text-white font-bold", children: [n.jsxDEV(Bs, { className: "w-3.5 h-3.5 text-[#d02128]" }, void 0, false), "Protected Attribution Watermark"] }, void 0, true), n.jsxDEV("p", { className: "text-[11px] text-white/70", children: ["© 2026 ", n.jsxDEV("strong", { children: k.brandName }, void 0, false), ". All Rights Reserved. |", " ", n.jsxDEV("strong", { className: "text-amber-300", children: "Powered by EFerz (EFerz.com)" }, void 0, false), " — permanently locked."] }, void 0, true)] }, void 0, true)] }, void 0, true), Ze === "html" && n.jsxDEV("div", { className: "space-y-4", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-amber-500/15 border border-amber-400/40", children: n.jsxDEV("p", { className: "text-xs text-white/85 leading-relaxed", children: [n.jsxDEV("strong", { children: "Direct HTML Code Editor:" }, void 0, false), " Paste or edit custom HTML directly. Changes apply immediately to the 3D frame."] }, void 0, true) }, void 0, false), n.jsxDEV("textarea", { rows: 12, value: k.customHtmlOverride || AT(k), onChange: (y) => V((_) => ({ ..._, customHtmlOverride: y.target.value })), className: "w-full p-3 rounded-xl bg-black/60 border border-white/20 text-[11px] font-mono text-amber-200 leading-relaxed" }, void 0, false), n.jsxDEV("button", { type: "button", onClick: () => V((y) => ({ ...y, customHtmlOverride: null })), className: "px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white cursor-pointer", children: "Reset to Authentic Template" }, void 0, false)] }, void 0, true)] }, void 0, true) : sr ? n.jsxDEV("div", { className: "space-y-4", children: [U && n.jsxDEV("div", { className: "p-3.5 rounded-2xl bg-cyan-500/15 border border-cyan-400/50 space-y-2", children: [n.jsxDEV("div", { className: "flex items-center justify-between", children: [n.jsxDEV("span", { className: "text-[10px] font-mono uppercase tracking-wider text-cyan-300 font-bold", children: ["✎ Direct Clicked Text Field (", U, ")"] }, void 0, true), n.jsxDEV("button", { type: "button", onClick: () => Y(""), className: "text-[10px] font-mono text-white/50 hover:text-white cursor-pointer", children: "Clear" }, void 0, false)] }, void 0, true), n.jsxDEV("textarea", { rows: 2, value: re, onChange: (y) => {
      ne(y.target.value), Ae(b, U, y.target.value);
    }, className: "w-full px-3 py-2 rounded-xl bg-black/50 border border-cyan-400/50 text-xs text-white focus:outline-none" }, void 0, false)] }, void 0, true), G === "brand" && n.jsxDEV("div", { className: "space-y-4", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-white/[0.04] border border-white/10", children: n.jsxDEV("p", { className: "text-xs text-white/85 leading-relaxed", children: [n.jsxDEV("strong", { children: "01. Brand & 3D Studio Palette:" }, void 0, false), " Changes here immediately update the 3D WebGL lighting, brand header, and locked copyright brand name."] }, void 0, true) }, void 0, false), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Brand Name" }, void 0, false), n.jsxDEV("input", { type: "text", value: jt.brandName, onChange: (y) => Ae(b, "brandName", y.target.value), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Brand Sub-Tag" }, void 0, false), n.jsxDEV("input", { type: "text", value: jt.brandTag, onChange: (y) => Ae(b, "brandTag", y.target.value), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1.5", children: "Custom Brand Logo (PNG/SVG)" }, void 0, false), n.jsxDEV("input", { ref: K, type: "file", accept: "image/*", onChange: R, className: "hidden" }, void 0, false), n.jsxDEV("div", { className: "flex items-center gap-2", children: [n.jsxDEV("button", { type: "button", onClick: () => {
      var y;
      return (y = K.current) == null ? void 0 : y.click();
    }, className: "flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] border border-dashed border-white/25 text-xs font-mono uppercase tracking-[0.14em] text-white cursor-pointer", children: [n.jsxDEV(Os, { className: "w-4 h-4", style: { color: Ne } }, void 0, false), n.jsxDEV("span", { children: jt.logoImageUrl ? "Change Brand Logo" : "Upload Brand Logo" }, void 0, false)] }, void 0, true), jt.logoImageUrl && n.jsxDEV("button", { type: "button", onClick: () => Ae(b, "logoImageUrl", ""), className: "px-3 py-2.5 rounded-xl bg-rose-500/20 border border-rose-400/30 text-xs font-mono text-rose-200 cursor-pointer", children: "Remove" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "3D Primary Accent" }, void 0, false), n.jsxDEV("input", { type: "color", value: jt.primaryHex, onChange: (y) => Ae(b, "primaryHex", y.target.value), className: "w-full h-9 rounded-lg cursor-pointer bg-transparent border border-white/20" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "3D Secondary Glow" }, void 0, false), n.jsxDEV("input", { type: "color", value: jt.secondaryHex, onChange: (y) => Ae(b, "secondaryHex", y.target.value), className: "w-full h-9 rounded-lg cursor-pointer bg-transparent border border-white/20" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1.5", children: "Navbar Links (4 Links) & CTA" }, void 0, false), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: jt.navLinks.map((y, _) => n.jsxDEV("input", { type: "text", value: y, onChange: ($) => Ae(b, `navLinks.${_}`, $.target.value), className: "px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, _, false)) }, void 0, false), n.jsxDEV("input", { type: "text", value: jt.navCta, onChange: (y) => Ae(b, "navCta", y.target.value), placeholder: "Navbar CTA Text", className: "mt-2 w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), G === "hero" && n.jsxDEV("div", { className: "space-y-3.5", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Hero Eyebrow Badge" }, void 0, false), n.jsxDEV("input", { type: "text", value: jt.heroBadge, onChange: (y) => Ae(b, "heroBadge", y.target.value), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Headline Line 1" }, void 0, false), n.jsxDEV("input", { type: "text", value: jt.heroTitle1, onChange: (y) => Ae(b, "heroTitle1", y.target.value), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Accent Line 2" }, void 0, false), n.jsxDEV("input", { type: "text", value: jt.heroTitleAccent, onChange: (y) => Ae(b, "heroTitleAccent", y.target.value), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Hero Lead Paragraph" }, void 0, false), n.jsxDEV("textarea", { rows: 3, value: jt.heroSubtitle, onChange: (y) => Ae(b, "heroSubtitle", y.target.value), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-3 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Badge Top" }, void 0, false), n.jsxDEV("input", { type: "text", value: jt.promoBadgeTop, onChange: (y) => Ae(b, "promoBadgeTop", y.target.value), className: "w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Badge Bottom" }, void 0, false), n.jsxDEV("input", { type: "text", value: jt.promoBadgeBottom, onChange: (y) => Ae(b, "promoBadgeBottom", y.target.value), className: "w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Promo Code" }, void 0, false), n.jsxDEV("input", { type: "text", value: jt.promoCode, onChange: (y) => Ae(b, "promoCode", y.target.value), className: "w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true)] }, void 0, true), G === "stages" && n.jsxDEV("div", { className: "space-y-3.5", children: jt.stages.map((y, _) => n.jsxDEV("div", { className: "p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-2", children: [n.jsxDEV("div", { className: "text-[10px] font-mono uppercase font-bold", style: { color: Ne }, children: ["3D Scroll Stage 0", _ + 1] }, void 0, true), n.jsxDEV("input", { type: "text", value: y.badge, onChange: ($) => Ae(b, `stages.${_}.badge`, $.target.value), className: "w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [n.jsxDEV("input", { type: "text", value: y.title, onChange: ($) => Ae(b, `stages.${_}.title`, $.target.value), className: "px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false), n.jsxDEV("input", { type: "text", value: y.highlight, onChange: ($) => Ae(b, `stages.${_}.highlight`, $.target.value), className: "px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("textarea", { rows: 2, value: y.description, onChange: ($) => Ae(b, `stages.${_}.description`, $.target.value), className: "w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, _, true)) }, void 0, false), G === "products" && n.jsxDEV("div", { className: "space-y-3.5", children: jt.products.map((y, _) => n.jsxDEV("div", { className: "p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-2", children: [n.jsxDEV("div", { className: "text-[10px] font-mono uppercase font-bold", style: { color: y.accentHex || Ne }, children: ["Model / Tier 0", _ + 1, " (", y.code, ")"] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [n.jsxDEV("input", { type: "text", value: y.name, onChange: ($) => Ae(b, `products.${_}.name`, $.target.value), className: "px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false), n.jsxDEV("input", { type: "text", value: y.price, onChange: ($) => Ae(b, `products.${_}.price`, $.target.value), className: "px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("textarea", { rows: 2, value: y.description, onChange: ($) => Ae(b, `products.${_}.description`, $.target.value), className: "w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, _, true)) }, void 0, false), G === "reviews" && n.jsxDEV("div", { className: "space-y-3.5", children: jt.reviews.map((y, _) => n.jsxDEV("div", { className: "p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-2", children: [n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [n.jsxDEV("input", { type: "text", value: y.name, onChange: ($) => Ae(b, `reviews.${_}.name`, $.target.value), className: "px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false), n.jsxDEV("input", { type: "text", value: y.role, onChange: ($) => Ae(b, `reviews.${_}.role`, $.target.value), className: "px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("textarea", { rows: 2, value: y.quote, onChange: ($) => Ae(b, `reviews.${_}.quote`, $.target.value), className: "w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, _, true)) }, void 0, false), G === "footer" && n.jsxDEV("div", { className: "space-y-3.5", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Footer Headline" }, void 0, false), n.jsxDEV("input", { type: "text", value: jt.footerHeadline, onChange: (y) => Ae(b, "footerHeadline", y.target.value), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Footer Subtext" }, void 0, false), n.jsxDEV("textarea", { rows: 2, value: jt.footerSubtext, onChange: (y) => Ae(b, "footerSubtext", y.target.value), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Footer CTA Button" }, void 0, false), n.jsxDEV("input", { type: "text", value: jt.footerCta, onChange: (y) => Ae(b, "footerCta", y.target.value), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: "p-3.5 rounded-2xl bg-[#d02128]/15 border border-[#d02128]/50 space-y-1.5", children: [n.jsxDEV("div", { className: "flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white font-bold", children: [n.jsxDEV(Bs, { className: "w-3.5 h-3.5 text-[#d02128]" }, void 0, false), n.jsxDEV("span", { children: "Locked Watermark & Copyright" }, void 0, false)] }, void 0, true), n.jsxDEV("p", { className: "text-[11px] text-white/80 leading-relaxed", children: ["© 2026 ", n.jsxDEV("strong", { children: jt.brandName }, void 0, false), ". All Rights Reserved. |", " ", n.jsxDEV("strong", { children: "Powered by EFerz (EFerz.com)" }, void 0, false), " — permanently locked across all demos."] }, void 0, true)] }, void 0, true)] }, void 0, true)] }, void 0, true) : zr ? n.jsxDEV(n.Fragment, { children: [De === "brand" && n.jsxDEV("div", { className: "space-y-4", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-[#c4506a]/15 border border-[#c4506a]/40", children: n.jsxDEV("p", { className: "text-xs text-white/90 leading-relaxed", children: [n.jsxDEV("strong", { children: "01. Velora Brand & Navigation:" }, void 0, false), " Changes here update the ", n.jsxDEV("strong", { children: "3D Glass Bottles & Jars Labels" }, void 0, false), ", SVG product illustrations, and top Navbar in real time."] }, void 0, true) }, void 0, false), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Brand Name (3D Label)" }, void 0, false), n.jsxDEV("input", { type: "text", value: C.brandName, onChange: (y) => B((_) => ({ ..._, brandName: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Italic Sub-Brand" }, void 0, false), n.jsxDEV("input", { type: "text", value: C.brandSub, onChange: (y) => B((_) => ({ ..._, brandSub: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[11px] font-mono uppercase tracking-[0.15em] text-white/60 mb-1.5", children: "Custom Brand Logo" }, void 0, false), n.jsxDEV("input", { ref: K, type: "file", accept: "image/*", onChange: R, className: "hidden" }, void 0, false), n.jsxDEV("div", { className: "flex items-center gap-2", children: [n.jsxDEV("button", { type: "button", onClick: () => {
      var y;
      return (y = K.current) == null ? void 0 : y.click();
    }, className: "flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] border border-dashed border-white/25 text-xs font-mono uppercase tracking-[0.14em] text-white cursor-pointer", children: [n.jsxDEV(Os, { className: "w-4 h-4 text-[#c4506a]" }, void 0, false), n.jsxDEV("span", { children: C.logoImageUrl ? "Change Logo" : "Upload Logo (PNG/SVG)" }, void 0, false)] }, void 0, true), C.logoImageUrl && n.jsxDEV("button", { type: "button", onClick: () => B((y) => ({ ...y, logoImageUrl: null })), className: "px-3 py-2.5 rounded-xl bg-rose-500/20 border border-rose-400/30 text-xs font-mono text-rose-200 cursor-pointer", children: "Remove" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1.5", children: "Navbar Menu Links (6 Links)" }, void 0, false), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: C.navLinks.map((y, _) => n.jsxDEV("input", { type: "text", value: y, onChange: ($) => he(_, $.target.value), className: "px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, _, false)) }, void 0, false)] }, void 0, true)] }, void 0, true), De === "hero" && n.jsxDEV("div", { className: "space-y-4", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-[#c4506a]/15 border border-[#c4506a]/40", children: n.jsxDEV("p", { className: "text-xs text-white/90", children: [n.jsxDEV("strong", { children: "02. 3D Hero Stage:" }, void 0, false), " Customize the giant background stroke word, tagline, and spinning badge behind the 3D glass bottles."] }, void 0, true) }, void 0, false), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Giant Background Outline Word" }, void 0, false), n.jsxDEV("input", { type: "text", value: C.heroBigTitle, onChange: (y) => B((_) => ({ ..._, heroBigTitle: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Top-Left Hero Tagline" }, void 0, false), n.jsxDEV("textarea", { rows: 3, value: C.heroTagline, onChange: (y) => B((_) => ({ ..._, heroTagline: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true, { fileName: "/app/applet/src/components/views/LetsBuildView.tsx", lineNumber: 4e3, columnNumber: 23 }, void 0), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Spinning Circular Badge Text" }, void 0, false), n.jsxDEV("input", { type: "text", value: C.heroBadgeText, onChange: (y) => B((_) => ({ ..._, heroBadgeText: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), De === "products" && n.jsxDEV("div", { className: "space-y-4", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-2", children: "Select 3D Product (1-8)" }, void 0, false), n.jsxDEV("div", { className: "grid grid-cols-2 gap-1.5", children: C.products.map((y, _) => n.jsxDEV("button", { type: "button", onClick: () => Xe(_), className: `p-2 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${Re === _ ? "bg-white/15 border-[#c4506a] text-white shadow-md" : "bg-white/[0.03] border-white/10 text-white/65 hover:text-white"}`, children: [n.jsxDEV("span", { className: "w-3.5 h-3.5 rounded-full shrink-0 border border-white/40", style: { background: y.colorHex } }, void 0, false), n.jsxDEV("div", { className: "truncate", children: [n.jsxDEV("div", { className: "text-[11px] font-bold truncate", children: y.name }, void 0, false), n.jsxDEV("div", { className: "text-[9px] font-mono text-white/50", children: ["$", y.price, " · ", y.sizeText] }, void 0, true)] }, void 0, true)] }, _, true)) }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: "p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Product Name (Printed on 3D Bottle/Jar)" }, void 0, false), n.jsxDEV("input", { type: "text", value: Fr.name, onChange: (y) => Ee(Re, "name", y.target.value), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Category Label" }, void 0, false), n.jsxDEV("input", { type: "text", value: Fr.categoryLabel, onChange: (y) => Ee(Re, "categoryLabel", y.target.value), className: "w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "3D Vessel Shape" }, void 0, false), n.jsxDEV("select", { value: Fr.shapeIndex, onChange: (y) => Ee(Re, "shapeIndex", Number(y.target.value)), className: "w-full px-2.5 py-1.5 rounded-lg bg-[#151520] border border-white/15 text-xs text-white", children: [n.jsxDEV("option", { value: 0, children: "0 — Glass Cream Jar" }, void 0, false), n.jsxDEV("option", { value: 1, children: "1 — Glass Dropper Bottle" }, void 0, false), n.jsxDEV("option", { value: 2, children: "2 — Velvet Lipstick Bullet" }, void 0, false), n.jsxDEV("option", { value: 3, children: "3 — Eau de Parfum Flacon" }, void 0, false)] }, void 0, true)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Short Sensory Tagline" }, void 0, false), n.jsxDEV("input", { type: "text", value: Fr.tagline, onChange: (y) => Ee(Re, "tagline", y.target.value), className: "w-full px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Full Description" }, void 0, false), n.jsxDEV("textarea", { rows: 2, value: Fr.description, onChange: (y) => Ee(Re, "description", y.target.value), className: "w-full px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Price ($)" }, void 0, false), n.jsxDEV("input", { type: "number", value: Fr.price, onChange: (y) => Ee(Re, "price", Number(y.target.value) || 0), className: "w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Bottle / Jar Size" }, void 0, false), n.jsxDEV("input", { type: "text", value: Fr.sizeText, onChange: (y) => Ee(Re, "sizeText", y.target.value), className: "w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Scent Notes" }, void 0, false), n.jsxDEV("input", { type: "text", value: Fr.notes, onChange: (y) => Ee(Re, "notes", y.target.value), className: "w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Key Ingredients" }, void 0, false), n.jsxDEV("input", { type: "text", value: Fr.ingredients, onChange: (y) => Ee(Re, "ingredients", y.target.value), className: "w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-3 gap-2 pt-1", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "3D Formula Color" }, void 0, false), n.jsxDEV("input", { type: "color", value: Fr.colorHex, onChange: (y) => Ee(Re, "colorHex", y.target.value), className: "w-full h-8 rounded-lg cursor-pointer bg-transparent border border-white/20" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Aura & Card BG" }, void 0, false), n.jsxDEV("input", { type: "color", value: Fr.bgHex, onChange: (y) => Ee(Re, "bgHex", y.target.value), className: "w-full h-8 rounded-lg cursor-pointer bg-transparent border border-white/20" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "3D Cap Color" }, void 0, false), n.jsxDEV("input", { type: "color", value: Fr.lidHex, onChange: (y) => Ee(Re, "lidHex", y.target.value), className: "w-full h-8 rounded-lg cursor-pointer bg-transparent border border-white/20" }, void 0, false)] }, void 0, true)] }, void 0, true)] }, void 0, true)] }, void 0, true), De === "orb" && n.jsxDEV("div", { className: "space-y-3.5", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-[#c4506a]/15 border border-[#c4506a]/40", children: n.jsxDEV("p", { className: "text-xs text-white/90", children: [n.jsxDEV("strong", { children: "04. 3D Essence Shader Orb:" }, void 0, false), " Customize the 3 scroll-morphing WebGL shader stages (Hydrate, Brighten, Restore)."] }, void 0, true) }, void 0, false), C.orbStages.map((y, _) => n.jsxDEV("div", { className: "p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-2", children: [n.jsxDEV("div", { className: "text-[10px] font-mono uppercase text-[#e8a0a8]", children: ["THE ESSENCE · 0", _ + 1] }, void 0, true), n.jsxDEV("input", { type: "text", value: y.title, onChange: ($) => We(_, "title", $.target.value), className: "w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false), n.jsxDEV("textarea", { rows: 2, value: y.description, onChange: ($) => We(_, "description", $.target.value), className: "w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false), n.jsxDEV("div", { className: "grid grid-cols-3 gap-2", children: [0, 1, 2].map(($) => n.jsxDEV("input", { type: "color", value: y.colors[$], onChange: (ie) => Ue(_, $, ie.target.value), className: "w-full h-7 rounded cursor-pointer bg-transparent border border-white/20" }, $, false)) }, void 0, false)] }, _, true))] }, void 0, true), De === "ingredients" && n.jsxDEV("div", { className: "space-y-3.5", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-[#c4506a]/15 border border-[#c4506a]/40", children: n.jsxDEV("p", { className: "text-xs text-white/90", children: [n.jsxDEV("strong", { children: "05. Botanicals & Actives Section:" }, void 0, false), " Edit the headline and introduction for the Ingredients section."] }, void 0, true) }, void 0, false), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Eyebrow Badge" }, void 0, false), n.jsxDEV("input", { type: "text", value: C.ingredientsEyebrow, onChange: (y) => B((_) => ({ ..._, ingredientsEyebrow: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [n.jsxDEV("input", { type: "text", value: C.ingredientsTitlePrefix, onChange: (y) => B((_) => ({ ..._, ingredientsTitlePrefix: y.target.value })), className: "px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false), n.jsxDEV("input", { type: "text", value: C.ingredientsTitleItalic, onChange: (y) => B((_) => ({ ..._, ingredientsTitleItalic: y.target.value })), className: "px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("textarea", { rows: 3, value: C.ingredientsLead, onChange: (y) => B((_) => ({ ..._, ingredientsLead: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), De === "rituals" && n.jsxDEV("div", { className: "space-y-3.5", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-[#c4506a]/15 border border-[#c4506a]/40", children: n.jsxDEV("p", { className: "text-xs text-white/90", children: [n.jsxDEV("strong", { children: "06. Studio Rituals:" }, void 0, false), " Customize the 3 in-studio ritual experiences."] }, void 0, true) }, void 0, false), C.rituals.map((y, _) => n.jsxDEV("div", { className: "p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-2", children: [n.jsxDEV("div", { className: "text-[10px] font-mono uppercase text-[#e8a0a8]", children: ["Ritual #", y.number] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [n.jsxDEV("input", { type: "text", value: y.title, onChange: ($) => Fe(_, "title", $.target.value), className: "px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false), n.jsxDEV("input", { type: "text", value: y.duration, onChange: ($) => Fe(_, "duration", $.target.value), className: "px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("textarea", { rows: 2, value: y.description, onChange: ($) => Fe(_, "description", $.target.value), className: "w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, _, true))] }, void 0, true), De === "about" && n.jsxDEV("div", { className: "space-y-3.5", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-[#c4506a]/15 border border-[#c4506a]/40", children: n.jsxDEV("p", { className: "text-xs text-white/90", children: [n.jsxDEV("strong", { children: "07. About & Animated Counters:" }, void 0, false), " Edit the brand story and 4 animated statistics."] }, void 0, true) }, void 0, false), n.jsxDEV("textarea", { rows: 3, value: C.aboutLead, onChange: (y) => B((_) => ({ ..._, aboutLead: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false), n.jsxDEV("div", { className: "space-y-2", children: C.stats.map((y, _) => n.jsxDEV("div", { className: "grid grid-cols-3 gap-2", children: [n.jsxDEV("input", { type: "number", value: y.number, onChange: ($) => pt(_, "number", Number($.target.value) || 0), className: "px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false), n.jsxDEV("input", { type: "text", value: y.label, onChange: ($) => pt(_, "label", $.target.value), className: "col-span-2 px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, _, true)) }, void 0, false)] }, void 0, true), De === "reviews" && n.jsxDEV("div", { className: "space-y-3", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-[#c4506a]/15 border border-[#c4506a]/40", children: n.jsxDEV("p", { className: "text-xs text-white/90", children: [n.jsxDEV("strong", { children: "08. Customer Reviews Ticker:" }, void 0, false), " Customize the scrolling customer reviews."] }, void 0, true) }, void 0, false), C.reviews.map((y, _) => n.jsxDEV("div", { className: "p-2.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5", children: [n.jsxDEV("input", { type: "text", value: y.author, onChange: ($) => tt(_, "author", $.target.value), className: "w-full px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false), n.jsxDEV("textarea", { rows: 2, value: y.quote, onChange: ($) => tt(_, "quote", $.target.value), className: "w-full px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, _, true))] }, void 0, true), De === "contact" && n.jsxDEV("div", { className: "space-y-3.5", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-[#c4506a]/15 border border-[#c4506a]/40", children: n.jsxDEV("p", { className: "text-xs text-white/90", children: [n.jsxDEV("strong", { children: "09. Contact Studio Section:" }, void 0, false), " Edit email, studio hours, and contact message."] }, void 0, true) }, void 0, false), n.jsxDEV("textarea", { rows: 2, value: C.contactLead, onChange: (y) => B((_) => ({ ..._, contactLead: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false), n.jsxDEV("input", { type: "text", value: C.contactEmail, onChange: (y) => B((_) => ({ ..._, contactEmail: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false), n.jsxDEV("input", { type: "text", value: C.contactHours, onChange: (y) => B((_) => ({ ..._, contactHours: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), De === "footer" && n.jsxDEV("div", { className: "space-y-3.5", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-white/[0.04] border border-white/10", children: n.jsxDEV("p", { className: "text-xs text-white/90", children: [n.jsxDEV("strong", { children: "10. Footer Section:" }, void 0, false), " Edit addresses, tagline, and copyright."] }, void 0, true) }, void 0, false), n.jsxDEV("input", { type: "text", value: C.footerTagline, onChange: (y) => B((_) => ({ ..._, footerTagline: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false), n.jsxDEV("input", { type: "text", value: C.footerStudioAddress, onChange: (y) => B((_) => ({ ..._, footerStudioAddress: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false), n.jsxDEV("input", { type: "text", value: C.footerLabAddress, onChange: (y) => B((_) => ({ ..._, footerLabAddress: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false), n.jsxDEV("input", { type: "text", value: C.footerCopyright, onChange: (y) => B((_) => ({ ..._, footerCopyright: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), De === "html" && n.jsxDEV("div", { className: "space-y-4", children: [n.jsxDEV("div", { className: "p-3.5 rounded-2xl bg-[#c4506a]/15 border border-[#c4506a]/40 space-y-2", children: [n.jsxDEV("p", { className: "text-xs text-white/90 font-semibold", children: "Direct HTML File Loader" }, void 0, false), n.jsxDEV("p", { className: "text-[11px] text-white/70 leading-relaxed", children: ["The default preview runs the complete ", n.jsxDEV("strong", { children: "Velora Botanics — 3D Clean Beauty" }, void 0, false), " HTML + Three.js website. You can also upload any custom ", n.jsxDEV("code", { className: "text-pink-300", children: ".html" }, void 0, false), " file from your computer."] }, void 0, true)] }, void 0, true), n.jsxDEV("input", { ref: ye, type: "file", accept: ".html,.htm,text/html", onChange: ae, className: "hidden" }, void 0, false), n.jsxDEV("button", { type: "button", onClick: () => {
      var y;
      return (y = ye.current) == null ? void 0 : y.click();
    }, className: "w-full py-3 px-4 rounded-xl bg-[#c4506a] hover:bg-[#d45d79] text-white font-mono text-xs uppercase tracking-[0.16em] font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all", children: [n.jsxDEV(Os, { className: "w-4 h-4" }, void 0, false), n.jsxDEV("span", { children: "Upload .HTML File from Computer" }, void 0, false)] }, void 0, true), C.customHtmlOverride && n.jsxDEV("button", { type: "button", onClick: () => B((y) => ({ ...y, customHtmlOverride: null })), className: "w-full py-2.5 px-4 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-200 font-mono text-xs uppercase tracking-[0.14em] cursor-pointer", children: "Restore Built-in Velora Botanics 3D Demo" }, void 0, false)] }, void 0, true)] }, void 0, true) : n.jsxDEV(n.Fragment, { children: [Z === "brand" && n.jsxDEV("div", { className: "space-y-4", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-[#FF5500]/10 border border-[#FF5500]/30", children: n.jsxDEV("p", { className: "text-xs text-white/90 leading-relaxed", children: [n.jsxDEV("strong", { children: "01. Brand & Navigation Bar:" }, void 0, false), " Changes here update the ", n.jsxDEV("strong", { children: "3D Aluminum Cans" }, void 0, false), ", the ", n.jsxDEV("strong", { children: "3D Variety Box" }, void 0, false), ", the ", n.jsxDEV("strong", { children: "3D Glass Bottle Label" }, void 0, false), ", and the top Navbar in real time."] }, void 0, true) }, void 0, false), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[11px] font-mono uppercase tracking-[0.15em] text-white/60 mb-1.5", children: "Brand Name (Printed on 3D Cans, Box & Bottle)" }, void 0, false), n.jsxDEV("input", { type: "text", value: M.brandName, onChange: (y) => L((_) => ({ ..._, brandName: y.target.value })), className: "w-full px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-sm text-white focus:outline-none focus:border-[#FF5500]" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[11px] font-mono uppercase tracking-[0.15em] text-white/60 mb-1.5", children: "Brand Logo (Wrapped on 3D Canister & Navbar)" }, void 0, false), n.jsxDEV("input", { ref: K, type: "file", accept: "image/*", onChange: R, className: "hidden" }, void 0, false), n.jsxDEV("div", { className: "flex items-center gap-2", children: [n.jsxDEV("button", { type: "button", onClick: () => {
      var y;
      return (y = K.current) == null ? void 0 : y.click();
    }, className: "flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] border border-dashed border-white/25 text-xs font-mono uppercase tracking-[0.14em] text-white cursor-pointer", children: [n.jsxDEV(Os, { className: "w-4 h-4 text-[#FF5500]" }, void 0, false), n.jsxDEV("span", { children: M.logoImageUrl ? "Change Logo" : "Upload Logo (PNG/SVG)" }, void 0, false)] }, void 0, true), M.logoImageUrl && n.jsxDEV("button", { type: "button", onClick: () => L((y) => ({ ...y, logoImageUrl: null })), className: "px-3 py-2.5 rounded-xl bg-rose-500/20 border border-rose-400/30 text-xs font-mono text-rose-200 cursor-pointer", children: "Remove" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV(Zn, { label: "Preloader Can Logo & Emblem", sublabel: "Displays inside the animated preloader can on startup", value: M.loaderImageUrl, onChange: (y) => L((_) => ({ ..._, loaderImageUrl: y })), accentColor: "#FF5500", placeholder: "https://...", presetImages: [{ label: "Craft Soda Emblem", url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&auto=format&fit=crop&q=80" }, { label: "Cold-Pressed Citrus Mark", url: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400&auto=format&fit=crop&q=80" }, { label: "Botanical Wave Crest", url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&auto=format&fit=crop&q=80" }] }, void 0, false), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[11px] font-mono uppercase tracking-[0.15em] text-white/60 mb-1.5", children: "Navbar Menu Links (5 Links)" }, void 0, false), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: M.navLinks.map((y, _) => n.jsxDEV("input", { type: "text", value: y, onChange: ($) => At(_, $.target.value), className: "px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white focus:outline-none focus:border-[#FF5500]", placeholder: `Link ${_ + 1}` }, _, false)) }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[11px] font-mono uppercase tracking-[0.15em] text-white/60 mb-1.5", children: "Navbar CTA Button Text" }, void 0, false), n.jsxDEV("input", { type: "text", value: M.navCtaText, onChange: (y) => L((_) => ({ ..._, navCtaText: y.target.value })), className: "w-full px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-sm text-white focus:outline-none focus:border-[#FF5500]" }, void 0, false)] }, void 0, true)] }, void 0, true), Z === "hero" && n.jsxDEV("div", { className: "space-y-4", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/30", children: n.jsxDEV("p", { className: "text-xs text-white/90", children: [n.jsxDEV("strong", { children: "02. Hero Header Section:" }, void 0, false), " Customize the main headline, badge, description, and scroll prompt behind the floating 3D Hero Can."] }, void 0, true) }, void 0, false), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[11px] font-mono uppercase tracking-[0.15em] text-white/60 mb-1.5", children: "Hero Badge Pill" }, void 0, false), n.jsxDEV("input", { type: "text", value: M.heroBadge, onChange: (y) => L((_) => ({ ..._, heroBadge: y.target.value })), className: "w-full px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-sm text-white focus:outline-none focus:border-[#FF5500]" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-3 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Title Line 1" }, void 0, false), n.jsxDEV("input", { type: "text", value: M.heroTitleLine1, onChange: (y) => L((_) => ({ ..._, heroTitleLine1: y.target.value })), className: "w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Stroke Word" }, void 0, false), n.jsxDEV("input", { type: "text", value: M.heroTitleStroke, onChange: (y) => L((_) => ({ ..._, heroTitleStroke: y.target.value })), className: "w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Title Line 3" }, void 0, false), n.jsxDEV("input", { type: "text", value: M.heroTitleLine3, onChange: (y) => L((_) => ({ ..._, heroTitleLine3: y.target.value })), className: "w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[11px] font-mono uppercase tracking-[0.15em] text-white/60 mb-1.5", children: "Hero Paragraph Description" }, void 0, false), n.jsxDEV("textarea", { rows: 3, value: M.heroSubtext, onChange: (y) => L((_) => ({ ..._, heroSubtext: y.target.value })), className: "w-full px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white focus:outline-none focus:border-[#FF5500]" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[11px] font-mono uppercase tracking-[0.15em] text-white/60 mb-1.5", children: "Bottom Scroll Hint Text" }, void 0, false), n.jsxDEV("input", { type: "text", value: M.heroScrollHint, onChange: (y) => L((_) => ({ ..._, heroScrollHint: y.target.value })), className: "w-full px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-3 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Promo Badge Line 1" }, void 0, false), n.jsxDEV("input", { type: "text", value: M.promoBadgeTop || "BUY 1", onChange: (y) => L((_) => ({ ..._, promoBadgeTop: y.target.value })), className: "w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Promo Badge Line 2" }, void 0, false), n.jsxDEV("input", { type: "text", value: M.promoBadgeBottom || "GET 1", onChange: (y) => L((_) => ({ ..._, promoBadgeBottom: y.target.value })), className: "w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Free Code" }, void 0, false), n.jsxDEV("input", { type: "text", value: M.promoCode || "FIZZ20", onChange: (y) => L((_) => ({ ..._, promoCode: y.target.value })), className: "w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true)] }, void 0, true), Z === "flavors" && n.jsxDEV("div", { className: "space-y-4", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[11px] font-mono uppercase tracking-[0.15em] text-white/60 mb-2", children: "Select Flavor Can / Card (Click on site or pick 1-4)" }, void 0, false), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: M.flavors.map((y, _) => n.jsxDEV("button", { type: "button", onClick: () => Ve(_), className: `p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${me === _ ? "bg-white/15 border-[#FF5500] text-white shadow-md" : "bg-white/[0.03] border-white/10 text-white/65 hover:text-white"}`, children: [n.jsxDEV("span", { className: "w-4 h-4 rounded-full shrink-0 border border-white/40", style: { background: y.canHex } }, void 0, false), n.jsxDEV("div", { className: "truncate", children: [n.jsxDEV("div", { className: "text-xs font-bold truncate", children: y.name }, void 0, false), n.jsxDEV("div", { className: "text-[10px] font-mono text-white/50", children: y.price }, void 0, false)] }, void 0, true)] }, _, true)) }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: "p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3.5", children: [n.jsxDEV(Zn, { label: `${lr.name} Custom Can Sleeve / Artwork`, sublabel: "Replaces or overlays artwork directly on the 3D can & lineup cards", value: lr.customImageUrl, onChange: (y) => J(me, "customImageUrl", y), accentColor: lr.canHex || "#FF5500", placeholder: "https://...", presetImages: [{ label: "Blood Orange Sunset", url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80" }, { label: "Wild Berry Botanical", url: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=600&auto=format&fit=crop&q=80" }, { label: "Crisp Lime Splash", url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80" }, { label: "Vintage Soda Can", url: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80" }] }, void 0, false), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Can Label Name" }, void 0, false), n.jsxDEV("input", { type: "text", value: lr.name, onChange: (y) => J(me, "name", y.target.value), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Badge Tag" }, void 0, false), n.jsxDEV("input", { type: "text", value: lr.badge, onChange: (y) => J(me, "badge", y.target.value), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Can Subtitle (Printed on 3D Can)" }, void 0, false), n.jsxDEV("input", { type: "text", value: lr.sub, onChange: (y) => J(me, "sub", y.target.value), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Tasting Notes (Spec Table)" }, void 0, false), n.jsxDEV("input", { type: "text", value: lr.tastingNotes || "", onChange: (y) => J(me, "tastingNotes", y.target.value), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Caffeine Content" }, void 0, false), n.jsxDEV("input", { type: "text", value: lr.caffeine || "0 mg", onChange: (y) => J(me, "caffeine", y.target.value), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Flavor Description" }, void 0, false), n.jsxDEV("textarea", { rows: 2, value: lr.desc, onChange: (y) => J(me, "desc", y.target.value), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-3 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Calories" }, void 0, false), n.jsxDEV("input", { type: "text", value: lr.calories, onChange: (y) => J(me, "calories", y.target.value), className: "w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Sugar" }, void 0, false), n.jsxDEV("input", { type: "text", value: lr.sugar, onChange: (y) => J(me, "sugar", y.target.value), className: "w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Prebiotic Fiber" }, void 0, false), n.jsxDEV("input", { type: "text", value: lr.fiber, onChange: (y) => J(me, "fiber", y.target.value), className: "w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Price Tag" }, void 0, false), n.jsxDEV("input", { type: "text", value: lr.price, onChange: (y) => J(me, "price", y.target.value), className: "w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Pack Sub-label" }, void 0, false), n.jsxDEV("input", { type: "text", value: lr.packLabel, onChange: (y) => J(me, "packLabel", y.target.value), className: "w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Buy Button Text" }, void 0, false), n.jsxDEV("input", { type: "text", value: lr.ctaText, onChange: (y) => J(me, "ctaText", y.target.value), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-3 gap-2 pt-1", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "3D Can Color" }, void 0, false), n.jsxDEV("input", { type: "color", value: lr.canHex, onChange: (y) => J(me, "canHex", y.target.value), className: "w-full h-9 rounded-lg cursor-pointer bg-transparent border border-white/20" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Section BG" }, void 0, false), n.jsxDEV("input", { type: "color", value: lr.bgHex, onChange: (y) => J(me, "bgHex", y.target.value), className: "w-full h-9 rounded-lg cursor-pointer bg-transparent border border-white/20" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Accent Glow" }, void 0, false), n.jsxDEV("input", { type: "color", value: lr.accentHex, onChange: (y) => J(me, "accentHex", y.target.value), className: "w-full h-9 rounded-lg cursor-pointer bg-transparent border border-white/20" }, void 0, false)] }, void 0, true)] }, void 0, true)] }, void 0, true)] }, void 0, true), Z === "marquee" && n.jsxDEV("div", { className: "space-y-3.5", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-white/[0.04] border border-white/10", children: n.jsxDEV("p", { className: "text-xs text-white/85", children: [n.jsxDEV("strong", { children: "04. Scrolling Marquee Ribbon:" }, void 0, false), " Edit the 5 bold callout phrases that scroll across the angled white ticker bar."] }, void 0, true) }, void 0, false), M.marqueeItems.map((y, _) => n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: ["Marquee Item #", _ + 1] }, void 0, true), n.jsxDEV("input", { type: "text", value: y, onChange: ($) => It(_, $.target.value), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, _, true))] }, void 0, true), Z === "pack" && n.jsxDEV("div", { className: "space-y-3.5", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-amber-500/10 border border-amber-400/30", children: n.jsxDEV("p", { className: "text-xs text-white/90", children: [n.jsxDEV("strong", { children: "05. 3D Variety Box Packing Stage:" }, void 0, false), " Customize the card copy and 4-step choreography labels (Open Crate → Drop 4 Cans → Fold Flaps → Tape Seal)."] }, void 0, true) }, void 0, false), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Stage Badge" }, void 0, false), n.jsxDEV("input", { type: "text", value: M.packBadge, onChange: (y) => L((_) => ({ ..._, packBadge: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-3 gap-2", children: [n.jsxDEV("input", { type: "text", value: M.packTitleLine1, onChange: (y) => L((_) => ({ ..._, packTitleLine1: y.target.value })), className: "px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false), n.jsxDEV("input", { type: "text", value: M.packTitleStroke, onChange: (y) => L((_) => ({ ..._, packTitleStroke: y.target.value })), className: "px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false), n.jsxDEV("input", { type: "text", value: M.packTitleLine3, onChange: (y) => L((_) => ({ ..._, packTitleLine3: y.target.value })), className: "px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Description" }, void 0, false), n.jsxDEV("textarea", { rows: 2, value: M.packSubtext, onChange: (y) => L((_) => ({ ..._, packSubtext: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "4 Choreography Step Pills" }, void 0, false), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: M.packSteps.map((y, _) => n.jsxDEV("input", { type: "text", value: y, onChange: ($) => qt("packSteps", _, $.target.value), className: "px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, _, false)) }, void 0, false)] }, void 0, true)] }, void 0, true), Z === "fill" && n.jsxDEV("div", { className: "space-y-3.5", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-[#FF5500]/10 border border-[#FF5500]/30", children: n.jsxDEV("p", { className: "text-xs text-white/90", children: [n.jsxDEV("strong", { children: "06. 3D Can Pour & Glass Fill Stage:" }, void 0, false), " Customize the tumbler glass pour section and its 4 step indicators."] }, void 0, true) }, void 0, false), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Stage Badge" }, void 0, false), n.jsxDEV("input", { type: "text", value: M.fillBadge, onChange: (y) => L((_) => ({ ..._, fillBadge: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-3 gap-2", children: [n.jsxDEV("input", { type: "text", value: M.fillTitleLine1, onChange: (y) => L((_) => ({ ..._, fillTitleLine1: y.target.value })), className: "px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false), n.jsxDEV("input", { type: "text", value: M.fillTitleStroke, onChange: (y) => L((_) => ({ ..._, fillTitleStroke: y.target.value })), className: "px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false), n.jsxDEV("input", { type: "text", value: M.fillTitleLine3, onChange: (y) => L((_) => ({ ..._, fillTitleLine3: y.target.value })), className: "px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Description" }, void 0, false), n.jsxDEV("textarea", { rows: 2, value: M.fillSubtext, onChange: (y) => L((_) => ({ ..._, fillSubtext: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "4 Pour & Fill Step Pills" }, void 0, false), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: M.fillSteps.map((y, _) => n.jsxDEV("input", { type: "text", value: y, onChange: ($) => qt("fillSteps", _, $.target.value), className: "px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, _, false)) }, void 0, false)] }, void 0, true)] }, void 0, true), Z === "bottle" && n.jsxDEV("div", { className: "space-y-3.5", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-purple-500/10 border border-purple-400/30", children: n.jsxDEV("p", { className: "text-xs text-white/90", children: [n.jsxDEV("strong", { children: "07. 3D Craft Glass Bottle Fill & Crown Cap Stage:" }, void 0, false), " Customize the bottle filling & crown-capping choreography section."] }, void 0, true) }, void 0, false), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Stage Badge" }, void 0, false), n.jsxDEV("input", { type: "text", value: M.bottleBadge, onChange: (y) => L((_) => ({ ..._, bottleBadge: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-3 gap-2", children: [n.jsxDEV("input", { type: "text", value: M.bottleTitleLine1, onChange: (y) => L((_) => ({ ..._, bottleTitleLine1: y.target.value })), className: "px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false), n.jsxDEV("input", { type: "text", value: M.bottleTitleStroke, onChange: (y) => L((_) => ({ ..._, bottleTitleStroke: y.target.value })), className: "px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false), n.jsxDEV("input", { type: "text", value: M.bottleTitleLine3, onChange: (y) => L((_) => ({ ..._, bottleTitleLine3: y.target.value })), className: "px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Description" }, void 0, false), n.jsxDEV("textarea", { rows: 2, value: M.bottleSubtext, onChange: (y) => L((_) => ({ ..._, bottleSubtext: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "4 Bottle Fill Step Pills" }, void 0, false), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: M.bottleSteps.map((y, _) => n.jsxDEV("input", { type: "text", value: y, onChange: ($) => qt("bottleSteps", _, $.target.value), className: "px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, _, false)) }, void 0, false)] }, void 0, true)] }, void 0, true), Z === "nutrition" && n.jsxDEV("div", { className: "space-y-3.5", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-emerald-500/10 border border-emerald-400/30", children: n.jsxDEV("p", { className: "text-xs text-white/90", children: [n.jsxDEV("strong", { children: "08. Nutrition Facts & Formula:" }, void 0, false), " Edit the FDA-style nutrition card and botanical ingredient list."] }, void 0, true) }, void 0, false), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Section Badge" }, void 0, false), n.jsxDEV("input", { type: "text", value: M.nutritionBadge, onChange: (y) => L((_) => ({ ..._, nutritionBadge: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Section Heading" }, void 0, false), n.jsxDEV("input", { type: "text", value: M.nutritionTitle, onChange: (y) => L((_) => ({ ..._, nutritionTitle: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Section Description" }, void 0, false), n.jsxDEV("textarea", { rows: 2, value: M.nutritionSubtitle, onChange: (y) => L((_) => ({ ..._, nutritionSubtitle: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Serving Size" }, void 0, false), n.jsxDEV("input", { type: "text", value: M.nutritionServing, onChange: (y) => L((_) => ({ ..._, nutritionServing: y.target.value })), className: "w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Calories Count" }, void 0, false), n.jsxDEV("input", { type: "text", value: M.nutritionCalories, onChange: (y) => L((_) => ({ ..._, nutritionCalories: y.target.value })), className: "w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Nutrition Rows (Label / Amount / %DV)" }, void 0, false), n.jsxDEV("div", { className: "space-y-1.5", children: M.nutritionFacts.map((y, _) => n.jsxDEV("div", { className: "grid grid-cols-3 gap-1.5", children: [n.jsxDEV("input", { type: "text", value: y.label, onChange: ($) => Bt(_, "label", $.target.value), className: "px-2 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-[11px] text-white" }, void 0, false), n.jsxDEV("input", { type: "text", value: y.amount, onChange: ($) => Bt(_, "amount", $.target.value), className: "px-2 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-[11px] text-white" }, void 0, false), n.jsxDEV("input", { type: "text", value: y.dv, onChange: ($) => Bt(_, "dv", $.target.value), className: "px-2 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-[11px] text-white" }, void 0, false)] }, _, true)) }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Clean Ingredients List" }, void 0, false), n.jsxDEV("textarea", { rows: 2, value: M.nutritionIngredients, onChange: (y) => L((_) => ({ ..._, nutritionIngredients: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), Z === "reviews" && n.jsxDEV("div", { className: "space-y-3.5", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-amber-500/10 border border-amber-400/30", children: n.jsxDEV("p", { className: "text-xs text-white/90", children: [n.jsxDEV("strong", { children: "09. Customer Reviews Grid:" }, void 0, false), " Customize the social proof headline and 3 verified sipper testimonials."] }, void 0, true) }, void 0, false), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Reviews Badge" }, void 0, false), n.jsxDEV("input", { type: "text", value: M.reviewsBadge, onChange: (y) => L((_) => ({ ..._, reviewsBadge: y.target.value })), className: "w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Section Title" }, void 0, false), n.jsxDEV("input", { type: "text", value: M.reviewsTitle, onChange: (y) => L((_) => ({ ..._, reviewsTitle: y.target.value })), className: "w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), M.reviews.map((y, _) => n.jsxDEV("div", { className: "p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-2", children: [n.jsxDEV("div", { className: "text-[10px] font-mono uppercase text-[#FF5500]", children: ["Review Card #", _ + 1] }, void 0, true), n.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [n.jsxDEV("input", { type: "text", value: y.name, onChange: ($) => Wr(_, "name", $.target.value), className: "px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white", placeholder: "Reviewer Name" }, void 0, false), n.jsxDEV("input", { type: "text", value: y.role, onChange: ($) => Wr(_, "role", $.target.value), className: "px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white", placeholder: "Role / Tag" }, void 0, false)] }, void 0, true), n.jsxDEV("textarea", { rows: 2, value: y.quote, onChange: ($) => Wr(_, "quote", $.target.value), className: "w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, _, true))] }, void 0, true), Z === "footer" && n.jsxDEV("div", { className: "space-y-3.5", children: [n.jsxDEV("div", { className: "p-3 rounded-2xl bg-white/[0.04] border border-white/10", children: n.jsxDEV("p", { className: "text-xs text-white/90", children: [n.jsxDEV("strong", { children: "10. Footer Section:" }, void 0, false), " Edit the giant footer title, subtext, CTA button, and copyright line."] }, void 0, true) }, void 0, false), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Giant Footer Title" }, void 0, false), n.jsxDEV("input", { type: "text", value: M.footerTitle, onChange: (y) => L((_) => ({ ..._, footerTitle: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Footer Subtext" }, void 0, false), n.jsxDEV("textarea", { rows: 2, value: M.footerSubtext, onChange: (y) => L((_) => ({ ..._, footerSubtext: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Footer CTA Button" }, void 0, false), n.jsxDEV("input", { type: "text", value: M.footerCtaText, onChange: (y) => L((_) => ({ ..._, footerCtaText: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { children: [n.jsxDEV("label", { className: "block text-[10px] font-mono uppercase text-white/60 mb-1", children: "Copyright Notice" }, void 0, false), n.jsxDEV("input", { type: "text", value: M.footerCopyright, onChange: (y) => L((_) => ({ ..._, footerCopyright: y.target.value })), className: "w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white" }, void 0, false)] }, void 0, true)] }, void 0, true), Z === "html" && n.jsxDEV("div", { className: "space-y-4", children: [n.jsxDEV("div", { className: "p-3.5 rounded-2xl bg-[#FF5500]/10 border border-[#FF5500]/30 space-y-2", children: [n.jsxDEV("p", { className: "text-xs text-white/90 font-semibold", children: "Direct HTML File Loader" }, void 0, false), n.jsxDEV("p", { className: "text-[11px] text-white/70 leading-relaxed", children: ["The default preview runs the complete ", n.jsxDEV("strong", { children: "FIZZO — Cinematic 3D" }, void 0, false), " HTML + Three.js + GSAP ScrollTrigger website. You can also upload any custom ", n.jsxDEV("code", { className: "text-amber-300", children: ".html" }, void 0, false), " file from your computer to preview it live."] }, void 0, true)] }, void 0, true), n.jsxDEV("input", { ref: ye, type: "file", accept: ".html,.htm,text/html", onChange: ae, className: "hidden" }, void 0, false), n.jsxDEV("button", { type: "button", onClick: () => {
      var y;
      return (y = ye.current) == null ? void 0 : y.click();
    }, className: "w-full py-3 px-4 rounded-xl bg-[#FF5500] hover:bg-[#FF6A1A] text-white font-mono text-xs uppercase tracking-[0.16em] font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all", children: [n.jsxDEV(Os, { className: "w-4 h-4" }, void 0, false), n.jsxDEV("span", { children: "Upload .HTML File from Computer" }, void 0, false)] }, void 0, true), M.customHtmlOverride && n.jsxDEV("button", { type: "button", onClick: () => L((y) => ({ ...y, customHtmlOverride: null })), className: "w-full py-2.5 px-4 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-200 font-mono text-xs uppercase tracking-[0.14em] cursor-pointer", children: "Restore Built-in FIZZO 3D Demo" }, void 0, false)] }, void 0, true)] }, void 0, true)] }, void 0, true)] }, void 0, true), !ee && !q && n.jsxDEV("button", { type: "button", onClick: () => oe(true), style: { backgroundColor: Ne }, className: "fixed bottom-6 left-6 z-40 inline-flex items-center gap-2 px-4 py-3 rounded-full text-white font-mono text-xs uppercase tracking-[0.16em] font-bold shadow-2xl cursor-pointer hover:scale-105 transition-transform", children: [n.jsxDEV(lS, { className: "w-4 h-4" }, void 0, false), n.jsxDEV("span", { children: "Open Customizer" }, void 0, false)] }, void 0, true), n.jsxDEV("div", { className: `flex-1 h-full relative overflow-hidden ${ci ? "bg-[#fff3ea]" : Cr ? "bg-[#f4eadb]" : sr ? "bg-[#04070F]" : zr ? "bg-[#fbf1ee]" : "bg-[#1a0a00]"}`, children: ci ? n.jsxDEV(e6, { config: A, selectedSection: Ze, selectedProductIndex: Q, inspectorEnabled: ue && !ee, onSelectElement: Pe, onInlineTextChange: (y, _) => {
      N(($) => ({ ...$, [y]: _ }));
    } }, void 0, false) : Cr ? n.jsxDEV(JP, { config: k, selectedSection: Ze, selectedProductIndex: Q, inspectorEnabled: ue && !ee, onSelectElement: Pe, onInlineTextChange: (y, _) => {
      V(($) => ({ ...$, [y]: _ }));
    } }, void 0, false) : sr ? n.jsxDEV(n6, { config: jt, inspectorEnabled: ue && !ee, onSelectElement: it, onInlineTextChange: (y, _) => {
      Y(y), ne(_), Ae(b, y, _);
    } }, void 0, false) : zr ? n.jsxDEV(KP, { config: C, selectedSection: De, selectedProductIndex: Re, inspectorEnabled: ue && !ee, onSelectElement: He }, void 0, false) : n.jsxDEV(YP, { config: M, selectedSection: Z, selectedFlavorIndex: me, inspectorEnabled: ue && !ee, onSelectElement: pe }, void 0, false) }, void 0, false)] }, void 0, true)] }, void 0, true);
  };
  return o6;
}
export {
  createLetsBuildView
};
