/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ImportService } from './import.service';

describe('ImportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImportService]
    });
  });

  it('should ...', inject([ImportService], (service: ImportService) => {
    expect(service).toBeTruthy();
  }));
});
