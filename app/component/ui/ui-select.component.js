System.register(['angular2/core'], function(exports_1) {
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
    var core_1, core_2;
    var UISelect;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            }],
        execute: function() {
            UISelect = (function () {
                function UISelect() {
                    this.trick = false;
                    this.hidden = true;
                    this.valueChange = new core_2.EventEmitter();
                }
                UISelect.prototype.toggleHidden = function (e) {
                    this.hidden = !this.hidden;
                    this.trick = true;
                };
                UISelect.prototype.hide = function () {
                    if (!this.trick) {
                        this.hidden = true;
                    }
                    this.trick = false;
                };
                UISelect.prototype.select = function (v) {
                    this.label = v.label;
                    this.hide();
                    this.valueChange.emit({ value: v });
                };
                __decorate([
                    core_2.Output(), 
                    __metadata('design:type', core_2.EventEmitter)
                ], UISelect.prototype, "valueChange", void 0);
                UISelect = __decorate([
                    core_1.Component({
                        selector: 'ui-select',
                        inputs: ['values', 'label', 'config'],
                        template: "\n    <div class=\"ui-select\">\n      <div class=\"dropdown-toggle\" (window:click)=\"hide()\" (click)=\"toggleHidden($event)\">\n        <span *ngIf=\"config?.icon\" class=\"{{ config?.icon }}\"></span>\n       {{ label }}\n        <span *ngIf=\"config?.draw_arrow\" class=\"icon-triangle-down\"></span>\n      </div>\n      <ul class=\"dropdown-menu pull-right\" [hidden]=\"hidden\">\n        <li *ngFor=\"#v of values\"\n          [class.selected]=\"v.label === label\"\n          (click)=\"select(v)\"\n        >\n          <label><span *ngIf=\"v?.icon\" class=\"{{ v?.icon }}\"></span> {{ v.label }} </label>\n        </li>\n      </ul>\n    </div>\n  ",
                        styles: ["\n    .ui-select {\n      position: relative;\n    }\n    .dropdown-menu {\n      position: absolute;\n      top: 100%;\n      left: 0;\n      z-index: 1000;\n      float: left;\n      min-width: 160px;\n      padding: 5px 0;\n      margin: 2px 0 0;\n      font-size: 14px;\n      list-style: none;\n      background-color: #fff;\n      border: 1px solid #ccc;\n      border: 1px solid rgba(0,0,0,0.15);\n      background-clip: padding-box;\n    }\n    .dropdown-menu.pull-right {\n      right: 0;\n      left: auto;\n    }\n\n    .dropdown-toggle {\n      display: inline-block;\n      width: 100%;\n      height: 100%;\n\n      max-width: 200px;\n      white-space: nowrap;\n      overflow: hidden;\n\n      text-align: right;\n\n      background: #fff;\n      cursor: pointer;\n    }\n    .dropdown-menu>li>label {\n        display: block;\n        padding: 3px 20px;\n        clear: both;\n        font-weight: 400;\n        line-height: 1.42857143;\n        color: #333;\n        white-space: nowrap;\n    }\n    .dropdown-menu>li:hover {\n      background-color: #efefef;\n    }\n    .dropdown-menu>li.selected>label {\n      background-color: #3366CC;\n      color: #fff;\n    }\n\n    .inline {\n      width: 120px;\n      display: inline-block;\n    }\n\n    .inline > .dropdown-toggle {\n      font-weight: 200;\n      font-size: 14;\n    }\n  "]
                    }), 
                    __metadata('design:paramtypes', [])
                ], UISelect);
                return UISelect;
            }());
            exports_1("UISelect", UISelect);
        }
    }
});
//# sourceMappingURL=ui-select.component.js.map