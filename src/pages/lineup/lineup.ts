import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StreamingMedia, StreamingAudioOptions } from '@ionic-native/streaming-media';

@Component({
    selector: 'page-lineup',
    templateUrl: 'lineup.html'
})
export class LineUpPage {
    tracks: any;
    playing: boolean = true;
    currentTrack: any;
    progressInterval: any;

    constructor(private streamingMedia: StreamingMedia) {

        this.tracks = [
            { title: 'Unravel – The Little Things That Make Big Difference In Entrepreneurial Success', artist: 'Ayuade', playing: false, progress: 0, thumbnail: "http://www.africabusinessradio.com/wp-content/uploads/2017/10/unravel-4-cap-610x380.jpg", link: "http://iono.fm/e/517450" },
            { title: 'Talking To Africa', artist: 'African Business Radio', playing: false, progress: 0, thumbnail: "http://www.africabusinessradio.com/wp-content/uploads/2017/09/Africa_Business_Radio_Talking_To_Africa-610x312.png", link: "http://iono.fm/e/517450" },
            { title: 'Campus Africa', artist: 'SOJI ', playing: false, progress: 0, thumbnail: "http://www.africabusinessradio.com/wp-content/uploads/2017/09/Campus_Africa-Africa_Business_Radio-610x312.png", link: "http://iono.fm/e/517450" },
            { title: 'SA Gov. Must Walk The Talk For SMMEs To Boost Job Creation – Faith Ngwenya', artist: 'SOJI', playing: false, progress: 0, thumbnail: "http://www.africabusinessradio.com/wp-content/uploads/2017/06/ThatsAllIHaveToSayAboutThat.png", link: "http://iono.fm/e/517450" },
            { title: 'That’s All I Have To Say About That', artist: 'SOJI', playing: false, progress: 0, thumbnail: "http://www.africabusinessradio.com/wp-content/uploads/2017/10/unravel-4-cap-610x380.jpg", link: "http://iono.fm/e/517450" },
            { title: 'Stay High', artist: 'Tove Lo', playing: false, progress: 0, thumbnail: "http://www.africabusinessradio.com/wp-content/uploads/2017/10/unravel-4-cap-610x380.jpg", link: "http://iono.fm/e/517450" },
            { title: 'Lean On', artist: 'Major Lazer', playing: false, progress: 0, thumbnail: "http://www.africabusinessradio.com/wp-content/uploads/2017/10/unravel-4-cap-610x380.jpg", link: "http://iono.fm/e/517450" },
            { title: 'They Say', artist: 'Kilter', playing: false, progress: 0, thumbnail: "http://www.africabusinessradio.com/wp-content/uploads/2017/10/unravel-4-cap-610x380.jpg", link: "http://iono.fm/e/517450" }
        ];

        this.currentTrack = this.tracks[0];

    }



    playTrack(track) {

        // First stop any currently playing tracks

        for (let checkTrack of this.tracks) {

            if (checkTrack.playing) {
                this.pauseTrack(checkTrack);
                this.streamingMedia.stopAudio();
            }

        }

        track.playing = true;
        this.currentTrack = track;

        let options: StreamingAudioOptions = {
            successCallback: () => { console.log('Finished Audio') },
            errorCallback: (e) => { console.log('Error: ', e) },
            initFullscreen: false // iOS only!
        };

        //http://soundbible.com/2196-Baby-Music-Box.html
        this.streamingMedia.playAudio('https://edge.iono.fm/xhls/abr_live_medium.m3u8', options);

        // Simulate track playing
        this.progressInterval = setInterval(() => {
            track.progress < 100 ? track.progress++ : track.progress = 0;
        }, 1000);
    }

    pauseTrack(track) {
        track.playing = false;
        clearInterval(this.progressInterval);
        this.streamingMedia.pauseAudio();
    }

    nextTrack() {
        let index = this.tracks.indexOf(this.currentTrack);
        index >= this.tracks.length - 1 ? index = 0 : index++;

        this.playTrack(this.tracks[index]);
    }

    prevTrack() {

        let index = this.tracks.indexOf(this.currentTrack);
        index > 0 ? index-- : index = this.tracks.length - 1;

        this.playTrack(this.tracks[index]);
    }
}
