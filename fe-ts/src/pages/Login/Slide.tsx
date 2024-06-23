interface SlideProps {
    image: string;
    title: string | any;
}

function Slide({ image, title }: SlideProps) {
    return (
        <div className="slide">
            <div className="slide">
                <img src={image} alt="" />
                {title}
            </div>
        </div>
    );
}
export default Slide;
