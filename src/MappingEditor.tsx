import React from 'react';
import MappingCell, { MappingCellProps } from './MappingCell';

export type MappingEditorProps = Omit<MappingCellProps, 'array'>;

function MappingDisplay(props: MappingEditorProps) {
  const { onMappingChange, text, mapping } = props;

  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  const { width } = dimensions;
  if (width < 1500) {
    return (
      <div>
        <MappingCell array={Array.from(Array(13)).map((_, i) => String.fromCharCode(i + 65))} onMappingChange={onMappingChange} text={text} mapping={mapping} />
        <MappingCell array={Array.from(Array(13)).map((_, i) => String.fromCharCode(i + 65 + 13))} onMappingChange={onMappingChange} text={text} mapping={mapping} />
      </div>
    );
  }
  return (
    <div>
      <MappingCell array={Array.from(Array(26)).map((_, i) => String.fromCharCode(i + 65))} onMappingChange={onMappingChange} text={text} mapping={mapping} />
    </div>
  );
}

export default MappingDisplay;
