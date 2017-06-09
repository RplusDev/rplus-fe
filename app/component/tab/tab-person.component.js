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
var analysis_service_1 = require("../../service/analysis.service");
var user_1 = require("../../class/user");
var offer_1 = require("../../class/offer");
var person_1 = require("../../class/person");
var request_1 = require("../../class/request");
var hub_service_1 = require("../../service/hub.service");
var config_service_1 = require("../../service/config.service");
var offer_service_1 = require("../../service/offer.service");
var request_service_1 = require("../../service/request.service");
var task_service_1 = require("../../service/task.service");
var history_service_1 = require("../../service/history.service");
var person_service_1 = require("../../service/person.service");
var organisation_service_1 = require("../../service/organisation.service");
var user_service_1 = require("../../service/user.service");
var session_service_1 = require("../../service/session.service");
var TabPersonComponent = (function () {
    function TabPersonComponent(_hubService, _configService, _offerService, _requestService, _taskService, _analysisService, _historyService, _personService, _organisationService, _userService, _sessionService) {
        var _this = this;
        this._hubService = _hubService;
        this._configService = _configService;
        this._offerService = _offerService;
        this._requestService = _requestService;
        this._taskService = _taskService;
        this._analysisService = _analysisService;
        this._historyService = _historyService;
        this._personService = _personService;
        this._organisationService = _organisationService;
        this._userService = _userService;
        this._sessionService = _sessionService;
        this.person = new person_1.Person();
        this.getDateUser = user_1.User.getData;
        this.personEmail = [];
        this.personPhone = [];
        this.personAddress = [];
        this.organisationsOpts = [];
        this.agentOpts = [];
        this.paneHidden = false;
        this.editEnabled = false;
        this.requestOfferType = 'sale';
        this.ch1_data = [];
        this.ch2_data = [];
        this.ch3_data = [];
        this.ch4_data = [];
        this.addressStr = '';
        _organisationService.list("").subscribe(function (organisations) {
            for (var i = 0; i < organisations.length; i++) {
                var o = organisations[i];
                _this.organisationsOpts.push({
                    value: o.id,
                    label: o.name
                });
            }
        });
        _userService.list(null, null, "").subscribe(function (agents) {
            for (var i = 0; i < agents.length; i++) {
                var a = agents[i];
                _this.agentOpts.push({
                    value: a.id,
                    label: a.name
                });
            }
        });
    }
    TabPersonComponent.prototype.log = function (e) {
        console.log(e);
    };
    TabPersonComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.person = this.tab.args.person;
        var c = this._configService.getConfig();
        var loc = this._sessionService.getAccount().location;
        this.personAddress = [
            { type: 'KRAY', value: this.person.region_n },
            { type: 'CITY', value: this.person.city_n },
            { type: 'DISTRICT', value: this.person.area_n },
            { type: 'STREET', value: this.person.street_n },
            { type: 'HOUSE', value: this.person.house_n },
            { type: 'HOUSING', value: this.person.housing_n },
            { type: 'FLAT', value: this.person.apartment_n }
        ];
        this.getAddressStr();
        this.personPhone = [
            { type: 'MOBILE', value: this.person.cellPhone_n },
            { type: 'HOME', value: this.person.homePhone_n },
            { type: 'WORK', value: this.person.officePhone_n },
            { type: 'MAIN', value: this.person.mainPhone_n },
            { type: 'SAME', value: this.person.otherPhone_n },
            { type: 'FAX', value: this.person.fax_n }
        ];
        this.personEmail = [
            { type: 'WORK', value: this.person.workEmail_n },
            { type: 'MAIN', value: this.person.mainEmail_n }
        ];
        if (c.map[loc]) {
            this.lat = c.map[loc].lat;
            this.lon = c.map[loc].lon;
            this.zoom = c.map[loc].zoom;
        }
        else {
            this.lat = c.map['default'].lat;
            this.lon = c.map['default'].lon;
            this.zoom = c.map['default'].zoom;
        }
        if (this.person.organisationId) {
            this._organisationService.get(this.person.organisationId).subscribe(function (org) {
                _this.organisation = org;
            });
        }
        if (this.person.userId != null) {
            this._userService.get(this.person.userId).subscribe(function (agent) {
                _this.agent = agent;
            });
        }
        if (this.person.id == null) {
            this.toggleEdit();
        }
        this.calcSize();
    };
    TabPersonComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.person.id) {
                _this.tab.header = 'Контакт';
            }
            else {
                _this.tab.header = 'Новый контакт';
            }
        });
    };
    TabPersonComponent.prototype.onResize = function (e) {
        this.calcSize();
    };
    TabPersonComponent.prototype.calcSize = function () {
        if (this.paneHidden) {
            this.paneWidth = 0;
        }
        else {
            this.paneWidth = 370;
        }
        this.mapWidth = document.body.clientWidth - (31) - this.paneWidth;
        this.paneHeight = document.body.clientHeight - 31;
    };
    TabPersonComponent.prototype.toggleLeftPane = function () {
        this.paneHidden = !this.paneHidden;
        this.calcSize();
    };
    TabPersonComponent.prototype.toggleEdit = function () {
        this.editEnabled = !this.editEnabled;
    };
    TabPersonComponent.prototype.agentChanged = function (e) {
        var _this = this;
        this.person.userId = e.selected.value;
        if (this.person.userId != null) {
            this._userService.get(this.person.userId).subscribe(function (agent) {
                _this.agent = agent;
            });
        }
    };
    TabPersonComponent.prototype.save = function () {
        var _this = this;
        var tem = this.getIndex(this.personPhone, "MOBILE");
        this.person.cellPhone_n = tem > -1 ? this.personPhone[tem].value : null;
        tem = this.getIndex(this.personPhone, "HOME");
        this.person.homePhone_n = tem > -1 ? this.personPhone[tem].value : null;
        tem = this.getIndex(this.personPhone, "WORK");
        this.person.officePhone_n = tem > -1 ? this.personPhone[tem].value : null;
        tem = this.getIndex(this.personPhone, "MAIN");
        this.person.mainPhone_n = tem > -1 ? this.personPhone[tem].value : null;
        tem = this.getIndex(this.personPhone, "SAME");
        this.person.otherPhone_n = tem > -1 ? this.personPhone[tem].value : null;
        tem = this.getIndex(this.personPhone, "FAX");
        this.person.fax_n = tem > -1 ? this.personPhone[tem].value : null;
        tem = this.getIndex(this.personAddress, "KRAY");
        this.person.region_n = tem > -1 ? this.personAddress[tem].value : undefined;
        tem = this.getIndex(this.personAddress, "CITY");
        this.person.city_n = tem > -1 ? this.personAddress[tem].value : undefined;
        tem = this.getIndex(this.personAddress, "DISTRICT");
        this.person.area_n = tem > -1 ? this.personAddress[tem].value : undefined;
        tem = this.getIndex(this.personAddress, "STREET");
        this.person.street_n = tem > -1 ? this.personAddress[tem].value : undefined;
        tem = this.getIndex(this.personAddress, "HOUSE");
        this.person.house_n = tem > -1 ? this.personAddress[tem].value : undefined;
        tem = this.getIndex(this.personAddress, "HOUSING");
        this.person.housing_n = tem > -1 ? this.personAddress[tem].value : undefined;
        tem = this.getIndex(this.personAddress, "FLAT");
        this.person.apartment_n = tem > -1 ? this.personAddress[tem].value : undefined;
        tem = this.getIndex(this.personEmail, "MAIN");
        this.person.mainEmail_n = tem > -1 ? this.personEmail[tem].value : null;
        tem = this.getIndex(this.personEmail, "WORK");
        this.person.workEmail_n = tem > -1 ? this.personEmail[tem].value : null;
        console.log(this.person);
        this._personService.save(this.person).subscribe(function (person) {
            setTimeout(function () {
                _this.person = person;
                _this.getAddressStr();
            });
            _this.toggleEdit();
        }, function (err) {
            console.log('Error: ' + err);
        });
    };
    TabPersonComponent.prototype.offersSelected = function () {
        var _this = this;
        this._offerService.list(0, 32, offer_service_1.OfferSource.LOCAL, { offerTypeCode: this.requestOfferType, personId: this.person.id }, null, "", []).subscribe(function (offers) {
            _this.offers = offers.list;
        });
    };
    TabPersonComponent.prototype.requestsSelected = function () {
        var _this = this;
        this._requestService.list(0, 32, this.requestOfferType, "all", null, this.person.id, "").subscribe(function (requests) {
            _this.requests = requests;
        });
    };
    TabPersonComponent.prototype.analysisSelected = function () {
        var a_data = this._analysisService.getObjAnalysis();
        this.ch1_data = a_data.ch1_data;
        this.ch1_data_v1 = a_data.ch1_data_v1;
        this.ch2_data = a_data.ch2_data;
        this.ch2_data_v1 = a_data.ch2_data_v1;
        this.ch3_data = a_data.ch3_data;
        this.ch3_data_v1 = a_data.ch3_data_v1;
        this.ch3_data_v2 = a_data.ch3_data_v2;
        this.ch4_data = [
            ['media', 'подано'],
            ['avito', 7],
            ['из рук в руки', 4],
            ['презент', 6],
            ['фарпост', 8],
            ['ВНХ', 6],
        ];
        this.ch4_data_v1 = 31;
        this.ch4_data_v2 = 5000;
    };
    TabPersonComponent.prototype.historySelected = function () {
        this.historyRecs = this._historyService.getObjHistory();
    };
    TabPersonComponent.prototype.getOffers = function (page, per_page) {
        /*
        this._offerService.list(page, per_page, ).subscribe(
            data => {
                this.offers = data;
            }
        );
        */
    };
    TabPersonComponent.prototype.offer_search = function () {
        this.getOffers(0, 16);
    };
    TabPersonComponent.prototype.offer_search_keydown = function (e) {
        if (e.keyCode == 13) {
            this.offer_search();
        }
    };
    TabPersonComponent.prototype.markerClick = function (r) {
        //r.selected = !r.selected;
        // scroll to object ???
    };
    TabPersonComponent.prototype.addPhone = function () {
        this.person.phones.push('');
    };
    TabPersonComponent.prototype.addEmail = function () {
        this.person.emails.push('');
    };
    TabPersonComponent.prototype.createRequest = function () {
        var tab_sys = this._hubService.getProperty('tab_sys');
        var req = new request_1.Request();
        req.personId = this.person.id;
        tab_sys.addTab('request', { request: req });
    };
    TabPersonComponent.prototype.toggleOffer = function (offer_type) {
        var _this = this;
        this.requestOfferType = offer_type;
        this._offerService.list(0, 32, offer_service_1.OfferSource.LOCAL, { offerTypeCode: this.requestOfferType, personId: this.person.id }, null, "", []).subscribe(function (offers) {
            _this.offers = offers.list;
        });
        this._requestService.list(0, 32, this.requestOfferType, "all", null, this.person.id, "").subscribe(function (requests) {
            _this.requests = requests;
        });
    };
    TabPersonComponent.prototype.createOffer = function () {
        var tab_sys = this._hubService.getProperty('tab_sys');
        tab_sys.addTab('offer', { offer: {}, person: this.person });
    };
    TabPersonComponent.prototype.getOfferDigest = function (r) {
        return offer_1.Offer.getDigest(r);
    };
    TabPersonComponent.prototype.showMenu = function (event) {
        var parent = event.currentTarget.parentElement;
        var height = parent.getElementsByClassName('input_field').length * 35;
        if (parent.offsetHeight == 30) {
            console.log(height);
            parent.style.setProperty('height', "" + (height + 55) + 'px');
            parent.style.setProperty('overflow', "visible");
            event.currentTarget.style.setProperty('transform', 'rotate(180deg)');
        }
        else {
            parent.style.setProperty('height', "30px");
            parent.style.setProperty('overflow', "hidden");
            event.currentTarget.style.setProperty('transform', 'rotate(0deg)');
        }
    };
    TabPersonComponent.prototype.parseArray = function (values, obj, isAddress) {
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var val = values_1[_i];
            var no = true;
            for (var _a = 0, obj_1 = obj; _a < obj_1.length; _a++) {
                var en = obj_1[_a];
                if (val.type == en.type) {
                    en.value = val.value;
                    no = false;
                }
            }
            if (no && val.value)
                obj.push(val);
        }
        for (var i = 0; i < obj.length; ++i) {
            if (obj[i].value === undefined || obj[i].value === null) {
                obj.splice(i, 1);
                i--;
            }
        }
        if (isAddress) {
            this.getAddressStr();
        }
    };
    TabPersonComponent.prototype.getIndex = function (array, str) {
        for (var i = 0; i < array.length; ++i) {
            if (array[i].type == str)
                return i;
        }
        return -1;
    };
    TabPersonComponent.prototype.getTypeName = function (type) {
        switch (type) {
            case "OOO": return "ООО";
            case "ZAO": return "ЗАО";
            case "AO": return "АО";
            case "PAO": return "ПАО";
            case "IP": return "ИП";
            case "OAO": return "ОАО";
            default: return "";
        }
    };
    TabPersonComponent.prototype.getAddressStr = function () {
        this.addressStr = this.person.city_n !== undefined ? "" + this.person.city_n : '';
        this.addressStr += this.person.street_n !== undefined ? ", " + this.person.street_n : '';
        this.addressStr += this.person.house_n !== undefined ? ", " + this.person.house_n : '';
        if (this.personAddress.length == 0)
            this.addressStr = '';
    };
    return TabPersonComponent;
}());
TabPersonComponent = __decorate([
    core_1.Component({
        selector: 'tab-person',
        inputs: ['tab'],
        styles: ["\n        .header_col{\n            width: calc(100% - 10px);\n            height: 40px;\n            background-color: #f7f7f7;\n            padding-left: 20px;\n            text-transform: uppercase;\n            font-size: 10pt;\n            color: #5f5d5d;\n            line-height: 40px;\n            margin-bottom: 10px;\n        }\n        .pane {\n            float: left;\n            width: 370px;\n            height: 100%;\n        }\n\n        .work-area {\n            float: left;\n            width: 100%;\n            height: 100%;\n        }\n\n        .tab-button {\n            width: 30px;\n            height: 30px;\n            text-align: center;\n            line-height: 30px;\n            font-size: 12px !important;\n            cursor: pointer;\n            color: #666;\n        }\n\n        .fixed-button {\n            position: fixed;\n            top: 0;\n            left: 0;\n        }\n\n        .view-group {\n            margin-bottom: 5px;\n            display: flex;\n            justify-content: space-between;\n            align-items: flex-start;\n            height: 30px;\n        }\n\n        .view-label {\n            white-space: nowrap;\n            color: rgb(80, 80, 80);\n            margin-top: 5px;\n            font-size: 10pt;\n        }\n\n        .view-value {\n            width: 100%;\n            text-align: right;\n            color: #696969;\n            font-size: 10pt;\n            margin-top: 5px;\n            height: 19px; /* \u043A\u043E\u0441\u0442\u044B\u043B\u044C */\n        }\n\n        .edit-value {\n            width: 100%;\n            text-align: right;\n            color: #696969;\n            font-size: 10pt;\n            height: 19px; /* \u043A\u043E\u0441\u0442\u044B\u043B\u044C */\n            border: none !important;\n        }\n\n        .text-value {\n            height: 3rem;\n            border: 1px solid #E5E5E5 !important;\n        }\n\n        .edit-block > .view-group, .view-block > .view-group {\n            height: 30px;\n            margin-left: 57px;\n        }\n\n        .show_value{\n            flex: 0 0 190px;\n            margin-right: 30px;\n            position: relative;\n            text-align: right;\n            height: 30px;\n            display: flex;\n            flex-direction: column;\n            width: 143px;\n            display: inline-block;\n            overflow: hidden;\n            text-overflow: ellipsis;\n        }\n\n        .edit-block >hr, .view-block >hr{\n                margin: 5px -10px 5px 55px;\n        }\n\n        .show_value > span:first-child{\n            height: 10px;\n            font-size: 8pt;\n        }\n        .show_value > span:last-child{\n            font-size: 10pt;\n            color: #959595;\n        }\n\n\n        .tile-x {\n            margin-right: 10px;\n            width: 150px;\n            height: 150px;\n            color: #fff;\n            position: relative;\n        }\n\n\n        .tile {\n            margin: 0;\n            margin-right: 10px;\n        }\n\n        .icon {\n            line-height: 64px;\n        }\n\n        .tile-content.iconic .icon {\n            width: 128px;\n            margin-left: -64px;\n        }\n\n        .chart-block {\n            overflow:hidden;\n            border: 1px solid #e5e5e5;\n        }\n\n        .chart-header {\n            width: 100%;\n            height: 30px;\n            border-bottom: 1px solid #e5e5e5;\n            line-height: 30px;\n            color: #fff;\n        }\n\n        .array-container > span {\n            display: block;\n            margin-bottom: 5px;\n        }\n\n        .array-container > input {\n            margin-bottom: 5px;\n        }\n\n        .two-way-switch {\n            display: table;\n            border: 1px solid #3366cc;\n            cursor: pointer;\n        }\n\n        .two-way-switch > div {\n            display: table-cell;\n            width: 90px;\n            text-align: center;\n            padding: 5px 15px;\n            background-color: #fff;\n            color: #333;\n        }\n\n        .two-way-switch > div.active {\n            background-color: #3366cc;\n            color: #fff;\n        }\n\n        .button {\n            text-align: center;\n            padding: 5px 15px;\n            background-color: #3366cc;\n            color: #fff;\n            cursor: pointer;\n            margin-top: 25px;\n        }\n\n        .view_icon{\n            width: 28px;\n            height: 25px;\n            background-size: contain;\n            float: left;\n            background-repeat: no-repeat;\n            background-position: center;\n            margin-right: 12px;\n            margin-top: 2px;\n            margin-left: 17px;\n        }\n\n        .person_face{\n            height: 220px;\n            background-color: #f7f7f7;\n        }\n\n        .person_face > .rate{\n            height: 20px;\n            background-image: url(res/star_rate.png);\n            background-size: contain;\n            width: 100px;\n            margin-left: 20px;\n            margin-top: 10px;\n        }\n\n        .person_face > img{\n            width: 120px;\n            height: 90px;\n            margin: 20px 0 10 20px;\n        }\n\n        .person_face  .name{\n            margin: 0 0 0 20px;\n            border: 0 !important;\n            font-size: 16pt;\n            text-align: left;\n            background-color: transparent;\n            color: #595a5a;\n            height: 23px;\n            line-height: 23px;\n        }\n\n        .multiselect{\n            width: 280px;\n            position: relative;\n            display: block;\n            margin-right: 15px;\n            overflow: hidden;\n        }\n\n        .multiply{\n            position: relative;\n            display: block;\n            height: 30px;\n            width: 280px;\n            margin-right: 15px;\n            margin-left: 0;\n            overflow: hidden;\n        }\n        .arrow{\n            background-image: url(res/arrow.png);\n            width: 18px;\n            height: 10px;\n            background-size: cover;\n            margin: 0 10px;\n            background-position: center;\n            flex: 0 0 18px;\n            position: absolute;\n            top: 5px;\n            right: -10px;\n        }\n\n    "],
        template: "\n\n        <div class=\"tab-button fixed-button\" (click)=\"toggleLeftPane()\">\n            <span [ngClass]=\"{'icon-arrow-right': paneHidden, 'icon-arrow-left': !paneHidden}\"></span>\n        </div>\n\n        <div class=\"person\" (window:resize)=\"onResize($event)\">\n\n        <!-- \u041B\u0415\u0412\u0410\u042F \u0421\u0422\u0412\u041E\u0420\u041A\u0410: \u041D\u0410\u0427\u0410\u041B\u041E -->\n\n            <div class=\"pane\" [hidden]=\"paneHidden\" [style.width.px]=\"paneWidth\">\n                <div class=\"header\">\n                    <div class=\"header-label\">{{ tab.header }}</div>\n                </div>\n                <div style=\"overflow: scroll; overflow-x: hidden; height: calc(100% - 111px);\n                        border-right: 1px solid #cccccc;\">\n                        <div class = \"person_face\">\n                    <img src=\"\">\n                    <div class=\"view-group\" *ngIf=\"!editEnabled\" style=\"flex-wrap: wrap;margin-top: -1px;\">\n                        <div class=\"view-value name\" style=\"text-transform: uppercase;\"> {{ person.name}}</div>\n                        <div class=\"view-value name\" style=\"font-size: 14pt; margin-top: 3px;\"> {{ person.name}}</div>\n                    </div>\n                    <div class=\"view-group\" *ngIf=\"editEnabled\">\n                        <input type=\"text\" class=\"view-value edit-value name\" [(ngModel)]=\"person.name\">\n                        <div class=\"pensil\" style=\"position: relative; margin-right: 35px;\"></div>\n                    </div>\n                    <div class=\"rate\"></div>\n                </div>\n                <!--<div class=\"pull-container\">\n                    <div class=\"font-sz-2 pull-left\">\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A: <span class=\"color-g1\"><a href=\"\" target=\"_blank\"></a></span></div>\n                    <div class=\"font-sz-1 color-g2 pull-right\"> {{ person.add_date | formatDate }} </div>\n                </div>-->\n                <div class=\"pull-container\" style=\"margin: 20px 10px 0px;\">\n                    <div class=\"pull-right\" [hidden]=\"editEnabled\" (click)=\"toggleEdit()\"><a href=\"#\" >\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C</a></div>\n                    <div class=\"pull-right\" [hidden]=\"!editEnabled\" (click)=\"save()\"><a href=\"#\" >\u0413\u043E\u0442\u043E\u0432\u043E</a></div>\n                </div>\n                <div class=\"person-prop\" [style.height]=\"paneHeight\">\n\n                        <!-- \u0420\u0415\u0416\u0418\u041C \u0420\u0415\u0414\u0410\u041A\u0422\u0418\u0420\u041E\u0412\u0410\u041D\u0418\u042F: \u041D\u0410\u0427\u0410\u041B\u041E -->\n                    <div class=\"edit-block\" [hidden]=\"!editEnabled\" style=\"margin: 10px 10px 10px 0px;\">\n\n                        <div class=\"header_col\">\u041E\u0431\u0449\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</div>\n                        <div class='view_icon' [style.background-image]=\"'url(res/person_icon/category.png)'\"></div>\n                        <div class=\"view-group\">\n                            <span class=\"view-label pull-left\">\u0422\u0438\u043F:</span>\n                            <ui-slidingMenu class=\"view-value edit-value\"\n                                [options] = \"[\n                                    {value: 'NOT', label: '\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D'},\n                                    {value: 'CLIENT', label: '\u041A\u043B\u0438\u0435\u043D\u0442'},\n                                    {value: 'KONK', label: '\u041A\u043E\u043D\u043A\u0443\u0440\u0435\u043D\u0442'},\n                                    {value: 'OUR', label: '\u041D\u0430\u0448\u0430 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044F'},\n                                    {value: 'PARTHER', label: '\u041F\u0430\u0440\u0442\u043D\u0435\u0440'}\n                                ]\"\n                                [value]=\"person.typeCode_n\"\n                                (onChange)=\"person.typeCode_n = $event.selected.value\">\n                            >\n                            </ui-slidingMenu>\n                        </div>\n                        <hr>\n                        <div class='view_icon' [style.background-image]=\"'url(res/user_icon/user.png)'\"></div>\n                        <div class=\"view-group\" style='overflow: hidden; position: relative; display: block;'>\n                            <ui-input-line [placeholder] = \"'\u0424\u0418\u041E:'\" [value] = \"person.name\"\n                                [width] = \"'225px'\" (onChange)= \"person.name = $event\">\n                            </ui-input-line>\n                        </div>\n                        <hr>\n                        <div class='view_icon' [style.background-image]=\"'url(res/user_icon/address.png)'\"></div>\n                        <div class=\"view-group multiselect\" style='height: 30px;'>\n                            <ui-input-line [placeholder] = \"'\u0410\u0434\u0440\u0435\u0441:'\" [value] = \"addressStr\"\n                                [width] = \"'225px'\" (onChange)= \"parseArray($event, personAddress, true)\" [queryTipe]=\"'address'\" (clicked)=\"showMenu($event)\">\n                            </ui-input-line>\n                            <div class='arrow' (click)=\"showMenu($event)\" *ngIf=\"personAddress[0] && personAddress[0].value !== undefined\"></div>\n                            <ui-multiselect class=\"view-value edit-value\" style=\"\"\n                                [options] = \"[\n                                    {value: 'KRAY', label: '\u0420\u0435\u0433\u0438\u043E\u043D'},\n                                    {value: 'CITY', label: '\u041D\u0430\u0441. \u043F\u0443\u043D\u043A\u0442'},\n                                    {value: 'DISTRICT', label: '\u0420\u0430\u0439\u043E\u043D'},\n                                    {value: 'STREET', label: '\u0423\u043B\u0438\u0446\u0430'},\n                                    {value: 'HOUSE', label: '\u0414\u043E\u043C'},\n                                    {value: 'HOUSING', label: '\u041A\u043E\u0440\u043F\u0443\u0441'},\n                                    {value: 'FLAT', label: '\u041A\u0432\u0430\u0440\u0442\u0438\u0440\u0430'}\n                                ]\"\n                                [masks] = \"['','','','','','','']\"\n                                [values]=\"personAddress\"\n                                [width]=\"'36%'\"\n                                (onChange)=\"parseArray($event, personAddress, true)\">\n                            </ui-multiselect>\n                        </div>\n                        <hr>\n                        <div class='view_icon' [style.background-image]=\"'url(res/user_icon/phone.png)'\"></div>\n                        <div class=\"view-group multiply\">\n                            <span class=\"view-label pull-left\">\u0422\u0435\u043B\u0435\u0444\u043E\u043D\u044B:</span>\n                            <div class=\"show_value\">{{\" \"}}</div>\n                            <div class='arrow' (click)=\"showMenu($event)\"></div>\n                            <ui-multiselect class=\"view-value edit-value\" style=\"\"\n                                [options] = \"[\n                                    {value: 'MOBILE', label: '\u041C\u043E\u0431\u0438\u043B\u044C\u043D\u044B\u0439'},\n                                    {value: 'HOME', label: '\u0414\u043E\u043C\u0430\u0448\u043D\u0438\u0439'},\n                                    {value: 'WORK', label: '\u0420\u0430\u0431\u043E\u0447\u0438\u0439'},\n                                    {value: 'MAIN', label: '\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439'},\n                                    {value: 'SAME', label: '\u0414\u0440\u0443\u0433\u043E\u0439'}\n                                ]\"\n                                [masks] = \"['+_ (___) ___-__-__',\n                                            '+_ (____) __-__-__',\n                                            '+_ (___) ___-__-__',\n                                            '+_ (____) ___-___',\n                                            '+_ (____) __-__-__']\"\n                                [values]=\"personPhone\"\n                                [width]=\"'43%'\"\n                                (onChange)=\"parseArray($event, personPhone)\">\n                            </ui-multiselect>\n                        </div>\n                        <hr>\n                        <div class='view_icon' [style.background-image]=\"'url(res/user_icon/email.png)'\"></div>\n                        <div class=\"view-group multiply\">\n                            <span class=\"view-label pull-left\">E-mail:</span>\n                            <div class=\"show_value\">{{\" \"}}</div>\n                            <div class='arrow' (click)=\"showMenu($event)\"></div>\n                            <ui-multiselect class=\"view-value edit-value\" style=\"\"\n                                [options] = \"[\n                                    {value: 'WORK', label: '\u0420\u0430\u0431\u043E\u0447\u0438\u0439'},\n                                    {value: 'MAIN', label: '\u041B\u0438\u0447\u043D\u044B\u0439'}\n                                    ]\"\n                                [masks] = \"['', '']\"\n                                [values]=\"personEmail\"\n                                [width]=\"'36%'\"\n                                (onChange)=\"parseArray($event, personEmail)\">\n                            </ui-multiselect>\n                        </div>\n                        <hr>\n                        <div class='view_icon' [style.background-image]=\"'url(res/user_icon/website.png)'\"></div>\n                        <div class=\"view-group\" style='overflow: hidden; position: relative; display: block;'>\n                            <ui-input-line [placeholder] = \"'WEB-\u0441\u0430\u0439\u0442:'\" [value] = \"person.webSite_n\"\n                                [width] = \"'225px'\" (onChange)= \"person.webSite_n = $event\">\n                            </ui-input-line>\n                        </div>\n\n                        <div class=\"header_col\">\u0421\u043E\u043F\u0440\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</div>\n                        <div class='view_icon' [style.background-image]=\"'url(res/user_icon/user.png)'\"></div>\n                        <div class=\"view-group\">\n                            <span class=\"view-label pull-left\">\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439:</span>\n                            <ui-slidingMenu class=\"view-value edit-value\"\n                                [options] = \"agentOpts\"\n                                [value]=\"agent?.id\"\n                                (onChange)=\"agentChanged($event)\"\n                            >\n                            </ui-slidingMenu>\n                        </div>\n                        <hr>\n                        <div class='view_icon' [style.background-image]=\"'url(res/person_icon/contract.png)'\"></div>\n                        <div class=\"view-group\" style='overflow: hidden; position: relative; display: block;'>\n                                <ui-input-line [placeholder] = \"'\u0414\u043E\u0433\u043E\u0432\u043E\u0440 \u2116 \u043E\u0442'\" [value] = \"person.contract_n\"\n                                        [width] = \"'225px'\" (onChange)= \"person.contract_n = $event\">\n                                </ui-input-line>\n                        </div>\n                        <hr>\n                        <div class='view_icon' [style.background-image]=\"'url(res/user_icon/status.png)'\"></div>\n                        <div class=\"view-group\">\n                            <span class=\"view-label pull-left\">\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435:</span>\n                            <ui-slidingMenu class=\"view-value edit-value\"\n                                [options] = \"[\n                                    {value: 'NOT', label: '\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u043E'},\n                                    {value: 'ACTIVE', label: '\u0410\u043A\u0442\u0438\u0432\u043D\u043E'},\n                                    {value: 'NOT_ACTIVE', label: '\u041D\u0435 \u0430\u043A\u0442\u0438\u0432\u043D\u043E'},\n                                    {value: 'ARCHIVE', label: '\u0410\u0440\u0445\u0438\u0432'}\n                                ]\"\n                                [value]=\"person.stateCode_n\"\n                                (onChange)=\"person.stateCode_n = $event.selected.value\">\n                            >\n                            </ui-slidingMenu>\n                        </div>\n                        <hr>\n                        <div class='view_icon' [style.background-image]=\"'url(res/person_icon/source.png)'\"></div>\n                        <div class=\"view-group\">\n                            <span class=\"view-label pull-left\">\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A:</span>\n                            <ui-slidingMenu class=\"view-value edit-value\"\n                                [options] = \"[\n                                    {value: 'NOT', label: '\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D'},\n                                    {value: 'input', label: '\u0412\u0445\u043E\u0434\u044F\u0449\u0438\u0439 \u0437\u0432\u043E\u043D\u043E\u043A'},\n                                    {value: 'internet', label: '\u0418\u043D\u0442\u0435\u0440\u043D\u0435\u0442'},\n                                    {value: 'print', label: '\u041F\u0435\u0447\u0430\u0442\u043D\u043E\u0435 \u0438\u0437\u0434\u0430\u043D\u0438\u0435'},\n                                    {value: 'spam', label: '\u0420\u0430\u0441\u0441\u044B\u043B\u043A\u0430'},\n                                    {value: 'reccomend_cl', label: '\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u0430'},\n                                    {value: 'reccomend_pt', label: '\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u044F \u043F\u0430\u0440\u043D\u0435\u0440\u0430'},\n                                    {value: 'social', label: '\u0421\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0435\u0442\u0438'},\n                                    {value: 'excelent', label: '\u0423\u0441\u043F\u0435\u0448\u043D\u044B\u0439 \u043E\u043F\u044B\u0442 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u0447\u0435\u0441\u0442\u0432\u0430'},\n                                    {value: 'cold', label: '\u0425\u043E\u043B\u043E\u0434\u043D\u0430\u044F \u0431\u0430\u0437\u0430'}\n                                ]\"\n                                [value]=\"person.sourceCode_n\"\n                                (onChange)=\"person.sourceCode_n = $event.selected.value\">\n                            >\n                            </ui-slidingMenu>\n                        </div>\n                        <hr>\n                        <div class='view_icon' [style.background-image]=\"'url(res/user_icon/office.png)'\"></div>\n                        <div class=\"view-group\" style='position: relative; display: block;'>\n                            <ui-input-line [placeholder] = \"'\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F:'\" [value] = \"person.organisation_n?.name\"\n                                [width] = \"'225px'\" (onChange)= \"person.organisation_n = $event\" [queryTipe]=\"'organisation'\">\n                            </ui-input-line>\n                        </div>\n\n                        <div class=\"header_col\">\u0422\u044D\u0433\u0438</div>\n                        <div style=\"margin: 0 0 20px 20px;\">\n                            <ui-tag-block\n                                [value] = \"person.tag\"\n                                (valueChange) = \"person.tag = $event.value\"\n                            ></ui-tag-block>\n                        </div>\n\n                        <div class=\"header_col\">\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</div>\n                        <div class=\"view-group\" style=\"flex-wrap: wrap; height: 50px; margin-left: 20px;\">\n                            <textarea class=\"view-value text-value\" placeholder=\"\"\n                            [(ngModel)]=\"person.info\" style=\"text-align: left;\"></textarea>\n                        </div>\n\n                    </div>\n\n                        <!-- \u0420\u0415\u0416\u0418\u041C \u0420\u0415\u0414\u0410\u041A\u0422\u0418\u0420\u041E\u0412\u0410\u041D\u0418\u042F: \u041A\u041E\u041D\u0415\u0426 -->\n                        <!-- \u0420\u0415\u0416\u0418\u041C \u041E\u0422\u041E\u0411\u0420\u0410\u0416\u0415\u041D\u0418\u042F: \u041D\u0410\u0427\u0410\u041B\u041E -->\n                    <div class=\"view-block\" [hidden]=\"editEnabled\" style=\"margin: 10px 10px 10px 0px;\">\n                            <div class=\"header_col\">\u041E\u0431\u0449\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</div>\n                            <div class='view_icon' [style.background-image]=\"'url(res/person_icon/category.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u0422\u0438\u043F:</span>\n                                <ui-view-value\n                                    [options] = \"[\n                                        {value: 'NOT', label: '\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D'},\n                                        {value: 'CLIENT', label: '\u041A\u043B\u0438\u0435\u043D\u0442'},\n                                        {value: 'KONK', label: '\u041A\u043E\u043D\u043A\u0443\u0440\u0435\u043D\u0442'},\n                                        {value: 'OUR', label: '\u041D\u0430\u0448\u0430 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044F'},\n                                        {value: 'PARTHER', label: '\u041F\u0430\u0440\u0442\u043D\u0435\u0440'}\n                                    ]\"\n                                    [value]=\"person.typeCode_n\"\n                                >\n                                </ui-view-value>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/user.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u0424\u0418\u041E:</span>\n                                <span class=\"view-value\"> {{ person.name }}</span>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/address.png)'\"></div>\n                            <div class=\"view-group\">\n                                <ui-view-line\n                                    [placeholder]= \"'\u0410\u0434\u0440\u0435\u0441:'\" [value]=\"addressStr\"\n                                >\n                                </ui-view-line>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/phone.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u0422\u0435\u043B\u0435\u0444\u043E\u043D:</span>\n                                <ui-multi-view\n                                    [options] = \"[\n                                        {value: 'MOBILE', label: '\u041C\u043E\u0431\u0438\u043B\u044C\u043D\u044B\u0439'},\n                                        {value: 'HOME', label: '\u0414\u043E\u043C\u0430\u0448\u043D\u0438\u0439'},\n                                        {value: 'WORK', label: '\u0420\u0430\u0431\u043E\u0447\u0438\u0439'},\n                                        {value: 'MAIN', label: '\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439'},\n                                        {value: 'SAME', label: '\u0414\u0440\u0443\u0433\u043E\u0439'}\n                                    ]\"\n                                    [values] = \"[\n                                        {type: getDateUser(personPhone).type, value: getDateUser(personPhone).value}\n                                    ]\"\n                                >\n                                </ui-multi-view>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/email.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">E-mail:</span>\n                                <ui-multi-view\n                                    [options] = \"[\n                                        {value: 'WORK', label: '\u0420\u0430\u0431\u043E\u0447\u0438\u0439'},\n                                        {value: 'MAIN', label: '\u041B\u0438\u0447\u043D\u044B\u0439'}\n                                        ]\"\n                                    [values] = \"[\n                                        {type: getDateUser(personEmail).type, value: getDateUser(personEmail).value}\n                                    ]\"\n                                >\n                                </ui-multi-view>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/website.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">WEB-\u0441\u0430\u0439\u0442:</span>\n                                <span class=\"view-value\">{{person.webSite_n}}</span>\n                            </div>\n\n                            <div class=\"header_col\">\u0421\u043E\u043F\u0440\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</div>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/user.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439:</span>\n                                <span class=\"view-value\">{{ agent?.name }} </span>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/person_icon/contract.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u0414\u043E\u0433\u043E\u0432\u043E\u0440:</span>\n                                <span class=\"view-value\">{{person.contract_n}}</span>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/status.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435:</span>\n                                <ui-view-value\n                                    [options] = \"[\n                                        {value: 'NOT', label: '\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u043E'},\n                                        {value: 'ACTIVE', label: '\u0410\u043A\u0442\u0438\u0432\u043D\u043E'},\n                                        {value: 'NOT_ACTIVE', label: '\u041D\u0435 \u0430\u043A\u0442\u0438\u0432\u043D\u043E'},\n                                        {value: 'ARCHIVE', label: '\u0410\u0440\u0445\u0438\u0432'}\n                                    ]\"\n                                    [value]=\"person.stateCode_n\"\n                                >\n                                </ui-view-value>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/person_icon/source.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A:</span>\n                                <ui-view-value\n                                    [options] = \"[\n                                        {value: 'NOT', label: '\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D'},\n                                        {value: 'input', label: '\u0412\u0445\u043E\u0434\u044F\u0449\u0438\u0439 \u0437\u0432\u043E\u043D\u043E\u043A'},\n                                        {value: 'internet', label: '\u0418\u043D\u0442\u0435\u0440\u043D\u0435\u0442'},\n                                        {value: 'print', label: '\u041F\u0435\u0447\u0430\u0442\u043D\u043E\u0435 \u0438\u0437\u0434\u0430\u043D\u0438\u0435'},\n                                        {value: 'spam', label: '\u0420\u0430\u0441\u0441\u044B\u043B\u043A\u0430'},\n                                        {value: 'reccomend_cl', label: '\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u0430'},\n                                        {value: 'reccomend_pt', label: '\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u044F \u043F\u0430\u0440\u043D\u0435\u0440\u0430'},\n                                        {value: 'social', label: '\u0421\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0435\u0442\u0438'},\n                                        {value: 'excelent', label: '\u0423\u0441\u043F\u0435\u0448\u043D\u044B\u0439 \u043E\u043F\u044B\u0442 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u0447\u0435\u0441\u0442\u0432\u0430'},\n                                        {value: 'cold', label: '\u0425\u043E\u043B\u043E\u0434\u043D\u0430\u044F \u0431\u0430\u0437\u0430'}\n                                    ]\"\n                                    [value]=\"person.sourceCode_n\"\n                                >\n                                </ui-view-value>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/office.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F:</span>\n                                <span class=\"view-value\">\n                                    {{getTypeName(person.organisation_n?.orgName_n)}} &laquo;{{ person.organisation_n?.name }}&raquo;\n                                </span>\n                            </div>\n\n                            <div class=\"header_col\">\u0422\u044D\u0433\u0438</div>\n                            <div style=\"margin: 0 0 20px 20px;\">\n                                <ui-tag-block\n                                    [value] = \"person.tag\"\n                                    (valueChange) = \"person.tag = $event.value\"\n                                ></ui-tag-block>\n                            </div>\n\n                            <div class=\"header_col\">\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</div>\n                            <div class=\"view-group\">\n                                <span class=\"view-value\" style=\"height: initial;\"> {{ person.info }} </span>\n                            </div>\n                    </div>\n                        <!-- \u0420\u0415\u0416\u0418\u041C \u041E\u0422\u041E\u0411\u0420\u0410\u0416\u0415\u041D\u0418\u042F: \u041A\u041E\u041D\u0415\u0426 -->\n\n                </div>\n            </div>\n        </div>\n\n            <!-- \u041B\u0435\u0432\u0430\u044F \u0421\u0422\u0412\u041E\u0420\u041A\u0410: \u041A\u041E\u041D\u0415\u0426 -->\n            <!-- \u0420\u0410\u0411\u041E\u0427\u0410\u042F \u041E\u0411\u041B\u0410\u0421\u0422\u042C: \u041D\u0410\u0427\u0410\u041B\u041E -->\n\n            <div class=\"work-area\" [style.width.px]=\"mapWidth\">\n                <ui-tabs\n                    [headerMode]=\"!paneHidden\"\n                    [iconUrls]=\"['res/main_offers.png', 'res/base.png', 'res/base_plus.png']\"\n                    [iconUrls_active]=\"['res/main_offers_color.png', 'res/base_color.png', 'res/base_plus_color.png']\"\n                >\n                    <ui-tab\n                        [title]=\"'\u0413\u043B\u0430\u0432\u043D\u0430\u044F'\"\n                        (tabSelect)=\"offersSelected()\"\n                    >\n                        <div class=\"\" style=\"position: absolute; top: 15px; left: 15px; z-index: 1;\">\n                            <div class=\"two-way-switch\">\n                                <div [class.active]=\"requestOfferType == 'sale'\" (click)=\"toggleOffer('sale')\">\u041F\u0440\u043E\u0434\u0430\u0436\u0430</div>\n                                <div [class.active]=\"requestOfferType == 'rent'\" (click)=\"toggleOffer('rent')\">\u0410\u0440\u0435\u043D\u0434\u0430</div>\n                            </div>\n                        </div>\n                        <!-- \u0441\u0438\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0434\u0443\u043D\u0441\u0442\u0432\u043E, \u0441\u0432-\u0432\u043E right \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u043C \u0438\u0437 HubService -->\n                        <!-- TODO: \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u044D\u0442\u043E \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u043C \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u043C -->\n                        <div  style=\"position: absolute; top: -31px; z-index: 1; border-left: 1px solid #ccc;\" [style.right]=\"_hubService.shared_var['nb_width']\">\n                            <div style=\"width: 330px; background-color: #fff;\">\n                                <div class=\"header\">\n                                    <input type=\"text\" style=\"width: 280px; margin-left: 10px; border: none;\"\n                                        (keydown)=\"offer_search_keydown($event)\"\n                                    >\n                                    <span class=\"icon-search\" style=\"margin-left: 10px; cursor: pointer;\"\n                                        (click)=\"offer_search()\"\n                                    ></span>\n                                </div>\n\n                                <div class=\"\" style=\"width: 100%; overflow-y: scroll;\" [style.height]=\"paneHeight\">\n                                    <div class=\"button\" (click)=\"createOffer()\">\n                                        \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435\n                                    </div>\n                                    <digest-offer *ngFor=\"let offer of offers\"\n                                      [offer]=\"offer\"\n                                      [compact]=\"true\"\n                                     >\n                                    </digest-offer>\n                                </div>\n                            </div>\n                        </div>\n                        <google-map [latitude]=\"lat\" [longitude]=\"lon\" [objects]=\"offers\" [zoom]=\"zoom\">\n                        </google-map>\n                    </ui-tab>\n                    <ui-tab\n                        [title]=\"'\u0417\u0430\u044F\u0432\u043A\u0438'\"\n                        (tabSelect)=\"requestsSelected()\"\n                    >\n                        <div class=\"\" style=\"margin: 15px;\">\n                            <div class=\"two-way-switch\">\n                                <div [class.active]=\"requestOfferType == 'sale'\" (click)=\"toggleOffer('sale')\">\u041F\u0440\u043E\u0434\u0430\u0436\u0430</div>\n                                <div [class.active]=\"requestOfferType == 'rent'\" (click)=\"toggleOffer('rent')\">\u0410\u0440\u0435\u043D\u0434\u0430</div>\n                            </div>\n                        </div>\n                        <div class=\"\" style=\"max-width: 910px; overflow-y: scroll; \" [style.height]=\"paneHeight\">\n                            <div class=\"button\" (click)=\"createRequest()\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443</div>\n                            <digest-request *ngFor=\"let request of requests\"\n                                [request]=\"request\"\n                            >\n                            </digest-request>\n                        </div>\n                    </ui-tab>\n                    <ui-tab [title]=\"'\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430'\"\n                        (tabSelect)=\"analysisSelected()\"\n                    >\n                        <div class=\"\" style=\"max-width: 910px; overflow-y: scroll;\" [style.height]=\"paneHeight\">\n                            <div style=\"padding: 15px;\">\n                                <div class=\"tile bg-gred fg-white\">\n                                    <div class=\"tile-content iconic\">\n                                        <span class=\"icon\">{{ ch1_data_v1 }}</span>\n                                    </div>\n                                    <span class=\"tile-label\">\u0412\u0441\u0435\u0433\u043E \u0437\u0430\u0434\u0430\u0447</span>\n                                </div>\n                                <div class=\"chart-block\">\n                                    <div class=\"chart-header bg-gred\">\n                                        <span style=\"margin-left: 25px;\">\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C</span>\n                                    </div>\n                                    <div>\n                                        <ui-pie-chart\n                                            [title]=\"''\"\n                                            [data]=\"ch1_data\"\n                                        >\n                                        </ui-pie-chart>\n                                    </div>\n                                </div>\n                            </div>\n                            <div style=\"padding: 15px;\">\n                                <div style=\"float: left; display: flex; flex-direction: column;\">\n                                    <div class=\"tile bg-gorange fg-white\" style=\"margin-bottom: 5px;\">\n                                        <div class=\"tile-content iconic\">\n                                            <span class=\"icon\" style=\"font-size: 48px;\">{{ ch4_data_v1 }}</span>\n                                        </div>\n                                        <span class=\"tile-label\">\u0412\u0441\u0435\u0433\u043E \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0439</span>\n                                    </div>\n                                    <div class=\"tile bg-gorange fg-white\" >\n                                        <div class=\"tile-content iconic\">\n                                            <span class=\"icon\" style=\"font-size: 48px;\">{{ ch4_data_v2 }}</span>\n                                        </div>\n                                        <span class=\"tile-label\">\u041F\u043E\u0442\u0440\u0430\u0447\u0435\u043D\u043E \u0440\u0443\u0431.</span>\n                                    </div>\n                                </div>\n\n                                <div class=\"chart-block\">\n                                    <div class=\"chart-header bg-gorange\">\n                                        <span style=\"margin-left: 25px;\">\u0420\u0435\u043A\u043B\u0430\u043C\u0430</span>\n                                    </div>\n                                    <div>\n                                        <ui-bar-chart\n                                            [title]=\"''\"\n                                            [data]=\"ch4_data\"\n                                        >\n                                        </ui-bar-chart>\n                                    </div>\n                                </div>\n                            </div>\n                            <div style=\"padding: 15px;\">\n                                <div class=\"tile bg-gblue fg-white\">\n                                    <div class=\"tile-content iconic\">\n                                        <span class=\"icon\">{{ ch2_data_v1 }}</span>\n                                    </div>\n                                    <span class=\"tile-label\">\u0412\u0441\u0435\u0433\u043E \u0437\u0430\u044F\u0432\u043E\u043A</span>\n                                </div>\n                                <div class=\"chart-block\">\n                                    <div class=\"chart-header bg-gblue\">\n                                        <span style=\"margin-left: 25px;\">\u0417\u0430\u044F\u0432\u043A\u0438</span>\n                                    </div>\n                                    <div>\n                                        <ui-line-chart\n                                            [title]=\"''\"\n                                            [data]=\"ch2_data\"\n                                        >\n                                        </ui-line-chart>\n                                    </div>\n                                </div>\n                            </div>\n                            <div style=\"padding: 15px;\">\n                                <div style=\"float: left; display: flex; flex-direction: column;\">\n                                    <div class=\"tile bg-ggreen fg-white\" style=\"margin-bottom: 5px;\">\n                                        <div class=\"tile-content iconic\">\n                                            <span class=\"icon\">{{ ch3_data_v1 }}</span>\n                                        </div>\n                                        <span class=\"tile-label\">\u0423\u0441\u043F\u0435\u0448\u043D\u043E</span>\n                                    </div>\n                                    <div class=\"tile bg-ggreen fg-white\">\n                                        <div class=\"tile-content iconic\">\n                                            <span class=\"icon\">{{ ch3_data_v2 }}</span>\n                                        </div>\n                                        <span class=\"tile-label\">\u041D\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E</span>\n                                    </div>\n                                </div>\n                                <div class=\"chart-block\">\n                                    <div class=\"chart-header bg-ggreen\">\n                                        <span style=\"margin-left: 25px;\">\u041F\u043E\u043A\u0430\u0437\u044B</span>\n                                    </div>\n                                    <div>\n                                        <ui-line-chart\n                                            [title]=\"''\"\n                                            [data]=\"ch3_data\"\n                                        >\n                                        </ui-line-chart>\n                                    </div>\n                                </div>\n                            </div>\n\n                        </div>\n                    </ui-tab>\n\n\n                    <!--<ui-tab\n                        [title]=\"'\u0418\u0441\u0442\u043E\u0440\u0438\u044F'\"\n                        (tabSelect)=\"historySelected()\"\n                    >\n                        <div class=\"\" style=\"max-width: 910px; overflow-y: scroll;\" [style.height]=\"paneHeight\">\n                            <digest-history *ngFor=\"let record of historyRecs\"\n                                [historyRecord]=\"record\"\n                            >\n                            </digest-history>\n                        </div>\n                    </ui-tab>-->\n                </ui-tabs>\n            </div>\n            <!-- \u0420\u0410\u0411\u041E\u0427\u0410\u042F \u041E\u0411\u041B\u0410\u0421\u0422\u042C: \u041A\u041E\u041D\u0415\u0426 -->\n      </div>\n    "
    }),
    __metadata("design:paramtypes", [hub_service_1.HubService,
        config_service_1.ConfigService,
        offer_service_1.OfferService,
        request_service_1.RequestService,
        task_service_1.TaskService,
        analysis_service_1.AnalysisService,
        history_service_1.HistoryService,
        person_service_1.PersonService,
        organisation_service_1.OrganisationService,
        user_service_1.UserService,
        session_service_1.SessionService])
], TabPersonComponent);
exports.TabPersonComponent = TabPersonComponent;
//# sourceMappingURL=tab-person.component.js.map