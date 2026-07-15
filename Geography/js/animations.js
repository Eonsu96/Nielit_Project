/* Jr EduTube – ambient animations (clouds, birds, leaves…) */
(function(){
  function addAmbient(target, opts){
    opts = Object.assign({clouds:2, birds:2, leaves:14}, opts||{});
    for(let i=0;i<opts.clouds;i++){
      const c = document.createElement("div");
      c.className = "cloud " + (i%2?"c2":"c1");
      c.style.top = (10 + Math.random()*30) + "%";
      c.style.animationDelay = -(Math.random()*20) + "s";
      target.appendChild(c);
    }
    for(let i=0;i<opts.birds;i++){
      const b = document.createElement("div");
      b.className = "bird" + (i%2?" b2":"");
      b.textContent = "🕊️";
      b.style.top = (20 + Math.random()*30) + "%";
      b.style.animationDelay = -(Math.random()*15) + "s";
      target.appendChild(b);
    }
    for(let i=0;i<opts.leaves;i++){
      const l = document.createElement("div");
      l.className = "leaf";
      l.textContent = ["🍃","🌿","🍂"][i%3];
      l.style.left = (Math.random()*100) + "%";
      l.style.animationDuration = (10 + Math.random()*12) + "s";
      l.style.animationDelay = -(Math.random()*10) + "s";
      target.appendChild(l);
    }
  }
  window.TG_AMBIENT = addAmbient;

  function addStars(target, n){
    for(let i=0;i<(n||60);i++){
      const s = document.createElement("div"); s.className="s";
      s.style.top = Math.random()*100+"%";
      s.style.left = Math.random()*100+"%";
      s.style.animationDelay = -(Math.random()*2)+"s";
      target.appendChild(s);
    }
  }
  window.TG_STARS = addStars;

  function addRain(target, n){
    for(let i=0;i<(n||80);i++){
      const d = document.createElement("div"); d.className="drop";
      d.style.left = Math.random()*100+"%";
      d.style.animationDuration = (0.7 + Math.random()*1.1)+"s";
      d.style.animationDelay = -(Math.random()*1.5)+"s";
      target.appendChild(d);
    }
  }
  window.TG_RAIN = addRain;

  function addSnow(target, n){
    for(let i=0;i<(n||50);i++){
      const d = document.createElement("div"); d.className="flake";
      d.textContent = "❄";
      d.style.left = Math.random()*100+"%";
      d.style.animationDuration = (5 + Math.random()*7)+"s";
      d.style.animationDelay = -(Math.random()*5)+"s";
      target.appendChild(d);
    }
  }
  window.TG_SNOW = addSnow;

  document.addEventListener("DOMContentLoaded",()=>{
    document.querySelectorAll("[data-ambient]").forEach(el=>addAmbient(el));
  });
})();
