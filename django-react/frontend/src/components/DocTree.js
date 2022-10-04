import React from "react";
import Doc from './Doc'

const Tree=({documents, action, setAction})=>{

    return(
    <div className="grid row-auto gap-0 relative">
    {
        documents.map(document=>(
            <Doc document={document} action={action} setAction={setAction}/>
        ))
    }
    </div>
    )
}

export default Tree;
