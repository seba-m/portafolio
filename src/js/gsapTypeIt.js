'use strict';


var gsapTypeIt = function () {
    // Create global element references
    this.el = null;
    this.cursor = null;
    this.wordIndex = 0;
    this.wordIndexLength = 0;
    // Define option defaults
    var defaults = {
        el: null,
        elClass: '',
        rotateWords: false,
        rotateWordsOptions: {
            wordsList: [],
            cycle: false,
            clear: false,
            clearingDuration: 2,
            clear_background: '#000',
            clear_color: '#fff',
            original_background: 'transparent',
            original_color: '#000',
            append: false,
            pause: false,
        },
        word: "",
        cursorSign: "|",
        cursorSignOptions: {
            original_background: 'transparent',
            original_color: '#000',
        },
        autoPlay: true,
        delay: 2,
        charterPerSecond: false,
        duration: 1.5,
        easing: Linear.easeNone
    }

    // Create options by extending defaults with the passed in arugments
    if (arguments[0] && typeof arguments[0] === "object") {
        this.options = extendDefaults(defaults, arguments[0]);
    }

    buildGsapTypeIt.call(this);


}

// Private Methods

function extendDefaults(source, properties) {
    var property;

    for (property in properties) {
        if (properties.hasOwnProperty(property)) {
            if (typeof properties[property] === 'object' && properties[property] !== null && !(properties[property] instanceof Date) && typeof properties[property].nodeType === 'undefined' && !Array.isArray(properties[property]) && property !== 'easing') {
                extendDefaults(source[property], properties[property]);
            } else {
                source[property] = properties[property];
            }
        }
    }

    return source;
}


// Public Methods

gsapTypeIt.prototype.type = function () {

    var op = this.options,
        el = op.el,
        delay = op.delay,
        ease = op.easing,
        duration = op.duration,
        cps = op.charterPerSecond,
        word = op.word,
        rotateWordsOptions = op.rotateWordsOptions,
        words = rotateWordsOptions.wordsList,
        wordIndex = this.wordIndex,
        oldClass,
        cursorOp = op.cursorSignOptions;



    TweenLite.delayedCall(0, setCursorClassName, [this.cursor, "blink", cursorOp]);
    TweenLite.delayedCall(delay, setCursorClassName, [this.cursor, " ", cursorOp]);

    if (!this.options.rotateWords) {
        console.log(cps);
        if (cps) {
            duration = setCharterPerSecondDuration(word, cps);
        }
        TweenLite.to(el, duration, { text: { value: word }, delay: delay, ease: ease, onComplete: setCursorClassName, onCompleteParams: [this.cursor, 'blink', cursorOp] });

    } else {
        this.wordIndex = wordIndex;

        if (cps) {
            duration = setCharterPerSecondDuration(words[this.wordIndex], cps);
        }


        if (rotateWordsOptions.append && wordIndex > 0) {

            word = el.textContent + words[this.wordIndex];
            oldClass = '';

        } else {

            word = words[this.wordIndex];
            oldClass = 'old';
        }

        TweenLite.to(el, duration, { text: { value: word, oldClass: oldClass }, delay: delay, ease: ease, onComplete: this.typeRotationCompleted, onCompleteParams: [this, this.options] });

    }
}

gsapTypeIt.prototype.typeRotationCompleted = function (that, options) {

    var cursorOp = options.cursorSignOptions;

    setCursorClassName(that.cursor, 'blink', cursorOp);

    if (that.wordIndex >= that.wordIndexLength - 1) {
        if (that.options.rotateWordsOptions.cycle) {
            that.wordIndex = 0;
        } else {
            return;
        }
    } else {
        that.wordIndex++;
    }
    if (that.options.rotateWordsOptions.clear) {
        that.clear();
        return false;
    }
    if (that.options.rotateWordsOptions.pause) {
        return false;
    }

    that.type(that.el);
}

gsapTypeIt.prototype.clear = function () {
    var rotateWordsOp = this.options.rotateWordsOptions;
    var cursorOp = this.options.cursorSignOptions;

    TweenLite.set(this.el, { background: rotateWordsOp.clear_background, color: rotateWordsOp.clear_color, delay: rotateWordsOp.clearingDuration / 2 });
    TweenLite.delayedCall(rotateWordsOp.clearingDuration / 2, setCursorClassName, [this.cursor, "hide", cursorOp]);

    TweenLite.set(this.el, { text: { value: "" }, background: rotateWordsOp.original_background, color: rotateWordsOp.original_color, delay: rotateWordsOp.clearingDuration });
    TweenLite.delayedCall(rotateWordsOp.clearingDuration, setCursorClassName, [this.cursor, "blink", cursorOp]);

    if (!rotateWordsOp.pause) {
        var that = this;
        TweenLite.delayedCall(rotateWordsOp.clearingDuration, this.type, [], that);
    }
}

gsapTypeIt.prototype.clearCompleted = function () {

}

function setCursorClassName(cursor, className, options) {
    // cursor.className = " ";
    cursor.className = "gsapCursor " + className;
    if (options) {
        TweenLite.set(cursor, { background: options.original_background, color: options.original_color });
    }
}

function setCharterPerSecondDuration(word, cps) {
    return word.length / cps;
}

function gsapTypeItError(message) {
    this.message = message;
    this.name = "gsapTypeItError s";
}

function buildGsapTypeIt() {
    var HTMLcursor, op;
    op = this.options;
    this.el = op.el;

    if (this.options.elClass) {
        this.el.className = op.elClass;
    }

    if (op.rotateWords) {
        this.wordIndexLength = op.rotateWordsOptions.wordsList.length;
    }

    HTMLcursor = document.createElement("span");
    HTMLcursor.className = 'gsapCursor blink';
    this.el.parentNode.insertBefore(HTMLcursor, this.el.nextSibling);
    HTMLcursor.innerHTML = this.options.cursorSign;
    this.cursor = HTMLcursor;

    if (op.autoPlay) {
        this.type();
    }

}
