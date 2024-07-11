import User from "../entities/User";

export interface KVStore {
  hGet: (field: string, key: string) => Promise<string | undefined>;
  hSet: (field: string, key: string, userProps: string) => Promise<any>;
  hDel: (field: string, key: string) => Promise<any>;
}

export class SessionService {
  constructor(private store: KVStore) {}

  async getUser(id: number | string): Promise<User | null> {
    const userJSON = await this.store.hGet("sessions", id.toString());
    if (typeof userJSON === "undefined") return null;
    const user = new User();
    Object.assign(user, JSON.parse(userJSON));
    return user;
  }

  async setUser(u: User) {
    const userJSON = JSON.stringify(u);
    return this.store.hSet("sessions", u.id.toString(), userJSON);
  }

  async delUser(id: string | number) {
    return this.store.hDel("sessions", id.toString());
  }
}
