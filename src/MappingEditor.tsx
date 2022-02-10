import { ChangeEvent } from "react";
import { Mapping, TextState } from "./TextDisplay";

export type MappingEditorProps = TextState & {
    onMappingChange: (mapping: Mapping) => void;
}

function MappingDisplay(props: MappingEditorProps) {
    function onBoxChanged(e: ChangeEvent<HTMLInputElement>) {
        let newVal = e.currentTarget.value.toUpperCase();
        if (newVal.length > 1) {
            newVal = newVal[newVal.length - 1];
        }
        if (newVal !== '' && !/^[A-Z]$/.test(newVal)) {
            e.preventDefault();
            return;
        }
        props.onMappingChange({ [e.target.id]: newVal})
    }

    function freq(text: string, char: number): number | string {
        return (text.match(new RegExp(String.fromCharCode(char + 65), 'g')) || []).length || '-';
    }

    return <div>
        <table className="mapLetterTable"><tbody>
            <tr>
                {Array.from(Array(26)).map((_, i) => 
                    <td className="freqLetter" key={i}>{freq(props.text, i)}</td>)}
            </tr>
            <tr>
                {Array.from(Array(26)).map((_, i) => 
                    <td className="mapLetter" key={i}>{String.fromCharCode(i + 65)}</td>)}
            </tr>
        </tbody></table>
        <div className="mapInputContainer">
            {Array.from(Array(26)).map((_, i) => 
                <div className="mapInput" key={i}><input
                    placeholder="?"
                    onFocus={((event: ChangeEvent<HTMLInputElement>) => event.target.select())}
                    className="mapInput"
                    value={props.mapping[String.fromCharCode(i + 65)] || ''}
                    onChange={onBoxChanged} id={String.fromCharCode(i + 65)} /></div>)}
        </div>
    </div>;
}

export default MappingDisplay;
