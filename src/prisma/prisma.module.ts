import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// This makes this module available to the whole app without needing to import on the module files
// So can be used in the constructor of a service directly.
// This global module has to be imported in the app.module.ts
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
