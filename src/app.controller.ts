import {BadRequestException,Body,Controller,Get,Headers,Post,Query,Sse,UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {AppService} from "./app.service";
@Controller()
export class AppController {
 constructor(private readonly service:AppService){}
 @Get("health") health(){return this.service.health();}
 @Get("metrics/summary") summary(){return this.service.summary();}
 @Get("metrics/query") query(@Query("query") query="up"){if(query.length>200)throw new BadRequestException("PromQL query limited to 200 characters in demo");return this.service.query(query);}
 @Sse("alerts/stream") stream():Observable<MessageEvent>{return new Observable(subscriber=>{const off=this.service.subscribe(payload=>subscriber.next(payload));subscriber.next({type:"connected",data:{message:"SSE stream connected"}} as MessageEvent);return ()=>off();});}
 @Post("alerts/demo") emit(@Body() body:{message?:string}){return this.service.emitAlert((body?.message||"Demo capacity threshold exceeded").slice(0,500));}
 @Get("audit") audit(){return {items:this.service.listAudit()};}
 @Post("operations/action") operation(@Headers("authorization") authorization="",@Body() body:{operation?:string}){
  const token=authorization.replace(/^Bearer\\s+/i,"");
  const role=token==="demo-admin"?"admin":token==="demo-operator"?"operator":token==="demo-viewer"?"viewer":"";
  if(!role)throw new UnauthorizedException("Use demo bearer token; replace with JWT/OAuth2 validation for production");
  const result=this.service.performOperation("demo-user",role,(body?.operation||"inspect").slice(0,100));
  if(!result.allowed)throw new UnauthorizedException(result.reason);return result;
 }
}
