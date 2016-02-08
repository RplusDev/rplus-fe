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
    var PersonService, PERSONS;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            PersonService = (function () {
                function PersonService() {
                }
                PersonService.prototype.getPersonList = function (page, per_page) {
                    var len = PERSONS.length;
                    var f_idx = (page - 1) * per_page;
                    if (f_idx >= len)
                        return [];
                    var l_idx = page * per_page;
                    var itm_num = per_page;
                    if (l_idx >= len) {
                        itm_num = len % per_page;
                    }
                    return PERSONS.slice(f_idx, itm_num);
                };
                PersonService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], PersonService);
                return PersonService;
            })();
            exports_1("PersonService", PersonService);
            PERSONS = [
                {
                    id: 1,
                    name: 'Вася',
                    company_id: null,
                    agent_id: null,
                    phone: [{ s: '9294121474' }, { s: '4212784512' }],
                    email: [{ s: 'mail1@mail.ru' }, { s: 'mail2@mail.ru' }],
                    info: 'че-то че-то',
                    add_date: 1000000000,
                    change_date: 1000000000,
                    selected: false,
                    tag: 0,
                },
                {
                    id: 2,
                    name: 'Петя',
                    company_id: null,
                    agent_id: null,
                    phone: [{ s: '9294121474' }, { s: '4212784512' }],
                    email: [{ s: 'mail1@mail.ru' }, { s: 'mail2@mail.ru' }],
                    info: 'че-то че-то еще',
                    add_date: 1200000000,
                    change_date: 1300000000,
                    selected: false,
                    tag: 0,
                },
            ];
        }
    }
});
//# sourceMappingURL=person.service.js.map