import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VideoComponent } from './video.component';
import { VideoService } from '../../services/video.service';
import { of, throwError } from 'rxjs';

const mockData = {
  "qtTotal": 110,
  "videoList": [
    {
      "id": 142471,
      "title": "Sala de Reunião 04 do NTE",
      "description": "Sala de Reunião 04 do NTE",
      "keywords": "Sala de Reunião 04 do NTE",
      "visibility": "PUBLIC",
      "duration": 561835,
      "generateLibras": true,
      "generateSubtitle": true,
      "qtAccess": 41,
      "qtLikes": 0,
      "images": [
        {
          "type": "DEFAULT",
          "href": "https://eduplay.rnp.br/portal/assets/videos/images/1630091029232.png"
        }
      ],
      "userOwner": {
        "id": 30684,
        "name": "Fabio Ferreira de Oliveira"
      }
    },
    {
      "id": 180741,
      "title": "Mulheres que inspiram - Profa. Carla Rocha",
      "description": "<p>Entrevista com a Professora Carla Rocha (UnB) como parte do projeto Mulheres que Inspiram. Adeia surgiu através da leitura do texto Eu programo, tu programas, elx hackea: mulheres hackers e perspectivas tecnopolíticas e do interesse em dar visibilidade a mulheres que atuam na área de software livre e educação aberta. Transcrição do áudio disponível..em https://pt.wikiversity.org/wiki/Educa%C3%A7%C3%A3o_Aberta/Mulheres_que_inspiram</p><p><br /></p><p>Disponível com uma licença CC-BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/).</p>",
      "keywords": "mulheres, computação, professora, ciência da computação, gênero",
      "visibility": "PUBLIC",
      "duration": 508459,
      "generateLibras": true,
      "generateSubtitle": true,
      "qtAccess": 36,
      "qtLikes": 0,
      "images": [
        {
          "type": "DEFAULT",
          "href": "https://eduplay.rnp.br/portal/assets/videos/images/1679168690066.jpg"
        }
      ],
      "userOwner": {
        "id": 44590,
        "name": "Tel Amiel",
        "avatar": "https://eduplay.rnp.br/portal/assets/users/images/1683107832084.jpg"
      }
    },
    {
      "id": 184760,
      "title": "Dia 4: Minicurso de Extensão - UnB - Racontez-nous votre histoire",
      "keywords": "mconf",
      "visibility": "PUBLIC",
      "duration": 5161003,
      "generateLibras": true,
      "generateSubtitle": true,
      "qtAccess": 24,
      "qtLikes": 0,
      "images": [
        {
          "type": "DEFAULT",
          "href": "https://eduplay.rnp.br/portal/assets/videos/images/1687455434581.png"
        }
      ],
      "userOwner": {
        "id": 45799,
        "name": "Denise Gisele de Britto Damasco"
      }
    },
    {
      "id": 184518,
      "title": "Dia 1: Minicurso de Extensão - UnB - Présentation Denise Damasco",
      "keywords": "mconf",
      "visibility": "PUBLIC",
      "duration": 3532366,
      "generateLibras": true,
      "generateSubtitle": true,
      "qtAccess": 24,
      "qtLikes": 0,
      "images": [
        {
          "type": "DEFAULT",
          "href": "https://eduplay.rnp.br/portal/assets/videos/images/1686872273578.png"
        }
      ],
      "userOwner": {
        "id": 45799,
        "name": "Denise Gisele de Britto Damasco"
      }
    },
    {
      "id": 111840,
      "title": "Aulas Síncronas ás 14 horas as terças-feiras e quintas-feiras",
      "description": "Aulas Síncronas ás 14 horas as terças-feiras e quintas-feiras",
      "keywords": "Aulas Síncronas ás 14 horas as terças-feiras e quintas-feiras",
      "visibility": "PUBLIC",
      "duration": 6111573,
      "generateLibras": true,
      "generateSubtitle": true,
      "qtAccess": 38,
      "qtLikes": 0,
      "images": [
        {
          "type": "DEFAULT",
          "href": "https://eduplay.rnp.br/portal/assets/videos/images/1621608406505.png"
        }
      ],
      "userOwner": {
        "id": 28703,
        "name": "Jorlandio Francisco Felix"
      }
    },
    {
      "id": 141981,
      "title": "Liliane Campos Machado",
      "description": "Liliane Campos Machado",
      "keywords": "Liliane Campos Machado",
      "visibility": "PUBLIC",
      "duration": 6482260,
      "generateLibras": true,
      "generateSubtitle": true,
      "qtAccess": 162,
      "qtLikes": 0,
      "images": [
        {
          "type": "DEFAULT",
          "href": "https://eduplay.rnp.br/portal/assets/videos/images/1629828306049.png"
        }
      ],
      "userOwner": {
        "id": 29754,
        "name": "Liliane Campos Machado"
      }
    },
    {
      "id": 111535,
      "title": "NTE videoconferências",
      "description": "NTE videoconferências",
      "keywords": "NTE videoconferências",
      "visibility": "PUBLIC",
      "duration": 7508000,
      "generateLibras": true,
      "generateSubtitle": true,
      "qtAccess": 73,
      "qtLikes": 0,
      "images": [
        {
          "type": "DEFAULT",
          "href": "https://eduplay.rnp.br/portal/assets/videos/images/1621383436732.png"
        }
      ],
      "userOwner": {
        "id": 19994,
        "name": "Endryl Francelino de Souza"
      }
    },
    {
      "id": 184759,
      "title": "Dia 3: Minicurso de Extensão - UnB - Racontez-nous votre histoire",
      "keywords": "mconf",
      "visibility": "PUBLIC",
      "duration": 5175560,
      "generateLibras": true,
      "generateSubtitle": true,
      "qtAccess": 24,
      "qtLikes": 0,
      "images": [
        {
          "type": "DEFAULT",
          "href": "https://eduplay.rnp.br/portal/assets/videos/images/1687454416354.png"
        }
      ],
      "userOwner": {
        "id": 45799,
        "name": "Denise Gisele de Britto Damasco"
      }
    },
    {
      "id": 179217,
      "title": "Patricia Tuxi dos Santos",
      "description": "Patricia Tuxi dos Santos",
      "keywords": "Patricia Tuxi dos Santos",
      "visibility": "PUBLIC",
      "duration": 109163,
      "generateLibras": true,
      "generateSubtitle": true,
      "qtAccess": 42,
      "qtLikes": 0,
      "images": [
        {
          "type": "DEFAULT",
          "href": "https://eduplay.rnp.br/portal/assets/videos/images/1675876887636.png"
        }
      ],
      "userOwner": {
        "id": 44725,
        "name": "Patricia Tuxi dos Santos"
      }
    },
    {
      "id": 142458,
      "title": "Sala de Reunião 04 do NTE",
      "description": "Sala de Reunião 04 do NTE",
      "keywords": "Sala de Reunião 04 do NTE",
      "visibility": "PUBLIC",
      "duration": 2750269,
      "generateLibras": true,
      "generateSubtitle": true,
      "qtAccess": 75,
      "qtLikes": 0,
      "images": [
        {
          "type": "DEFAULT",
          "href": "https://eduplay.rnp.br/portal/assets/videos/images/1630088527294.png"
        }
      ],
      "userOwner": {
        "id": 30684,
        "name": "Fabio Ferreira de Oliveira"
      }
    }
  ]
};

class VideoServiceMock {
  constructor() { }
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
      providers: [{ provide: VideoService, useValue: new VideoServiceMock() }]
    })
      .compileComponents();

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
  })

  it('should call findAll and return a list of videos', () => {
    const mySpy = spyOn(videoService, 'findAll').and.callThrough();
    component.findAll();
    expect(mySpy).toHaveBeenCalled();
  });

  it('should call findAll and return an error', () => {
    const mySpy = spyOn(videoService, 'findAll').and.returnValue(throwError(() => new Error('Erro')));
    component.findAll();
    expect(mySpy).toHaveBeenCalled();
  });
});
