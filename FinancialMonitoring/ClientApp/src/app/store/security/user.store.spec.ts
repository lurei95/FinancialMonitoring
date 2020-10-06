import { UserStore } from './user.store';

describe('UserStore', () => 
{
  let store: UserStore;

  beforeEach(() => store = new UserStore())

  it("selects correct initial state", () => expect(store.getValue().user).toBeNull())
});