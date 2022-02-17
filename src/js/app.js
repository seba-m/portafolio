document.addEventListener('DOMContentLoaded', function () {
    scrollNav();

    reverseGrid();
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