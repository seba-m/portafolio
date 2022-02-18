new gsapTypeIt({
    el: document.getElementById('messages'),
    rotateWords: true,
    duration: 1.7,
    rotateWordsOptions: {
        wordsList: ["programmer", "back-end developer", "front-end developer", "freelancer", "android developer"],
        cycle: true,
        clear: true,
        clear_background: '#3297FD',
        clear_color: '#fff',
        original_background: 'transparent',
        original_color: '#fff',
    },
    cursorSignOptions: {
        original_background: 'transparent',
        original_color: '#fff',
    }
});

Array.from(document.querySelectorAll('.splide')).forEach(elm => {
    let splide = new Splide(elm, { type: 'fade', rewind: true, fixedHeight: '20%', pagination: false });
    splide.mount();
});
