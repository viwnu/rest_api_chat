import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seed1727625459361 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        INSERT INTO "user_entity"("id", "created_at", "updated_at", "deleted_at", "username")
        VALUES ('e071f72a-dac6-41d5-a893-e042b9c8c8a0', DEFAULT, DEFAULT, DEFAULT,'user_01')
      `,
    );
    await queryRunner.query(
      `
          INSERT INTO "user_entity"("id", "created_at", "updated_at", "deleted_at", "username")
          VALUES ('c47f3448-0a96-487f-b602-0a4529825fa2', DEFAULT, DEFAULT, DEFAULT,'user_02')
        `,
    );
    await queryRunner.query(
      `
        INSERT INTO "chat_entity"("id", "created_at", "updated_at", "deleted_at", "name")
        VALUES ('926fe432-2927-47d7-801b-e428ae2fdf31', DEFAULT, DEFAULT, DEFAULT, 'district 0');

        INSERT INTO "chat_entity_users_user_entity"("chatEntityId", "userEntityId")
        VALUES
            ('926fe432-2927-47d7-801b-e428ae2fdf31', 'e071f72a-dac6-41d5-a893-e042b9c8c8a0'),
            ('926fe432-2927-47d7-801b-e428ae2fdf31', 'c47f3448-0a96-487f-b602-0a4529825fa2');
      `,
    );
    await queryRunner.query(`
        INSERT INTO "message_entity"("id", "created_at", "updated_at", "deleted_at", "text", "chatId", "authorId")
        VALUES ('906ed8a7-e1b2-449e-8c50-4ef352976bf3', DEFAULT, DEFAULT, DEFAULT, 'Hello Xenomorf\`s!', '926fe432-2927-47d7-801b-e428ae2fdf31', 'e071f72a-dac6-41d5-a893-e042b9c8c8a0')
    `);
  }

  public async down(): Promise<void> {}
}
