import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VideoComponent } from './video.component';
import { VideoService } from '../../services/video.service';
import { of, throwError } from 'rxjs';
import { IVideo } from 'src/shared/model/video.model';

const mockData = {
  qtTotal: 110,
  videoList: [
    {
      id: 142471,
      title: 'Sala de Reunião 04 do NTE',
      description: 'Sala de Reunião 04 do NTE',
      keywords: 'Sala de Reunião 04 do NTE',
      visibility: 'PUBLIC',
      duration: 561835,
      generateLibras: true,
      generateSubtitle: true,
      qtAccess: 41,
      qtLikes: 0,
      images: [
        {
          type: 'DEFAULT',
          href: 'https://eduplay.rnp.br/portal/assets/videos/images/1630091029232.png',
        },
      ],
      userOwner: {
        id: 30684,
        name: 'Fabio Ferreira de Oliveira',
      },
    },
    {
      id: 180741,
      title: 'Mulheres que inspiram - Profa. Carla Rocha',
      description:
        '<p>Entrevista com a Professora Carla Rocha (UnB) como parte do projeto Mulheres que Inspiram. Adeia surgiu através da leitura do texto Eu programo, tu programas, elx hackea: mulheres hackers e perspectivas tecnopolíticas e do interesse em dar visibilidade a mulheres que atuam na área de software livre e educação aberta. Transcrição do áudio disponível..em https://pt.wikiversity.org/wiki/Educa%C3%A7%C3%A3o_Aberta/Mulheres_que_inspiram</p><p><br /></p><p>Disponível com uma licença CC-BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/).</p>',
      keywords:
        'mulheres, computação, professora, ciência da computação, gênero',
      visibility: 'PUBLIC',
      duration: 508459,
      generateLibras: true,
      generateSubtitle: true,
      qtAccess: 36,
      qtLikes: 0,
      images: [
        {
          type: 'DEFAULT',
          href: 'https://eduplay.rnp.br/portal/assets/videos/images/1679168690066.jpg',
        },
      ],
      userOwner: {
        id: 44590,
        name: 'Tel Amiel',
        avatar:
          'https://eduplay.rnp.br/portal/assets/users/images/1683107832084.jpg',
      },
    },
    {
      id: 184760,
      title:
        'Dia 4: Minicurso de Extensão - UnB - Racontez-nous votre histoire',
      keywords: 'mconf',
      visibility: 'PUBLIC',
      duration: 5161003,
      generateLibras: true,
      generateSubtitle: true,
      qtAccess: 24,
      qtLikes: 0,
      images: [
        {
          type: 'DEFAULT',
          href: 'https://eduplay.rnp.br/portal/assets/videos/images/1687455434581.png',
        },
      ],
      userOwner: {
        id: 45799,
        name: 'Denise Gisele de Britto Damasco',
      },
    },
    {
      id: 184518,
      title: 'Dia 1: Minicurso de Extensão - UnB - Présentation Denise Damasco',
      keywords: 'mconf',
      visibility: 'PUBLIC',
      duration: 3532366,
      generateLibras: true,
      generateSubtitle: true,
      qtAccess: 24,
      qtLikes: 0,
      images: [
        {
          type: 'DEFAULT',
          href: 'https://eduplay.rnp.br/portal/assets/videos/images/1686872273578.png',
        },
      ],
      userOwner: {
        id: 45799,
        name: 'Denise Gisele de Britto Damasco',
      },
    },
    {
      id: 111840,
      title: 'Aulas Síncronas ás 14 horas as terças-feiras e quintas-feiras',
      description:
        'Aulas Síncronas ás 14 horas as terças-feiras e quintas-feiras',
      keywords: 'Aulas Síncronas ás 14 horas as terças-feiras e quintas-feiras',
      visibility: 'PUBLIC',
      duration: 6111573,
      generateLibras: true,
      generateSubtitle: true,
      qtAccess: 38,
      qtLikes: 0,
      images: [
        {
          type: 'DEFAULT',
          href: 'https://eduplay.rnp.br/portal/assets/videos/images/1621608406505.png',
        },
      ],
      userOwner: {
        id: 28703,
        name: 'Jorlandio Francisco Felix',
      },
    },
    {
      id: 141981,
      title: 'Liliane Campos Machado',
      description: 'Liliane Campos Machado',
      keywords: 'Liliane Campos Machado',
      visibility: 'PUBLIC',
      duration: 6482260,
      generateLibras: true,
      generateSubtitle: true,
      qtAccess: 162,
      qtLikes: 0,
      images: [
        {
          type: 'DEFAULT',
          href: 'https://eduplay.rnp.br/portal/assets/videos/images/1629828306049.png',
        },
      ],
      userOwner: {
        id: 29754,
        name: 'Liliane Campos Machado',
      },
    },
    {
      id: 111535,
      title: 'NTE videoconferências',
      description: 'NTE videoconferências',
      keywords: 'NTE videoconferências',
      visibility: 'PUBLIC',
      duration: 7508000,
      generateLibras: true,
      generateSubtitle: true,
      qtAccess: 73,
      qtLikes: 0,
      images: [
        {
          type: 'DEFAULT',
          href: 'https://eduplay.rnp.br/portal/assets/videos/images/1621383436732.png',
        },
      ],
      userOwner: {
        id: 19994,
        name: 'Endryl Francelino de Souza',
      },
    },
    {
      id: 184759,
      title:
        'Dia 3: Minicurso de Extensão - UnB - Racontez-nous votre histoire',
      keywords: 'mconf',
      visibility: 'PUBLIC',
      duration: 5175560,
      generateLibras: true,
      generateSubtitle: true,
      qtAccess: 24,
      qtLikes: 0,
      images: [
        {
          type: 'DEFAULT',
          href: 'https://eduplay.rnp.br/portal/assets/videos/images/1687454416354.png',
        },
      ],
      userOwner: {
        id: 45799,
        name: 'Denise Gisele de Britto Damasco',
      },
    },
    {
      id: 179217,
      title: 'Patricia Tuxi dos Santos',
      description: 'Patricia Tuxi dos Santos',
      keywords: 'Patricia Tuxi dos Santos',
      visibility: 'PUBLIC',
      duration: 109163,
      generateLibras: true,
      generateSubtitle: true,
      qtAccess: 42,
      qtLikes: 0,
      images: [
        {
          type: 'DEFAULT',
          href: 'https://eduplay.rnp.br/portal/assets/videos/images/1675876887636.png',
        },
      ],
      userOwner: {
        id: 44725,
        name: 'Patricia Tuxi dos Santos',
      },
    },
    {
      id: 142458,
      title: 'Sala de Reunião 04 do NTE',
      description: 'Sala de Reunião 04 do NTE',
      keywords: 'Sala de Reunião 04 do NTE',
      visibility: 'PUBLIC',
      duration: 2750269,
      generateLibras: true,
      generateSubtitle: true,
      qtAccess: 75,
      qtLikes: 0,
      images: [
        {
          type: 'DEFAULT',
          href: 'https://eduplay.rnp.br/portal/assets/videos/images/1630088527294.png',
        },
      ],
      userOwner: {
        id: 30684,
        name: 'Fabio Ferreira de Oliveira',
      },
    },
  ],
};

class VideoServiceMock {
  constructor() {}
  findAll() {
    return of(mockData);
  }
}

describe('VideoComponent', () => {
  let component: VideoComponent;
  let fixture: ComponentFixture<VideoComponent>;
  let videoService: VideoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: VideoService, useValue: new VideoServiceMock() }],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoComponent);
    component = fixture.componentInstance;
    videoService = TestBed.inject(VideoService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoud call findAll', () => {
    spyOn(component, 'findAll');
    fixture.detectChanges();
    expect(component.findAll).toHaveBeenCalled();
  });

  it('should call findAll and return a list of videos', () => {
    const mySpy = spyOn(videoService, 'findAll').and.callThrough();
    component.findAll();
    expect(mySpy).toHaveBeenCalled();
  });

  it('should call findAll and return an error', () => {
    const mySpy = spyOn(videoService, 'findAll').and.returnValue(
      throwError(() => new Error('Erro'))
    );
    component.findAll();
    expect(mySpy).toHaveBeenCalled();
  });

  it('should filter videos by channel', () => {
    const videos: IVideo[] = [
      {
        id: 192504,
        title: 'Exclusiva | Banda Aparte',
        description:
          '<p><br /></p><p>No Exclusiva, recebemos a banda brasiliense Aparte. Eles falaram sobra a sua criação, sobre os desafios de ser uma banda independente e trouxeram algumas lembranças da época da faculdade. Confira!</p><p><br /></p><p><br /></p>',
        keywords: 'Entrevista; Exclusiva;  Banda Aparte; UnB; UnBTV;',
        visibility: 'PUBLIC',
        duration: 1009627,
        embed:
          '<iframe width="671" height="377" src="https://eduplay.rnp.br/portal/video/embed/192504" frameborder="0" scrolling="no" allowfullscreen></iframe>',
        generateLibras: true,
        generateSubtitle: true,
        qtAccess: 4,
        qtLikes: 0,
        images: [
          {
            type: 'DEFAULT',
            href: 'https://eduplay.rnp.br/portal/assets/videos/images/1702032708404.jpg',
          },
        ],
        channels: [
          {
            id: 190265,
            name: 'UnBTV',
          },
        ],
      },
      {
        id: 191441,
        title:
          'Cálculo 1 - Definição de Integral | Integrais Def. e Indef. | T.F.C | Regra da Potência e da Soma',
        description: '<p><br /></p>',
        keywords: 'mconf',
        visibility: 'PUBLIC',
        duration: 4719080,
        embed:
          '<iframe width="671" height="377" src="https://eduplay.rnp.br/portal/video/embed/191441" frameborder="0" scrolling="no" allowfullscreen></iframe>',
        generateLibras: true,
        generateSubtitle: true,
        qtAccess: 25,
        qtLikes: 1,
        images: [
          {
            type: 'DEFAULT',
            href: 'https://eduplay.rnp.br/portal/assets/videos/images/1700532539037.png',
          },
        ],
        channels: [
          {
            id: 191486,
            name: 'Minicurso de Integrais - Universidade de Brasília',
          },
        ],
      },
    ];

    const filteredVideosByChannel: IVideo[] = [
      {
        id: 192504,
        title: 'Exclusiva | Banda Aparte',
        description:
          '<p><br /></p><p>No Exclusiva, recebemos a banda brasiliense Aparte. Eles falaram sobra a sua criação, sobre os desafios de ser uma banda independente e trouxeram algumas lembranças da época da faculdade. Confira!</p><p><br /></p><p><br /></p>',
        keywords: 'Entrevista; Exclusiva;  Banda Aparte; UnB; UnBTV;',
        visibility: 'PUBLIC',
        duration: 1009627,
        embed:
          '<iframe width="671" height="377" src="https://eduplay.rnp.br/portal/video/embed/192504" frameborder="0" scrolling="no" allowfullscreen></iframe>',
        generateLibras: true,
        generateSubtitle: true,
        qtAccess: 4,
        qtLikes: 0,
        images: [
          {
            type: 'DEFAULT',
            href: 'https://eduplay.rnp.br/portal/assets/videos/images/1702032708404.jpg',
          },
        ],
        channels: [
          {
            id: 190265,
            name: 'UnBTV',
          },
        ],
      },
    ];
    component.filterVideosByChannel(videos);
    expect(component.unbTvVideos).toEqual(filteredVideosByChannel);
  });

  it('should organize videos into categories', () => {
    const videos: IVideo[] = [
      {
        id: 1,
        title: 'Fala, Jovem Video',
        keywords: 'fala, jovem',
        channels: [{ id: 190265, name: 'UnBTV' }],
      },
      {
        id: 2,
        title: 'Informe UnB Video',
        keywords: 'informe unb',
        channels: [{ id: 190265, name: 'UnBTV' }],
      },
      {
        id: 3,
        title: 'Zapping Video',
        keywords: 'zapping',
        channels: [{ id: 190265, name: 'UnBTV' }],
      },
      {
        id: 4,
        title: 'Brasil em Questão Video',
        keywords: 'brasil em questão',
        channels: [{ id: 190265, name: 'UnBTV' }],
      },
      {
        id: 5,
        title: 'Diálogos Video',
        keywords: 'diálogos',
        channels: [{ id: 190265, name: 'UnBTV' }],
      },
      {
        id: 6,
        title: 'Tirando de Letra Video',
        keywords: 'tirando de letra',
        channels: [{ id: 190265, name: 'UnBTV' }],
      },
      {
        id: 7,
        title: 'Entrevista Video',
        keywords: 'entrevista',
        channels: [{ id: 1, name: 'UnBTV' }],
      },
      {
        id: 8,
        title: 'Vasto mundo Video',
        keywords: 'vasto mundo',
        channels: [{ id: 1, name: 'UnBTV' }],
      },
      {
        id: 9,
        title: 'Vozes Diplomáticas Video',
        keywords: 'vozes diplomáticas',
        channels: [{ id: 190265, name: 'UnBTV' }],
      },
      {
        id: 10,
        title: 'Explique sua Tese Video',
        keywords: 'explique sua tese',
        channels: [{ id: 190265, name: 'UnBTV' }],
      },
      {
        id: 11,
        title: 'Fazendo Ciência Video',
        keywords: 'fazendo ciência',
        channels: [{ id: 190265, name: 'UnBTV' }],
      },
      {
        id: 12,
        title: 'Radar da Extensão Video',
        keywords: 'radar da extensão',
        channels: [{ id: 190265, name: 'UnBTV' }],
      },
      {
        id: 13,
        title: 'se liga no pas Video',
        keywords: 'se liga no pas',
        channels: [{ id: 190265, name: 'UnBTV' }],
      },
      {
        id: 14,
        title: 'UnbTV Ciência Video',
        keywords: 'unbtv ciência',
        channels: [{ id: 190265, name: 'UnBTV' }],
      },
      {
        id: 15,
        title: 'Universidade para quê? Video',
        keywords: 'universidade para quê?',
        channels: [{ id: 190265, name: 'UnBTV' }],
      },
      {
        id: 16,
        title: '[Em]Cantos Video',
        keywords: '[em]cantos',
        channels: [{ id: 190265, name: 'UnBTV' }],
      },
      {
        id: 17,
        title: 'Casa do Som Video',
        keywords: 'casa do som',
        channels: [{ id: 190265, name: 'UnBTV' }],
      },
      {
        id: 18,
        title: 'Esboços Video',
        keywords: 'esboços',
        channels: [{ id: 190265, name: 'UnBTV' }],
      },
      {
        id: 18,
        title: 'Exclusiva Video',
        keywords: 'exclusiva',
        channels: [{ id: 190265, name: 'UnBTV' }],
      },
      {
        id: 19,
        title: 'floresta de gente Video',
        keywords: 'floresta de gente',
        channels: [{ id: 190265, name: 'UnBTV' }],
      },
      {
        id: 20,
        title: 'guia do calouro Video',
        keywords: 'guia do calouro',
        channels: [{ id: 190265, name: 'UnBTV' }],
      },
      {
        id: 21,
        title: 'Memórias sobre Paulo Freire Video',
        keywords: 'memórias sobre paulo freire',
        channels: [{ id: 190265, name: 'UnBTV' }],
      },
      {
        id: 22,
        title: 'Desafios das Eleições Video',
        keywords: 'desafios das eleições',
        channels: [{ id: 190265, name: 'UnBTV' }],
      },
      {
        id: 23,
        title: 'vida de estudante Video',
        keywords: 'vida de estudante',
        channels: [{ id: 190265, name: 'UnBTV' }],
      },
      {
        id: 24,
        title: 'Sobre Arquitetura Video',
        keywords: 'arquitetura',
        channels: [{ id: 190265, name: 'UnBTV' }],
      },
      {
        id: 25,
        title: 'Mini Doc Video',
        keywords: 'mini doc',
        channels: [{ id: 190265, name: 'UnBTV' }],
      },
      {
        id: 26,
        title: 'Documentário sobre testes Video',
        keywords: 'documentário',
        channels: [{ id: 190265, name: 'UnBTV' }],
      },
      {
        id: 27,
        title: 'Pitadas do cerrado Video',
        keywords: 'pitadas do cerrado',
        channels: [{ id: 190265, name: 'UnBTV' }],
      },
      {
        id: 50,
        title: 'Sem keywords',
        keywords: 'sem keywords',
        channels: [{ id: 190265, name: 'UnBTV' }],
      },
    ];

    component.videosCatalog(videos);

    expect(component.catalog.journalism.falaJovem.length).toBeGreaterThan(0);
    expect(component.catalog.journalism.informeUnB.length).toBeGreaterThan(0);
    expect(component.catalog.journalism.zapping.length).toBeGreaterThan(0);
    expect(component.catalog.interviews.brasilEmQuestao.length).toBeGreaterThan(
      0
    );
    expect(component.catalog.interviews.dialogos.length).toBeGreaterThan(0);
    expect(component.catalog.interviews.tirandoDeLetra.length).toBeGreaterThan(
      0
    );
    expect(component.catalog.interviews.entrevistas.length).toBeGreaterThan(0);
    expect(component.catalog.interviews.vastoMundo.length).toBeGreaterThan(0);
    expect(
      component.catalog.interviews.vozesDiplomaticas.length
    ).toBeGreaterThan(0);
    expect(
      component.catalog.researchAndScience.expliqueSuaTese.length
    ).toBeGreaterThan(0);
    expect(
      component.catalog.researchAndScience.fazendoCiencia.length
    ).toBeGreaterThan(0);
    expect(
      component.catalog.researchAndScience.fazendoCiencia.length
    ).toBeGreaterThan(0);
    expect(
      component.catalog.researchAndScience.radarDaExtencao.length
    ).toBeGreaterThan(0);
    expect(
      component.catalog.researchAndScience.seLigaNoPAS.length
    ).toBeGreaterThan(0);
    expect(
      component.catalog.researchAndScience.universidadeParaQue.length
    ).toBeGreaterThan(0);
    expect(component.catalog.artAndCulture.emCantos.length).toBeGreaterThan(0);
    expect(component.catalog.artAndCulture.casaDoSom.length).toBeGreaterThan(0);
    expect(component.catalog.artAndCulture.esbocos.length).toBeGreaterThan(0);
    expect(component.catalog.artAndCulture.exclusiva.length).toBeGreaterThan(0);
    expect(
      component.catalog.specialSeries.florestaDeGente.length
    ).toBeGreaterThan(0);
    expect(
      component.catalog.specialSeries.guiaDoCalouro.length
    ).toBeGreaterThan(0);
    expect(
      component.catalog.specialSeries.memoriasPauloFreire.length
    ).toBeGreaterThan(0);
    expect(
      component.catalog.specialSeries.desafiosDasEleicoes.length
    ).toBeGreaterThan(0);
    expect(
      component.catalog.specialSeries.vidaDeEstudante.length
    ).toBeGreaterThan(0);
    expect(
      component.catalog.specialSeries.arquiteturaICC.length
    ).toBeGreaterThan(0);
    expect(component.catalog.documentaries.miniDoc.length).toBeGreaterThan(0);
    expect(
      component.catalog.documentaries.documentaries.length
    ).toBeGreaterThan(0);
    expect(component.catalog.varieties.pitadasDoCerrado.length).toBeGreaterThan(
      0
    );
    expect(component.catalog.unbtv.length).toBeGreaterThan(0);
  });
});
