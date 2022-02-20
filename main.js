const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playList = $('.playlist');
const audio = $('#audio');
const cd = $('.cd');
const cdThumb = $('.cd-thumb');
const progress = $('.progress');
const progressBar = $('.progress-bar');
const btnVolume = $('.btn-volume');
const progressVolume = $('#volume');

const totalTime = $('.total-time span');
const currentTimeElement = $('.current-time span');

const headerTitle = $('header h2');
const btnPlay = $('.btn-toggle-play');
const Player = $('.player');

const btnNextSong = $('.btn-next');
const btnPreSong = $('.btn-prev');

const app = {
  currentIndex: 0,
  isPlaying: false,
  isMute: false,
  volume: null,
  songs: [
    {
      title: 'Muộn rồi mà sao còn',
      artist: 'Sơn Tùng MTP',
      cover: './assets/images/MuonRoiMaSaoCon-SonTungMTP.jpg',
      path: './assets/audio/MuonRoiMaSaoCon-SonTungMTP.mp3',
    },
    {
      title: 'Có em đời bỗng vui',
      artist: 'Chillies',
      cover: './assets/images/CoEmDoiBongVui-Chillies.jpg',
      path: './assets/audio/CoEmDoiBongVui-Chillies.mp3',
    },
    {
      title: 'Anh sẽ đón em',
      artist: 'Nguyên ft Trang',
      cover: './assets/images/AnhSeDonEm.jpg',
      path: './assets/audio/AnhSeDonEm.mp3',
    },
    {
      title: 'Nụ cười em là nắng',
      artist: 'Green',
      cover: './assets/images/NuCuoiEmlaNang-Green.jpg',
      path: './assets/audio/NuCuoiEmlaNang-Green.mp3',
    },
    {
      title: 'Em có nghe',
      artist: 'Kha',
      cover: './assets/images/EmCoNghe-Kha.jpg',
      path: './assets/audio/EmCoNghe-Kha.mp3',
    },
    {
      title: 'Lưu số em đi',
      artist: 'Huỳnh Vân ft Vũ Phụng Tiên',
      cover: './assets/images/LuuSoEmDi-HuynhVan-VuPhungTien.jpg',
      path: './assets/audio/LuuSoEmDi-HuynhVan-VuPhungTien.mp3',
    },
    {
      title: 'Ghé qua',
      artist: 'Dick ft PC ft Tofu',
      cover: './assets/images/GheQua-TaynguyenSound.jpg',
      path: './assets/audio/GheQua-TaynguyenSound.mp3',
    },
    {
      title: 'Sugar',
      artist: 'Maroon 5',
      cover: './assets/images/Sugar-Maroon5.jpg',
      path: './assets/audio/Sugar-Maroon5.mp3',
    },
    {
      title: 'Happy',
      artist: 'Pharrell Williams',
      cover: './assets/images/Happy-Pharrell-Williams.jpg',
      path: './assets/audio/Happy-Pharrell-Williams.mp3',
    },
    {
      title: 'Ngày đầu tiên',
      artist: 'Đức Phúc',
      cover: './assets/images/NgayDauTien-DucPhuc.jpg',
      path: './assets/audio/NgayDauTien-DucPhuc.mp3',
    },
    {
      title: 'Tình yêu của anh',
      artist: 'Phú Quí',
      cover: './assets/images/TinhYeuCuaAnh-PhuQui.jpg',
      path: './assets/audio/TinhYeuCuaAnh-PhuQui.mp3',
    },
    {
      title: 'At my worst',
      artist: 'Pink Sweat$',
      cover: './assets/images/AtMyWorst-PinkSweat.jpg',
      path: './assets/audio/AtMyWorst-PinkSweat.mp3',
    },
    {
      title: 'Lần hẹn hò đầu tiên',
      artist: 'Huyền Tâm Môn',
      cover: './assets/images/LanHenHoDauTien-HuyenTamMon.jpg',
      path: './assets/audio/LanHenHoDauTien-HuyenTamMon.mp3',
    },
    {
      title: 'Internet love',
      artist: 'hnhngan ft Tyronee',
      cover: './assets/images/InternetLove-HnhnganTyronee.jpg',
      path: './assets/audio/InternetLove-HnhnganTyronee.mp3',
    },
    {
      title: 'Your smile',
      artist: 'hnhngan ft Obito',
      cover: './assets/images/YourSmileLive-ObitoHnhngan.jpg',
      path: './assets/audio/YourSmileLive-ObitoHnhngan.mp3',
    },
    {
      title: 'Nụ cười 18 20',
      artist: 'Doãn Hiếu',
      cover: './assets/images/NuCuoi1820-DoanHieu.jpg',
      path: './assets/audio/NuCuoi1820-DoanHieu.mp3',
    },
    {
      title: 'Chẳng còn những ngày ấy',
      artist: 'Vinz ft Huy Hiếu',
      cover: './assets/images/ChangConNhungNgayAy-HuyHieu-Vinz.jpg',
      path: './assets/audio/ChangConNhungNgayAy-HuyHieu-Vinz.mp3',
    },
    {
      title: 'Tháng 5 không trở lại',
      artist: 'The Wall Nutszz',
      cover: './assets/images/Thang5KhongTroLai-TheWallNutszz.jpg',
      path: './assets/audio/Thang5KhongTroLai-TheWallNutszz.mp3',
    },
    {
      title: 'Như ngày hôm qua',
      artist: 'Sơn Tùng MTP',
      cover: './assets/images/NhuNgayHomQua-SonTungMTP.jpg',
      path: './assets/audio/NhuNgayHomQua-SonTungMTP.mp3',
    },
  ],
  render: function () {
    const htmls = this.songs
      .map((song, index) => {
        return `
          <div class="song">
            <div class="thumb"
                style="background-image: url('${song.cover}')">
            </div>
            <div class="body">
                <h3 class="title">${song.title}</h3>
                <p class="author">${song.artist}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
        `;
      })
      .join('');
    playList.innerHTML = htmls;
  },
  init: function () {
    progressVolume.value = 80;
    audio.volume = 0.8;
  },
  loadCurrentSong: function (index) {
    currentSong = this.songs[index];
    audio.src = currentSong.path;
    cdThumb.style.backgroundImage = `url(${currentSong.cover})`;
    headerTitle.textContent = currentSong.title;
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    window.addEventListener('scroll', function () {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let newWidth = cdWidth - scrollTop;

      if (newWidth < 0) {
        newWidth = 0;
      }

      cd.style.width = newWidth + 'px';
      cd.style.opacity = newWidth / cdWidth;
    });

    progress.addEventListener('input', function () {
      const currentTime = (progress.value / 100) * audio.duration;
      audio.currentTime = currentTime;
    });

    btnPlay.addEventListener('click', function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    });

    audio.addEventListener('play', function () {
      _this.isPlaying = true;
      Player.classList.add('playing');
      cdThumbAnimate.play();
    });

    audio.addEventListener('pause', function () {
      _this.isPlaying = false;
      Player.classList.remove('playing');
      cdThumbAnimate.pause();
    });

    audio.addEventListener('timeupdate', function () {
      const progressPercent = (audio.currentTime / audio.duration) * 100;
      if (audio.duration) {
        progress.value = progressPercent;
        progressBar.style.width = progressPercent + '%';
        totalTime.textContent = _this.formatTime(audio.duration);
      }
      currentTimeElement.textContent = _this.formatTime(audio.currentTime);
    });

    btnVolume.addEventListener('click', function () {
      _this.isMute = !_this.isMute;
      btnVolume.classList.toggle('active', _this.isMute);
      if (_this.isMute) {
        audio.volume = 0;
        _this.volume = progressVolume.value / 100;
        progressVolume.value = 0;
      } else {
        audio.volume = _this.volume;
        progressVolume.value = audio.volume * 100;
      }
    });

    progressVolume.addEventListener('input', function () {
      if (_this.isMute) {
        isMute = false;
      }
      if (progressVolume.value <= 0.02) {
        _this.isMute = true;
        btnVolume.classList.add('active');
        audio.volume = 0;
      } else {
        _this.isMute = false;
        btnVolume.classList.remove('active');
        audio.volume = Number(progressVolume.value) / 100;
      }
    });

    audio.addEventListener('ended', function () {
      _this.nextSong();
      audio.play();
    });

    const cdThumbAnimate = cdThumb.animate(
      [
        // keyframes
        { transform: 'rotate(360deg)' },
      ],
      {
        // timing options
        duration: 12000,
        iterations: Infinity,
      }
    );
    cdThumbAnimate.pause();

    btnNextSong.addEventListener('click', function () {
      _this.nextSong();
      audio.play();
    });
    btnPreSong.addEventListener('click', function () {
      _this.prevSong();
      audio.play();
    });
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex > this.songs.length - 1) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong(this.currentIndex);
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong(this.currentIndex);
  },
  formatTime: function (time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  },
  start: function () {
    this.render();
    this.loadCurrentSong(this.currentIndex);
    this.init();
    this.handleEvents();
  },
};

app.start();
