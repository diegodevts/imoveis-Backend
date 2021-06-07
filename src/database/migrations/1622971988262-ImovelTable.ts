import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class ImovelTable1622971988262 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

       await queryRunner.createTable(new Table({
            name: 'imoveis',
            columns:[{
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()'
            },
            {
                name: 'cep',
                type: 'bigint'
                
            },
            {
                name: 'numero',
                type: 'int'
            },
            {
                name: 'complemento',
                type: 'varchar',
                isUnique: true
            },
            {
                name: 'aluguel',
                type: 'decimal',
                precision: 5,
                scale: 2
            },
            {
                name: 'quartos',
                type: 'int'
            },
            {
                name: 'imovel',
                type: 'boolean'
                
            },
            {
            
                name: 'userId',
                type: 'uuid'
                
            },
            {
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
             },
            {
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()',
            }],
            foreignKeys:[
                {
                columnNames: ['userId'],
                name: 'FKrel',
                referencedTableName: 'user',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
                onUpdate: 'SET NULL',

            },]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('imoveis')
        await queryRunner.query('DROP EXTENSION "uuid-ossp"')
        await queryRunner.dropForeignKey('imoveis', 'userId')
    }

}