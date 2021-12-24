gsap.defaults({ease: "none"});

var i = 0;

gsap.fromTo('#cursor', {autoAlpha: 0, x:-10}, {autoAlpha: 1, duration: 0.6, repeat: -1, ease: SteppedEase.config(1)});

const tl = gsap.timeline({repeat:-1, repeatDelay:1, yoyo:true, onRepeat: function() {
    tl.set("#messages", {text: function() { 
        messages = [" Programador 1", " Programador 2", " Programador 3", " Programador 4", " Programador"];
        mensaje = messages[i];
        i = (i>=messages.length-1) ? 0 : i+1;
        return mensaje; 
    }}, 2)
}});

tl.to("#messages", {duration: 2, text:" Programador"});