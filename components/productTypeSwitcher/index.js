const DvdOption = ( { size, setSize } ) => {
    return (
        <div>
            <label>Size (MB)</label>
            <div>
                <input 
                    type='number'
                    placeholder="Please, provide size in megabytes!" 
                    id="size" 
                    className="form-scandiweb" 
                    defaultValue={size} 
                    onChange={ (e)=>setSize(e.target.value) } 
                />
            </div>
        </div>
    )
};
const FurnitureOption = ( { height, width, length, setHeight, setWidth, setLength } ) => {
    return (
        <>
            <div>
                <label>Height (CM)</label>
                <div>
                    <input 
                        type='number'
                        placeholder="Please, provide height in centimeter!" 
                        id="height" 
                        className="form-scandiweb" 
                        defaultValue={height} 
                        onChange={(e)=>setHeight(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <label>Width (CM)</label>
                <div>
                    <input 
                        type='number'
                        placeholder="Please, provide width in centimeter!" 
                        id="width" 
                        className="form-scandiweb" 
                        defaultValue={width} 
                        onChange={(e)=>setWidth(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <label>Length (CM)</label>
                <div>
                    <input 
                        type='number'
                        placeholder="Please, provide length in centimeter!"
                        id="length" 
                        className="form-scandiweb" 
                        defaultValue={length} 
                        onChange={(e)=>setLength(e.target.value)}
                    />
                </div>
            </div>
        </>
    )
};
const BookOption = ( { weight, setWeight } ) => {
    return (
        <div>
            <label>Weight (KG)</label>
            <div>
                <input 
                    type='number'
                    placeholder="Please, provide weight in kilograms!" 
                    id="weight" 
                    className="form-scandiweb" 
                    defaultValue={weight} 
                    onChange={ (e)=>setWeight(e.target.value) } 
                />
            </div>
        </div>
    )
};

export { DvdOption, FurnitureOption, BookOption };