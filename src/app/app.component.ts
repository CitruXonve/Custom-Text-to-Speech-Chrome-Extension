import { Component, Input, NgModule, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as config from 'config';

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
        ...config.defaults,
        api_key: config.apiKey,
      }
    )
  }

  constructAPIRequest() {
    return {
      "audioConfig": {
        "audioEncoding": this.form.value.audioEncoding,
        "pitch": this.form.value.pitch,
        "speakingRate": this.form.value.speed,
      },
      "input": {
        "text": this.form.value.text
      },
      "voice": {
        "languageCode": this.form.value.lang,
        "name": this.form.value.lang + "-Standard-A",
        "ssmlGender": this.form.value.gender
      }
    };
  }

  public onSubmit() {
    const requestBody: ApiReq = this.constructAPIRequest();
    console.log(requestBody);

    this.http.post(config.ttsApiUrl, requestBody, { headers: { 'Content-Type': 'application/json' } })
      .subscribe((data: any) => {
        this.media = this.sanitizer.bypassSecurityTrustResourceUrl(this.form.value.resourceType + data['audioContent']);

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
