"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var session_service_1 = require("../../service/session.service");
var TabMainComponent = (function () {
    function TabMainComponent(_sessionService) {
        var _this = this;
        this._sessionService = _sessionService;
        setTimeout(function () { _this.tab.header = 'new tab'; });
        this.user = _sessionService.user;
    }
    TabMainComponent.prototype.turnTo = function (tabType, arg) {
        this.tab.reborn(tabType, arg);
    };
    TabMainComponent.prototype.logout = function () {
        this._sessionService.logout();
    };
    return TabMainComponent;
}());
TabMainComponent = __decorate([
    core_1.Component({
        selector: 'tab-main',
        inputs: ['tab'],
        styles: ["\n        .tile-board {\n            height: 100%;\n            position: relative;\n            overflow: hidden;\n            background-color: #062141;\n        }\n        .tile-group {\n            margin-left: 80px;\n            min-width: 80px;\n            width: auto;\n            float: left;\n            display: block;\n            padding-top: 40px;\n            position: relative;\n        }\n\n        .user-badge {\n            color: #eeeeee;\n        }\n    "],
        template: "\n        <div class=\"tile-board\" style=\"\">\n\n            <div class=\"user-badge\">\n                <span> {{ (user | async)?.login }} </span>  <span (click)=\"logout()\"> \u0432\u044B\u0439\u0442\u0438 </span>\n            </div>\n\n            <div class=\"tile-group\">\n\n                <div class=\"tile bg-darkBlue fg-white\" (click)=\"turnTo('list_offer', {})\">\n                    <div class=\"tile-content iconic\">\n                        <span class=\"icon icon-home\"></span>\n                    </div>\n                    <span class=\"tile-label\">\u041D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u044C</span>\n                </div>\n\n                <div class=\"tile bg-green fg-white\" (click)=\"turnTo('list_request', {})\">\n                    <div class=\"tile-content iconic\">\n                        <span class=\"icon icon-req-list\"></span>\n                    </div>\n                    <span class=\"tile-label\">\u0417\u0430\u044F\u0432\u043A\u0438</span>\n                </div>\n\n                <div class=\"tile bg-amber fg-white\">\n                    <div class=\"tile-content iconic\">\n                        <span class=\"icon icon-month\"></span>\n                    </div>\n                    <span class=\"tile-label\">\u0415\u0436\u0435\u0434\u043D\u0435\u0432\u043D\u0438\u043A</span>\n                </div>\n\n                <div class=\"tile bg-ggreen fg-white\">\n                    <div class=\"tile-content iconic\">\n                        <span class=\"icon icon-deal\"></span>\n                    </div>\n                    <span class=\"tile-label\">\u0414\u043E\u0433\u043E\u0432\u043E\u0440\u044B</span>\n                </div>\n\n                <div class=\"tile bg-indigo fg-white\" (click)=\"turnTo('list_person', {})\">\n                    <div class=\"tile-content iconic\">\n                        <span class=\"icon icon-contact\"></span>\n                    </div>\n                    <span class=\"tile-label\">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</span>\n                </div>\n\n                <div class=\"tile bg-teal fg-white\" (click)=\"turnTo('list_organisation', {})\">\n                    <div class=\"tile-content iconic\">\n                        <span class=\"icon icon-organisation\"></span>\n                    </div>\n                    <span class=\"tile-label\">\u041A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442\u044B</span>\n                </div>\n\n                <div class=\"tile bg-teal fg-white\">\n                    <div class=\"tile-content iconic\">\n                        <span class=\"icon icon-settings\"></span>\n                    </div>\n                    <span class=\"tile-label\">\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438</span>\n                </div>\n\n                <div class=\"tile bg-teal fg-white\" (click)=\"turnTo('list_users', {})\">\n                    <div class=\"tile-content iconic\">\n                        <span class=\"icon icon-user\"></span>\n                    </div>\n                    <span class=\"tile-label\">\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438</span>\n                </div>\n\n                <div class=\"tile bg-puple fg-white\" (click)=\"turnTo('advertising', {})\">\n                    <div class=\"tile-content iconic\">\n                        <span class=\"icon icon-adver\"></span>\n                    </div>\n                    <span class=\"tile-label\">\u0420\u0435\u043A\u043B\u0430\u043C\u0430</span>\n                </div>\n\n            </div>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [session_service_1.SessionService])
], TabMainComponent);
exports.TabMainComponent = TabMainComponent;
//# sourceMappingURL=tab-main.component.js.map