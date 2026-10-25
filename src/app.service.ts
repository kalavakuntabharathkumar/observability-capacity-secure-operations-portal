import {Injectable} from "@nestjs/common";
import {randomUUID} from "node:crypto";
interface AuditRecord {id:string;actor:string;action:string;resource:string;at:string;}
@Injectable()
export class AppService {
 private clients=new Set<(payload:MessageEvent)=>void>();
 private auditEvents:AuditRecord[]=[];
 private metrics=[
  {service:"payments-api",cpuPercent:67,memoryPercent:71,requestsPerSecond:920,errorRate:0.4},
  {service:"identity-api",cpuPercent:43,memoryPercent:58,requestsPerSecond:540,errorRate:0.1},
  {service:"orders-worker",cpuPercent:76,memoryPercent:64,requestsPerSecond:780,errorRate:0.7},
  {service:"notifications",cpuPercent:31,memoryPercent:42,requestsPerSecond:210,errorRate:0.2}
 ];
 health(){return {status:"ok",service:"observability-capacity-operations-portal"};}
 summary(){return {services:this.metrics,averageCpuPercent:Math.round(this.metrics.reduce((s,m)=>s+m.cpuPercent,0)/this.metrics.length),source:"demo-data",sampledAt:new Date().toISOString()};}
 query(query:string){return {query:query.trim().slice(0,200),resultType:"vector",result:this.metrics.map(m=>({metric:{service:m.service},value:m.requestsPerSecond})),source:"demo-adapter"};}
 subscribe(listener:(payload:MessageEvent)=>void){this.clients.add(listener);return ()=>this.clients.delete(listener);}
 emitAlert(message:string){const payload={type:"capacity-alert",data:{id:randomUUID(),message,at:new Date().toISOString()}} as MessageEvent;for(const listener of this.clients)listener(payload);this.audit("system","alert.emitted","capacity-alert");return payload.data;}
 audit(actor:string,action:string,resource:string){this.auditEvents.push({id:randomUUID(),actor,action,resource,at:new Date().toISOString()});}
 listAudit(){return [...this.auditEvents].reverse();}
 performOperation(actor:string,role:string,operation:string){if(!["admin","operator"].includes(role))return {allowed:false,reason:"Role is not permitted"};this.audit(actor,`operation.${operation}`,"operations");return {allowed:true,actor,operation,recorded:true};}
}
