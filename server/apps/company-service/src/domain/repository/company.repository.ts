import {
  CreateCompanyDTO,
  UpdateCompanyDTO,
  UpdateCompanyStatusDTO,
} from '../dto';
import { Company } from '../entity';

export abstract class CompanyRepository {
  abstract createCompany(company: CreateCompanyDTO): Promise<Company>;

  abstract getAllCompanyPagination(
    page: number,
    limit: number,
  ): Promise<Company[]>;

  abstract getTotalCompanies(): Promise<number>;

  abstract findCompanyById(id: number): Promise<Company>;

  abstract updateCompany(company: UpdateCompanyDTO): Promise<Company>;

  abstract updateCompanyStatus(
    company: UpdateCompanyStatusDTO,
  ): Promise<Company>;

  abstract removeCompany(id: number): Promise<string>;

  abstract findCompanyByArrayId(id: number[]): Promise<Company[]>;

  abstract findCompanyByName(
    name: string,
    page: number,
    limit: number,
  ): Promise<Company[]>;

  abstract getTotalCompanyByName(name: string): Promise<number>;
}
