import { Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { CatalogComponent } from './catalog.component';
import { VideoService } from 'src/app/services/video.service';
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

const mockVideoData: IVideo[] = [
  {
    id: 190985,
    title: 'Esboços: Luiz Gallina',
    description:
      '<p><br /></p><p><span style="color:rgb( 19 , 19 , 19 )">A curiosidade de Luiz Gallina em descobrir e entender como mecanismos e processos funcionam dá origem a uma obra composta por gravuras, pinturas e esculturas - abordando temas tão diversos quanto as árvores da paisagem de Brasília, a alquimia e os sonhos colecionados de forma escrita pelo artista durante anos.</span></p><p><br /><br /></p>',
    keywords: 'Esboços; Luiz Gallina; UnBTV;',
    visibility: 'PUBLIC',
    duration: 1527827,
    embed:
      '<iframe width="671" height="377" src="https://eduplay.rnp.br/portal/video/embed/190985" frameborder="0" scrolling="no" allowfullscreen></iframe>',
    generateLibras: true,
    generateSubtitle: true,
    qtAccess: 20,
    qtLikes: 0,
    images: [
      {
        type: 'DEFAULT',
        href: 'https://eduplay.rnp.br/portal/assets/videos/images/1699445118833.jpg',
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
    id: 190984,
    title: 'Esboços: Ricardo Caldeira',
    description:
      '<p><br /></p><p><span style="color:rgb( 19 , 19 , 19 )">Quando Ricardo Caldeira desenha parece dançar imprimindo na tela um traço marcante que fala sobre afeto, negritude, ancestralidade. Aqui o artista relembra sua infância e adolescência, os primeiros trabalhos e a relação com a região de São Sebastião, local que o influenciou e que hoje ele transforma por meio da participação em coletivos culturais.</span></p><p><br /></p><p><br /></p>',
    keywords: 'Esboços; Ricardo Caldeira; UnBTV;',
    visibility: 'PUBLIC',
    duration: 1525621,
    embed:
      '<iframe width="671" height="377" src="https://eduplay.rnp.br/portal/video/embed/190984" frameborder="0" scrolling="no" allowfullscreen></iframe>',
    generateLibras: true,
    generateSubtitle: true,
    qtAccess: 14,
    qtLikes: 0,
    images: [
      {
        type: 'DEFAULT',
        href: 'https://eduplay.rnp.br/portal/assets/videos/images/1699445004278.jpg',
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
    id: 190334,
    title: 'Esboços | Fernanda Pacca',
    description:
      '<p><br /></p><p style="text-align:justify"><span style="background-color:hsl( 0 , 0% , 100% );color:rgb( 19 , 19 , 19 )">Confetes, braçadeiras de náilon, botões, linhas de costuras compõe a palheta de cores que constroem surpreendentes figuras humanas na obra de Fernanda Pacca. Trabalhos que impressionam pela forma e abordam diversos temas como o fascínio pelo anatomia, a repressão - tanto estética quanto social - e a violência contra a mulher. </span></p><p><br /><br /><br /><br /></p>',
    keywords: 'Fernanda Pacca; Esboços; unbtv;',
    visibility: 'PUBLIC',
    duration: 1550174,
    embed:
      '<iframe width="671" height="377" src="https://eduplay.rnp.br/portal/video/embed/190334" frameborder="0" scrolling="no" allowfullscreen></iframe>',
    generateLibras: true,
    generateSubtitle: true,
    qtAccess: 15,
    qtLikes: 0,
    images: [
      {
        type: 'DEFAULT',
        href: 'https://eduplay.rnp.br/portal/assets/videos/images/1698243181940.jpg',
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
    id: 190333,
    title: 'Esboços | Valéria Pena-Costa',
    description:
      '<p><br /></p><p style="text-align:justify"><span style="background-color:hsl( 0 , 0% , 100% );color:rgb( 19 , 19 , 19 )">Poeira, insetos, objetos em deterioração são, ao mesmo tempo, tema e matéria-prima para a obra de Valéria Pena-Costa em um trabalho que reflete a inevitável passagem do tempo, as memórias de infância, os medos passados e presentes em diferentes formas de expressão.</span></p><p><br /></p>',
    keywords: 'Valéria Pena-Costa; Esboços; unbtv;',
    visibility: 'PUBLIC',
    duration: 1547193,
    embed:
      '<iframe width="671" height="377" src="https://eduplay.rnp.br/portal/video/embed/190333" frameborder="0" scrolling="no" allowfullscreen></iframe>',
    generateLibras: true,
    generateSubtitle: true,
    qtAccess: 23,
    qtLikes: 0,
    images: [
      {
        type: 'DEFAULT',
        href: 'https://eduplay.rnp.br/portal/assets/videos/images/1698243362095.jpg',
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
    id: 190324,
    title: 'Esboços: TNHA',
    description:
      '<p><br /></p><p><span style="background-color:hsl( 0 , 0% , 100% );color:rgb( 19 , 19 , 19 )">A busca por uma identidade que integre raízes negras, indígenas e latino-americanas cria uma obra que resgata ancestralidade, de olho sempre nas injustiças históricas. Seja espalhando rostos em grafites pelo Distrito Federal para suavizar o caminho de todo dia; seja tatuando ou fazendo ilustrações, TNHA tem um traço singular que carrega todo um aprendizado de andanças por diferentes comunidades e vivências familiares. </span></p><p><span style="background-color:hsl( 0 , 0% , 100% );color:rgb( 19 , 19 , 19 )"><br /></span></p>',
    keywords: 'esboços; Tnha; unbtv;',
    visibility: 'PUBLIC',
    duration: 1550383,
    embed:
      '<iframe width="671" height="377" src="https://eduplay.rnp.br/portal/video/embed/190324" frameborder="0" scrolling="no" allowfullscreen></iframe>',
    generateLibras: true,
    generateSubtitle: true,
    qtAccess: 14,
    qtLikes: 0,
    images: [
      {
        type: 'DEFAULT',
        href: 'https://eduplay.rnp.br/portal/assets/videos/images/1698146507222.jpg',
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

class VideoServiceMock {
  findAll() {
    return of(mockData);
  }
  setVideosCatalog(videos: IVideo[]) {}
}

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let videoService: VideoService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: VideoService, useValue: new VideoServiceMock() }],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    videoService = TestBed.inject(VideoService);
    router = TestBed.inject(Router);
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

  it('should navigate to "/videos" when onProgramClick is called', () => {
    const videos: IVideo[] = mockVideoData;

    const videosCatalogSpy = spyOn(videoService, 'setVideosCatalog');
    const navigateSpy = spyOn(router, 'navigate');

    component.onProgramClick(videos);

    expect(videosCatalogSpy).toHaveBeenCalledWith(videos);
    expect(navigateSpy).toHaveBeenCalledWith(['/videos']);
  });
});
