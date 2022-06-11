import {MigrationInterface, QueryRunner, getRepository} from "typeorm";
import { ConfigSeed } from '../seed/config.seed';

export class SeedConfig1654915220024 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const conf = await getRepository('configs').save(ConfigSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM configs`)
    }

}
