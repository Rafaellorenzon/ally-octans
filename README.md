# Ally Octans
Site estático publicado em https://rafaellorenzon.github.io/ally-octans/.

## Página inicial
Uma tela com três links: Discord, site oficial de Aika e WhatsApp da guilda.
O vídeo fornecido faz parte do cenário, sem som, em loop. Camadas CSS e movimento
suave com o cursor dão sensação de profundidade; não é um modelo 3D real.

A home é adaptada para celular, computador e orientação horizontal. Em telas
extremamente pequenas ou com zoom elevado, a rolagem continua permitida para
não esconder conteúdo. A galeria fica em uma página separada.

O botão no rodapé pausa/ativa o vídeo e os efeitos. Com preferência por menos
movimento ou economia de dados, a página começa com uma imagem estática.
O vídeo pausa em abas ocultas. Sem JavaScript, sem vídeo ou se a reprodução
automática for bloqueada, o pôster mantém o cenário e os três links funcionam.

## Galeria
galeria.html reúne as três fotos originais. Clique para ampliar, use Escape
para fechar. Sem JavaScript os links abrem diretamente os arquivos de imagem.

## Arquivos
- index.html: página inicial e os três links.
- galeria.html: fotos.
- style.css: visual e adaptação às telas.
- script.js: vídeo, profundidade e ampliação das fotos.
- assets/: fotos e vídeo fornecidos pelo responsável, preservados.
- assets/rpg-button-frame.svg: moldura vetorial própria dos botões, com bronze,
  relevos e textura. As palavras e os ícones continuam em HTML/SVG acessível.
- .nojekyll: publicação estática sem processamento Jekyll.

## Atualizar
Edite os arquivos, valide e envie para a branch main. O GitHub Pages publica
a raiz da branch main. O script Publicar-AllyOctans.ps1 fica fora deste
repositório, na pasta pai. Backups e relatórios de teste também ficam fora
dos arquivos públicos.

Esta é uma página independente da comunidade, não o site oficial de Aika.
