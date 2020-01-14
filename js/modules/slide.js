export default class Slide {
    constructor(slide, wrapper) {
        this.slide = document.querySelector(slide);
        this.wrapper = document.querySelector(wrapper);
        this.distancia = { posicaoFinal: 0, inicioEixoX: 0, totalMovimento: 0 };
    }
    removerPadroes(event) {
        let tipoMovimento;
        if (event.type === 'mousedown') {
            event.preventDefault();
            this.distancia.inicioEixoX = event.clientX;
            tipoMovimento = 'mousemove';
        }
        else {
            this.distancia.inicioEixoX = event.changedTouches[0].clientX;
            tipoMovimento = 'touchmove';
        }
        this.wrapper.addEventListener(tipoMovimento, this.iniciarEventoAoMoverMouseSobreImagem);
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
        const posicaoInicial = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX;
        const posicaoFinal = this.atualizarPosicaoCliqueMouse(posicaoInicial);
        this.moverSlide(posicaoFinal);
    }
    encerrarEventoAoTirarMouseSobreImagem() {
        const posicaoInicial = (event.type === 'mouseup') ? 'mousemove' : 'touchmove';
        this.wrapper.removeEventListener(posicaoInicial, this.iniciarEventoAoMoverMouseSobreImagem);
        this.distancia.posicaoFinal = this.distancia.ultimaPosicao;
    }
    bindEventos() {
        this.removerPadroes = this.removerPadroes.bind(this);
        this.iniciarEventoAoMoverMouseSobreImagem = this.iniciarEventoAoMoverMouseSobreImagem.bind(this);
        this.encerrarEventoAoTirarMouseSobreImagem = this.encerrarEventoAoTirarMouseSobreImagem.bind(this);
    }
    adicionarEventosSlide() {
        this.wrapper.addEventListener('mousedown', this.removerPadroes);
        this.wrapper.addEventListener('touchstart', this.removerPadroes);

        this.wrapper.addEventListener('mouseup', this.encerrarEventoAoTirarMouseSobreImagem);
        this.wrapper.addEventListener('touchend', this.encerrarEventoAoTirarMouseSobreImagem);
    }
    calcularPosicaoSlide(slide) {
        const margem = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
        return -(slide.offsetLeft - margem);
    }
    navegacaoSlide(index) {
        const ultimo = this.atributosSlide.length - 1;
        this.index = {
            slideAnterior: index ? index - 1 : undefined,
            slideAtual: index,
            slideProximo: index === ultimo ? undefined : index + 1,
        };
        console.log(this.index);

    }
    obterAtributosSlide() {
        this.atributosSlide = [...this.slide.children].map(elemento => {
            const posicaoEsquerdaDeCadaSlide = this.calcularPosicaoSlide(elemento);
            return { posicaoEsquerdaDeCadaSlide, elemento };
        });
    }
    movimentarSlide(index) {
        const slideAtivo = this.atributosSlide[index];
        this.moverSlide(slideAtivo.posicaoEsquerdaDeCadaSlide);
        this.navegacaoSlide(index);
        this.distancia.posicaoFinal = slideAtivo.posicaoEsquerdaDeCadaSlide;
    }
    iniciar() {
        if (this.wrapper && this.slide) {
            this.bindEventos();
            this.adicionarEventosSlide();
            this.obterAtributosSlide();
        }
        return this;
    }
}