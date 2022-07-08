import React, { useEffect, useRef, useState } from 'react';

export function ImageZoomModal({ setOpenModal }) {

    let [displayLens, setDisplayLens] = useState(false);

    let imgRef = useRef();
    let lensRef = useRef();

    const images = [
        {
            id: 1,
            src: "https://beumontfiles.s3.ap-south-1.amazonaws.com/productFiles/QGSY4s3jHcUTUEgI5jqIEWQ9xMtPHDWIp4erf129.jpg"
        },
        {
            id: 2,
            src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        },
        {
            id: 3,
            src: "https://beumontfiles.s3.ap-south-1.amazonaws.com/productFiles/QGSY4s3jHcUTUEgI5jqIEWQ9xMtPHDWIp4erf129.jpg"
        },
        {
            id: 4,
            src: "https://beumontfiles.s3.ap-south-1.amazonaws.com/productFiles/QGSY4s3jHcUTUEgI5jqIEWQ9xMtPHDWIp4erf129.jpg"
        },
        {
            id: 5,
            src: "https://beumontfiles.s3.ap-south-1.amazonaws.com/productFiles/QGSY4s3jHcUTUEgI5jqIEWQ9xMtPHDWIp4erf129.jpg"
        },
        {
            id: 6,
            src: "https://beumontfiles.s3.ap-south-1.amazonaws.com/productFiles/QGSY4s3jHcUTUEgI5jqIEWQ9xMtPHDWIp4erf129.jpg"
        },
        {
            id: 7,
            src: "https://beumontfiles.s3.ap-south-1.amazonaws.com/productFiles/QGSY4s3jHcUTUEgI5jqIEWQ9xMtPHDWIp4erf129.jpg"
        },
        {
            id: 8,
            src: "https://beumontfiles.s3.ap-south-1.amazonaws.com/productFiles/QGSY4s3jHcUTUEgI5jqIEWQ9xMtPHDWIp4erf129.jpg"
        },
        {
            id: 9,
            src: "https://beumontfiles.s3.ap-south-1.amazonaws.com/productFiles/QGSY4s3jHcUTUEgI5jqIEWQ9xMtPHDWIp4erf129.jpg"
        },
        {
            id: 10,
            src: "https://beumontfiles.s3.ap-south-1.amazonaws.com/productFiles/QGSY4s3jHcUTUEgI5jqIEWQ9xMtPHDWIp4erf129.jpg"
        },
    ]


    const imageZoom = () => {
        var img, lens, zoom = 3;
        img = imgRef?.current;
        lens = lensRef?.current;
        lens.style.backgroundImage = "url('" + img.src + "')";
        lens.style.backgroundRepeat = "no-repeat";
        lens.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";

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

        let img, lens, x, y, pos, bw = 3;

        img = imgRef?.current;
        lens = lensRef?.current;

        let w = lens.offsetWidth / 2;
        let h = lens.offsetHeight / 2;
        pos = getCursorPos(e);
        /*calculate the position of the lens:*/
        x = pos.x
        y = pos.y;
        let zoom = 3;
        /*prevent the lens from being positioned outside the image:*/
        if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }
        if (x < w / zoom) { x = w / zoom; }
        if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
        if (y < h / zoom) { y = h / zoom; }
        /* Set the position of the magnifier glass: */
        lens.style.left = (x - w) + "px";
        lens.style.top = (y - h) + "px";
        /* Display what the magnifier glass "sees": */
        lens.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";

    }


    const handleMouseLeave = () => {
        setDisplayLens(false)
    }


    useEffect(() => {
        imageZoom()
        return;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [displayLens ? imageZoom() : null])

    const [selectedImage, setSelectedImage] = useState({
        id: 1,
        src: "https://beumontfiles.s3.ap-south-1.amazonaws.com/productFiles/QGSY4s3jHcUTUEgI5jqIEWQ9xMtPHDWIp4erf129.jpg"
    })

    const handlePrevious = () => {
        for (let i = 0; i < images.length; i++) {
            if (selectedImage.id === images[i].id) {
                if (i === 0) {
                    selectedImage(selectedImage)
                } else {
                    setSelectedImage(images[i - 1])
                }

            }
        }
    }
    const handleNext = () => {
        for (let i = 0; i < images.length; i++) {
            if (selectedImage.id === images[i].id) {
                if (i === images.length - 1) {
                    selectedImage(selectedImage)
                } else {
                    setSelectedImage(images[i + 1])
                }

            }
        }
    }


    return (
        <>
            <div className="backdrop"></div >
            <div className="alert-box">

                <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                    <button style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => setOpenModal(prevState => !prevState)}><i style={{ fontSize: "30px" }} className='bx bx-x'></i></button>
                </div>

                <div className="magnify-container">
                    <div className="left">
                        <div className="buttons">
                            <button onClick={handlePrevious} className="pre-btn"><i className='bx bx-chevron-right'></i></button>
                        </div>
                    </div>
                    <div className="img-zoom-container">
                        <img ref={imgRef} src={selectedImage.src} style={{ width: "100%", height: "69vh", objectFit: "contain" }} alt='' onMouseLeave={handleMouseLeave} onMouseMove={moveLens} />
                        {displayLens ? <div ref={lensRef} className="img-magnifier-glass" onMouseLeave={handleMouseLeave} onMouseMove={moveLens}></div> : <div ref={lensRef} className="img-zoom-lens-hidden" onMouseMove={moveLens}></div>}
                    </div>
                    <div className="right">
                        <div className="buttons">
                            <button onClick={handleNext} className="nxt-btn"><i className='bx bx-chevron-right'></i></button>
                        </div>
                    </div>
                </div>
                <div className="maginfy-images">
                    {images && images.map((el, index) => (
                        <img key={index} src={el.src} onClick={() => setSelectedImage(el)} className="magnify-secondary-images" alt="" style={{ border: el.id === selectedImage.id ? "2px solid #A18F69" : "none" }} />
                    ))}
                </div>
            </div >
        </>



    );
}