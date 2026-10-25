import "reflect-metadata";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
async function bootstrap(){const app=await NestFactory.create(AppModule);app.enableCors();await app.listen(Number(process.env.PORT||3002));console.log(`Operations portal listening on ${await app.getUrl()}`);}
bootstrap();
