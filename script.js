// Menjalankan Canvas
function aksiCanvas() {
   const canvas   = document.getElementById("canvas");
   const ctx      = canvas.getContext("2d");
   canvas.width   = canvas.scrollWidth;
   canvas.height  = canvas.scrollHeight;
   const cW       = canvas.width;
   const cH       = canvas.height;

   // canvas.addEventListener("mousemove", function(e) {
   //    let cRect = canvas.getBoundingClientRect();
   //    let mouseX = Math.round(e.clientX - cRect.left);
   //    let mouseY = Math.round(e.clientY - cRect.top);
   //    document.getElementById("ket").innerHTML = "X : | " + mouseX + "Y : " + mouseY;
   // });

   // Event Klik Mulai Dan Coba Lagi
   let klik = function(e) {
      let cRect = canvas.getBoundingClientRect();
      let mouseX = Math.round(e.clientX - cRect.left);
      let mouseY = Math.round(e.clientY - cRect.top);
      if ( mouseX > 510 && mouseY > 210 && mouseY < 260 && mouseX < 690) {
         mulai();
         clearInterval(inSplash);
      }
   }
   ctx.canvas.addEventListener("click", klik);


   // Mulai dengan Enter
   let kDownMulai = function (e) {
      if ( e.keyCode === 13 ) {
         mulai();
         clearInterval(inSplash);
      }
   }
   document.addEventListener("keydown", kDownMulai);

   // tombol
   function tombol(teks, xKotak, yKotak, xTeks, yTeks, wKotak, wBorder, wTeks) {
      ctx.fillStyle = wKotak;
      ctx.fillRect(xKotak, yKotak, 180, 50);
      ctx.lineWidth = "5";
      ctx.strokeStyle = wBorder;
      ctx.strokeRect(xKotak, yKotak, 180, 50);
      ctx.font = "Bold 28px arial, sans-serif";
      ctx.fillStyle = wTeks;
      ctx.fillText(teks, xTeks, yTeks);
   }

   // splice sebelum mulai
   function splice() {
      ctx.save();
      ctx.clearRect(0,0,cW,cH);
      ctx.drawImage(sp, 0, 0);
      tombol("Mulai", 510, 210, 563, 245, "#29aae3", "#00dadb", "white");
      ctx.restore();
   }
   let inSplash = setInterval(splice,30);


   // Fungsi Mulai
   function mulai() {
      // remove klik & enter
      ctx.canvas.removeEventListener("click", klik);
      document.removeEventListener("keydown", kDownMulai);

      document.addEventListener("keydown", function(e) {
         if ( e.keyCode === 37 ) {
            if ( pswt.x+80 > 0 ) {
               pswt.x-=10;
            }
         } else if ( e.keyCode === 38 ) {
            if ( pswt.y > 0 ) {
               pswt.y-=10;
            }
         } else if ( e.keyCode === 39 ) {
            if ( pswt.x+pswt.w < cW ) {
               pswt.x+=10;
            }
         } else if ( e.keyCode === 40 ) {
            if ( pswt.y+30 < cH ) {
               pswt.y+=10;
            }
         } else if ( e.keyCode === 88 ) {
            laser.play();
            peluru.push({"x":pswt.x+100, "y":pswt.y+22, "w":16, "h":5});
         }
      });


      // Background
      function Bg() {
         this.x = 0, this.y = 0;
         this.render = function() {
            ctx.drawImage(bg, this.x--, this.y);
            if ( this.x === -1699 ) {
               this.x = 0;
            }
            sTrack.play();
         }
      }
      let background = new Bg();

      // Pesawat
      function Pesawat() {
         this.x = 80, this.y = 200, this.w = 120, this.h = 44;
         this.render = function () {
            ctx.drawImage(pesawat, this.x, this.y);
         }
      }
      let pswt = new Pesawat();

      // Peluru
      let peluru = [];
      function renderPeluru() {
         for (var i = 0; i < peluru.length; i++) {
            let p = peluru[i];
            ctx.drawImage(missile, p.x+=5, p.y);
            if ( p.x > cW ) {
               peluru.splice(i, 1);
            }
         }
      }

      let meteor = [
         {"x":850, "y":150, "w":50, "h":51},
         {"x":900, "y":250, "w":50, "h":51},
         {"x":750, "y":350, "w":50, "h":51},
         {"x":1000, "y":390, "w":50, "h":51},
         {"x":700, "y":100, "w":50, "h":51},
         {"x":1100, "y":50, "w":50, "h":51},
         {"x":1450, "y":150, "w":50, "h":51},
         {"x":1500, "y":250, "w":50, "h":51},
         {"x":1350, "y":350, "w":50, "h":51},
         {"x":1600, "y":390, "w":50, "h":51},
         {"x":1300, "y":100, "w":50, "h":51},
         {"x":1700, "y":50, "w":50, "h":51},
         {"x":2050, "y":150, "w":50, "h":51},
         {"x":2100, "y":250, "w":50, "h":51},
         {"x":1950, "y":350, "w":50, "h":51},
         {"x":2200, "y":390, "w":50, "h":51},
         {"x":1900, "y":100, "w":50, "h":51},
         {"x":2300, "y":50, "w":50, "h":51}
      ];
      function renderMeteor() {
         for (var i = 0; i < meteor.length; i++) {
            let m = meteor[i];
            ctx.drawImage(batu, m.x-=2, m.y);
            if ( ( m.x <= 0 ) || ( m.x+5 < pswt.x+pswt.w && m.y+m.h > pswt.y+15 && m.y+5 < pswt.y+pswt.h ) ) {
               clearInterval(interval);
               ctx.drawImage(lose, 520, 150);
               tombol("Coba Lagi", 530, 215, 553, 250, "#29aae3", "#00dadb", "white");
               ctx.canvas.addEventListener("click", klik);
               document.addEventListener("keydown", kDownMulai);
               sTrack.pause();
               sTrack.currentTime = 0;
            }
         }
      }


      // Fngsi Kena ( Peluru & Meteor)
      function kena() {
         for (var i = 0; i < peluru.length; i++) {
            let p = peluru[i];
            for (var j = 0; j < meteor.length; j++) {
               let m = meteor[j];
               if ( p.x > m.x && p.y+p.h > m.y && p.y < m.y+m.h) {
                  peluru.splice(i,1);
                  meteor.splice(j,1);
                  explode.play();
               }
            }
         }
         if ( meteor.length <= 0 ) {
            clearInterval(interval);
            ctx.clearRect(0, 0, cW, cH);
            ctx.drawImage(win, 0, 0);
            sTrack.pause();
            sTrack.currentTime = 0;
            menang.play();
            document.getElementById("btn").innerHTML = "<a href='index.html'>Main Lagi</a>";
         }
      }



      // Semua Animasi
      function animation() {
         ctx.save();
         ctx.clearRect(0, 0, cW, cH);

         // Render
         background.render();
         renderPeluru();
         pswt.render();
         renderMeteor();
         kena();

         ctx.restore();
      }
      let interval = setInterval(animation, 30);
   }
}

window.onload = aksiCanvas;
