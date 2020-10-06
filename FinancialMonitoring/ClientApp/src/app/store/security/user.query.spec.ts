import { UserModel } from './../../models/security/user.model';
import { UserStore } from './user.store';
import { UserQuery } from './user.query';

describe('UserQuery', () => 
{
  let query: UserQuery;
  let store: UserStore = new UserStore();

  beforeEach(() => query = new UserQuery(store))

  it("selects user", () => 
  { 
    let wasExecuted:boolean = false;
    let user: UserModel = new UserModel();
    store.update({user: user});

    query.selectUser$.subscribe(u => 
    {
      expect(u).toBe(user);
      wasExecuted = true;
    });
    expect(wasExecuted).toBe(true);
  })
});