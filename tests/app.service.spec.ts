import {AppService} from "../src/app.service";
describe("AppService",()=>{
 let service:AppService;beforeEach(()=>{service=new AppService();});
 it("returns sample capacity metrics",()=>{expect(service.summary().services.length).toBeGreaterThan(0);});
 it("records authorized operations",()=>{expect(service.performOperation("tester","operator","inspect").allowed).toBe(true);expect(service.listAudit()).toHaveLength(1);});
 it("rejects viewer operations",()=>expect(service.performOperation("viewer","viewer","delete").allowed).toBe(false));
 it("broadcasts alerts",()=>{const events:unknown[]=[];service.subscribe(e=>events.push(e));service.emitAlert("CPU high");expect(events).toHaveLength(1);});
});
