import { Repository } from 'typeorm';
import { Account } from './models/account.entity';
// import { AccountDto } from './models/account.dto';


export class AccountsRepository extends Repository<Account> {

    sayHello() {
        console.log('hello');
    }
}