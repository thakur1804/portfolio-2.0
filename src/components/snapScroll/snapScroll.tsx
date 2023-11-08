/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react'
import {Container} from './snapScroll-style'
import EffectCanvas from '../../assets/animation/RgbSplit'

const SnapScroll: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    useEffect(() => {
        console.log(containerRef)
        console.log(containerRef.current)
        console.log(imageRef.current?.innerHTML)
        if (containerRef.current && imageRef.current) {
            new EffectCanvas(containerRef.current, imageRef.current);
        }    }, [])
    return (
        <Container ref={containerRef}>
            <img src="https://images.unsplash.com/photo-1517825738774-7de9363ef735?q=80&w=2010&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Background Image" ref={imageRef}/>
        </Container>
    )
}

export default SnapScroll;