// import {
//     Entity,
//     PrimaryGeneratedColumn,
//     Column,
//     CreateDateColumn,
//     UpdateDateColumn,
// } from 'typeorm';

// @Entity('images')
// export class Image {
//     @PrimaryGeneratedColumn('increment')
//     id: number;

//     @Column({
//         type: 'varchar',
//         nullable: false,
//     })
//     name: string;
    
//     @Column({
//         type: 'mediumtext',
//         nullable: false,
//     })
//     data: string;

//     @CreateDateColumn()
//     created_at: Date;

//     @UpdateDateColumn()
//     updated_at: Date;
// }