import { Component, Input, NgModule, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent {
  title = 'gti-tts';
  media: any = undefined;
  audio: any = undefined;
  form: FormGroup;

  constructor(private builder: FormBuilder, private http: HttpClient, private sanitizer: DomSanitizer) {
    this.form = builder.group(
      {
        api_key: 'AIzaSyAzYom931ROQucVv_oXtSCnb1P6wYhathw',
        lang: 'en-US',
        text: 'Google Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variants.',
        pitch: 0.0,
        speed: 1.0
      }
    )
  }

  constructAPIRequest() {
    return {
      "audioConfig": {
        "audioEncoding": "MP3",
        "pitch": this.form.value.pitch,
        "speakingRate": this.form.value.speed,
      },
      "input": {
        "text": this.form.value.text
      },
      "voice": {
        "languageCode": this.form.value.lang,
        "name": this.form.value.lang + "-Standard-A",
        "ssmlGender": 'NEUTRAL'
      }
    };
  }

  public onSubmit() {
    const requestBody: ApiReq = this.constructAPIRequest();
    console.log(requestBody);

    this.http.post("https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=" + this.form.value.api_key, requestBody, { headers: { 'Content-Type': 'application/json' } })
      .subscribe((data: any) => {
        this.media = this.sanitizer.bypassSecurityTrustResourceUrl('data:audio/mp3;base64,' + data['audioContent']);

        if (this.audio !== undefined) {
          this.audio.pause();
        }

        this.audio = new Audio('data:audio/mp3;base64,' + data['audioContent']);
        this.audio.load();
        this.audio.play();
      })
  }
}

export interface ApiReq {

  audioConfig: {
    audioEncoding: string,
    pitch: number
    speakingRate: number

  };
  input: {
    text: string
  };
  voice: {
    languageCode: string,
    name: string
  };
}
