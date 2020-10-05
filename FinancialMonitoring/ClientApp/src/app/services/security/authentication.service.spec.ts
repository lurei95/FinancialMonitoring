import { async } from '@angular/core/testing';
import { services } from './../services';
import { Observable } from 'rxjs';
import { ApiReply } from './../../models/utility/apiReply';
import { RefreshRequest } from './../../models/security/refreshRequest.model';
import { UserModel } from './../../models/security/user.model';
import { UserQuery } from './../../store/security/user.query';
import { UserStore } from './../../store/security/user.store';
import { AuthenticationService } from './authentication.service';
import { ApiService } from '../utility/api.service';
import { of, Subject } from 'rxjs';

describe('AuthenticationService', () => 
{
  let userSubject: Subject<UserModel> = new Subject<UserModel>();
  let service: AuthenticationService;
  let apiService: ApiService = 
  { 
    get(a: any, b: any, c: any) {},
    delete(a: any, b: any, c: any) {},
    put(a: any, b: any, c: any, d: any) {},
    post(a: any, b: any, c: any, d: any) {}
  } as ApiService;
  let store: UserStore = { update(a: any) {} } as UserStore;
  let query: UserQuery = { get selectUser$() { return userSubject as Observable<UserModel>; } } as UserQuery;
  let validJwt: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoyNTE2MjM5MDIyfQ.kggx5ylVTJWq_-c7mW8hRehry-ikLBQNNeW33k8nKbQ"
  let expiredJwt: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxMjE2MjM5MDIyfQ.63Kq1-7MFPd9hUHBnAE0pZ3LWUK3ENHzyiK8zowFGpo"

  beforeEach(() => 
  { service = new AuthenticationService(apiService, store, query); })

  it("updates user when user changes", () =>
  {
    let user = new UserModel();

    userSubject.next(user);

    expect((service as any)._currentUser).toBe(user);
  })

  describe("login", () => 
  {
    it("sends the correct request", () =>
    {
      let user: UserModel = new UserModel();
      let spy = spyOn(apiService, "post").and.returnValue(of(null));

      service.login(user);

      expect(spy).toHaveBeenCalledWith("Users/Login", user, UserModel);
    })

    it("updates current user on successful reply", async () =>
    {
      let user: UserModel = new UserModel();
      let newUser = new UserModel();
      let reply = new ApiReply<UserModel>(newUser, true, null);
      spyOn(apiService, "post").and.returnValue(of(reply));
      let spy = spyOn(store, "update");

      await service.login(user).toPromise();

      expect(spy).toHaveBeenCalledWith({ user: newUser });
    }) 
  })

  describe("signup", () => 
  {
    it("sends the correct request", () =>
    {
      let user: UserModel = new UserModel();
      let spy = spyOn(apiService, "post").and.returnValue(of(null));

      service.signup(user);

      expect(spy).toHaveBeenCalledWith("Users/Signup", user, UserModel);
    })

    it("updates current user on successful reply", async () =>
    {
      let user: UserModel = new UserModel();
      let newUser = new UserModel();
      let reply = new ApiReply<UserModel>(newUser, true, null);
      spyOn(apiService, "post").and.returnValue(of(reply));
      let spy = spyOn(store, "update");

      await service.signup(user).toPromise();

      expect(spy).toHaveBeenCalledWith({ user: newUser });
    }) 
  })

  describe("getAccessToken", async () => 
  {
    it("returns valid access token from user", async () => 
    { 
      let user: UserModel = new UserModel();
      user.accessToken = validJwt;
      (service as any)._currentUser = user;

      let token: string = await service.getAccessToken().toPromise();

      expect(token).toBe(validJwt);
    })

    it("returns null when no current user exists", async () => 
    { 
      let token: string = await service.getAccessToken().toPromise();

      expect(token).toBeNull();
    })

    it("calls refreshAccessToken when token expired", async () => 
    { 
      let user: UserModel = new UserModel();
      user.accessToken = expiredJwt;
      (service as any)._currentUser = user;
      let spy = spyOn<any>(service, "refreshAccessToken").and.returnValue(of("test"));

      let token: string = await service.getAccessToken().toPromise();

      expect(spy).toHaveBeenCalled();
      expect(token).toBe("test");
    })
  })

  describe("tokenExpired", () =>
  {
    it("returns true for expired token", () => expect((service as any).tokenExpired(expiredJwt)).toBe(true))

    it("returns false for valid token", () => expect((service as any).tokenExpired(validJwt)).toBe(false))
  })

  describe("refreshAccessToken", () =>
  {
    it("sends correct refresh request", () =>
    {
      let user: UserModel = new UserModel();
      user.accessToken = expiredJwt;
      user.refreshToken = "test123";
      (service as any)._currentUser = user;
      let spy = spyOn(apiService, "post").and.returnValue(of(null));

      (service as any).refreshAccessToken();

      const request = new RefreshRequest(user.accessToken, user.refreshToken);
      expect(spy).toHaveBeenCalledWith("Users/RefreshToken", request, UserModel);
    })

    it("updates current user on successful reply", async () =>
    {
      let user: UserModel = new UserModel();
      user.accessToken = expiredJwt;
      user.refreshToken = "test123";
      (service as any)._currentUser = user;
      let newUser = new UserModel();
      newUser.accessToken = "newToken";
      let reply = new ApiReply<UserModel>(newUser, true, null);
      spyOn(apiService, "post").and.returnValue(of(reply));
      let spy = spyOn(store, "update");

      let result = await (service as any).refreshAccessToken().toPromise();

      expect(spy).toHaveBeenCalledWith({ user: newUser });
      expect(result).toBe("newToken");
    })
  })
});