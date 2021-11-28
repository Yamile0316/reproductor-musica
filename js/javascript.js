let list_songs = document.getElementById("list-song-container");
let cover_image = document.getElementById("cover-image");
let title_song = document.getElementById("title-song");
let artist_song = document.getElementById("artist-song");
let audio = document.getElementById("audio-playing");
let progress_bar = document.getElementById("progress-bar");

let song_selected = {};
let is_playing = false;
let canciones = [
  {
    id: 1,
    caratula: "img/caratulas/amapolas.jpg",
    cancion: "audio/canciones/_Letra_48k.mp3",
    artista: "Leo Rizzi",
    titulo: "Amapolas",
  },
  {
    id: 2,
    caratula: "img/caratulas/talking to the moon.jpg",
    cancion: "audio/canciones/Bruno Mars - Talking To The Moon (Lyrics)_48k.mp3",
    artista: "Bruno Mars",
    titulo: "Talking to the moom",
  },
  {
    id: 3,
    caratula: "img/caratulas/love nwantiti.jpg",
    cancion: "audio/canciones/CKay - Love Nwantiti (Lyrics)_48k.mp3",
    artista: "CKay",
    titulo: "Love Nwantiti",
  },
  {
    id: 4,
    caratula: "img/caratulas/beggin.jpg",
    cancion: "audio/canciones/Måneskin - Beggin (Lyrics)_48k.mp3",
    artista: "Måneskin",
    titulo: "Beggin",
  },
];

const BuildList = (canciones) => {
  list_songs.innerHTML = "";
  canciones.forEach((e) => {
    list_songs.insertAdjacentHTML(
      "beforeend",
      `
       <article class="list-item" id="item-${e.id}">
          <img src="${e.caratula}" alt="" />
          <div class="data-song-container">
            <h2>${e.titulo}</h2>
            <div class="artist-name">${e.artista}</div>
          </div>
        </article>
    `
    );
  });
};

const select_song = (id) => {
  let res = canciones.find((e) => e.id == id);
  if (res) {
    cover_image.src = res.caratula;
    title_song.innerHTML = res.titulo;
    artist_song.innerHTML = res.artista;
    audio.src = res.cancion;
    play_song();
  }
};

const pause_effects = () => {
  play_btn.innerHTML = "||";
  cover_image.style.animationPlayState = "paused";
};

const play_effects = () => {
  play_btn.innerHTML = "▶️";
  cover_image.style.animationPlayState = "running";
};

const play_song = () => {
  progress_bar.value = audio.currentTime;
  window.setTimeout(() => {
    progress_bar.max = audio.duration;
  }, 500);
  audio.play();
  play_effects();
};

let id_aux = 1;

const next_song = () => {
  if (id_aux < canciones.length) {
    select_song(++id_aux);
  }
};
const prev_song = () => {
  if (id_aux > 0) {
    select_song(--id_aux);
  }
};
const first_song = () => {
  cover_image.src = canciones[0].caratula;
  title_song.innerHTML = canciones[0].titulo;
  artist_song.innerHTML = canciones[0].artista;
  audio.src = canciones[0].cancion;
};

/*EVENTOS */
let play_btn = document.getElementById("play-btn");
let next_btn = document.getElementById("next-btn");
let prev_btn = document.getElementById("prev-btn");

play_btn.addEventListener("click", () => {
  if (is_playing) {
    audio.pause();
    pause_effects();
    is_playing = false;
  } else {
    audio.play();
    play_effects();
    is_playing = true;
  }
});

window.addEventListener("load", () => {
  first_song();
  progress_bar.value = 0;

  window.setTimeout(() => {
    progress_bar.max = audio.duration;
  }, 500);

  window.setInterval(() => {
    progress_bar.value = audio.currentTime;
  }, 1000);
  progress_bar.addEventListener("change", () => {
    audio.currentTime = progress_bar.value;
  });

  next_btn.addEventListener("click", () => {
    next_song();
  });
  prev_btn.addEventListener("click", () => {
    prev_song();
  });
  list_songs.addEventListener("click", (event) => {
    if (event.target.matches("img")) {
      select_song(event.target.parentElement.id.slice(5, 6));
    } else if (event.target.matches(".data-song-container")) {
      console.log(event.target.parentElement.id.slice(5, 6));
    } else if (event.target.matches(".artist-name")) {
      select_song(event.target.parentElement.parentElement.id.slice(5, 6));
    } else if (event.target.matches("h2")) {
      select_song(event.target.parentElement.parentElement.id.slice(5, 6));
    } else if (event.target.matches(".list-item")) {
      select_song(event.target.id.slice(5, 6));
    }
  });

  audio.addEventListener("ended", () => {
    next_song();
  });
});

BuildList(canciones);

/* */
let recent_volume = document.querySelector("#volume");
let volume_show = document.querySelector("#volumen_show");
function volumen_change(){
    volumen_show.innerHTML = recent_volume.value;
    Track.volume =recent_volume.value / 100;
}
let buscar = document.getElementById("buscar");

buscar.addEventListener("keyup", () => {
  let res = canciones.filter((e) =>
    e.titulo.toLowerCase().includes(buscar.value.toLowerCase())
  );
  if (res) {
    BuildList(res);
  }
});