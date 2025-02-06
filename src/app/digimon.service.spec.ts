import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DigimonService } from './digimon.service';

describe('DigimonService', () => {
  let service: DigimonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DigimonService]
    });
    service = TestBed.inject(DigimonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all digimons', () => {
    const dummyDigimons = [
      { name: 'Agumon', level: 'Rookie' },
      { name: 'Gabumon', level: 'Rookie' }
    ];

    service.getDigimons().subscribe(digimons => {
      expect(digimons).toEqual(dummyDigimons);
    });

    const req = httpMock.expectOne('https://digi-api.com/api/v1/digimon');
    expect(req.request.method).toBe('GET');
    req.flush(dummyDigimons);
  });

  it('should fetch a digimon by name', () => {
    const digimonName = 'Agumon';
    const dummyDigimon = { name: 'Agumon', level: 'Rookie' };

    service.getDigimonByName(digimonName).subscribe(digimon => {
      expect(digimon).toEqual(dummyDigimon);
    });

    const req = httpMock.expectOne(`https://digi-api.com/api/v1/digimon/${digimonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyDigimon);
  });
});
