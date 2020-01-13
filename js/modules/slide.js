export default class Slide {
    constructor(slide, wrapper) {
        this.slide = document.querySelector(slide);
        this.wrapper = document.querySelector(wrapper);
    }
    removerPadroes(event) {
        event.preventDefault();
        this.wrapper.addEventListener('mousemove', this.iniciarEventoAoMoverMouseSobreImagem);
    }
    iniciarEventoAoMoverMouseSobreImagem() {
        console.log('moveu');
    }
    encerrarEventoAoTirarMouseSobreImagem() {
        this.wrapper.removeEventListener('mousemove', this.iniciarEventoAoMoverMouseSobreImagem);
    }
    bindEventos() {
        this.removerPadroes = this.removerPadroes.bind(this);
        this.iniciarEventoAoMoverMouseSobreImagem = this.iniciarEventoAoMoverMouseSobreImagem.bind(this);
        this.encerrarEventoAoTirarMouseSobreImagem = this.encerrarEventoAoTirarMouseSobreImagem.bind(this);
    }
    adicionarEventosSlide() {
        this.wrapper.addEventListener('mousedown', this.removerPadroes);
        this.wrapper.addEventListener('mouseup', this.encerrarEventoAoTirarMouseSobreImagem);
    }
    iniciar() {
        if (this.wrapper && this.slide) {
            this.bindEventos();
            this.adicionarEventosSlide();
        }
        return this;
    }
}