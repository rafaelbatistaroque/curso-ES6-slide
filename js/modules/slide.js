export default class Slide {
    constructor(slide, wrapper) {
        this.slide = document.querySelector(slide);
        this.wrapper = document.querySelector(wrapper);
        this.distancia = { posicaoFinal: 0, inicioEixoX: 0, totalMovimento: 0 };
    }
    removerPadroes(event) {
        event.preventDefault();
        this.distancia.inicioEixoX = event.clientX;
        console.log(this.distancia.inicioEixoX);

        this.wrapper.addEventListener('mousemove', this.iniciarEventoAoMoverMouseSobreImagem);
    }
    moverSlide(distanciaX) {
        this.distancia.ultimaPosicao = distanciaX;
        this.slide.style.transform = `translate3d(${distanciaX}px, 0, 0)`;
    }
    atualizarPosicaoCliqueMouse(clientX) {
        this.distancia.totalMovimento = (this.distancia.inicioEixoX - clientX) * 1.6;
        return this.distancia.posicaoFinal - this.distancia.totalMovimento;

    }
    iniciarEventoAoMoverMouseSobreImagem() {
        const posicaoFinal = this.atualizarPosicaoCliqueMouse(event.clientX);
        this.moverSlide(posicaoFinal);
    }
    encerrarEventoAoTirarMouseSobreImagem() {
        this.wrapper.removeEventListener('mousemove', this.iniciarEventoAoMoverMouseSobreImagem);
        this.distancia.posicaoFinal = this.distancia.ultimaPosicao;
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