import { AuthProvider } from './../auth/auth';

import { Injectable } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
// import { RestApiProvider } from '../../providers/rest-api/rest-api';

const messages = {
  // "en":{
  //   "UNAME": {title: 'Username!', subTitle: 'Enter valid email or username', empty: "Please enter your email or username!"},
  //   "PASSW": {title: 'Password!', subTitle: 'Enter valid Password', empty: "Please enter your password!"},
  //   "EMAIL": {title: 'Email!', subTitle: 'Enter valid Email', empty: "Please enter your  email id!"},
  //   "FULLNAME": {title: 'Name!', subTitle: 'Enter valid name', empty: "Please Enter your name!"},
  //   "GENDR": {title: 'Gender!', subTitle: '', empty: "Please Select gender!"},
  //   "DOBTH": {title: 'Date of Birth!', subTitle: '', empty: "Please select your DOB!"},
  //   "CPASS": {title: 'Password!', subTitle: '', empty: "Please enter your current password!"},
  //   "NPASS": {title: 'Password!', 
  //   subTitle: 'Please enter a new password that contains a minimum of 6 characters!', 
  //   empty: "Please enter your new password!"},
  //   "ADDRS": {title: 'Location!', subTitle: '', empty: "Please enter your current location!"},
  //   "CITY": {title: 'City!', subTitle: '', empty: "Please enter your city!"},
  //   "STATE": {title: 'State!', subTitle: '', empty: "Please enter your state!"},
  //   "COUNTRY": {title: 'Country!', subTitle: '', empty: "Please enter your Country!"},
  //   "PHONE": {title: 'Phone!', subTitle: 'Please enter valid mobile number', empty: "Please enter your mobile number!"},
  //   "CONFP": {
  //     title: 'Invalid Password!', subTitle: 'Confirm password not matched with new password', empty: "Please retype password!"
  //   },

  //   "CNAME": {
  //     title: 'Invalid Client Name!', subTitle: '', empty: "Please enter client name!"
  //   },

  //   "CTYPE": {
  //     title: 'Invalid Client Type!', subTitle: '', empty: "Please enter client type!"
  //   },

  //   "BILADD": {title: 'Invalid Billing Address!', subTitle: '', empty: "Please enter billing address!"},
  //   "SHIPADD": {title: 'Invalid Delivery Address!', subTitle: '', empty: "Please enter delivery address!"},
  //   "DELIPOST": {title: 'Invalid Post Code!', subTitle: '', empty: "Please enter delivery address post code!"},
  //   "BILLPOST": {title: 'Invalid Post Code!', subTitle: '', empty: "Please enter billing address post code!"},
  //   "ZIP": {title: 'Invalid Zip Code!', subTitle: '', empty: "Please enter zip code!"},
  //   "IBAN": {title: 'Invalid Iban!', subTitle: '', empty: "Please enter iban!"},
  //   "PNAME": {title: 'Invalid Contact!', subTitle: '', empty: "Please enter other contact person name!"},
  //   "PPHONE": {title: 'Invalid Contact!', subTitle: '', empty: "Please enter other contact person number!"},
  //   "VDATE": {title: 'Invalid Date!', subTitle: '', empty: "Please select date!"},
  //   "REGION": {title: 'Invalid Region!', subTitle: '', empty: "Please select region!"},
  //   "NOTE": {title: 'Invalid Note!', subTitle: '', empty: "Please enter note!"},
  //   "LAT": {title: 'Invalid Latitude!', subTitle: '', empty: "Please hit pin icon for latitude!"},
  //   "LNG": {title: 'Invalid Longitude!', subTitle: '', empty: "Please hit pin icon for longitude!"},

  //   // "EMAIL": {title: 'Invalid Password!', subTitle: 'Enter valid Email', empty: "Please enter your registered email id!"}

  //   // "EMAIL": {title: 'Invalid Password!', subTitle: 'Enter valid Email', empty: "Please enter your registered email id!"}

  // },

  en:{
    UNAME: {title: 'Usuario!', subTitle: 'Introduzca un email o usuario validos', empty: "Intruzca su email o usuario por favor!"},
    PASSW: {title: 'Clave!', subTitle: 'Introduzca una clave valida', empty: "Intruzca su clave por favor!"},
    EMAIL: {title: 'Email!', subTitle: 'Introduzca un email valido', empty: "Introduzca su email por favor!"},
    FULLNAME: {title: 'Nombre!', subTitle: 'Introduzca un nombre valido', empty: "Introduzca su nombre por favor!"},
    GENDR: {title: 'Genero!', subTitle: '', empty: "Introduzca su genero por favor!"},
    DOBTH: {title: 'Fecha de nacimiento!', subTitle: '', empty: "Introduzca su fecha de nacimiento por favor!"},
    CPASS: {title: 'Clave!', subTitle: '', empty: "Introduzca su clave por favor!"},
    NPASS: {title: 'Clave!',
    subTitle: 'Introduzca una nueva clave con al menos 6 caracteres, por favor!',
    empty: "Introduzca una nueva clave por favor!"},
    ADDRS: {title: 'Localización!', subTitle: '', empty: "Introduzca la dirección actual por favor!"},
    CITY: {title: 'Ciudad!', subTitle: '', empty: "Introduzca su ciudad por favor!"},
    STATE: {title: 'Estado!', subTitle: '', empty: "Introduzca el estado por favor!"},
    COUNTRY: {title: 'Pais!', subTitle: '', empty: "Introduzca su pais por favor!"},
    PHONE: {title: 'Telefono!', subTitle: 'Introduzca un numero de telefono valido por favor', empty: "Introduzca su telefono movil por favor!"},
    CONFP: {
    title: 'Clave no valida!', subTitle: 'La clave introducida no coincide ', empty: "Introduzca de nuevo la clave por favor!"
    },
    
    CNAME: {
    title: 'Nombre de cliente no valido!', subTitle: '', empty: "Introduzca el nombre del cliente por favor!"
    },
    
    CTYPE: {
    title: 'Tipo de cliente no valido!', subTitle: '', empty: "Introduzca el tipo de cliente por favor!"
    },
    
    BILADD: {title: 'Direccion de facturación no valida!', subTitle: '', empty: "Introduzca la dirección de facturación por favor!"},
    SHIPADD: {title: 'Dirección de entrega no valida!', subTitle: '', empty: "Introduzca la dirección de entrega por favor!"},
    DELIPOST: {title: 'Código postal no valido!', subTitle: '', empty: "Introduzca el código postal por favor!"},
    BILLPOST: {title: 'Código postal no valido!', subTitle: '', empty: "Introduzca el código postal por favor!"},
    ZIP: {title: 'Código postal no valido!', subTitle: '', empty: "Introduzca el código postal por favor!"},
    IBAN: {title: 'IBAN no valido!', subTitle: '', empty: "Introduzca IBAN por favor!"},
    PNAME: {title: 'Tipo de cliente no valido!', subTitle: '', empty: "Introduzca el tipo de cliente por favor!"},
    PPHONE: {title: 'Tipo de cliente no valido!', subTitle: '', empty: "Introduzca el tipo de cliente por favor!"},
    VDATE: {title: 'Fecha no valida!', subTitle: '', empty: "Introduzca la fecha por favor!"},
    REGION: {title: 'Región no valida!', subTitle: '', empty: "Introduzca la región por favor!"},
    NOTE: {title: 'Nota no valida!', subTitle: '', empty: "Introduzca una nota por favor!"},
    LAT: {title: 'Latitud no valida!', subTitle: '', empty: "haga clic en el icono para registrar la latitud!"},
    LNG: {title: 'Longitud no valida!', subTitle: '', empty: "haga clic en el icono para registrar la longitud!"},
    
    // "EMAIL": {title: 'Invalid Password!', subTitle: 'Enter valid Email', empty: "Please enter your registered email id!"}
    
    // "EMAIL": {title: 'Invalid Password!', subTitle: 'Enter valid Email', empty: "Please enter your registered email id!"}
    
    },


  "EMAIL": {
    title: 'Email inválido!', subTitle: 'Your Email is invalid please enter valid email', empty: "Please enter your email!"
  },
  "FNAME": {
    title: 'Invalid Name!', subTitle: 'Please enter valid first name!', empty: "Please enter your first name!"
    
  },
  "LNAME": {
    title: 'Invalid Name!', subTitle: 'Please enter valid last name!', empty: "Please enter your last name!"
  },
  "PHONE": {
    title: 'Invalid Phone!', subTitle: 'Your phone number is invalid. Please enter valid phone number', empty: "Please enter your phone number!"
  },
  "PASSW": {
    title: 'Invalid Password!', subTitle: 'Password is invalid', empty: "Please enter password!"
  },
  "CPASS": {
    title: 'Invalid Password!', subTitle: 'Password is invalid', empty: "Please enter current password!" 
  },
  "NPASS": {
    title: 'Invalid Password!', subTitle: 'Password is invalid', empty: "Please enter new password!"
  },  
  "CONFP": {
    title: 'Invalid Password!', subTitle: 'Password should be matched', empty: "Please retype password!"
  },
  "DOBTH": {
    title: 'Select DOB!', subTitle: 'Your Email is invalid please enter valid email', empty: "Please select your DOB!"
  },
  "GENDR": {
    title: 'Select Gender!', subTitle: 'Your Email is invalid please enter valid email', empty: "Please select your gender!",
  },
  "IMAGE": {
    title: 'Select Image!', subTitle: 'Please Select Profile Image', empty: "Please select your Profile image!",
  },
  "ADDRS": {
    title: 'Invalid Address!', subTitle: 'Please ', empty: "Please enter your Address!"  
  },
  "FILLP": {
    title: 'Invalid Input!', subTitle: 'Please fill all field properly', empty: "Please enter your Address!"  
  },
  "GDESC": {
    title: 'Invalid Description!', subTitle: 'Please fill all field properly', empty: "Please write description for your group!"  
  },
  

  "TECHP": {
    title: 'Technical Problem!', subTitle: 'Technical Problem, Please check your network connection!', empty: "",
    titleA: "مشكلة فنية!", subTitleA: "مشكلة فنية ، يرجى التحقق من اتصال الشبكة الخاص بك!", emptyA: ""
  },
  "AGE": {
    title: 'Select Age!', subTitle: 'Please select your Age!', empty: "Please select your Age!",
    titleA: "اختر العمر", subTitleA: "يرجى اختيار عمرك!", emptyA: "يرجى اختيار عمرك!"
  },
  "SDAT": {
    title: 'Select Start Date!', subTitle: 'Date is invalid', empty: "Please selct start date!",
    titleA: "اختر تاريخ البدء", subTitleA: "Date is invalid", emptyA: "يرجى تحديد تاريخ البدء!"
  },
  "EDAT": {
    title: 'Select End Date!', subTitle: 'Date is invalid', empty: "Please select end date!",
    titleA: "حدد تاريخ الانتهاء!", subTitleA: "Date is invalid", emptyA: "يرجى تحديد تاريخ الانتهاء!"
  },
  "KWRD": {
    title: 'Invalid Keyword!', subTitle: 'Keyword is invalid', empty: "Please enter keyword!",
    titleA: "كلمة رئيسية غير صالحة!", subTitleA: "الكلمة الرئيسية غير صالحة", emptyA: "من فضلك ادخل الكلمة"
  },
  "DST": {
    title: 'Invalid Destination!', subTitle: 'Password is invalid', empty: "Please enter destination!",
    titleA: "!وجهة غير صالحة", subTitleA: "كلمة المرور غير صالحة", emptyA: "!الرجاء إدخال الوجهة"
  },
  "AGNCY": {
    title: 'Invalid Agency!', subTitle: 'Password is invalid', empty: "Please select agency!",
    titleA: "!وكالة غير صالحة", subTitleA: "Password is invalid", emptyA: "!يرجى اختيار الوكالة"
  },
}
const m = {
  fnameEmpty: { title: 'Mendetory field!', subTitle: 'Your Email is invalid please enter valid email' },
  lnameInvalid: { title: 'Password Reset Sent!', subTitle: 'A password reset email has been sent to: ' },
  lnameEmpty: { title: 'Password Reset Sent!', subTitle: 'A password reset email has been sent to: ' },

  profileUpdated: { title: 'Profile Updated!', subTitle: 'Your profile has been successfully updated!' },
  emailVerified: { title: 'Email Confirmed!', subTitle: 'Congratulations! Your email has been confirmed!' },
  emailVerificationSent: { title: 'Email Confirmation Sent!', subTitle: 'An email confirmation has been sent to: ' },
  accountDeleted: { title: 'Account Deleted!', subTitle: 'Your account has been successfully deleted.' },
  passwordChanged: { title: 'Password Changed!', subTitle: 'Your password has been successfully changed.' },
  invalidCredential: { title: 'Invalid Credential!', subTitle: 'An error occured logging in with this credential.' },
  operationNotAllowed: { title: 'Login Failed!', subTitle: 'Logging in with this provider is not allowed! Please contact support.' },
  userDisabled: { title: 'Account Disabled!', subTitle: 'Sorry! But this account has been suspended! Please contact support.' },
  userNotFound: { title: 'Account Not Found!', subTitle: 'Sorry, but an account with this credential could not be found.' },
  wrongPassword: { title: 'Incorrect Password!', subTitle: 'Sorry, but the password you have entered is incorrect.' },
  invalidEmail: { title: 'Invalid Email!', subTitle: 'Sorry, but you have entered an invalid email address.' },
  emailAlreadyInUse: { title: 'Email Not Available!', subTitle: 'Sorry, but this email is already in use.' },
  weakPassword: { title: 'Weak Password!', subTitle: 'Sorry, but you have entered a weak password.' },
  requiresRecentLogin: { title: 'Credential Expired!', subTitle: 'Sorry, but this credential has expired! Please login again.' },
  userMismatch: { title: 'User Mismatch!', subTitle: 'Sorry, but this credential is for another user!' },
  providerAlreadyLinked: { title: 'Already Linked!', subTitle: 'Sorry, but your account is already linked to this credential.' },
  credentialAlreadyInUse: { title: 'Credential Not Available!', subTitle: 'Sorry, but this credential is already used by another user.' },
  changeName: { title: 'Change Name Failed!', subTitle: 'Sorry, but we\'ve encountered an error changing your name.' },
  changeEmail: { title: 'Change Email Failed!', subTitle: 'Sorry, but we\'ve encountered an error changing your email address.' },
  changePhoto: { title: 'Change Photo Failed!', subTitle: 'Sorry, but we\'ve encountered an error changing your photo.' },
  passwordsDoNotMatch: { title: 'Change Password Failed!', subTitle: 'Sorry, but the passwords you entered do not match.' },
  updateProfile: { title: 'Update Profile Failed', subTitle: 'Sorry, but we\'ve encountered an error updating your profile.' },
  usernameExists: { title: 'Username Already Exists!', subTitle: 'Sorry, but this username is already taken by another user.' },
  imageUpload: { title: 'Image Upload Failed!', subTitle: 'Sorry but we\'ve encountered an error uploading selected image.' }
};

@Injectable()
export class AlertProvider {
  lang = JSON.parse(localStorage.getItem("yallaLanguage"));
  constructor(public alertCtrl: AlertController,
    public auth: AuthProvider,
    public toastCtrl: ToastController
    // public restApi: RestApiProvider
  ) { }

  showMessage(code: any) {
    let lang = this.auth.getAppLanguage();
    let subtitle = ""
    let okButton = ""
    console.log(lang);
    
 
    
      okButton = "Ok";
    
    const alert = this.alertCtrl.create({
      subTitle: messages[code].title,
      message: messages[lang][code].subTitle,
      buttons: [
        {
          text: okButton,
          handler: () => {
          }
        }]
    });
    alert.present();
  }


  showEmptyMessage(code: any) {
    let lang = this.auth.getAppLanguage();
    console.log(lang);
    let sub = ""
    let mes = ""
    let okButton = ""
      sub = messages[lang][code].title;
      mes = messages[lang][code].empty;
      okButton = "Ok";
    
    const alert = this.alertCtrl.create({
      subTitle: sub,
      message: mes,
      buttons: [
        {
          text: okButton,
          handler: () => {
          }
        }]
    });
    alert.present();
    console.log(sub,mes);
  }


  show(title: string, message: string) {

    const alert = this.alertCtrl.create({
      subTitle: title,
      message: message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
          }
        }]
    });
    alert.present();
  }

  showAsync(title: string, message: string) {


    return new Promise((resolve) => {
      this.alertCtrl.create({
        subTitle: title,
        enableBackdropDismiss:false,
        message: message,
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              resolve();
            }
          }]
      }).present();
    

      

        
     
    });




  }


  confirm(title, subTitle) {
  
    return new Promise((resolve) => {
    const alert = this.alertCtrl.create({
      title:title,
      subTitle: subTitle,
      enableBackdropDismiss:false,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            resolve(true);
          }
        },
        {
          text: 'No',
          handler: () => {
            resolve(false);
          }
        }]
    });
    alert.present();
  });
  }

  showPrompt() {
    return new Promise((resolve) => {
    const prompt = this.alertCtrl.create({
      title: "Create A New Play List",
      message: "",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            resolve(null);
          }
        },
        {
          text: 'Create',
          handler: data => {
            if(data.title!=""){
              resolve(data);
            }else{
              return false;
            }
            
          }
        }
      ]
    });
    prompt.present();
  })}





  inputAlert(title:string,okbutton:string) {
    return new Promise((resolve) => {
    const prompt = this.alertCtrl.create({
      title: title,
      message: "",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            resolve(null);
          }
        },
        {
          text: okbutton,
          handler: data => {
            if(data.title!=""){
              resolve(data);
            }else{
              return false;
            }
            
          }
        }
      ]
    });
    prompt.present();
  })}








  confirmation(title, subTitle, buttonConfirm, buttonCancel) {
  
    return new Promise((resolve) => {
    const alert = this.alertCtrl.create({
      title:title,
      subTitle: subTitle,
      enableBackdropDismiss:false,
      buttons: [
        {
          text: buttonConfirm,
          handler: () => {
            resolve(true);
          }
        },
        {
          text: buttonCancel,
          handler: () => {
            resolve(false);
          }
        }]
    });
    alert.present();
  });
  }


  presentToast(message:string,position:string){

    const toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position
    }); 
    toast.present();
  }

}


