import {Component, OnInit} from '@angular/core';

import {HubService} from '../../service/hub.service'

import {Offer} from '../../class/offer';



@Component({
    selector: 'digest-offer',
    inputs: ['offer', 'compact'],
    styles: [`
        .billet {
            background-color: inherit;
            color: #696969;
            font-weight: 200;
            font-size: 14px;
            position: relative;
            padding-top: 5px;
        }
        
        .billet.selected {
            background-color: #157ad3;
            color: #fff !important;
        }
        
        .healthbar {
            height: 1px;
            width: 95%;
            margin: 5px 0 0 5px;
            background: #ccc;
            position: relative;
        }
        
        .healthbar > .health {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 0%;
            background-color: red;
        }
        
        .timestamp {
            position: absolute;
            top: 6px; right: 6px;
            font-size: 11px;
            color: #bbb;
        }
        
        .owner {
            color: #bbb;
        }
        
        .tag-mark {
            position: absolute;
            right: 10px;
            top: 40%;
        }
    `],
    template: `
        <div class="billet" data-id="r{{offer._id}}" id="r{{offer.id}}"
            [class.selected]="selected"
            (click)="select()"
            (dblclick)="open()"
            (touchstart)="tStart()"
            (touchend)="tEnd()"
        >
            <div style="width: 100%;">
                <div class="timestamp"> {{ offer.changeDate | formatDate }} </div>
                <div class="tag-mark">
                    <ui-tag
                        [value]="offer.tag"
                    >
                    </ui-tag>
                </div>
                <img *ngIf="!compact" src="{{ offer.photoUrl?offer.photoUrl[0]:'res/no_photo.png' }}" style="height: 60px; min-width: 80px; float: left; margin: 10px;">
                <div class="" style="min-height: 70px; margin-left: 10px;">
                    <span style="font-weight: 400;">{{ typeCodeOptions[offer.typeCode] }}</span>, {{ offer.roomsCount }} комн., {{ offer.floor }} эт., {{ offer.squareTotal }} кв. м.
                    <br> {{ (offer.address | strNn) + " " + (offer.houseNum | strNn) }} <br>
                    <span class="text-primary">{{ offer.ownerPrice }} тыс. руб.</span>, <br>
                    <span class="owner">Собственник </span>
                </div>
                <div class="healthbar">
                    <div class="health"></div>
                </div>
            </div>
        </div>
    `
})

export class DigestOfferComponent implements OnInit {
    PHOTO_STORAGE_URL = 'http://localhost:4567/photo_storage/';

    public offer: Offer;
    public compact: boolean = false;

    private selected: boolean = false;
    private to: any;

    typeCodeOptions = {
        room: 'Комната',
        apartment: 'Квартира',
        apartment_small: 'Малосемейка',
        apartment_new: 'Новостройка',

        house: 'Дом',
        dacha: 'Дача',
        cottage: 'Коттедж',

        townhouse: 'Таунхаус',

        other: 'Другое',
        land: 'Земля',

        building: 'здание',
        office_place: 'офис',
        office: 'офис',
        market_place: 'торговая площадь',
        production_place: 'производственное помещение',
        gpurpose_place: 'помещение общего назначения',
        autoservice_place: 'автосервис',
        service_place: 'помещение под сферу услуг',
        warehouse_place: 'склад база',
        garage: 'гараж'
    };

    constructor(private _hubService: HubService) { };

    ngOnInit() { }

    select() {
        this.selected = !this.selected;
    }

    open() {
        this.selected = true;
        var tabSys = this._hubService.getProperty('tab_sys');
        tabSys.addTab('offer', {offer: this.offer});
    }

    tStart() {
        clearTimeout(this.to);
        this.to = setTimeout(() => {
            this.open();
        }, 1000);
    }

    tEnd() {
        clearTimeout(this.to);
    }

}
