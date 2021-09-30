var config = {
  apiKey: '',
  defaults: {
    lang: 'en-US',
    voiceName: 'en-US-Standard-A',
    gender: 'NEUTRAL',
    audioEncoding: 'MP3',
    text: 'Google Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variants.',
    pitch: 0.0,
    speed: 1.0,
    resourceType: 'data:audio/mp3;base64,',
  },
  ttsApiUrl: '',
}

config.ttsApiUrl = "https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=" + config.apiKey;

module.exports = config;
