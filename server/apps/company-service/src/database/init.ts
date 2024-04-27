import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Company } from '../entities/company.entity';
import { Campaign } from '../entities/campaign.entity';
import { campaigns } from './data-campaign';
import { companies } from './data-company';

const DB_NOT_EXIST_ERROR_CODE = '3D000';
export type DatabaseOptions = TypeOrmModuleOptions & { database: string };

const doCallbackWithAutoCloseConnection = async (
  option: DataSourceOptions,
  callback: (dataSource: DataSource) => Promise<void>,
) => {
  const appDataSource = await new DataSource(option).initialize();
  await callback(appDataSource);
  await appDataSource.destroy();
};

export class DatabaseConfiger {
  constructor(private defaultConfig: DatabaseOptions) {}

  private async isDatabaseExist(name: string) {
    try {
      const dataSourceOption = {
        ...this.defaultConfig,
        database: name,
      } as DataSourceOptions;

      await doCallbackWithAutoCloseConnection(dataSourceOption, async () => {});
    } catch (error) {
      if (error.code === DB_NOT_EXIST_ERROR_CODE) {
        return false;
      } else throw error;
    }
    return true;
  }

  private async createDatabase(name: string) {
    const createDatabaseSQL = `CREATE DATABASE ${name};`;
    const createDatabase = async (dataSource: DataSource) => {
      await dataSource.query(createDatabaseSQL);
    };

    const postgresDBConnectOption = {
      ...this.defaultConfig,
      database: 'postgres',
    } as DataSourceOptions;
    await doCallbackWithAutoCloseConnection(
      postgresDBConnectOption,
      createDatabase,
    );
  }

  private async insertData() {
    const option = {
      ...this.defaultConfig,
      entities: [Company, Campaign],
    } as DataSourceOptions;
    await doCallbackWithAutoCloseConnection(option, async (dataSource) => {
      await dataSource.getRepository(Campaign).insert(campaigns);
      await dataSource.getRepository(Company).insert(companies);
    });
  }

  private async initDatabase() {
    await this.createDatabase(this.defaultConfig.database);
    await this.insertData();
  }

  async config(): Promise<TypeOrmModuleOptions> {
    if (!(await this.isDatabaseExist(this.defaultConfig.database))) {
      await this.initDatabase();
    }

    return this.defaultConfig;
  }
}
