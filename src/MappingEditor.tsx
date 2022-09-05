import React from 'react';
import { useSizeAwareness } from 'Hooks';
import MappingCell, { MappingCellProps } from './MappingCell';

export type MappingEditorProps = Omit<MappingCellProps, 'array'>;

function MappingDisplay(props: MappingEditorProps) {
  const { onMappingChange, text, mapping } = props;

  const dimensions = useSizeAwareness();

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
