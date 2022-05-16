import React, { useEffect, useRef, useState } from 'react';

export function ImageZoomModal({ setOpenModal }) {

    let imgSrc = "https://beumontfiles.s3.ap-south-1.amazonaws.com/productFiles/QGSY4s3jHcUTUEgI5jqIEWQ9xMtPHDWIp4erf129.jpg";

    let [displayLens, setDisplayLens] = useState(false);

    let imgRef = useRef();
    let lensRef = useRef();
    let resultRef = useRef();

    const imageZoom = () => {
        var img, lens, result, cx, cy;
        img = imgRef?.current;
        lens = lensRef?.current;
        result = resultRef?.current;

        cx = result?.offsetWidth / lens.offsetWidth;
        cy = result?.offsetHeight / lens.offsetHeight;
        result.style.backgroundImage = "url('" + img.src + "')";
        result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";

    }

    const getCursorPos = (e) => {
        var a, x = 0, y = 0;
        e = e || window.event;
        a = imgRef.current.getBoundingClientRect();
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }

    const moveLens = (e) => {

        setDisplayLens(true)

        e.preventDefault();

        let img, lens, result, cx, cy, x, y, pos;

        img = imgRef?.current;
        lens = lensRef?.current;
        result = resultRef?.current

        cx = result?.offsetWidth / lens.offsetWidth;
        cy = result?.offsetHeight / lens.offsetHeight;


        pos = getCursorPos(e);
        /*calculate the position of the lens:*/
        x = pos.x - (lens.offsetWidth / 2);
        y = pos.y - (lens.offsetHeight / 2);
        /*prevent the lens from being positioned outside the image:*/
        if (x > img.width - lens.offsetWidth) { x = img.width - lens.offsetWidth; }
        if (x < 0) { x = 0; }
        if (y > img.height - lens.offsetHeight) { y = img.height - lens.offsetHeight; }
        if (y < 0) { y = 0; }

        /*set the position of the lens:*/

        lens.style.left = x + "px";

        lens.style.top = y + "px";

        /*display what the lens "sees":*/
        result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";

    }


    const handleMouseLeave = () => {
        setDisplayLens(false)
    }


    useEffect(() => {
        imageZoom()
        return;
    }, [displayLens ? imageZoom() : null])



    return (
        <>
            <div class="backdrop"></div >
            <div class="alert-box">
                <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                    <button style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => setOpenModal(prevState => !prevState)}>X</button>
                </div>

                <div className="container">

                    <div className="img-zoom-container">
                        <img ref={imgRef} src={imgSrc} style={{ width: "40%", height: "500px", objectFit: "contain" }} alt='' onMouseLeave={handleMouseLeave} onMouseMove={moveLens} />
                        {displayLens ? <div ref={lensRef} className="img-zoom-lens" onMouseLeave={handleMouseLeave} onMouseMove={moveLens}></div> : <div ref={lensRef} className="img-zoom-lens-hidden" onMouseMove={moveLens}></div>}
                        <div ref={resultRef} className={"img-zoom-result"}></div>
                    </div>
                </div>
            </div >
        </>



    );
}