import React from 'react';

const Index = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e1b4b, #7c3aed, #1e1b4b)',
      color: 'white',
      padding: '20px'
    }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '20px'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            🎵
          </div>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>VitalTones</h1>
        </div>
        <p style={{ color: '#d1d5db' }}>Therapeutic Sound Technology</p>
      </header>

      {/* Hero Section */}
      <section style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          marginBottom: '20px',
          background: 'linear-gradient(45deg, #a855f7, #ec4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Unlock Your Potential
        </h1>
        
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#d1d5db', 
          marginBottom: '30px',
          maxWidth: '600px',
          margin: '0 auto 30px auto'
        }}>
          Experience the power of binaural beats and therapeutic tones designed to enhance focus, 
          promote relaxation, and optimize your mental state naturally.
        </p>
        
        <button style={{
          background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
          color: 'white',
          border: 'none',
          padding: '15px 30px',
          fontSize: '1.1rem',
          borderRadius: '25px',
          cursor: 'pointer',
          marginRight: '10px'
        }}>
          Start Your Journey
        </button>
        
        <button style={{
          background: 'transparent',
          color: 'white',
          border: '2px solid white',
          padding: '15px 30px',
          fontSize: '1.1rem',
          borderRadius: '25px',
          cursor: 'pointer'
        }}>
          Learn More
        </button>
      </section>

      {/* Tone Categories */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>
            Explore Our Tone Library
          </h2>
          <p style={{ color: '#d1d5db', fontSize: '1.1rem' }}>
            Discover scientifically crafted audio experiences
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Skills Enhancement */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '30px',
            borderRadius: '15px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              🧠
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Skills Enhancement</h3>
            <p style={{ color: '#d1d5db', marginBottom: '20px' }}>
              Boost your cognitive abilities and skills
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['IQ Enhancement', 'Focus Improvement', 'Memory Boost', 'Creative Thinking'].map((tone, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '10px',
                  borderRadius: '8px'
                }}>
                  <span style={{ fontSize: '0.9rem' }}>{tone}</span>
                  <button style={{
                    background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}>
                    ▶️
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Emotional Intelligence */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '30px',
            borderRadius: '15px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              ❤️
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Emotional Intelligence</h3>
            <p style={{ color: '#d1d5db', marginBottom: '20px' }}>
              Develop emotional awareness and confidence
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Confidence Building', 'Motivation Boost', 'Emotional Balance', 'Self Awareness'].map((tone, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '10px',
                  borderRadius: '8px'
                }}>
                  <span style={{ fontSize: '0.9rem' }}>{tone}</span>
                  <button style={{
                    background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}>
                    ▶️
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Spiritual Growth */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '30px',
            borderRadius: '15px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(45deg, #10b981, #06b6d4)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              ⭐
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Spiritual Growth</h3>
            <p style={{ color: '#d1d5db', marginBottom: '20px' }}>
              Deepen your spiritual practice and awareness
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Meditation Practices', 'Chakra Balancing', 'Third Eye Activation', 'Lucid Dreaming'].map((tone, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '10px',
                  borderRadius: '8px'
                }}>
                  <span style={{ fontSize: '0.9rem' }}>{tone}</span>
                  <button style={{
                    background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}>
                    ▶️
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Well-being */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '30px',
            borderRadius: '15px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(45deg, #f59e0b, #ef4444)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              ⚡
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>General Well-being</h3>
            <p style={{ color: '#d1d5db', marginBottom: '20px' }}>
              Optimize your health and vitality
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Anti-Aging Therapy', 'Energy Boost', 'Immune Enhancement', 'Stress Relief'].map((tone, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '10px',
                  borderRadius: '8px'
                }}>
                  <span style={{ fontSize: '0.9rem' }}>{tone}</span>
                  <button style={{
                    background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}>
                    ▶️
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        textAlign: 'center', 
        marginTop: '60px', 
        paddingTop: '40px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            🎵
          </div>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>VitalTones</span>
        </div>
        <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
          © 2024 VitalTones. All rights reserved. Transforming minds through therapeutic sound.
        </p>
      </footer>
    </div>
  );
};

export default Index;