import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/features/app.module';
import { configApp } from 'src/config';
import { CreateUserInputModel } from 'src/features/user/api/models/input';
import { UserViewModel } from 'src/features/user/api/models/view';
import { DataSource } from 'typeorm';

const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const isoDateTimeStringRe =
  /^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})?(Z|([+-]([01]\d|2[0-3]):[0-5]\d))$/gm;

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configApp(app);
    await app.init();
  });

  afterAll(async () => {
    const dataSource = await app.resolve(DataSource);
    await dataSource.query(`
        DROP TABLE IF EXISTS "public"."chat_entity" CASCADE;
        DROP TABLE IF EXISTS "public"."message_entity" CASCADE;
        DROP TABLE IF EXISTS "public"."user_entity" CASCADE;
        DROP TABLE IF EXISTS "public"."chat_entity_users_user_entity" CASCADE;
      `);
    await app.close();
  }, 3000);

  describe('/users/add (POST)', () => {
    it('should create a user successfully', async () => {
      // Arrange
      const createUserDto: CreateUserInputModel = {
        username: 'newuser',
      };

      const mockUserResponse: UserViewModel = {
        id: 'c47f3448-0a96-487f-b602-0a4529825fa2',
        username: 'newuser',
        created_At: new Date().toISOString(),
      };

      // Act
      const response = await request(app.getHttpServer()).post('/users/add').send(createUserDto);

      // Assert
      expect(response.status).toBe(201);
      expect(response.body.id).toMatch(uuidRe);
      expect(response.body.username).toEqual(mockUserResponse.username);
      expect(response.body.created_At).toMatch(isoDateTimeStringRe);
    });

    it('should return a 403 error if the user already exists', async () => {
      // Arrange
      const createUserDto: CreateUserInputModel = {
        username: 'newuser',
      };

      const response = await request(app.getHttpServer()).post('/users/add').send(createUserDto);

      // Assert
      expect(response.status).toBe(403);
      expect(response.body.exception.message).toBe('User Already exist');
    });

    it('should return validation error if username is missing', async () => {
      // Act
      const response = await request(app.getHttpServer()).post('/users/add').send({});

      // Assert
      expect(response.status).toBe(400); // ожидание ошибки валидации
      expect(response.body.exception.message).toContain('username must be a string');
    });
  });
});
