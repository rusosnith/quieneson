// Este archivo contiene el código JavaScript que maneja la lógica de la página. 
// Incluye funciones para compartir visualizaciones, desplazamiento suave para enlaces de anclaje 
// y un indicador de carga para D3.js.

function shareVisualization(title, anchor) {
    const url = window.location.href.split('#')[0] + anchor;
    
    if (navigator.share) {
        navigator.share({
            title: `${title} - ¿Y estos quienes son?`,
            text: `Explora esta visualización: ${title}`,
            url: url
        }).catch(console.error);
    } else {
        navigator.clipboard.writeText(url).then(function() {
            const toast = document.createElement('div');
            toast.textContent = 'Enlace copiado al portapapeles';
            toast.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: #1a1a1a;
                color: white;
                padding: 12px 24px;
                border-radius: 4px;
                z-index: 10000;
                font-size: 14px;
            `;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        }).catch(function(err) {
            console.error('Error al copiar: ', err);
        });
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

if (typeof d3 !== 'undefined') {
    console.log('D3.js cargado correctamente');
}