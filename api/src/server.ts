import { createApp } from "./app.js";
import { config } from "./config.js";

function bootstrap() {
  const app = createApp(config);

  app.listen(config.api.port, () => {
    console.log(`server is listening on ${config.api.url}`);
  });
}

bootstrap();
