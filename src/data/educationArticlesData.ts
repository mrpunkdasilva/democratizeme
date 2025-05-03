// Definir a interface para o tipo EducationArticle
export interface EducationArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  complexity: string;
  readTime: number;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  author?: {
    name: string;
    avatar: string;
  };
  relatedArticles?: string[];
  references?: Array<{
    title: string;
    url: string;
  }>;
}

// Dados mockados para os artigos educacionais
export const educationArticles: EducationArticle[] = [
  {
    id: "processo-legislativo-basico",
    title: "Entendendo o Processo Legislativo Brasileiro",
    content: `# Entendendo o Processo Legislativo Brasileiro

O processo legislativo brasileiro é o conjunto de etapas que uma proposta de lei deve percorrer até ser aprovada e entrar em vigor. Este artigo explica de forma simples como funciona esse processo.

## Iniciativa Legislativa

O processo começa com a apresentação de uma proposta. Podem apresentar propostas:

- Deputados e Senadores
- O Presidente da República
- O Supremo Tribunal Federal
- Tribunais Superiores
- O Procurador-Geral da República
- Os cidadãos (por meio de iniciativa popular)

## Tramitação na Câmara dos Deputados

Após ser apresentada, a proposta é analisada pelas comissões temáticas da Câmara dos Deputados. Cada comissão avalia aspectos específicos do projeto, como constitucionalidade, impacto orçamentário e mérito.

Depois de aprovada nas comissões, a proposta vai para votação no plenário da Câmara, onde precisa de maioria simples para ser aprovada (metade mais um dos deputados presentes).

## Tramitação no Senado Federal

Se aprovada na Câmara, a proposta segue para o Senado, onde passa por processo semelhante: análise em comissões e votação em plenário.

## Sanção ou Veto Presidencial

Após aprovação nas duas casas legislativas, o projeto é enviado ao Presidente da República, que pode:

- Sancionar (aprovar) o projeto, transformando-o em lei
- Vetar (rejeitar) o projeto, total ou parcialmente

## Promulgação e Publicação

Após sancionada, a lei é promulgada e publicada no Diário Oficial da União, entrando em vigor na data estabelecida no próprio texto.

## Participação Popular

Os cidadãos podem participar do processo legislativo por meio de:

- Projetos de iniciativa popular (precisam de assinaturas de 1% do eleitorado nacional)
- Audiências públicas
- Consultas públicas
- Contato direto com parlamentares`,
    category: "Processo Legislativo",
    complexity: "Básico",
    readTime: 8,
    publishedAt: "2023-07-15T10:00:00Z",
    tags: ["processo legislativo", "leis", "congresso", "democracia"],
    author: {
      name: "Dra. Carla Mendes",
      avatar: "https://randomuser.me/api/portraits/women/76.jpg"
    },
    relatedArticles: ["tipos-proposicoes-legislativas", "comissoes-parlamentares"],
    references: [
      {
        title: "Constituição Federal - Art. 59 a 69",
        url: "http://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
      },
      {
        title: "Regimento Interno da Câmara dos Deputados",
        url: "https://www2.camara.leg.br/atividade-legislativa/legislacao/regimento-interno-da-camara-dos-deputados"
      }
    ]
  },
  {
    id: "tipos-proposicoes-legislativas",
    title: "Tipos de Proposições Legislativas: PEC, PL, MP e Outras",
    content: `# Tipos de Proposições Legislativas

Existem diversos tipos de proposições legislativas no sistema brasileiro, cada uma com características e finalidades específicas. Conheça as principais:

## Proposta de Emenda à Constituição (PEC)

A PEC visa alterar o texto da Constituição Federal. Para ser aprovada, precisa de:
- 3/5 dos votos em cada casa legislativa (308 deputados e 49 senadores)
- Dois turnos de votação em cada casa

## Projeto de Lei (PL)

O PL é a proposição mais comum e visa criar uma nova lei ordinária ou alterar uma já existente. Precisa de maioria simples para aprovação.

## Projeto de Lei Complementar (PLC)

O PLC regulamenta dispositivos constitucionais que exigem complementação. Precisa de maioria absoluta para aprovação (metade mais um do total de parlamentares).

## Medida Provisória (MP)

A MP é editada pelo Presidente da República em casos de relevância e urgência, tendo força de lei imediata, mas precisa ser aprovada pelo Congresso em até 120 dias para se tornar lei definitiva.

## Projeto de Decreto Legislativo (PDL)

O PDL regula matérias de competência exclusiva do Congresso Nacional, como a aprovação de tratados internacionais.

## Projeto de Resolução (PR)

O PR trata de assuntos internos do Senado ou da Câmara, como alterações em seus regimentos.

## Proposta de Fiscalização e Controle (PFC)

A PFC é utilizada para que o Congresso exerça sua função fiscalizadora sobre o Poder Executivo.`,
    category: "Processo Legislativo",
    complexity: "Intermediário",
    readTime: 10,
    publishedAt: "2023-07-20T14:30:00Z",
    tags: ["proposições", "PEC", "PL", "MP", "processo legislativo"],
    author: {
      name: "Dr. Ricardo Almeida",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg"
    },
    relatedArticles: ["processo-legislativo-basico", "comissoes-parlamentares"],
    references: [
      {
        title: "Manual de Redação Parlamentar da Câmara dos Deputados",
        url: "https://bd.camara.leg.br/bd/handle/bdcamara/27595"
      }
    ]
  },
  {
    id: "comissoes-parlamentares",
    title: "O Papel das Comissões Parlamentares",
    content: `# O Papel das Comissões Parlamentares

As comissões parlamentares são grupos de trabalho formados por deputados ou senadores para analisar e discutir temas específicos. Elas desempenham um papel fundamental no processo legislativo brasileiro.

## Tipos de Comissões

### Comissões Permanentes

São comissões que funcionam durante toda a legislatura e têm competências específicas por área temática, como:
- Comissão de Constituição e Justiça (CCJ)
- Comissão de Finanças e Tributação (CFT)
- Comissão de Educação (CE)
- Comissão de Direitos Humanos (CDH)

### Comissões Temporárias

São criadas para fins específicos e se extinguem ao término de seus trabalhos ou ao final da legislatura. Incluem:

#### Comissões Especiais
Criadas para analisar propostas específicas, como PECs.

#### Comissões Parlamentares de Inquérito (CPIs)
Têm poderes de investigação semelhantes aos das autoridades judiciais e são criadas para apurar fatos determinados.

#### Comissões Externas
Acompanham assuntos específicos fora do Congresso Nacional.

## Funções das Comissões

### Função Legislativa
As comissões analisam os projetos de lei antes que eles cheguem ao plenário, podendo:
- Aprovar ou rejeitar projetos
- Propor emendas e substitutivos
- Em alguns casos, aprovar projetos em caráter terminativo (sem necessidade de ir ao plenário)

### Função Fiscalizadora
As comissões podem:
- Convocar ministros e outras autoridades
- Realizar audiências públicas
- Solicitar informações ao Poder Executivo
- Acompanhar a execução de políticas públicas

### Função Representativa
As comissões servem como espaço para que a sociedade civil participe do processo legislativo por meio de audiências públicas e debates.`,
    category: "Processo Legislativo",
    complexity: "Intermediário",
    readTime: 12,
    publishedAt: "2023-08-05T09:15:00Z",
    updatedAt: "2023-08-10T11:30:00Z",
    tags: ["comissões", "parlamento", "CPI", "processo legislativo"],
    author: {
      name: "Dra. Carla Mendes",
      avatar: "https://randomuser.me/api/portraits/women/76.jpg"
    },
    relatedArticles: ["processo-legislativo-basico", "tipos-proposicoes-legislativas"],
    references: [
      {
        title: "Regimento Interno da Câmara dos Deputados - Arts. 22 a 64",
        url: "https://www2.camara.leg.br/atividade-legislativa/legislacao/regimento-interno-da-camara-dos-deputados"
      },
      {
        title: "Regimento Interno do Senado Federal - Arts. 71 a 153",
        url: "https://www25.senado.leg.br/web/atividade/regimento-interno"
      }
    ]
  }
];