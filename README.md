# Image Annotator
  
## Introdução

   Editor online para a anotação de imagens através de formas e figuras em SVG para uso no Harena. Gabriel de Freitas Garcia - RA 216179

## Sumário

- [Image Annotator](#image-annotator)
  - [Introdução](#introdu%c3%a7%c3%a3o)
  - [Sumário](#sum%c3%a1rio)
  - [Apresentação](#apresenta%c3%a7%c3%a3o)
  - [Escolhendo formas](#escolhendo-formas)
    - [Implementação](#implementa%c3%a7%c3%a3o)
  - [Anotando](#anotando)
  - [Armazenamento das anotações](#armazenamento-das-anota%c3%a7%c3%b5es)
  - [Editando anotações](#editando-anota%c3%a7%c3%b5es)
    - [Por trás dos panos](#por-tr%c3%a1s-dos-panos)
  - [Conclusão](#conclus%c3%a3o)

## Apresentação

  Este é um editor para permitir a anotação de imagens para utilização da plataforma com fins médicos, Harena, como eletrocardiogramas e radiografias. Ele permite que sejam selecionadas áreas específicas de uma certa imagem e a ela sejam adicionadas informações referentes a essa região da imagem, através de texto livre ou, também, de ontologias, como a Mesh. Isso é feito através da seleção interativa de figuras em SVG postas por cima da imagem que se quer anotar, então, através do tamanho da figura e sua posição, é determinada a região de interesse. Faz-se isso com quantas regiões se deseja marcar, então utiliza-se um menu para registrar os dados sobre as regiões selecionadas.

## Escolhendo formas

  A plataforma consiste de uma página da web em HTML5 que contém a imagem que será anotada e alguns menus para a execução das anotações.
  Para a escolha das formas, no menu superior, existe um menu de seleção que possui algumas opções de formas pré definidas e (futuramente) a possibilidade de fazer o upload de uma forma desejada. Depois de escolhida a forma, existe um botão, criado a partir de um web component JavaScript, para criar e renderizar a figura. Ao clicar no botão a figura aparece sobre a imagem, então é possível movê-la, segurando o botão esquerdo do mouse sobre a figura. Quando se clica sobre a figura pequenos quadrados aparecem, ao arrastá-los, a figura cresce na diagonal onde este quadrado está, sem manter sua proporção, para isso deve-se redimensioná-la mantendo a tecla ctrl pressionada. Este processo pode ser repetido quantas vezes forem necessárias para marcar todas as regiões desejadas da imagem.

### Implementação

  Para isso funcionar, a página é um documento HTML, ele contém um div com os controles e um div onde a imagem alvo está como background. A esse div é adicionado um svg que ocupa todo o div, para as formas poderem ocupar todo o espaço. Quando o botão para criar a figura é apertado, o script gera um svg genérico, g, e a esse g é adicionado uma imagem svg, tag image, que contém uma imagem SVG que pode ser de uma série de formas geométricas pré-determinadas, segundo a escolha do usuário. A tag image do SVG funciona como a tag rect, sempre tem o formato de um retângulo, independente da imagem que ela receba, então nas extremidades desse retângulo são criados quatro pequenos quadrados svg que a princípio são deixados invisíveis, por fim a opacidade da imagem é reduzida para deixá-la translucida e tudo é adicionado ao SVG no documento e exibido na tela.
  
  Quando o usuário clica sobre uma das figuras, os pequenos quadrados tem sua visibilidade mudada e é registrada a posição do clique em relação a onde a figura estava. Se o botão do mouse for segurado, não apenas clicado, a figura inteira vai seguir o mouse a partir do movimento deste em relação à posição previamente guardada. Se ocorreu apenas um clique os quadradinhos ficaram visíveis e é possível clicar sobre eles e arrastá-los, quando é arrastado, calculamos seu movimento relativo e fazemos com que sua altura e lagura cresçam segundo o quanto o quadrado arrastado se moveu, sem necessariamente manter a proporção da figura (a menos que o ctrl seja mantido pressionado). Os outros quadrados acompanham o crescimento da figura,se mantendo nos vértices do retângulo de fundo da image.
  ![Imagem editor](editor.PNG)

## Anotando

(*Futuramente*)
  
  Depois de escolhidas as regiões que se quer selecionar, pode-se fazer a anotação. No menu superior existe um botão chamado anotar. Ao clicar nele é aberto um menu de anotações lateral na parte lateral direita da página. Nesse menu existe um menu de seleção, esse menu possui, a princípio, duas opções, texto livre e vocabulário. Ao selecionar texto livre, aparece um campo de digitação onde o usuário pode digitar a informação que queira adicionar. Ao se escolher vocabulário, um novo menu de seleção aparece, ele contém palavras vindas de nossas ontologias que possam ser usadas para registrar os fatos médicos sobre a imagem e o usuário pode escolher uma delas. Logo abaixo, existe um botão adicionar, cada nova informação, seja de vocabulário ou texto livre colocada, ao apertar o botão, ela é adicionada a essa anotação. Para escolher quais regiões marcadas estão associadas a essa anotação o usuário deve clicar sobre cada região marcada, elas ficarão realçadas, para tirar a seleção basta clicar sobre a região que quer remover. Por fim, existe um botão anotar no final do menu, ao clicar nele a anotação e toda informação associada a ela serão salvos e enviados à base de dados.

## Armazenamento das anotações

(*Futuramente*)

  O sistema possui uma lista de anotações, quando o usuário termina uma anotação é criado um novo obejto para essa lista. Esse obejto possui os seguintes atributos, tipo, conteúdo e regiões. O tipo guarda uma string que contém se essa anotação é texto livre ou se pertence ao vocabulário. O conteúdo guarda o que foi anotado, ou seja, uma String contendo o texto livre digitado pelo usuário ou então a palavra do vocabulário que ele escreveu. Por fim, o atributo regiões é uma outra lista de objetos. Esses objetos representam as formas que marcam as regiões. Eles guardam o formato da figura que está sobre essa região, guardam a posição da origem dessa figura, o vértice superior esquerdo da image, guardam a altura, a largura e a cor da figura. Por fim, esse objeto é adicionado ao final da lista de anotações. Quando o usuário quiser salvar suas anotações sobre essa imagem, ele clica num botão salvar, então essa lista é transformada numa string através do método "JSON.stringify()", é enviada para o Harena através do barramento de mensagens do sistema e pode ser salvo nos cookies do navegador.

## Editando anotações

(*Futuramente*)

  O sistema ao ser reaberto, ou mesmo durante o uso, pode carregar as anotações feitas anteriormente para editá-las ou excluí-las. Para isso, existe no menu lateral, enquanto uma nova anotação não está sendo criada, um menu de seleção que contém a lista de todas as anotações feitas pelo usuário, ao selecionar uma aparecem as informações que foram salvas sobre essa anotação, tipo, conteúdo, regiões. Tipo e conteúdo podem ser alterados ao escolher novas palavras do vocabulário, ou digitando um novo texto livre. É possível marcar novas regiões para essa anotação criando elas com o editor, como descrito anteriormente, também é possível excluir regiões clicando em cima delas, por fim, existe um botão para excluir essa anotação, apagando toda informação associada a ela  e retirando todo vínculo com qualquer região marcada.

### Por trás dos panos

  Quando o sistema é carregado numa imagem já anotada pelo usuário, ele recebe pelo barremento o JSON salvo anteriormente quando a imagem foi anotada, então esse JSON é transformado novamente na lista de anotações que foi gerada pelo sistema anteriormente através do método "JSON.parse()". Então essa lista é lida, anotação por anotação, o conteúdo dela é adicionado ao menu de seleção do menu de edição, e cada figura é renderizada sobre a imagem de fundo de novo. Quando o usuário passa o mouse por cima de uma dessas figuras ela é destacada e aparece uma pequena janela com os detalhes da anotação sobre a qual ela está associada. Quando o usuário edita os detalhes da anotação no menu, eles são alterados na lista de anotações, trocando conteúdo, tipo, adicionando e/ou removendo regiões ou, até mesmo, removendo completamente essa anotação da lista. Quando o usuário termina seu trabalho a lista é novamente salva numa string JSON, enviada ao Harena pelo barramento e pode ser salva de novo nos cookies do navegador.
  
## Conclusão
  
  Esta ferramente fornece uma forma visual e intuitiva para que médicos e alunos possam anotar imagens médicas ao longo da criação ou execução de casos do Harena com diversos objetivos, como o registro de partes da imagem que são definitivos para o diagnóstico, entre outros.
  