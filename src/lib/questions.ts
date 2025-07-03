export type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export const questions: Question[] = [
  {
    question: "Quem foi Donatello, uma das figuras centrais do Renascimento?",
    options: ["Um pintor italiano", "Um escultor italiano", "Um arquiteto espanhol", "Um poeta francês"],
    correctAnswer: "Um escultor italiano",
  },
  {
    question: "Qual famosa escultura de bronze de Donatello é considerada uma das primeiras estátuas nuas autônomas desde a antiguidade?",
    options: ["Gattamelata", "São Jorge", "David", "Zuccone"],
    correctAnswer: "David",
  },
  {
    question: "Em que cidade italiana Donatello passou a maior parte de sua vida e carreira, deixando um legado duradouro?",
    options: ["Roma", "Veneza", "Milão", "Florença"],
    correctAnswer: "Florença",
  },
  {
    question: "Qual técnica inovadora Donatello é famoso por ter desenvolvido, criando um relevo com profundidade ilusória em uma superfície rasa?",
    options: ["Sfumato", "Chiaroscuro", "Schiacciato (relevo achatado)", "Tenebrismo"],
    correctAnswer: "Schiacciato (relevo achatado)",
  },
  {
    question: "A monumental estátua equestre de Gattamelata, uma obra-prima de Donatello, está localizada em qual cidade?",
    options: ["Florença", "Pádua", "Siena", "Roma"],
    correctAnswer: "Pádua",
  },
  {
    question: "Qual dos seguintes materiais não era comumente usado por Donatello em suas esculturas?",
    options: ["Bronze", "Mármore", "Madeira", "Aço inoxidável"],
    correctAnswer: "Aço inoxidável",
  },
  {
    question: "Qual obra de Donatello é uma escultura em madeira conhecida por seu realismo expressivo, representando uma figura penitente?",
    options: ["Madalena Penitente", "São João Batista", "Profeta Habacuque (Zuccone)", "Banquete de Herodes"],
    correctAnswer: "Madalena Penitente",
  },
  {
    question: "Com qual famoso artista Donatello foi aprendiz no início de sua carreira, trabalhando no Batistério de Florença?",
    options: ["Filippo Brunelleschi", "Lorenzo Ghiberti", "Masaccio", "Leonardo da Vinci"],
    correctAnswer: "Lorenzo Ghiberti",
  },
  {
    question: "A obra de Donatello foi fundamental para o desenvolvimento de qual período artístico posterior?",
    options: ["Barroco", "Gótico", "Alta Renascença", "Maneirismo"],
    correctAnswer: "Alta Renascença",
  },
  {
    question: "Na base da estátua de São Jorge de Donatello, há um relevo que é um dos primeiros exemplos de perspectiva linear na escultura. Que cena ele retrata?",
    options: ["A Anunciação", "A crucificação de São Pedro", "São Jorge e o Dragão", "O Juízo Final"],
    correctAnswer: "São Jorge e o Dragão",
  },
  {
    question: "Qual era o apelido de uma das esculturas de profeta de Donatello para o Campanário de Giotto, devido à sua cabeça calva e aparência intensa?",
    options: ["Il Vecchio (O Velho)", "Il Penseroso (O Pensador)", "Zuccone (Cabeça de Abóbora)", "Il Terribile (O Terrível)"],
    correctAnswer: "Zuccone (Cabeça de Abóbora)",
  },
  {
    question: "Qual poderosa família florentina foi uma das principais patronas de Donatello, encomendando obras como o 'David' de bronze?",
    options: ["Família Sforza", "Família Borgia", "Família Medici", "Família Pazzi"],
    correctAnswer: "Família Medici",
  },
];
