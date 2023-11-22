import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmailService } from './email.service';
import { IEmailData } from 'src/shared/model/email.model';
import { environment } from '../environment/environment';

const mockEmailData: IEmailData = {
  tema: 'tema',
  descricao: 'descricao',
  quando: 'quando',
  local: 'local',
  responsavel: 'responsavel',
  telefone_responsavel: 'telefone_responsavel',
  email_contato: 'email_contato',
  recipients: ['recipients']
};

describe('EmailService', () => {
  let service: EmailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmailService]
    });
    service = TestBed.inject(EmailService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call sendEmail', () => {
    const adminAPIUrl = environment.adminAPIURL + '/pauta/email';
    service.sendEmail(mockEmailData).subscribe((res) => {
      expect(res).toEqual({ success: true });
    });

    const req = httpMock.expectOne(adminAPIUrl);
    expect(req.request.method).toBe('POST');
    req.flush({ success: true });
  })

});
