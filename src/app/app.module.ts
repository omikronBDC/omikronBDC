import { MapPage } from './../pages/map/map';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, MenuController } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ForgotPage } from '../pages/forgot/forgot';
import { SignupPage } from '../pages/signup/signup';
import { SearchPage } from '../pages/search/search';
import { ChatlistPage } from '../pages/chatlist/chatlist';
import { ChatdetailsPage } from '../pages/chatdetails/chatdetails';
import { ProfilePage } from '../pages/profile/profile';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { TermsPage } from '../pages/terms/terms';
import { SettingsPage } from '../pages/settings/settings';
import { NewsfeedPage } from '../pages/newsfeed/newsfeed';
import { CategoriesPage } from '../pages/categories/categories';
import { LocationPage } from '../pages/location/location';
import { AddBusinessPage } from '../pages/add-business/add-business';
import { MembershipPage } from '../pages/membership/membership';
import { CategoryPage } from '../pages/category/category';
import { DetailsPage } from '../pages/details/details';
import { ClientPage } from '../pages/client/client';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AddclientPage } from '../pages/addclient/addclient';
import { PlaceorderPage } from '../pages/placeorder/placeorder';
import { NextvisitPage } from '../pages/nextvisit/nextvisit';
import { ProductlistPage } from '../pages/productlist/productlist';
import { AddclientinfoPage } from '../pages/addclientinfo/addclientinfo';
import { ProductPage } from '../pages/product/product';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { PivacyPage } from '../pages/pivacy/pivacy';
import { AboutPage } from '../pages/about/about';
import { NewsPage } from '../pages/news/news';
import { NewsDetailPage } from '../pages/news-detail/news-detail';
import { NotificationsPage } from '../pages/notifications/notifications';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { SalesNotePage } from '../pages/sales-note/sales-note';
import { AlertProvider } from '../providers/alert/alert';
import { AuthProvider } from '../providers/auth/auth';
import { RestApiProvider } from '../providers/rest-api/rest-api';
import { ImageProvider } from '../providers/image/image';
import { Camera } from '@ionic-native/camera';
import { OnesignalProvider } from '../providers/onesignal/onesignal';
import { OneSignal } from '@ionic-native/onesignal';
import { HttpClientModule } from '@angular/common/http';
import { Keyboard } from '@ionic-native/keyboard';
import {ProfileEditPage} from '../pages/profile-edit/profile-edit';
import {AutofillPlacesPage} from '../pages/autofill-places/autofill-places';
import {AddContactPage} from '../pages/add-contact/add-contact';
import { CallNumber } from '@ionic-native/call-number';
import { CalendarModule } from 'ionic3-calendar-en';
import { SignaturePadModule } from 'angular2-signaturepad';
import { LocationProvider } from '../providers/location/location';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { MapViewPage } from '../pages/map-view/map-view';
import { OrderDetailPage } from '../pages/order-detail/order-detail';
import { NotesPage } from '../pages/notes/notes';
import { ImagesViewerPage } from '../pages/images-viewer/images-viewer';
import {SalesNotePopupPage} from '../pages/sales-note-popup/sales-note-popup';
import { Network } from '@ionic-native/network';
import { OfflineProvider } from '../providers/offline/offline';
import { SQLite} from '@ionic-native/sqlite';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';

// import { NgCalendarModule  } from 'ionic2-calendar';
@NgModule({
  declarations: [
    MyApp,
    LocationPage,
    MembershipPage,ClientPage,AddclientPage,PlaceorderPage,NextvisitPage,ProductlistPage,AddclientinfoPage,NewsPage,NewsDetailPage,NotificationsPage,ForgotPasswordPage,SalesNotePage,
    ProductPage,
    ProductDetailPage,
    AboutPage,
    PivacyPage,
    CategoryPage,
    DetailsPage,
    AddBusinessPage,
    NewsfeedPage,
    CategoriesPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    ForgotPage,
    SearchPage,
    DetailsPage,
    ChatlistPage,
    ChatdetailsPage,
    ProfilePage,
    ChangepasswordPage,
    TermsPage,
    SettingsPage,
    ProfileEditPage,
    AutofillPlacesPage,
    AddContactPage,
    MapViewPage,
    OrderDetailPage,
    MapPage,
    NotesPage,
    ImagesViewerPage,
    SalesNotePopupPage,
  ],
  imports: [
    SignaturePadModule,
    BrowserModule,
    HttpClientModule,
    CalendarModule,
   // NgCalendarModule,
    IonicModule.forRoot(
      MyApp,{mode:"ios",
    backButtonText:""}
      )],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilePage,LocationPage,
    AddBusinessPage,
    CategoryPage,
    DetailsPage,ClientPage,AddclientPage,PlaceorderPage,NextvisitPage,ProductlistPage,AddclientinfoPage,NewsPage,NewsDetailPage,NotificationsPage,ForgotPasswordPage,SalesNotePage,
    ProductPage,
    AboutPage,
    ProductDetailPage,
    PivacyPage,
    CategoriesPage,
    MembershipPage,
    NewsfeedPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    ForgotPage,
    SearchPage,
    DetailsPage,
    ChatlistPage,
    ChatdetailsPage,
    ChangepasswordPage,
    TermsPage,
    SettingsPage,
    ProfileEditPage,
    AutofillPlacesPage,
    AddContactPage,
    MapViewPage,
    OrderDetailPage,
    MapPage,
    NotesPage,
    ImagesViewerPage,
    SalesNotePopupPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AlertProvider,
    AuthProvider,
    RestApiProvider,
    ImageProvider,
    Camera,
    OnesignalProvider,
    OneSignal,
    Keyboard,
    CallNumber,
    LocationProvider,
    LocationAccuracy,
    Diagnostic,
    AndroidPermissions,
    Geolocation,
    NativeGeocoder,
    Network,
    OfflineProvider,
    SQLite,
    File,
    FileTransfer
  ]
})
export class AppModule {}
