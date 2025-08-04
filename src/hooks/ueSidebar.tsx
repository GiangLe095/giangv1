"use client";
import { useCallback, useEffect, useState } from "react";


const useSidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    const handleResize = useCallback(() => {
        const width = window.innerWidth;
        if (width > 1024) {
            setIsOpen(true);
            setIsVisible(true);
        } else if (width >= 768) {
            setIsOpen(false);
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, []);

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [handleResize]);

    const toggleSidebar = useCallback(() => {
        if(window.innerWidth < 768) {
            setIsOpen(true);
            setIsVisible((prev) => !prev);
        } else {
            setIsOpen((prev) => !prev);
        }
    }, []);


    return {isOpen, isVisible, setIsOpen, setIsVisible, toggleSidebar};
    
}

export default useSidebar;