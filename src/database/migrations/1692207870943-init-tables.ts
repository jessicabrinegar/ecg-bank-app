import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTables1692207870943 implements MigrationInterface {
    name = 'InitTables1692207870943'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bank"."transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "note" text, "amount_money" jsonb NOT NULL, "account_id" uuid, "target_account_id" uuid, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bank"."account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "given_name" text NOT NULL, "family_name" text NOT NULL, "email_address" text NOT NULL, "note" text, "balance" jsonb NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "audit"."audit-trail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "entity" character varying NOT NULL, "action" character varying NOT NULL, "new_value" jsonb NOT NULL, "modified_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_c68e61412d93e484872f37e5557" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bank"."transaction" ADD CONSTRAINT "FK_e2652fa8c16723c83a00fb9b17e" FOREIGN KEY ("account_id") REFERENCES "bank"."account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bank"."transaction" ADD CONSTRAINT "FK_9ea1766c446114fefdb5c59feb2" FOREIGN KEY ("target_account_id") REFERENCES "bank"."account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank"."transaction" DROP CONSTRAINT "FK_9ea1766c446114fefdb5c59feb2"`);
        await queryRunner.query(`ALTER TABLE "bank"."transaction" DROP CONSTRAINT "FK_e2652fa8c16723c83a00fb9b17e"`);
        await queryRunner.query(`DROP TABLE "audit"."audit-trail"`);
        await queryRunner.query(`DROP TABLE "bank"."account"`);
        await queryRunner.query(`DROP TABLE "bank"."transaction"`);
    }

}
