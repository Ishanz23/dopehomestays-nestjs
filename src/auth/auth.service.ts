import { Injectable } from '@nestjs/common';
import e from 'express';
import {
  Traveler,
  TravelerDocument,
} from 'src/travelers/schema/traveler.schema';
import { TravelerService } from 'src/travelers/traveler.service';

@Injectable()
export class AuthService {
  constructor(private readonly travelerService: TravelerService) {}

  async validate(email: string, password: string): Promise<TravelerDocument> {
    const traveler = this.travelerService.getByEmail(email);

    traveler;
    if (!traveler) {
      return null;
    }

    return traveler;
  }
}
