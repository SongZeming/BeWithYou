const path = 'res/raw-assets/resources/sound/';

let data = {
    musicVolume: 0.8,
    soundVolume: 0.8,
}

module.exports = {

    init(musicVolume, soundVolume) {
        data.musicVolume = musicVolume;
        data.soundVolume = soundVolume;
    },

    playMusic(name, loop) {
        let m_loop = loop ? true : false;
        let m_volume = this.getMusicVolume();
        this.stopMusic();
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
        return data.musicVolume;
    },


    playSound(name, loop) {
        let s_loop = loop ? true : false;
        let s_volume = this.getSoundVolume();
        let soundPath = path + name;
        if (loop) {
            this._soundId = cc.audioEngine.play(soundPath, s_loop, s_volume);
        } else {
            cc.audioEngine.play(soundPath, s_loop, s_volume);
        }
    },

    stopSound() {
        if (this._soundId || this._soundId === 0) cc.audioEngine.stop(this._soundId);
    },

    setSoundVolume(volume) {
        if (volume >= 0 && volume <= 1) {
            data.soundVolume = volume;
        }
    },

    getSoundVolume() {
        return data.soundVolume;
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