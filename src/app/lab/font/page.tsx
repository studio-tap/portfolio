
import React from 'react';

const FontComparisonPage = () => {
  const alphabetAndSymbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 !@#$%^&*()_+-=[]{};':"|,.<>/?`~';
  const japaneseText = 'これは日本語のサンプル文章です。ウェブサイトのデザインにおいて、フォントの選定は非常に重要な要素となります。適切なフォントは、可読性を高め、ユーザーエクスペリエンスを向上させ、ブランドの個性を表現します。';

  const fonts = [
    { name: 'HackGen Console NF', family: 'HackGenConsoleNF' },
    { name: 'Moralerspace Neon HW', family: 'MoralerspaceNeonHW' },
    { name: 'PlemolJP Console NF', family: 'PlemolJPConsoleNF' },
  ];

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f0f0f0' }}>
      <style jsx global>{`
        @font-face {
          font-family: 'HackGenConsoleNF';
          src: url('/fonts/HackGen_NF_v2.10.0/HackGenConsoleNF-Regular.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
        @font-face {
          font-family: 'HackGenConsoleNF';
          src: url('/fonts/HackGen_NF_v2.10.0/HackGenConsoleNF-Bold.ttf') format('truetype');
          font-weight: bold;
          font-style: normal;
        }
        @font-face {
          font-family: 'MoralerspaceNeonHW';
          src: url('/fonts/MoralerspaceHW_v2.0.0/MoralerspaceNeonHW-Regular.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
        @font-face {
          font-family: 'MoralerspaceNeonHW';
          src: url('/fonts/MoralerspaceHW_v2.0.0/MoralerspaceNeonHW-Bold.ttf') format('truetype');
          font-weight: bold;
          font-style: normal;
        }
        @font-face {
          font-family: 'PlemolJPConsoleNF';
          src: url('/fonts/PlemolJP_NF_v3.0.0/PlemolJPConsole_NF/PlemolJPConsoleNF-Regular.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
        @font-face {
          font-family: 'PlemolJPConsoleNF';
          src: url('/fonts/PlemolJP_NF_v3.0.0/PlemolJPConsole_NF/PlemolJPConsoleNF-Bold.ttf') format('truetype');
          font-weight: bold;
          font-style: normal;
        }
      `}</style>

      <h1 style={{ fontFamily: 'sans-serif', borderBottom: '2px solid #333', paddingBottom: '0.5rem', marginBottom: '2rem' }}>
        Font Comparison Lab
      </h1>

      {fonts.map(font => (
        <div key={font.name} style={{ marginBottom: '3rem', backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontFamily: 'sans-serif', borderLeft: '5px solid #0070f3', paddingLeft: '1rem' }}>{font.name}</h2>
          
          <div style={{ fontFamily: `"${font.family}", monospace`, fontSize: '16px', lineHeight: '1.6' }}>
            <p style={{ fontWeight: 'normal' }}>
              <strong>[Regular]</strong><br />
              {alphabetAndSymbols}<br />
              {japaneseText}
            </p>
            <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>
              <strong>[Bold]</strong><br />
              {alphabetAndSymbols}<br />
              {japaneseText}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FontComparisonPage;
