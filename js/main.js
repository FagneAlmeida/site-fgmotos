// --- JS/MAIN.JS ---

// 1. CORREÇÃO DE ROLAGEM (Scroll Restoration)
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// --- BANCO DE DADOS DE ARTIGOS (CONTEÚDO TÉCNICO) ---
const articlesDB = {
    "freios": {
        title: "ANÁLISE CRÍTICA: SISTEMA DE FRENAGEM",
        subtitle: "IDENTIFICAÇÃO DE FALHAS E VAPOR LOCK",
        content: `
            <div class="space-y-6">
                <div class="p-4 border border-red-500/20 bg-red-500/5 rounded-sm">
                    <h4 class="text-red-400 font-bold mono-font mb-2 flex items-center gap-2"><i data-lucide="alert-triangle" class="w-4 h-4"></i> PONTO CRÍTICO: HIGROSCOPIA</h4>
                    <p class="text-sm text-gray-400">O fluido de freio (DOT 4/5.1) absorve umidade do ar. Apenas 3% de água misturada ao óleo reduz o ponto de ebulição de 230°C para 155°C, causando falha total em frenagens bruscas (Vapor Lock).</p>
                </div>

                <h4 class="text-white font-bold text-lg mt-6">SINAIS DE FADIGA DO SISTEMA</h4>
                <ul class="space-y-3 text-sm text-gray-300">
                    <li class="flex items-start gap-3">
                        <span class="text-amber-500 font-mono">01.</span>
                        <span><strong>Manete "Esponjoso":</strong> Indica presença de bolhas de ar ou fluido velho compressível. Necessário sangria à vácuo.</span>
                    </li>
                    <li class="flex items-start gap-3">
                        <span class="text-amber-500 font-mono">02.</span>
                        <span><strong>Vitrificação das Pastilhas:</strong> Superfície espelhada devido a superaquecimento. Reduz o coeficiente de atrito drasticamente.</span>
                    </li>
                    <li class="flex items-start gap-3">
                        <span class="text-amber-500 font-mono">03.</span>
                        <span><strong>Disco Azulado:</strong> Têmpera do aço alterada por calor excessivo. Risco de empenamento ou trincas.</span>
                    </li>
                </ul>

                <div class="mt-8 pt-6 border-t border-white/10">
                    <h4 class="text-sky-400 font-bold mono-font mb-2">/// PROTOCOLO FG MOTOS</h4>
                    <p class="text-xs text-gray-500 mb-4">Utilizamos scanner de fluido para medir a % de umidade exata antes da troca.</p>
                    <a href="#agendamento" onclick="document.getElementById('service').value='Outro'; document.getElementById('message').value='Solicito análise do sistema de freios.'; closeArticleModal();" class="btn-tech px-6 py-3 rounded-sm text-black font-bold text-xs inline-flex items-center gap-2">
                        AGENDAR DIAGNÓSTICO
                    </a>
                </div>
            </div>
        `
    },
    "oleo": {
        title: "ENGENHARIA DE LUBRIFICAÇÃO",
        subtitle: "VISCOSIDADE E NORMAS JASO/API",
        content: `
            <div class="space-y-6">
                <p class="text-gray-300 leading-relaxed">O óleo não serve apenas para "escorregar" as peças. Em motores modernos de alta rotação, ele atua como <strong class="text-white">refrigerante térmico</strong> e vedante de anéis de pistão.</p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <div class="glass-panel p-4 rounded-sm border-l-2 border-l-amber-500">
                        <h5 class="text-amber-500 font-bold text-xs mono-font mb-1">JASO MA2</h5>
                        <p class="text-xs text-gray-400">Norma japonesa essencial para motos com embreagem úmida. Óleos de carro (API comum) fazem a embreagem patinar.</p>
                    </div>
                    <div class="glass-panel p-4 rounded-sm border-l-2 border-l-sky-500">
                        <h5 class="text-sky-500 font-bold text-xs mono-font mb-1">VISCOSIDADE</h5>
                        <p class="text-xs text-gray-400">10W40 vs 20W50: A escolha errada altera a pressão hidráulica e o tempo de subida do óleo na partida a frio.</p>
                    </div>
                </div>

                <h4 class="text-white font-bold text-lg">SEMISSINTÉTICO VS SINTÉTICO</h4>
                <p class="text-sm text-gray-400 mb-4">Óleos 100% sintéticos (ex: Motul 7100) possuem cadeias moleculares uniformes, resistindo ao cisalhamento (quebra do filme de óleo) em altas RPMs, onde óleos minerais falhariam.</p>

                <div class="mt-8 pt-6 border-t border-white/10">
                    <h4 class="text-sky-400 font-bold mono-font mb-2">/// PROTOCOLO FG MOTOS</h4>
                    <p class="text-xs text-gray-500 mb-4">Trabalhamos exclusivamente com Motul e filtros de alta retenção (Mahle/Hiflo).</p>
                    <a href="#agendamento" onclick="document.getElementById('service').value='Troca de Óleo'; closeArticleModal();" class="btn-tech px-6 py-3 rounded-sm text-black font-bold text-xs inline-flex items-center gap-2">
                        SOLICITAR TROCA
                    </a>
                </div>
            </div>
        `
    },
    "balanceamento": {
        title: "TECNOLOGIA MICRES",
        subtitle: "BALANCEAMENTO DINÂMICO AUTOMÁTICO",
        content: `
            <div class="space-y-6">
                <div class="relative overflow-hidden rounded-sm border border-white/10 mb-6">
                    <div class="absolute top-2 right-2 bg-green-500 text-black text-[10px] font-bold px-2 py-1 mono-font">ECO-FRIENDLY</div>
                    <img src="images/blog-balanceamento.png" class="w-full h-32 object-cover opacity-50" onerror="this.style.display='none'">
                    <div class="p-4 relative z-10">
                        <p class="text-gray-200 text-sm">Esqueça os chumbos colados na roda. A tecnologia de microesferas usa a força centrífuga para eliminar vibrações.</p>
                    </div>
                </div>

                <h4 class="text-white font-bold text-lg">COMO FUNCIONA?</h4>
                <ul class="space-y-4 text-sm text-gray-300">
                    <li class="p-3 glass-panel rounded-sm">
                        <strong class="text-green-400 block mb-1">Física Aplicada:</strong>
                        As microesferas eletrostáticas se movem livremente dentro do pneu. Quando a roda gira, a força centrífuga as empurra exatamente para o lado oposto do ponto mais pesado.
                    </li>
                    <li class="p-3 glass-panel rounded-sm">
                        <strong class="text-green-400 block mb-1">Ajuste Contínuo:</strong>
                        Diferente do chumbo, que é fixo, as esferas se reajustam a cada volta. Se o pneu desgastar ou pegar uma pedra, o balanceamento se corrige automaticamente.
                    </li>
                </ul>

                <div class="mt-8 pt-6 border-t border-white/10">
                    <h4 class="text-sky-400 font-bold mono-font mb-2">/// PROTOCOLO FG MOTOS</h4>
                    <p class="text-xs text-gray-500 mb-4">Aplicação via dosagem de precisão na instalação do pneu novo.</p>
                    <a href="#agendamento" onclick="document.getElementById('service').value='Outro'; document.getElementById('message').value='Interesse em balanceamento com microesferas.'; closeArticleModal();" class="btn-tech px-6 py-3 rounded-sm text-black font-bold text-xs inline-flex items-center gap-2">
                        INSTALAR MICRES
                    </a>
                </div>
            </div>
        `
    }
};


// --- INICIALIZAÇÃO DA APLICAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Scroll Fix
    window.scrollTo(0, 0);
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, 100);

    // Inicializa Ícones Lucide
    lucide.createIcons();

    // --- LAZY LOAD DO CHATBOT ---
    const chatbotSection = document.getElementById('chatbot');
    if (chatbotSection) {
        const iframeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const chatbotIframe = entry.target.querySelector('iframe');
                    if (chatbotIframe && chatbotIframe.dataset.src) {
                        chatbotIframe.src = chatbotIframe.dataset.src;
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, { rootMargin: '50px' });
        iframeObserver.observe(chatbotSection);
    }

    // --- LÓGICA DO MODAL DE ARTIGOS (ATUALIZADA) ---
    const articleModal = document.getElementById('article-modal');
    const articleModalBody = document.getElementById('article-modal-body');
    const closeArticleModalBtn = document.getElementById('close-article-modal');

    // Função Global para fechar (usada nos botões internos)
    window.closeArticleModal = () => {
        if (!articleModal) return;
        articleModal.classList.add('hidden');
        articleModal.classList.remove('flex');
        articleModalBody.innerHTML = '';
        document.body.style.overflow = '';
    };

    const openArticleModal = (articleKey) => {
        if (!articleKey || !articleModal || !articleModalBody) return;
        
        // Busca os dados no DB local
        const data = articlesDB[articleKey];

        if (data) {
            // Monta o HTML dinamicamente
            articleModalBody.innerHTML = `
                <div class="animate-fadeIn">
                    <div class="mb-8 border-b border-white/10 pb-4">
                        <span class="text-amber-500 text-xs font-mono uppercase tracking-widest border border-amber-500/20 px-2 py-1 rounded-sm">Doc. Técnico</span>
                        <h2 class="text-2xl md:text-3xl font-bold text-white mt-3 leading-tight">${data.title}</h2>
                        <h3 class="text-gray-500 text-sm font-mono mt-1 uppercase">${data.subtitle}</h3>
                    </div>
                    <div class="article-content text-gray-300">
                        ${data.content}
                    </div>
                </div>
            `;
            
            articleModal.classList.remove('hidden');
            articleModal.classList.add('flex');
            document.body.style.overflow = 'hidden';
            lucide.createIcons(); // Recarrega ícones dentro do modal
        } else {
            console.error("Artigo não encontrado no DB:", articleKey);
        }
    };

    // Event Listeners para os links dos artigos
    document.querySelectorAll('[data-article]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.closest('[data-article]');
            const articleKey = target ? target.dataset.article : null;
            if(articleKey) openArticleModal(articleKey);
        });
    });

    if (closeArticleModalBtn) closeArticleModalBtn.addEventListener('click', window.closeArticleModal);
    
    if (articleModal) {
        articleModal.addEventListener('click', (e) => {
            if (e.target === articleModal) window.closeArticleModal();
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && articleModal && !articleModal.classList.contains('hidden')) {
            window.closeArticleModal();
        }
    });

    // --- MENU MOBILE ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
        mobileMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') mobileMenu.classList.add('hidden');
        });
    }

    // --- FORMULÁRIO WHATSAPP ---
    const agendamentoForm = document.getElementById('agendamento-form');
    if (agendamentoForm) {
        agendamentoForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Coleta dados
            const fullName = document.getElementById('full-name').value;
            const phone = document.getElementById('phone').value;
            const motoModel = document.getElementById('moto-model').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Lógica de envio
            const whatsappNumber = "5567999271603";
            let preFilledMessage = `Olá! Gostaria de solicitar um agendamento.\n\n*Nome:* ${fullName}\n*Telefone:* ${phone}\n*Moto:* ${motoModel}\n*Serviço:* ${service}\n`;
            if (message) preFilledMessage += `*Obs:* ${message}\n`;
            
            const encodedMessage = encodeURIComponent(preFilledMessage);
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
            
            // Feedback Visual
            const formConfirmation = document.getElementById('form-confirmation');
            if (formConfirmation) {
                formConfirmation.innerHTML = `<p class="text-green-500 mt-4 text-center mono-font text-xs p-2 border border-green-500/20 bg-green-500/5 rounded-sm">/// SISTEMA: DADOS TRANSMITIDOS. AGUARDE RESPOSTA.</p>`;
                setTimeout(() => { formConfirmation.innerHTML = ''; }, 5000);
            }
            agendamentoForm.reset();
        });
    }

    // --- MODAL DE IMAGENS (GALERIA) ---
    const imageModal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModalBtn = document.getElementById('close-modal');

    if (imageModal && modalImage && closeModalBtn) {
        document.querySelectorAll('.clickable-image').forEach(item => {
            item.addEventListener('click', function() {
                const imgElement = this.querySelector('img');
                if (imgElement && imgElement.src) {
                    modalImage.src = imgElement.src;
                    imageModal.classList.remove('hidden');
                    imageModal.classList.add('flex');
                }
            });
        });
        
        const closeImageModal = () => {
            imageModal.classList.add('hidden');
            imageModal.classList.remove('flex');
        };
        
        closeModalBtn.addEventListener('click', closeImageModal);
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) closeImageModal();
        });
    }

    // --- ANO ATUAL ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});