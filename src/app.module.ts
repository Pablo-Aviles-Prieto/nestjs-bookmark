import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

// The ConfigModule from nestjs/config allows us to load the .env file into the app (using dotenv under the hood)
// Thx to importing it, we can use the config service in the other modules
@Module({
  imports: [
    // We could use the @Global decorator to make the ConfigModule global in the app
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,
  ],
})
export class AppModule {}
