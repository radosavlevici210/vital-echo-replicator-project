function Index() {
  return (
    <div>
      <h1>VitalTones - Working!</h1>
      <p>If you can see this text, the page is loading correctly.</p>
      <div style={{
        background: 'purple',
        color: 'white',
        padding: '20px',
        margin: '20px 0'
      }}>
        <h2>Therapeutic Sound Technology</h2>
        <p>Transform your mind with binaural beats and therapeutic tones.</p>
        <button style={{
          background: 'white',
          color: 'purple',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Test Button - Click Me
        </button>
      </div>
    </div>
  );
}

export default Index;