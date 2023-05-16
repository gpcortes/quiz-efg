const questions = [
    {
        type: "TextField",
        title: "Qual o seu nome e sobrenome?",
        label: "Nome completo",
        shuffle: false,
        weigh: false,
    },
    {
        type: "PhoneField",
        title: "Qual o seu número de Whatsapp?",
        label: "Número",
        shuffle: false,
        weigh: false,
    },
    {
        type: "RadioGroup",
        title: "Como é a sua personalidade?",
        options: [
            { value: "a", label: "Metódica" },
            { value: "b", label: "Tecnológica" },
            { value: "c", label: "Empreendedora" },
            { value: "d", label: "Criativa" },
            { value: "e", label: "Influenciadora" },
        ],
        shuffle: true,
        weigh: true,
    },
    {
        type: "RadioGroup",
        title: "Na escola, você prefere assuntos ligados à qual área do conhecimento?",
        options: [
            { value: "a", label: "Ciências exatas" },
            { value: "b", label: "Ciências humanas" },
            { value: "c", label: "Ciências naturais" },
            { value: "d", label: "Linguística" },
            { value: "e", label: "Artes" },
        ],
        shuffle: true,
        weigh: true,
    },
    {
        type: "RadioGroup",
        title: "Com o que você mais se identifica?",
        options: [
            { value: "a", label: "Praticidade e curiosidade" },
            { value: "b", label: "Sistemas e construção" },
            { value: "c", label: "Controle do tempo, comando e execução" },
            { value: "d", label: "Pessoas de todos os níveis sociais e culturais" },
            { value: "e", label: "Discurso, Argumentação e persuasão" },
        ],
        shuffle: true,
        weigh: true,
    },
    {
        type: "RadioGroup",
        title: "Qual área mais desperta seu interesse?",
        options: [
            { value: "a", label: "Inteligência artificial" },
            { value: "c", label: "Criatividade" },
            { value: "d", label: "Empreendedorismo" },
            { value: "b", label: "Economia" },
            { value: "e", label: "Marketing" },
        ],
        shuffle: true,
        weigh: true,
    },
    {
        type: "RadioGroup",
        title: "O que você quer aprender?",
        options: [
            { value: "a", label: "Utilizar métodos computacionais para ensinar os computadores a aprender com a experiência, sem depender de modelos pré-determinados" },
            { value: "b", label: "Desenvolver sites, aplicativos, softwares, banco de dados e outras ferramentas da internet, através da linguagem de programação" },
            { value: "c", label: "Planejar e criar novos negócios (Start ups) para atuar no mercado digital, utilizando diferentes técnicas para promover o seu sucesso" },
            { value: "d", label: "Empreender, de forma criativa, nos setores culturais e tecnológicos, através dos princípios da economia circular e das tecnologias 4.0 e 5.0" },
            { value: "e", label: "Realizar o planejamento, a criação e a gestão de tráfego digital, mídias e produtos digitais em diferentes plataformas" },
        ],
        shuffle: true,
        weigh: true,
    },
    {
        type: "RadioGroup",
        title: "Quanto você quer ganhar?",
        options: [
            { value: "a", label: "+ R$3.000,00" },
            { value: "b", label: "+ R$4.000,00" },
            { value: "c", label: "+ R$5.000,00" },
            { value: "d", label: "+ R$10.000,00" },
            { value: "e", label: "Ao infinito e além!" },
        ],
        shuffle: false,
        weigh: false,
    }
];

export default questions;