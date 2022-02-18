var captchaButton = false;

document.addEventListener('DOMContentLoaded', function () {
    nav();

    scrollNav();

    reverseGrid();

    var lazyLoadInstance = new LazyLoad({});

});

function reverseGrid() {
    document.querySelectorAll(".container-project").forEach((project, index) => {
        if (index % 2 == 0)
            project.classList.add("reverse");
    })
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach(function (enlace) {
        enlace.addEventListener('click', function (e) {
            e.preventDefault();

            const seccion = document.querySelector(e.target.attributes.href.value);
            seccion.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function nav() {
    document.querySelector('.toggle-nav').addEventListener('click', function () {
        let nav = document.querySelector('.nav-pane');
        toggleNavigation(this, nav);
        changeLetters(this);
    })
}

function toggleNavigation(btn, nav) {
    btn.classList.toggle('open');
    nav.classList.toggle('open');
}

function changeLetters(btn) {
    var m = document.querySelector('.toggle-nav span.m');
    var e = document.querySelector('.toggle-nav span.e');
    var n = document.querySelector('.toggle-nav span.n');
    var u = document.querySelector('.toggle-nav span.u');

    e.classList.toggle('btn-cerrar');

    if (btn.classList.contains('open')) {
        m.textContent = "E";
        n.textContent = "I";
        u.textContent = "T";
    }
    else {
        m.textContent = "M";
        n.textContent = "N";
        u.textContent = "U";
    }
}