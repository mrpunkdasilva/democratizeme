# 🚀 Deployment & CI/CD Guide

Este documento explica como configurar e usar o pipeline de CI/CD do Democratize.me.

## 📋 Visão Geral

O projeto utiliza GitHub Actions para automatizar:
- ✅ Testes e verificação de qualidade de código
- 🔒 Auditoria de segurança
- ⚡ Análise de performance (Lighthouse)
- 🚀 Deploy automático para produção e staging
- 🔄 Atualizações automáticas de dependências

## 🔧 Configuração Inicial

### 1. Secrets do GitHub

Configure os seguintes secrets no seu repositório GitHub:

**Para Vercel (Recomendado):**
```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

**Para Snyk (Opcional - Segurança):**
```
SNYK_TOKEN=your_snyk_token
```

**Para Codecov (Quando testes forem implementados):**
```
CODECOV_TOKEN=your_codecov_token
```

### 2. Configuração do Vercel

1. Conecte seu repositório no [Vercel Dashboard](https://vercel.com/dashboard)
2. Configure as variáveis de ambiente no Vercel:
   ```
   NODE_VERSION=18
   NEXT_TELEMETRY_DISABLED=1
   ```
3. Obtenha os tokens necessários:
   - `VERCEL_TOKEN`: Settings → Tokens
   - `VERCEL_ORG_ID` e `VERCEL_PROJECT_ID`: `.vercel/project.json` após primeira deploy

## 🌊 Fluxo de Trabalho

### Branches e Ambientes

- **`main`** → Deploy automático para **Produção**
- **`develop`** → Deploy automático para **Staging**
- **Pull Requests** → Preview deploy + testes completos

### Pipeline de CI/CD

#### 1. **Code Quality (`ci-cd.yml`)**
```yaml
# Executado em: push para main/develop + PRs

✅ ESLint + TypeScript check
🏗️ Build em Node 18 e 20
🔒 Security audit
⚡ Lighthouse CI (PRs)
🚀 Deploy automático
```

#### 2. **Advanced Quality (`code-quality.yml`)**
```yaml
# Executado em: PRs + schedule diário

🔍 Análise avançada de código
📊 Bundle size analysis
🛡️ Vulnerability scanning
📈 Coverage reports (futuro)
```

#### 3. **Dependencies (`dependency-update.yml`)**
```yaml
# Executado em: Segunda-feira 9h UTC + manual

🔄 Atualização de dependências
🔒 Correções de segurança
📝 PR automático com mudanças
```

#### 4. **PR Automation (`pr-automation.yml`)**
```yaml
# Executado em: eventos de PR

🏷️ Labels automáticos
📏 Size labels (XS, S, M, L, XL)
👋 Mensagem de boas-vindas
✅ Verificações obrigatórias
🤖 Auto-merge (dependabot)
```

## 📊 Métricas e Monitoramento

### Performance (Lighthouse CI)
- **Performance**: mín. 80%
- **Accessibility**: mín. 90%
- **Best Practices**: mín. 90%
- **SEO**: mín. 80%
- **FCP**: máx. 2s
- **LCP**: máx. 3s
- **CLS**: máx. 0.1

### Qualidade de Código
- ESLint sem erros
- TypeScript sem erros
- Build bem-sucedido
- Sem vulnerabilidades críticas

## 🚀 Como Fazer Deploy

### Deploy Automático
1. **Produção**: Merge para `main`
2. **Staging**: Merge para `develop`
3. **Preview**: Abrir PR

### Deploy Manual
```bash
# Local build test
npm run build
npm start

# Vercel CLI
npx vercel --prod
```

## 🔄 Atualizando Dependências

### Automático (Recomendado)
- Toda segunda-feira às 9h UTC
- PR automático criado
- Review e merge manual

### Manual
```bash
npm run deps:update
npm run security:audit
npm run build
```

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Servidor de desenvolvimento
npm run build            # Build de produção
npm run lint             # Verificar código
npm run lint:fix         # Corrigir problemas automáticos
npm run type-check       # Verificar TypeScript

# Análise
npm run analyze          # Análise de bundle
npm run security:audit   # Auditoria de segurança
npm run clean            # Limpar cache

# Futuros (quando implementados)
npm test                 # Executar testes
npm run test:coverage    # Cobertura de testes
```

## 🏷️ Labels Automáticos

O sistema automaticamente adiciona labels baseado nos arquivos alterados:

- 🎨 `frontend` - Componentes, páginas, estilos
- ⚙️ `backend` - Services, APIs, dados
- 📋 `config` - Configurações, package.json
- 📖 `documentation` - README, docs
- 🎯 `feature/*` - Features específicas
- 🎨 `design-system` - Componentes comuns
- 📦 `dependencies` - Atualizações de deps
- 🔒 `security` - Questões de segurança
- ⚡ `performance` - Otimizações
- 🧪 `tests` - Arquivos de teste
- 🔄 `ci-cd` - Workflows GitHub

## 🐛 Troubleshooting

### Build Falhando
```bash
# Limpar cache e reinstalar
npm run clean
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deploy Falhando
1. Verificar secrets do GitHub
2. Verificar configuração do Vercel
3. Verificar logs do GitHub Actions
4. Verificar se build local funciona

### Lighthouse Falhando
- Verificar se aplicação inicia corretamente
- Verificar performance das páginas
- Ajustar thresholds se necessário

## 📚 Recursos Adicionais

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**💡 Dica**: Mantenha este documento atualizado conforme o projeto evolui!

