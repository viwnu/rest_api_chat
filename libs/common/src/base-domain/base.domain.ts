import { BaseDomainBuildResponse, IBaseDomain } from './base.domain.interface';

export abstract class BaseDomain implements IBaseDomain {
  id: string;
  created_At: Date;

  static create(createDomainDto: any): any {
    return createDomainDto as any;
  }
  static mapping(domain: any): any {
    return {
      id: domain.id,
      created_At: domain.created_At,
    };
  }
  static mappingMany<I extends IBaseDomain, D extends BaseDomain>(domains: Partial<I>[]): D[] {
    return domains?.map((domain) => this.mapping(domain)) ?? [];
  }
  static buildResponse(domain: any): any {
    return this.baseBuildResponse(domain);
  }
  static baseBuildResponse<I extends IBaseDomain, D extends BaseDomainBuildResponse>(domain: I): D {
    return { id: domain.id, created_At: new Date(domain.created_At).toISOString() } as D;
  }
  static buildResponseMany<I extends IBaseDomain, D extends BaseDomainBuildResponse>(domains: I[]): D[] {
    return domains?.map((domain) => this.buildResponse(domain)) ?? [];
  }
}
