import { UpdateWinnerById } from '../../../../domain/use-cases/winner/update-winner-by-id';
import { Controller, HttpRequest, HttpResponse, Validation } from '../../../protocols';
export declare class UpdateWinnerByIdController implements Controller {
    private readonly validation;
    private readonly updateWinnerById;
    constructor(validation: Validation, updateWinnerById: UpdateWinnerById);
    handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
//# sourceMappingURL=update-winner-by-id-controller.d.ts.map