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
import { MessageRepository } from 'src/features/message/repository';
import { Message } from 'src/features/message/domain';

const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const isoDateTimeStringRe =
  /^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})?(Z|([+-]([01]\d|2[0-3]):[0-5]\d))$/gm;

describe('MessageController (e2e)', () => {
  let app: INestApplication;
  let chatRepository: ChatRepository;
  let userRepository: UsersRepository;
  let messageRepository: MessageRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configApp(app);
    await app.init();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    chatRepository = moduleFixture.get<ChatRepository>(ChatRepository);
    userRepository = moduleFixture.get<UsersRepository>(UsersRepository);
    messageRepository = moduleFixture.get<MessageRepository>(MessageRepository);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }, 3000);

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

  describe('/messages/add (POST)', () => {
    it('should create a message successfully', async () => {
      const user = await userRepository.save(User.create({ username: 'user1' }));
      const chat = await chatRepository.save(Chat.create({ name: 'chat1', users: [user] }));

      const createMessageDto = {
        author: user.id,
        chat: chat.id,
        text: 'Hello there!',
      };

      const response = await request(app.getHttpServer()).post('/messages/add').send(createMessageDto);

      expect(response.status).toBe(201);
      expect(response.body.id).toMatch(uuidRe);
      expect(response.body.created_At).toMatch(isoDateTimeStringRe);
      expect(response.body.text).toBe(createMessageDto.text);

      const message = await messageRepository.findByChatId(chat.id);
      expect(message).toHaveLength(1);
      expect(message[0].text).toBe(createMessageDto.text);
    });

    it('should return 403 error if user is not exists', async () => {
      const user = await userRepository.save(User.create({ username: 'user2' }));
      const chat = await chatRepository.save(Chat.create({ name: 'chat2', users: [user] }));

      const createMessageDto = {
        author: randomUUID(),
        chat: chat.id,
        text: 'Hello!',
      };

      const response = await request(app.getHttpServer()).post('/messages/add').send(createMessageDto);

      expect(response.status).toBe(403);
      expect(response.body.exception.message).toBe('User is not valid');
    });

    it('should return 400 error if chat is not found', async () => {
      const user = await userRepository.save(User.create({ username: 'user3' }));

      const createMessageDto = {
        author: user.id,
        chat: randomUUID(),
        text: 'Hello!',
      };

      const response = await request(app.getHttpServer()).post('/messages/add').send(createMessageDto);

      expect(response.status).toBe(400);
      expect(response.body.exception.message).toBe('Chat not found');
    });
  });

  describe('/messages/get (POST)', () => {
    it('should return all messages in a chat', async () => {
      const user = await userRepository.save(User.create({ username: 'user4' }));
      const chat = await chatRepository.save(Chat.create({ name: 'chat3', users: [user] }));

      await messageRepository.save(Message.create({ chat, author: user, text: 'Message 1' }));
      await messageRepository.save(Message.create({ chat, author: user, text: 'Message 2' }));

      const findChatMessagesDto = { chat: chat.id };

      const response = await request(app.getHttpServer()).post('/messages/get').send(findChatMessagesDto);

      expect(response.status).toBe(201);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].id).toMatch(uuidRe);
      expect(response.body[0].created_At).toMatch(isoDateTimeStringRe);
      expect(response.body[0].text).toBe('Message 1');
    });

    it('should return an empty array if no messages are found', async () => {
      const user = await userRepository.save(User.create({ username: 'user5' }));
      const chat = await chatRepository.save(Chat.create({ name: 'chat4', users: [user] }));

      const findChatMessagesDto = { chat: chat.id };

      const response = await request(app.getHttpServer()).post('/messages/get').send(findChatMessagesDto);

      expect(response.status).toBe(201);
      expect(response.body).toEqual([]);
    });
  });
});
