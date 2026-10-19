# Formato Web: sites demonstrativos

Dois sites institucionais completos, feitos em HTML, CSS e JavaScript puros (sem framework, sem build). Servem como portfólio e como base para clientes reais.

| Pasta | Empresa (fictícia) | Público | Destaque |
|---|---|---|---|
| `odontologia/` | Sereno Odontologia, Rio Negro, PR | Paciente final (B2C) | Roteiro da primeira consulta, minuto a minuto |
| `medicina-do-trabalho/` | Prumo Saúde Ocupacional, Mafra, SC | Empresas (B2B) | Diagnóstico interativo de conformidade (PGR, PCMSO, eSocial) |

## Ver os sites no ar (GitHub Pages)

1. No GitHub, abra o repositório e vá em **Settings → Pages**.
2. Em "Branch", escolha **main** e a pasta **/ (root)**. Clique em **Save**.
3. Em 1 ou 2 minutos os sites ficam disponíveis em:
   - https://gustavodelima-dev.github.io/sites-demo/
   - https://gustavodelima-dev.github.io/sites-demo/odontologia/
   - https://gustavodelima-dev.github.io/sites-demo/medicina-do-trabalho/

O cartão de prévia do WhatsApp (`og-image.jpg`) só aparece depois que o Pages estiver ativo, porque usa o endereço completo.

## Estrutura de cada site

```
odontologia/
├─ index.html                  página única com todas as seções
├─ css/style.css               visual; as cores ficam no :root, no topo
├─ js/main.js                  menu, formulário, WhatsApp
├─ img/favicon.svg             ícone da aba
├─ img/og-image.jpg            prévia no WhatsApp (1200x630)
├─ politica-de-privacidade.html
├─ robots.txt e sitemap.xml    para o Google
```

## Como adaptar para um cliente real

1. **Copie a pasta** e renomeie (ex.: `clinica-fulano/`).
2. **Cores e fontes:** troque as variáveis no topo do `css/style.css` (`--brand`, `--brand-dark`, `--brand-light`, `--accent`...).
3. **WhatsApp:** troque a constante `WHATSAPP` no topo do `js/main.js` e procure por `wa.me` e `tel:` no `index.html`.
4. **Dados da empresa:** busque e troque nome, endereço, CEP, telefone, e-mail, horários, CNPJ e responsável técnico (rodapé), no `index.html` e na política de privacidade.
5. **SEO:** atualize `<title>`, `description`, `canonical`, as tags `og:` e o bloco **JSON-LD** no `<head>`, além de `robots.txt` e `sitemap.xml`.
6. **Mapa:** troque o endereço na URL do `<iframe class="mapa">`.
7. **Fotos:** os demos foram pensados para funcionar sem fotos. Com o cliente real, use fotos da clínica e da equipe (WebP, até 200 KB, sempre com `alt`).
8. **Remova o aviso de site demonstrativo** do rodapé.
9. **Reescreva os textos:** nunca repita a mesma frase de destaque entre dois clientes da mesma cidade.

## O que já vem pronto

- Layout responsivo testado em 1440px e 390px, sem rolagem horizontal
- Menu mobile acessível (teclado, `aria-expanded`, tecla Esc)
- Formulário com validação, máscara de telefone e envio pelo WhatsApp
- Checkbox de consentimento LGPD e política de privacidade
- SEO local: título, descrição, Open Graph, JSON-LD (`Dentist` / `MedicalBusiness`), sitemap
- Acessibilidade: link "pular para o conteúdo", foco visível, contraste AA, `prefers-reduced-motion`
- Compliance de saúde: responsável técnico com registro no conselho, sem promessa de resultado nem "antes e depois"

## Publicar para um cliente

- **Teste rápido:** arraste a pasta em https://app.netlify.com/drop
- **Definitivo:** GitHub Pages, Netlify ou Vercel (HTTPS automático)
- **Domínio:** Registro.br, de preferência no CNPJ do cliente

---
Desenvolvido por **Formato Web**.
