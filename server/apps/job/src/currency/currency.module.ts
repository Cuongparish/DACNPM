import { Module } from '@nestjs/common';
import { CurrencyService } from '../domain/services/currency.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currency } from '../infrastructure/schemas/currency.schema';
import { CurrencyRepository } from '../domain/repository';
import { TypeOrmCurrencyRepository } from '../infrastructure/repository/currency.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Currency])],
  controllers: [],
  providers: [
    {
      provide: CurrencyService,
      useFactory: (currencyRepository: CurrencyRepository) => {
        return new CurrencyService(currencyRepository);
      },
      inject: [CurrencyRepository],
    },
    {
      provide: CurrencyRepository,
      useClass: TypeOrmCurrencyRepository,
    },
  ],
  exports: [CurrencyService],
})
export class CurrencyModule {}
