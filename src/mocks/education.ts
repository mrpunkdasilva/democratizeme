// Tipos para os dados de educação
export type GlossaryTerm = {
  term: string;
  definition: string;
  category: 'Legislativo' | 'Executivo' | 'Judiciário' | 'Eleitoral' | 'Geral';
};

export type LegislativeGuide = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  readTime: number;
  complexity: 'Básico' | 'Intermediário' | 'Avançado';
};

// Termos do glossário
export const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'PL (Projeto de Lei)',
    definition: 'Proposta normativa que deve submeter-se à tramitação em um órgão legislativo com o objetivo de se efetivar como uma norma de direito.',
    category: 'Legislativo'
  },
  {
    term: 'PEC (Proposta de Emenda à Constituição)',
    definition: 'Proposta que visa alterar alguma parte do texto constitucional. Precisa de aprovação em dois turnos, por três quintos dos votos, em cada casa do Congresso Nacional.',
    category: 'Legislativo'
  },
  {
    term: 'MP (Medida Provisória)',
    definition: 'Instrumento com força de lei, adotado pelo presidente da República, em casos de relevância e urgência. Produz efeitos imediatos, mas depende de aprovação do Congresso para transformação definitiva em lei.',
    category: 'Executivo'
  },
  {
    term: 'Quórum',
    definition: 'Número mínimo de membros presentes numa assembleia deliberativa para que possa funcionar ou tomar decisões válidas.',
    category: 'Legislativo'
  },
  {
    term: 'Votação Nominal',
    definition: 'Modalidade de votação em que se registra o voto de cada parlamentar, permitindo saber como cada um se posicionou.',
    category: 'Legislativo'
  },
  {
    term: 'Votação Simbólica',
    definition: 'Modalidade de votação em que o presidente da sessão pede que os favoráveis permaneçam como estão e os contrários se manifestem.',
    category: 'Legislativo'
  },
  {
    term: 'Sanção',
    definition: 'Ato pelo qual o chefe do Poder Executivo (presidente, governador ou prefeito) aprova um projeto de lei aprovado pelo Poder Legislativo.',
    category: 'Executivo'
  },
  {
    term: 'Veto',
    definition: 'Ato pelo qual o chefe do Poder Executivo recusa sanção a um projeto de lei aprovado pelo Poder Legislativo, impedindo, dessa forma, sua transformação em lei.',
    category: 'Executivo'
  },
  {
    term: 'Promulgação',
    definition: 'Ato que declara a existência de uma lei e ordena sua execução.',
    category: 'Executivo'
  },
  {
    term: 'Publicação',
    definition: 'Ato que torna pública a lei, através de veículos oficiais de comunicação, como o Diário Oficial.',
    category: 'Executivo'
  },
  {
    term: 'Legislatura',
    definition: 'Período de quatro anos em que o Congresso Nacional exerce suas atividades, correspondente ao mandato dos deputados federais.',
    category: 'Legislativo'
  },
  {
    term: 'Sessão Legislativa',
    definition: 'Período anual em que o Congresso Nacional se reúne para exercer suas atividades. Divide-se em dois períodos: de 2 de fevereiro a 17 de julho e de 1º de agosto a 22 de dezembro.',
    category: 'Legislativo'
  },
  {
    term: 'Comissão Parlamentar',
    definition: 'Órgão técnico, composto por parlamentares, que tem por finalidade discutir e votar propostas de leis e outros assuntos que lhe forem atribuídos.',
    category: 'Legislativo'
  },
  {
    term: 'CPI (Comissão Parlamentar de Inquérito)',
    definition: 'Comissão temporária criada para investigar fato determinado, com poderes de investigação próprios das autoridades judiciais.',
    category: 'Legislativo'
  },
  {
    term: 'ADI (Ação Direta de Inconstitucionalidade)',
    definition: 'Instrumento utilizado no controle de constitucionalidade das leis e atos normativos, visando invalidar leis ou atos normativos que contrariem a Constituição Federal.',
    category: 'Judiciário'
  },
  {
    term: 'ADPF (Arguição de Descumprimento de Preceito Fundamental)',
    definition: 'Ação judicial que visa evitar ou reparar lesão a preceito fundamental resultante de ato do Poder Público.',
    category: 'Judiciário'
  },
  {
    term: 'Coligação',
    definition: 'União de dois ou mais partidos políticos que participam como uma só agremiação durante o processo eleitoral.',
    category: 'Eleitoral'
  },
  {
    term: 'Cláusula de Barreira',
    definition: 'Dispositivo que estabelece um percentual mínimo de votos que um partido político precisa obter para ter direito a recursos do fundo partidário e tempo de propaganda eleitoral gratuita.',
    category: 'Eleitoral'
  },
  {
    term: 'Fidelidade Partidária',
    definition: 'Princípio que obriga o candidato eleito a permanecer filiado ao partido pelo qual se elegeu, sob pena de perder o mandato.',
    category: 'Eleitoral'
  },
  {
    term: 'Imunidade Parlamentar',
    definition: 'Prerrogativa que garante aos parlamentares a inviolabilidade por suas opiniões, palavras e votos, além de impedir sua prisão, salvo em flagrante de crime inafiançável.',
    category: 'Legislativo'
  }
];

// Guias sobre o processo legislativo
export const legislativeGuides: LegislativeGuide[] = [
  {
    title: 'Como um Projeto de Lei se torna Lei',
    description: 'Entenda o passo a passo do processo legislativo brasileiro, desde a apresentação de um projeto até sua sanção e publicação como lei.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbmdyZXNzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    tags: ['Processo Legislativo', 'Projetos de Lei', 'Congresso Nacional'],
    readTime: 12,
    complexity: 'Básico'
  },
  {
    title: 'Diferenças entre PL, PEC, PLP e MP',
    description: 'Conheça os diferentes tipos de proposições legislativas, suas características, trâmites específicos e quando cada uma é utilizada.',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGF3fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    tags: ['Proposições', 'Legislação', 'Medida Provisória'],
    readTime: 15,
    complexity: 'Intermediário'
  },
  {
    title: 'O Papel das Comissões Parlamentares',
    description: 'Descubra como funcionam as comissões permanentes e temporárias no Congresso Nacional e qual sua importância no processo legislativo.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fG1lZXRpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    tags: ['Comissões', 'Congresso', 'Processo Legislativo'],
    readTime: 10,
    complexity: 'Intermediário'
  },
  {
    title: 'Como Acompanhar a Tramitação de Projetos',
    description: 'Guia prático sobre como o cidadão pode acompanhar a tramitação de projetos de lei e outras proposições no Congresso Nacional.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGNvbXB1dGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    tags: ['Participação Cidadã', 'Transparência', 'Monitoramento'],
    readTime: 8,
    complexity: 'Básico'
  },
  {
    title: 'O Sistema de Votações no Congresso',
    description: 'Entenda os diferentes tipos de votação (simbólica, nominal e secreta), quóruns necessários e como interpretar os resultados.',
    image: 'https://images.unsplash.com/photo-1494172961521-33799ddd43a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHZvdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    tags: ['Votações', 'Quórum', 'Processo Decisório'],
    readTime: 12,
    complexity: 'Intermediário'
  },
  {
    title: 'Controle de Constitucionalidade das Leis',
    description: 'Aprenda sobre os mecanismos de controle de constitucionalidade no Brasil, como ADI, ADC, ADPF e o papel do STF nesse processo.',
    image: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c3VwcmVtZSUyMGNvdXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    tags: ['Constitucionalidade', 'STF', 'Judiciário'],
    readTime: 20,
    complexity: 'Avançado'
  }
];

// Conteúdo sobre direitos do cidadão (a ser implementado)
export const citizenRights = [];
