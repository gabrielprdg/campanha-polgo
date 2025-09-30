import { AddWinner } from '../../../../domain/use-cases/winner/add-winner';
import { Controller, HttpRequest, HttpResponse, Validation } from '../../../protocols';
export declare class AddWinnerController implements Controller {
    private readonly validation;
    private readonly addWinner;
    constructor(validation: Validation, addWinner: AddWinner);
    handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
//# sourceMappingURL=add-winner-controller.d.ts.map