export default function Index() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>VitalTones - Therapeutic Sound</title>
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #1e1b4b 0%, #7c3aed 50%, #1e1b4b 100%);
            min-height: 100vh;
            color: white;
          }
          .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; padding: 40px 0; }
          .logo { 
            display: inline-flex; 
            align-items: center; 
            gap: 15px; 
            margin-bottom: 20px;
          }
          .logo-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(45deg, #8b5cf6, #ec4899);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
          }
          .main-title { font-size: 3rem; margin-bottom: 20px; }
          .subtitle { font-size: 1.2rem; color: #d1d5db; margin-bottom: 40px; }
          .btn {
            background: linear-gradient(45deg, #8b5cf6, #ec4899);
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 1.1rem;
            border-radius: 25px;
            cursor: pointer;
            margin: 10px;
            transition: transform 0.2s;
          }
          .btn:hover { transform: scale(1.05); }
          .categories {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin: 60px 0;
          }
          .category {
            background: rgba(255, 255, 255, 0.1);
            padding: 30px;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
          }
          .category-icon {
            width: 70px;
            height: 70px;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            margin-bottom: 20px;
          }
          .category h3 { font-size: 1.5rem; margin-bottom: 10px; }
          .category p { color: #d1d5db; margin-bottom: 20px; }
          .tone-list { display: flex; flex-direction: column; gap: 10px; }
          .tone-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: rgba(255, 255, 255, 0.05);
            padding: 12px;
            border-radius: 10px;
          }
          .play-btn {
            background: linear-gradient(45deg, #8b5cf6, #ec4899);
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 14px;
          }
          .footer {
            text-align: center;
            padding: 40px 0;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            margin-top: 60px;
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          {/* Header */}
          <header className="header">
            <div className="logo">
              <div className="logo-icon">🎵</div>
              <h1>VitalTones</h1>
            </div>
            <h2 className="main-title">Unlock Your Potential</h2>
            <p className="subtitle">
              Experience the power of binaural beats and therapeutic tones designed to enhance focus, 
              promote relaxation, and optimize your mental state naturally.
            </p>
            <button className="btn">Start Your Journey</button>
            <button className="btn">Learn More</button>
          </header>

          {/* Categories */}
          <section className="categories">
            {/* Skills Enhancement */}
            <div className="category">
              <div className="category-icon" style={{background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)'}}>
                🧠
              </div>
              <h3>Skills Enhancement</h3>
              <p>Boost your cognitive abilities and skills</p>
              <div className="tone-list">
                <div className="tone-item">
                  <span>IQ Enhancement</span>
                  <button className="play-btn">▶ Play</button>
                </div>
                <div className="tone-item">
                  <span>Focus Improvement</span>
                  <button className="play-btn">▶ Play</button>
                </div>
                <div className="tone-item">
                  <span>Memory Boost</span>
                  <button className="play-btn">▶ Play</button>
                </div>
                <div className="tone-item">
                  <span>Creative Thinking</span>
                  <button className="play-btn">▶ Play</button>
                </div>
              </div>
            </div>

            {/* Emotional Intelligence */}
            <div className="category">
              <div className="category-icon" style={{background: 'linear-gradient(45deg, #8b5cf6, #ec4899)'}}>
                ❤️
              </div>
              <h3>Emotional Intelligence</h3>
              <p>Develop emotional awareness and confidence</p>
              <div className="tone-list">
                <div className="tone-item">
                  <span>Confidence Building</span>
                  <button className="play-btn">▶ Play</button>
                </div>
                <div className="tone-item">
                  <span>Motivation Boost</span>
                  <button className="play-btn">▶ Play</button>
                </div>
                <div className="tone-item">
                  <span>Emotional Balance</span>
                  <button className="play-btn">▶ Play</button>
                </div>
                <div className="tone-item">
                  <span>Self Awareness</span>
                  <button className="play-btn">▶ Play</button>
                </div>
              </div>
            </div>

            {/* Spiritual Growth */}
            <div className="category">
              <div className="category-icon" style={{background: 'linear-gradient(45deg, #10b981, #06b6d4)'}}>
                ⭐
              </div>
              <h3>Spiritual Growth</h3>
              <p>Deepen your spiritual practice and awareness</p>
              <div className="tone-list">
                <div className="tone-item">
                  <span>Meditation Practices</span>
                  <button className="play-btn">▶ Play</button>
                </div>
                <div className="tone-item">
                  <span>Chakra Balancing</span>
                  <button className="play-btn">▶ Play</button>
                </div>
                <div className="tone-item">
                  <span>Third Eye Activation</span>
                  <button className="play-btn">▶ Play</button>
                </div>
                <div className="tone-item">
                  <span>Lucid Dreaming</span>
                  <button className="play-btn">▶ Play</button>
                </div>
              </div>
            </div>

            {/* General Well-being */}
            <div className="category">
              <div className="category-icon" style={{background: 'linear-gradient(45deg, #f59e0b, #ef4444)'}}>
                ⚡
              </div>
              <h3>General Well-being</h3>
              <p>Optimize your health and vitality</p>
              <div className="tone-list">
                <div className="tone-item">
                  <span>Anti-Aging Therapy</span>
                  <button className="play-btn">▶ Play</button>
                </div>
                <div className="tone-item">
                  <span>Energy Boost</span>
                  <button className="play-btn">▶ Play</button>
                </div>
                <div className="tone-item">
                  <span>Immune Enhancement</span>
                  <button className="play-btn">▶ Play</button>
                </div>
                <div className="tone-item">
                  <span>Stress Relief</span>
                  <button className="play-btn">▶ Play</button>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="footer">
            <div className="logo">
              <div className="logo-icon">🎵</div>
              <h3>VitalTones</h3>
            </div>
            <p style={{color: '#9ca3af', marginTop: '20px'}}>
              © 2024 VitalTones. All rights reserved. Transforming minds through therapeutic sound.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}