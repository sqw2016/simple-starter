import React from 'react';
import styles from './shadowBox.less';

export default function ShadowBox({children, className, style}) {
  let boxStyle = styles.shadow_box;
  boxStyle += (' ' + (className || ''));
  return (
    <div style={style} className={boxStyle}>
      {children}
    </div>
  );
}
