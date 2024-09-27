import { INestApplication } from '@nestjs/common';
import { pipesSetup, swaggerSetup } from '.';

export const configApp = (app: INestApplication) => {
  pipesSetup(app);
  // preffixSetup(app);
  swaggerSetup(app);
};
