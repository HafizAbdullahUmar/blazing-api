import {MigrationInterface, QueryRunner} from "typeorm";

export class UserVerifcation1706710429502 implements MigrationInterface {
    name = 'UserVerifcation1706710429502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX \`email\` ON \`users\`
        `);
        await queryRunner.query(`
            DROP INDEX \`username\` ON \`users\`
        `);
        await queryRunner.query(`
            CREATE TABLE \`entries\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`user\` int NOT NULL,
                \`metadata\` varchar(255) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`isVerified\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`is_verified\` tinyint NOT NULL DEFAULT 0
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`email\` \`email\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`username\` \`username\` varchar(255) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`name\` \`name\` varchar(255) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`role\` \`role\` varchar(30) NOT NULL DEFAULT 'STANDARD'
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`language\` \`language\` varchar(15) NOT NULL DEFAULT 'en-US'
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`otp\` \`otp\` varchar(255) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`otp_expiry\` \`otp_expiry\` timestamp NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`created_at\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`updated_at\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`updated_at\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`created_at\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`otp_expiry\` \`otp_expiry\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`otp\` \`otp\` varchar(255) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`language\` \`language\` varchar(15) NULL DEFAULT '' en - US ''
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`role\` \`role\` varchar(30) NULL DEFAULT '' STANDARD ''
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`name\` \`name\` varchar(255) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`username\` \`username\` varchar(255) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`email\` \`email\` varchar(255) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`is_verified\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`isVerified\` tinyint(1) NULL DEFAULT '0'
        `);
        await queryRunner.query(`
            DROP TABLE \`entries\`
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX \`username\` ON \`users\` (\`username\`)
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX \`email\` ON \`users\` (\`email\`)
        `);
    }

}
