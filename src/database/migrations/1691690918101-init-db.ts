import { MigrationInterface, QueryRunner } from "typeorm"

export class InitDb1691690918101 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('GRANT connect ON DATABASE bank TO apiuser;');
        await queryRunner.query('CREATE SCHEMA IF NOT EXISTS bank;');
        await queryRunner.query('CREATE SCHEMA IF NOT EXISTS audit;');
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
        await queryRunner.query('ALTER ROLE apiuser SET search_path TO public, bank, audit;');
        await queryRunner.query('GRANT USAGE ON SCHEMA public, bank, audit TO apiuser;');
        await queryRunner.query('alter default privileges in schema public, bank, audit grant all on tables to apiuser;');
        await queryRunner.query('alter default privileges in schema public, bank, audit grant all on sequences to apiuser;');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP SCHEMA IF EXISTS audit CASCADE;');
    }

}
