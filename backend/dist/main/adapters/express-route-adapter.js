"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptRoute = void 0;
const adaptRoute = (controller) => {
    return async (req, res) => {
        try {
            const httpRequest = {
                headers: req.headers,
                body: req.body,
                params: req.params,
                query: req.query
            };
            console.log('https', httpRequest);
            const httpResponse = await controller.handle(httpRequest);
            console.log('rs', httpResponse);
            if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
                res.status(httpResponse.statusCode).json(httpResponse.body);
            }
            else {
                res.status(httpResponse.statusCode).json({
                    error: httpResponse.body.error || httpResponse.body.message || httpResponse.body
                });
            }
        }
        catch (error) {
            console.error('Error in adaptRoute:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
};
exports.adaptRoute = adaptRoute;
//# sourceMappingURL=express-route-adapter.js.map