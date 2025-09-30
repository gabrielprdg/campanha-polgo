import { DeleteWinnerById } from '../../../../domain/use-cases/winner/delete-winner-by-id';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';
export declare class DeleteWinnerByIdController implements Controller {
    private readonly deleteWinnerById;
    constructor(deleteWinnerById: DeleteWinnerById);
    handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
//# sourceMappingURL=delete-winner-by-id-controller.d.ts.map