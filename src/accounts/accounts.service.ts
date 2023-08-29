import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AccountDto } from './models/account.dto';
import { Account } from './models/account.entity';
import { AccountsRepository } from './accounts.repository';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { AccountEvents } from './accounts-events';
import { AuditTrailRepository } from 'src/audit-trails/audit-trail.repository';
import { AuditTrailDto, Entity, Action } from 'src/audit-trails/models/audit-trail.dto';


@Injectable()
export class AccountsService {

    constructor(
        private accountsRepository: AccountsRepository,
        private auditRepository: AuditTrailRepository,
        private eventEmitter: EventEmitter2,
        private readonly logger: Logger
    ) {}

    findAll(): Promise<Account[]> {
        return this.accountsRepository.find();
    }

    findById(id: string): Promise<Account | null> {
        return this.accountsRepository.findOneBy({id: id});
    }

    createAccount(account: AccountDto): Promise<Account> {
        const newAccount = this.accountsRepository.create(account);
        this.logger.log('Account created', account);
        this.eventEmitter.emit(AccountEvents.accountCreated, newAccount);
        return this.accountsRepository.save(newAccount);
    }

    @OnEvent(AccountEvents.accountCreated)
    handleAccountCreatedEvent(account: Account) {
        const auditTrailEntry: AuditTrailDto = {
            entity: Entity.ACCOUNT,
            action: Action.CREATE,
            new_value: account,
            modified_at: new Date()
        };
        return this.auditRepository.save(auditTrailEntry);
    }

    async updateAccount(id: string, data: Partial<AccountDto>): Promise<Account> {
        await this.accountsRepository.update(id, {...data});
        const account = await this.accountsRepository.findOneBy({ id: id });
        return account;
    }

    async updateBalance(id: string, amount: number, type: 'deposit' | 'withdraw'): Promise<{ newBalance: number }> {
        const account = await this.accountsRepository.findOneBy({ id: id });
        let updatedAmount: number;
        if (type === 'withdraw') {
            const currentBalance = account.balance.amount;
            if (currentBalance < amount) {
                throw new BadRequestException('Insufficient funds.')
            }
            updatedAmount = currentBalance - amount;
        }
        else if (type === 'deposit') {
            const currentBalance = account.balance.amount;
            updatedAmount = currentBalance + amount;
        }
        const updatedBalance = {amount: updatedAmount, currency: account.balance.currency};
        await this.accountsRepository.update(id, {balance: updatedBalance});

        return { newBalance: updatedAmount };
    }
}