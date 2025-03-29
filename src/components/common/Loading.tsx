import React from 'react';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'medium',
  color = '#3B82F6',
  text = '加载中...',
  fullScreen = false,
}) => {
  // 根据size确定spinner尺寸
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { width: '16px', height: '16px', borderWidth: '2px' };
      case 'large':
        return { width: '40px', height: '40px', borderWidth: '4px' };
      case 'medium':
      default:
        return { width: '24px', height: '24px', borderWidth: '3px' };
    }
  };

  const spinnerStyles = {
    ...getSizeStyles(),
    borderColor: `${color}20`,
    borderTopColor: color,
  };

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    ...(fullScreen && {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      zIndex: 9999,
    }),
  };

  return (
    <div style={containerStyles}>
      <div
        style={{
          ...spinnerStyles,
          borderRadius: '50%',
          borderStyle: 'solid',
          animation: 'spin 1s linear infinite',
        }}
      />
      {text && (
        <div
          style={{
            marginTop: '12px',
            fontSize: size === 'small' ? '12px' : size === 'large' ? '16px' : '14px',
            color: '#666',
          }}
        >
          {text}
        </div>
      )}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loading;
