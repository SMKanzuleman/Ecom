import { useState } from "react";
import { PlaceholderImage } from "./PlaceholderImage";


export const ProductImage = ({ src, alt,className }: { src: string, alt: string,className:string }) => {
    const [hasError, sethasError] = useState(false);

    if (!src || hasError) {
        return (
            <PlaceholderImage text='No Image Found' />
        )
    }
    return (
        <img src={src} alt={alt} className={`w-full bg-bg p-2 rounded-4xl  aspect-square object-cover ${className}`}
            onError={() => sethasError(true)} />
    )
}
