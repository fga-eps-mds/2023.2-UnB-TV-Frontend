import { IVideo } from './video.model';

export class Catalog {
  journalism: Journalism = new Journalism();
  interviews: Interviews = new Interviews();
  researchAndScience: ResearchAndScience = new ResearchAndScience();
  artAndCulture: ArtAndCulture = new ArtAndCulture();
  specialSeries: SpecialSeries = new SpecialSeries();
  documentaries: Documentaries = new Documentaries();
  varieties: Varieties = new Varieties();
  unbtv: IVideo[] = [];
}

class Journalism {
  falaJovem: IVideo[] = [];
  informeUnB: IVideo[] = [];
  zapping: IVideo[] = [];
}

class Interviews {
  brasilEmQuestao: IVideo[] = [];
  dialogos: IVideo[] = [];
  tirandoDeLetra: IVideo[] = [];
  entrevistas: IVideo[] = [];
  vastoMundo: IVideo[] = [];
  vozesDiplomaticas: IVideo[] = [];
}

class ResearchAndScience {
  expliqueSuaTese: IVideo[] = [];
  fazendoCiencia: IVideo[] = [];
  radarDaExtencao: IVideo[] = [];
  seLigaNoPAS: IVideo[] = [];
  unbTvCiencia: IVideo[] = [];
  universidadeParaQue: IVideo[] = [];
}

class ArtAndCulture {
  emCantos: IVideo[] = [];
  casaDoSom: IVideo[] = [];
  esbocos: IVideo[] = [];
  exclusiva: IVideo[] = [];
}

class SpecialSeries {
  florestaDeGente: IVideo[] = [];
  guiaDoCalouro: IVideo[] = [];
  memoriasPauloFreire: IVideo[] = [];
  desafiosDasEleicoes: IVideo[] = [];
  vidaDeEstudante: IVideo[] = [];
  arquiteturaICC: IVideo[] = [];
}

class Documentaries {
  miniDoc: IVideo[] = [];
  documentaries: IVideo[] = [];
}

class Varieties {
  pitadasDoCerrado: IVideo[] = [];
}
