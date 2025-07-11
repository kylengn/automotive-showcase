import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'VELOCITY - Luxury Automotive Experience | 3D Supercar Configurator'
export const contentType = 'image/png'
export const size = {
  width: 1200,
  height: 630,
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          position: 'relative',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 80%, rgba(220, 38, 38, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(234, 88, 12, 0.1) 0%, transparent 50%)',
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            V
          </div>
          <span
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#1e293b',
              fontFamily: 'monospace',
            }}
          >
            VELOCITY
          </span>
        </div>

        {/* Main Title */}
        <h1
          style={{
            fontSize: '72px',
            fontWeight: '900',
            color: '#1e293b',
            textAlign: 'center',
            margin: '0 0 24px 0',
            lineHeight: '1.1',
            fontFamily: 'monospace',
          }}
        >
          UNLEASH
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 50%, #eab308 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            VELOCITY
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '28px',
            color: '#64748b',
            textAlign: 'center',
            margin: '0 0 32px 0',
            maxWidth: '800px',
            lineHeight: '1.4',
          }}
        >
          Experience the pinnacle of automotive excellence with our interactive 3D supercar configurator
        </p>

        {/* Features */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            marginTop: '32px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: 'rgba(220, 38, 38, 0.1)',
              borderRadius: '24px',
              border: '1px solid rgba(220, 38, 38, 0.2)',
            }}
          >
            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#dc2626' }}>⚡</span>
            <span style={{ fontSize: '16px', color: '#374151' }}>0-60 in 2.8s</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: 'rgba(59, 130, 246, 0.1)',
              borderRadius: '24px',
              border: '1px solid rgba(59, 130, 246, 0.2)',
            }}
          >
            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#3b82f6' }}>🛡️</span>
            <span style={{ fontSize: '16px', color: '#374151' }}>Carbon Fiber</span>
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: '40px',
            padding: '16px 32px',
            background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)',
            borderRadius: '16px',
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
            fontFamily: 'monospace',
          }}
        >
          CONFIGURE YOUR DREAM CAR
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
} 