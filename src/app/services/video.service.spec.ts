import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EDUPLAY_API_URL, UNB_ID } from 'src/app/app.constant';
import { EDUPLAY_CLIENT_KEY } from '../environment/environment';
import { VideoService } from './video.service';

describe('VideoService', () => {
  let service: VideoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VideoService],
    });

    service = TestBed.inject(VideoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('findAll', () => {
    it('should return all videos by institution', () => {
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
            title:
              'Dia 1: Minicurso de Extensão - UnB - Présentation Denise Damasco',
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
            title:
              'Aulas Síncronas ás 14 horas as terças-feiras e quintas-feiras',
            description:
              'Aulas Síncronas ás 14 horas as terças-feiras e quintas-feiras',
            keywords:
              'Aulas Síncronas ás 14 horas as terças-feiras e quintas-feiras',
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

      service.findAll().subscribe((response) => {
        expect(response.body).toEqual(mockData);
      });

      const req = httpMock.expectOne(
        `${EDUPLAY_API_URL}video?institution=${UNB_ID}`
      );
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('clientkey')).toBe(EDUPLAY_CLIENT_KEY);

      req.flush(mockData);
    });
  });

  describe('findVideoVersionByVideoId', () => {
    it('should return video version by video ID', () => {
      const mockId = 137155;
      const mockData = {
        videoVersionList: [
          {
            id: 198889,
            fileFormat: 'MP4',
            bitRate: 400,
            frameRate: 0.0,
            frameWidth: 640,
            frameHeight: 360,
            url: 'https://cdn.eduplay.rnp.br/route/GFo4bTLBMlME/1625266532841.mp4?s=aHR0cHM6Ly9tZWRpYS5lZHVwbGF5LnJucC5ici9tZWRpYS9HRm80YlRMQk1sTUUvMTYyNTI2NjUzMjg0MS5tcDQ_bT1hOHRCay1Ed1ZIX2thOGllMlBoRkxB&p=0&m=9xeIa_Ss6Z_kmZ-wjeczWg',
          },
          {
            fileFormat: 'HLS',
            url: 'https://cdn.eduplay.rnp.br/route/GFo4bTLBMlME/index.m3u8?s=aHR0cHM6Ly9tZWRpYS5lZHVwbGF5LnJucC5ici9tZWRpYS9HRm80YlRMQk1sTUUvaW5kZXgubTN1OD94PTEmbT01Zi04czV1TmJRelM5V3BrblpSRTRn&x=1&p=0&m=q_L7ZIxmqATQnM0n7KREyg',
          },
        ],
      };

      service.findVideoVersionByVideoId(mockId).subscribe((response) => {
        expect(response.body).toEqual(mockData);
      });

      const req = httpMock.expectOne(
        `${EDUPLAY_API_URL}video/versions/${mockId}`
      );
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('clientkey')).toBe(EDUPLAY_CLIENT_KEY);

      req.flush(mockData);
    });
  });

  describe('findVideoById', () => {
    it('should return a video', () => {
      const mockId = 185814;
      const mockData = {
        id: 185814,
        title: 'Tutorial - Etherpad',
        description:
          '<p>Tutorial do projeto Escolha Livre (escolhalivre.org.br) apresentando o Etherpad (como o pad.riseup.net), um software livre.</p><p><br /></p><p>Produzido pela Iniciativa Educação Aberta (aberta.org.br).</p><p><br />Licença de uso: CC-BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/).</p><p><br /></p><p><br /></p>',
        keywords: 'software livre, escrita colaborativa, FOSS, colaboração',
        visibility: 'PUBLIC',
        duration: 250367,
        embed:
          '<iframe width="671" height="377" src="https://eduplay.rnp.br/portal/video/embed/185814" frameborder="0" scrolling="no" allowfullscreen></iframe>',
        generateLibras: true,
        generateSubtitle: true,
        qtAccess: 28,
        qtLikes: 0,
        images: [
          {
            type: 'DEFAULT',
            href: 'https://eduplay.rnp.br/portal/assets/videos/images/1689705451523.jpg',
          },
        ],
        institution: {
          id: 216,
          name: 'Universidade de Brasilia',
          code: 'UNB',
        },
        userOwner: {
          id: 44590,
          name: 'Tel Amiel',
          avatar:
            'https://eduplay.rnp.br/portal/assets/users/images/1683107832084.jpg',
        },
        channels: [
          {
            id: 183065,
            name: 'Cátedra UNESCO em EaD',
          },
        ],
      };

      service.findVideoById(mockId).subscribe((response) => {
        expect(response.body).toEqual(mockData);
      });

      const req = httpMock.expectOne(`${EDUPLAY_API_URL}video/${mockId}`);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('clientkey')).toBe(EDUPLAY_CLIENT_KEY);

      req.flush(mockData);
    });
  });
});
