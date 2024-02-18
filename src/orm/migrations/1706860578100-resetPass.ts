import {MigrationInterface, QueryRunner} from "typeorm";

export class resetPass1706860578100 implements MigrationInterface {
    name = 'resetPass1706860578100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`reset_password_token\` varchar(255) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`reset_password_expires\` timestamp NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`username\` \`username\` varchar(255) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`name\` \`name\` varchar(255) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`otp\` \`otp\` varchar(255) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`otp_expiry\` \`otp_expiry\` timestamp NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`otp_expiry\` \`otp_expiry\` timestamp NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`otp\` \`otp\` varchar(255) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`name\` \`name\` varchar(255) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`username\` \`username\` varchar(255) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`reset_password_expires\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`reset_password_token\`
        `);
    }

}
