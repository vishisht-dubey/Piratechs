import Link from 'next/link';
import { appContext } from '../pages';
import { Button } from '@mui/material';
import { LazyLoadImage } from '../functions';
import { useContext, useEffect, useState } from 'react';
export default function Header() {
    const [scrolled, setScrolled] = useState<any>(false);
    const app = useContext(appContext);
    const {width, height, form} = app;
    console.log(width,height,form);
    useEffect(() => {
        window.addEventListener('scroll', (event?:any) => window.scrollY > 5 ? setScrolled(true) : setScrolled(false));
    }, [setScrolled]);
    return (
        <header className={scrolled ? `scrolledHeader` : `nonscrolledHeader`}>
            <div className="innerHeader">
                <Link href={`/`}>
                    <a title="Home">
                        <LazyLoadImage effect="blur" src={`/assets/GherkinLogo.svg`} id={`logo`} className="logo" alt={`logo`} width={`100%`} height={`auto`} />
                        Next.js
                    </a>
                </Link>
                <div className="buttons">
                    <Button id="signinBtn" className="btn regBtn lightBtn" title='Signin'>Signin</Button>
                    <Button id="signupBtn" className="btn regBtn" title='Signup'>Signup</Button>
                </div>
            </div>
        </header>
    )
}