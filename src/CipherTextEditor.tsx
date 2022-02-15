import { ChangeEvent } from "react";
import { TextState } from "./TextDisplay";

export type CiphertestEditorProps = TextState & {
    onChange: (text: string) => void;
}

function CipherTextEditor(props: CiphertestEditorProps) {
    function onBoxChanged(e: ChangeEvent<HTMLTextAreaElement>) {
        let newVal = e.currentTarget.value.toLocaleUpperCase();
        props.onChange(newVal);
    }
    
    return <div className="ctInput"><textarea
                    placeholder="?"
                    className="ctInput"
                    value={props.text}
                    onChange={onBoxChanged} /></div>
}

export default CipherTextEditor;