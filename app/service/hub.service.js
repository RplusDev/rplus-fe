System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var HubService, stash;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            HubService = (function () {
                function HubService() {
                }
                HubService.prototype.getProperty = function (name) {
                    return stash[name];
                };
                HubService.prototype.setProperty = function (name, val) {
                    stash[name] = val;
                };
                HubService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], HubService);
                return HubService;
            })();
            exports_1("HubService", HubService);
            stash = {
                some_prop: 'some_val',
            };
        }
    }
});
//# sourceMappingURL=hub.service.js.map