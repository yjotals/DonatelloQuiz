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
];
