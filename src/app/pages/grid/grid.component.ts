import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface Schedule {
  time: string;
  activity: string;
}
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})

export class GridComponent {
  day: string = "";
  schedule: Schedule[] = [];
  constructor(private route: ActivatedRoute){

  }

  ngOnInit() {
    this.day = this.route.snapshot.params['day'];
    const grids: any = {
      "SEGUNDA": [
        {
          "horario": "08:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Programa de notícias da UnBTV."
        },
        {
          "horario": "08:40",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "09:00",
          "nome": "2022 - O BRASIL QUE QUEREMOS",
          "producao": "PARCERIA",
          "descricao": "Programa de entrevistas."
        },
        {
          "horario": "09:30",
          "nome": "PALESTRA UnB",
          "producao": "UnBTV",
          "descricao": "Íntegra de palestras e outros eventos da Universidade de Brasília."
        },
        {
          "horario": "11:00",
          "nome": "EXCLUSIVA",
          "producao": "UnBTV",
          "descricao": "Programa de entrevista com convidados especiais."
        },
        {
          "horario": "11:30",
          "nome": "UNIDIVERSIDADE",
          "producao": "PARCERIA",
          "descricao": "Programa sobre temas contemporâneos variados."
        },
        {
          "horario": "12:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Programa de notícias da UnBTV."
        },
        {
          "horario": "12:40",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "13:00",
          "nome": "2022 - O BRASIL QUE QUEREMOS",
          "producao": "PARCERIA",
          "descricao": "Programa de entrevistas."
        },
        {
          "horario": "13:30",
          "nome": "PALESTRA UnB",
          "producao": "UnBTV",
          "descricao": "Íntegra de palestras e outros eventos da Universidade de Brasília."
        },
        {
          "horario": "15:00",
          "nome": "EXCLUSIVA",
          "producao": "UnBTV",
          "descricao": "Programa de entrevista com convidados especiais."
        },
        {
          "horario": "15:30",
          "nome": "UNIDIVERSIDADE",
          "producao": "PARCERIA",
          "descricao": "Programa sobre temas contemporâneos variados."
        },
        {
          "horario": "16:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Programa de notícias da UnBTV."
        },
        {
          "horario": "16:40",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "17:00",
          "nome": "TIRANDO DE LETRA",
          "producao": "UnBTV",
          "descricao": "Programa de entrevistas sobre a vida e obra de autores contemporâneos."
        },
        {
          "horario": "17:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "18:00",
          "nome": "IFB NO AR",
          "producao": "PARCERIA",
          "descricao": "Programa do Instituto Federal de Brasília que aborda diversos temas sob a ótica da educação profissional, científica e tecnológica."
        },
        {
          "horario": "18:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "19:00",
          "nome": "MÚSICA",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Clipes e produções musicais diversas."
        },
        {
          "horario": "20:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Programa de notícias da UnBTV."
        },
        {
          "horario": "20:40",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "21:00",
          "nome": "DIÁLOGOS",
          "producao": "UnBTV",
          "descricao": "Dois especialistas conversam sobre tema de interesse público."
        },
        {
          "horario": "21:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "22:00",
          "nome": "CINE GERAÇÕES",
          "producao": "PARCERIA",
          "descricao": "Filmes clássicos brasileiros e internacionais"
        },
        {
          "horario": "23:45",
          "nome": "FEIRA DE OPINIÃO",
          "producao": "PARCERIA",
          "descricao": "Programa do Instituto Boal"
        },
        {
          "horario": "00:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Programa de notícias da UnBTV."
        },
        {
          "horario": "",
          "nome": "",
          "producao": "",
          "descricao": ""
        }
      ],
      "TERÇA": [
        {
          "horario": "08:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Programa de notícias da UnBTV."
        },
        {
          "horario": "08:40",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "09:00",
          "nome": "ESBOÇOS",
          "producao": "UnBTV",
          "descricao": "Programa voltado para a divulgação do trabalho de artistas locais e nacionais."
        },
        {
          "horario": "09:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "10:00",
          "nome": "UnBTV ENTREVISTA",
          "producao": "UnBTV",
          "descricao": "Entrevistas feitas pela UnBTV."
        },
        {
          "horario": "10:30",
          "nome": "VASTO MUNDO",
          "producao": "UnBTV",
          "descricao": "Programa de entrevistas sobre questões da geopolítica internacional."
        },
        {
          "horario": "11:00",
          "nome": "NOSSO QUADRADINHO",
          "producao": "PARCERIA",
          "descricao": "Programa de entretenimento da TV Câmara Distrital."
        },
        {
          "horario": "12:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Programa de notícias da UnBTV."
        },
        {
          "horario": "12:40",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "13:00",
          "nome": "ESBOÇOS",
          "producao": "UnBTV",
          "descricao": "Programa voltado para a divulgação do trabalho de artistas locais e nacionais."
        },
        {
          "horario": "13:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "14:00",
          "nome": "UnBTV ENTREVISTA",
          "producao": "UnBTV",
          "descricao": "Entrevistas feitas pela UnBTV"
        },
        {
          "horario": "14:30",
          "nome": "VASTO MUNDO",
          "producao": "UnBTV",
          "descricao": "Programa de entrevistas sobre questões da geopolítica internacional."
        },
        {
          "horario": "15:00",
          "nome": "NOSSO QUADRADINHO",
          "producao": "PARCERIA",
          "descricao": "Programa de entretenimento da TV Câmara Distrital."
        },
        {
          "horario": "16:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Programa de notícias da UnBTV."
        },
        {
          "horario": "16:40",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "17:00",
          "nome": "MINI RECITAIS",
          "producao": "UnBTV",
          "descricao": "Programa de música."
        },
        {
          "horario": "17:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "18:00",
          "nome": "2022 - O BRASIL QUE QUEREMOS",
          "producao": "PARCERIA",
          "descricao": "Programa de entrevistas."
        },
        {
          "horario": "18:30",
          "nome": "CULTURANDO",
          "producao": "PARCERIA",
          "descricao": "PRODAV."
        },
        {
          "horario": "19:00",
          "nome": "GIRO DISTRITAL",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Programa jornalístico da TV Câmara Distrital."
        },
        {
          "horario": "19:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "20:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Programa de notícias da UnBTV."
        },
        {
          "horario": "20:40",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "21:00",
          "nome": "TIRANDO DE LETRA",
          "producao": "UnBTV",
          "descricao": "Programa de entrevistas sobre a vida e obra de autores contemporâneos."
        },
        {
          "horario": "21:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "22:00",
          "nome": "BRASIL EM QUESTÃO",
          "producao": "UnBTV",
          "descricao": "Programa de entrevistas da UnBTV sobre a conjuntura social e política."
        },
        {
          "horario": "22:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "23:00",
          "nome": "MÚSICA",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Clipes e produções musicais diversas."
        },
        {
          "horario": "23:30",
          "nome": "JANELA DAS ARTES",
          "producao": "IdA/UnB",
          "descricao": "Programa do Instituto de Artes da UnB."
        },
        {
          "horario": "00:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Programa de notícias."
        },
        {
          "horario": "",
          "nome": "",
          "producao": "",
          "descricao": ""
        }
      ],
      "QUARTA": [
        {
          "horario": "08:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Programa de notícias da UnBTV."
        },
        {
          "horario": "08:40",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "09:00",
          "nome": "TIRANDO DE LETRA",
          "producao": "UnBTV",
          "descricao": "Programa de entrevistas sobre a vida e obra de autores contemporâneos."
        },
        {
          "horario": "09:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "10:00",
          "nome": "VOZES DIPLOMÁTICAS",
          "producao": "UnBTV",
          "descricao": "Conversa com embaixadores e representantes de instituições internacionais."
        },
        {
          "horario": "10:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "11:00",
          "nome": "2022 - O BRASIL QUE QUEREMOS",
          "producao": "PARCERIA",
          "descricao": "Programa de entrevistas."
        },
        {
          "horario": "12:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Programa de notícias da UnBTV."
        },
        {
          "horario": "12:40",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "13:00",
          "nome": "TIRANDO DE LETRA",
          "producao": "UnBTV",
          "descricao": "Programa de entrevistas sobre a vida e obra de autores contemporâneos."
        },
        {
          "horario": "13:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "14:00",
          "nome": "VOZES DIPLOMÁTICAS",
          "producao": "UnBTV",
          "descricao": "Conversa com embaixadores e representantes de instituições internacionais."
        },
        {
          "horario": "14:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "15:00",
          "nome": "2022 - O BRASIL QUE QUEREMOS",
          "producao": "PARCERIA",
          "descricao": "Programa de entrevistas."
        },
        {
          "horario": "16:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Programa de notícias da UnBTV."
        },
        {
          "horario": "16:40",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "17:00",
          "nome": "EXPLIQUE SUA TESE",
          "producao": "UnBTV",
          "descricao": "Espaço para apresentação dos resultados de teses e pesquisas acadêmicas."
        },
        {
          "horario": "17:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "18:00",
          "nome": "PAPO NA LAJE",
          "producao": "PARCERIA",
          "descricao": "Programa de entrevistas produzido pelo Brasil de Fato e por jovens da periferia do Rio de Janeiro"
        },
        {
          "horario": "19:00",
          "nome": "GOVERNANÇA E GESTÃO PÚBLICAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": ""
        },
        {
          "horario": "20:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Programa de notícias da UnBTV."
        },
        {
          "horario": "20:40",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "21:00",
          "nome": "UNIVERSIDADE PARA QUÊ?",
          "producao": "UnBTV",
          "descricao": "Programa produzido em parceria entre a UnBTV e a Faculdade UnB Planaltina sobre os papéis da universidade pública."
        },
        {
          "horario": "21:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "22:00",
          "nome": "QUARTA CINE CANDANGO",
          "producao": "UnBTV",
          "descricao": "\nMostra de filmes de realizadores de Brasília.\n"
        },
        {
          "horario": "22:30",
          "nome": "MÚSICA",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Clipes e produções musicais diversas."
        },
        {
          "horario": "00:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Encerramento da programação do dia."
        },
        {
          "horario": "",
          "nome": "",
          "producao": "",
          "descricao": ""
        }
      ],
      "QUINTA": [
        {
          "horario": "08:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Programa de notícias da UnBTV."
        },
        {
          "horario": "08:40",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "09:00",
          "nome": "DIÁLOGOS",
          "producao": "UnBTV",
          "descricao": "\nDois especialistas conversam sobre tema de interesse público.\n"
        },
        {
          "horario": "09:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "10:00",
          "nome": "EXCLUSIVA",
          "producao": "UnBTV",
          "descricao": "Programa de entrevista com convidados especiais."
        },
        {
          "horario": "10:30",
          "nome": "ALÉM DO LIXO",
          "producao": "PARCERIA",
          "descricao": "\nSérie documental produzida pela TV Unesp.\n"
        },
        {
          "horario": "11:00",
          "nome": "VISCERAL BRASIL",
          "producao": "PARCERIA",
          "descricao": "PRODAV."
        },
        {
          "horario": "11:30",
          "nome": "CANAL SAÚDE",
          "producao": "PARCERIA",
          "descricao": "\nPrograma da Fiocruz.\n"
        },
        {
          "horario": "12:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Programa de notícias da UnBTV."
        },
        {
          "horario": "12:40",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "13:00",
          "nome": "UnBTV ENTREVISTA",
          "producao": "UnBTV",
          "descricao": "Entrevistas feitas pela UnBTV."
        },
        {
          "horario": "13:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "14:00",
          "nome": "EXCLUSIVA",
          "producao": "UnBTV",
          "descricao": "Programa de entrevista com convidados especiais."
        },
        {
          "horario": "14:30",
          "nome": "ALÉM DO LIXO",
          "producao": "PARCERIA",
          "descricao": "\nSérie documental produzida pela TV Unesp.\n"
        },
        {
          "horario": "15:00",
          "nome": "VISCERAL BRASIL",
          "producao": "PARCERIA",
          "descricao": "PRODAV."
        },
        {
          "horario": "15:30",
          "nome": "CANAL SAÚDE",
          "producao": "PARCERIA",
          "descricao": "Programa da Fiocruz."
        },
        {
          "horario": "16:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Programa de notícias da UnBTV."
        },
        {
          "horario": "16:40",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "17:00",
          "nome": "CASA DO SOM",
          "producao": "UnBTV",
          "descricao": "Bate-papo descontraído e performances musicais dos mais variados estilos."
        },
        {
          "horario": "17:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "18:00",
          "nome": "TIRANDO DE LETRA",
          "producao": "UnBTV",
          "descricao": "Programa de entrevistas sobre a vida e obra de autores contemporâneos."
        },
        {
          "horario": "18:30",
          "nome": "CULTURANDO",
          "producao": "PARCERIA",
          "descricao": "PRODAV."
        },
        {
          "horario": "19:00",
          "nome": "DOCUMENTÁRIO",
          "producao": "UnBTV",
          "descricao": "Documentários e miniproduções, da emissora ou de parceiros."
        },
        {
          "horario": "19:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "20:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Programa de notícias da UnBTV."
        },
        {
          "horario": "20:40",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "21:00",
          "nome": "EXPLIQUE SUA TESE",
          "producao": "UnBTV",
          "descricao": "Espaço para apresentação dos resultados de teses e pesquisas acadêmicas."
        },
        {
          "horario": "21:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "22:00",
          "nome": "ESBOÇOS",
          "producao": "UnBTV",
          "descricao": "Programa voltado para a divulgação do trabalho de artistas locais e nacionais."
        },
        {
          "horario": "22:30",
          "nome": "JANELA EXPERIMENTAL",
          "producao": "UnBTV",
          "descricao": "Produções experimentais da UnBTV."
        },
        {
          "horario": "23:00",
          "nome": "MÚSICA",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Clipes e produções musicais diversas."
        },
        {
          "horario": "00:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Programa de notícias da UnBTV."
        },
        {
          "horario": "",
          "nome": "",
          "producao": "",
          "descricao": ""
        }
      ],
      "SEXTA": [
        {
          "horario": "08:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Programa de notícias da UnBTV."
        },
        {
          "horario": "08:40",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "09:00",
          "nome": "EXCLUSIVA",
          "producao": "UnBTV",
          "descricao": "Programa de entrevista com convidados especiais."
        },
        {
          "horario": "09:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "10:00",
          "nome": "MÚSICA",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Clipes e produções musicais diversas."
        },
        {
          "horario": "10:30",
          "nome": "BEM VIVER",
          "producao": "PARCERIA",
          "descricao": "Programa do Brasil de Fato sobre alimentação saudável, agroecologia, cultura, meio ambiente e muito mais."
        },
        {
          "horario": "11:00",
          "nome": "DIÁLOGOS",
          "producao": "UnBTV",
          "descricao": "Dois especialistas conversam sobre tema de interesse público."
        },
        {
          "horario": "11:30",
          "nome": "IFB NO AR",
          "producao": "PARCERIA",
          "descricao": "Programa do Instituto Federal de Brasília que aborda diversas questões sob a ótica da educação profissional, científica e tecnológica."
        },
        {
          "horario": "12:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Programa de notícias da UnBTV."
        },
        {
          "horario": "12:40",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "13:00",
          "nome": "EXCLUSIVA",
          "producao": "UnBTV",
          "descricao": "Programa de entrevista com convidados especiais."
        },
        {
          "horario": "13:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "14:00",
          "nome": "MÚSICA",
          "producao": "UnBTV",
          "descricao": "Clipes e produções musicais diversas."
        },
        {
          "horario": "14:30",
          "nome": "BEM VIVER",
          "producao": "PARCERIA",
          "descricao": "Programa do Brasil de Fato sobre alimentação saudável, agroecologia, cultura, meio ambiente e muito mais."
        },
        {
          "horario": "15:00",
          "nome": "DIÁLOGOS",
          "producao": "UnBTV",
          "descricao": "Dois especialistas conversam sobre tema de interesse público."
        },
        {
          "horario": "15:30",
          "nome": "CANAL SAÚDE",
          "producao": "PARCERIA",
          "descricao": "Programa da Fiocruz."
        },
        {
          "horario": "16:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Programa de notícias da UnBTV."
        },
        {
          "horario": "16:40",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "17:00",
          "nome": "BRASIL EM QUESTÃO",
          "producao": "UnBTV",
          "descricao": "\nPrograma de entrevistas da UnBTV sobre a conjuntura social e política.\n"
        },
        {
          "horario": "17:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "18:00",
          "nome": "LANTERNINHA",
          "producao": "UnBTV",
          "descricao": "Documentários e miniproduções, da emissora ou de parceiros."
        },
        {
          "horario": "19:00",
          "nome": "MÚSICA",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Clipes e produções musicais diversas."
        },
        {
          "horario": "19:30",
          "nome": "UnBTV ENTREVISTA",
          "producao": "UnBTV",
          "descricao": "Entrevistas feitas pela UnBTV."
        },
        {
          "horario": "20:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Programa de notícias da UnBTV."
        },
        {
          "horario": "20:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "21:00",
          "nome": "VASTO MUNDO",
          "producao": "UnBTV",
          "descricao": "Programa de entrevistas sobre questões da geopolítica internacional."
        },
        {
          "horario": "21:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "22:00",
          "nome": "PALESTRA UnB",
          "producao": "UnBTV",
          "descricao": "Íntegra de palestras e outros eventos realizados na Universidade de Brasilia"
        },
        {
          "horario": "23:00",
          "nome": "MÚSICA",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Clipes e produções musicais diversas."
        },
        {
          "horario": "",
          "nome": "",
          "producao": "",
          "descricao": ""
        }
      ],
      "SÁBADO": [
        {
          "horario": "00:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Programa de notícias da UnBTV."
        },
        {
          "horario": "00:40",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "01:00",
          "nome": "DIÁLOGOS",
          "producao": "UnBTV",
          "descricao": "Dois especialistas conversam sobre tema de interesse público."
        },
        {
          "horario": "01:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV."
        },
        {
          "horario": "02:00",
          "nome": "EXCLUSIVA",
          "producao": "UnBTV",
          "descricao": "Programa de entrevista com convidados especiais."
        },
        {
          "horario": "02:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "03:00",
          "nome": "VISCERAL BRASIL",
          "producao": "PARCERIA",
          "descricao": "PRODAV."
        },
        {
          "horario": "03:30",
          "nome": "CANAL SAÚDE",
          "producao": "PARCERIA",
          "descricao": "Programa da Fiocruz."
        },
        {
          "horario": "04:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Programa de notícias da UnBTV."
        },
        {
          "horario": "04:40",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "05:00",
          "nome": "CASA DO SOM",
          "producao": "UnBTV",
          "descricao": "Bate-papo descontraído e performances musicais dos mais variados estilos."
        },
        {
          "horario": "05:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "06:00",
          "nome": "TIRANDO DE LETRA",
          "producao": "UnBTV",
          "descricao": "Programa de entrevistas sobre a vida e obra de autores contemporâneos."
        },
        {
          "horario": "06:30",
          "nome": "CULTURANDO",
          "producao": "PARCERIA",
          "descricao": "PRODAV."
        },
        {
          "horario": "07:00",
          "nome": "DOCUMENTÁRIO",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Documentários e miniproduções, da emissora ou de parceiros."
        },
        {
          "horario": "07:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "08:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Programa de notícias da UnBTV."
        },
        {
          "horario": "08:40",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "09:00",
          "nome": "EXPLIQUE SUA TESE",
          "producao": "UnBTV",
          "descricao": "Espaço para apresentação dos resultados de teses e pesquisas acadêmicas."
        },
        {
          "horario": "09:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "10:00",
          "nome": "ESBOÇOS",
          "producao": "UnBTV",
          "descricao": "Programa voltado para a divulgação do trabalho de artistas locais e nacionais."
        },
        {
          "horario": "10:30",
          "nome": "NOSSO QUADRADINHO",
          "producao": "PARCERIA",
          "descricao": "Programa de entretenimento da TV Câmara Distrital."
        },
        {
          "horario": "12:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Programa de notícias da UnBTV."
        },
        {
          "horario": "12:29",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "13:00",
          "nome": "EXCLUSIVA",
          "producao": "UnBTV",
          "descricao": "Programa de entrevista com convidados especiais."
        },
        {
          "horario": "13:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "14:00",
          "nome": "MÚSICA",
          "producao": "UnBTV",
          "descricao": "Clipes e produções musicais diversas."
        },
        {
          "horario": "14:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "15:00",
          "nome": "DIÁLOGOS",
          "producao": "UnBTV",
          "descricao": "Dois especialistas conversam sobre tema de interesse público."
        },
        {
          "horario": "15:30",
          "nome": "IFB NO AR",
          "producao": "PARCERIA",
          "descricao": "Programa do Instituto Federal de Brasília que aborda diversas questões sob a ótica da educação profissional, científica e tecnológica."
        },
        {
          "horario": "16:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Programa de notícias da UnBTV."
        },
        {
          "horario": "16:40",
          "nome": "INTERPROGRAMAS",
          "producao": "",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "17:00",
          "nome": "BRASIL EM QUESTÃO",
          "producao": "UnBTV",
          "descricao": "\nPrograma de entrevistas da UnBTV sobre a conjuntura social e política.\n"
        },
        {
          "horario": "17:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "18:00",
          "nome": "LANTERNINHA",
          "producao": "UnBTV",
          "descricao": "Documentários e miniproduções, da emissora ou de parceiros."
        },
        {
          "horario": "19:00",
          "nome": "MÚSICA",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Clipes e produções musicais diversas."
        },
        {
          "horario": "19:30",
          "nome": "UnBTV ENTREVISTA",
          "producao": "UnBTV",
          "descricao": "Entrevistas feitas pela UnBTV."
        },
        {
          "horario": "20:00",
          "nome": "ZAPPING",
          "producao": "UnBTV",
          "descricao": "Programa de notícias da UnBTV."
        },
        {
          "horario": "20:40",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "21:00",
          "nome": "VASTO MUNDO",
          "producao": "UnBTV",
          "descricao": "Programa de entrevistas sobre questões da geopolítica internacional."
        },
        {
          "horario": "21:30",
          "nome": "INTERPROGRAMAS",
          "producao": "UnBTV/ PARCERIA",
          "descricao": "Pequenas produções da UnBTV e externas."
        },
        {
          "horario": "22:00",
          "nome": "PALESTRA UnB",
          "producao": "UnBTV",
          "descricao": "Íntegra de palestras e outros eventos realizados na Universidade de Brasília."
        },
        {
          "horario": "23:00",
          "nome": "MÚSICA",
          "producao": "UnBTV/PARCERIA",
          "descricao": "Clipes e produções musicais diversas."
        },
        {
          "horario": "",
          "nome": "",
          "producao": "",
          "descricao": ""
        }
      ]
    }
    this.schedule = grids[this.day.toUpperCase()].map((program: any) => {
      
      return {time: program.horario, activity: program.nome}
  })
} 
}