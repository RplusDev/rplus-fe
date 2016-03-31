import {Component} from 'angular2/core';


import {HubService} from '../../service/hub.service';
import {ConfigService} from '../../service/config.service';
import {RealtyService} from '../../service/realty.service';
import {RequestService} from '../../service/request.service';
import {TaskService} from '../../service/task.service';
import {HistoryService} from '../../service/history.service'

import {AnalysisService} from '../../service/analysis.service'
import {Tab} from '../../class/tab';
import {Realty} from '../../class/realty';
import {Request} from '../../class/request';
import {Task} from '../../class/task';
import {HistoryRecord} from '../../class/historyRecord';

import {UISelect} from '../ui/ui-select.component';
import {UICarousel} from '../ui/ui-carousel.component';
import {UITagBlock} from '../ui/ui-tag-block.component';
import {UITabs} from '../ui/ui-tabs.component';
import {UITab} from '../ui/ui-tab.component';
import {UIPieChart} from '../ui/ui-pie-chart.component';
import {UILineChart} from '../ui/ui-line-chart.component';
import {UIBarChart} from '../ui/ui-bar-chart.component';

import {RealtyDigestComponent} from '../digest/realty-digest.component';
import {RequestDigestComponent} from '../digest/request-digest.component';
import {HistoryDigestComponent} from '../digest/history-digest.component';
import {GoogleMapComponent, GoogleMapMarkerComponent} from '../google-map.component';


@Component({
    selector: 'tab-realty',
    inputs: ['tab'],
    directives: [RealtyDigestComponent, RequestDigestComponent, HistoryDigestComponent, GoogleMapComponent, GoogleMapMarkerComponent, UISelect, UICarousel, UITagBlock, UITabs, UITab, UIPieChart, UILineChart, UIBarChart],
    template: `

      <div class="tab-button fixed-button" (click)="toggleLeftPane()">
        <span [ngClass]="{'icon-arrow-right': pane_hidden, 'icon-arrow-left': !pane_hidden}"></span>
      </div>

      <div class="realty" (window:resize)="onResize($event)">

    <!-- ПРАВАЯ СТВОРКА: НАЧАЛО -->

        <div class="pane" [hidden]="pane_hidden" [style.width.px]="pane_width">
          <div class="header">
            <div class="header-label">
              {{ tab.header }}
            </div>
          </div>
          <div class="realty-prop" [style.height]="pane_height">

            <div style="margin: 5px;">

              <div class="pull-container">
                <div class="font-sz-2 pull-left">Источник: <span class="color-g1"><a href="" target="_blank">{{ realty.source_media }}</a></span></div>
                <div class="font-sz-1 color-g2 pull-right"> {{realty.last_seen_date }} </div>
              </div>
              <div class="font-sz-2 color-g2 line-clamp line-clamp-2" style="margin: 5px 5px 0 5px;">{{ realty.source_media_text }}</div>

              <hr>

              <div class="pull-container" style="margin: 0 10px;">
                <div class="pull-right" [hidden]="edit_enabled" (click)="toggleEdit()"><a href="#" >Изменить</a></div>
                <div class="pull-right" [hidden]="!edit_enabled" (click)="save()"><a href="#" >Готово</a></div>
              </div>

          <!-- РЕЖИМ РЕДАКТИРОВАНИЯ: НАЧАЛО -->

              <div class="edit-block" [hidden]="!edit_enabled" style="margin: 20px 10px;">

                <div class="view-group">
                  <span class="view-label">Ответственный</span>
                  <ui-select class="view-value edit-value"
                    [values] = "[
                      {val: 1, label: 'Агент 1_1'},
                      {val: 2, label: 'Агент 1_2'},
                      {val: 3, label: 'Агент 1_3'},
                      {val: 4, label: 'Агент 1_4'},
                      {val: 5, label: 'Агент 1_5'}
                    ]"
                    [label]="'Агент 1_1'"
                    (valueChange)="log($event)"
                  >
                  </ui-select>
                </div>

                <div class="view-group">
                  <span class="view-label">Статус</span>
                  <ui-select class="view-value edit-value"
                    [values] = "[
                      {val: 1, label: 'Не активен'},
                      {val: 2, label: 'Активен'},
                      {val: 3, label: 'В работе'},
                      {val: 4, label: 'Приостановлен'},
                      {val: 5, label: 'Архив'}
                    ]"
                    [label]="realty.state_code"
                    (valueChange)="realty.state_code = $event.value.label"
                  >
                  </ui-select>
                </div>

                <div class="view-group">
                  <span class="view-label">Стадия</span>
                  <ui-select class="view-value edit-value"
                    [values] = "[
                      {val: 1, label: 'Первичный контакт'},
                      {val: 2, label: 'Заключение договора'},
                      {val: 3, label: 'Показ'},
                      {val: 4, label: 'Подготовка договора'},
                      {val: 5, label: 'Принятие решения'},
                      {val: 6, label: 'Переговоры'},
                      {val: 7, label: 'Сделка'}
                    ]"
                    [label]="'Первичный контакт'"
                    (valueChange)="realty.stage = $event.value.label"
                  >
                  </ui-select>
                </div>

                <div class="view-group">
                  <span class="view-label">Собственник</span>
                  <span class="view-value"> Иван Иванович</span>
                </div>

                <div class="view-group">
                  <span class="view-label pull-left"></span>
                  <span class="view-value"> (929)9292929, 929292</span>
                </div>

                <div class="view-group">
                  <span class="view-label pull-left">Договор</span>
                  <span class="view-value"> #4242421365 от 08.02.22</span>
                </div>

                <br>

                <div class="view-group">
                  <span class="view-label pull-left">Предложение</span>
                  <ui-select class="view-value edit-value"
                    [values] = "[
                      {val: 1, label: 'Продажа'},
                      {val: 2, label: 'Аренда'}
                    ]"
                    [label]="realty.offer_type_code"
                    (valueChange)="realty.offer_type_code = $event.value.label"
                  >
                  </ui-select>
                </div>

                <div class="view-group">
                  <span class="view-label">Тип недвижимости</span>
                  <ui-select class="view-value edit-value"
                    [values] = "[
                      {val: 1, label: 'Комната'},
                      {val: 2, label: 'Квартира'},
                      {val: 3, label: 'Дом'},
                      {val: 4, label: 'Таунхаус'}
                    ]"
                    [label]="realty.type_code"
                    (valueChange)="realty.type_code = $event.value.label"
                  >
                  </ui-select>
                </div>


                <div class="view-group">
                  <span class="view-label">Адрес</span>
                  <input type="text" class="view-value edit-value" [(ngModel)]="realty.address">
                </div>

                <div class="view-group">
                  <span class="view-label">Номер</span>
                  <input class="view-value edit-value vv-2">/
                  <input class="view-value edit-value vv-2">
                </div>

                <div class="view-group">
                  <span class="view-label">Планировка</span>
                  <ui-select class="view-value edit-value"
                    [values] = "[
                      {val: 1, label: 'Индивидуальная'},
                      {val: 2, label: 'Новая'},
                      {val: 3, label: 'Общежитие'},
                      {val: 4, label: 'Сталинка'},
                      {val: 5, label: 'Улучшенная'},
                      {val: 6, label: 'Хрущевка'}
                    ]"
                    [label]="realty.ap_scheme"
                    (valueChange)="realty.ap_scheme = $event.value.label"
                  >
                  </ui-select>
                </div>

                <div class="view-group">
                  <span class="view-label">Материал стен</span>
                  <ui-select class="view-value edit-value"
                    [values] = "[
                      {val: 1, label: 'Брус'},
                      {val: 2, label: 'Деревянный'},
                      {val: 3, label: 'Каркасно-засыпной'},
                      {val: 4, label: 'Кирпичный'}
                    ]"
                    [label]="realty.house_type"
                    (valueChange)="realty.house_type = $event.value.label"
                  >
                  </ui-select>
                </div>

                <div class="view-group">
                  <span class="view-label">Количество комнат</span>
                  <input type="number" class="view-value edit-value vv-2" [(ngModel)]="realty.rooms_offer_count">/
                  <input type="number" class="view-value edit-value vv-2" [(ngModel)]="realty.rooms_count">
                </div>

                <div class="view-group">
                  <span class="view-label">Тип комнаты</span>
                  <ui-select class="view-value edit-value"
                    [values] = "[
                      {val: 1, label: 'Икарус'},
                      {val: 2, label: 'Кухня-гостинная'},
                      {val: 3, label: 'Раздельные'},
                      {val: 4, label: 'Смежно-раздельные'},
                      {val: 5, label: 'Смежные'},
                      {val: 6, label: 'Студия'}
                    ]"
                    [label]="realty.room_scheme"
                    (valueChange)="realty.room_scheme = $event.value.label"
                  >
                  </ui-select>
                </div>

                <div class="view-group">
                  <span class="view-label">Этаж</span>
                  <input class="view-value edit-value vv-3" [(ngModel)]="realty.floor">/
                  <input class="view-value edit-value vv-3" [(ngModel)]="realty.floors_count">/
                  <input class="view-value edit-value vv-3" [(ngModel)]="realty.levels_count">
                </div>

                <div class="view-group">
                  <span class="view-label">Площадь</span>
                  <input class="view-value edit-value vv-3" [(ngModel)]="realty.square_total">/
                  <input class="view-value edit-value vv-3" [(ngModel)]="realty.square_living">/
                  <input class="view-value edit-value vv-3" [(ngModel)]="realty.square_kitchen">
                </div>

                <div class="view-group">
                  <span class="view-label">Балкон</span>
                  <ui-select class="view-value edit-value"
                    [values] = "[
                      {val: 1, label: 'без балкона'},
                      {val: 2, label: 'балкон'},
                      {val: 3, label: 'лоджия'},
                      {val: 4, label: '2 балкона'},
                      {val: 5, label: '2 лоджии'},
                      {val: 6, label: 'балкон и лоджия'},
                      {val: 7, label: 'балкон застеклен'},
                      {val: 8, label: 'лоджия застеклена'}
                    ]"
                    [label]="realty.balcony"
                    (valueChange)="realty.balcony = $event.value.label"
                  >
                  </ui-select>
                </div>

                <div class="view-group">
                  <span class="view-label">Санузел</span>
                  <ui-select class="view-value edit-value"
                    [values] = "[
                      {val: 1, label: 'без удобств'},
                      {val: 2, label: 'туалет'},
                      {val: 3, label: 'с удобствами'},
                      {val: 4, label: 'душ и туалет'},
                      {val: 5, label: '2 смежных санузла'},
                      {val: 6, label: '2 раздельных санузла'},
                      {val: 7, label: 'санузел совмещенный'},
                      {val: 8, label: 'санузел раздельный'}
                    ]"
                    [value]="realty.bathroom"
                    (valueChange)="realty.bathroom = $event.value.label"
                  >
                  </ui-select>
                </div>

                <div class="view-group">
                  <span class="view-label">Состояние</span>
                  <ui-select class="view-value edit-value"
                    [values] = "[
                      {val: 1, label: 'социальный ремонт'},
                      {val: 2, label: 'сделан ремонт'},
                      {val: 3, label: 'дизайнерский ремонт'},
                      {val: 4, label: 'требуется ремонт'},
                      {val: 5, label: 'требуется косм. ремонт'},
                      {val: 6, label: 'после строителей'},
                      {val: 7, label: 'евроремонт'},
                      {val: 8, label: 'удовлетворительное'},
                      {val: 9, label: 'нормальное'}
                    ]"
                    [label]="realty.condition"
                    (valueChange)="realty.condition = $event.value.label"
                  >
                  </ui-select>
                </div>

                <div class="view-group">
                  <span class="view-label">Цена</span>
                  <input class="view-value edit-value vv-2" [(ngModel)]="realty.owner_price">/
                  <input class="view-value edit-value vv-2" [(ngModel)]="realty.agency_price">
                </div>

                <div class="view-group" style="flex-wrap: wrap;">
                  <span class="view-label">Описание</span>
                  <textarea class="view-value text-value" placeholder="" [(ngModel)]="realty.description" style="text-align: left;"></textarea>
                </div>

              </div>

          <!-- РЕЖИМ РЕДАКТИРОВАНИЯ: НАЧАЛО -->
          <!-- РЕЖИМ ОТОБРАЖЕНИЯ: НАЧАЛО -->

              <div class="view-block" [hidden]="edit_enabled" style="margin: 20px 10px;">

                <div class="view-group">
                  <span class="view-label">Ответственный</span>
                  <span class="view-value"> Агент 1_1</span>
                </div>
                <div class="view-group">
                  <span class="view-label">Статус</span>
                  <span class="view-value"> {{ realty.state_code }} </span>
                </div>
                <div class="view-group">
                  <span class="view-label">Стадия</span>
                  <span class="view-value"> {{ realty.stage }} </span>
                </div>
                <div class="view-group">
                  <span class="view-label">Собственник</span>
                  <span class="view-value"> Иван Иванович</span>
                </div>

                <div class="view-group">
                  <span class="view-label pull-left"></span>
                  <span class="view-value"> (929)9292929, 929292</span>
                </div>

                <div class="view-group">
                  <span class="view-label pull-left">Договор</span>
                  <span class="view-value"> #4242421365 от 08.02.22</span>
                </div>

                <br>

                <div class="view-group">
                  <span class="view-label pull-left">Предложение</span>
                  <span class="view-value"> {{ realty.offer_type_code }} </span>
                </div>

                <div class="view-group">
                  <span class="view-label pull-left">Тип недвижимости</span>
                  <span class="view-value"> {{ realty.type_code }} </span>
                </div>

                <div class="view-group">
                  <span class="view-label pull-left">Адрес</span>
                  <span class="view-value"> {{ realty.address }} </span>
                </div>

                <div class="view-group">
                  <span class="view-label pull-left">Планировка</span>
                  <span class="view-value"> {{ realty.ap_scheme }} </span>
                </div>

                <div class="view-group">
                  <span class="view-label pull-left">Материал стен</span>
                  <span class="view-value"> {{ realty.house_type }} </span>
                </div>

                <div class="view-group">
                  <span class="view-label pull-left">Количество комнат</span>
                  <span class="view-value"> {{ realty.rooms_count }} </span>
                </div>

                <div class="view-group">
                  <span class="view-label pull-left">Тип комнат</span>
                  <span class="view-value"> {{ realty.room_scheme }} </span>
                </div>

                <div class="view-group">
                  <span class="view-label pull-left">Этаж</span>
                  <span class="view-value"> {{ realty.floor }} </span>
                </div>

                <div class="view-group">
                  <span class="view-label pull-left">Площадь</span>
                  <span class="view-value"> {{ realty.sqare_total }} </span>
                </div>

                <div class="view-group">
                  <span class="view-label pull-left">Балкон</span>
                  <span class="view-value"> {{ realty.balcony }} </span>
                </div>

                <div class="view-group">
                  <span class="view-label pull-left">Санузел</span>
                  <span class="view-value"> {{ realty.bathroom }} </span>
                </div>

                <div class="view-group">
                  <span class="view-label pull-left">Состояние</span>
                  <span class="view-value"> {{ realty.condition }} </span>
                </div>

                <div class="view-group">
                  <span class="view-label pull-left">Цена</span>
                  <span class="color-attention view-value"> {{ realty.owner_price }} тыс. руб.</span>
                </div>

                <div class="view-group">
                  <span class="view-label pull-left">Описание</span>
                  <span class="view-value" style="height: initial;"> {{ realty.description }} </span>
                </div>

              </div>

          <!-- РЕЖИМ ОТОБРАЖЕНИЯ: КОНЕЦ -->

              <div style="margin-bottom: 20px;">
                <div class="view-group">
                  <span class="icon-tag"> Тэги</span>
                </div>
                <ui-tag-block
                  [value] = "realty.tag"
                  (valueChange) = "realty.tag = $event.value"
                ></ui-tag-block>
              </div>

              <div style="margin-bottom: 20px;">
                <div class="view-group">
                  <span class="icon-photo"> Фотографии</span>
                </div>
                <ui-carousel
                  [photos] = "realty.photos"
                >
                </ui-carousel>
              </div>

            </div>
          </div>
        </div>

    <!-- ПРАВАЯ СТВОРКА: КОНЕЦ -->
    <!-- РАБОЧАЯ ОБЛАСТЬ: НАЧАЛО -->

        <div class="work-area" [style.width.px]="map_width">
          <ui-tabs
            [header_mode]="!pane_hidden"
          >
            <ui-tab
              [title]="'Карта'"
            >
              <google-map [latitude]="lat" [longitude]="lon" [zoom]="zoom">
                <google-map-marker
                  *ngIf="realty.location"
                  (click)="log($event)"
                  [latitude]="parseFloat(realty.location.lat)"
                  [longitude]="parseFloat(realty.location.lon)"
                  [info_str]="">
                </google-map-marker>
              </google-map>
            </ui-tab>

            <ui-tab
              [title]="'Похожие объекты'"
              (tabSelect)="similarObjSelected()"
            >
              <!-- сильное колдунство, св-во right получаем из HubService -->
              <!-- TODO: сделать это отдельным компонентом -->
              <div  style="position: absolute; top: -31px; z-index: 1; border-left: 1px solid #ccc;" [style.right]="_hubService.shared_var['nb_width']">
                <div style="width: 330px; background-color: #fff;">
                  <div class="header">
                    <input type="text" style="width: 280px; margin-left: 10px; border: none;"
                      (keydown)="sim_search_keydown($event)"
                     >
                     <span class="icon-search" style="margin-left: 10px; cursor: pointer;"
                       (click)="sim_search()"
                     ></span>
                  </div>
                  <div class="" style="width: 100%; overflow-y: scroll;" [style.height]="pane_height">
                    <reaty-digest *ngFor="#realty of similar_realty"
                      [realty]="realty"
                      [compact]="true"
                     >
                    </reaty-digest>
                  </div>
                </div>
              </div>
              <google-map [latitude]="lat" [longitude]="lon" [zoom]="zoom">

                <t *ngFor="#r of similar_realty">
                <google-map-marker
     	            *ngIf="r.location"
                  (click)="markerClick(r)"
                  [is_selected]="r.selected"
                  [latitude]="parseFloat(r.location.lat)"
                  [longitude]="parseFloat(r.location.lon)"
                  [info_str]="getRealtyDigest(r)">
                  [icon_id]="1"
                </google-map-marker>
                </t>

                <google-map-marker
                  *ngIf="realty.location"
                  (markerClick)="markerClick(realty)"
                  [latitude]="parseFloat(realty.location.lat)"
                  [longitude]="parseFloat(realty.location.lon)"
                  [info_str]=""
                >
                </google-map-marker>
              </google-map>
            </ui-tab>
            <ui-tab
              [title]="'Заявки'"
              (tabSelect)="requestsSelected()"
            >
              <div class="" style="max-width: 910px; overflow-y: scroll;" [style.height]="pane_height">
                <request-digest *ngFor="#request of requests"
                  [request]="request"
                >
                </request-digest>
              </div>
            </ui-tab>
            <ui-tab [title]="'Аналитика'"
              (tabSelect)="analysisSelected()"
            >
              <div class="" style="max-width: 910px; overflow-y: scroll;" [style.height]="pane_height">
                <div style="padding: 15px;">
                  <div class="tile bg-gred fg-white">
                    <div class="tile-content iconic">
                        <span class="icon">{{ ch1_data_v1 }}</span>
                    </div>
                    <span class="tile-label">Всего задач</span>
                  </div>
                  <div class="chart-block">
                    <div class="chart-header bg-gred">
                      <span style="margin-left: 25px;">Активность</span>
                    </div>
                    <div>
                      <ui-pie-chart
                        [title]="''"
                        [data]="ch1_data"
                      >
                      </ui-pie-chart>
                    </div>
                  </div>
                </div>

                <div style="padding: 15px;">

                  <div style="float: left; display: flex; flex-direction: column;">
                    <div class="tile bg-gorange fg-white" style="margin-bottom: 5px;">
                      <div class="tile-content iconic">
                          <span class="icon" style="font-size: 48px;">{{ ch4_data_v1 }}</span>
                      </div>
                      <span class="tile-label">Всего объявлений</span>
                    </div>
                    <div class="tile bg-gorange fg-white" >
                      <div class="tile-content iconic">
                          <span class="icon" style="font-size: 48px;">{{ ch4_data_v2 }}</span>
                      </div>
                      <span class="tile-label">Потрачено руб.</span>
                    </div>
                  </div>

                  <div class="chart-block">
                    <div class="chart-header bg-gorange">
                      <span style="margin-left: 25px;">Реклама</span>
                    </div>
                    <div>
                      <ui-bar-chart
                        [title]="''"
                        [data]="ch4_data"
                      >
                      </ui-bar-chart>
                    </div>
                  </div>
                </div>

                <div style="padding: 15px;">
                  <div class="tile bg-gblue fg-white">
                    <div class="tile-content iconic">
                        <span class="icon">{{ ch2_data_v1 }}</span>
                    </div>
                    <span class="tile-label">Всего заявок</span>
                  </div>
                  <div class="chart-block">
                    <div class="chart-header bg-gblue">
                      <span style="margin-left: 25px;">Заявки</span>
                    </div>
                    <div>
                      <ui-line-chart
                        [title]="''"
                        [data]="ch2_data"
                      >
                      </ui-line-chart>
                    </div>
                  </div>
                </div>


                <div style="padding: 15px;">
                  <div style="float: left; display: flex; flex-direction: column;">
                    <div class="tile bg-ggreen fg-white" style="margin-bottom: 5px;">
                      <div class="tile-content iconic">
                        <span class="icon">{{ ch3_data_v1 }}</span>
                      </div>
                      <span class="tile-label">Успешно</span>
                    </div>
                    <div class="tile bg-ggreen fg-white">
                      <div class="tile-content iconic">
                        <span class="icon">{{ ch3_data_v2 }}</span>
                      </div>
                      <span class="tile-label">Не успешно</span>
                    </div>
                  </div>
                  <div class="chart-block">
                    <div class="chart-header bg-ggreen">
                      <span style="margin-left: 25px;">Показы</span>
                    </div>
                    <div>
                      <ui-line-chart
                        [title]="''"
                        [data]="ch3_data"
                      >
                      </ui-line-chart>
                    </div>
                  </div>
                </div>

              </div>
            </ui-tab>
            <ui-tab
              [title]="'История'"
              (tabSelect)="historySelected()"
            >

              <div class="" style="max-width: 910px; overflow-y: scroll;" [style.height]="pane_height">
                <history-digest *ngFor="#record of history_recs"
                  [history_record]="record"
                >
                </history-digest>
              </div>

            </ui-tab>
          </ui-tabs>

        </div>

    <!-- РАБОЧАЯ ОБЛАСТЬ: КОНЕЦ -->

      </div>
    `,
    styles: [`

      .pane {
        float: left;
        width: 370px;
        height: 100%;
        border-right: 1px solid #ccc;
      }
      .work-area {
        float: left;
        width: 100%;
        height: 100%;
      }
      .tab-button {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 12px !important;
        cursor: pointer;
        color: #666;
      }
      .fixed-button {
        position: fixed;
        top: 0;
        left: 0;
      }
      .sebm-google-map-container {
        height: 100%;
      }
      .realty-prop {
        overflow-y: scroll;
      }

      .view-group {
        margin-bottom: 5px;

        display: flex;
        justify-content: space-between;

      }
      .view-label {
        white-space: nowrap;
        color: #bbb;

        font-size: 15;
      }
      .view-value {
        width: 100%;;
        text-align: right;
        color: #696969;
        font-size: 15;

        height: 19px; /* костыль */
      }
      .edit-value {
        width: 100%;;
        text-align: right;
        color: #696969;
        font-size: 15;

        height: 19px; /* костыль */

        border: none !important;
        border-bottom: 1px solid #E5E5E5 !important;
      }

      .text-value {
        height: 3rem;
        border: 1px solid #E5E5E5 !important;
      }

      .edit-block > .view-group {
        margin-bottom: 26px;
      }

      .tile-x {
        margin-right: 10px;
        width: 150px;
        height: 150px;
        color: #fff;
        position: relative;
      }


      .tile {
        margin: 0;
        margin-right: 10px;
      }
      .icon {
        line-height: 64px;
      }
      .tile-content.iconic .icon {
        width: 128px;
        margin-left: -64px;
      }
      .chart-block {
        overflow:hidden;
        border: 1px solid #e5e5e5;
      }
      .chart-header {
        width: 100%;
        height: 30px;
        border-bottom: 1px solid #e5e5e5;
        line-height: 30px;
        color: #fff;
      }
    `]
})

export class TabRealtyComponent {
    public tab: Tab;
    public realty: Realty;

    similar_realty: Realty[];
    requests: Request[];
    history_recs: HistoryRecord[];

    pane_hidden: boolean = false;
    pane_height: number;
    pane_width: number;
    map_width: number;

    edit_enabled: boolean = false;

    lat: number = 48.480007;
    lon: number = 135.054954;
    zoom: number = 16;

    ch1_data: any[] = [];
    ch2_data: any[] = [];
    ch3_data: any[] = [];

    ch4_data: any[] = [];

    ch1_data_v1: number;
    ch2_data_v1: number;
    ch3_data_v1: number;
    ch3_data_v2: number;
    ch4_data_v1: number;
    ch4_data_v2: number;

    log(e) {
        console.log(e);
    }
    parseFloat(v: any) {    // сделать пайп
        return parseFloat(v);
    }

    constructor(private _hubService: HubService, private _configService: ConfigService, private _realtyService: RealtyService, private _requestService: RequestService, private _taskService: TaskService, private _analysisService: AnalysisService, private _historyService: HistoryService) {
      setTimeout(() => { this.tab.header = 'Объект' });
    }

    ngOnInit() {
        this.realty = this.tab.args.realty;

        if (this.realty.location) {
            this.lat = parseFloat(this.realty.location.lat);
            this.lon = parseFloat(this.realty.location.lon);
        }

        this.calcSize();
    }

    onResize(e) {
        this.calcSize();
    }

    calcSize() {
        if (this.pane_hidden) {
            this.pane_width = 0;
        } else {
            this.pane_width = 420;
        }
        this.map_width = document.body.clientWidth - (30 * 2) - this.pane_width;
        this.pane_height = document.body.clientHeight - 31;
    }

    toggleLeftPane() {
        this.pane_hidden = !this.pane_hidden;
        this.calcSize();
    }

    toggleEdit() {
        this.edit_enabled = !this.edit_enabled;
    }

    save() {
      this._realtyService.updateRealty(this.realty).then(realty => {
        console.log(realty);
        this.toggleEdit();
      });
    }

    similarObjSelected() {
        this.getSimilarRealty(1, 16);
    }

    requestsSelected() {
        this.requests = this._requestService.getRequest(1, 16);
    }

    analysisSelected() {
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
    }

    historySelected() {
      this.history_recs = this._historyService.getObjHistory();
    }

    getSimilarRealty(page, per_page) {
      this.similar_realty = this._realtyService.getSimilarRealty(page, per_page);
    }

    sim_search() {
      this.getSimilarRealty(Math.floor(Math.random() * 4), 16);
    }

    sim_search_keydown(e: KeyboardEvent) {
      if (e.keyCode == 13) {
        this.sim_search();
      }
    }

    markerClick(r: Realty) {
      console.log('markerClick');
      console.log(r);
      r.selected = !r.selected;
      // scroll to object ???
    }

    getRealtyDigest(r: Realty) {
      return Realty.getDigest(r);
    }
}
