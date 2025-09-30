import { LoadWinners } from '../../../../domain/use-cases/winner/load-winners';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';
export declare class LoadWinnersController implements Controller {
    private readonly loadWinners;
    constructor(loadWinners: LoadWinners);
    handle(_httpRequest: HttpRequest): Promise<HttpResponse>;
}
//# sourceMappingURL=load-winners-controller.d.ts.map