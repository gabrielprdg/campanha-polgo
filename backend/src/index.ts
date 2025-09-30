import { config } from './main/config/environment';
import { mongoHelper } from './infra/mongoDB/helper/mongoHelper';
import app from './main/config/app';

app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Campanha Polgo API',
    version: config.apiVersion
  });
});

const startServer = async (): Promise<void> => {
  try {
    await mongoHelper.connect();

    app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
      console.log(`📡 Environment: ${config.nodeEnv}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();