import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
                  .setTitle('Project estimator API')
                  .setDescription('The IT Project Estimator is a project estimation tool designed for an IT company. Its main purpose is to calculate the cost of a project in person-hours and provide a list of available employees who are not currently assigned to other projects. This system will assist the company in effectively estimating project costs and managing resources.')
                  .setVersion('1.0.0')
                  .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}
bootstrap();
