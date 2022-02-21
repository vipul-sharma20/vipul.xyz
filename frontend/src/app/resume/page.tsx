const FILE_ID = '16uNfPALGw4O2RTE7pFPbS1mIIOftvmgZ';

export default function ResumePage() {
  return (
    <>
      <iframe
        src={`https://drive.google.com/file/d/${FILE_ID}/preview`}
        title="Resume"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          border: 0,
          background: '#1a1a1a',
        }}
      />
      <a
        href={`https://drive.google.com/uc?export=download&id=${FILE_ID}`}
        download
        style={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 10,
          padding: '8px 14px',
          borderRadius: 6,
          background: 'rgba(255,255,255,0.92)',
          color: '#1a1a1a',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          fontSize: 13,
          fontWeight: 500,
          textDecoration: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        ↓ Download PDF
      </a>
    </>
  );
}
