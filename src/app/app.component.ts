import { Component, Input, NgModule } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gti-tts';
  lang = 'en-US';

  text_ts: string = 'Google Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variants. It applies DeepMind’s groundbreaking research in WaveNet and Google’s powerful neural networks to deliver the highest fidelity possible. As an easy-to-use API, you can create lifelike interactions with your users, across many applications and devices.';

  constructAPIRequest(text_ts: string, lang: string) {
    return {
      "audioConfig": {
        "audioEncoding": "LINEAR16",
        "pitch": 0,
        "speakingRate": 1,
      },
      "input": {
        "text": text_ts
      },
      "voice": {
        "languageCode": lang,
        "name": lang + "-Wavenet-A",
        "ssmlGender": 'NEUTRAL'
      }
    };
  }

  public handleTextChange(text: string) {
    this.text_ts = text;
  }

  public handleSpeakRequest(event: Event) {
    event.preventDefault();

    const requestBody = this.constructAPIRequest(this.text_ts, this.lang);
    console.log(requestBody);
  }
}
