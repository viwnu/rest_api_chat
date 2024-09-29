import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1727623975163 implements MigrationInterface {
  name = 'Initial1727623975163';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_entity" ("id" uuid NOT NULL, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "username" character varying(40) NOT NULL, CONSTRAINT "UQ_9b998bada7cff93fcb953b0c37e" UNIQUE ("username"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "chat_entity" ("id" uuid NOT NULL, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(40) NOT NULL, CONSTRAINT "PK_07e65670b36d025a69930ae6f2e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "message_entity" ("id" uuid NOT NULL, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "text" character varying(200) NOT NULL, "chatId" uuid, "authorId" uuid, CONSTRAINT "PK_45bb3707fbb99a73e831fee41e0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "chat_entity_users_user_entity" ("chatEntityId" uuid NOT NULL, "userEntityId" uuid NOT NULL, CONSTRAINT "PK_cac5e8417ade2ee10bf641c3e04" PRIMARY KEY ("chatEntityId", "userEntityId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_719d6c52a890dedb6a91649ee9" ON "chat_entity_users_user_entity" ("chatEntityId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e0c079af3c8be314148b10e6c7" ON "chat_entity_users_user_entity" ("userEntityId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "message_entity" ADD CONSTRAINT "FK_ed96c9fd7ed83ee4ec5c286e3b9" FOREIGN KEY ("chatId") REFERENCES "chat_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "message_entity" ADD CONSTRAINT "FK_de22f7b0fb1909b9c0d1cc0c3e0" FOREIGN KEY ("authorId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat_entity_users_user_entity" ADD CONSTRAINT "FK_719d6c52a890dedb6a91649ee9e" FOREIGN KEY ("chatEntityId") REFERENCES "chat_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat_entity_users_user_entity" ADD CONSTRAINT "FK_e0c079af3c8be314148b10e6c73" FOREIGN KEY ("userEntityId") REFERENCES "user_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "chat_entity_users_user_entity" DROP CONSTRAINT "FK_e0c079af3c8be314148b10e6c73"`);
    await queryRunner.query(`ALTER TABLE "chat_entity_users_user_entity" DROP CONSTRAINT "FK_719d6c52a890dedb6a91649ee9e"`);
    await queryRunner.query(`ALTER TABLE "message_entity" DROP CONSTRAINT "FK_de22f7b0fb1909b9c0d1cc0c3e0"`);
    await queryRunner.query(`ALTER TABLE "message_entity" DROP CONSTRAINT "FK_ed96c9fd7ed83ee4ec5c286e3b9"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_e0c079af3c8be314148b10e6c7"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_719d6c52a890dedb6a91649ee9"`);
    await queryRunner.query(`DROP TABLE "chat_entity_users_user_entity"`);
    await queryRunner.query(`DROP TABLE "message_entity"`);
    await queryRunner.query(`DROP TABLE "chat_entity"`);
    await queryRunner.query(`DROP TABLE "user_entity"`);
  }
}
