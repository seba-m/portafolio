var rotating = new gsapTypeIt({
    el: document.getElementById('messages'),
    rotateWords: true,
    duration: 1.7,
    rotateWordsOptions: {
        wordsList: ["Programmer", "Back-end Developer", "Front-end Developer", "Freelancer", "Android Developer"],
        cycle: true,
        clear: true
    }
});