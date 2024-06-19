import React, { useState, forwardRef } from 'react';
import noImage from '@/assets/Image/noImage.jpg'

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {//React.ComponentPropsWithoutRef<'img'>
    fallback?: string;
}
export type Ref = HTMLImageElement;
// Remove React.FC from Typescript template
const Image = forwardRef<Ref, Props>(({ src, alt, className,fallback: customFallBack=noImage, ...props }: Props, ref) => {
    const [fallback, setFallback] = useState<string>('');

    const handleError = () => {
        setFallback(customFallBack);
    };

    return (
        <img
        className={`${className}`}
            ref={ref}
            src={fallback || src}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
});

export default Image;