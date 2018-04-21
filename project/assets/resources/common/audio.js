const commonPath = 'res/raw-assets/resources/sound/';
const bwyPath = 'res/raw-assets/resources/beWithYou/sound/';
let utils = require('utils');

let data = {
    musicVolume: 1,
    soundVolume: 1,
}

module.exports = {

    init(musicVolume, soundVolume) {
        data.musicVolume = musicVolume;
        data.soundVolume = soundVolume;
    },

    playMusic(gameType, name, loop) {
        let m_loop = loop ? true : false;
        let m_volume = this.getMusicVolume();
        this.stopMusic();
        let path = gameType === 'beWithYou' ? bwyPath : commonPath;
        let musicPath = path + name;
        this._musicId = cc.audioEngine.play(musicPath, m_loop, m_volume);
    },

    puaseMusic() {
        if (this._musicId || this._musicId === 0) cc.audioEngine.pause(this._musicId);
    },

    resumeMusic() {
        if (this._musicId || this._musicId === 0) cc.audioEngine.resume(this._musicId);
    },

    stopMusic() {
        if (this._musicId || this._musicId === 0) cc.audioEngine.stop(this._musicId);
    },

    setMusicVolume(volume) {
        if (volume >= 0 && volume <= 1) {
            data.musicVolume = volume;
            if (this._musicId || this._musicId === 0) {
                cc.audioEngine.setVolume(this._musicId, volume);
            }
        }
    },

    getMusicVolume() {
        let volume = utils.getLocalStorage('musicVolume');
        return volume ? volume : (volume === 0 ? 0 : data.musicVolume);
    },


    playSound(gameType, name, loop) {
        let s_loop = loop ? true : false;
        let s_volume = this.getSoundVolume();
        let path = gameType === 'beWithYou' ? bwyPath : commonPath;
        let soundPath = path + name;
        this._soundId = cc.audioEngine.play(soundPath, s_loop, s_volume);

    },

    stopSound() {
        if (this._soundId || this._soundId === 0) cc.audioEngine.stop(this._soundId);
    },

    setSoundVolume(volume) {
        if (volume >= 0 && volume <= 1) {
            data.soundVolume = volume;
            if (this._soundId || this._soundId === 0) {
                cc.audioEngine.setVolume(this._soundId, volume);
            }
        }
    },

    getSoundVolume() {
        let volume = utils.getLocalStorage('soundVolume');
        return volume ? volume : (volume === 0 ? 0 : data.soundVolume);
    },


    pauseAll() {
        cc.audioEngine.pauseAll();
    },

    resumeAll() {
        cc.audioEngine.resumeAll();
    },

    stopAll() {
        cc.audioEngine.stopAll();
    },

}