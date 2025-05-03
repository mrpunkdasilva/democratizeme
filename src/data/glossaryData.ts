// Tipos para os dados do glossário
export type GlossaryTerm = {
  term: string;
  definition: string;
  category: string;
  related?: string[];
};

// Categorias para filtro
export const glossaryCategories = ["Todos", "Conceitos Básicos", "Estrutura Política", "Legislação", "Participação"];

// Termos do glossário
export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Democracia",
    definition: "Sistema político em que o poder emana do povo, que o exerce diretamente ou por meio de representantes eleitos.",
    category: "Conceitos Básicos",
    related: ["Voto", "Eleição", "Representação"]
  },
  {
    term: "Constituição",
    definition: "Lei fundamental e suprema de um Estado, que contém normas respeitantes à organização básica do Estado, ao reconhecimento e à garantia dos direitos fundamentais do ser humano e do cidadão.",
    category: "Legislação",
    related: ["PEC", "Direitos Fundamentais", "Estado"]
  },
  {
    term: "PEC",
    definition: "Proposta de Emenda à Constituição. É uma proposta de alteração de alguma parte do texto constitucional.",
    category: "Legislação",
    related: ["Constituição", "Congresso Nacional", "Processo Legislativo"]
  },
  {
    term: "Três Poderes",
    definition: "Divisão do poder do Estado em três esferas: Executivo, Legislativo e Judiciário, que atuam de forma independente e harmônica entre si.",
    category: "Estrutura Política",
    related: ["Executivo", "Legislativo", "Judiciário", "Freios e Contrapesos"]
  },
  {
    term: "Executivo",
    definition: "Poder responsável por governar o povo e administrar os interesses públicos, cumprindo as ordenações legais.",
    category: "Estrutura Política",
    related: ["Presidente", "Governador", "Prefeito", "Três Poderes"]
  },
  {
    term: "Legislativo",
    definition: "Poder responsável pela elaboração das leis e fiscalização dos atos do Poder Executivo.",
    category: "Estrutura Política",
    related: ["Congresso Nacional", "Assembleia Legislativa", "Câmara Municipal", "Três Poderes"]
  },
  {
    term: "Judiciário",
    definition: "Poder responsável por interpretar as leis e julgar os conflitos na sociedade conforme as regras constitucionais e leis criadas pelo Legislativo.",
    category: "Estrutura Política",
    related: ["STF", "Juiz", "Tribunal", "Três Poderes"]
  },
  {
    term: "Voto",
    definition: "Manifestação da vontade ou preferência de um eleitor em um processo eleitoral ou deliberativo.",
    category: "Participação",
    related: ["Eleição", "Democracia", "Sufrágio"]
  },
  {
    term: "Eleição",
    definition: "Processo de escolha de representantes por meio do voto dos eleitores.",
    category: "Participação",
    related: ["Voto", "Candidato", "Campanha", "Democracia"]
  },
  {
    term: "Congresso Nacional",
    definition: "Órgão constitucional que exerce o Poder Legislativo no âmbito federal, composto pela Câmara dos Deputados e pelo Senado Federal.",
    category: "Estrutura Política",
    related: ["Câmara dos Deputados", "Senado Federal", "Legislativo"]
  },
  {
    term: "Projeto de Lei",
    definition: "Proposta normativa submetida à deliberação de um órgão legislativo, que visa criar uma nova lei ou modificar uma já existente.",
    category: "Legislação",
    related: ["Lei", "Processo Legislativo", "Legislativo"]
  },
  {
    term: "Sanção",
    definition: "Ato pelo qual o chefe do Poder Executivo (Presidente, Governador ou Prefeito) aprova um projeto de lei aprovado pelo Poder Legislativo.",
    category: "Legislação",
    related: ["Veto", "Projeto de Lei", "Processo Legislativo"]
  }
];