import { TestBed } from "@angular/core/testing";

import { UsersResolver } from "./users.resolver";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRouteSnapshot } from "@angular/router";

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let route: ActivatedRouteSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    resolver = TestBed.inject(UsersResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should resolve', () => {
    resolver.resolve(route, null).subscribe(result => expect(result.length).toBeGreaterThan(0));
  });
});
