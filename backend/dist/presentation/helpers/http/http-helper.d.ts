import { HttpResponse } from '../../protocols/http';
export declare const serverError: (error: Error) => HttpResponse;
export declare const ok: (data: any) => HttpResponse;
export declare const created: (data: any) => HttpResponse;
export declare const noContent: () => HttpResponse;
export declare const badRequest: (error: Error) => HttpResponse;
export declare const notFound: (error: Error) => HttpResponse;
//# sourceMappingURL=http-helper.d.ts.map