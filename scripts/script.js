
    // ✅ Canvas Animation
    const canvas = document.getElementById("candlesCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Candle {
      constructor(x) {
        this.x = x;
        this.width = 6;
        this.height = Math.random() * 80 + 20;
        this.y = canvas.height / 2 - this.height / 2;
        this.color = Math.random() > 0.5 ? "#00ffcc" : "#ff4444"; // green/red candle
        this.speed = Math.random() * 0.5 + 0.2;
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.moveTo(this.x + this.width / 2, this.y - 10);
        ctx.lineTo(this.x + this.width / 2, this.y + this.height + 10);
        ctx.stroke();
      }
      update() {
        this.x -= this.speed;
        if (this.x + this.width < 0) {
          this.x = canvas.width + Math.random() * 200;
          this.height = Math.random() * 80 + 20;
          this.y = canvas.height / 2 - this.height / 2;
          this.color = Math.random() > 0.5 ? "#00ffcc" : "#ff4444";
        }
        this.draw();
      }
    }

    let candles = [];
    for (let i = 0; i < 50; i++) {
      candles.push(new Candle(i * 40));
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      candles.forEach(candle => candle.update());
      requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
    
    // ✅ Contact Form Submission
    document.querySelector(".contact-form").addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        service: document.getElementById("service").value,
        message: document.getElementById("message").value
      };

      try {
            fetch("https://deltaquant-solutions.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        });

        if (res.ok) {
          alert("✅ Message sent successfully!");
          e.target.reset();
        } else {
          alert("❌ Failed to send message. Try again later.");
        }
      } catch (err) {
        alert("⚠️ Network error. Please try again.");
      }
    });

