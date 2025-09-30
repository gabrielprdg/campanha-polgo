import { LoadWinnerById } from '../../../../domain/use-cases/winner/load-winner-by-id';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';
export declare class LoadWinnerByIdController implements Controller {
    private readonly loadWinnerById;
    constructor(loadWinnerById: LoadWinnerById);
    handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
//# sourceMappingURL=load-winner-by-id-controller.d.ts.map