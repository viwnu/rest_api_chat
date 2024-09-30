import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/features/app.module';
import { configApp } from 'src/config';
import { DataSource } from 'typeorm';
import { ChatRepository } from 'src/features/chat/repository';
import { UsersRepository } from 'src/features/user/repository';
import { User } from 'src/features/user/domain';
import { Chat } from 'src/features/chat/domain';
import { randomUUID } from 'crypto';

const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const isoDateTimeStringRe =
  /^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})?(Z|([+-]([01]\d|2[0-3]):[0-5]\d))$/gm;

describe('ChatController (e2e)', () => {
  let app: INestApplication;
  let chatRepository: ChatRepository;
  let userRepository: UsersRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configApp(app);
    await app.init();
    await new Promise((resolve) => setTimeout(resolve, 5000));
    chatRepository = moduleFixture.get<ChatRepository>(ChatRepository);
    userRepository = moduleFixture.get<UsersRepository>(UsersRepository);
  }, 6000);

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

  describe('/chats/add (POST)', () => {
    it('should create a chat successfully', async () => {
      console.log('before creating user');
      const user1 = await userRepository.save(User.create({ username: 'user1' }));
      console.log('user1', user1);
      const user2 = await userRepository.save(User.create({ username: 'user2' }));
      console.log('user2', user2);

      const createChatDto = {
        name: 'district 9',
        users: [user1.id, user2.id],
      };

      const response = await request(app.getHttpServer()).post('/chats/add').send(createChatDto);
      console.log('RESPONSE', response.body);

      expect(response.status).toBe(201);
      expect(response.body.id).toMatch(uuidRe);
      expect(response.body.created_At).toMatch(isoDateTimeStringRe);

      const chat = await chatRepository.findByName(createChatDto.name);
      expect(chat).toBeDefined();
      expect(chat.name).toBe(createChatDto.name);
    });

    it('should return 400 error if chat name already exists', async () => {
      const randomNumber = Math.floor(Math.random() * 100) + 30;
      const user1 = await userRepository.save(User.create({ username: `user${randomNumber}` }));
      const user2 = await userRepository.save(User.create({ username: `user${randomNumber + 1}` }));

      const createChatDto = {
        name: 'district 10',
        users: [user1.id, user2.id],
      };

      await chatRepository.save(Chat.create({ name: createChatDto.name, users: [user1, user2] }));

      const response = await request(app.getHttpServer()).post('/chats/add').send(createChatDto);

      expect(response.status).toBe(400);
      expect(response.body.exception.message).toBe(`Chat with name ${createChatDto.name} already exist`);
    });

    it('should return 400 error if users ids is wrong', async () => {
      const createChatDto = {
        name: 'district 11',
        users: ['wrong-user-id'],
      };

      const response = await request(app.getHttpServer()).post('/chats/add').send(createChatDto);

      expect(response.status).toBe(400);
    });

    it('should return 404 error if no users found', async () => {
      const createChatDto = {
        name: 'district 12',
        users: [randomUUID()],
      };

      const response = await request(app.getHttpServer()).post('/chats/add').send(createChatDto);

      expect(response.status).toBe(404);
      expect(response.body.exception.message).toBe('No users find');
    });
  });

  describe('/chats/get (POST)', () => {
    it('should return all chats of the user', async () => {
      const randomNumber = Math.floor(Math.random() * 200) + 30;
      const user1 = await userRepository.save(User.create({ username: `user${randomNumber}` }));
      const user2 = await userRepository.save(User.create({ username: `user${randomNumber + 1}` }));

      await chatRepository.save(Chat.create({ name: 'district 13', users: [user1, user2] }));
      await chatRepository.save(Chat.create({ name: 'district 14', users: [user1, user2] }));

      const findUserChatsDto = { user: user1.id };

      const response = await request(app.getHttpServer()).post('/chats/get').send(findUserChatsDto);

      expect(response.status).toBe(201);
      expect(response.body.length).toBe(2);
      expect(response.body[0].id).toMatch(uuidRe);
      expect(response.body[0].created_At).toMatch(isoDateTimeStringRe);
      expect(response.body[0].name).toBe('district 14');
    });

    it('should return an empty array if no chats found for the user', async () => {
      const notExistingUserId = randomUUID();

      const findUserChatsDto = { user: notExistingUserId };

      const response = await request(app.getHttpServer()).post('/chats/get').send(findUserChatsDto);

      expect(response.status).toBe(201);
      expect(response.body).toEqual([]);
    });
  });
});
