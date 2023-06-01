import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// PrismaClient is a class that allows to connect to the DB
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    // super will call the constructor of the class being extended (PrismaClient). Since the
    // constructor of PrismaClient needs to have datasources, db and url props we pass it to the super
    super({
      datasources: {
        db: {
          url: 'postgresql://postgres:abc123.@localhost:5434/nest?schema=public',
        },
      },
    });
  }
}
