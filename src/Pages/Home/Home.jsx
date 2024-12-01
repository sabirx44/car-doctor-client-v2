import About from "./About";
import Banner from "./Banner";
import Services from "./Services/Services";

const Home = () => {
    return (
        <div className="px-[150px]">
            <Banner />
            <About />
            <Services />
        </div>
    );
};

export default Home;