$(document).ready(function () {
  $(".mudaTela").click(function () {
    mudaTela(
      $(this),
      $(this).attr("nova"),
      $(this).attr("animacao"),
      $(this).attr("tempoAnimacao")
    );
  });

  $("a.opcoes").click(function (e) {
    e.preventDefault();
    $("div.opcoes").slideToggle(500);
  });

  $(".calendario .marcado").click(function () {
    mostraMsgMes($(this).attr("value"));
  });

  const mudaTela = (
    atual,
    nova = null,
    animacao = "fade",
    tempoAnimacao = 900
  ) => {
    // define a nova tela
    if (!nova) {
      nova = parseInt(atual.parent().attr("id").split("tela")[1]) + 1;
    }

    if (animacao == "fade") {
      $("#tela" + (nova - 1)).fadeOut(tempoAnimacao);
      setTimeout(() => {
        $("#tela" + nova).fadeIn(tempoAnimacao);
      }, tempoAnimacao);
    } else {
      $("#tela" + (nova - 1)).hide(tempoAnimacao);
      $("#tela" + nova).show(tempoAnimacao);
    }

    if ($("#tela" + nova).hasClass("temporizado")) {
      $("#tela" + nova + " div").hide();
      telaTemporizada(nova, 0);
    }

    verificaFundo(nova);
    $("html, body").animate({ scrollTop: 0 }, "slow");
    if (nova == 3) {
      var audio = new Audio("assets/musica.mp3");
      audio.volume = 0.1;
      audio.play();
    }
  };

  const telaTemporizada = (nTela, contador) => {
    const tela = $("#tela" + nTela + " div:eq(" + contador + ")");
    const temporizador = 500;
    const temporizadorPrimeiraTela =
      contador == 0 ? $("#tela" + nTela).attr("tempo") : temporizador;

    setTimeout(() => {
      tela.fadeIn(temporizador);

      setTimeout(() => {
        tela.fadeOut(temporizador);
        if (tela.attr("final") == "true") {
          mudaTela(null, nTela + 1, "fade", 900);
          verificaFundo(nTela + 1);
        } else {
          telaTemporizada(nTela, contador + 1);
        }
      }, tela.attr("tempo"));
    }, temporizadorPrimeiraTela);
  };

  const verificaFundo = (nTela) => {
    const fundo = $("#tela" + nTela).attr("fundo");
    const tempo = $("#tela" + nTela).attr("tempo");

    if (fundo) {
      $("body").attr("class", fundo);
    }
  };

  const mostraMsgMes = (texto) => {
    let titulo;
    let mensagem;

    switch (texto) {
      case "17/6":
        titulo = "17 de Junho de 2023";
        mensagem =
          "<p>Esse foi o dia da trilha. Onde nosso caminho se cruzou a primeira vez.</p>";
        break;
      case "23/6":
        titulo = "23 de Junho de 2023";
        mensagem =
          "<p>Nesse dia vi que você era mulher de atitude. Fez todo o esquema tático para me apresentar o melhor beijo do mundo ❤️ e que beijo bom</p>";
        break;
      case "15/7":
        titulo = "15 de Julho de 2023";
        mensagem =
          "<p>Nosso primeiro rolê juntos, o MotoFest! Depois que descobri que a Jubz era do rock🤘🏼, nem pensei 2 vezes em te chamar para o MotoFest e já apresentei para os friends..</p>";
        break;
      case "30/7":
        titulo = "30 de Julho de 2023";
        mensagem =
          "<p>O piquenique na Serra! Aqui eu vi que você é maluquinha das ideia, nem me conhecia direito e já animou um piquenique bolado na Serra de Ouro Branco. Na serração que tava, tinha tudo para dar errado, mas por ser com você... Já sabe que foi perfeito.</p>";
        break;
      case "14/9":
        titulo = "14 de Setembro de 2023";
        mensagem =
          "<p>Dia do aniversário da GOSTOSA! Não nos vimos esse dia mas é o seu dia especial. (dia 15 nos vimos para eu te entregar o presente, e foi perfeito como sempre)</p>";
        break;
      case "14/10":
        titulo = "14 de Outubro de 2023";
        mensagem =
          "<p>Dia do Show da Ludmila. Foi especial demais, ficamos de casal de fato a primeira vez em público e isso me deixou todo feliz</p>";
        break;
      case "11/11":
        titulo = "11 de Novembro de 2023";
        mensagem =
          "<p>Dia do primeiro EU TE AMO!❤️ Nossa, que difícil foi falar isso, mass quando falei, tinha certeza de que era verdadeiro.</p>";
        break;
      case "09/12":
        titulo = "9 de Dezembro de 2023";
        mensagem =
          "<p>Meu aniversário! Esse dia foi marcante, conheceu minha familia de verdade e já chegou mostrando que é de casa. Quem nunca deu um PTzin, não é mesmo?</p>";
        break;
      case "26/12":
        titulo = "26 de Dezembro de 2023";
        mensagem =
          "<p>Dia que conheci seu pai. Foi muito bom poder falar para seus geradores nesse dia que eu estou apaixonado por você.</p>";
        break;
      case "31/12":
        titulo = "31 de Dezembro de 2023";
        mensagem =
          "<p>Aqui foi mágico. Tudo aconteceu perfeito na virada de ano, e assim começamos com o pé direito o nosso ano, também conhecido como 2024.";
        break;
      case "14/01":
        titulo = "14 de Janeiro de 2023";
        mensagem =
          "<p>Despedida do Jonathan. O dia que pude conhecer sua família, na qual me senti muuuito bem recebido. A melhor parte foi brincar com o little Ravi!";
        break;
      case "20/01":
        titulo = "20 de Janeiro de 2023";
        mensagem =
          "<section class='text-center'><p class='letra-vermelha'><strong>Este momento está sendo escrito agora...</strong></p></section>";
        break;
      case "final":
        titulo = "20 de Janeiro de 2023";
        mensagem =
          "<section class='text-center mt-5 mb-5'><p><strong>O dia em que ela disse<br><span class='letra2 letra-vermelha'>SIM</span></strong></p></section>";
        break;
    }

    mostraPopUp(true, titulo, mensagem);
    telaFinal = texto == "final" ? true : false;
  };
});

let telaFinal = false;

const mostraPopUp = (
  mostrar,
  titulo = "Título de testes",
  mensagem = "Mensagem de teste..."
) => {
  if (mostrar) {
    $(".pop-up").fadeIn(500);
    $(".pop-up h1").html(titulo);
    $(".pop-up div").html(mensagem);
    $(".container").css("opacity", "0.5");
  } else {
    $(".pop-up").fadeOut(500);
    $(".container").css("opacity", "1");

    if (telaFinal) {
      $("#tela19").fadeOut(4000);
      setTimeout(() => {
        $("#tela20").fadeIn(6500);
        $("body").attr("class", "fundo6");
        $("html, body").animate({ scrollTop: 0 }, "slow");
      }, 4000);
    }
  }
};
