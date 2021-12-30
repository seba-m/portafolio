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

new PageScroll('#pagescroll', {
    animDuration: 500, // 2 seconds
    easing: 'cubic-bezier(.17,.67,.83,.67)', //animation easing
    controlColor: '#ccc', // color of navigation arrows
    nav: [
        document.getElementById('home'),
        document.getElementById('about'),
        document.getElementById('projects'),
        document.getElementById('contact')
    ]
})

tns({
    "container": '.my-slider',
    "items": 1,
    "swipeAngle": false,
    "edgePadding": 0,
    "responsive": {
        "480": {
            "items": 2
        },
        "768": {
            "items": 3
        },
        "1200": {
            "items": 4,
        }
    },
});

